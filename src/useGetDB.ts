import { Identity } from 'orbit-db-identity-provider'
import { Options, OrbitDBTypes, StaticState } from './models'
import { useOrbitDB } from './orbitDB'

const defineDBCreate = <I, T extends keyof OrbitDBTypes<I>>(
  name: string,
  type: T,
  staticState: StaticState<T>,
  identity?: Identity,
) => async ():Promise<OrbitDBTypes<I>[T]> => {
    let { db } = staticState

    if (db === undefined) {
      const orbitDB = await useOrbitDB(identity)

      db = await orbitDB.create(name, type) as OrbitDBTypes<I>[T]

      staticState.db = db
    }

    return db
  }

const defineDBOpen = <I, T extends keyof OrbitDBTypes<I>>(
  address: string,
  type: T,
  staticState: StaticState<T>,
  identity?: Identity,
) => async ():Promise<OrbitDBTypes<I>[T]> => {
    let { db } = staticState

    if (db === undefined) {
      const orbitDB = await useOrbitDB(identity)

      db = await orbitDB.open(address) as OrbitDBTypes<I>[T]
      staticState.db = db
    }

    return db
  }

export const useGetDB = <I, T extends keyof OrbitDBTypes<I>>(
  type: T,
  op: Options,
  staticState: StaticState<T>,
  identity?: Identity,
) => ('address' in op
    ? defineDBOpen<I, T>(op.address, type, staticState, identity)
    : defineDBCreate<I, T>(op.name, type, staticState, identity))
