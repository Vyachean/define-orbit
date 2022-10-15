import { defineStore } from 'pinia'
import {
  computed, reactive, readonly, toRefs,
} from 'vue'
import OrbitStore from 'orbit-db-store'
import { GeneralOrbitPinia, Options } from './models'
import { GeneralOrbitState } from './defineDB'
import { defineStaticState } from './defineStaticState'
import { useGetDB } from './useGetDB'

export interface DocstorePinia<K, I> extends GeneralOrbitPinia {
  put(doc: I): Promise<string>;
  get(key: K): Promise<I[]>;
  del(key: K): Promise<string>;
}

export const defineDockstore = <K, I>(op: Options): () => DocstorePinia<K, I> => {
  const type = 'docstore'
  const { identity } = op

  const staticState = defineStaticState(type)

  const getDB = useGetDB<I, 'docstore'>(type, op, staticState, identity)

  return (): DocstorePinia<K, I> => {
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

        const updateTime = () => {
          state.updated = Date.now()
        }

        const put = async (doc:I) => (await getDB()).put(doc)
        const get = async (key:K) => (await getDB()).get(key)
        // const query = async (mapper: (doc: I) => void) => (await getDB()).query(mapper)
        const del = async (key:K) => (await getDB()).del(key)

        return ({
          ...toRefs(readonly(state)),
          address,
          updateTime,
          put,
          get,
          // query,
          del,
        })
      },
    )

    const store: DocstorePinia<K, I> = useStore()

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
