import { Options } from 'ipfs-core'

export const options:Options = {
  relay: { enabled: true, hop: { enabled: true, active: true } },
  EXPERIMENTAL: {
    ipnsPubsub: true,
  },
  repo: './ipmh',
  config: {
    Addresses: {
      Swarm: [
        // Use IPFS dev signal server
        // '/dns4/star-signal.cloud.ipfs.team/wss/p2p-webrtc-star',
        // '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star',
        // Use IPFS dev webrtc signal server todo: надо развернуть свой сигнальный сервер и поискать стабильные публичные
        '/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star/',
        '/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star/',
        '/dns4/webrtc-star.discovery.libp2p.io/tcp/443/wss/p2p-webrtc-star/',
        // Use local signal server
        // '/ip4/0.0.0.0/tcp/9090/wss/p2p-webrtc-star',
      ],
    },
  },
}
