import { OrbitDBTypes, StaticState } from './models'

export const defineStaticState = <
  T extends keyof OrbitDBTypes<unknown>
  >(type: T) => (<StaticState<T>>{
    [type]: undefined,
  })
