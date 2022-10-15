import type { IPFSClient } from 'ipfs-message-port-client'
import type { IPFS } from 'ipfs-core'
import { asyncOnce } from '../asyncOnce'
import { options } from './ipfsOptions'

let node: IPFSClient | IPFS | undefined

export const useIPFS:() => Promise<IPFSClient|IPFS> = asyncOnce(
  async ():Promise<IPFSClient|IPFS> => {
    if (node) {
      return node
    }

    // todo: для работы в SharedWorker нужен полифил WebRTC в SharedWorker

    // if (window.SharedWorker) {
    //   const { IPFSClient } = await import('ipfs-message-port-client')
    //
    //   const worker = new SharedWorker(new URL('worker-ipfs.ts', import.meta.url), { type: 'module' })
    //
    //   node = IPFSClient.from(worker.port)
    //   return node
    // }
    const { create } = await import('ipfs-core')
    node = await create(options)
    return node
  },
)

export default useIPFS

export const sizeStream = (data:Uint8Array[]): number => data
  .reduce((bite, chunk) => bite + chunk.length, 0)
