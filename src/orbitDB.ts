import OrbitDB from 'orbit-db'
import { Identity } from 'orbit-db-identity-provider'
import { IPFSClient } from 'ipfs-message-port-client'
import { IPFS } from 'ipfs-core'
import { asyncOnce } from './asyncOnce'
import useIPFS from './ipfs/ipfs'

let orbitDB: OrbitDB | undefined
let identityState: Identity | undefined

export const useOrbitDB = asyncOnce(async (identity?: Identity) => {
  if (orbitDB && identity === identityState) {
    return orbitDB
  }
  const ipfs: IPFSClient | IPFS = await useIPFS()

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  orbitDB = await OrbitDB.createInstance(ipfs, {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line no-undef
    id: !identity ? window.crypto.randomUUID() : undefined,
    identity,
  })

  // eslint-disable-next-line no-undef
  Object.assign(window, { orbitDB })
  return orbitDB
})
