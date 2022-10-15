import { defineStore } from 'pinia'
import {
  computed, reactive, readonly, toRefs,
} from 'vue'
import OrbitStore from 'orbit-db-store'
import FeedStore from 'orbit-db-feedstore'
import { useGetDB } from './useGetDB'
import { GeneralOrbitPinia, Options } from './models'
import { defineStaticState } from './defineStaticState'
import { GeneralOrbitState } from './defineDB'

type LogEntry<I> = ReturnType<FeedStore<I>['get']>

export interface FeedPinia<I> extends GeneralOrbitPinia {
  add(data: I): Promise<string>;
  get(hash: string): Promise<LogEntry<I>>
  remove(hash: string): Promise<string>;

  collected: LogEntry<I>[]|undefined;
}

export const defineFeed = <I>(op: Options): () => FeedPinia<I> => {
  const type = 'feed'
  const { identity } = op

  const staticState = defineStaticState(type)

  const getDB = useGetDB<I, 'feed'>(type, op, staticState, identity)

  return (): FeedPinia<I> => {
    const useStore = defineStore(
      `orbit-${'name' in op ? op.name : op.address}`,
      () => {
        const state = reactive<GeneralOrbitState>({
          updated: 0,
        })

        const collected = computed<LogEntry<I>[] | undefined>(
          (): LogEntry<I>[] | undefined => {
            const { db } = staticState
            // для реактивной зависимости
            // eslint-disable-next-line no-console
            console
              .debug(`getter ${db?.address.root || 'undefined'} updated ${state.updated}`)
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return db?.iterator({ limit: -1 })
              .collect()
          },
        )
        const address = computed<OrbitStore['address'] | undefined>(
          (): OrbitStore['address'] | undefined => {
            const { db } = staticState
            // для реактивного обновления
            // eslint-disable-next-line no-console
            console.debug(`getter ${db?.address.root || 'undefined'} updated ${state.updated}`)
            return db?.address
          },
        )

        const updateTime = () => {
          state.updated = Date.now()
        }

        const get = async (hash: string) => (await getDB()).get(hash)
        const remove = async (hash: string) => (await getDB()).remove(hash)
        const add = async (date: I) => (await getDB()).add(date)

        return ({
          ...toRefs(readonly(state)),
          collected,
          address,
          updateTime,
          get,
          remove,
          add,
        })
      },
    )

    const store: FeedPinia<I> = useStore()

    async function init() {
      const base = await getDB();
      ['ready', 'replicated', 'write', 'replicate.progress'].forEach((eventName) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return
        base.events.on(eventName, () => store.updateTime())
      })
      await base.load()
    }

    void init()

    return store
  }
}
