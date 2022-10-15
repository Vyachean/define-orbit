import {
  computed, reactive, readonly, toRefs,
} from 'vue'
import { defineStore } from 'pinia'
import CounterStore from 'orbit-db-counterstore'
import OrbitStore from 'orbit-db-store'
import { GeneralOrbitPinia, Options } from './models'
import { defineStaticState } from './defineStaticState'
import { GeneralOrbitState } from './defineDB'
import { useGetDB } from './useGetDB'

export interface CounterPinia extends GeneralOrbitPinia {
  inc(value?: number): Promise<string>;

  value: number | undefined;
}

export const defineCounter = <I>(op: Options): () => CounterPinia => {
  const type = 'counter'
  const { identity } = op

  const staticState = defineStaticState(type)

  const getDB = useGetDB<I, 'counter'>(type, op, staticState, identity)

  return (): CounterPinia => {
    const useStore = defineStore(
      `orbit-${'name' in op ? op.name : op.address}`,
      () => {
        const state = reactive<GeneralOrbitState>({
          updated: 0,
        })

        const value = computed<CounterStore['value'] | undefined>(
          (): CounterStore['value'] | undefined => {
            const { db } = staticState
            // для реактивного обновления
            // eslint-disable-next-line no-console
            console.debug(`getter ${db?.address.root || 'undefined'} updated ${state.updated}`)
            return db?.value
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

        const inc = async (v?: number) => (await getDB()).inc(v)

        return ({
          ...toRefs(readonly(state)),
          address,
          updateTime,
          inc,
          value,
        })
      },
    )

    const store: CounterPinia = useStore()

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
