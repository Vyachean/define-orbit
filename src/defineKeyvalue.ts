import { defineStore } from 'pinia'
import {
  computed, reactive, readonly, toRefs,
} from 'vue'
import OrbitStore from 'orbit-db-store'
import KeyValueStore from 'orbit-db-kvstore'
import { GeneralOrbitPinia, Options } from './models'
import { GeneralOrbitState } from './defineDB'
import { defineStaticState } from './defineStaticState'
import { useGetDB } from './useGetDB'

export interface KeyvaluePinia<I> extends GeneralOrbitPinia {
  get(key: string): Promise<I>;
  put(key: string, value: I, options?: {}): Promise<string>;
  set(key: string, value: I, options?: {}): Promise<string>;
  del(key: string, options?: {}): Promise<string>;

  all: KeyValueStore<I>['all']|undefined
}

export const defineKeyvalue = <I>(op: Options): () => KeyvaluePinia<I> => {
  const type = 'keyvalue'
  const { identity } = op

  const staticState = defineStaticState(type)

  const getDB = useGetDB<I, 'keyvalue'>(type, op, staticState, identity)

  return (): KeyvaluePinia<I> => {
    const useStore = defineStore(
      `orbit-${'name' in op ? op.name : op.address}`,
      () => {
        const state = reactive<GeneralOrbitState>({
          updated: 0,
        })

        const address = computed<OrbitStore['address'] | undefined>(
          (): OrbitStore['address'] | undefined => {
            const { db } = staticState
            // для реактивного обновления
            // eslint-disable-next-line no-console
            console.debug(`getter ${db?.address.root || 'undefined'} updated ${state.updated}`)
            return db?.address
          },
        )
        const all = computed<KeyValueStore<I>['all'] | undefined>(
          (): KeyValueStore<I>['all'] | undefined => {
            const { db } = staticState
            // для реактивного обновления
            // eslint-disable-next-line no-console
            console.debug(`getter ${db?.address.root || 'undefined'} updated ${state.updated}`)
            return db?.all
          },
        )

        const updateTime = () => {
          state.updated = Date.now()
        }

        const get = async (key: string) => (await getDB()).get(key)

        const put = async (
          key: string,
          value: I,
          options?: {},
        ) => (await getDB()).put(key, value, options)

        const del = async (key: string, options?: {}) => (await getDB()).del(key, options)

        const set = async (
          key: string,
          value: I,
          options?: {},
        ) => (await getDB()).set(key, value, options)

        return ({
          ...toRefs(readonly(state)),
          address,
          updateTime,
          all,
          get,
          put,
          set,
          del,
        })
      },
    )

    const store: KeyvaluePinia<I> = useStore()

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
