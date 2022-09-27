
// const knownGenesis = {
//     'aleph-node': ['0x70255b4d28de0fc4e1a193d7e175ad1ccef431598211c55538f1018651a0344e'],
//     astar: ['0x9eb76c5184c4ab8679d2d5d819fdf90b9c001403e9e17da2e14b6d8aec4029c6'],
//     'bifrost-kusama': ['0x9f28c6a68e0fc9646eff64935684f6eeeece527e37bbe1f213d22caa1d9d6bed'],
//     genshiro: ['0x9b8cefc0eb5c568b527998bdd76c184e2b76ae561be76e4667072230217ea243'],
//     'interlay-parachain': ['0xbf88efe70e9e0e916416e8bed61f2b45717f517d7f3523e33c7b001e5ffcbc72'],
//     polkadex: ['0x3920bcb4960a1eef5580cd5367ff3f430eef052774f78468852f7b9cb39f8a3c'],
//     rococo: ['0x6408de7737c59c238890533af25896a2c20608d8b380bb01029acb392781063e', '0xaaf2cd1b74b5f726895921259421b534124726263982522174147046b8827897', '0x037f5f3c8e67b314062025fc886fcd6238ea25a4a9b45dce8d246815c9ebe770', '0xc196f81260cf1686172b47a79cf002120735d7cb0eb1474e8adce56618456fff', '0xf6e9983c37baf68846fedafe21e56718790e39fb1c582abc408b81bc7b208f9a', '0x5fce687da39305dfe682b117f0820b319348e8bb37eb16cf34acbf6a202de9d9', '0xe7c3d5edde7db964317cd9b51a3a059d7cd99f81bdbce14990047354334c9779', '0x1611e1dbf0405379b861e2e27daa90f480b2e6d3682414a80835a52e8cb8a215', '0x343442f12fa715489a8714e79a7b264ea88c0d5b8c66b684a7788a516032f6b9', '0x78bcd530c6b3a068bc17473cf5d2aff9c287102bed9af3ae3c41c33b9d6c6147', '0x47381ee0697153d64404fc578392c8fd5cba9073391908f46c888498415647bd', '0x19c0e4fa8ab75f5ac7865e0b8f74ff91eb9a100d336f423cd013a8befba40299'],
//     statemine: ['0x48239ef607d7928874027a43a67689209727dfb3d3dc5e5b03a39bdc2eda771a'],
//     statemint: ['0x68d56f15f85d3136970ec16946040bc1752654e906147f7e43e9d539d7c3de2f'],
//     unique: ['0x84322d9cddbf35088f1e54e9a85c967a41a56a4f43445768125e61af166c7d31'],
//     westend: ['0xe143f23803ac50e8f6f8e62695d1ce9e4e1d68aa36c1cd2cfd15340213f3423e'],
//     xxnetwork: ['0x50dd5d206917bf10502c68fb4d18a59fc8aa31586f4e8856b493e43544aa82aa']
//   };
// https://github.com/automata-network/polkadot-json-common/blob/master/packages/networks/src/substrate.ts
export const knownSubstrate = [
    {
      decimals: 10000000000,
      displayName: 'Polkadot Relay Chain',
      network: 'polkadot',
      prefix: 0,
      standardAccount: '*25519',
      symbols: ['DOT'],
      website: 'https://polkadot.network',
      genesis: ['0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3'],
      rpc:'wss://rpc.polkadot.io'
    },
    {
      decimals: 1000000000000,
      displayName: 'Kusama Relay Chain',
      network: 'kusama',
      prefix: 2,
      standardAccount: '*25519',
      symbols: ['KSM'],
      website: 'https://kusama.network',
      genesis: ['0xb0a8d493285c2df73290dfb7e61f870f17b41801197a149ca93654499ea3dafe', // Kusama CC3,
      '0xe3777fa922cafbff200cadeaea1a76bd7898ad5b89f7848999058b50e715f636', // Kusama CC2
      '0x3fd7b9eb6a00376e5be61f01abb429ffb0b104be05eaff4d458da48fcd425baf' // Kusama CC1
      ],
      rpc:'wss://kusama-rpc.dwellir.com'
    },
    {
      decimals: 1000000000000,
      displayName: 'Acala',
      network: 'acala',
      prefix: 10,
      standardAccount: '*25519',
      symbols: ['ACA'],
      website: 'https://acala.network/',
      genesis: ['0xfc41b9bd8ef8fe53d58c7ea67c794c7ec9a73daf05e6d54b14ff6342c99ba64c'],
      rpc:'wss://acala.polkawallet.io'
    },
    {
      decimals: 1000000000000000000,
      displayName: 'Moonbeam',
      network: 'moonbeam',
      prefix: 1284,
      standardAccount: '*1284',
      symbols: ['GLMR'],
      website: 'https://bsx.fi',
      genesis: ['0xfe58ea77779b7abda7da4ec526d14db9b1e9cd40a217c34892af80a9b332b76d'],
      rpc:'wss://moonbeam.public.blastapi.io'
    },
    {
      decimals: 1000000000000000000,
      displayName: 'Astar',
      network: 'astar',
      prefix: 5,
      standardAccount: '*1284',
      symbols: ['ASTR'],
      website: 'https://astar.network/',
      genesis: ['0x9eb76c5184c4ab8679d2d5d819fdf90b9c001403e9e17da2e14b6d8aec4029c6'],
      rpc:'wss://rpc.astar.network'
    },
    {
      decimals: 1000000000000,
      displayName: 'Rococo Test',
      network: 'rococo',
      prefix: 172,
      standardAccount: '*25519',
      symbols: ['ROC'],
      website: 'https://rococo.subscan.io/',
      genesis: [],
      rpc:'wss://rococo-rpc.polkadot.io'
    },
  ]