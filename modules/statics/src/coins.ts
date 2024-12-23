import {
  account,
  AccountCoin,
  algoToken,
  arbethErc20,
  avaxErc20,
  beraErc20,
  bscToken,
  celoToken,
  eosToken,
  erc1155,
  erc20CompatibleAccountCoin,
  erc721,
  fiat,
  hederaCoin,
  hederaToken,
  nonstandardToken,
  opethErc20,
  polygonErc20,
  solToken,
  stellarToken,
  suiToken,
  talgoToken,
  tarbethErc20,
  tavaxErc20,
  tberaErc20,
  tbscToken,
  tceloToken,
  teosToken,
  terc1155,
  terc20,
  terc721,
  topethErc20,
  tpolygonErc20,
  tronToken,
  tsolToken,
  tstellarToken,
  tsuiToken,
  ttronToken,
  txrpToken,
  tzkethErc20,
  xrpToken,
  zkethErc20,
} from './account';
import { Ada, ada } from './ada';
import { avaxp } from './avaxp';
import { BaseUnit, CoinFeature, CoinKind, KeyCurve, UnderlyingAsset } from './base';
import { erc20Coins } from './coins/erc20Coins';
import { CoinMap } from './map';
import { Networks } from './networks';
import {
  ofc,
  ofcAlgoToken,
  ofcArbethErc20,
  ofcAvaxErc20,
  ofcBscToken,
  ofcerc20,
  ofcHederaToken,
  ofcOpethErc20,
  ofcPolygonErc20,
  ofcsolToken,
  ofcStellarToken,
  ofcTronToken,
  ofcXrpToken,
  tofc,
  tofcAlgoToken,
  tofcArbethErc20,
  tofcAvaxErc20,
  tofcerc20,
  tofcHederaToken,
  tofcPolygonErc20,
  tofcsolToken,
  tofcStellarToken,
  tofcTronToken,
  tofcXrpToken,
} from './ofc';
import { utxoCoins } from './utxo';
import { lightningCoins } from './lightning';
import { ETH_FEATURES, WETH_FEATURES, MATIC_FEATURES } from './features';

const ETH_FEATURES_WITH_MMI = [...ETH_FEATURES, CoinFeature.METAMASK_INSTITUTIONAL];
const ETH_FEATURES_WITH_STAKING = [...ETH_FEATURES, CoinFeature.STAKING];
const ETH_FEATURES_WITH_STAKING_AND_MMI = [...ETH_FEATURES_WITH_STAKING, CoinFeature.METAMASK_INSTITUTIONAL];
const ETC_FEATURES = [
  ...ETH_FEATURES,
  CoinFeature.CUSTODY_BITGO_GERMANY,
  CoinFeature.CUSTODY_BITGO_FRANKFURT,
  CoinFeature.CUSTODY_BITGO_NEW_YORK,
  CoinFeature.MULTISIG_COLD,
];

const AVAXC_FEATURES = [
  ...ETH_FEATURES_WITH_MMI,
  CoinFeature.CUSTODY_BITGO_GERMANY,
  CoinFeature.CUSTODY_BITGO_FRANKFURT,
  CoinFeature.CUSTODY_BITGO_SWITZERLAND,
  CoinFeature.CUSTODY_BITGO_SINGAPORE,
  CoinFeature.MULTISIG_COLD,
];
const CELO_FEATURES = [
  ...ETH_FEATURES,
  CoinFeature.CUSTODY_BITGO_GERMANY,
  CoinFeature.CUSTODY_BITGO_FRANKFURT,
  CoinFeature.CUSTODY_BITGO_SINGAPORE,
  CoinFeature.MULTISIG_COLD,
];
const ETH2_FEATURES = [...AccountCoin.DEFAULT_FEATURES, CoinFeature.SUPPORTS_TOKENS];
const RBTC_FEATURES = [
  ...ETH_FEATURES,
  CoinFeature.MULTISIG_COLD,
  CoinFeature.CUSTODY_BITGO_GERMANY,
  CoinFeature.CUSTODY_BITGO_FRANKFURT,
  CoinFeature.CUSTODY_BITGO_SINGAPORE,
];
const XLM_FEATURES = [
  ...AccountCoin.DEFAULT_FEATURES,
  CoinFeature.SUPPORTS_TOKENS,
  CoinFeature.CUSTODY_BITGO_GERMANY,
  CoinFeature.CUSTODY_BITGO_NEW_YORK,
  CoinFeature.CUSTODY_BITGO_FRANKFURT,
  CoinFeature.CUSTODY_BITGO_SINGAPORE,
  CoinFeature.MULTISIG_COLD,
];
const XTZ_FEATURES = [
  ...AccountCoin.DEFAULT_FEATURES,
  CoinFeature.MULTISIG_COLD,
  CoinFeature.ENTERPRISE_PAYS_FEES,
].filter((feature) => feature !== CoinFeature.CUSTODY && feature !== CoinFeature.CUSTODY_BITGO_TRUST);

const XRP_FEATURES = [
  ...AccountCoin.DEFAULT_FEATURES,
  CoinFeature.SUPPORTS_TOKENS,
  CoinFeature.CUSTODY_BITGO_GERMANY,
  CoinFeature.CUSTODY_BITGO_NEW_YORK,
  CoinFeature.CUSTODY_BITGO_FRANKFURT,
  CoinFeature.CUSTODY_BITGO_SINGAPORE,
  CoinFeature.MULTISIG_COLD,
];
const POLYGON_TOKEN_FEATURES_WITH_FRANKFURT = [
  ...AccountCoin.DEFAULT_FEATURES,
  CoinFeature.CUSTODY_BITGO_FRANKFURT,
  CoinFeature.BULK_TRANSACTION,
];
const CSPR_FEATURES = [
  ...AccountCoin.DEFAULT_FEATURES,
  CoinFeature.REQUIRES_RESERVE,
  CoinFeature.CUSTODY_BITGO_GERMANY,
  CoinFeature.CUSTODY_BITGO_SWITZERLAND,
  CoinFeature.CUSTODY_BITGO_FRANKFURT,
  CoinFeature.CUSTODY_BITGO_SINGAPORE,
  CoinFeature.MULTISIG_COLD,
  CoinFeature.STAKING,
];
const ALGO_FEATURES = [
  ...AccountCoin.DEFAULT_FEATURES,
  CoinFeature.SUPPORTS_TOKENS,
  CoinFeature.CUSTODY_BITGO_SWITZERLAND,
  CoinFeature.CUSTODY_BITGO_GERMANY,
  CoinFeature.CUSTODY_BITGO_FRANKFURT,
  CoinFeature.CUSTODY_BITGO_SINGAPORE,
  CoinFeature.MULTISIG_COLD,
  CoinFeature.BULK_TRANSACTION,
];
const HTETH_TOKEN_FEATURES = [...AccountCoin.DEFAULT_FEATURES, CoinFeature.BULK_TRANSACTION];
const ADA_FEATURES = [...Ada.DEFAULT_FEATURES, CoinFeature.BULK_TRANSACTION];
const ADA_FEATURES_WITH_FRANKFURT = [...ADA_FEATURES, CoinFeature.CUSTODY_BITGO_FRANKFURT];
const DOT_FEATURES = [
  ...AccountCoin.DEFAULT_FEATURES,
  CoinFeature.TSS,
  CoinFeature.TSS_COLD,
  CoinFeature.STAKING,
  CoinFeature.EXPIRING_TRANSACTIONS,
  CoinFeature.REBUILD_ON_CUSTODY_SIGNING,
  CoinFeature.CUSTODY_BITGO_FRANKFURT,
];
const EOS_FEATURES = [
  ...AccountCoin.DEFAULT_FEATURES,
  CoinFeature.SUPPORTS_TOKENS,
  CoinFeature.CUSTODY_BITGO_GERMANY,
  CoinFeature.CUSTODY_BITGO_FRANKFURT,
  CoinFeature.CUSTODY_BITGO_SINGAPORE,
  CoinFeature.MULTISIG_COLD,
];
const HBAR_FEATURES = [
  ...AccountCoin.DEFAULT_FEATURES,
  CoinFeature.SUPPORTS_TOKENS,
  CoinFeature.CUSTODY_BITGO_GERMANY,
  CoinFeature.CUSTODY_BITGO_FRANKFURT,
  CoinFeature.CUSTODY_BITGO_SINGAPORE,
  CoinFeature.MULTISIG_COLD,
  CoinFeature.BULK_TRANSACTION,
];
const POLYGON_FEATURES = [
  ...ETH_FEATURES_WITH_MMI,
  CoinFeature.TSS,
  CoinFeature.TSS_COLD,
  CoinFeature.MULTISIG_COLD,
  CoinFeature.EVM_WALLET,
  CoinFeature.CUSTODY_BITGO_GERMANY,
  CoinFeature.CUSTODY_BITGO_SWITZERLAND,
  CoinFeature.CUSTODY_BITGO_FRANKFURT,
  CoinFeature.MPCV2,
  CoinFeature.STUCK_TRANSACTION_MANAGEMENT_TSS,
  CoinFeature.BULK_TRANSACTION,
];

const POLYGON_TOKEN_FEATURES = [...AccountCoin.DEFAULT_FEATURES, CoinFeature.BULK_TRANSACTION];

const SOL_FEATURES = [
  ...AccountCoin.DEFAULT_FEATURES,
  CoinFeature.TSS,
  CoinFeature.TSS_COLD,
  CoinFeature.REQUIRES_RESERVE,
  CoinFeature.SUPPORTS_TOKENS,
  CoinFeature.STAKING,
  CoinFeature.CUSTODY_BITGO_GERMANY,
  CoinFeature.CUSTODY_BITGO_FRANKFURT,
  CoinFeature.BULK_TRANSACTION,
];
const TSOL_FEATURES = [...SOL_FEATURES, CoinFeature.BULK_TRANSACTION, CoinFeature.CUSTODY_BITGO_SINGAPORE];
const SOL_TOKEN_FEATURES = [
  ...AccountCoin.DEFAULT_FEATURES,
  CoinFeature.TSS,
  CoinFeature.TSS_COLD,
  CoinFeature.BULK_TRANSACTION,
];
const SOL_OFC_TOKEN_FEATURES = [...AccountCoin.DEFAULT_FEATURES, CoinFeature.TSS, CoinFeature.TSS_COLD];
const BSC_TOKEN_FEATURES = [...AccountCoin.DEFAULT_FEATURES, CoinFeature.BULK_TRANSACTION];
const BSC_TOKEN_FEATURES_EXCLUDE_SINGAPORE = [
  ...AccountCoin.DEFAULT_FEATURES_EXCLUDE_SINGAPORE,
  CoinFeature.BULK_TRANSACTION,
];
const STX_FEATURES = [
  ...AccountCoin.DEFAULT_FEATURES,
  CoinFeature.CUSTODY_BITGO_GERMANY,
  CoinFeature.CUSTODY_BITGO_FRANKFURT,
  CoinFeature.CUSTODY_BITGO_SINGAPORE,
  CoinFeature.MULTISIG_COLD,
  CoinFeature.STAKING,
];
const NEAR_FEATURES = [
  ...AccountCoin.DEFAULT_FEATURES,
  CoinFeature.TSS,
  CoinFeature.TSS_COLD,
  CoinFeature.STAKING,
  CoinFeature.REBUILD_ON_CUSTODY_SIGNING,
  CoinFeature.CUSTODY_BITGO_FRANKFURT,
];

const TWETH_FEATURES = [...WETH_FEATURES, CoinFeature.STAKING];

const SUI_FEATURES = [
  ...AccountCoin.DEFAULT_FEATURES,
  CoinFeature.TSS,
  CoinFeature.TSS_COLD,
  CoinFeature.STAKING,
  CoinFeature.BULK_TRANSACTION,
  CoinFeature.BULK_STAKING_TRANSACTION,
  CoinFeature.SUPPORTS_TOKENS,
  CoinFeature.CUSTODY_BITGO_FRANKFURT,
];
const SUI_TOKEN_FEATURES = [
  ...AccountCoin.DEFAULT_FEATURES,
  CoinFeature.TSS,
  CoinFeature.TSS_COLD,
  CoinFeature.BULK_TRANSACTION,
];
const TRX_FEATURES = [
  ...AccountCoin.DEFAULT_FEATURES,
  CoinFeature.SUPPORTS_TOKENS,
  CoinFeature.CUSTODY_BITGO_GERMANY,
  CoinFeature.CUSTODY_BITGO_FRANKFURT,
  CoinFeature.CUSTODY_BITGO_SINGAPORE,
  CoinFeature.MULTISIG_COLD,
];
const COSMOS_SIDECHAIN_FEATURES = [
  ...AccountCoin.DEFAULT_FEATURES,
  CoinFeature.TSS,
  CoinFeature.TSS_COLD,
  CoinFeature.MPCV2,
  CoinFeature.STAKING,
  CoinFeature.SHA256_WITH_ECDSA_TSS,
  CoinFeature.COSMOS_LIKE_COINS,
  CoinFeature.REBUILD_ON_CUSTODY_SIGNING,
  CoinFeature.INCREASED_TX_REQUEST_REBUILD_LIMIT,
  CoinFeature.BULK_TRANSACTION,
  CoinFeature.BULK_STAKING_TRANSACTION,
  CoinFeature.STUCK_TRANSACTION_MANAGEMENT_TSS,
];
const ATOM_FEATURES = [...COSMOS_SIDECHAIN_FEATURES, CoinFeature.CUSTODY_BITGO_FRANKFURT];
const INJECTIVE_FEATURES = [
  ...COSMOS_SIDECHAIN_FEATURES,
  CoinFeature.CUSTODY_BITGO_SWITZERLAND,
  CoinFeature.CUSTODY_BITGO_FRANKFURT,
];
const COREUM_FEATURES = [...COSMOS_SIDECHAIN_FEATURES, CoinFeature.CUSTODY_BITGO_FRANKFURT];
const SEI_FEATURES = [...COSMOS_SIDECHAIN_FEATURES, CoinFeature.CUSTODY_BITGO_FRANKFURT];
const TOKEN_FEATURES_WITH_FRANKFURT = [...AccountCoin.DEFAULT_FEATURES, CoinFeature.CUSTODY_BITGO_FRANKFURT];

const GENERIC_TOKEN_FEATURES = [
  CoinFeature.ACCOUNT_MODEL,
  CoinFeature.REQUIRES_BIG_NUMBER,
  CoinFeature.VALUELESS_TRANSFER,
  CoinFeature.TRANSACTION_DATA,
  CoinFeature.GENERIC_TOKEN,
];
const TON_FEATURES = [
  ...AccountCoin.DEFAULT_FEATURES,
  CoinFeature.TSS,
  CoinFeature.TSS_COLD,
  CoinFeature.STAKING,
  CoinFeature.REBUILD_ON_CUSTODY_SIGNING,
  CoinFeature.CUSTODY_BITGO_FRANKFURT,
];
const ARBETH_FEATURES = [
  ...ETH_FEATURES,
  CoinFeature.MULTISIG_COLD,
  CoinFeature.EVM_WALLET,
  CoinFeature.USES_NON_PACKED_ENCODING_FOR_TXDATA,
  CoinFeature.ETH_ROLLUP_CHAIN,
  CoinFeature.CUSTODY_BITGO_FRANKFURT,
];
const OPETH_FEATURES = [
  ...ETH_FEATURES,
  CoinFeature.MULTISIG_COLD,
  CoinFeature.EVM_WALLET,
  CoinFeature.USES_NON_PACKED_ENCODING_FOR_TXDATA,
  CoinFeature.ETH_ROLLUP_CHAIN,
  CoinFeature.CUSTODY_BITGO_FRANKFURT,
];
const ZKETH_FEATURES = [
  ...ETH_FEATURES,
  CoinFeature.MULTISIG_COLD,
  CoinFeature.EVM_WALLET,
  CoinFeature.USES_NON_PACKED_ENCODING_FOR_TXDATA,
  CoinFeature.ETH_ROLLUP_CHAIN,
];
const BERA_FEATURES = [
  ...ETH_FEATURES,
  CoinFeature.MULTISIG_COLD,
  CoinFeature.EVM_WALLET,
  CoinFeature.USES_NON_PACKED_ENCODING_FOR_TXDATA,
  CoinFeature.BULK_TRANSACTION,
];
const OAS_FEATURES = [
  ...ETH_FEATURES,
  CoinFeature.TSS,
  CoinFeature.TSS_COLD,
  CoinFeature.MPCV2,
  CoinFeature.EVM_WALLET,
  CoinFeature.BULK_TRANSACTION,
  CoinFeature.STUCK_TRANSACTION_MANAGEMENT_TSS,
];
const COREDAO_FEATURES = [
  ...ETH_FEATURES,
  CoinFeature.TSS,
  CoinFeature.TSS_COLD,
  CoinFeature.MPCV2,
  CoinFeature.EVM_WALLET,
  CoinFeature.BULK_TRANSACTION,
  CoinFeature.STUCK_TRANSACTION_MANAGEMENT_TSS,
];
const APT_FEATURES = [
  ...AccountCoin.DEFAULT_FEATURES,
  CoinFeature.TSS,
  CoinFeature.TSS_COLD,
  CoinFeature.STAKING,
  CoinFeature.BULK_TRANSACTION,
  CoinFeature.BULK_STAKING_TRANSACTION,
  CoinFeature.SUPPORTS_TOKENS,
];
const SOL_TOKEN_FEATURES_WITH_FRANKFURT = [
  ...SOL_TOKEN_FEATURES,
  CoinFeature.CUSTODY_BITGO_FRANKFURT,
  CoinFeature.BULK_TRANSACTION,
];
const SOL_TOKEN_FEATURES_WITH_FRANKFURT_GERMANY = [
  ...SOL_TOKEN_FEATURES_WITH_FRANKFURT,
  CoinFeature.CUSTODY_BITGO_GERMANY,
];
const XLM_TOKEN_FEATURES_WITH_FRANKFURT = [...AccountCoin.DEFAULT_FEATURES, CoinFeature.CUSTODY_BITGO_FRANKFURT];
const ZETA_FEATURES = [...COSMOS_SIDECHAIN_FEATURES, CoinFeature.CUSTODY_BITGO_SINGAPORE];

const TIA_FEATURES = [
  ...COSMOS_SIDECHAIN_FEATURES,
  CoinFeature.CUSTODY_BITGO_SWITZERLAND,
  CoinFeature.CUSTODY_BITGO_FRANKFURT,
];
const WCT_FEATURES = [...AccountCoin.DEFAULT_FEATURES, CoinFeature.STAKING];

export const coins = CoinMap.fromCoins([
  ...lightningCoins,
  ...utxoCoins,
  ...erc20Coins,
  avaxp(
    '5436386e-9e4d-4d82-92df-59d9720d1738',
    'avaxp',
    'Avalanche P-Chain',
    Networks.main.avalancheP,
    UnderlyingAsset.AVAXP
  ),
  avaxp(
    'ea330a11-3814-4b74-994b-e61e05b34ec3',
    'tavaxp',
    'Testnet Avalanche P-Chain',
    Networks.test.avalancheP,
    UnderlyingAsset.AVAXP
  ),
  ada(
    'fd4d125e-f14f-414b-bd17-6cb1393265f0',
    'ada',
    'Cardano ADA',
    Networks.main.ada,
    UnderlyingAsset.ADA,
    ADA_FEATURES_WITH_FRANKFURT
  ),
  ada(
    '1cbfb5aa-94ba-415b-b5c2-c51e801e21b3',
    'tada',
    'Testnet Cardano ADA',
    Networks.test.ada,
    UnderlyingAsset.ADA,
    ADA_FEATURES_WITH_FRANKFURT
  ),
  account(
    'ec41e62a-cc57-4aa0-9b9e-217da1226817',
    'algo',
    'Algorand',
    Networks.main.algorand,
    6,
    UnderlyingAsset.ALGO,
    BaseUnit.ALGO,
    ALGO_FEATURES,
    KeyCurve.Ed25519
  ),
  account(
    '9595aa8c-7add-4ede-a61b-b176cadade81',
    'talgo',
    'Testnet Algorand',
    Networks.test.algorand,
    6,
    UnderlyingAsset.ALGO,
    BaseUnit.ALGO,
    ALGO_FEATURES,
    KeyCurve.Ed25519
  ),
  account(
    'd716be0f-d8e7-4f1e-962e-e11c79ec4381',
    'avaxc',
    'Avalanche C-Chain',
    Networks.main.avalancheC,
    18,
    UnderlyingAsset.AVAXC,
    BaseUnit.ETH,
    AVAXC_FEATURES
  ),
  account(
    '91a971d1-1dc1-4953-8828-82bef859acfa',
    'tavaxc',
    'Testnet Avalanche C-Chain',
    Networks.test.avalancheC,
    18,
    UnderlyingAsset.AVAXC,
    BaseUnit.ETH,
    AVAXC_FEATURES
  ),
  account(
    'f3f0f790-fc53-40ba-a9cc-71909fc50566',
    'cspr',
    'Casper',
    Networks.main.casper,
    9,
    UnderlyingAsset.CSPR,
    BaseUnit.CSPR,
    CSPR_FEATURES
  ),
  account(
    'bd8f0b27-d13b-41c8-9f60-84fc1f201d89',
    'tcspr',
    'Testnet Casper',
    Networks.test.casper,
    9,
    UnderlyingAsset.CSPR,
    BaseUnit.CSPR,
    CSPR_FEATURES
  ),
  account(
    'aa1fc03b-c499-4240-a703-f6510517f97f',
    'dot',
    'Polkadot',
    Networks.main.dot,
    10,
    UnderlyingAsset.DOT,
    BaseUnit.DOT,
    DOT_FEATURES,
    KeyCurve.Ed25519
  ),
  account(
    '85b966bd-d1cc-4a86-a937-b1afab659e7b',
    'tdot',
    'Testnet Polkadot',
    Networks.test.dot,
    12,
    UnderlyingAsset.DOT,
    BaseUnit.DOT,
    DOT_FEATURES,
    KeyCurve.Ed25519
  ),
  account(
    '39dbafaf-02d0-42c9-95fb-f676f92dc039',
    'eth',
    'Ethereum',
    Networks.main.ethereum,
    18,
    UnderlyingAsset.ETH,
    BaseUnit.ETH,
    [
      ...ETH_FEATURES_WITH_STAKING_AND_MMI,
      CoinFeature.TSS,
      CoinFeature.TSS_COLD,
      CoinFeature.MPCV2,
      CoinFeature.MULTISIG_COLD,
      CoinFeature.EVM_WALLET,
      CoinFeature.CUSTODY_BITGO_GERMANY,
      CoinFeature.CUSTODY_BITGO_NEW_YORK,
      CoinFeature.CUSTODY_BITGO_SWITZERLAND,
      CoinFeature.CUSTODY_BITGO_FRANKFURT,
      CoinFeature.CUSTODY_BITGO_SINGAPORE,
      CoinFeature.BULK_TRANSACTION,
      CoinFeature.STUCK_TRANSACTION_MANAGEMENT_ONCHAIN,
      CoinFeature.STUCK_TRANSACTION_MANAGEMENT_TSS,
    ]
  ), // we should probably refactor this into a eth() method
  account(
    '25f9ade1-d768-45ec-8b44-e55c2e5f472d',
    'teth',
    'Kovan Testnet Ethereum (Deprecated)',
    Networks.test.kovan,
    18,
    UnderlyingAsset.ETH,
    BaseUnit.ETH,
    [...ETH_FEATURES, CoinFeature.DEPRECATED]
  ),
  account(
    '41b75ac4-46d6-4dac-b741-bf11406b142f',
    'gteth',
    'Goerli Testnet Ethereum',
    Networks.test.goerli,
    18,
    UnderlyingAsset.ETH,
    BaseUnit.ETH,
    [
      ...ETH_FEATURES_WITH_STAKING_AND_MMI,
      CoinFeature.TSS,
      CoinFeature.TSS_COLD,
      CoinFeature.MULTISIG_COLD,
      CoinFeature.EVM_WALLET,
      CoinFeature.CUSTODY_BITGO_GERMANY,
      CoinFeature.CUSTODY_BITGO_NEW_YORK,
      CoinFeature.CUSTODY_BITGO_SWITZERLAND,
      CoinFeature.CUSTODY_BITGO_FRANKFURT,
      CoinFeature.CUSTODY_BITGO_SINGAPORE,
    ]
  ),
  account(
    '68aec0bd-1d9a-40fa-bcef-7fa9538f65d3',
    'hteth',
    'Holesky Testnet Ethereum',
    Networks.test.holesky,
    18,
    UnderlyingAsset.ETH,
    BaseUnit.ETH,
    [
      ...ETH_FEATURES_WITH_STAKING_AND_MMI,
      CoinFeature.TSS,
      CoinFeature.TSS_COLD,
      CoinFeature.MPCV2,
      CoinFeature.MULTISIG_COLD,
      CoinFeature.EVM_WALLET,
      CoinFeature.CUSTODY_BITGO_GERMANY,
      CoinFeature.CUSTODY_BITGO_NEW_YORK,
      CoinFeature.CUSTODY_BITGO_SWITZERLAND,
      CoinFeature.CUSTODY_BITGO_FRANKFURT,
      CoinFeature.CUSTODY_BITGO_SINGAPORE,
      CoinFeature.BULK_TRANSACTION,
      CoinFeature.STUCK_TRANSACTION_MANAGEMENT_ONCHAIN,
      CoinFeature.STUCK_TRANSACTION_MANAGEMENT_TSS,
    ]
  ),
  account(
    'bfe3a3d5-2210-4bac-b494-40c45ed89267',
    'eth2',
    'Ethereum 2.0',
    Networks.main.ethereum2,
    18,
    UnderlyingAsset.ETH2,
    BaseUnit.ETH,
    [...ETH2_FEATURES, CoinFeature.TSS, CoinFeature.MULTISIG_COLD, CoinFeature.TSS_COLD],
    KeyCurve.BLS
  ),
  account(
    '33712672-8cb9-444e-be92-b8c9e84050d5',
    'ethw',
    'Ethereum PoW',
    Networks.main.ethereumW,
    18,
    UnderlyingAsset.ETHW,
    BaseUnit.ETH,
    [...AccountCoin.DEFAULT_FEATURES]
  ),
  account(
    '37ee6253-04fb-4eec-bd88-310a480b1e43',
    'teth2',
    'Testnet Ethereum 2.0',
    Networks.test.pyrmont,
    18,
    UnderlyingAsset.ETH2,
    BaseUnit.ETH,
    [...ETH2_FEATURES, CoinFeature.TSS, CoinFeature.MULTISIG_COLD, CoinFeature.TSS_COLD],
    KeyCurve.BLS
  ),
  account(
    '2660f6f6-1980-4584-a0b3-487d4a832b9f',
    'tbaseeth',
    'Base Sepolia Chain',
    Networks.test.basechain,
    18,
    UnderlyingAsset.BASEETH,
    BaseUnit.ETH,
    [...ETH_FEATURES, CoinFeature.USES_NON_PACKED_ENCODING_FOR_TXDATA]
  ),
  account(
    'd51fe324-1e01-4630-9b04-c724fe495a1c',
    'baseeth',
    'Base Chain',
    Networks.main.basechain,
    18,
    UnderlyingAsset.BASEETH,
    BaseUnit.ETH,
    [...ETH_FEATURES, CoinFeature.USES_NON_PACKED_ENCODING_FOR_TXDATA]
  ),
  account(
    'ffc472f5-27c6-49f8-ad9a-f57659258fb9',
    'etc',
    'Ethereum Classic',
    Networks.main.ethereumClassic,
    18,
    UnderlyingAsset.ETC,
    BaseUnit.ETH,
    ETC_FEATURES
  ),
  account(
    '49c048a1-40b3-4c85-8bbd-adf7ef9393be',
    'tetc',
    'Testnet Ethereum Classic',
    Networks.test.ethereumClassicTestnet,
    18,
    UnderlyingAsset.ETC,
    BaseUnit.ETH,
    ETC_FEATURES
  ),
  account(
    '4d1f8b5c-ae96-42b9-94b9-a310c655779e',
    'eos',
    'Eos',
    Networks.main.eos,
    4,
    UnderlyingAsset.EOS,
    BaseUnit.EOS,
    EOS_FEATURES
  ),
  account(
    '024af1f1-41d8-4df9-b8a1-df74dac5907a',
    'teos',
    'Testnet Eos',
    Networks.test.eos,
    4,
    UnderlyingAsset.EOS,
    BaseUnit.EOS,
    EOS_FEATURES
  ),
  account(
    'f465c617-752d-4f6a-b9e7-528bf38f62c3',
    'rbtc',
    'Rootstock RSK',
    Networks.main.rbtc,
    18,
    UnderlyingAsset.RBTC,
    BaseUnit.ETH,
    RBTC_FEATURES
  ),
  account(
    '626b060b-597e-499b-88dd-414f931a743e',
    'trbtc',
    'Testnet Rootstock RSK',
    Networks.test.rbtc,
    18,
    UnderlyingAsset.RBTC,
    BaseUnit.ETH,
    RBTC_FEATURES
  ),
  account(
    '9cf6d137-6c6b-4fc0-acc0-8e78a1599c15',
    'trx',
    'Tron',
    Networks.main.trx,
    6,
    UnderlyingAsset.TRX,
    BaseUnit.TRX,
    TRX_FEATURES
  ),
  account(
    '7e0c65f7-dfdc-4d22-8c31-37936a39d717',
    'ttrx',
    'Testnet Tron',
    Networks.test.trx,
    6,
    UnderlyingAsset.TRX,
    BaseUnit.TRX,
    TRX_FEATURES
  ),
  account(
    'a4578c23-8e01-4d13-bc17-7bf8b529fbef',
    'xrp',
    'Ripple',
    Networks.main.xrp,
    6,
    UnderlyingAsset.XRP,
    BaseUnit.XRP,
    XRP_FEATURES
  ),
  account(
    'cdf3b41b-176a-4b48-859b-88b7869c51e9',
    'txrp',
    'Testnet Ripple',
    Networks.test.xrp,
    6,
    UnderlyingAsset.XRP,
    BaseUnit.XRP,
    XRP_FEATURES
  ),
  account(
    '5beda85f-32fc-4c72-9051-ddcdfb3166a2',
    'xlm',
    'Stellar',
    Networks.main.stellar,
    7,
    UnderlyingAsset.XLM,
    BaseUnit.XLM,
    XLM_FEATURES,
    KeyCurve.Ed25519
  ),
  account(
    'dea5261e-dbe1-4870-b1db-5db9ed0ce63d',
    'txlm',
    'Testnet Stellar',
    Networks.test.stellar,
    7,
    UnderlyingAsset.XLM,
    BaseUnit.XLM,
    XLM_FEATURES,
    KeyCurve.Ed25519
  ),
  account(
    'a789797d-b740-43ad-a347-f19b17353651',
    'xtz',
    'Tezos',
    Networks.main.xtz,
    6,
    UnderlyingAsset.XTZ,
    BaseUnit.XTZ,
    XTZ_FEATURES
  ),
  account(
    '1792f953-c4be-4842-97b3-69efb4f0832c',
    'txtz',
    'Testnet Tezos',
    Networks.test.xtz,
    6,
    UnderlyingAsset.XTZ,
    BaseUnit.XTZ,
    XTZ_FEATURES
  ),
  account(
    '954184e5-ef74-45a5-8513-240f2baabaf6',
    'susd',
    'Silvergate USD',
    Networks.main.susd,
    2,
    UnderlyingAsset.USD,
    BaseUnit.USD
  ),
  account(
    'e424034a-22e6-4bcf-bd04-c598507afe3d',
    'tsusd',
    'Testnet Silvergate USD',
    Networks.test.susd,
    2,
    UnderlyingAsset.USD,
    BaseUnit.USD
  ),
  account(
    '4a903d2c-6487-41fc-bede-77947b80efbb',
    'stx',
    'Stacks',
    Networks.main.stx,
    6,
    UnderlyingAsset.STX,
    BaseUnit.STX,
    STX_FEATURES
  ),
  account(
    '287fc055-e1f6-4ab9-8f2c-97cad4b0f328',
    'tstx',
    'Testnet Stacks',
    Networks.test.stx,
    6,
    UnderlyingAsset.STX,
    BaseUnit.STX,
    STX_FEATURES
  ),
  account(
    '92185a03-356f-4b75-9213-af1c92fe5393',
    'sol',
    'Solana',
    Networks.main.sol,
    9,
    UnderlyingAsset.SOL,
    BaseUnit.SOL,
    SOL_FEATURES,
    KeyCurve.Ed25519
  ),
  account(
    '16445f37-624c-4343-90f2-c62429551871',
    'tsol',
    'Testnet Solana',
    Networks.test.sol,
    9,
    UnderlyingAsset.SOL,
    BaseUnit.SOL,
    TSOL_FEATURES,
    KeyCurve.Ed25519
  ),
  account(
    '8979b9a7-c2ea-4154-b4ae-4b905afe6c4a',
    'sui',
    'Sui',
    Networks.main.sui,
    9,
    UnderlyingAsset.SUI,
    BaseUnit.SUI,
    SUI_FEATURES,
    KeyCurve.Ed25519
  ),
  account(
    '2eb07d12-3a42-49d7-ae98-bf559849b334',
    'tsui',
    'Testnet Sui',
    Networks.test.sui,
    9,
    UnderlyingAsset.SUI,
    BaseUnit.SUI,
    SUI_FEATURES,
    KeyCurve.Ed25519
  ),
  account(
    'a605eecf-f1ff-4230-a856-197cd227832a',
    'atom',
    'Cosmos Hub ATOM',
    Networks.main.atom,
    6,
    UnderlyingAsset.ATOM,
    BaseUnit.ATOM,
    ATOM_FEATURES
  ),
  account(
    '9869004c-d372-42e1-bdd5-9ac8716c86cb',
    'tatom',
    'Testnet Cosmos Hub ATOM',
    Networks.test.atom,
    6,
    UnderlyingAsset.ATOM,
    BaseUnit.ATOM,
    ATOM_FEATURES
  ),
  account(
    '8352bdf2-71e7-4ff1-a5b0-9b88c61aef1d',
    'osmo',
    'Osmosis',
    Networks.main.osmo,
    6,
    UnderlyingAsset.OSMO,
    BaseUnit.OSMO,
    COSMOS_SIDECHAIN_FEATURES
  ),
  account(
    'd813e9c9-f9b9-4d10-a4e2-57d9e3b65e2c',
    'tosmo',
    'Testnet Osmosis',
    Networks.test.osmo,
    6,
    UnderlyingAsset.OSMO,
    BaseUnit.OSMO,
    COSMOS_SIDECHAIN_FEATURES
  ),
  account(
    '6e35c0dc-7ee8-4273-985d-254aa3641c9d',
    'tia',
    'Celestia',
    Networks.main.tia,
    6,
    UnderlyingAsset.TIA,
    BaseUnit.TIA,
    TIA_FEATURES
  ),
  account(
    '6ea4f120-6d26-4070-a12a-a0cac39ea552',
    'ttia',
    'Testnet Celestia',
    Networks.test.tia,
    6,
    UnderlyingAsset.TIA,
    BaseUnit.TIA,
    TIA_FEATURES
  ),
  account(
    '2e20e302-d743-457c-a023-58b80e8d3a15',
    'hash',
    'Provenance',
    Networks.main.hash,
    9,
    UnderlyingAsset.HASH,
    BaseUnit.HASH,
    COSMOS_SIDECHAIN_FEATURES
  ),
  account(
    'feadf3d5-5a9a-427e-8144-7a5085b4d258',
    'thash',
    'Testnet Provenance',
    Networks.test.hash,
    9,
    UnderlyingAsset.HASH,
    BaseUnit.HASH,
    COSMOS_SIDECHAIN_FEATURES
  ),
  account(
    '36700514-fa3c-42d8-9503-98cdcab0b3c3',
    'bld',
    'Agoric',
    Networks.main.bld,
    6,
    UnderlyingAsset.BLD,
    BaseUnit.BLD,
    COSMOS_SIDECHAIN_FEATURES
  ),
  account(
    'e093184f-4134-455f-b870-da0bac213f00',
    'tbld',
    'Testnet Agoric',
    Networks.test.bld,
    6,
    UnderlyingAsset.BLD,
    BaseUnit.BLD,
    COSMOS_SIDECHAIN_FEATURES
  ),
  account(
    '4777265e-37f4-44d8-bccd-13e56189fcae',
    'sei',
    'Sei',
    Networks.main.sei,
    6,
    UnderlyingAsset.SEI,
    BaseUnit.SEI,
    SEI_FEATURES
  ),
  account(
    '5be8a3f3-5c71-41ff-8d87-1ade63ce2543',
    'tsei',
    'Testnet Sei',
    Networks.test.sei,
    6,
    UnderlyingAsset.SEI,
    BaseUnit.SEI,
    SEI_FEATURES
  ),
  account(
    '9fbfb875-fb80-4a37-b844-48b9e48dfcdd',
    'zeta',
    'Zeta',
    Networks.main.zeta,
    18,
    UnderlyingAsset.ZETA,
    BaseUnit.ZETA,
    ZETA_FEATURES
  ),
  account(
    '1aeb7754-1518-4aac-8cc0-e4bb07713a31',
    'tzeta',
    'Testnet Zeta',
    Networks.test.zeta,
    18,
    UnderlyingAsset.ZETA,
    BaseUnit.ZETA,
    COSMOS_SIDECHAIN_FEATURES
  ),
  account(
    '5f9506c5-f10a-43c2-92d3-52941083bbc7',
    'injective',
    'Injective',
    Networks.main.injective,
    18,
    UnderlyingAsset.INJECTIVE,
    BaseUnit.INJECTIVE,
    INJECTIVE_FEATURES
  ),
  account(
    '6ae81d6a-011c-499c-a3c8-15ac7dcac48a',
    'tinjective',
    'Testnet Injective',
    Networks.test.injective,
    18,
    UnderlyingAsset.INJECTIVE,
    BaseUnit.INJECTIVE,
    INJECTIVE_FEATURES
  ),
  account(
    'c592d110-cf6d-4630-b6e8-cfe044db0be2',
    'kava',
    'Kava',
    Networks.main.kava,
    6,
    UnderlyingAsset.KAVA,
    BaseUnit.KAVA,
    COSMOS_SIDECHAIN_FEATURES
  ),
  account(
    '62895d6b-6e99-4eba-82f1-9ce4e7658998',
    'tkava',
    'Testnet Kava',
    Networks.test.kava,
    6,
    UnderlyingAsset.KAVA,
    BaseUnit.KAVA,
    COSMOS_SIDECHAIN_FEATURES
  ),
  account(
    '7df858d5-9da3-4071-ab06-399962ea87b7',
    'coreum',
    'Coreum',
    Networks.main.coreum,
    6,
    UnderlyingAsset.COREUM,
    BaseUnit.COREUM,
    COREUM_FEATURES
  ),
  account(
    'df2f040b-89f3-4bb3-8da7-2445c7fdefca',
    'tcoreum',
    'Testnet Coreum',
    Networks.test.coreum,
    6,
    UnderlyingAsset.COREUM,
    BaseUnit.TCOREUM,
    COREUM_FEATURES
  ),
  account(
    '9fa0f191-4eed-4030-864a-d14bbd98c8af',
    'thorchain:rune',
    'Rune',
    Networks.main.rune,
    8,
    UnderlyingAsset.RUNE,
    BaseUnit.RUNE,
    COSMOS_SIDECHAIN_FEATURES.filter((feature) => feature !== CoinFeature.BULK_TRANSACTION)
  ),
  account(
    '7281ab3b-0451-4ef9-b367-8623d9bcfd87',
    'tthorchain:rune',
    'Testnet Rune',
    Networks.test.rune,
    8,
    UnderlyingAsset.RUNE,
    BaseUnit.RUNE,
    COSMOS_SIDECHAIN_FEATURES.filter((feature) => feature !== CoinFeature.BULK_TRANSACTION)
  ),
  account(
    'b473d5f0-1590-4edf-bc9f-813aff515a23',
    'islm',
    'Islamic Coin',
    Networks.main.islm,
    18,
    UnderlyingAsset.ISLM,
    BaseUnit.ISLM,
    COSMOS_SIDECHAIN_FEATURES.filter((f) => f !== CoinFeature.SHA256_WITH_ECDSA_TSS)
  ),
  account(
    '02eced2c-cf1d-4660-832c-858685ae7107',
    'tislm',
    'Testnet Islamic Coin',
    Networks.test.islm,
    18,
    UnderlyingAsset.ISLM,
    BaseUnit.ISLM,
    COSMOS_SIDECHAIN_FEATURES.filter((f) => f !== CoinFeature.SHA256_WITH_ECDSA_TSS)
  ),
  account(
    'e48baabf-5cc9-4011-b67e-6f6425753df2',
    'near',
    'Near',
    Networks.main.near,
    24,
    UnderlyingAsset.NEAR,
    BaseUnit.NEAR,
    NEAR_FEATURES,
    KeyCurve.Ed25519
  ),
  account(
    '5f076cd2-fbb6-4ef6-9aa6-adc0d8851b4b',
    'tnear',
    'Testnet Near',
    Networks.test.near,
    24,
    UnderlyingAsset.NEAR,
    BaseUnit.NEAR,
    NEAR_FEATURES,
    KeyCurve.Ed25519
  ),
  account(
    'd0d44124-c7e9-4214-96ae-fbc6856ee3c2',
    'bsc',
    'Binance Smart Chain',
    Networks.main.bsc,
    18,
    UnderlyingAsset.BSC,
    BaseUnit.BSC,
    [
      ...ETH_FEATURES_WITH_STAKING_AND_MMI,
      CoinFeature.TSS,
      CoinFeature.TSS_COLD,
      CoinFeature.EVM_WALLET,
      CoinFeature.MPCV2,
      CoinFeature.USES_NON_PACKED_ENCODING_FOR_TXDATA,
      CoinFeature.STUCK_TRANSACTION_MANAGEMENT_TSS,
      CoinFeature.CUSTODY_BITGO_FRANKFURT,
      CoinFeature.BULK_TRANSACTION,
    ]
  ),
  account(
    '0a205427-f7c9-48a4-a238-c4b33ba6384d',
    'tbsc',
    'Testnet Binance Smart Chain',
    Networks.test.bsc,
    18,
    UnderlyingAsset.BSC,
    BaseUnit.BSC,
    [
      ...ETH_FEATURES_WITH_STAKING_AND_MMI,
      CoinFeature.TSS,
      CoinFeature.TSS_COLD,
      CoinFeature.EVM_WALLET,
      CoinFeature.MPCV2,
      CoinFeature.USES_NON_PACKED_ENCODING_FOR_TXDATA,
      CoinFeature.STUCK_TRANSACTION_MANAGEMENT_TSS,
      CoinFeature.CUSTODY_BITGO_FRANKFURT,
      CoinFeature.BULK_TRANSACTION,
    ]
  ),
  account(
    'f0e226b6-6cd8-4384-b0a5-ba8e4148a049',
    'polygon',
    'Polygon',
    Networks.main.polygon,
    18,
    UnderlyingAsset.POLYGON,
    BaseUnit.ETH,
    POLYGON_FEATURES
  ),
  account(
    'aa7b72d1-9197-492d-b2ca-2c9c9732115d',
    'tpolygon',
    'Testnet Polygon',
    Networks.test.polygon,
    18,
    UnderlyingAsset.POLYGON,
    BaseUnit.ETH,
    POLYGON_FEATURES
  ),
  account(
    'b5ba2fc6-706b-433f-9bcf-4ea4aaa09281',
    'ton',
    'Ton',
    Networks.main.ton,
    9,
    UnderlyingAsset.TON,
    BaseUnit.TON,
    TON_FEATURES,
    KeyCurve.Ed25519
  ),
  account(
    '8244f85f-943c-4520-8e68-9e7f4361a13f',
    'tton',
    'Testnet Ton',
    Networks.test.ton,
    9,
    UnderlyingAsset.TON,
    BaseUnit.TON,
    TON_FEATURES,
    KeyCurve.Ed25519
  ),
  account(
    '020b57ce-bff0-4e25-95ce-0f3a94086db4',
    'arbeth',
    'Arbitrum Ethereum (L2 Chain)',
    Networks.main.arbitrum,
    18,
    UnderlyingAsset.ARBETH,
    BaseUnit.ETH,
    ARBETH_FEATURES
  ),
  account(
    '1c51d919-9a1a-48b6-ac6d-ec3c593af949',
    'tarbeth',
    'Testnet Arbitrum Ethereum (L2 Chain)',
    Networks.test.arbitrum,
    18,
    UnderlyingAsset.ARBETH,
    BaseUnit.ETH,
    ARBETH_FEATURES
  ),
  account(
    '1d1cd251-88e1-4d0a-81a9-3e080de8757b',
    'opeth',
    'Optimism Ethereum (L2 Chain)',
    Networks.main.optimism,
    18,
    UnderlyingAsset.OPETH,
    BaseUnit.ETH,
    OPETH_FEATURES
  ),
  account(
    'efe943c4-1144-44d2-ae34-acdbe469cfcd',
    'topeth',
    'Testnet Optimism Ethereum (L2 Chain)',
    Networks.test.optimism,
    18,
    UnderlyingAsset.OPETH,
    BaseUnit.ETH,
    OPETH_FEATURES
  ),
  account(
    '53b1e350-f907-45ec-abf7-11d132547055',
    'zketh',
    'zkSync Ethereum',
    Networks.main.zkSync,
    18,
    UnderlyingAsset.ZKETH,
    BaseUnit.ETH,
    ZKETH_FEATURES
  ),
  account(
    'e34d835d-5730-4b66-96f1-cace79e2bc88',
    'tzketh',
    'Testnet zkSync Ethereum',
    Networks.test.zkSync,
    18,
    UnderlyingAsset.ZKETH,
    BaseUnit.ETH,
    ZKETH_FEATURES
  ),
  account(
    'ac3c225e-55a9-4236-b907-a4cccc30a2fd',
    'bera',
    'berachain',
    Networks.main.bera,
    18,
    UnderlyingAsset.BERA,
    BaseUnit.ETH,
    BERA_FEATURES
  ),
  account(
    '038522b7-9ebf-492f-9e51-81756f8a354a',
    'tbera',
    'Testnet Berachain',
    Networks.test.bera,
    18,
    UnderlyingAsset.BERA,
    BaseUnit.ETH,
    BERA_FEATURES
  ),
  account(
    '7482e3f1-5bf8-45a6-9d98-69e0506602d2',
    'oas',
    'oaschain',
    Networks.main.oas,
    18,
    UnderlyingAsset.OAS,
    BaseUnit.ETH,
    OAS_FEATURES
  ),
  account(
    'b5316b57-8aa3-4f0b-9736-96b7838dbde8',
    'toas',
    'Testnet oaschain',
    Networks.test.oas,
    18,
    UnderlyingAsset.OAS,
    BaseUnit.ETH,
    OAS_FEATURES
  ),
  account(
    'bac24d8c-0f8f-4530-a63c-bc52458acf95',
    'coredao',
    'coredaochain',
    Networks.main.coredao,
    18,
    UnderlyingAsset.COREDAO,
    BaseUnit.ETH,
    COREDAO_FEATURES
  ),
  account(
    'd1d5e492-be8c-4b60-b2ab-3ed26b7dd8c8',
    'tcoredao',
    'Testnet coredao chain',
    Networks.test.coredao,
    18,
    UnderlyingAsset.COREDAO,
    BaseUnit.ETH,
    [...COREDAO_FEATURES, CoinFeature.STAKING]
  ),
  account(
    '75a71e9c-e3a0-4852-8e4b-9613ffed2a4c',
    'apt',
    'Aptos',
    Networks.main.apt,
    8,
    UnderlyingAsset.APT,
    BaseUnit.APT,
    APT_FEATURES,
    KeyCurve.Ed25519
  ),
  account(
    '7aca10bf-79dd-428b-aeb6-54f03f9aec0f',
    'tapt',
    'Testnet Apt',
    Networks.test.apt,
    8,
    UnderlyingAsset.APT,
    BaseUnit.APT,
    APT_FEATURES,
    KeyCurve.Ed25519
  ),
  erc20CompatibleAccountCoin(
    'bfae821b-cf3a-4190-b1a8-a54af51d730e',
    'celo',
    'Celo Gold',
    Networks.main.celo,
    18,
    '0x471ece3750da237f93b8e339c536989b8978a438',
    UnderlyingAsset.CELO,
    BaseUnit.ETH,
    CELO_FEATURES
  ),
  erc20CompatibleAccountCoin(
    'dd0fc389-1292-4845-b9c8-f560514593e4',
    'tcelo',
    'Testnet Celo Gold',
    Networks.test.celo,
    18,
    '0xf194afdf50b03e69bd7d057c1aa9e10c9954e4c9',
    UnderlyingAsset.CELO,
    BaseUnit.ETH,
    CELO_FEATURES
  ),
  hederaCoin(
    '98aad956-27ee-45dd-aa43-6a23c9a1d1d0',
    'hbar',
    'Mainnet Hedera HBAR',
    Networks.main.hedera,
    8,
    UnderlyingAsset.HBAR,
    '0.0.3',
    HBAR_FEATURES
  ),
  hederaCoin(
    '0d251e8d-5c95-49d2-a505-db66ff5440ba',
    'thbar',
    'Testnet Hedera HBAR',
    Networks.test.hedera,
    8,
    UnderlyingAsset.HBAR,
    '0.0.3',
    HBAR_FEATURES
  ),
  hederaToken(
    'ca62d9eb-be67-4d63-b3b6-319d7182f691',
    'hbar:usdc',
    'Mainnet Hedera USD Coin',
    Networks.main.hedera,
    6,
    UnderlyingAsset.USDC,
    '0.0.3',
    '0.0.456858',
    AccountCoin.DEFAULT_FEATURES
  ),
  hederaToken(
    '221fb1c9-0fb0-4b06-8dd1-ed857a804d58',
    'hbar:xsgd',
    'XSGD',
    Networks.main.hedera,
    6,
    UnderlyingAsset.XSGD,
    '0.0.3',
    '0.0.1985922',
    AccountCoin.DEFAULT_FEATURES
  ),
  hederaToken(
    '2ea6a6d8-7d14-4bbf-a869-a99ba61bebda',
    'hbar:bct',
    'Mainnet Hedera Bitcarbon Beta Coin',
    Networks.main.hedera,
    2,
    UnderlyingAsset.BCT,
    '0.0.3',
    '0.0.1958126',
    AccountCoin.DEFAULT_FEATURES
  ),
  hederaToken(
    '44beb5f1-7581-4b0d-a09a-bae78d8c266f',
    'hbar:clxy',
    'Calaxy Tokens',
    Networks.main.hedera,
    6,
    UnderlyingAsset.CLXY,
    '0.0.3',
    '0.0.859814',
    AccountCoin.DEFAULT_FEATURES
  ),
  hederaToken(
    '842c2119-3071-409d-b86f-49f0b46b676e',
    'thbar:usdc',
    'Testnet Hedera USD Coin',
    Networks.test.hedera,
    6,
    UnderlyingAsset.USDC,
    '0.0.3',
    '0.0.13078',
    AccountCoin.DEFAULT_FEATURES
  ),
  ofcsolToken(
    '7d1b17b3-d606-4ba7-82dc-3e3a0eede46a',
    'ofcsol:wsol',
    'Wrapped SOL',
    9,
    UnderlyingAsset['sol:wsol'],
    SOL_OFC_TOKEN_FEATURES
  ),
  ofcsolToken(
    'c382f3cc-c071-4ef5-89ac-bcb85d8d415f',
    'ofcsol:wec',
    'Whole Earth Coin',
    9,
    UnderlyingAsset['sol:wec'],
    SOL_OFC_TOKEN_FEATURES
  ),
  ofcsolToken(
    'fb3b730f-c2cc-4598-8165-ddd42de8cbdf',
    'ofcsol:usdt',
    'USD Tether',
    6,
    UnderlyingAsset['sol:usdt'],
    SOL_OFC_TOKEN_FEATURES
  ),
  ofcsolToken(
    '0d96e2db-d01e-4ea0-ac87-3b51d563ea91',
    'ofcsol:usdc',
    'USD Coin',
    6,
    UnderlyingAsset['sol:usdc'],
    SOL_OFC_TOKEN_FEATURES
  ),
  ofcsolToken(
    'ebbe0d38-44cb-4464-999f-68c9765e37ef',
    'ofcsol:srm',
    'Serum',
    6,
    UnderlyingAsset['sol:srm'],
    SOL_OFC_TOKEN_FEATURES
  ),
  ofcsolToken(
    '6bd37226-443b-41d3-9c5f-2f33279edffa',
    'ofcsol:slnd',
    'SOLEND',
    6,
    UnderlyingAsset['sol:slnd'],
    SOL_OFC_TOKEN_FEATURES
  ),
  ofcsolToken(
    '9e8cf6cd-19bd-440d-a73d-bfda85876008',
    'ofcsol:ray',
    'Raydium',
    6,
    UnderlyingAsset['sol:ray'],
    SOL_OFC_TOKEN_FEATURES
  ),
  ofcsolToken(
    '76bb31fc-62a6-4b45-9013-ca278a4bca3c',
    'ofcsol:qcad',
    'QCAD',
    2,
    UnderlyingAsset['sol:qcad'],
    SOL_OFC_TOKEN_FEATURES
  ),
  ofcsolToken(
    '2e567f9f-6bd8-4f2d-8b6b-e8c1bb6f619b',
    'ofcsol:pyth',
    'Pyth',
    6,
    UnderlyingAsset['sol:pyth'],
    SOL_OFC_TOKEN_FEATURES
  ),
  ofcsolToken(
    'd52d3d8b-a4c9-4f31-81a0-07fa1ca2e010',
    'ofcsol:orca',
    'ORCA',
    6,
    UnderlyingAsset['sol:orca'],
    SOL_OFC_TOKEN_FEATURES
  ),
  ofcsolToken(
    '84b18d96-b8c3-4315-a500-fe624e3b5dfe',
    'ofcsol:kin',
    'Kin',
    5,
    UnderlyingAsset['sol:kin'],
    SOL_OFC_TOKEN_FEATURES
  ),
  ofcsolToken(
    'ee4bcc0d-7ffd-4854-b2be-21e7efe9e7c5',
    'ofcsol:jet',
    'Jet Protocol',
    9,
    UnderlyingAsset['sol:jet'],
    SOL_OFC_TOKEN_FEATURES
  ),
  ofcsolToken(
    '0f7d1c02-2f2d-4b39-b1f7-892edf9ff21a',
    'ofcsol:gmt',
    'GMT',
    9,
    UnderlyingAsset['sol:gmt'],
    SOL_OFC_TOKEN_FEATURES
  ),
  ofcsolToken(
    '8e4ec661-0ebc-46c8-afcd-1a1c4d9fdf5f',
    'ofcsol:gari',
    'GARI',
    9,
    UnderlyingAsset['sol:gari'],
    SOL_OFC_TOKEN_FEATURES
  ),
  ofcsolToken(
    '9f4dcf91-fa4a-41a3-aab9-e309d86f30b3',
    'ofcsol:crown',
    'CROWN Token',
    9,
    UnderlyingAsset['sol:crown'],
    SOL_OFC_TOKEN_FEATURES
  ),
  ofcsolToken(
    '65050658-411f-4e3c-be92-105b8c662cf6',
    'ofcsol:sbc',
    'Stable Coin',
    9,
    UnderlyingAsset['sol:sbc'],
    SOL_OFC_TOKEN_FEATURES
  ),
  ofcsolToken(
    'dfe78bd9-c67c-455b-a731-0c9dadd8078e',
    'ofcsol:bonk',
    'Bonk',
    5,
    UnderlyingAsset['sol:bonk'],
    SOL_OFC_TOKEN_FEATURES
  ),
  ofcsolToken(
    'de579e9d-c830-491e-8d5a-760c14a0be91',
    'ofcsol:honey',
    'HONEY',
    9,
    UnderlyingAsset['sol:honey'],
    SOL_OFC_TOKEN_FEATURES
  ),
  ofcsolToken(
    '8a8309b4-8587-4a95-b4a8-4e46c6206b50',
    'ofcsol:mplx',
    'Metaplex Token',
    6,
    UnderlyingAsset['sol:mplx'],
    SOL_OFC_TOKEN_FEATURES
  ),
  ofcsolToken(
    'cbc48e26-9eb9-47ea-b72f-9f8bad54ac3d',
    'ofcsol:hnt',
    'Helium Network Token',
    8,
    UnderlyingAsset['sol:hnt'],
    SOL_OFC_TOKEN_FEATURES
  ),
  ofcsolToken(
    '05a51449-e2e5-4076-991f-1d480960a6fb',
    'ofcsol:render',
    'Render Token',
    8,
    UnderlyingAsset['sol:render'],
    SOL_OFC_TOKEN_FEATURES
  ),
  ofcsolToken(
    '170b81f2-9378-44b6-8f25-4f4b7e3f4dfd',
    'ofcsol:natix',
    'NATIX Network ',
    6,
    UnderlyingAsset['natix'],
    SOL_OFC_TOKEN_FEATURES
  ),
  ofcsolToken(
    'abbdcf44-ac44-46be-b4e9-8a760d44b79a',
    'ofcsol:mobile',
    'Helium Mobile',
    6,
    UnderlyingAsset['sol:mobile'],
    SOL_OFC_TOKEN_FEATURES
  ),
  ofcsolToken(
    '94e55bde-f57f-4817-9984-b461a5d6bcd0',
    'ofcsol:jup',
    'Jupiter',
    6,
    UnderlyingAsset['sol:jup'],
    SOL_OFC_TOKEN_FEATURES
  ),
  ofcsolToken(
    '989eec31-a0d5-4cdc-b4de-6fca30cde366',
    'ofcsol:popcat',
    'POPCAT',
    9,
    UnderlyingAsset['sol:popcat'],
    SOL_OFC_TOKEN_FEATURES
  ),
  ofcsolToken(
    'ca2a2bc9-ed79-426f-8378-96f9c9568526',
    'ofcsol:wif',
    'dogwifhat',
    6,
    UnderlyingAsset['sol:wif'],
    SOL_OFC_TOKEN_FEATURES
  ),
  ofcsolToken(
    'ab833723-8b40-4fc4-8dd1-f5ea9a07c76c',
    'ofcsol:goat',
    'Goatseus Maximus',
    6,
    UnderlyingAsset['sol:goat'],
    SOL_OFC_TOKEN_FEATURES
  ),
  ofcsolToken(
    'fe8e4d63-f2ed-4351-b9da-70a705444095',
    'ofcsol:mnde',
    'Marinade',
    9,
    UnderlyingAsset['sol:mnde'],
    SOL_TOKEN_FEATURES
  ),
  ofcsolToken(
    'fc7ac820-4b48-4286-8881-9b418118198e',
    'ofcsol:jto',
    'Jito',
    9,
    UnderlyingAsset['sol:jto'],
    SOL_TOKEN_FEATURES
  ),
  ofcsolToken(
    '9b6bd751-2057-4067-9e16-9a26df0e4127',
    'ofcsol:tnsr',
    'Tensor',
    9,
    UnderlyingAsset['sol:tnsr'],
    SOL_TOKEN_FEATURES
  ),
  tofcsolToken(
    '24d678cf-e0f0-4cde-a338-d754289c5b27',
    'ofctsol:slnd',
    'testnet SOLEND',
    9,
    UnderlyingAsset['tsol:slnd'],
    SOL_TOKEN_FEATURES
  ),
  tofcsolToken(
    '5610a965-d046-46e2-9077-40f496be3f18',
    'ofctsol:orca',
    'testnet ORCA',
    9,
    UnderlyingAsset['tsol:orca'],
    SOL_TOKEN_FEATURES
  ),
  tofcsolToken(
    '6fd31137-ab29-441e-9136-8b4bad4f0477',
    'ofctsol:usdc',
    'testnet USD Coin',
    6,
    UnderlyingAsset['tsol:usdc'],
    SOL_TOKEN_FEATURES
  ),
  tofcsolToken(
    '431a593e-0396-4d68-9db6-901d312df47d',
    'ofctsol:ray',
    'testnet Raydium',
    9,
    UnderlyingAsset['tsol:ray'],
    SOL_TOKEN_FEATURES
  ),
  tofcsolToken(
    'ff1955c9-988d-4c9e-86e7-cf589bb3d66f',
    'ofctsol:gmt',
    'testnet GMT',
    9,
    UnderlyingAsset['tsol:gmt'],
    SOL_TOKEN_FEATURES
  ),
  tofcsolToken(
    '308d63c0-3a74-49c9-98d8-a4fe52e58226',
    'ofctsol:usdt',
    'testnet USD Tether',
    9,
    UnderlyingAsset['tsol:usdt'],
    SOL_TOKEN_FEATURES
  ),
  tofcsolToken(
    '73a332da-1abf-4c4b-b5b5-f03fe36738cb',
    'ofctsol:srm',
    'testnet Serum',
    9,
    UnderlyingAsset['tsol:srm'],
    SOL_TOKEN_FEATURES
  ),

  tofcsolToken(
    '20b20bc7-86b8-4f58-a8e9-a7cedbc2a507',
    'ofctsol:gari',
    'testnet Gari Token',
    9,
    UnderlyingAsset['tsol:gari'],
    SOL_TOKEN_FEATURES
  ),
  tofcsolToken(
    '3bca91fa-2c1a-4e7a-b1f1-b9c4402075a2',
    'ofctsol:hnt',
    'testnet Helium Network Token',
    8,
    UnderlyingAsset['sol:hnt'],
    SOL_TOKEN_FEATURES
  ),
  tofcTronToken('937efe97-a17a-4d2a-aaf2-0ffdb529a943', 'ofcttrx:usdt', 'Tether USD', 6, UnderlyingAsset['ttrx:usdt']),
  ofcTronToken('94b00b66-68a4-45ed-b772-77e5bca1e34c', 'ofctrx:usdt', 'Tether USD', 6, UnderlyingAsset['trx:usdt']),
  ofcXrpToken('6a173023-5faf-4a0a-af38-b8be98abe94f', 'ofcxrp:rlusd', 'Ripple USD', 96, UnderlyingAsset['xrp:rlusd']),
  tofcXrpToken('bd406dab-3b55-4ab5-b0a5-74b9f94268a3', 'ofctxrp:rlusd', 'RLUSD', 96, UnderlyingAsset['txrp:rlusd']),
  ofc('837f0cab-cad1-4510-a8e4-f2c60e1a8760', 'ofcusd', 'USD', 2, UnderlyingAsset.USD, CoinKind.FIAT),
  ofc('798f2a7c-23fd-4e16-9fe5-6bf47ca438a0', 'ofceur', 'Euro', 2, UnderlyingAsset.EUR, CoinKind.FIAT),
  ofc('f37bbb72-adfe-4d06-90dc-afd0aa34aadd', 'ofcgbp', 'Pound Sterling', 2, UnderlyingAsset.GBP, CoinKind.FIAT),
  ofc(
    '71c2203c-59ba-45ba-9280-ec94b9c4e44f',
    'ofcavaxc',
    'Avalanche C-Chain',
    18,
    UnderlyingAsset.AVAXC,
    CoinKind.CRYPTO
  ),
  ofc('b16e03eb-c5e9-4814-bf30-bb9c33aa5a86', 'ofccspr', 'Casper', 9, UnderlyingAsset.CSPR, CoinKind.CRYPTO),
  ofc('cbcaf7c2-9426-4448-a8ef-88ef32c8b855', 'ofcnear', 'Near', 24, UnderlyingAsset.NEAR, CoinKind.CRYPTO),
  ofc('167e2bce-a7a8-4d0e-aa14-e9fe1a63a854', 'ofcbtc', 'Bitcoin', 8, UnderlyingAsset.BTC, CoinKind.CRYPTO),
  ofc('138e7dca-2fb9-41c3-97e9-14a3fcbeb252', 'ofceth', 'Ether', 18, UnderlyingAsset.ETH, CoinKind.CRYPTO),
  ofc('044db0b9-9d8f-4b72-ad20-bdb1a4157ccd', 'ofcltc', 'Litecoin', 8, UnderlyingAsset.LTC, CoinKind.CRYPTO),
  ofc('a36fd909-3dcb-464d-bc9c-de59e4f5f9e9', 'ofcdash', 'Dash', 8, UnderlyingAsset.DASH, CoinKind.CRYPTO),
  ofc('1d4b178b-31d6-4bf2-9f70-43d16a62a1b7', 'ofczec', 'ZCash', 8, UnderlyingAsset.ZEC, CoinKind.CRYPTO),
  ofc('ab52081f-ab09-4eb5-b9a9-ebfaee92caaa', 'ofcxrp', 'Ripple', 6, UnderlyingAsset.XRP, CoinKind.CRYPTO),
  ofc('c214bc45-7540-4270-8d89-e55d541448dd', 'ofcxlm', 'Stellar', 7, UnderlyingAsset.XLM, CoinKind.CRYPTO),
  ofc('64de501c-5cac-47a7-b0e4-ec2cf6fca483', 'ofcbch', 'Bitcoin Cash', 8, UnderlyingAsset.BCH, CoinKind.CRYPTO),
  ofc('ca88f60c-1f43-466e-b529-362d8f1c3089', 'ofcalgo', 'Algorand', 6, UnderlyingAsset.ALGO, CoinKind.CRYPTO),
  ofc('5036883f-67aa-4d61-8cff-931392c4d43d', 'ofcbtg', 'Bitcoin Gold', 8, UnderlyingAsset.BTG, CoinKind.CRYPTO),
  ofc('afa494f3-a56d-4b81-991d-066b4aae181c', 'ofcbsv', 'Bitcoin SV', 8, UnderlyingAsset.BSV, CoinKind.CRYPTO),
  ofc('5b206383-7b8c-4199-8456-71e7a84527d5', 'ofcdot', 'Polkadot', 10, UnderlyingAsset.DOT, CoinKind.CRYPTO),
  ofc('f1ed2667-fed1-4db8-87f5-061282d6147b', 'ofceos', 'Eos', 4, UnderlyingAsset.EOS, CoinKind.CRYPTO),
  ofc('6c0714f3-fb74-4bb7-b17d-e34e48821890', 'ofcetc', 'Ethereum Classic', 18, UnderlyingAsset.ETC, CoinKind.CRYPTO),
  ofc('49bc92d3-3085-4124-bdb3-df86385dd9b5', 'ofcstx', 'Stacks', 6, UnderlyingAsset.STX, CoinKind.CRYPTO),
  ofc(
    '181974a6-b042-460e-acec-46733f8af941',
    'ofchbar',
    'Mainnet Hedera HBAR',
    8,
    UnderlyingAsset.HBAR,
    CoinKind.CRYPTO
  ),
  ofc('140ac16e-e39a-49d0-ae69-60019ff35727', 'ofcbld', 'Agoric', 6, UnderlyingAsset.BLD, CoinKind.CRYPTO),
  ofc('220b2568-e996-40d1-af2c-fc4f79019069', 'ofctia', 'Celestia', 6, UnderlyingAsset.TIA, CoinKind.CRYPTO),
  ofc('3ad9a2e0-a8f4-4673-9177-35e855929eb6', 'ofcatom', 'Cosmos Hub ATOM', 6, UnderlyingAsset.ATOM, CoinKind.CRYPTO),
  ofc(
    'd7cced3c-285a-4a2c-8212-cf959fd15db3',
    'ofcinjective',
    'Injective',
    18,
    UnderlyingAsset.INJECTIVE,
    CoinKind.CRYPTO
  ),
  ofc('3977b3bd-abf2-476b-9d2a-4666d3b0aa10', 'ofcosmo', 'Osmosis', 6, UnderlyingAsset.OSMO, CoinKind.CRYPTO),
  ofc('5958e6e9-c6d7-4372-8d1d-c681f595c481', 'ofchash', 'Provenance', 9, UnderlyingAsset.HASH, CoinKind.CRYPTO),
  ofc('4616eb4e-9244-449c-a503-02cb2d715b2c', 'ofcsei', 'Sei', 6, UnderlyingAsset.SEI, CoinKind.CRYPTO),
  ofc('50a00889-47d2-44b5-8dc8-1fb3b4f47b86', 'ofczeta', 'Zeta', 18, UnderlyingAsset.ZETA, CoinKind.CRYPTO),
  ofc(
    '03df4c0c-12be-4b24-b3c3-c59be198711b',
    'ofcbsc',
    'Binance Smart Chain',
    18,
    UnderlyingAsset.BSC,
    CoinKind.CRYPTO
  ),
  ofc('7b79bc25-5497-4350-b961-4bbed2bea994', 'ofcsui', 'Sui', 9, UnderlyingAsset.SUI, CoinKind.CRYPTO),
  ofc('31bae66e-a135-42f9-b9d3-1623ab9c7ecc', 'ofctrx', 'Tron', 6, UnderlyingAsset.TRX, CoinKind.CRYPTO),
  ofc('dbbceebe-9096-4d7b-ae9e-31eb8a3dc5ca', 'ofcsol', 'Solana', 9, UnderlyingAsset.SOL, CoinKind.CRYPTO),
  ofc('07301a34-7e47-417e-a2cb-00ef609d59a1', 'ofcdoge', 'Dogecoin', 8, UnderlyingAsset.DOGE, CoinKind.CRYPTO),
  ofc('5beca519-4479-4878-8e8a-a910226438c0', 'ofcada', 'Cardano', 6, UnderlyingAsset.ADA, CoinKind.CRYPTO),
  ofc(
    'e9b7ae6f-f893-44e6-87db-1bbb1469a3d6',
    'ofcpolygon',
    'Polygon (MATIC native)',
    18,
    UnderlyingAsset.POLYGON,
    CoinKind.CRYPTO
  ),
  ofc(
    'd3c07741-d4cd-4013-9884-653f437bbfd7',
    'ofcarbeth',
    'Arbitrum Ethereum (L2 Chain)',
    18,
    UnderlyingAsset.ARBETH,
    CoinKind.CRYPTO
  ),
  ofc('8b93e788-52fa-4fd6-b499-40f13fe194fc', 'ofccoreum', 'Coreum', 6, UnderlyingAsset.COREUM, CoinKind.CRYPTO),
  ofc('a88adc55-c1c8-4a4e-8436-df3868a50daa', 'ofccelo', 'Celo Gold', 18, UnderlyingAsset.CELO, CoinKind.CRYPTO),
  ofc('9e2da785-8349-4153-8276-941319575833', 'ofcxtz', 'Tezos', 6, UnderlyingAsset.XTZ, CoinKind.CRYPTO),
  ofc(
    '283b93b5-741b-4c85-a201-097267d65097',
    'ofcopeth',
    'Optimism Ethereum (L2 Chain)',
    18,
    UnderlyingAsset.OPETH,
    CoinKind.CRYPTO
  ),
  ofc('07083ea6-74ba-4da7-8cf3-031126a130a4', 'ofcton', 'Ton', 9, UnderlyingAsset.TON, CoinKind.CRYPTO),
  tofc('e85d3b60-b6c8-4e29-b6db-38966125cfeb', 'ofctusd', 'Test USD', 2, UnderlyingAsset.USD, CoinKind.FIAT),
  tofc('dbac74bb-5dbc-4cdd-ad66-f71315b53a3f', 'ofcteur', 'Test Euro', 2, UnderlyingAsset.EUR, CoinKind.FIAT),
  tofc(
    'd98b94c0-222f-4efe-ae88-917722ac45b4',
    'ofctgbp',
    'Test British Pound Sterling',
    2,
    UnderlyingAsset.GBP,
    CoinKind.FIAT
  ),
  tofc('e5e9dedb-4d72-4a44-a84c-32f46d275bdc', 'ofctcspr', 'Test Casper', 9, UnderlyingAsset.CSPR, CoinKind.CRYPTO),
  tofc('b84e3f27-e521-4093-9616-fc92ba352cd9', 'ofctnear', 'Test Near', 24, UnderlyingAsset.NEAR, CoinKind.CRYPTO),
  tofc('457d1c4e-5bf7-442a-90c9-dfd590f30925', 'ofctbtc', 'Test Bitcoin', 8, UnderlyingAsset.BTC, CoinKind.CRYPTO),
  tofc('b4a75a39-3fd2-4866-aaed-75b969df1d98', 'ofctbtc4', 'Testnet4 Bitcoin', 8, UnderlyingAsset.BTC, CoinKind.CRYPTO),
  tofc('4bf9d3a3-04f7-4c48-9a26-12b36bbecfb7', 'ofctdot', 'Test Polkadot', 12, UnderlyingAsset.DOT, CoinKind.CRYPTO),
  tofc('e916ff23-7521-4046-9bea-b92788acc23b', 'ofcteth', 'Test Ether', 18, UnderlyingAsset.ETH, CoinKind.CRYPTO),
  tofc(
    'a90ab5b8-e156-4d40-9cd7-b170416ba7de',
    'ofcgteth',
    'Test Goerli Ether',
    18,
    UnderlyingAsset.ETH,
    CoinKind.CRYPTO
  ),
  tofc(
    'dd7fd2c8-df50-4f8b-96ac-ff5f874c80ca',
    'ofchteth',
    'Test Holesky Ether',
    18,
    UnderlyingAsset.ETH,
    CoinKind.CRYPTO
  ),
  tofc(
    'f43d0558-8c07-4927-af7f-33947fd310c9',
    'ofctavaxc',
    'Test Avalanche C-Chain',
    18,
    UnderlyingAsset.AVAXC,
    CoinKind.CRYPTO
  ),
  tofc('96c298cb-7aaa-4beb-8edb-0f18b35fda89', 'ofctltc', 'Test Litecoin', 8, UnderlyingAsset.LTC, CoinKind.CRYPTO),
  tofc('d76b04d1-baef-4bd7-ac49-b5900f8f0b67', 'ofctdash', 'Test Dash', 8, UnderlyingAsset.DASH, CoinKind.CRYPTO),
  tofc('446a1812-d02c-47d5-b3d5-830e420fa274', 'ofctzec', 'Test ZCash', 8, UnderlyingAsset.ZEC, CoinKind.CRYPTO),
  tofc('adfc43d8-e702-465d-af01-f1583fa00a5e', 'ofctxrp', 'Test Ripple', 6, UnderlyingAsset.XRP, CoinKind.CRYPTO),
  tofc('3fb98e15-4e7d-4ab4-88cc-4a55746e6ffe', 'ofctxlm', 'Test Stellar', 7, UnderlyingAsset.XLM, CoinKind.CRYPTO),
  tofc('7c42feed-31e2-4a77-a211-ab3f24c9af90', 'ofctbch', 'Test Bitcoin Cash', 8, UnderlyingAsset.BCH, CoinKind.CRYPTO),
  tofc('4580a066-4a4b-4b6b-975f-b229170d72ba', 'ofctalgo', 'Test Algorand', 6, UnderlyingAsset.ALGO, CoinKind.CRYPTO),
  tofc('2095d445-a298-4d64-a2fb-49765a648159', 'ofctbtg', 'Test Bitcoin Gold', 8, UnderlyingAsset.BTG, CoinKind.CRYPTO),
  tofc('6162908d-9d98-4c73-a31d-d4387817e055', 'ofctbsv', 'Test Bitcoin SV', 8, UnderlyingAsset.BSV, CoinKind.CRYPTO),
  tofc('bbf5aef3-f60a-40cf-b82d-972aa8b6860a', 'ofcteos', 'Test Eos', 4, UnderlyingAsset.EOS, CoinKind.CRYPTO),
  tofc(
    '90d83653-a4b3-4b78-9a87-97f908702aa6',
    'ofctetc',
    'Test Ethereum Classic',
    18,
    UnderlyingAsset.ETC,
    CoinKind.CRYPTO
  ),
  tofc(
    'c027ff83-c74d-451a-bc1c-ac3d85a70034',
    'ofcthbar',
    'Testnet Hedera HBAR',
    8,
    UnderlyingAsset.HBAR,
    CoinKind.CRYPTO
  ),
  tofc('c2161656-219d-439a-be96-01fc67ed22a8', 'ofctstx', 'Test Stacks', 6, UnderlyingAsset.STX, CoinKind.CRYPTO),
  tofc('916488ca-3607-4c3f-96b4-e5a97edc8767', 'ofctbld', 'Testnet Agoric', 6, UnderlyingAsset.BLD, CoinKind.CRYPTO),
  tofc('ccf34023-f025-433a-8014-bda198907a3a', 'ofcttia', 'Testnet Celestia', 6, UnderlyingAsset.TIA, CoinKind.CRYPTO),
  tofc(
    'f6c23fad-16b6-4bf9-99ae-199ae8ac849d',
    'ofctatom',
    'Testnet Cosmos Hub ATOM',
    6,
    UnderlyingAsset.ATOM,
    CoinKind.CRYPTO
  ),
  tofc(
    '3b0f5716-94c3-4c5b-be70-cfd08b2f1fdf',
    'ofctinjective',
    'Testnet Injective',
    18,
    UnderlyingAsset.INJECTIVE,
    CoinKind.CRYPTO
  ),
  tofc('1573da4d-15a8-4dae-9368-84ec0507e251', 'ofctosmo', 'Testnet Osmosis', 6, UnderlyingAsset.OSMO, CoinKind.CRYPTO),
  tofc(
    '4bbb64d1-6bd2-4c53-8be0-f99229362c3d',
    'ofcthash',
    'Testnet Provenance',
    9,
    UnderlyingAsset.HASH,
    CoinKind.CRYPTO
  ),
  tofc('a7770053-4fe7-432e-a554-5d3ecc1cc4ad', 'ofctsei', 'Testnet Sei', 6, UnderlyingAsset.SEI, CoinKind.CRYPTO),
  tofc('801c0437-d4fd-4e5a-8656-a6bb596f0640', 'ofctzeta', 'Testnet Zeta', 18, UnderlyingAsset.ZETA, CoinKind.CRYPTO),
  tofc(
    '52e600bb-b006-452b-9f82-f81c20d0168d',
    'ofctbsc',
    'Testnet Binance Smart Chain',
    18,
    UnderlyingAsset.BSC,
    CoinKind.CRYPTO
  ),
  tofc('89bfad1a-97f8-46f8-bec6-3faf145f3a74', 'ofctsui', 'Testnet Sui', 9, UnderlyingAsset.SUI, CoinKind.CRYPTO),
  tofc('ac5b8544-6e98-4b74-9a60-9173ba226979', 'ofcttrx', 'Testnet Tron', 6, UnderlyingAsset.TRX, CoinKind.CRYPTO),
  tofc('bc10ac8c-7786-4ba8-b2a5-009b478d7046', 'ofctsol', 'Test Solana', 9, UnderlyingAsset.SOL, CoinKind.CRYPTO),
  tofc('b7dfb8c8-83e4-4b41-8782-49de832f9acf', 'ofctdoge', 'Test Dogecoin', 8, UnderlyingAsset.DOGE, CoinKind.CRYPTO),
  tofc('22299e37-402d-4d4d-9cf8-2146b915eac3', 'ofctada', 'Test Cardano', 6, UnderlyingAsset.ADA, CoinKind.CRYPTO),
  tofc(
    'b103d14f-1bad-49a3-afbe-418567680f02',
    'ofctpolygon',
    'Test Polygon (MATIC native)',
    18,
    UnderlyingAsset.POLYGON,
    CoinKind.CRYPTO
  ),
  tofc(
    'd4e13852-6b90-4e4c-a664-67d73137faa3',
    'ofctarbeth',
    'Testnet Arbitrum Ethereum (L2 Chain)',
    18,
    UnderlyingAsset.ARBETH,
    CoinKind.CRYPTO
  ),
  tofc('3091d79a-7737-4493-b3e6-6765998b9486', 'ofctcoreum', 'Test Coreum', 6, UnderlyingAsset.COREUM, CoinKind.CRYPTO),
  tofc(
    '90ac199d-4061-4c5f-9d48-4439c7ec2033',
    'ofctcelo',
    'Testnet Celo Gold',
    18,
    UnderlyingAsset.CELO,
    CoinKind.CRYPTO
  ),
  tofc('f5ad87e8-7c86-406b-9776-b7f6910b5e3b', 'ofctxtz', 'Testnet Tezos', 6, UnderlyingAsset.XTZ, CoinKind.CRYPTO),
  tofc(
    '3a8b240e-c8f9-48f4-9b6f-3f2ba64db07e',
    'ofctopeth',
    'Testnet Optimism Ethereum (L2 Chain)',
    18,
    UnderlyingAsset.OPETH,
    CoinKind.CRYPTO
  ),
  tofc('b364799a-e6d1-4d84-afc9-588594e850f7', 'ofctton', 'Test Ton', 9, UnderlyingAsset.TON, CoinKind.CRYPTO),

  // End FTX missing ERC20 tokens
  celoToken(
    '1a9935a6-54d2-4988-97ff-d871338e29b5',
    'cusd',
    'Celo USD',
    18,
    '0x765de816845861e75a25fca122bb6898b8b1282a',
    UnderlyingAsset.CUSD
  ),
  celoToken(
    '8aaeda16-50fa-49cf-beb8-80077b408eb0',
    'celo:pact',
    'ImpactMarket',
    18,
    '0x2b9018ceb303d540bbf08de8e7de64fddd63396c',
    UnderlyingAsset['celo:pact']
  ),
  bscToken(
    'b7540916-53ed-49e9-b8a4-8a853fd7d607',
    'bsc:brise',
    'Bitrise Token',
    9,
    '0x8fff93e810a2edaafc326edee51071da9d398e83',
    UnderlyingAsset['bsc:brise'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '2a3e9315-0cb8-4bdf-ba9c-d872aeeb1ce2',
    'bsc:bsw',
    'Biswap',
    18,
    '0x965f527d9159dce6288a2219db51fc6eef120dd1',
    UnderlyingAsset['bsc:bsw'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    'b2f8e5fa-fd20-4844-ba3a-3daf1760e58f',
    'bsc:burger',
    'Burger Swap',
    18,
    '0xae9269f27437f0fcbc232d39ec814844a51d6b8f',
    UnderlyingAsset['bsc:burger'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    'ccbc7619-7137-49c2-83d8-c8330e5479b8',
    'bsc:cfx',
    'BSC Conflux',
    18,
    '0x045c4324039da91c52c55df5d785385aab073dcf',
    UnderlyingAsset['bsc:cfx'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '05d6b52a-21cb-4170-946f-8e7933d8562a',
    'bsc:bnx',
    'BinaryX',
    18,
    '0x5b1f874d0b0c5ee17a495cbb70ab8bf64107a3bd',
    UnderlyingAsset['bsc:bnx'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '36cc97a4-250f-4762-8f4a-648bd20e6949',
    'bsc:bake',
    'BakeryToken',
    18,
    '0xe02df9e3e622debdd69fb838bb799e3f168902c5',
    UnderlyingAsset['bsc:bake'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '9ea65fe0-f7e2-44a5-abec-ef663e74a883',
    'bsc:busd',
    'Binance USD Token',
    18,
    '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    UnderlyingAsset['bsc:busd'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    'b7128172-6f82-41ec-8557-522905e8f82a',
    'bsc:hook',
    'Hook Token',
    18,
    '0xa260e12d2b924cb899ae80bb58123ac3fee1e2f0',
    UnderlyingAsset['bsc:hook'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '2400c915-d610-45e7-bd7d-a028eb653b42',
    'bsc:usdt',
    'BSC-USD',
    18,
    '0x55d398326f99059ff775485246999027b3197955',
    UnderlyingAsset['bsc:usdt'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '95296300-6d0b-4011-9028-53f54750d4b6',
    'bsc:ksm',
    'Kusama (Binance Pegged)',
    5,
    '0xe646c8fc9f507529b05fe0a825ae9beb1aad9f6b',
    UnderlyingAsset['bsc:ksm'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '82e8167f-2c11-46b9-b7dd-eab667d8429b',
    'bsc:vet',
    'VeChain (Binance Pegged)',
    9,
    '0xa9d810e5555c2951239efe7a3245ef3c1b4ca8cf',
    UnderlyingAsset['bsc:vet'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    'aa92b7c0-7562-4273-a265-2184fa91d42e',
    'bsc:cake',
    'PancakeSwap Token',
    18,
    '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    UnderlyingAsset['bsc:cake'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '4bc5e4d3-4467-45a6-aef0-6a5ef30aaf51',
    'bsc:litt',
    'LitLabToken',
    18,
    '0xcebef3df1f3c5bfd90fde603e71f31a53b11944d',
    UnderlyingAsset['bsc:litt'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    'dd57bbfd-39c8-43a0-8094-c9d4d4843f2c',
    'bsc:xvs',
    'Venus',
    18,
    '0xcf6bb5389c92bdda8a3747ddb454cb7a64626c63',
    UnderlyingAsset['bsc:xvs'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '8c59c402-b515-4238-9947-9240b5aed0b7',
    'bsc:epx',
    'Ellipsis X',
    18,
    '0xaf41054c1487b0e5e2b9250c0332ecbce6ce9d71',
    UnderlyingAsset['bsc:epx'],
    BSC_TOKEN_FEATURES_EXCLUDE_SINGAPORE
  ),
  bscToken(
    '56eac82e-d310-4ba0-b48e-2aaa3761f8e0',
    'bsc:usdc',
    'USDC',
    18,
    '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
    UnderlyingAsset['bsc:usdc'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    'ce33169c-7706-4f6b-9cbd-cd00ec785e7d',
    'bsc:eth',
    'Ethereum',
    18,
    '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
    UnderlyingAsset['bsc:eth'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '77ea0dcf-808c-4abf-9f5e-4028cb557cab',
    'bsc:dd',
    'Diment Dollar',
    6,
    '0x71b3a0566f4bf80331d115d8026a7022bf670cce',
    UnderlyingAsset['bsc:dd'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    'ebfcdf18-bdad-41da-bbda-2b3a71338c1c',
    'bsc:ltc',
    'Binance-Peg Litecoin Token',
    18,
    '0x4338665cbb7b2485a8855a139b75d5e34ab0db94',
    UnderlyingAsset['bsc:ltc'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    'd26cf811-cd84-4143-8fe9-5ac7e43ce6f9',
    'bsc:mask',
    'Mask Network',
    18,
    '0x2ed9a5c8c13b93955103b9a7c167b67ef4d568a3',
    UnderlyingAsset['bsc:mask'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '8d8f2923-179c-4c2e-8c55-96e5e95c9e2b',
    'bsc:matic',
    'Matic Token',
    18,
    '0xcc42724c6683b7e57334c4e856f4c9965ed682bd',
    UnderlyingAsset['bsc:matic'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '647f5a72-a90b-4df4-821b-e3647cee84a4',
    'bsc:mbox',
    'Mobox',
    18,
    '0x3203c9e46ca618c8c1ce5dc67e7e9d75f5da2377',
    UnderlyingAsset['bsc:mbox'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '1c3872f0-942f-49f3-af00-dc9c964b8813',
    'bsc:mdt',
    'Measurable Data Token',
    18,
    '0x668db7aa38eac6b40c9d13dbe61361dc4c4611d1',
    UnderlyingAsset['bsc:mdt'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '16ce15df-84c3-4be5-bd98-f09e47a882a7',
    'bsc:nuls',
    'Nuls',
    8,
    '0x8cd6e29d3686d24d3c2018cee54621ea0f89313b',
    UnderlyingAsset['bsc:nuls'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    'c465ea9e-de0b-4981-8024-f4b131d3093e',
    'bsc:ont',
    'Binance-Peg Ontology Token',
    18,
    '0xfd7b3a77848f1c2d67e05e54d78d174a0c850335',
    UnderlyingAsset['bsc:ont'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    'dd8137d3-28ac-4a56-a58f-7dc7c9f76be8',
    'bsc:orn',
    'Orion Protocol',
    8,
    '0xe4ca1f75eca6214393fce1c1b316c237664eaa8e',
    UnderlyingAsset['bsc:orn'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '8d3e171f-2d66-409b-8a0c-492e73b2c7e6',
    'bsc:porto',
    'FC Porto Fan Token',
    8,
    '0x49f2145d6366099e13b10fbf80646c0f377ee7f6',
    UnderlyingAsset['bsc:porto'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    'd251b733-4090-47ed-b1f1-434d8e7c075f',
    'bsc:reef',
    'Reef.finance',
    18,
    '0xf21768ccbc73ea5b6fd3c687208a7c2def2d966e',
    UnderlyingAsset['bsc:reef'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '4515f909-53b2-4c4e-bf8c-f0fb1fcbf516',
    'bsc:renbtc',
    'renBTC',
    8,
    '0xfce146bf3146100cfe5db4129cf6c82b0ef4ad8c',
    UnderlyingAsset['bsc:renbtc'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    'ffe9c8ee-f331-4188-932d-d348041e4f70',
    'bsc:snx',
    'Binance-Peg Synthetix Network Token',
    18,
    '0x9ac983826058b8a9c7aa1c9171441191232e8404',
    UnderlyingAsset['bsc:snx'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    'b6b324c0-c8bd-422b-bf51-36ccfbef0409',
    'bsc:tking',
    'Tiger King',
    18,
    '0x9b4bdddaeb68d85b0848bab7774e6855439fd94e',
    UnderlyingAsset['bsc:tking'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    'd24030d5-e0a1-4216-9b80-9582ce5e4de1',
    'bsc:tlm',
    'Alien Worlds Trilium',
    4,
    '0x2222227e22102fe3322098e4cbfe18cfebd57c95',
    UnderlyingAsset['bsc:tlm'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '593d0131-db45-4d0d-9fbb-31803f9365b6',
    'bsc:ton',
    'Wrapped TON Coin',
    9,
    '0x76a797a59ba2c17726896976b7b3747bfd1d220f',
    UnderlyingAsset['bsc:ton'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    'ece5a237-5a3f-4884-beef-64936b5e51ba',
    'bsc:trx',
    'TRON',
    6,
    '0xce7de646e7208a4ef112cb6ed5038fa6cc6b12e3',
    UnderlyingAsset['bsc:trx'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '3239d21c-81fd-4fc9-86d9-6b9999d0c6d9',
    'bsc:wbnb',
    'Wrapped BNB',
    18,
    '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
    UnderlyingAsset['bsc:wbnb'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    'a3cff020-44cd-4419-ab96-c5332067dc6c',
    'bsc:win',
    'WINk',
    18,
    '0xaef0d72a118ce24fee3cd1d43d383897d05b4e99',
    UnderlyingAsset['bsc:win'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    'cf634a53-0f48-49dc-9b2f-b15efa414d59',
    'bsc:wrx',
    'WazirX New',
    18,
    '0x2a459dd33f05ed8ea9584505cf04698be5654e6d',
    UnderlyingAsset['bsc:wrx'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '1a26f668-9cde-4768-be8c-1fdcdf8e39e9',
    'bsc:yfii',
    'Binance-Peg YFII.finance Token',
    18,
    '0x7f70642d88cf1c4a3a7abb072b53b929b653eda5',
    UnderlyingAsset['bsc:yfii'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    'fa4f2c50-d267-4234-92f2-1295f455ba06',
    'bsc:zil',
    'Zilliqa',
    12,
    '0xb86abcb37c3a4b64f74f59301aff131a1becc787',
    UnderlyingAsset['bsc:zil'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '63ada13a-7941-4aff-8a4e-88f994b2f409',
    'bsc:1inch',
    '1INCH Token',
    18,
    '0x111111111117dc0aa78b770fa6a738034120c302',
    UnderlyingAsset['bsc:1inch'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '19f2fc01-5aa0-409a-8345-c5283f35fb73',
    'bsc:ada',
    'Binance-Peg Cardano Token',
    18,
    '0x3ee2200efb3400fabb9aacf31297cbdd1d435d47',
    UnderlyingAsset['bsc:ada'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    'b487bac5-8320-4f27-841b-1fb21ac3ce7a',
    'bsc:alice',
    'ALICE',
    6,
    '0xac51066d7bec65dc4589368da368b212745d63e8',
    UnderlyingAsset['bsc:alice'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '9a37ed39-f9d5-4d99-98ac-3d694ef29aaa',
    'bsc:ankr',
    'Ankr',
    18,
    '0xf307910a4c7bbc79691fd374889b36d8531b08e3',
    UnderlyingAsset['bsc:ankr'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    'b090a811-ecf0-4be1-9679-ecb72fe5fec9',
    'bsc:beta',
    'Beta Token',
    18,
    '0xbe1a001fe942f96eea22ba08783140b9dcc09d28',
    UnderlyingAsset['bsc:beta'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    'f634a5ff-cb5d-45cc-8314-746b43d1c360',
    'bsc:avax',
    'Binance-Peg Avalanche Token',
    18,
    '0x1ce0c2827e2ef14d5c4f29a091d735a204794041',
    UnderlyingAsset['bsc:avax'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '630f9bd2-d602-417c-8dde-6cb8fa06df8e',
    'bsc:btt',
    'BitTorrent',
    18,
    '0x352cb5e19b12fc216548a2677bd0fce83bae434b',
    UnderlyingAsset['bsc:btt'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    'cff753dd-bb25-49b8-93c8-6f7010dd98e7',
    'bsc:celr',
    'Binance-Peg Celer Token',
    18,
    '0x1f9f6a696c6fd109cd3956f45dc709d2b3902163',
    UnderlyingAsset['bsc:celr'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    'c430d292-4cfc-4e8a-90aa-2ff08ebb13a0',
    'bsc:chr',
    'Chroma',
    6,
    '0xf9cec8d50f6c8ad3fb6dccec577e05aa32b224fe',
    UnderlyingAsset['bsc:chr'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    'fcc0ca5c-2eb0-4ac2-8f09-1a5637e2f2df',
    'bsc:coti',
    'Binance-Peg COTI Token',
    18,
    '0xadbaf88b39d37dc68775ed1541f1bf83a5a45feb',
    UnderlyingAsset['bsc:coti'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    'c224474b-d111-4eb7-bb15-2b2afbaacf2a',
    'bsc:cream',
    'Cream',
    18,
    '0xd4cb328a82bdf5f03eb737f37fa6b370aef3e888',
    UnderlyingAsset['bsc:cream'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '3a23eabe-2078-43ad-977c-f23704b71dff',
    'bsc:dar',
    'Dalarnia',
    6,
    '0x23ce9e926048273ef83be0a3a8ba9cb6d45cd978',
    UnderlyingAsset['bsc:dar'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '0031de63-845f-4b09-8e41-361b26c9bfd9',
    'bsc:degov2',
    'dego.finance',
    18,
    '0x3da932456d082cba208feb0b096d49b202bf89c8',
    UnderlyingAsset['bsc:degov2'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '5d0c2d01-1d41-45f3-a979-d726b73563fe',
    'bsc:dodo',
    'DODO bird',
    18,
    '0x67ee3cb086f8a16f34bee3ca72fad36f7db929e2',
    UnderlyingAsset['bsc:dodo'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '0d6041b1-a74b-467c-abb4-13ffb8030178',
    'bsc:elon',
    'Dogelon Mars',
    18,
    '0x7bd6fabd64813c48545c9c0e312a0099d9be2540',
    UnderlyingAsset['bsc:elon'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '227264f5-3bed-4b94-a83d-3febef58dd20',
    'bsc:etc',
    'Binance-Peg Ethereum Classic',
    18,
    '0x3d6545b08693dae087e957cb1180ee38b9e3c25e',
    UnderlyingAsset['bsc:etc'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    'b2dd88f3-ab7f-4999-9aac-15e2559e4ffb',
    'bsc:front',
    'Frontier Token',
    18,
    '0x928e55dab735aa8260af3cedada18b5f70c72f1b',
    UnderlyingAsset['bsc:front'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '05fea72c-091f-41f4-981c-bfe802c87791',
    'bsc:hft',
    'Hashflow',
    18,
    '0x44ec807ce2f4a6f2737a92e985f318d035883e47',
    UnderlyingAsset['bsc:hft'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    'fe9738e5-b97f-4636-8f3d-d635cbf4c0e3',
    'bsc:high',
    'Highstreet Token',
    18,
    '0x5f4bde007dc06b867f86ebfe4802e34a1ffeed63',
    UnderlyingAsset['bsc:high'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    'be1e64ad-189e-4885-b7f0-2c661ffba041',
    'bsc:inj',
    'Injective Protocol',
    18,
    '0xa2b726b1145a4773f68593cf171187d8ebe4d495',
    UnderlyingAsset['bsc:inj'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    'b141222f-fdf1-40a4-91fb-57bb40bc595c',
    'bsc:iotx',
    'Binance-Peg IoTeX Network',
    18,
    '0x9678e42cebeb63f23197d726b29b1cb20d0064e5',
    UnderlyingAsset['bsc:iotx'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    'bf315ef3-f981-46df-a23f-edd985c8aa24',
    'bsc:auto',
    'AUTOv2',
    18,
    '0xa184088a740c695e156f91f5cc086a06bb78b827',
    UnderlyingAsset['bsc:auto'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '67cbca2d-d38c-4b1b-9db7-9f77e418b4ef',
    'bsc:fet',
    'Fetch',
    18,
    '0x031b41e504677879370e9dbcf937283a8691fa7f',
    UnderlyingAsset['bsc:fet'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '5bc5ce03-b173-4e77-a862-1142c997d184',
    'bsc:kas',
    'Kaspa',
    18,
    '0x51e72dd1f2628295cc2ef931cb64fdbdc3a0c599',
    UnderlyingAsset['bsc:kas'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '084ea788-8e0a-43b0-b8a5-c45c92853235',
    'bsc:lit',
    'Litentry',
    18,
    '0xb59490ab09a0f526cc7305822ac65f2ab12f9723',
    UnderlyingAsset['bsc:lit'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    'cd17858d-0316-4be8-b81b-06226c78b291',
    'bsc:mana',
    'Decentraland',
    18,
    '0x26433c8127d9b4e9b71eaa15111df99ea2eeb2f8',
    UnderlyingAsset['bsc:mana'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    'b1c4b480-6399-4d61-a170-a5e9dfd37355',
    'bsc:shib',
    'Binance-Peg SHIBA INU Token',
    18,
    '0x2859e4544c4bb03966803b044a93563bd2d0dd4d',
    UnderlyingAsset['bsc:shib'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '6d6b134b-6482-4b41-9d7f-027619395d69',
    'bsc:sxp',
    'Swipe',
    18,
    '0x47bead2563dcbf3bf2c9407fea4dc236faba485a',
    UnderlyingAsset['bsc:sxp'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '7cc0b178-18cb-49f1-bf16-3cdd860e5d90',
    'bsc:nnn',
    'Novem Gold Token',
    18,
    '0x5d5c5c1d14faf8ff704295b2f502daa9d06799a0',
    UnderlyingAsset['bsc:nnn'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '9b2925ed-7e66-4f60-b1bb-edae3931e9cd',
    'bsc:nvm',
    'Novem Pro Token',
    18,
    '0xbe2d8ac2a370972c4328bed520b224c3903a4941',
    UnderlyingAsset['bsc:nvm'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '3610aa96-9011-4b65-8b90-4ffd71cf6ee3',
    'bsc:jasmy',
    'Jasmy Coin',
    18,
    '0x15669cf161946c09a8b207650bfbb00e3d8a2e3e',
    UnderlyingAsset['bsc:jasmy'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    'dd4e9b9c-0af7-49c2-bfc4-86ea6334bfd1',
    'bsc:near',
    'NEAR Token',
    18,
    '0x1fa4a73a3f0133f0025378af00236f3abdee5d63',
    UnderlyingAsset['bsc:near'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    'f2da5cb6-b806-4838-a1de-13d73079d35f',
    'bsc:ocean',
    'Ocean Protocol',
    18,
    '0xdce07662ca8ebc241316a15b611c89711414dd1a',
    UnderlyingAsset['bsc:ocean'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '69c3ec6e-ac5f-422e-9d36-09942547af94',
    'bsc:sand',
    'The Sandbox',
    18,
    '0x67b725d7e342d7b611fa85e859df9697d9378b2e',
    UnderlyingAsset['bsc:sand'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    'e0d3937d-0b39-4e87-ade1-44ef120803c5',
    'bsc:tusd',
    'TrueUSD',
    18,
    '0x40af3827f39d0eacbf4a168f8d4ee67c121d11c9',
    UnderlyingAsset['bsc:tusd'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '75d857f8-577a-4daa-becc-32be8c2f9366',
    'bsc:wrose',
    'Wrapped ROSE',
    18,
    '0xf00600ebc7633462bc4f9c61ea2ce99f5aaebd4a',
    UnderlyingAsset['bsc:wrose'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '7c86c5bf-7952-4e25-a54b-d91f6d06782f',
    'bsc:twt',
    'Trust Wallet Token',
    18,
    '0x4b0f1812e5df2a09796481ff14017e6005508003',
    UnderlyingAsset['bsc:twt'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    'e703a395-1c49-47c1-b37a-76f8ae80dda8',
    'bsc:sfp',
    'SafePal Token',
    18,
    '0xd41fdb03ba84762dd66a0af1a6c8540ff1ba5dfb',
    UnderlyingAsset['bsc:sfp'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '95d911d1-94a8-4227-afbf-a8b7e78b63a8',
    'bsc:edu',
    'Open Campus EDU Coin',
    18,
    '0xbdeae1ca48894a1759a8374d63925f21f2ee2639',
    UnderlyingAsset['bsc:edu'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    'dcbd000e-0aa5-4814-9979-111e48ed1321',
    'bsc:mrs',
    'Metars Genesis',
    18,
    '0x238d02ee3f80fbf5e381f049616025c186889b68',
    UnderlyingAsset['bsc:mrs'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    'bcf567ae-0b2a-4506-874b-1e1c4a20522c',
    'bsc:ong',
    'Ontology Gas Token',
    9,
    '0x308bfaeaac8bdab6e9fc5ead8edcb5f95b0599d9',
    UnderlyingAsset['bsc:ong'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '39d6827f-d3a3-4edd-b15e-feb031477773',
    'bsc:ctk',
    'Shentu CertiK Token',
    6,
    '0xa8c2b8eec3d368c0253ad3dae65a5f2bbb89c929',
    UnderlyingAsset['bsc:ctk'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    'f39c2545-d500-453c-912a-a5b6930e2882',
    'bsc:rdnt',
    'Radiant Capital',
    18,
    '0xf7de7e8a6bd59ed41a4b5fe50278b3b7f31384df',
    UnderlyingAsset['bsc:rdnt'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    'cb77a41a-ed97-48de-940a-32ec58a30064',
    'bsc:mbx',
    'MARBLEX',
    18,
    '0xf95a5532d67c944dfa7eddd2f8c358fe0dc7fac2',
    UnderlyingAsset['bsc:mbx'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    'e8b3cf34-b2b3-4352-8fa6-c9aee76fe0d1',
    'bsc:mav',
    'Maverick Token',
    18,
    '0xd691d9a68c887bdf34da8c36f63487333acfd103',
    UnderlyingAsset['bsc:mav'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    'b47ffd02-b2c3-4fff-b71f-3f5e5a9f24aa',
    'bsc:mct',
    'MetaCraftToken',
    18,
    '0xdf677713a2c661ecd0b2bd4d7485170aa8c1eceb',
    UnderlyingAsset['bsc:mct'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '75f44792-006c-41ba-abb0-8e1f52a87aa4',
    'bsc:thunder',
    'BSC-Peg Thunder Token',
    18,
    '0x990e7154bb999faa9b2fa5ed29e822703311ea85',
    UnderlyingAsset['bsc:thunder'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    'd8f45e1e-a6de-4e2f-90a6-8cb2c176955b',
    'bsc:atlas',
    'Star Atlas',
    8,
    '0x83850d97018f665eb746fbb8f18351e977d1b0d6',
    UnderlyingAsset['bsc:atlas'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '4be63483-8507-4bac-bcff-402d3a77fbe1',
    'bsc:vidt',
    'VIDT DAO',
    18,
    '0x9c4a515cd72d27a4710571aca94858a53d9278d5',
    UnderlyingAsset['bsc:vidt'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    'f7ed114e-529c-4612-9202-bb797f0bdfe3',
    'bsc:pax',
    'Binance-Peg Paxos Standard',
    18,
    '0xb7f8cd00c5a06c0537e2abff0b58033d02e5e094',
    UnderlyingAsset['bsc:pax'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    'ec176176-36c1-41ab-9b03-0b77a3b80003',
    'bsc:unfi',
    'Unifi Protocol DAO',
    18,
    '0x728c5bac3c3e370e372fc4671f9ef6916b814d8b',
    UnderlyingAsset['bsc:unfi'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '7effea14-eb15-4cd6-9030-2c78a8e40836',
    'bsc:chess',
    'Tranchess',
    18,
    '0x20de22029ab63cf9a7cf5feb2b737ca1ee4c82a6',
    UnderlyingAsset['bsc:chess'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    'f6be6fd9-02f7-44db-9160-77329db0bd7a',
    'bsc:pols',
    'PolkastarterToken',
    18,
    '0x7e624fa0e1c4abfd309cc15719b7e2580887f570',
    UnderlyingAsset['bsc:pols'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '616e786f-0c17-4ccf-9eba-00ee2af30323',
    'bsc:uft',
    'UniLend Finance Token',
    18,
    '0x2645d5f59d952ef2317c8e0aaa5a61c392ccd44d',
    UnderlyingAsset['bsc:uft'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    'f60e2988-083b-4f4e-902d-a5d40fd910ba',
    'bsc:wing',
    'Wing Finance',
    9,
    '0x3cb7378565718c64ab86970802140cc48ef1f969',
    UnderlyingAsset['bsc:wing'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '487c8a51-1188-416f-a835-44b79598f80b',
    'bsc:santos',
    'FC Santos Fan Token',
    8,
    '0xa64455a4553c9034236734faddaddbb64ace4cc7',
    UnderlyingAsset['bsc:santos'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '26026249-1549-4d0b-b9dc-c095b2cafbf4',
    'bsc:lazio',
    'FC Lazio Fan Token',
    8,
    '0x77d547256a2cd95f32f67ae0313e450ac200648d',
    UnderlyingAsset['bsc:lazio'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '0606bb12-22cc-4648-a633-d305871e45f7',
    'bsc:swap',
    'TrustSwap Token',
    18,
    '0x94eafeeef7ffa66203fdc9349c54d601472a79dc',
    UnderlyingAsset['bsc:swap'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '3ce0f495-2dbe-4598-a167-a7a16a615485',
    'bsc:troy',
    'TROY',
    18,
    '0x6d41f64c567acbf36f88763306ff6fb50ff61458',
    UnderlyingAsset['bsc:troy'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    'f6de7a18-dae1-4892-9122-28d796c635a5',
    'bsc:volt',
    'Volt Inu',
    9,
    '0x7f792db54b0e580cdc755178443f0430cf799aca',
    UnderlyingAsset['bsc:volt'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '9a32dfd0-343f-4890-98e0-767a87090203',
    'bsc:city',
    'Manchester City Fan Token',
    2,
    '0x4e7e8579a9edc6283011be942537baf9284bebe1',
    UnderlyingAsset['bsc:city'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '5c7702c4-8eb8-423b-ab23-eff15a6a8a1c',
    'bsc:gft',
    'Gifto',
    18,
    '0x72ff5742319ef07061836f5c924ac6d72c919080',
    UnderlyingAsset['bsc:gft'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '71861b2e-03b0-4101-81ea-ea35b13d48d1',
    'bsc:glmr',
    'Moonbeam',
    18,
    '0x76f3ce6af26de7a9854dbd153acd8f46a2cf5133',
    UnderlyingAsset['bsc:glmr'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    'bcc8389e-a3bf-493d-89a8-3d95676e817c',
    'bsc:gmt',
    'Green Metaverse Token',
    8,
    '0x3019bf2a2ef8040c242c9a4c5c4bd4c81678b2a1',
    UnderlyingAsset['bsc:gmt'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    'cc8ee3f4-ffac-4046-9d38-dff2be8c5e2a',
    'bsc:h2o',
    'H2O DAO',
    18,
    '0xaf3287cae99c982586c07401c0d911bf7de6cd82',
    UnderlyingAsset['bsc:h2o'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '4887e5e6-6dbd-453c-af52-e260562af2e7',
    'bsc:flux',
    'Flux',
    8,
    '0xaff9084f2374585879e8b434c399e29e80cce635',
    UnderlyingAsset['bsc:flux'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '4fe50080-b1e5-4d8e-a358-773a1fcf5002',
    'bsc:lto',
    'LTO Network',
    18,
    '0x857b222fc79e1cbbf8ca5f78cb133d1b7cf34bbd',
    UnderlyingAsset['bsc:lto'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '401cf05a-8fe1-40c5-9e73-b37417a08dac',
    'bsc:kmd',
    'Komodo',
    18,
    '0x2003f7ba57ea956b05b85c60b4b2ceea9b111256',
    UnderlyingAsset['bsc:kmd'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    'a4cda030-4c22-4ece-93b4-840da127781c',
    'bsc:farm',
    'Harvest Finance',
    18,
    '0x4b5c23cac08a567ecf0c1ffca8372a45a5d33743',
    UnderlyingAsset['bsc:farm'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '7a97cef9-ac2c-4c76-88d2-334544fdc6bf',
    'bsc:lina',
    'Linear Finance',
    18,
    '0x762539b45a1dcce3d36d080f74d1aed37844b878',
    UnderlyingAsset['bsc:lina'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '290801fc-fc48-4b5d-b5e7-abbc2101de13',
    'bsc:firo',
    'Firo',
    8,
    '0xd5d0322b6bab6a762c79f8c81a0b674778e13aed',
    UnderlyingAsset['bsc:firo'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '74b382c0-611a-4abf-ad2e-fedec28eb5e7',
    'bsc:fdusd',
    'First Digital USD',
    18,
    '0xc5f0f7b66764f6ec8c8dff7ba683102295e16409',
    UnderlyingAsset['bsc:fdusd'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '99f9276a-b2b7-471f-8e70-979559acd932',
    'bsc:floki',
    'FLOKI',
    9,
    '0xfb5b838b6cfeedc2873ab27866079ac55363d37e',
    UnderlyingAsset['bsc:floki'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '160b345f-f244-4412-a458-afc055b52a7e',
    'bsc:ldo',
    'LIDO DAO',
    18,
    '0x986854779804799c1d68867f5e03e601e781e41b',
    UnderlyingAsset['bsc:ldo'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    'f0843b47-1472-44e7-88b7-9f3f46a04848',
    'bsc:eos',
    'EOS',
    18,
    '0x56b6fb708fc5732dec1afc8d8556423a2edccbd6',
    UnderlyingAsset['bsc:eos'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '2bdbc219-916f-4f73-9478-87c71eb51f39',
    'bsc:om',
    'MANTRA DAO',
    18,
    '0xf78d2e7936f5fe18308a3b2951a93b6c4a41f5e2',
    UnderlyingAsset['bsc:om'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '0abc1708-49f5-4a95-a14e-38ad55e58937',
    'bsc:usdd',
    'USDD',
    18,
    '0xd17479997f34dd9156deef8f95a52d81d265be9c',
    UnderlyingAsset['bsc:usdd'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '74124b64-e619-4d4b-8e56-efcc3bdbf950',
    'bsc:alpaca',
    'Alpaca Finance',
    18,
    '0x8f0528ce5ef7b51152a59745befdd91d97091d2f',
    UnderlyingAsset['bsc:alpaca']
  ),
  bscToken(
    '4be7a586-4f50-430c-908c-5aff39acc323',
    'bsc:alpine',
    'Alpine F1 Team Fan Token',
    8,
    '0x287880ea252b52b63cc5f40a2d3e5a44aa665a76',
    UnderlyingAsset['bsc:alpine'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '2ea5523b-6330-447c-820f-ee0416e10cfc',
    'bsc:tko',
    'Toko Token',
    18,
    '0x9f589e3eabe42ebc94a44727b3f3531c0c877809',
    UnderlyingAsset['bsc:tko'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    'c235a165-4d82-4522-b94c-c85ec1260f8a',
    'bsc:vite',
    'VITE',
    18,
    '0x2794dad4077602ed25a88d03781528d1637898b4',
    UnderlyingAsset['bsc:vite'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '696cef5c-6d78-47f3-bc41-8849d3e6b3b2',
    'bsc:mdx',
    'Mdex',
    18,
    '0x9c65ab58d8d978db963e63f2bfb7121627e3a739',
    UnderlyingAsset['bsc:mdx'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    '3cd43d47-451e-4043-822c-d2566ea93ade',
    'bsc:multi',
    'Multichain',
    18,
    '0x9fb9a33956351cf4fa040f65a13b835a3c8764e3',
    UnderlyingAsset['bsc:multi'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    'bea7d7f0-a2c3-48fd-95aa-9c51811153f6',
    'bsc:psg',
    'Paris Saint-Germain Fan Token',
    2,
    '0xbc5609612b7c44bef426de600b5fd1379db2ecf1',
    UnderlyingAsset['bsc:psg'],
    BSC_TOKEN_FEATURES
  ),
  bscToken(
    'd2618917-5087-4627-ba10-9d456ac7870f',
    'bsc:telos',
    'Telos',
    18,
    '0x193f4a4a6ea24102f49b931deeeb931f6e32405d',
    UnderlyingAsset['bsc:telos'],
    BSC_TOKEN_FEATURES
  ),
  erc721(
    'b744b184-ae07-42e1-9585-f4a65fe96d11',
    'erc721:bsctoken',
    'Generic BSC ERC721',
    '0xerc721:bsctoken',
    GENERIC_TOKEN_FEATURES,
    '',
    '',
    Networks.main.bsc,
    KeyCurve.Secp256k1
  ),
  erc1155(
    '93289b8a-751e-4fab-a747-8edb913ba852',
    'erc1155:bsctoken',
    'Generic BSC ERC1155',
    '0xerc1155:bsctoken',
    GENERIC_TOKEN_FEATURES,
    '',
    '',
    Networks.main.bsc,
    KeyCurve.Secp256k1
  ),
  ofcerc20('a6b6dd56-c25e-45a3-83e5-5da0f95d27d2', 'ofcpol', 'Polygon Ecosystem Token', 18, UnderlyingAsset.POL),
  ofcerc20('3ed9ccb5-7dc9-46fe-8003-d19a12ffd258', 'ofcgods', 'Gods Unchained', 18, UnderlyingAsset.GODS),
  ofcerc20('36af444a-7829-4d78-8b34-7197ce4a34b9', 'ofcplanet', 'Planet', 18, UnderlyingAsset.PLANET),
  ofcerc20('20274306-7e40-43ac-ae91-d7744352f4e0', 'ofcbadger', 'Badger', 18, UnderlyingAsset.BADGER),
  ofcerc20('162eff5b-36e0-4b7e-b844-381d49b9aaaa', 'ofcmpl', 'Maple Token', 18, UnderlyingAsset.MPL),
  ofcerc20('c8dbdc91-4fff-4548-8238-9fa7948b51b9', 'ofcuqc', 'Uquid Coin', 18, UnderlyingAsset.UQC),
  ofcerc20('df7e1b01-b813-43ef-8ca4-e9d23652f976', 'ofcreq', 'Request', 18, UnderlyingAsset.REQ),
  ofcerc20('a6696c8c-44b3-4a6f-bf6c-9ac1cb4ac8e1', 'ofcrare', 'SuperRare', 18, UnderlyingAsset.RARE),
  ofcerc20('cd568cfc-ca69-4714-b8ba-a274a633f139', 'ofcboba', 'Boba Token', 18, UnderlyingAsset.BOBA),
  ofcerc20('3dd7a8b9-01d4-4ca3-9d18-0128a70333ef', 'ofcwild', 'Wilder World', 18, UnderlyingAsset.WILD),
  ofcerc20('2f23fc77-132b-4a30-a8ff-9320f9e7a57d', 'ofcdodo', 'DODO', 18, UnderlyingAsset.DODO),
  ofcerc20('1fa78af9-e888-4863-a11c-576cc611fc3c', 'ofcflip', 'Chainflip', 18, UnderlyingAsset.FLIP),
  ofcerc20('104a71f2-4edf-4c27-82fd-83cea89aa6cd', 'ofcach', 'Alchemy Pay', 8, UnderlyingAsset.ACH),
  ofcerc20('d92d739a-73a1-49ae-a906-47a53f3ee956', 'ofcgog', 'Guild of Guardians', 18, UnderlyingAsset.GOG),
  ofcerc20('5564f688-af13-4a14-9b15-7058ca3d9bf2', 'ofcstg', 'StargateToken', 18, UnderlyingAsset.STG),
  ofcerc20('2eb92d2b-c869-4137-b5ba-c18d7bc5f4c0', 'ofcloom', 'Loom Network', 18, UnderlyingAsset.LOOM),
  ofcerc20('cfbd695a-b963-4c05-8b3c-622368beab42', 'ofcsyn', 'Synapse', 18, UnderlyingAsset.SYN),
  ofcerc20('f39fcfdc-0714-48c7-b84c-42db804cdac4', 'ofcnym', 'NYM', 6, UnderlyingAsset.NYM),
  ofcerc20('6ce29837-96cf-466a-acd8-9be929de3e56', 'ofcorai', 'Orai Token', 18, UnderlyingAsset.ORAI),
  ofcerc20('e3614075-c617-4202-8558-5584ca41d931', 'ofcpyr', 'Pyr Token', 18, UnderlyingAsset.PYR),
  ofcerc20('0c988abe-9ec4-4620-8cde-2a2861846259', 'ofccqt', 'Covalent', 18, UnderlyingAsset.CQT),
  ofcerc20('8ff11c4c-e2e6-4594-b470-7db06309f6a9', 'ofcabt', 'ArcBlock', 18, UnderlyingAsset.ABT),
  ofcerc20(
    '13932184-363f-4602-9573-c2d56b33bacd',
    'ofcali',
    'Artificial Liquid Intelligence Token',
    18,
    UnderlyingAsset.ALI
  ),
  ofcerc20('bd61426f-87d8-4c52-b47d-2dc5eed84f64', 'ofcnmr', 'Numeraire', 18, UnderlyingAsset.NMR),
  ofcerc20('3db3b895-756c-4c95-9dea-08d283f09a7a', 'ofcmeme', 'Meme', 8, UnderlyingAsset.MEME),
  ofcerc20('8a73d170-28c1-48c9-8d3c-c7ea374f4414', 'ofcband', 'Band Protocol', 18, UnderlyingAsset.BAND),
  ofcerc20('ad5d8cf4-59b5-4b82-b1ee-d5d0d6ba5944', 'ofcant', 'Aragon', 18, UnderlyingAsset.ANT),
  ofcerc20('2092c0cc-19cf-42b2-90a0-123b1904d901', 'ofcpyusd', 'PayPal USD', 6, UnderlyingAsset.PYUSD),
  ofcerc20('8304c497-523d-4f3f-8744-65e2e5ebd5a5', 'ofc1inch', '1Inch Token', 18, UnderlyingAsset['1INCH']),
  ofcerc20('28024a59-6fbb-4156-96e4-2ba7747e8581', 'ofcusdc', 'USD Coin', 6, UnderlyingAsset.USDC),
  ofcerc20('f790e63d-9785-4e98-b323-897fdc489613', 'ofcaave', 'Aave', 18, UnderlyingAsset.AAVE),
  ofcerc20('a3b0e98b-3a50-4ee7-a290-696b4cbce666', 'ofcape', 'ApeCoin', 18, UnderlyingAsset.APE),
  ofcerc20('15c3f5fb-255c-4ef6-9df3-767b3aa2b36d', 'ofcaudio', 'Audio', 18, UnderlyingAsset.AUDIO),
  ofcerc20('2ea24af7-8b2e-400f-afee-9b11aeef141e', 'ofcaxs', 'Axie Infinity Shards', 18, UnderlyingAsset.AXS),
  ofcerc20('eaa20cea-78fe-46f5-a5f8-d29f69f5a543', 'ofcaxsv2', 'Axie Infinity Shards V2', 18, UnderlyingAsset.AXSV2),
  ofcerc20('d8811a30-e948-44fc-b636-8a250fd86fae', 'ofcakro', 'Akropolis', 18, UnderlyingAsset.AKRO),
  ofcerc20('6f28e645-9f4c-4825-b97f-20e65708d464', 'ofcbat', 'Basic Attention Token', 18, UnderlyingAsset.BAT),
  ofcerc20('ae72248b-19fb-4736-9430-caf68615a751', 'ofcbal', 'Balancer', 18, UnderlyingAsset.BAL),
  ofcerc20('8541eeed-0478-45fe-bff9-4bcc63ef3f67', 'ofcbico', 'Biconomy', 18, UnderlyingAsset.BICO),
  ofcerc20('48e33478-36b0-4332-a792-6b4d629c2376', 'ofcbit', 'BitDAO', 18, UnderlyingAsset.BIT),
  ofcerc20('4bc691c4-dcdd-4b78-be96-1e87269c3caf', 'ofcbnb', 'BNB Token', 18, UnderlyingAsset.BNB),
  ofcerc20('7a76184c-b4b2-4c87-81bc-0c496c605488', 'ofcbnt', 'Bancor', 18, UnderlyingAsset.BNT),
  ofcerc20('f142074d-8d94-442b-a0e3-3f09c98acaeb', 'ofcbtrst', 'Braintrust', 18, UnderlyingAsset.BTRST),
  ofcerc20('779e9fa5-e4f2-4c74-947a-5b5df61e66df', 'ofcbusd', 'Binance USD', 18, UnderlyingAsset.BUSD),
  ofcerc20('50dab286-6071-4298-893b-fb6c38e3442b', 'ofccel', 'Celsius', 4, UnderlyingAsset.CEL),
  ofcerc20('94ea31eb-f35d-4075-a9fe-90a91a6b03f8', 'ofccelr', 'Celer Network', 18, UnderlyingAsset.CELR),
  ofcerc20('f019a286-14bb-4e27-9c08-3c6216a59851', 'ofccfx', 'Conflux', 18, UnderlyingAsset.CFX),
  ofcerc20('37e74937-5392-423b-a3d5-d46dfb15251c', 'ofcchsb', 'SwissBorg', 8, UnderlyingAsset.CHSB),
  ofcerc20('e20ad46f-91ca-4bed-9484-74d1b4808672', 'ofccomp', 'Compound Token', 18, UnderlyingAsset.COMP),
  ofcerc20('3a0ae54e-223c-42c9-918f-effdd297db65', 'ofccro', 'Crypto.com Chain', 8, UnderlyingAsset.CRO),
  ofcerc20('78f617b7-67a5-44e1-9748-b3590ee3b067', 'ofccrv', 'Curve DAO Token', 18, UnderlyingAsset.CRV),
  ofcerc20('a0eb6fcf-584c-4b9d-8872-e0c6d0e31635', 'ofcctsi', 'Cartesi', 18, UnderlyingAsset.CTSI),
  ofcerc20('65d62bc2-da9a-4cf4-8055-950c30cf7007', 'ofccvc', 'Civic', 8, UnderlyingAsset.CVC),
  ofcerc20('a9da25db-54b2-4747-b689-dff98b53914b', 'ofccvx', 'Convex Finance', 18, UnderlyingAsset.CVX),
  ofcerc20(
    '847caaf2-f113-4bea-84cd-b381f0b3a0f4',
    'ofcdai',
    'Dai',
    18,
    UnderlyingAsset.DAI,
    undefined,
    undefined,
    undefined,
    'SAI'
  ),
  ofcerc20('3ffbfd6d-adf6-499e-a6ba-b1888b7f08db', 'ofcdao', 'DAO Maker', 18, UnderlyingAsset.DAO),
  ofcerc20('5b5f980a-d38f-431a-bfdf-0378881c0bcd', 'ofcdent', 'Dent', 8, UnderlyingAsset.DENT),
  ofcerc20('8a2e92c4-4808-44a0-860b-4fbfbd8ffdcb', 'ofcdep', 'Deap Coin', 18, UnderlyingAsset.DEP),
  ofcerc20('801e7818-722a-4c47-81af-69ed982c1f16', 'ofcdfi', 'DeFiChain', 8, UnderlyingAsset.DFI),
  ofcerc20('8933c68b-3171-4e35-8818-7d70bca263f1', 'ofcdydx', 'dYdX', 18, UnderlyingAsset.DYDX),
  ofcerc20('66be30f3-4a5d-44fb-b5b9-633dee857479', 'ofcelf', 'Aelf', 18, UnderlyingAsset.ELF),
  ofcerc20('7c80fbda-ef76-4424-b52f-07b0c4a25dcb', 'ofcens', 'Ethereum Name Service', 18, UnderlyingAsset.ENS),
  ofcerc20('544687ae-0df4-4d5a-89a3-bcf2199077d8', 'ofceurs', 'Stasis EURS', 2, UnderlyingAsset.EURS),
  ofcerc20('47ba857c-07f9-41c1-a0ea-1258ae0dfdac', 'ofcftt', 'FTX Token', 18, UnderlyingAsset.FTT),
  ofcerc20('222c71b9-0731-49d5-988e-0fbe1a799901', 'ofcfun', 'FunFair', 8, UnderlyingAsset.FUN),
  ofcerc20('d559fab8-c9f2-4468-a573-f4d29d4e4d30', 'ofcfxs', 'Frax Share', 18, UnderlyingAsset.FXS),
  ofcerc20('5fcfaf16-39c1-4a33-9a35-6d1d782fa515', 'ofcgbpt', 'Poundtoken', 18, UnderlyingAsset.GBPT),
  ofcerc20('91c416ad-bf1d-4949-afa6-e081bc55abd1', 'ofcgrt', 'The Graph', 18, UnderlyingAsset.GRT),
  ofcerc20('90007187-b079-4613-91b8-02b0eb90bc1e', 'ofcgfi', 'Goldfinch', 18, UnderlyingAsset.GFI),
  ofcerc20('c9ae628a-55e2-41b8-945a-dc297badc2ac', 'ofcgtc', 'Gitcoin', 18, UnderlyingAsset.GTC),
  ofcerc20('35bd0f1e-ca2c-4bba-9541-7d9f5d1b0a92', 'ofchum', 'HumanScape', 18, UnderlyingAsset.HUM),
  ofcerc20('dfd3425a-f8c8-47f9-896c-9f2fa8dd5a7c', 'ofchxro', 'Hxro', 18, UnderlyingAsset.HXRO),
  ofcerc20('dd29dc35-a569-4c20-a116-e70bfaaa8619', 'ofcimx', 'Immutable X', 18, UnderlyingAsset.IMXV2),
  ofcerc20('9a412bff-2dc2-43a0-bde3-bf6df401f16b', 'ofcinj', 'Injective Token', 18, UnderlyingAsset.INJV2),
  ofcerc20('e1997001-ae6a-4ef4-8dc5-708d06b360e9', 'ofckeep', 'Keep', 18, UnderlyingAsset.KEEP),
  ofcerc20('c7196c54-a262-49dd-9690-839ad1d14d9d', 'ofcknc', 'Kyber Network', 18, UnderlyingAsset.KNC2),
  ofcerc20('b20a48eb-a9b5-4bc7-b5a1-3b6317c542f8', 'ofclink', 'ChainLink', 18, UnderlyingAsset.LINK),
  ofcerc20('733c97e2-60ba-4b00-b897-4b0c8d49367d', 'ofclooks', 'LooksRare', 18, UnderlyingAsset.LOOKS),
  ofcerc20('785debb3-cd34-4043-92c4-8d777c2a803b', 'ofclrc', 'loopring', 18, UnderlyingAsset.LRC),
  ofcerc20('851febfa-1b5c-4220-bf23-356debeb13fe', 'ofclrcv2', 'loopring V2', 18, UnderlyingAsset.LRCV2),
  ofcerc20('7febf4f7-02e8-4d3d-bdef-98e44d2cab14', 'ofcmana', 'Decentraland', 18, UnderlyingAsset.MANA),
  ofcerc20('c1db2b60-7bc2-4503-89d5-4d73f83e49ea', 'ofcmatic', 'Matic Token', 18, UnderlyingAsset.MATIC),
  ofcerc20('a41c3d2e-d0b3-4f9e-bebc-33f7343e51ac', 'ofcmcdai', 'Dai', 18, UnderlyingAsset.MCDAI),
  ofcerc20('ca3187fa-c9f1-4d18-8556-16b9b202ce55', 'ofcmkr', 'Maker', 18, UnderlyingAsset.MKR),
  ofcerc20('a67fc93e-d136-4d39-8bdb-1d786076536b', 'ofcomg', 'OmiseGO Token', 18, UnderlyingAsset.OMG),
  ofcerc20('30ed53e1-aed6-48a6-bfc8-7045876c7d86', 'ofcop', 'Optimism', 18, UnderlyingAsset.OP),
  ofcerc20('d352ad2c-11a5-4816-9b88-af8ee1e4a8e7', 'ofcperp', 'Perpetual Protocol', 18, UnderlyingAsset.PERP),
  ofcerc20('40cee5b1-8930-4fb1-9390-5483e0732649', 'ofcsand', 'Sand', 18, UnderlyingAsset.SAND),
  ofcerc20('51a45c2d-5949-46b7-a87a-a67ec5afd98d', 'ofcshib', 'Shiba Inu', 18, UnderlyingAsset.SHIB),
  ofcerc20('f3cfe483-3aab-4d9f-8990-08c2910c3f17', 'ofcsnx', 'Synthetix Network', 18, UnderlyingAsset.SNX),
  ofcerc20('7f591fea-dcaa-46de-88dd-7173537f4433', 'ofcsushi', 'SushiToken', 18, UnderlyingAsset.SUSHI),
  ofcerc20('f15ddadd-5b35-4fa0-bcf6-68e3254d3bb1', 'ofcuni', 'Uniswap Token', 18, UnderlyingAsset.UNI),
  ofcerc20('e30203cd-99c0-4b98-b101-e0cd95a455a9', 'ofcusdt', 'Tether', 6, UnderlyingAsset.USDT),
  ofcerc20('b73b5bc1-1738-439b-a0d4-2c1880898ac5', 'ofcweth', 'Wrapped Ether', 18, UnderlyingAsset.WETH),
  ofcerc20('442030fc-5b0d-4678-8c7f-d266f363e31a', 'ofcwoo', 'Wootrade Network', 18, UnderlyingAsset.WOO),
  ofcerc20('08da24cf-1420-4361-b10f-5060673ab949', 'ofcxsushi', 'xSUSHI', 18, UnderlyingAsset.XSUSHI),
  ofcerc20('9e836a7c-cbe5-4671-885f-a11a8d66a47e', 'ofcyfi', 'Yearn.Finance', 18, UnderlyingAsset.YFI),
  ofcerc20('1985c77f-e2f2-4d83-956f-dd5846a663c4', 'ofcamp', 'Amp Token', 18, UnderlyingAsset.AMP),
  ofcerc20('9857d17e-dac4-4f18-9cd6-4d2cea6b4df2', 'ofcbtt', 'BitTorrent Token', 18, UnderlyingAsset.BTT),
  ofcerc20('603e60b6-a12b-4e8a-8a8c-44a7fe9ed613', 'ofcchz', 'ChiliZ Token', 18, UnderlyingAsset.CHZ),
  ofcerc20('f4fed641-f2e2-4fc7-b55b-62c0477b1301', 'ofcegld', 'Elrond Gold', 18, UnderlyingAsset.EGLD),
  ofcerc20('7b9b62ad-fa00-468f-9b15-fe0d6db04c97', 'ofcenj', 'EnjinCoin', 18, UnderlyingAsset.ENJ),
  ofcerc20('b930e9f3-4476-499c-82f9-f11a3f774f41', 'ofcever', 'Everscale', 9, UnderlyingAsset.EVER),
  ofcerc20('9e713b54-f46f-41a6-9792-a58964011d6b', 'ofcfei', 'Fei USD', 18, UnderlyingAsset.FEI),
  ofcerc20('15caf3bc-1d2e-440a-8954-1f1f8a52ac71', 'ofcftm', 'Fantom Token', 18, UnderlyingAsset.FTM),
  ofcerc20('c3dac821-88cc-4080-8417-bed0f48cc651', 'ofcgala', 'Gala', 8, UnderlyingAsset.GALA),
  ofcerc20('af0b8e78-a821-4542-958a-5c1d3ac687b1', 'ofcgno', 'Gnosis', 18, UnderlyingAsset.GNO),
  ofcerc20('efa472d4-7e80-4232-9a92-4b301cb4fdb7', 'ofchot', 'Holo Token', 18, UnderlyingAsset.HOT),
  ofcerc20('ecf9c0b3-fac4-4da6-93c6-2968c1d69742', 'ofcht', 'Huobi Token', 18, UnderlyingAsset.HT),
  ofcerc20('98af4163-68df-4877-b7a5-6c9ec00b991e', 'ofcleo', 'Bitfinex LEO Token', 18, UnderlyingAsset.LEO),
  ofcerc20('d43b01f7-3f87-4e75-b587-e3162c087b16', 'ofcqnt', 'Quant', 18, UnderlyingAsset.QNT),
  ofcerc20('e05ffecf-2384-4728-af20-2d31c3abf509', 'ofczil', 'Zilliqa', 12, UnderlyingAsset.ZIL),
  ofcerc20('11c7e95c-fb0b-438c-963d-74b55ca04492', 'ofcnexo', 'Nexo', 18, UnderlyingAsset.NEXO),
  ofcerc20('75c02300-0602-4dcc-a0e8-1137962f17e7', 'ofcmdx', 'Mandala', 18, UnderlyingAsset.MDX),
  ofcerc20('8e1b08d6-db2f-477f-8e49-58976849638e', 'ofcmtl', 'Metal', 8, UnderlyingAsset.MTL),
  ofcerc20('a56ce939-2af2-408d-80a2-c890f2b495e3', 'ofcmvl', 'Mass Vehicle Ledger', 18, UnderlyingAsset.MVL),
  ofcerc20('1008e03a-61b2-4920-8efd-df2929249220', 'ofcnu', 'NuCypher', 18, UnderlyingAsset.NU),
  ofcerc20('f403394e-835e-44b9-86b4-198e920e7bb3', 'ofcocean', 'Ocean Token', 18, UnderlyingAsset.OCEAN),
  ofcerc20('a2ef041c-8da0-444b-b41a-7b505240c84a', 'ofcogn', 'Origin Token', 18, UnderlyingAsset.OGN),
  ofcerc20('dec81c2a-f38c-43f9-9a3d-bbdaceaeafe6', 'ofcorbs', 'Orbs Token', 18, UnderlyingAsset.ORBS),
  ofcerc20('609fdb17-c9ee-4867-878f-d97d5acda748', 'ofcoxt', 'Orchid', 18, UnderlyingAsset.OXT),
  ofcerc20('c2f78c20-8835-480a-aa0e-3244e2114f6c', 'ofcpaxg', 'Paxos Gold', 18, UnderlyingAsset.PAXG),
  ofcerc20('8a427c2e-4c6a-4c9b-aa61-ecb7aebb6b7c', 'ofcpoly', 'Polymath', 18, UnderlyingAsset.POLY),
  ofcerc20('4acfd8f7-d1c0-4c49-bf80-1dd8865b8015', 'ofcpowr', 'Power Ledger', 6, UnderlyingAsset.POWR),
  ofcerc20('5f936db2-6014-4afa-b997-4e7c6b34e814', 'ofcpro', 'Propy', 18, UnderlyingAsset.PRO),
  ofcerc20('65055519-d950-466a-b713-f88d9b1bde7c', 'ofcpundix', 'Pundi X2', 18, UnderlyingAsset.PUNDIX),
  ofcerc20('fb602049-f477-43ea-b938-95c2484eda31', 'ofcray', 'Raydium', 6, UnderlyingAsset.RAY),
  ofcerc20('1c3eec6c-c1be-4ca9-b044-6e4379be0287', 'ofcreef', 'REEF', 18, UnderlyingAsset.REEF),
  ofcerc20('220aa19a-7b62-4132-aef2-475bbb83827d', 'ofcrep', 'Augur', 18, UnderlyingAsset.REP),
  ofcerc20('845f503b-66ce-4f4e-b841-163578b26d41', 'ofcrly', 'Rally', 18, UnderlyingAsset.RLY),
  ofcerc20('aee33f6d-ae42-4356-86a8-35d9b26633fa', 'ofcrndr', 'Render Token', 18, UnderlyingAsset.RNDR),
  ofcerc20('4d4edcab-aeac-4c22-a003-b02744da1a35', 'ofcslp', 'Smooth Love Potion', 0, UnderlyingAsset.SLP),
  ofcerc20('f2511305-0f5e-493d-93bc-f06962458b57', 'ofcsnt', 'Status Network Token', 18, UnderlyingAsset.SNT),
  ofcerc20('3c35a09e-2cf2-475c-a5e3-a4757dca7b36', 'ofcstorj', 'Storj', 8, UnderlyingAsset.STORJ),
  ofcerc20('cc429744-58ca-4c3b-abe7-1761320b76ce', 'ofcsxp', 'Swipe', 18, UnderlyingAsset.SXP),
  ofcerc20('764937cd-464b-4a49-88a4-836e39f8e7d3', 'ofctribe', 'Tribe', 18, UnderlyingAsset.TRIBE),
  ofcerc20('dbaf70b2-e159-4c67-9dd9-39ef886a2390', 'ofctrueusd', 'TrueUSD', 18, UnderlyingAsset.TUSD),
  ofcerc20('2566f816-47de-481c-b4b9-f31989861388', 'ofcuma', 'UMA Voting Token V1', 18, UnderlyingAsset.UMA),
  ofcerc20('c6a7a05d-c4bf-44e6-b8e8-21ee1c0d2aa7', 'ofcwxt', 'Wirex', 18, UnderlyingAsset.WXT),
  ofcerc20('d46dc5ab-9c36-4591-b973-0175c2f4cdb5', 'ofcwsteth', 'Wrapped stETH', 18, UnderlyingAsset.WSTETH),
  ofcerc20('5ad50deb-a5ae-4fd9-b838-805542074cb1', 'ofcxsgd', 'StraitsX', 6, UnderlyingAsset.XSGD),
  ofcerc20('dff24bf9-5999-4093-bfe4-24e74eb5ff2f', 'ofctel', 'Telcoin', 2, UnderlyingAsset.TEL),
  ofcerc20('6e11614a-e393-45fb-aa95-30251229a0d6', 'ofcygg', 'Yield Guild Games', 18, UnderlyingAsset.YGG),
  ofcerc20('d7568822-87a9-475a-8228-479e0efeca41', 'ofczrx', '0x Token', 18, UnderlyingAsset.ZRX),
  ofcerc20('c4b061d3-fe27-47b1-a524-f4e9cd2355fc', 'ofcthreshold', 'Threshold', 18, UnderlyingAsset.THRESHOLD),
  ofcerc20('3635900a-d77b-4725-8385-909245c60b35', 'ofctrac', 'OriginTrails', 18, UnderlyingAsset.TRAC),
  ofcerc20('e75640dd-d7b4-4f2d-8e6e-dab4d4dc0c4a', 'ofcmco2', 'Moss Carbon Credit', 18, UnderlyingAsset.MCO2),
  ofcerc20('f4daaf08-25bf-4863-b781-10096833f9d7', 'ofcsuper', 'SuperFarm', 18, UnderlyingAsset.SUPER),
  ofcerc20('146206c1-be45-4293-9fa1-f313bd4171dc', 'ofcsis', 'Symbiosis', 18, UnderlyingAsset.SIS),
  ofcerc20('85aa8d06-1d85-4409-a421-99a2609a3106', 'ofccra', 'Crabada', 18, UnderlyingAsset.CRA),
  ofcerc20('a4271420-4e1d-46f2-b237-542c7720027d', 'ofcstmx', 'StormX', 18, UnderlyingAsset.STMX),
  ofcerc20('d37c6a8b-ddc8-4984-b2c0-317c18a8e4e1', 'ofccoti', 'Coti Token', 18, UnderlyingAsset.COTI),
  ofcerc20('640b14f3-3c4d-4d9c-8139-73e68ec0db14', 'ofchusd', 'Husd Token', 8, UnderlyingAsset.HUSD),
  ofcerc20('2b8c197e-b7ce-4069-8ab2-d75d1ba770ae', 'ofcqkc', 'QuarkChain', 18, UnderlyingAsset.QKC),
  ofcerc20('c11bbf5d-49ca-4678-8909-2599b60f80be', 'ofcrsr', 'Reserve Rights', 18, UnderlyingAsset.RSR),
  ofcerc20('41af8bf9-19a5-4975-9192-7e9f87718516', 'ofcspell', 'Spell Token', 18, UnderlyingAsset.SPELL),
  ofcerc20('1929aa30-ca37-4510-8502-2b3eddda97d4', 'ofcron', 'Ronin', 18, UnderlyingAsset.RON),
  ofcerc20('a968151e-db16-4eec-b1d4-b4b69221f3fb', 'ofcjcr', 'JustCarbon Removal Token', 18, UnderlyingAsset.JCR),
  ofcerc20('12cf7971-fba7-4858-b530-03ff5addf11d', 'ofcjcg', 'JustCarbon Goverance Token', 18, UnderlyingAsset.JCG),
  ofcerc20('2e291978-8710-4f82-bd69-c55e9f9fef83', 'ofcbpt', 'BlackPool Token', 18, UnderlyingAsset.BPT),
  ofcerc20('e763e6ef-17e4-4326-b532-c3ddac300811', 'ofcseth-h', 'Staked ETH Harbour', 18, UnderlyingAsset['SETH-H']),
  ofcerc20('7654c1c4-bca5-4067-a004-661609e6b57a', 'ofcreth-h', 'Reward ETH Harbour', 18, UnderlyingAsset['RETH-H']),
  ofcerc20('67fb4a6f-ba00-41fd-972d-728d2226a3d5', 'ofccho', 'Choise.com', 18, UnderlyingAsset.CHO),
  ofcerc20('af198c54-53d5-42b3-9e69-7fcc5887c0a0', 'ofcdia', 'DIA Token', 18, UnderlyingAsset.DIA),
  ofcerc20('4da7f6a6-9c56-44f7-a9b2-07ae7c669e42', 'ofcldo', 'Lido DAO Token', 18, UnderlyingAsset.LDO),
  ofcerc20('c7ac234f-5fb7-4ee3-b1e9-5479ccaab28c', 'ofcsbc', 'Sustainable Bitcoin Certificate', 8, UnderlyingAsset.SBC),
  ofcerc20('1bc9f8be-81ea-4d1f-b55d-80c1986743f9', 'ofcusdglo', 'Glo Dollar', 18, UnderlyingAsset.USDGLO),
  ofcerc20('dec90842-ca08-417e-9cb0-89723cc50b77', 'ofcwbtc', 'Wrapped Bitcoin', 8, UnderlyingAsset.WBTC),
  ofcerc20('8f01bcec-f576-49f8-b925-274566954017', 'ofcokb', 'OKB', 18, UnderlyingAsset.OKB),
  ofcerc20('37e7d659-c3a4-4761-8f42-76fb7bc5032c', 'ofcmnt', 'Mantle', 18, UnderlyingAsset.MNT),
  ofcerc20('688725ff-e582-44bc-b42e-0de600426594', 'ofcstrk', 'StarkNet Token', 18, UnderlyingAsset.STRK),
  ofcerc20('d6d6ee90-05c1-4fdd-8621-bfaefaa703ae', 'ofctkx', 'Tokenize', 8, UnderlyingAsset.TKX),
  ofcerc20('1181f8b6-1bb6-4555-a6eb-29944ad4877b', 'ofcfet', 'Fetch', 18, UnderlyingAsset.FET),
  ofcerc20('b15ff97c-3153-4aa0-8d72-ecc21e7b80cb', 'ofcfet1', 'Fetch', 18, UnderlyingAsset.FET1),
  ofcerc20('b5bfe73b-9b60-4961-914e-245c7e0dd7c3', 'ofcblur', 'Blur', 18, UnderlyingAsset.BLUR),
  ofcerc20('c93ded62-7a1a-4dd1-8398-0e68106f5009', 'ofcwld', 'Worldcoin', 18, UnderlyingAsset.WLD),
  ofcerc20('afe60408-a2cd-4b4c-b4b2-5610faa8e4dd', 'ofcjasmy', 'JasmyCoin', 18, UnderlyingAsset.JASMY),
  ofcerc20('fb5f8f3a-339a-45fc-abed-d58e9d1d10a7', 'ofcaxlv2', 'Axelar', 6, UnderlyingAsset.AXLV2),
  ofcerc20('fa9b68a2-9d09-40a9-a1d1-db5ef44a75c2', 'ofcfrax', 'Frax', 18, UnderlyingAsset.FRAX),
  ofcerc20('acf53a01-3357-4095-93a2-2112a4acdcd4', 'ofcondo', 'Ondo', 18, UnderlyingAsset.ONDO),
  ofcerc20('c06fb78f-a2d8-43ef-b367-8ad18c63e0a2', 'ofcrpl', 'Rocket Pool', 18, UnderlyingAsset.RPL),
  ofcerc20('bb36fbf3-ec3a-4233-80c1-18091d215756', 'ofcxaut', 'Tether Gold', 6, UnderlyingAsset.XAUT),
  ofcerc20('9af2377d-40a4-4fd7-9253-f659286d0636', 'ofcpepe', 'Pepe', 18, UnderlyingAsset.PEPE),
  ofcerc20('6a0189d7-92b0-402a-b9bf-29e2e445e090', 'ofccwbtc', 'Compound WBTC', 8, UnderlyingAsset.CWBTC),
  ofcerc20('3c79156b-97aa-4a25-aafe-87a8abf71eac', 'ofcceth', 'Compound Ether', 8, UnderlyingAsset.CETH),
  ofcerc20('8b4c7e30-40f0-44fc-927f-4e265ffc3c9d', 'ofcethx', 'Stader ETHx', 18, UnderlyingAsset.ETHX),
  ofcerc20('691197b6-d2e7-45ec-ae91-346eb62b9b54', 'ofcmagic', 'Magic', 18, UnderlyingAsset.MAGIC),
  ofcerc20('ced76323-8aa0-4dfc-a2c9-eee788615963', 'ofcfloki', 'FLOKI', 9, UnderlyingAsset.FLOKI),
  ofcerc20('784b50ab-a42e-4e7e-a796-867d19b4e5ac', 'ofcglm', 'Golem', 18, UnderlyingAsset.GLM),
  ofcerc20('b009d5c3-b5f2-4f0e-bbe2-7ef61410db93', 'ofcchr', 'Chroma', 6, UnderlyingAsset.CHR),
  ofcerc20(
    'd45e7c2c-bd1f-4586-8a87-2a715824d665',
    'ofcbuidl',
    'BlackRock USD Institutional Digital Liquidity Fund',
    6,
    UnderlyingAsset.BUIDL
  ),
  ofcerc20('ee9a090d-d67e-4ec5-99da-257da77f0cfd', 'ofcankr', 'Ankr Network', 18, UnderlyingAsset.ANKR),
  ofcerc20('d0efbafb-f9c7-4eb9-83b2-cf137f49e458', 'ofcpendle', 'Pendle', 18, UnderlyingAsset.PENDLE),
  ofcerc20('4efe4036-6528-45f8-9a3f-d4175103da72', 'ofcom', 'Om Token', 18, UnderlyingAsset.OM),
  ofcerc20('f60e2aa4-0b99-40df-a316-bc1a41912ffd', 'ofcoceanv2', 'Ocean Token V2', 18, UnderlyingAsset.OCEANV2),
  ofcerc20('0ee531d4-6df5-437d-aec5-aa72e33ac775', 'ofceigen', 'Eigen', 18, UnderlyingAsset.EIGEN),
  ofcerc20('bbe911d8-c900-401c-8dfb-febd98256e75', 'ofcusdy', 'Ondo U.S. Dollar Yield', 18, UnderlyingAsset.USDY),
  ofcerc20('017c87e8-db41-41f6-8382-c61ad8ced64b', 'ofcfold', 'Manifold Finance', 18, UnderlyingAsset.FOLD),
  ofcerc20('94fcd19b-6dd6-4a8c-8fea-11c73ba9fa48', 'ofcacx', 'Across Protocol', 18, UnderlyingAsset.ACX),
  ofcerc20('b5f3afea-f69a-4a05-87f9-965476ad77de', 'ofclpt', 'Livepeer Token', 18, UnderlyingAsset.LPT),
  ofcerc20('567b571f-6f79-40e4-adff-3e0e3c6ba959', 'ofcethfi', 'ether.fi governance token', 18, UnderlyingAsset.ETHFI),
  ofcerc20('cba66dc6-31eb-46c4-b73f-8cb77eb7ef5b', 'ofcgal', 'Project Galaxy', 18, UnderlyingAsset.GAL),
  ofcerc20('0c6e4b19-d748-477c-9507-6c0f51142b07', 'ofcfdusd', 'First Digital USD', 18, UnderlyingAsset.FDUSD),
  ofcerc20('80c3e860-f589-4227-a0f5-2aa6b18293c5', 'ofcrune', 'THORChain ETH.RUNE', 18, UnderlyingAsset.RUNE),
  ofcerc20('db35feb4-9cdb-447a-a698-e0e944ca6869', 'ofckcs', 'KuCoin', 6, UnderlyingAsset.KCS),
  ofcerc20('519ab013-f634-41f4-9d31-6f9368de5b09', 'ofcbeam', 'Beam', 18, UnderlyingAsset.BEAM),
  ofcerc20('4030e0fa-fa80-4e30-8c0f-9168ec65c731', 'ofcmog', 'Mog Coin', 18, UnderlyingAsset.MOG),
  ofcerc20('1a7fdcc6-8a6c-4780-b483-c6aaf990e461', 'ofcgt', 'GateChainToken', 18, UnderlyingAsset.GT),
  ofcerc20('969180cc-5af9-49c5-ad19-d8e8de755467', 'ofckas', 'Kaspa', 8, UnderlyingAsset.KAS),
  ofcerc20('eb54ecb6-7312-42c0-926a-1600d61a50dc', 'ofcbgb', 'Bitget', 18, UnderlyingAsset.BGB),
  ofcerc20('a4e0613e-1d1b-477c-9da5-7c553ff787b7', 'ofcmew', 'MEW coin', 18, UnderlyingAsset.MEW),
  ofcerc20('ba2c8abb-6375-4207-9262-8b907a1dbf1b', 'ofcusdd', 'USDD', 18, UnderlyingAsset.USDD),
  ofcerc20('cbb73d46-ce0d-4045-822b-8aa0d6fb8ad4', 'ofcw', 'Wormhole Token', 18, UnderlyingAsset.W),
  ofcerc20(
    '03a02e79-f604-4b79-96da-fb4a21456566',
    'ofceth:virtual',
    'Virtual Protocol',
    18,
    UnderlyingAsset['eth:virtual']
  ),
  ofcerc20('8f0d3af0-8f99-4860-88db-e9b52855262f', 'ofccore', 'cVault.finance', 18, UnderlyingAsset.CORE),
  ofcArbethErc20(
    'df2296e6-366e-4707-bab0-bf16ce592601',
    'ofcarbeth:link',
    'Chainlink Token',
    18,
    UnderlyingAsset['arbeth:link']
  ),
  ofcArbethErc20(
    '59220e6e-d94b-40b7-8e10-2f7c691c2482',
    'ofcarbeth:usdcv2',
    'USD Coin (native)',
    6,
    UnderlyingAsset['arbeth:usdcv2']
  ),
  ofcArbethErc20(
    'eed6696c-9c38-4897-9cae-de3aa3cb6297',
    'ofcarbeth:usdc',
    'USD Coin',
    6,
    UnderlyingAsset['arbeth:usdc']
  ),
  ofcArbethErc20(
    '4834e014-0282-4e27-ad9c-c4a4468ce732',
    'ofcarbeth:usdt',
    'Tether USD',
    6,
    UnderlyingAsset['arbeth:usdt']
  ),
  ofcArbethErc20(
    'e91ce545-8ace-4f12-b6d4-8c5a3e84022f',
    'ofcarbeth:arb',
    'Arbitrum',
    18,
    UnderlyingAsset['arbeth:arb']
  ),
  ofcAvaxErc20('2bd6201d-c46c-481e-b82d-7cf3601679cb', 'ofcavaxc:aave-e', 'Aave', 18, UnderlyingAsset['avaxc:aave']),
  ofcAvaxErc20('515a5a74-54fe-4d73-bb12-8d1130f78692', 'ofcavaxc:btc-b', 'Bitcoin', 8, UnderlyingAsset['avaxc:btc']),
  ofcAvaxErc20(
    'b8c9ea9d-4be3-4d3c-b1de-a1bb963fc03b',
    'ofcavaxc:cai',
    'Colony Avalanche Index',
    18,
    UnderlyingAsset['avaxc:cai']
  ),
  ofcAvaxErc20(
    '58d7ae4a-296c-4215-b133-01bf553f8500',
    'ofcavaxc:dai-e',
    'Dai Stablecoin',
    18,
    UnderlyingAsset['avaxc:dai']
  ),
  ofcAvaxErc20('ad7a51a1-81fb-483f-b338-9bb236ce9662', 'ofcavaxc:joe', 'Trader Joe', 18, UnderlyingAsset['avaxc:joe']),
  ofcAvaxErc20('18d60ded-bc60-48aa-a38a-6f85384ea6cc', 'ofcavaxc:klo', 'Kalao', 18, UnderlyingAsset['avaxc:klo']),
  ofcAvaxErc20('4ad0a18d-36b0-42db-ac94-938a0862ef0b', 'ofcavaxc:link', 'Chainlink', 18, UnderlyingAsset['avaxc:link']),
  ofcAvaxErc20('cf570f0c-8c17-4ba8-b658-69d38e4f37a9', 'ofcavaxc:png', 'Pangolin', 18, UnderlyingAsset['avaxc:png']),
  ofcAvaxErc20('6753faa0-7c76-4c97-ad78-667ff2416c62', 'ofcavaxc:qi', 'BenQi', 18, UnderlyingAsset['avaxc:qi']),
  ofcAvaxErc20('786e03a4-c156-48ea-8782-42ea3c63c5a3', 'ofcavaxc:sbc', 'Stable Coin', 18, UnderlyingAsset['avaxc:sbc']),
  ofcAvaxErc20('300dbac5-76a3-4ed5-96fb-1d7898da4b4e', 'ofcavaxc:usdc', 'USD Coin', 6, UnderlyingAsset['avaxc:usdc']),
  ofcAvaxErc20('974e85e7-d6ad-4a5a-9aea-cae055842f36', 'ofcavaxc:usdc-e', 'USD Coin', 6, UnderlyingAsset['avaxc:usdc']),
  ofcAvaxErc20('861e2833-90be-45ec-8c8b-a41b1b86fac3', 'ofcavaxc:usdt', 'Tether USD', 6, UnderlyingAsset['avaxc:usdt']),
  ofcAvaxErc20(
    'e56e42a8-1566-4b5b-a2f3-5439278b1e8c',
    'ofcavaxc:usdt-e',
    'Tether USD',
    6,
    UnderlyingAsset['avaxc:usdt']
  ),
  ofcAvaxErc20(
    '3986ecd8-dda6-4b30-8883-b6bf111e4624',
    'ofcavaxc:wbtc-e',
    'Wrapped BTC',
    8,
    UnderlyingAsset['avaxc:wbtc']
  ),
  ofcAvaxErc20(
    '26281e88-f83a-4b13-b69d-b8a7ce9f4598',
    'ofcavaxc:weth-e',
    'Wrapped ETH',
    18,
    UnderlyingAsset['avaxc:weth']
  ),
  ofcAvaxErc20('caeec903-4c42-4d03-8cee-91319ab708c9', 'ofcavaxc:xava', 'Avalaunch', 18, UnderlyingAsset['avaxc:xava']),
  tofcAvaxErc20(
    'e70417f4-61df-4622-a933-40a43f807923',
    'ofctavaxc:link',
    'Test Chainlink',
    18,
    UnderlyingAsset['avaxc:link']
  ),
  ofcOpethErc20('10259b23-2e2e-4574-b146-b49f1119600f', 'ofcopeth:op', 'Optimism', 18, UnderlyingAsset['opeth:op']),
  ofcBscToken('a79933f5-a9d2-4a29-a948-79313a569988', 'ofcbsc:cfx', 'BSC Conflux', 18, UnderlyingAsset['bsc:cfx']),
  ofcPolygonErc20(
    '547ce68f-cb4c-4618-bef3-9a0ebe9facd2',
    'ofcpolygon:sbc',
    'Stable Coin',
    18,
    UnderlyingAsset['polygon:sbc']
  ),
  ofcPolygonErc20(
    '413cd9b9-503a-452d-b257-95a1c82ec5e4',
    'ofcpolygon:link',
    'ChainLink Token',
    18,
    UnderlyingAsset['polygon:link']
  ),
  ofcPolygonErc20(
    '42ec9712-e47b-43c2-bec3-18cbc18fd944',
    'ofcpolygon:usdcv2',
    'USD Coin (native)',
    6,
    UnderlyingAsset['polygon:usdcv2']
  ),
  ofcPolygonErc20(
    'a63bf18b-3462-403c-93f5-ff1b608622c2',
    'ofcpolygon:usdc',
    'USD Coin',
    6,
    UnderlyingAsset['polygon:usdc']
  ),
  ofcPolygonErc20(
    '659e66ef-2265-48d4-a73c-f98e479944d1',
    'ofcpolygon:tusd',
    'TrueUSD',
    18,
    UnderlyingAsset['polygon:tusd']
  ),
  ofcPolygonErc20(
    '115e52f9-91bc-4e40-b1cb-046167bb4b09',
    'ofcpolygon:usdt',
    'Tether USD',
    6,
    UnderlyingAsset['polygon:usdt']
  ),
  ofcPolygonErc20(
    'c2e7a6d3-77bd-4a47-9cd5-cfa681a5bc95',
    'ofcpolygon:1inch-wormhole',
    '1INCH (Wormhole)',
    18,
    UnderlyingAsset['polygon:1inch']
  ),
  ofcPolygonErc20(
    '7957de12-d928-42ca-ad0b-624057e87065',
    'ofcpolygon:aave',
    'Aave',
    18,
    UnderlyingAsset['polygon:aave']
  ),
  ofcPolygonErc20(
    '7cdf8f51-1ade-434a-905f-882d8a8fc678',
    'ofcpolygon:sand',
    'SAND',
    18,
    UnderlyingAsset['polygon:sand']
  ),
  ofcPolygonErc20(
    'a6b29d29-412c-4dc9-9a26-edcc1339818a',
    'ofcpolygon:sol-wormhole',
    'Wrapped SOL (Wormhole)',
    9,
    UnderlyingAsset['polygon:sol']
  ),
  ofcPolygonErc20(
    '7a7e983f-44be-4692-8a94-b0c14574f96a',
    'ofcpolygon:wbtc',
    'Wrapped BTC',
    8,
    UnderlyingAsset['polygon:wbtc']
  ),
  ofcPolygonErc20(
    '82855675-ecfa-4acb-a489-8d7b826d2783',
    'ofcpolygon:weth',
    'Wrapped Ether',
    18,
    UnderlyingAsset['polygon:weth']
  ),
  ofcPolygonErc20(
    'ea7f06d0-32b4-4f8d-b0ab-22e447e141fa',
    'ofcpolygon:dimo',
    'Dimo',
    18,
    UnderlyingAsset['polygon:dimo']
  ),
  ofcPolygonErc20(
    '16c4bfe4-5253-4491-8d7e-6d586f133443',
    'ofcpolygon:xsgd',
    'XSGD',
    6,
    UnderlyingAsset['polygon:xsgd']
  ),
  ofcPolygonErc20(
    '26eda2a9-0559-4f18-9bb7-547c2682b742',
    'ofcpolygon:treta',
    'Treta',
    18,
    UnderlyingAsset['polygon:treta']
  ),
  ofcPolygonErc20(
    'fb5952ae-514f-4b1b-a172-bf62d9c4dbf8',
    'ofcpolygon:vcnt',
    'ViciCoin',
    18,
    UnderlyingAsset['polygon:vcnt']
  ),
  ofcPolygonErc20(
    '7874696a-e285-450e-917d-369d524e2938',
    'ofcpolygon:vext',
    'Veloce',
    18,
    UnderlyingAsset['polygon:vext']
  ),
  ofcPolygonErc20(
    '62262f53-4859-427d-bcdf-62354bd1e641',
    'ofcpolygon:zed',
    'ZED RUN',
    18,
    UnderlyingAsset['polygon:zed']
  ),
  ofcPolygonErc20(
    '85b4ad95-1761-482a-8a57-ab7fdd845fb1',
    'ofcpolygon:ape',
    'ApeCoin',
    18,
    UnderlyingAsset['polygon:ape']
  ),
  ofcPolygonErc20(
    'd1ff60e6-cf15-4ef0-bf0b-a65313b3ac70',
    'ofcpolygon:cel',
    'Celsius',
    4,
    UnderlyingAsset['polygon:cel']
  ),
  ofcPolygonErc20(
    '78cdcaea-7668-41f3-bdd8-6ce7b44ea56b',
    'ofcpolygon:comp-wormhole',
    'Compound (Wormhole)',
    18,
    UnderlyingAsset['polygon:comp']
  ),
  ofcPolygonErc20('b1868a45-d1ab-43fd-8d15-55c86ba34428', 'ofcpolygon:crv', 'CRV', 18, UnderlyingAsset['polygon:crv']),
  ofcPolygonErc20(
    '4d7c8e4c-9ba8-420c-8982-29e0eb88d1e3',
    'ofcpolygon:dai',
    'Dai Stablecoin',
    18,
    UnderlyingAsset['polygon:dai']
  ),
  ofcPolygonErc20(
    'b44eba68-8c58-4323-80f0-ff699c209f3f',
    'ofcpolygon:fcd',
    'FreshCut Diamond',
    18,
    UnderlyingAsset['polygon:fcd']
  ),
  ofcPolygonErc20(
    '2cbc1c1b-dd57-4efe-94f8-cc5ca3fc4acf',
    'ofcpolygon:fly',
    'Flycoin',
    18,
    UnderlyingAsset['polygon:fly']
  ),
  ofcPolygonErc20(
    'b020d880-99a1-42bf-b471-ccbfd3a64b9d',
    'ofcpolygon:frax',
    'Frax',
    18,
    UnderlyingAsset['polygon:frax']
  ),
  ofcPolygonErc20(
    'c7d91dc9-c1c4-4a8d-883d-e9ab70c0b8b5',
    'ofcpolygon:gfc',
    'Gcoin',
    18,
    UnderlyingAsset['polygon:gfc']
  ),
  ofcPolygonErc20(
    '9d6be533-96a7-4d02-a757-4eaf38eba215',
    'ofcpolygon:rbw',
    'Rainbow Token',
    18,
    UnderlyingAsset['polygon:rbw']
  ),
  ofcPolygonErc20('b05a3d54-34ad-4dbd-aa9f-712da4bf0344', 'ofcpolygon:srm', 'Serum', 6, UnderlyingAsset['polygon:srm']),
  ofcPolygonErc20(
    '4e1f2154-cfba-4ffa-929c-aab96b9c15b6',
    'ofcpolygon:sushi',
    'Sushi',
    18,
    UnderlyingAsset['polygon:sushi']
  ),
  ofcPolygonErc20(
    '7b0679e0-7f0d-4c32-858c-e67398ad1e72',
    'ofcpolygon:wavax-wormhole',
    'Wrapped AVAX (wormhole)',
    18,
    UnderlyingAsset['polygon:wavax']
  ),
  ofcPolygonErc20(
    '43ae6089-cfd8-456e-9d22-56fde17bd22c',
    'ofcpolygon:wbnb-wormhole',
    'Wrapped BNB (Wormhole)',
    18,
    UnderlyingAsset['polygon:wbnb']
  ),
  ofcPolygonErc20(
    '7d6bb17c-2e0d-4fd3-af16-8e7d48b82c46',
    'ofcpolygon:wftm-wormhole',
    'Wrapped FTM (Wormhole)',
    18,
    UnderlyingAsset['polygon:wftm']
  ),
  ofcPolygonErc20(
    '3e68132e-ee5e-4c61-bad8-516e6a7a9d35',
    'ofcpolygon:wmatic',
    'Wrapped Matic',
    18,
    UnderlyingAsset['polygon:wmatic']
  ),
  ofcPolygonErc20(
    'd20e0df0-540c-4630-9cc1-c73705ef9df6',
    'ofcpolygon:woo',
    'Wootrade Network',
    18,
    UnderlyingAsset['polygon:woo']
  ),
  ofcPolygonErc20(
    '408a12d5-64ac-4bc1-8711-1c6546b8e2a7',
    'ofcpolygon:yfi-wormhole',
    'Wrapped YFI (Wormhole)',
    18,
    UnderlyingAsset['polygon:yfi']
  ),
  ofcPolygonErc20(
    '13d0ed50-0d6e-45cf-a90a-542103ad39d0',
    'ofcpolygon:moca',
    'Moca',
    18,
    UnderlyingAsset['polygon:moca']
  ),
  ofcPolygonErc20(
    'f534b522-2a14-43b2-95b1-a7da595a018e',
    'ofcpolygon:geod',
    'GEODNET',
    18,
    UnderlyingAsset['polygon:geod']
  ),
  ofcPolygonErc20(
    '9016007d-f142-49bc-a07d-c1351c784945',
    'ofcpolygon:copm',
    'COP Minteo',
    18,
    UnderlyingAsset['polygon:copm']
  ),
  tofcPolygonErc20(
    '62f4329d-11cd-4875-b91b-9ceae66c9439',
    'ofctpolygon:link',
    'Polygon Test LINK',
    18,
    UnderlyingAsset['tpolygon:link']
  ),
  tofcPolygonErc20(
    '47f2a012-400b-48c1-bad8-e6abfd5da568',
    'ofctpolygon:usdc',
    'USD Coin',
    6,
    UnderlyingAsset['tpolygon:usdc']
  ),
  tofcPolygonErc20(
    '2136098f-9949-43a9-90f2-d8e5f0855e5d',
    'ofctpolygon:usdt',
    'Tether USD',
    6,
    UnderlyingAsset['tpolygon:usdt']
  ),
  tofcPolygonErc20(
    '46100d09-4f3d-4b61-8f49-99d98b8f64c0',
    'ofctpolygon:xsgd',
    'XSGD',
    6,
    UnderlyingAsset['tpolygon:xsgd']
  ),

  ofcerc20(
    'baded9c2-d530-4188-b35d-2fd00cf6ee2e',
    'ofcustb',
    'Superstate Short Duration US Government Securities Fund',
    6,
    UnderlyingAsset.USTB
  ),
  ofcerc20('fb5ba281-b060-4e68-86c8-55da5c7e7fe9', 'ofctbill', 'OpenEden T-Bills', 6, UnderlyingAsset.TBILL),
  ofcerc20('fcc0e550-ff67-4c0a-9d28-4a6e8ee32d93', 'ofcmasa', 'Masa Token', 18, UnderlyingAsset.MASA),

  ofcAlgoToken(
    'fec37305-8fb8-4c23-b42c-b4696d579eb9',
    'ofcalgo:usdc',
    'Algorand USDC',
    6,
    UnderlyingAsset['algo:USDC-31566704']
  ),

  tofcAlgoToken(
    'a4965de2-467b-45f6-9729-35f57fd6f035',
    'ofctalgo:usdc',
    'Test Algorand USDC',
    6,
    UnderlyingAsset['talgo:USDC-10458941']
  ),

  ofcHederaToken(
    'a7eceae2-145c-4d35-a8d4-3c1149c2fe06',
    'ofchbar:usdc',
    'Mainnet Hedera USD Coin',
    6,
    UnderlyingAsset.USDC
  ),

  tofcHederaToken(
    'e12614d8-21de-4303-91fa-f13a44c4902a',
    'ofcthbar:usdc',
    'Testnet Hedera USD Coin',
    6,
    UnderlyingAsset.USDC
  ),

  ofcStellarToken(
    'fd90a80b-d615-434e-9821-1ef179a06071',
    'ofcxlm:usdc',
    'Stellar USDC',
    7,
    UnderlyingAsset['xlm:USDC-GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN']
  ),

  tofcStellarToken(
    '4883a062-c38c-43d9-92c6-7cec9aaef995',
    'ofctxlm:tst',
    'Test Stellar BitGo Test Token',
    7,
    UnderlyingAsset['txlm:TST-GBQTIOS3XGHB7LVYGBKQVJGCZ3R4JL5E4CBSWJ5ALIJUHBKS6263644L']
  ),

  stellarToken(
    '21549d80-c335-4d00-9ef2-86c3da3fcd46',
    'xlm:BST-GADDFE4R72YUP2AOEL67OHZN3GJQYPC3VE734N2XFMEGRR2L32CZ3XYZ',
    'BitGo Shield Token',
    7,
    UnderlyingAsset['xlm:BST-GADDFE4R72YUP2AOEL67OHZN3GJQYPC3VE734N2XFMEGRR2L32CZ3XYZ'],
    'bitgo.com',
    AccountCoin.DEFAULT_FEATURES,
    '',
    'BST'
  ),
  stellarToken(
    '3c72d612-d3bb-482b-8f0e-e541c5f13ea0',
    'xlm:VELO-GDM4RQUQQUVSKQA7S6EM7XBZP3FCGH4Q7CL6TABQ7B2BEJ5ERARM2M5M',
    'Velo Token',
    7,
    UnderlyingAsset['xlm:VELO-GDM4RQUQQUVSKQA7S6EM7XBZP3FCGH4Q7CL6TABQ7B2BEJ5ERARM2M5M'],
    'velo.org',
    AccountCoin.DEFAULT_FEATURES,
    '',
    'VELO'
  ),
  stellarToken(
    '3589f447-9f9e-4964-a1cd-57266ed77320',
    'xlm:SLT-GCKA6K5PCQ6PNF5RQBF7PQDJWRHO6UOGFMRLK3DYHDOI244V47XKQ4GP',
    'Smartlands Token',
    7,
    UnderlyingAsset['xlm:SLT-GCKA6K5PCQ6PNF5RQBF7PQDJWRHO6UOGFMRLK3DYHDOI244V47XKQ4GP'],
    'smartlands.io',
    AccountCoin.DEFAULT_FEATURES,
    '',
    'SLT'
  ),
  stellarToken(
    'd5e3ef15-5e13-4dbe-b6f4-68deaa9aa45b',
    'xlm:USD-GDUKMGUGDZQK6YHYA5Z6AY2G4XDSZPSZ3SW5UN3ARVMO6QSRDWP5YLEX',
    'AnchorUSD',
    7,
    UnderlyingAsset['xlm:USD-GDUKMGUGDZQK6YHYA5Z6AY2G4XDSZPSZ3SW5UN3ARVMO6QSRDWP5YLEX'],
    'anchorusd.com',
    AccountCoin.DEFAULT_FEATURES,
    '',
    'USD'
  ),
  stellarToken(
    '36dc0757-8583-4f42-bf62-8eea12cb5268',
    'xlm:ETH-GBVOL67TMUQBGL4TZYNMY3ZQ5WGQYFPFD5VJRWXR72VA33VFNL225PL5',
    'Stellar ETH',
    7,
    UnderlyingAsset['xlm:ETH-GBVOL67TMUQBGL4TZYNMY3ZQ5WGQYFPFD5VJRWXR72VA33VFNL225PL5'],
    'stellarport.io',
    AccountCoin.DEFAULT_FEATURES,
    '',
    'ETH'
  ),
  stellarToken(
    '13ddfca0-1d8b-457e-b465-b6ca2da24148',
    'xlm:WXT-GASBLVHS5FOABSDNW5SPPH3QRJYXY5JHA2AOA2QHH2FJLZBRXSG4SWXT',
    'Wirex Token',
    7,
    UnderlyingAsset['xlm:WXT-GASBLVHS5FOABSDNW5SPPH3QRJYXY5JHA2AOA2QHH2FJLZBRXSG4SWXT'],
    'wxt.wirexapp.com',
    AccountCoin.DEFAULT_FEATURES,
    '',
    'WXT'
  ),
  stellarToken(
    'd64a43e4-8b3d-448c-a292-b5222b61a3ed',
    'xlm:USDC-GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN',
    'Stellar USDC',
    7,
    UnderlyingAsset['xlm:USDC-GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN'],
    'centre.io',
    XLM_TOKEN_FEATURES_WITH_FRANKFURT,
    '',
    'USDC'
  ),
  stellarToken(
    '8b30dc19-aad7-426b-a98b-ee05f2e6dd71',
    'xlm:SIX-GDMS6EECOH6MBMCP3FYRYEVRBIV3TQGLOFQIPVAITBRJUMTI6V7A2X6Z',
    'Stellar SIX Network',
    7,
    UnderlyingAsset['xlm:SIX-GDMS6EECOH6MBMCP3FYRYEVRBIV3TQGLOFQIPVAITBRJUMTI6V7A2X6Z'],
    'six.network',
    AccountCoin.DEFAULT_FEATURES,
    '',
    'SIX'
  ),
  stellarToken(
    '62e2dab9-5d6b-416b-a6fd-88aaedd5677a',
    'xlm:ARST-GCSAZVWXZKWS4XS223M5F54H2B6XPIIXZZGP7KEAIU6YSL5HDRGCI3DG',
    'Argentine Stable coin',
    7,
    UnderlyingAsset['xlm:ARST-GCSAZVWXZKWS4XS223M5F54H2B6XPIIXZZGP7KEAIU6YSL5HDRGCI3DG'],
    'anchors.stablex.org',
    AccountCoin.DEFAULT_FEATURES,
    '',
    'ARST'
  ),
  stellarToken(
    '2b1ced39-0aee-4d35-b109-aa03e44768cb',
    'xlm:BRLT-GCHQ3F2BF5P74DMDNOOGHT5DUCKC773AW5DTOFINC26W4KGYFPYDPRSO',
    'Brazilian Stable coin',
    7,
    UnderlyingAsset['xlm:BRLT-GCHQ3F2BF5P74DMDNOOGHT5DUCKC773AW5DTOFINC26W4KGYFPYDPRSO'],
    'anchors.stablex.org',
    AccountCoin.DEFAULT_FEATURES,
    '',
    'BRLT'
  ),
  stellarToken(
    '13820800-a6e0-4a09-95e9-76df0313c5ed',
    'xlm:AQUA-GBNZILSTVQZ4R7IKQDGHYGY2QXL5QOFJYQMXPKWRRM5PAV7Y4M67AQUA',
    'Aqua Token',
    7,
    UnderlyingAsset['xlm:AQUA-GBNZILSTVQZ4R7IKQDGHYGY2QXL5QOFJYQMXPKWRRM5PAV7Y4M67AQUA'],
    'aqua.network',
    AccountCoin.DEFAULT_FEATURES,
    '',
    'AQUA'
  ),
  stellarToken(
    '9ed420a6-3da6-4b3f-984b-19b03f3098ec',
    'xlm:EURC-GDHU6WRG4IEQXM5NZ4BMPKOXHW76MZM4Y2IEMFDVXBSDP6SJY4ITNPP2',
    'EURC',
    7,
    UnderlyingAsset['xlm:EURC-GDHU6WRG4IEQXM5NZ4BMPKOXHW76MZM4Y2IEMFDVXBSDP6SJY4ITNPP2'],
    'circle.com',
    AccountCoin.DEFAULT_FEATURES,
    '',
    'EURC'
  ),
  stellarToken(
    'f41ca148-3c44-48e2-aabf-0e1ab5f0bf3e',
    'xlm:GYEN-GDF6VOEGRWLOZ64PQQGKD2IYWA22RLT37GJKS2EJXZHT2VLAGWLC5TOB',
    'GMO JPY',
    7,
    UnderlyingAsset['xlm:GYEN-GDF6VOEGRWLOZ64PQQGKD2IYWA22RLT37GJKS2EJXZHT2VLAGWLC5TOB'],
    'stablecoin.z.com',
    XLM_TOKEN_FEATURES_WITH_FRANKFURT,
    '',
    'GYEN'
  ),
  stellarToken(
    '2f654247-3708-4e20-978b-af896fd910d3',
    'xlm:ZUSD-GDF6VOEGRWLOZ64PQQGKD2IYWA22RLT37GJKS2EJXZHT2VLAGWLC5TOB',
    'Z.com USD',
    7,
    UnderlyingAsset['xlm:ZUSD-GDF6VOEGRWLOZ64PQQGKD2IYWA22RLT37GJKS2EJXZHT2VLAGWLC5TOB'],
    'stablecoin.z.com',
    XLM_TOKEN_FEATURES_WITH_FRANKFURT,
    '',
    'ZUSD'
  ),
  stellarToken(
    'bde64255-0065-4e01-add4-3226325d512e',
    'xlm:EURS-GC5FGCDEOGOGSNWCCNKS3OMEVDHTE3Q5A5FEQWQKV3AXA7N6KDQ2CUZJ',
    'STASIS EURS',
    7,
    UnderlyingAsset['xlm:EURS-GC5FGCDEOGOGSNWCCNKS3OMEVDHTE3Q5A5FEQWQKV3AXA7N6KDQ2CUZJ'],
    'stasis.net',
    AccountCoin.DEFAULT_FEATURES,
    '',
    'EURS'
  ),
  stellarToken(
    '86841e89-011e-486d-bd29-1474cca0dd65',
    'xlm:VEUR-GDXLSLCOPPHTWOQXLLKSVN4VN3G67WD2ENU7UMVAROEYVJLSPSEWXIZN',
    'VNX Euro',
    7,
    UnderlyingAsset['xlm:VEUR-GDXLSLCOPPHTWOQXLLKSVN4VN3G67WD2ENU7UMVAROEYVJLSPSEWXIZN'],
    'vnx.li',
    XLM_TOKEN_FEATURES_WITH_FRANKFURT,
    '',
    'VEUR'
  ),
  stellarToken(
    '2bcb06ec-8043-4568-a236-274ddad2335f',
    'xlm:VCHF-GDXLSLCOPPHTWOQXLLKSVN4VN3G67WD2ENU7UMVAROEYVJLSPSEWXIZN',
    'VNX Franc',
    7,
    UnderlyingAsset['xlm:VCHF-GDXLSLCOPPHTWOQXLLKSVN4VN3G67WD2ENU7UMVAROEYVJLSPSEWXIZN'],
    'vnx.li',
    XLM_TOKEN_FEATURES_WITH_FRANKFURT,
    '',
    'VCHF'
  ),
  stellarToken(
    'ea901538-9adf-485f-82d1-3a80b94359aa',
    'xlm:AUDD-GDC7X2MXTYSAKUUGAIQ7J7RPEIM7GXSAIWFYWWH4GLNFECQVJJLB2EEU',
    'AUDD',
    7,
    UnderlyingAsset['xlm:AUDD-GDC7X2MXTYSAKUUGAIQ7J7RPEIM7GXSAIWFYWWH4GLNFECQVJJLB2EEU'],
    'audd.digital',
    XLM_TOKEN_FEATURES_WITH_FRANKFURT,
    '',
    'AUDD'
  ),
  tronToken(
    '5f3266f8-252c-492a-90d7-bb6d3bf550fb',
    'trx:btt',
    'BitTorrent',
    18,
    'TAFjULxiVgT4qWk6UZwjqwZXTSaGaqnVp4',
    UnderlyingAsset.BTT
  ),
  tronToken(
    'd8d505d2-f525-4922-b538-317b879bd316',
    'trx:btc',
    'Bitcoin (TRC20)',
    8,
    'TN3W4H6rK2ce4vX9YnFQHwKENnHjoxb3m9',
    UnderlyingAsset.BTC
  ),
  tronToken(
    '85d99eb6-84a1-4525-a9df-db82bcc21568',
    'trx:wbtc',
    'Tron Wrapped Bitcoin',
    8,
    'TXpw8XeWYeTUd4quDskoUqeQPowRh4jY65',
    UnderlyingAsset.WBTC
  ),
  tronToken(
    '2fab33a1-0a7b-4935-82c2-b0b5c22540ee',
    'trx:weth',
    'Tron Wrapped Ether',
    18,
    'TXWkP3jLBqRGojUih1ShzNyDaN5Csnebok',
    UnderlyingAsset.WETH
  ),
  tronToken(
    'f950c2f5-508f-49e5-88a7-9de3da1f5cf9',
    'trx:usdc',
    'USD Coin',
    6,
    'TEkxiTehnzSmSe2XqrBj4w32RUN966rdz8',
    UnderlyingAsset.USDC
  ),
  tronToken(
    'f96fda99-cf5a-4ac4-885e-fa95292a7135',
    'trx:usdt',
    'Tether USD',
    6,
    'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
    UnderlyingAsset['trx:usdt']
  ),
  tronToken(
    '77fe25dc-7871-4d9d-9cc0-2e5cba6250ff',
    'trx:sun',
    'SUN',
    18,
    'TSSMHYeV2uE9qYH95DqyoCuNCzEL1NvU3S',
    UnderlyingAsset.SUN
  ),
  tronToken(
    'dd0e0950-ff1a-4302-b12d-d661d59602d8',
    'trx:htx',
    'HTX',
    18,
    'TUPM7K8REVzD2UdV4R5fe5M8XbnR2DdoJ6',
    UnderlyingAsset['trx:htx']
  ),
  tronToken(
    '888fb35c-1b3d-425d-af65-e6aa7453edce',
    'trx:jst',
    'Just',
    18,
    'TCFLL5dx5ZJdKnWuesXxi1VPwjLVmWZZy9',
    UnderlyingAsset['trx:jst']
  ),
  tronToken(
    'c2607e31-8da7-4b73-bbf3-f9f0209b73eb',
    'trx:tusd',
    'TrueUSD',
    18,
    'TUpMhErZL2fhh4sVNULAbNKLokS4GjC1F4',
    UnderlyingAsset['trx:tusd']
  ),
  tronToken(
    '649c3a89-6064-4131-8eb7-087d65207cdc',
    'trx:win',
    'WINkLink',
    6,
    'TLa2f6VPqDgRE67v1736s7bJ8Ray5wYjU7',
    UnderlyingAsset['trx:win']
  ),
  tronToken(
    '972e50a5-f513-469a-a4b7-f0776d3ab608',
    'trx:usdd',
    'USDD',
    18,
    'TPYmHEhy5n8TCEfYGqW2rPxsghSfzghPDn',
    UnderlyingAsset['trx:usdd']
  ),
  algoToken(
    'bf444e89-e762-48a9-a27d-8efa2aed7867',
    'algo:USDC-31566704',
    undefined,
    'USDC',
    6,
    UnderlyingAsset['algo:USDC-31566704'],
    'https://allo.info/asset/31566704/token',
    AccountCoin.DEFAULT_FEATURES,
    '',
    'USDC'
  ),
  algoToken(
    '4d9eee7f-68ac-4ce4-8c83-e673f996215d',
    'algo:USDt-312769',
    undefined,
    'Algorand USDT',
    6,
    UnderlyingAsset['algo:USDt-312769'],
    'https://allo.info/asset/312769/token',
    AccountCoin.DEFAULT_FEATURES,
    '',
    'USDt'
  ),
  algoToken(
    '4d3ec83f-a3ad-4b76-89de-a1b7134a39d4',
    'algo:MCAU-6547014',
    undefined,
    'MCAU',
    5,
    UnderlyingAsset['algo:MCAU-6547014'],
    'https://allo.info/asset/6547014/token',
    AccountCoin.DEFAULT_FEATURES,
    '',
    'MCAU'
  ),
  algoToken(
    '4a4cdf2b-e01e-4ee8-b3d6-5ac471309ae1',
    'algo:VCAD-438505559',
    undefined,
    'VCAD',
    2,
    UnderlyingAsset['algo:VCAD-438505559'],
    'https://allo.info/asset/438505559/token',
    AccountCoin.DEFAULT_FEATURES,
    '',
    'VCAD'
  ),
  algoToken(
    'abe2e04e-d53b-4a23-9a68-08eaeb8b028e',
    'algo:QCAD-84507107',
    undefined,
    'QCAD',
    2,
    UnderlyingAsset['algo:QCAD-84507107'],
    'https://allo.info/asset/84507107/token',
    AccountCoin.DEFAULT_FEATURES,
    '',
    'QCAD'
  ),
  terc20(
    '0205f0d6-0647-47c9-ad8b-c48d048e54f3',
    'fixed',
    'Goerli Example Fixed Supply Token',
    18,
    '0xa13de8df4ef9d6016f0826858d48045848429390',
    UnderlyingAsset.FIXED,
    undefined,
    undefined,
    undefined,
    Networks.test.goerli
  ),
  terc20(
    'cf52b96c-a89c-4db4-aadd-92f4a78edbbf',
    'gusdt',
    'Goerli USDT',
    18,
    '0x64d081854fad45e64db52cd28ba78ae1ecfee59b',
    UnderlyingAsset.GUSDT,
    undefined,
    undefined,
    undefined,
    Networks.test.goerli
  ),
  terc20(
    '56be4cee-9a5f-4580-a3ed-480d1baac5c0',
    'teuroc',
    'Test Euro Coin',
    6,
    '0xa683d909e996052955500ddc45ca13e25c76e286',
    UnderlyingAsset.TEUROC,
    undefined,
    undefined,
    undefined,
    Networks.test.goerli
  ),
  terc20(
    'af91abaf-8811-4e8c-a396-fe484f968538',
    'ghdo',
    'Himalayan Dollar',
    18,
    '0x5426635915740813092eeff72158bc492799da5f',
    UnderlyingAsset.HDO,
    undefined,
    undefined,
    undefined,
    Networks.test.goerli
  ),
  terc20(
    '05bb6085-b6c5-4c61-867d-71284842512c',
    'gterc2dp',
    'Goerli Test ERC Token 2 Decimals',
    2,
    '0xe19e232e942cde4320b6354646cbb1336ae732c7',
    UnderlyingAsset.GTERC2DP,
    undefined,
    undefined,
    undefined,
    Networks.test.goerli
  ),
  terc20(
    '26ce3a69-2c52-475b-b12f-1efe96da820f',
    'gterc6dp',
    'Goerli Test ERC Token 6 Decimals',
    6,
    '0xe7afa17e6e5257806d2309b01e6de320668ec3dc',
    UnderlyingAsset.GTERC6DP,
    undefined,
    undefined,
    undefined,
    Networks.test.goerli
  ),
  terc20(
    '39a3d88c-0bf8-4e54-96ad-1a4829d26bba',
    'ghcn',
    'Himalayan Coin',
    18,
    '0xa05e3efe2771cd04191f3eadb9a99ba3b4bf9d26',
    UnderlyingAsset.HCN,
    undefined,
    undefined,
    undefined,
    Networks.test.goerli
  ),
  terc20(
    'c1623fdb-5cfb-43c3-9c4f-8ef073ac50d8',
    'gterc18dp',
    'Goerli Test ERC Token 18 Decimals',
    18,
    '0x61d54356be035944a3868eaa9556353b7150699d',
    UnderlyingAsset.GTERC18DP,
    undefined,
    undefined,
    undefined,
    Networks.test.goerli
  ),
  terc20(
    '95b5dadf-faa7-43f3-8fa4-59998879c842',
    'gtaave18dp',
    'Goerli Test AAVE Token 18 Decimals',
    18,
    '0x631d5e3c45a459e8f98b9d6a2734fce7b051f845',
    UnderlyingAsset.GTAAVE18DP,
    undefined,
    undefined,
    undefined,
    Networks.test.goerli
  ),
  terc20(
    '46115188-73f0-44c5-bdd2-cce85b4599a7',
    'gtbat18dp',
    'Goerli Test BAT Token 18 Decimals',
    18,
    '0x95458b26c8b524eb5ef92c7a1759ede6224bef2e',
    UnderlyingAsset.GTBAT18DP,
    undefined,
    undefined,
    undefined,
    Networks.test.goerli
  ),
  terc20(
    'e9cd18db-4eb5-496c-8828-42a7a4af9c06',
    'gtcomp18dp',
    'Goerli Test COMP Token 18 Decimals',
    18,
    '0xa1ff97c394b25926acb09d12bacf0613055a2727',
    UnderlyingAsset.GTCOMP18DP,
    undefined,
    undefined,
    undefined,
    Networks.test.goerli
  ),
  terc20(
    'd6b54ae4-505b-412f-93f9-3c0b5893b1ba',
    'gtgrt18dp',
    'Goerli Test GRT Token 18 Decimals',
    18,
    '0x1441f298d1f15084a0e5c714c966033e39597de7',
    UnderlyingAsset.GTGRT18DP,
    undefined,
    undefined,
    undefined,
    Networks.test.goerli
  ),
  terc20(
    'aabf7c6b-4b40-41e6-acc5-7d0ad184ea2d',
    'gtlink18dp',
    'Goerli Test LINK Token 18 Decimals',
    18,
    '0xfe4537ff71aef28592c5c7331ed4b20f276d770b',
    UnderlyingAsset.GTLINK18DP,
    undefined,
    undefined,
    undefined,
    Networks.test.goerli
  ),
  terc20(
    '0cef34dc-2416-4338-89b5-bf9c53c35a9e',
    'gtmkr18dp',
    'Goerli Test MKR Token 18 Decimals',
    18,
    '0xf84e8207e4dc846e250208a6e4b05aa3e7ab00c6',
    UnderlyingAsset.GTMKR18DP,
    undefined,
    undefined,
    undefined,
    Networks.test.goerli
  ),
  terc20(
    '47f6c65d-9c7d-4236-98ef-766a55933815',
    'gtsnx18dp',
    'Goerli Test SNX Token 18 Decimals',
    18,
    '0x50608a26bff103290a4a47b152395047801e9280',
    UnderlyingAsset.GTSNX18DP,
    undefined,
    undefined,
    undefined,
    Networks.test.goerli
  ),
  terc20(
    'a0c58c0d-ffe0-4ec9-98f6-3ea3efaf84c8',
    'gtuni18dp',
    'Goerli Test UNI Token 18 Decimals',
    18,
    '0x6be1a99c215872cea33217b0f4bad63f186ddfac',
    UnderlyingAsset.GTUNI18DP,
    undefined,
    undefined,
    undefined,
    Networks.test.goerli
  ),
  terc20(
    '59a9c99e-ab23-48f8-b0d9-a7db531f682a',
    'gtusdt6dp',
    'Goerli Test USDT Token 6 Decimals',
    6,
    '0x51445dcddf5246229bae8c0ba3ea462e63038641',
    UnderlyingAsset.GTUSDT6DP,
    undefined,
    undefined,
    undefined,
    Networks.test.goerli
  ),
  terc20(
    '6d895aef-5294-4758-9521-ef04cc60f22b',
    'gtyfi18dp',
    'Goerli Test YFI Token 18 Decimals',
    18,
    '0xf4755c1a9aaad9d6b919edb8346ce9b46d066be4',
    UnderlyingAsset.GTYFI18DP,
    undefined,
    undefined,
    undefined,
    Networks.test.goerli
  ),
  terc20(
    '378bf9a7-9cbf-483b-9222-5a6c9d14552d',
    'gtwbtc18dp',
    'Goerli Test WBTC Token 8 Decimals',
    8,
    '0xd4bccebe77b7c1da89818f8889e3ea09046e7e38',
    UnderlyingAsset.GTWBTC8DP,
    undefined,
    undefined,
    undefined,
    Networks.test.goerli
  ),
  terc20(
    '6a589d24-2053-4c04-ab8a-e66bde0a6f96',
    'terc',
    'Test ERC Token',
    18,
    '0x945ac907cf021a6bcd07852bb3b8c087051706a9',
    UnderlyingAsset.TERC
  ),
  terc20(
    'c2bfd94f-00c3-4c40-8cd3-0db8b3653917',
    'terc2dp',
    'Test ERC Token 2 Decimals',
    2,
    '0x107295c724c29553f51c5373b959f947065e6445',
    UnderlyingAsset.TERC2DP,
    undefined,
    undefined,
    undefined,
    Networks.test.goerli
  ),
  terc20(
    'eb151356-10b4-4272-9ae6-da2d994af221',
    'terc6dp',
    'Test ERC Token 6 Decimals',
    6,
    '0x4fcae60b370e5e523d18ba1fdf3bae46de88ac70',
    UnderlyingAsset.TERC6DP,
    undefined,
    undefined,
    undefined,
    Networks.test.goerli
  ),
  terc20(
    'fcffa835-b941-45cc-b979-418fb6091380',
    'terc18dp',
    'Test ERC Token 18 Decimals',
    18,
    '0xd1e7cd06a5c81af9307cf3162f0fe740a0a69d25',
    UnderlyingAsset.TERC18DP,
    undefined,
    undefined,
    undefined,
    Networks.test.goerli
  ),
  terc20(
    'd713305d-f1e9-4481-b541-9f72ba3d3e58',
    'terc2dp1',
    'Test ERC Token 2 Decimals',
    2,
    '0xceef48d58cc3a51d8b6df155633007415b9bae01',
    UnderlyingAsset.TERC2DP1,
    undefined,
    undefined,
    undefined,
    Networks.test.goerli
  ),
  terc20(
    'a49b74dc-c43c-4c67-bc0d-ff596b46e0d1',
    'terc2dp2',
    'Test ERC Token 2 Decimals',
    2,
    '0x168ae5b381f7c317ac6ef2161c6e5fcc0e0de41e',
    UnderlyingAsset.TERC2DP2,
    undefined,
    undefined,
    undefined,
    Networks.test.goerli
  ),
  terc20(
    'fe7dd8ef-a7d1-41a9-9b6e-fffacef0d94a',
    'terc2dp3',
    'Test ERC Token 2 Decimals',
    2,
    '0x12cb9d6127ac74847cc444e6661cfd1b5107bd26',
    UnderlyingAsset.TERC2DP3,
    undefined,
    undefined,
    undefined,
    Networks.test.goerli
  ),
  terc20(
    '4ef44d49-ba21-42f9-a202-147dbfe7ea98',
    'terc2dp4',
    'Test ERC Token 2 Decimals',
    2,
    '0x458fdef6e1e58614d82f3116d8ca1f23419cb8c0',
    UnderlyingAsset.TERC2DP4,
    undefined,
    undefined,
    undefined,
    Networks.test.goerli
  ),
  terc20(
    '2d4c3457-e8be-44c4-bf0e-ee8c90f69253',
    'terc2dp5',
    'Test ERC Token 2 Decimals',
    2,
    '0xf44c85bf1d556a8268a1212cf0b9248af4f238bd',
    UnderlyingAsset.TERC2DP5,
    undefined,
    undefined,
    undefined,
    Networks.test.goerli
  ),
  terc20(
    '8cc596b9-6ec6-4b0f-bbd0-9a895d92ce04',
    'terc6dp1',
    'Test ERC Token 6 Decimals',
    6,
    '0x3b9f958f0ba34aa103fabb054f29400703470bac',
    UnderlyingAsset.TERC6DP1,
    undefined,
    undefined,
    undefined,
    Networks.test.goerli
  ),
  terc20(
    'aa750c4e-fe1d-436a-9971-d596bfe66a44',
    'terc6dp2',
    'Test ERC Token 6 Decimals',
    6,
    '0x2508d109a0cd87e597a1de071325f5cf56d4639a',
    UnderlyingAsset.TERC6DP2,
    undefined,
    undefined,
    undefined,
    Networks.test.goerli
  ),
  terc20(
    '3828d10b-cf43-4d75-9f41-3b993a37ad98',
    'terc6dp3',
    'Test ERC Token 6 Decimals',
    6,
    '0xdda2375104ee9a97e1d7aa4bc48ede2c4c6ddf48',
    UnderlyingAsset.TERC6DP3,
    undefined,
    undefined,
    undefined,
    Networks.test.goerli
  ),
  terc20(
    '0d848049-97af-435c-b454-46bffb270352',
    'terc6dp4',
    'Test ERC Token 6 Decimals',
    6,
    '0x06c1f1195c59ec5f318d12d4cc2d1f9d45261756',
    UnderlyingAsset.TERC6DP4,
    undefined,
    undefined,
    undefined,
    Networks.test.goerli
  ),
  terc20(
    '2e202e23-4e87-4c0d-8e06-4d5eb0f32ffc',
    'terc6dp5',
    'Test ERC Token 6 Decimals',
    6,
    '0x3326af8eeb6d4ce1f1f0652fcb3d5e07cd9c1039',
    UnderlyingAsset.TERC6DP5,
    undefined,
    undefined,
    undefined,
    Networks.test.goerli
  ),
  terc20(
    '6bdf7935-cfb0-4a8f-9204-2e87df2bdd89',
    'terc18dp1',
    'Test ERC Token 18 Decimals',
    18,
    '0x9f77b76e6866b3f5dd99382c96f16eddabc0b78e',
    UnderlyingAsset.TERC18DP1,
    undefined,
    undefined,
    undefined,
    Networks.test.goerli
  ),
  terc20(
    'c28caef6-1312-49ad-9aad-fff8fdb63c6c',
    'theu',
    'Goerli Test Himalaya Euro Token',
    18,
    '0xbd6bb9f5364fe1408233204b82c3acfb4ce2b9d5',
    UnderlyingAsset.THEU,
    undefined,
    undefined,
    undefined,
    Networks.test.goerli
  ),
  terc20(
    '5e4f0e5e-b8ce-431c-8a62-62e54e32bb82',
    'tusds',
    'Holesky Testnet USD Standard',
    6,
    '0x399ae63d3fd23da82109fc8b632c19a1810f657e',
    UnderlyingAsset.TUSDS,
    undefined,
    undefined,
    undefined,
    Networks.test.holesky
  ),
  terc20(
    '17377290-40ff-47a3-8346-ba03885f7cc3',
    'tgousd',
    'Holesky Testnet GoUSD',
    6,
    '0x51cef49e20d11a2735d09e3bb68d79ec490e3579',
    UnderlyingAsset.TGOUSD,
    undefined,
    undefined,
    undefined,
    Networks.test.holesky
  ),
  terc20(
    '30179af0-ca75-4cb1-99d9-028bc56bf10e',
    'tmsn',
    'meson.network-testnet',
    18,
    '0xde939833ed21fe3833d3d9e545dc7faa9f161d06',
    UnderlyingAsset.TMSN,
    undefined,
    undefined,
    undefined,
    Networks.test.goerli
  ),
  terc20(
    '13ff20df-fde8-478e-919b-eff8ea7169ab',
    'txsgd',
    'XSGD',
    6,
    '0x3f811bb6e605ef518b0cd9281eb4d9ad88a3953f',
    UnderlyingAsset.TXSGD,
    undefined,
    undefined,
    undefined,
    Networks.test.holesky
  ),
  terc20(
    'd48aae8b-3a3c-46b7-a98f-ea7347dc5b45',
    'txusd',
    'XUSD Holesky',
    6,
    '0x6d41906cce58491daf2ca8141a1c4b180fa6e7b9',
    UnderlyingAsset.TXUSD,
    undefined,
    undefined,
    undefined,
    Networks.test.holesky
  ),
  terc20(
    '346e3e87-1ac6-45fd-afa6-cad66872ebc1',
    'tweth',
    'Wrapped Ether',
    18,
    '0x94373a4919b3240d86ea41593d5eba789fef3848',
    UnderlyingAsset.TWETH,
    TWETH_FEATURES,
    undefined,
    undefined,
    Networks.test.holesky
  ),
  terc20(
    '95f5bf48-f2bb-4c64-a851-4f95ddce2fcf',
    'hterc18dp',
    'TERC18DP',
    18,
    '0x7ca1945d697ac04965774700db8d0b64d81b288d',
    UnderlyingAsset.TERC18DP,
    undefined,
    undefined,
    undefined,
    Networks.test.holesky
  ),
  terc20(
    '9d5730cf-a1c2-4d0e-9ee9-922add38a11e',
    'hteth:bgerchv2',
    'BG Test Token',
    18,
    '0xee4d03adfca9a902d09f6e3e09dbd5a8a5122fb6',
    UnderlyingAsset['hteth:bgerchv2'],
    HTETH_TOKEN_FEATURES,
    undefined,
    undefined,
    Networks.test.holesky
  ),
  terc20(
    'e09792d6-87f9-412e-9394-03ececf56232',
    'hterc6dp',
    'TERC6DP',
    6,
    '0xdd415a799a11c2bcc380937b7c46d5035df4f1e2',
    UnderlyingAsset.TERC6DP,
    undefined,
    undefined,
    undefined,
    Networks.test.holesky
  ),
  terc20(
    'c316d8ef-20d6-40b7-b0c1-e3cc278d0c17',
    'hterc2dp',
    'TERC2DP',
    2,
    '0x5b494aba42b752b46c91e35fc914b4c2f8d61a00',
    UnderlyingAsset.TERC2DP,
    undefined,
    undefined,
    undefined,
    Networks.test.holesky
  ),
  terc20(
    'f49e8632-7cd9-4e0b-a576-7e9cd12bcf82',
    'topm',
    'Goerli Test OPM',
    18,
    '0xfffad1676f1da8dfa7691db388a5d20d3b50c438',
    UnderlyingAsset.TOPM,
    undefined,
    undefined,
    undefined,
    Networks.test.goerli
  ),
  terc20(
    '7ac2ea4c-e856-4495-b727-0e0dde011cab',
    'terc18dp2',
    'Test ERC Token 18 Decimals',
    18,
    '0x18b17853ff62122c60f113b8b8967243c39ad30e',
    UnderlyingAsset.TERC18DP2,
    undefined,
    undefined,
    undefined,
    Networks.test.goerli
  ),
  terc20(
    'a4c6431f-7709-4f54-a883-d0312229a603',
    'terc18dp3',
    'Test ERC Token 18 Decimals',
    18,
    '0x96f13e2ea4b738380922dd9f5cd8fcf0416e5f2d',
    UnderlyingAsset.TERC18DP3,
    undefined,
    undefined,
    undefined,
    Networks.test.goerli
  ),
  terc20(
    '77f4057f-93d0-40e1-b0ec-21230a9e1ef6',
    'terc18dp4',
    'Test ERC Token 18 Decimals',
    18,
    '0xbecf20f89b6898bd8bbf3fa93fb4bcda367b9594',
    UnderlyingAsset.TERC18DP4,
    undefined,
    undefined,
    undefined,
    Networks.test.goerli
  ),
  terc20(
    '141a2360-97c3-4289-8fbb-a7a5d9d5fdf9',
    'terc18dp5',
    'Test ERC Token 18 Decimals',
    18,
    '0x4464fe55f9a8aea46e02c4a22b4d74661805ec26',
    UnderlyingAsset.TERC18DP5,
    undefined,
    undefined,
    undefined,
    Networks.test.goerli
  ),
  terc20(
    '7f2e9245-1676-4fd3-b4f3-4784927eec1b',
    'terc18dp6',
    'Test ERC Token 18 Decimals',
    18,
    '0x998ddfd1ac3ed76fc163528c5fc69b8d67fa5395',
    UnderlyingAsset.TERC18DP6,
    undefined,
    undefined,
    undefined,
    Networks.test.goerli
  ),
  terc20(
    '7e6b255d-60d7-4580-820f-989ab52e36c8',
    'terc18dp7',
    'Test ERC Token 18 Decimals',
    18,
    '0xf2555ac243ab2606fa71e2f2728117054dd1867b',
    UnderlyingAsset.TERC18DP7,
    undefined,
    undefined,
    undefined,
    Networks.test.goerli
  ),
  terc20(
    '32aab7d1-ee13-435d-bd49-4cc84cb71440',
    'terc18dp8',
    'Test ERC Token 18 Decimals',
    18,
    '0xd9da1e909e3b4b2c1ec31b702bef0bf1e42533e4',
    UnderlyingAsset.TERC18DP8,
    undefined,
    undefined,
    undefined,
    Networks.test.goerli
  ),
  terc20(
    '4f9dd243-0991-4ad0-b089-92bcbb718ed0',
    'terc18dp9',
    'Test ERC Token 18 Decimals',
    18,
    '0xb91be6a36b60c4576aff75a50d2b7c762349ddec',
    UnderlyingAsset.TERC18DP9,
    undefined,
    undefined,
    undefined,
    Networks.test.goerli
  ),
  terc20(
    'd7797d54-3283-40c4-94ed-94ef24ce9ab0',
    'terc18dp10',
    'Test ERC Token 18 Decimals',
    18,
    '0xc53d2c04795a1cef22a91c9d52c04f5082bb5631',
    UnderlyingAsset.TERC18DP10,
    undefined,
    undefined,
    undefined,
    Networks.test.goerli
  ),
  terc20(
    '942598b2-017a-499a-a67e-768225adcf03',
    'terc18dp11',
    'Test ERC Token 18 Decimals',
    18,
    '0xc325d7f188dc6015f45d3d39e58c5404e79b5cb9',
    UnderlyingAsset.TERC18DP11,
    undefined,
    undefined,
    undefined,
    Networks.test.goerli
  ),
  terc20(
    '627b587f-baaa-4c48-bb26-0df90177abb5',
    'terc18dp12',
    'Test ERC Token 18 Decimals',
    18,
    '0x7a8f375798284920cd27d1c757ceca3675603ab1',
    UnderlyingAsset.TERC18DP12,
    undefined,
    undefined,
    undefined,
    Networks.test.goerli
  ),
  terc20(
    '1986455a-152d-4b3e-a763-033361a57edc',
    'terc18dp13',
    'Test ERC Token 18 Decimals',
    18,
    '0x2e3f4bf47e4ea53a7a94f0597b47fe3caab78b0d',
    UnderlyingAsset.TERC18DP13,
    undefined,
    undefined,
    undefined,
    Networks.test.goerli
  ),
  terc20(
    '5b60d468-219a-4d4d-ad29-847872564636',
    'terc18dp14',
    'Test ERC Token 18 Decimals',
    18,
    '0x4f369aa78b9f299cb50ad4d96e13bdfbd8be7239',
    UnderlyingAsset.TERC18DP14,
    undefined,
    undefined,
    undefined,
    Networks.test.goerli
  ),
  terc20(
    '771c1862-0bef-4ac1-9c4d-8668e3dc0891',
    'terc18dp15',
    'Test ERC Token 18 Decimals',
    18,
    '0x0fcb9bc4c67d502a45a07f514638ca8f83ba2912',
    UnderlyingAsset.TERC18DP15,
    undefined,
    undefined,
    undefined,
    Networks.test.goerli
  ),
  terc20(
    '43dac49b-4b58-44a5-bd22-3c7598698a63',
    'twdoge',
    'Test Wrapped DOGE',
    8,
    '0x9338e875972294cf04b275c17828807d01375085',
    UnderlyingAsset.TWDOGE,
    undefined,
    undefined,
    undefined,
    Networks.test.goerli
  ),
  terc20(
    'b286edf7-ca6f-4431-a6fd-7c0ec9be0b49',
    'tmatic',
    'Test Polygon',
    18,
    '0x499d11e0b6eac7c0593d8fb292dcbbf815fb29ae',
    UnderlyingAsset.TMATIC,
    MATIC_FEATURES,
    undefined,
    undefined,
    Networks.test.goerli
  ),
  terc20(
    '36e702ef-e0af-43f4-bec7-3b922ebd46ac',
    'test',
    'Test Mintable ERC20 Token',
    18,
    '0x1fb879581f31687b905653d4bbcbe3af507bed37',
    UnderlyingAsset.TEST
  ),
  terc20(
    '3afd1592-ffd4-4bee-99e7-2baeda333fdc',
    'tbst',
    'Test BitGo Shield Token',
    0,
    '0xe5cdf77835ca2095881dd0803a77e844c87483cd',
    UnderlyingAsset.BST
  ),
  terc20(
    'b589727c-4993-45e9-afe1-d6ec52cfc1b3',
    'schz',
    'SchnauzerCoin',
    18,
    '0x050e25a2630b2aee94546589fd39785254de112c',
    UnderlyingAsset.SCHZ
  ),
  terc20(
    '5c7e28b8-0154-4400-9e67-3cc0b5f72e0c',
    'tcat',
    'Test CAT-20 Token',
    18,
    '0x63137319f3a14a985eb31547370e0e3bd39b03b8',
    UnderlyingAsset.CAT
  ),
  terc20(
    'e972b57a-bf75-4e1a-9b7f-e90829c5a85f',
    'tfmf',
    'Test Formosa Financial Token',
    18,
    '0xd8463d2f8c5b3be9de95c63b73a0ae4c79423452',
    UnderlyingAsset.FMF
  ),
  terc20(
    'b4dafa0f-f033-4a6f-a949-d9887581b885',
    'terc20',
    'Test ERC20 Token',
    18,
    '0x731a10897d267e19b34503ad902d0a29173ba4b1',
    UnderlyingAsset.TERC20
  ),
  terc20(
    '669f7e23-a952-40cd-9d4b-2d2f4d4723a5',
    'tdai',
    'Test DAI',
    18,
    '0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa',
    UnderlyingAsset.TERC20
  ),
  terc20(
    'e834a04c-a7bf-4c45-916a-dd03ad164afd',
    'trif',
    'Test RIF Token',
    18,
    '0x19f64674d8a5b4e652319f5e239efd3bc969a1fe',
    UnderlyingAsset.RIF
  ),
  terc20(
    '23c7cdff-0a0d-4414-9cda-fb841344f712',
    'tusdc',
    'Goerli USDC',
    6,
    '0x07865c6e87b9f70255377e024ace6630c1eaa37f',
    UnderlyingAsset.TUSDC
  ),
  terc20(
    '891e4428-82b1-4970-8bad-a2cece698066',
    'tusdt',
    'Goerli USDT',
    6,
    '0xc2c527c0cacf457746bd31b2a698fe89de2b6d49',
    UnderlyingAsset.TUSDT
  ),
  terc20(
    '6b43e702-d0ba-44c8-af93-c10cd9c2e730',
    'trlusd',
    'Test Ripple USD',
    18,
    '0xe101fb315a64cda9944e570a7bffafe60b994b1d',
    UnderlyingAsset.RLUSD
  ),
  terc20(
    '34dd36d9-18f9-4c99-b96e-d5c29ae2a4cd',
    'teigen',
    'Test Eigen',
    18,
    '0x3b78576f7d6837500ba3de27a60c7f594934027e',
    UnderlyingAsset.TEIGEN
  ),
  terc20(
    '49fde5ac-1204-4c5c-b62b-cc1363592193',
    'teinu',
    'Test EigenInu',
    18,
    '0xdeeeee2b48c121e6728ed95c860e296177849932',
    UnderlyingAsset.TEINU
  ),
  terc20(
    '031e6052-ed7a-42cf-a6e6-2107d8e448ed',
    'bgerch',
    'Test ERC Token on Holesky',
    18,
    '0xebe8b46a42f05072b723b00013ff822b2af1b5cb',
    UnderlyingAsset.BGERCH,
    undefined,
    undefined,
    undefined,
    Networks.test.holesky
  ),
  tceloToken(
    'a7fb510c-de32-4cd5-9215-4e55c81d5489',
    'tcusd',
    'Test Celo USD Token',
    18,
    '0x874069fa1eb16d44d622f2e0ca25eea172369bc1',
    UnderlyingAsset.CUSD
  ),
  tbscToken(
    'b31aa2b5-8d8c-4ac1-b5e5-0f9d59377eab',
    'tbsc:busd',
    'Test Binance USD Token',
    18,
    '0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee',
    UnderlyingAsset['tbsc:busd'],
    BSC_TOKEN_FEATURES
  ),
  terc721(
    'd92c7b1c-0c54-45cb-9b8a-1326c747bf58',
    'terc721:bsctoken',
    'Generic BSC ERC721',
    '0xterc721:bsctoken',
    GENERIC_TOKEN_FEATURES,
    '',
    '',
    Networks.test.bsc,
    KeyCurve.Secp256k1
  ),
  terc721(
    'f1506cf6-7949-4f2b-b87c-56d3483c7eea',
    'terc1155:bsctoken',
    'Generic BSC ERC1155',
    '0xterc1155:bsctoken',
    GENERIC_TOKEN_FEATURES,
    '',
    '',
    Networks.test.bsc,
    KeyCurve.Secp256k1
  ),
  erc721(
    '0745cd72-9108-4ac0-80db-7c9418d55b79',
    'erc721:witch',
    'Crypto Coven',
    '0x5180db8f5c931aae63c74266b211f580155ecac8'
  ),
  erc721(
    '64dfc2da-97b9-4228-a991-847148bcde5e',
    'erc721:token',
    'Generic ETH ERC721',
    '0xerc721:token',
    GENERIC_TOKEN_FEATURES
  ),
  erc1155(
    'c1f23de0-a0d1-47fd-97da-c5e4df96d2e8',
    'erc1155:token',
    'Generic ETH ERC1155',
    '0xerc1155:token',
    GENERIC_TOKEN_FEATURES
  ),
  nonstandardToken(
    'a24443ec-12a7-4046-9c5d-5a4dccf9d0a5',
    'nonstandard:token',
    'Generic ETH Nonstandard',
    '0xnonstandard:token',
    GENERIC_TOKEN_FEATURES
  ),
  terc721(
    '442628d0-c24b-4ae2-9bf9-48c2c0ab085e',
    'terc721:token',
    'Generic ETH ERC721',
    '0xterc721:token',
    GENERIC_TOKEN_FEATURES
  ),
  terc1155(
    'ff757312-8ad1-442a-b5b9-edcba2849727',
    'terc1155:token',
    'Generic ETH ERC1155',
    '0xterc1155:token',
    GENERIC_TOKEN_FEATURES
  ),
  nonstandardToken(
    'a3399087-9d39-49cb-9fc3-11b49fb10f48',
    'tnonstandard:token',
    'Generic ETH Nonstandard',
    '0xtnonstandard:token',
    GENERIC_TOKEN_FEATURES,
    '',
    '',
    Networks.test.goerli
  ),
  terc721(
    'e795fc78-b8a7-47a1-8294-5ecbe8a74c3a',
    'terc721:bitgoerc721',
    'Test BITGO ERC 721 Token',
    '0x8397b091514c1f7bebb9dea6ac267ea23b570605'
  ),
  terc721(
    'b87c9dfa-2c25-446b-9a30-44c0743dc0e5',
    'terc1155:bitgoerc1155',
    'Test BITGO ERC 1155 Token',
    '0x87cd6a40640befdd96e563b788a6b1fb3e07a186'
  ),
  tofcerc20('055ebe86-72cc-4f0e-b46f-c517d8e3687a', 'ofcterc', 'Test ERC Token', 18, UnderlyingAsset.TERC),
  tofcerc20('ac822eb1-4aa0-40d2-836d-7a24db24d47a', 'ofctest', 'Test Mintable ERC20 Token', 18, UnderlyingAsset.TEST),
  tofcerc20(
    '67b3f68b-a0bd-4bd7-b67e-36e8220bf67e',
    'ofcterc18dp13',
    'Test ERC Token 18 decimals',
    18,
    UnderlyingAsset.TERC18DP13,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    'gteth'
  ),
  tofcerc20(
    '3abd55f9-c3c7-4810-8ff4-bc31a3d0fc69',
    'ofcterc18dp14',
    'Test ERC Token 18 decimals',
    18,
    UnderlyingAsset.TERC18DP14,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    'gteth'
  ),
  tofcerc20(
    'bffc55db-1f40-4e9e-857e-b591ac86d9b3',
    'ofcterc18dp15',
    'Test ERC Token 18 decimals',
    18,
    UnderlyingAsset.TERC18DP15,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    'gteth'
  ),
  tofcerc20(
    '4144a64f-eacd-4df1-a482-72e9c0d976ff',
    'ofchterc18dp',
    'Test ERC Token 18 decimals',
    18,
    UnderlyingAsset.TERC18DP,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    'hteth'
  ),
  tofcerc20(
    'e34cd75e-62dc-4453-a282-577e407bdb95',
    'ofchterc6dp',
    'Test ERC Token 6 decimals',
    6,
    UnderlyingAsset.TERC6DP,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    'hteth'
  ),
  tofcerc20(
    '5f83eaf5-9ba2-4aee-8d6a-b97bf2669edb',
    'ofctusds',
    'Holesky Testnet USD Standard',
    6,
    UnderlyingAsset.TUSDS,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    'hteth'
  ),

  tofcArbethErc20(
    '2489c0e2-c13f-4287-bd1f-03dcd0a8562e',
    'ofctarbeth:link',
    'Arbitrum Test LINK',
    18,
    UnderlyingAsset['tarbeth:link']
  ),
  tstellarToken(
    '47887cb5-98bb-4942-bd25-3ccca0847f36',
    'txlm:BST-GBQTIOS3XGHB7LVYGBKQVJGCZ3R4JL5E4CBSWJ5ALIJUHBKS6263644L',
    'BitGo Shield Token',
    7,
    UnderlyingAsset['txlm:BST-GBQTIOS3XGHB7LVYGBKQVJGCZ3R4JL5E4CBSWJ5ALIJUHBKS6263644L'],
    'bitgo.com',
    AccountCoin.DEFAULT_FEATURES,
    '',
    'BST'
  ),
  tstellarToken(
    '9e1d4f1a-661b-4a51-b647-71f8c1330201',
    'txlm:TST-GBQTIOS3XGHB7LVYGBKQVJGCZ3R4JL5E4CBSWJ5ALIJUHBKS6263644L',
    'BitGo Test Token',
    7,
    UnderlyingAsset['txlm:TST-GBQTIOS3XGHB7LVYGBKQVJGCZ3R4JL5E4CBSWJ5ALIJUHBKS6263644L'],
    'bitgo.com',
    AccountCoin.DEFAULT_FEATURES,
    '',
    'TST'
  ),
  ttronToken(
    '4ece7f15-a5c9-4302-8c82-787d7eb7e3c9',
    'ttrx:wbtc',
    'Test Tron Wrapped Bitcoin',
    8,
    'TGkfUshdbAiNj5G1mynp2meq2BfF6XSGPf',
    UnderlyingAsset.WBTC
  ),
  ttronToken(
    'a3651b75-1781-4521-87a9-30bb8aed5183',
    'ttrx:weth',
    'Test Tron Wrapped Ether',
    18,
    'TCA8tecECSMwjg5jFz1J1V64k9ULZRSx7g',
    UnderlyingAsset.WETH
  ),
  ttronToken(
    'd21a5b8b-c8c2-4635-a2ce-7d37c59da76e',
    'ttrx:usdc',
    'USD Coin',
    6,
    'TSdZwNqpHofzP6BsBKGQUWdBeJphLmF6id',
    UnderlyingAsset.USDC
  ),
  ttronToken(
    '85a60a5a-88e3-45df-9e2c-dc6161b4c6b1',
    'ttrx:usdt',
    'Tether USD',
    6,
    'TG3XXyExBkPp9nzdajDZsozEu4BkaSJozs',
    UnderlyingAsset['ttrx:usdt']
  ),
  talgoToken(
    '0e20b757-3e62-4400-887d-caff117481c8',
    'talgo:USDC-10458941',
    undefined,
    'USDC',
    6,
    UnderlyingAsset['talgo:USDC-10458941'],
    'https://someurl.com/',
    AccountCoin.DEFAULT_FEATURES,
    '',
    'USDC'
  ),
  talgoToken(
    'dd48a295-4f59-4a36-bc40-801998b9ff90',
    'talgo:USDt-180447',
    undefined,
    'Testnet Algorand USDT',
    6,
    UnderlyingAsset['talgo:USDt-180447'],
    'https://someurl.com/',
    AccountCoin.DEFAULT_FEATURES,
    '',
    'USDt'
  ),
  talgoToken(
    '3cfccea1-9946-4de1-abe2-f9ab6411a14b',
    'talgo:USON-16026728',
    undefined,
    'Unison',
    2,
    UnderlyingAsset['talgo:USON-16026728'],
    'https://someurl.com/',
    AccountCoin.DEFAULT_FEATURES,
    '',
    'USON'
  ),
  talgoToken(
    '02f2ed81-83ba-4c6c-931e-2ce1aacfd57f',
    'talgo:SPRW-16026732',
    undefined,
    'Sparrow',
    4,
    UnderlyingAsset['talgo:SPRW-16026732'],
    'https://someurl.sparrow.com/',
    AccountCoin.DEFAULT_FEATURES,
    '',
    'SPRW'
  ),
  talgoToken(
    '0c642b43-157a-475b-b6dc-d20ae76c71fc',
    'talgo:KAL-16026733',
    undefined,
    'Kalki',
    8,
    UnderlyingAsset['talgo:KAL-16026733'],
    'https://someurl.kalki.com/',
    AccountCoin.DEFAULT_FEATURES,
    '',
    'KAL'
  ),
  talgoToken(
    '857994b1-3198-4649-a7a0-724a8620eb67',
    'talgo:JPT-162085446',
    undefined,
    'JPT',
    6,
    UnderlyingAsset['talgo:JPT-162085446'],
    'https://www.cav3.sg',
    AccountCoin.DEFAULT_FEATURES,
    '',
    'JPT'
  ),
  eosToken(
    'c6e34428-3c32-4db6-b51e-7edee3bb0b1e',
    'eos:CHEX',
    'Chintai',
    8,
    'chexchexchex',
    UnderlyingAsset.CHEX,
    AccountCoin.DEFAULT_FEATURES,
    '',
    'CHEX'
  ),
  eosToken(
    '76a1517e-ec5d-4467-84bf-7a6f15bb0348',
    'eos:IQ',
    'Everipedia',
    3,
    'everipediaiq',
    UnderlyingAsset.IQ,
    AccountCoin.DEFAULT_FEATURES,
    '',
    'IQ'
  ),
  eosToken(
    'dcf97761-3e4c-430f-b618-c6f16baf5d0f',
    'eos:BOX',
    'Box',
    6,
    'token.defi',
    UnderlyingAsset.EOS_BOX,
    AccountCoin.DEFAULT_FEATURES,
    '',
    'BOX'
  ),
  eosToken(
    'b91390e4-f297-4d03-8bc8-5703184419dc',
    'eos:USDT',
    'EOS USDT',
    4,
    'tethertether',
    UnderlyingAsset.USDT,
    AccountCoin.DEFAULT_FEATURES,
    '',
    'USDT'
  ),
  teosToken(
    '1c627bb5-4bee-4ab0-8bb6-3d535e17a769',
    'teos:CHEX',
    'Chintai',
    8,
    'testtoken113',
    UnderlyingAsset.CHEX,
    AccountCoin.DEFAULT_FEATURES,
    '',
    'CHEX'
  ),
  teosToken(
    '63837b29-db2e-4d09-b51b-ba93681fc9fe',
    'teos:IQ',
    'Everipedia',
    3,
    'testtoken112',
    UnderlyingAsset.IQ,
    AccountCoin.DEFAULT_FEATURES,
    '',
    'IQ'
  ),
  teosToken(
    'cae14351-7797-4704-aa84-70ae0e414d72',
    'teos:BOX',
    'Box',
    6,
    'kvszn1xyz1bu',
    UnderlyingAsset.EOS_BOX,
    AccountCoin.DEFAULT_FEATURES,
    '',
    'BOX'
  ),
  teosToken(
    '7c420890-c271-49ef-b3a3-73893bffcc55',
    'teos:USDT',
    'Testnet EOS USDT',
    4,
    'lionteste212',
    UnderlyingAsset.USDT,
    AccountCoin.DEFAULT_FEATURES,
    '',
    'USDT'
  ),
  avaxErc20(
    '820d451a-3c7f-43fb-a872-9e323468c922',
    'avaxc:qi',
    'BenQi',
    18,
    '0x8729438eb15e2c8b576fcc6aecda6a148776c0f5',
    UnderlyingAsset['avaxc:qi']
  ),
  avaxErc20(
    'c936292f-f406-4a07-a86b-786cfb4ee629',
    'avaxc:xava',
    'Avalaunch',
    18,
    '0xd1c3f94de7e5b45fa4edbba472491a9f4b166fc4',
    UnderlyingAsset['avaxc:xava']
  ),
  avaxErc20(
    '676a9548-62ac-4206-934f-850e906f47bb',
    'avaxc:klo',
    'Kalao',
    18,
    '0xb27c8941a7df8958a1778c0259f76d1f8b711c35',
    UnderlyingAsset['avaxc:klo']
  ),
  avaxErc20(
    '71422716-3d7c-4211-ac0b-ef403db2c53b',
    'avaxc:joe',
    'Trader Joe',
    18,
    '0x6e84a6216ea6dacc71ee8e6b0a5b7322eebc0fdd',
    UnderlyingAsset['avaxc:joe']
  ),
  avaxErc20(
    'd0b1c811-6fb5-4628-b039-d7f1b1dd3fad',
    'avaxc:png',
    'Pangolin',
    18,
    '0x60781c2586d68229fde47564546784ab3faca982',
    UnderlyingAsset['avaxc:png']
  ),
  avaxErc20(
    'bb5da97c-69a6-4c96-95cf-86f09c27da9e',
    'avaxc:link',
    'Chainlink',
    18,
    '0x5947bb275c521040051d82396192181b413227a3',
    UnderlyingAsset['avaxc:link']
  ),
  avaxErc20(
    '47f2bdf9-05c8-4284-aa84-95dec73541f8',
    'avaxc:cai',
    'Colony Avalanche Index',
    18,
    '0x48f88a3fe843ccb0b5003e70b4192c1d7448bef0',
    UnderlyingAsset['avaxc:cai']
  ),
  avaxErc20(
    '55d38f23-ed66-43b8-838c-e9df316c0140',
    'avaxc:tryb',
    'BiLira',
    6,
    '0x564a341df6c126f90cf3ecb92120fd7190acb401',
    UnderlyingAsset['avaxc:tryb']
  ),
  avaxErc20(
    '9db702af-2414-4926-a185-c9738e6a6d4b',
    'avaxc:usdt',
    'Tether USD',
    6,
    '0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7',
    UnderlyingAsset['avaxc:usdt']
  ),
  avaxErc20(
    '185c4019-56fa-4911-adc8-6811563431ed',
    'avaxc:usdc',
    'USD Coin',
    6,
    '0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e',
    UnderlyingAsset['avaxc:usdc']
  ),
  avaxErc20(
    '7c0a3d09-82b4-4da0-9bc2-32c6de527b11',
    'avaxc:usdc-e',
    'USD Coin',
    6,
    '0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664',
    UnderlyingAsset['avaxc:usdc']
  ),
  avaxErc20(
    'd9a021b1-a94a-495c-84c3-061d97c98748',
    'avaxc:dai-e',
    'Dai Stablecoin',
    18,
    '0xd586e7f844cea2f87f50152665bcbc2c279d8d70',
    UnderlyingAsset['avaxc:dai']
  ),
  avaxErc20(
    'e6f2a1fd-4cb9-4eae-9278-434b334bdc09',
    'avaxc:usdt-e',
    'Tether USD',
    6,
    '0xc7198437980c041c805a1edcba50c1ce5db95118',
    UnderlyingAsset['avaxc:usdt']
  ),
  avaxErc20(
    '4a58ecf3-c505-4735-bf38-ce5f6e11fda6',
    'avaxc:wbtc-e',
    'Wrapped BTC',
    8,
    '0x50b7545627a5162f82a992c33b87adc75187b218',
    UnderlyingAsset['avaxc:wbtc']
  ),
  avaxErc20(
    '63f459fe-fa8c-412b-a8b8-2b2924690b77',
    'avaxc:weth-e',
    'Wrapped ETH',
    18,
    '0x49d5c2bdffac6ce2bfdb6640f4f80f226bc10bab',
    UnderlyingAsset['avaxc:weth']
  ),
  avaxErc20(
    'ada544e1-82ca-402c-8bac-b20321e62f15',
    'avaxc:sbc',
    'Stable Coin',
    18,
    '0xf9fb20b8e097904f0ab7d12e9dbee88f2dcd0f16',
    UnderlyingAsset['avaxc:sbc']
  ),
  avaxErc20(
    '68f70a2d-cfbf-4ba6-a92e-bdd6eaf4663f',
    'avaxc:xsgd',
    'XSGD',
    6,
    '0xb2f85b7ab3c2b6f62df06de6ae7d09c010a5096e',
    UnderlyingAsset['avaxc:xsgd']
  ),
  avaxErc20(
    'dc358736-07c0-4d72-a1cb-51710b4169b1',
    'avaxc:aave-e',
    'Aave',
    18,
    '0x63a72806098bd3d9520cc43356dd78afe5d386d9',
    UnderlyingAsset['avaxc:aave']
  ),
  avaxErc20(
    '46ba9a0f-a4ac-4678-8533-3c7c95e3f0eb',
    'avaxc:usdc-wormhole',
    'USD Coin (Wormhole)',
    6,
    '0x543672e9cbec728cbba9c3ccd99ed80ac3607fa8',
    UnderlyingAsset['avaxc:usdc']
  ),
  avaxErc20(
    '6e92ac8e-a2c8-49f3-8096-b630516bec5d',
    'avaxc:btc-b',
    'Bitcoin',
    8,
    '0x152b9d0fdc40c096757f570a51e494bd4b943e50',
    UnderlyingAsset['avaxc:btc']
  ),
  // Begin FTX missing AVAXC tokens
  avaxErc20(
    'c98de371-69a7-4f06-9a6e-810f0fc2b0bc',
    'avaxc:yeti',
    'Yeti Finance',
    18,
    '0x77777777777d4554c39223c354a05825b2e8faa3',
    UnderlyingAsset['avaxc:yeti']
  ),
  avaxErc20(
    '0e477e9c-cb81-4988-9f15-a8b5f186932a',
    'avaxc:spell',
    'Spell Token',
    18,
    '0xce1bffbd5374dac86a2893119683f4911a2f7814',
    UnderlyingAsset['avaxc:spell']
  ),
  avaxErc20(
    '35a0282a-a6f2-4df5-95ad-13e1316441ae',
    'avaxc:yusd',
    'YUSD Stablecoin',
    18,
    '0x111111111111ed1d73f860f57b2798b683f2d325',
    UnderlyingAsset['avaxc:yusd']
  ),
  avaxErc20(
    '005cae58-7917-4288-bf24-60752d193dbc',
    'avaxc:yusdcrv-f',
    'Curve.fi Factory Plain Pool: YUSD Pool',
    18,
    '0x1da20ac34187b2d9c74f729b85acb225d3341b25',
    UnderlyingAsset['avaxc:yusdcrv-f']
  ),
  avaxErc20(
    'a16665e2-cb8a-4dcf-876a-a82e8d0a187c',
    'avaxc:ecd',
    'Echidna Token',
    18,
    '0xeb8343d5284caec921f035207ca94db6baaacbcd',
    UnderlyingAsset['avaxc:ecd']
  ),
  avaxErc20(
    '0215b081-25e5-448e-9342-7062788444e0',
    'avaxc:blzz',
    'Blizz.Finance Protocol Token',
    18,
    '0x0f34919404a290e71fc6a510cb4a6acb8d764b24',
    UnderlyingAsset['avaxc:blzz']
  ),
  avaxErc20(
    '35086a56-2e3c-4c2f-9a23-030fdea50e8e',
    'avaxc:ptp',
    'Platypus',
    18,
    '0x22d4002028f537599be9f666d1c4fa138522f9c8',
    UnderlyingAsset['avaxc:ptp']
  ),
  avaxErc20(
    'e7e20c80-c9a6-4d37-9a2b-a74c25175400',
    'avaxc:stg',
    'StargateToken',
    18,
    '0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590',
    UnderlyingAsset['avaxc:stg']
  ),
  avaxErc20(
    '6961f221-fb50-43e0-8f6f-83c195ac76a8',
    'avaxc:syn',
    'Synapse',
    18,
    '0x1f1e7c893855525b303f99bdf5c3c05be09ca251',
    UnderlyingAsset['avaxc:syn']
  ),
  avaxErc20(
    '6b1069a0-3c59-44a8-92bd-20a60b378ecb',
    'avaxc:aavausdc',
    'Aave Avalanche USDC',
    6,
    '0x625e7708f30ca75bfd92586e17077590c60eb4cd',
    UnderlyingAsset['avaxc:aavausdc']
  ),
  avaxErc20(
    'c6fd3419-164b-46a5-be0b-50f28f8c2c81',
    'avaxc:tusd',
    'TrueUSD',
    18,
    '0x1c20e891bab6b1727d14da358fae2984ed9b59eb',
    UnderlyingAsset['avaxc:tusd']
  ),
  avaxErc20(
    '4b2f8744-bbcd-4b18-ae84-52ef0647d09c',
    'avaxc:crv',
    'Curve DAO Token',
    18,
    '0x47536f17f4ff30e64a96a7555826b8f9e66ec468',
    UnderlyingAsset['avaxc:crv']
  ),
  avaxErc20(
    '01df2d4c-1a57-4f85-b433-08da50c95459',
    'avaxc:savax',
    'Staked AVAX',
    18,
    '0x2b2c81e08f1af8835a78bb2a90ae924ace0ea4be',
    UnderlyingAsset['avaxc:savax']
  ),
  avaxErc20(
    '772a2498-2bef-4da8-9bce-f1a89e6f4536',
    'avaxc:ampl',
    'Ampleforth',
    9,
    '0x027dbca046ca156de9622cd1e2d907d375e53aa7',
    UnderlyingAsset['avaxc:ampl']
  ),
  avaxErc20(
    '23543dad-ad98-402e-aaef-771107530e83',
    'avaxc:cnr',
    'Canary',
    18,
    '0x8d88e48465f30acfb8dac0b3e35c9d6d7d36abaf',
    UnderlyingAsset['avaxc:cnr']
  ),
  avaxErc20(
    '164675a1-3491-49c2-bea6-b48a5f2bf950',
    'avaxc:roco',
    'ROCO',
    18,
    '0xb2a85c5ecea99187a977ac34303b80acbddfa208',
    UnderlyingAsset['avaxc:roco']
  ),
  avaxErc20(
    'ab398e68-929a-481a-bc72-a66f64cd876c',
    'avaxc:aavadai',
    'Aave Avalanche DAI',
    18,
    '0x82e64f49ed5ec1bc6e43dad4fc8af9bb3a2312ee',
    UnderlyingAsset['avaxc:aavadai']
  ),
  avaxErc20(
    '2733a66b-467d-4705-b806-afc9a58789ed',
    'avaxc:vtx',
    'Vector',
    18,
    '0x5817d4f0b62a59b17f75207da1848c2ce75e7af4',
    UnderlyingAsset['avaxc:vtx']
  ),
  avaxErc20(
    '6d8f8043-93ab-4b8e-993b-9b3c6e1517d9',
    'avaxc:wavax',
    'Wrapped AVAX',
    18,
    '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7',
    UnderlyingAsset['avaxc:wavax']
  ),
  avaxErc20(
    'd5eec690-2a9b-4aa1-8920-978eedd32563',
    'avaxc:bnb',
    'Binance',
    18,
    '0x264c1383ea520f73dd837f915ef3a732e204a493',
    UnderlyingAsset['avaxc:bnb']
  ),
  avaxErc20(
    'bd553722-fe3a-4406-83d9-0771859f4783',
    'avaxc:aavausdt',
    'Aave Avalanche USDT',
    18,
    '0x6ab707aca953edaefbc4fd23ba73294241490620',
    UnderlyingAsset['avaxc:aavausdt']
  ),
  avaxErc20(
    'ffec10f0-09c7-4068-a623-b95d95eb6058',
    'avaxc:acre',
    'Arable Protocol',
    18,
    '0x00ee200df31b869a321b10400da10b561f3ee60d',
    UnderlyingAsset['avaxc:acre']
  ),
  avaxErc20(
    '0711ef11-528a-4631-bddb-edc6e3f4829f',
    'avaxc:gmx',
    'GMX',
    18,
    '0x62edc0692bd897d2295872a9ffcac5425011c661',
    UnderlyingAsset['avaxc:gmx']
  ),
  avaxErc20(
    '70ffcddf-1332-4df1-a6de-480108f59e4e',
    'avaxc:mim',
    'Magic Internet Money',
    18,
    '0x130966628846bfd36ff31a822705796e8cb8c18d',
    UnderlyingAsset['avaxc:mim']
  ),
  avaxErc20(
    '757ffc62-09e7-4c59-9b8f-05b1d5806967',
    'avaxc:axlusdc',
    'Axelar Wrapped USDC',
    6,
    '0xfab550568c688d5d8a52c7d794cb93edc26ec0ec',
    UnderlyingAsset['avaxc:axlusdc']
  ),
  avaxErc20(
    '5b2f8e28-bc54-432f-88a4-6de845624cc5',
    'avaxc:lot',
    'lotteryhost.com',
    18,
    '0x1bf5e2e1b8b251d109e63b14c985eefb39d61397',
    UnderlyingAsset['avaxc:lot']
  ),
  avaxErc20(
    '31bc3f04-2be0-4298-a960-22e0c5e9d0be',
    'avaxc:av3crv',
    'Curve.fi avDAI/avUSDC/avUSDT',
    18,
    '0x1337bedc9d22ecbe766df105c9623922a27963ec',
    UnderlyingAsset['avaxc:av3crv']
  ),
  avaxErc20(
    'e2d06963-bea2-4836-9425-6a1df1c03bb6',
    'avaxc:time',
    'Time',
    9,
    '0xb54f16fb19478766a268f172c9480f8da1a7c9c3',
    UnderlyingAsset['avaxc:time']
  ),
  avaxErc20(
    '9a74b51e-62fd-4001-a132-0e0b9f782042',
    'avaxc:unie',
    'Uniswap',
    18,
    '0x8ebaf22b6f053dffeaf46f4dd9efa95d89ba8580',
    UnderlyingAsset['avaxc:uni.e']
  ),
  avaxErc20(
    '506cdbc3-b042-462f-8334-d4fba5ddaff0',
    'avaxc:sb',
    'Snowbank',
    9,
    '0x7d1232b90d3f809a54eeaeebc639c62df8a8942f',
    UnderlyingAsset['avaxc:sb']
  ),
  avaxErc20(
    '85b2dcb2-e794-48e8-9dd2-952625ef2380',
    'avaxc:dyp',
    'DeFiYieldProtocol',
    18,
    '0x961c8c0b1aad0c0b10a51fef6a867e3091bcef17',
    UnderlyingAsset['avaxc:dyp']
  ),
  avaxErc20(
    '3da7316f-6da2-4a05-835b-41f688127ad6',
    'avaxc:sing',
    'Sing Token',
    18,
    '0xf9a075c9647e91410bf6c402bdf166e1540f67f0',
    UnderlyingAsset['avaxc:sing']
  ),
  avaxErc20(
    'ba25033d-458d-4ed7-b27e-c21dbe9f2372',
    'avaxc:gohm',
    'Governance OHM',
    18,
    '0x321e7092a180bb43555132ec53aaa65a5bf84251',
    UnderlyingAsset['avaxc:gohm']
  ),
  avaxErc20(
    '2351f940-4826-4ac3-9e30-7a88e8941e64',
    'avaxc:boofi',
    'Boo Finance Token',
    18,
    '0xb00f1ad977a949a3ccc389ca1d1282a2946963b0',
    UnderlyingAsset['avaxc:boofi']
  ),
  avaxErc20(
    'f1039fca-eff4-47c8-aece-f7ae8ec80f2c',
    'avaxc:eth',
    'Ether',
    18,
    '0xf20d962a6c8f70c731bd838a3a388d7d48fa6e15',
    UnderlyingAsset['avaxc:eth']
  ),
  avaxErc20(
    '81fbf4db-46e3-4dc2-96dc-7deb252ea067',
    'avaxc:wmemo',
    'Wrapped MEMO',
    18,
    '0x0da67235dd5787d67955420c84ca1cecd4e5bb3b',
    UnderlyingAsset['avaxc:wmemo']
  ),
  avaxErc20(
    '99234be8-1005-4520-a8af-f157ab4e4717',
    'avaxc:fxs',
    'Frax Share',
    18,
    '0x214db107654ff987ad859f34125307783fc8e387',
    UnderlyingAsset['avaxc:fxs']
  ),
  avaxErc20(
    '158e619a-7a1d-4ffa-b448-2801256b1c67',
    'avaxc:sifu',
    'Sifu',
    18,
    '0x237917e8a998b37759c8ee2faa529d60c66c2927',
    UnderlyingAsset['avaxc:sifu']
  ),
  avaxErc20(
    '3661bed5-b7b2-4744-8b56-5d2d45ccdcaf',
    'avaxc:sushie',
    'Sushi Token',
    18,
    '0x37b608519f91f70f2eeb0e5ed9af4061722e4f76',
    UnderlyingAsset['avaxc:sushi.e']
  ),
  avaxErc20(
    '0fa1ba07-0873-4e2a-a9ea-78d5188d516e',
    'avaxc:sushi',
    'SushiToken',
    18,
    '0x39cf1bd5f15fb22ec3d9ff86b0727afc203427cc',
    UnderlyingAsset['avaxc:sushi']
  ),
  avaxErc20(
    '1a4dcb06-3376-42ba-a6f3-6536992e16c8',
    'avaxc:mimatic',
    'MAI',
    18,
    '0x3b55e45fd6bd7d4724f5c47e0d1bcaedd059263e',
    UnderlyingAsset['avaxc:mimatic']
  ),
  avaxErc20(
    '506aacb0-b69c-4101-89fa-575b5833c6de',
    'avaxc:sspell',
    'Staked Spell Tokens',
    18,
    '0x3ee97d514bbef95a2f110e6b9b73824719030f7a',
    UnderlyingAsset['avaxc:sspell']
  ),
  avaxErc20(
    '78a5ea63-96e1-4487-9af4-0af3b60555e8',
    'avaxc:grape',
    'Grape Finance',
    18,
    '0x5541d83efad1f281571b343977648b75d95cdac2',
    UnderlyingAsset['avaxc:grape']
  ),
  avaxErc20(
    'edd3197d-5973-42c9-a4f5-acb2ff443bb2',
    'avaxc:xjoe',
    'JoeBar',
    18,
    '0x57319d41f71e81f3c65f2a47ca4e001ebafd4f33',
    UnderlyingAsset['avaxc:xjoe']
  ),
  avaxErc20(
    '780869be-0012-4695-b039-f64ea492ae22',
    'avaxc:bsgg',
    'Betswap.gg',
    18,
    '0x49f519002eeced6902f24c0be72b6d898e4d27fc',
    UnderlyingAsset['avaxc:bsgg']
  ),
  avaxErc20(
    'e6bd6935-daac-4edc-8cfb-f8305ebbdb11',
    'avaxc:roy',
    'Royale',
    18,
    '0x68ee0d0aad9e1984af85ca224117e4d20eaf68be',
    UnderlyingAsset['avaxc:roy']
  ),
  avaxErc20(
    '37402491-b25e-4627-a730-3f6934303479',
    'avaxc:wow',
    'WOWSwap',
    18,
    '0xa384bc7cdc0a93e686da9e7b8c0807cd040f4e0b',
    UnderlyingAsset['avaxc:wow']
  ),
  avaxErc20(
    '849853db-237d-49d5-a114-adb659063482',
    'avaxc:wine',
    'Wine Shares',
    18,
    '0xc55036b5348cfb45a932481744645985010d3a44',
    UnderlyingAsset['avaxc:wine']
  ),
  avaxErc20(
    '61e82a8e-16b2-4b37-87b5-5ad80dd2fc7d',
    'avaxc:mu',
    'Mu Coin',
    18,
    '0xd036414fa2bcbb802691491e323bff1348c5f4ba',
    UnderlyingAsset['avaxc:mu']
  ),
  avaxErc20(
    'c600743e-1c9e-45a9-b94b-037d31299b33',
    'avaxc:frax',
    'Frax',
    18,
    '0xd24c2ad096400b6fbcd2ad8b24e7acbc21a1da64',
    UnderlyingAsset['avaxc:frax']
  ),
  avaxErc20(
    '721cf9d5-6c4a-4aa0-b925-7e63628c4cbf',
    'avaxc:movr',
    'Moonriver Token',
    18,
    '0xf873633df9d5cdd62bb1f402499cc470a72a02d7',
    UnderlyingAsset['avaxc:movr']
  ),
  avaxErc20(
    'b4b20d22-46c1-464c-8d33-596fc4e0ebf3',
    'avaxc:ice',
    'IceToken',
    18,
    '0xe0ce60af0850bf54072635e66e79df17082a1109',
    UnderlyingAsset['avaxc:ice']
  ),
  avaxErc20(
    '4c5958cd-7f59-4b1e-9f64-c04fd6fe24d0',
    'avaxc:note',
    'Republic Note',
    8,
    '0x7c6a937943f135283a2561938de2200994a8f7a7',
    UnderlyingAsset['avaxc:note'],
    AccountCoin.DEFAULT_FEATURES_EXCLUDE_SINGAPORE
  ),
  avaxErc20(
    '929c8d8c-fff3-4702-9dc1-477c70400024',
    'avaxc:wrose',
    'Wrapped ROSE',
    18,
    '0x12af5c1a232675f62f405b5812a80e7a6f75d746',
    UnderlyingAsset['avaxc:wrose']
  ),
  avaxErc20(
    '2511b910-85fb-4660-a8a5-bb137b237054',
    'avaxc:swap',
    'TrustSwap Token',
    18,
    '0xc7b5d72c836e718cda8888eaf03707faef675079',
    UnderlyingAsset['avaxc:swap']
  ),
  avaxErc20(
    'd4e4244e-505c-428b-b3a9-c039f3286a9a',
    'avaxc:tico',
    'Funtico',
    18,
    '0xba69b8aff564fe150ff7e2f965e0dba23b9d2571',
    UnderlyingAsset['avaxc:tico']
  ),
  // End FTX missing AVAXC tokens
  tavaxErc20(
    'cd107316-6e78-4936-946f-70e8fd5d8040',
    'tavaxc:link',
    'Test Chainlink',
    18,
    '0x0b9d5d9136855f6fec3c0993fee6e9ce8a297846',
    UnderlyingAsset['avaxc:link']
  ),
  tavaxErc20(
    'b44ff1b9-b4a8-4bd4-aa56-a663f3ee569e',
    'tavaxc:opm',
    'Test OPMETANA',
    18,
    '0x9a25414c8a41599cb7048f2e4dd42db02c1de487',
    UnderlyingAsset['tavaxc:opm']
  ),
  tavaxErc20(
    'ce7eaf39-b9ea-4a37-8926-b915e831397d',
    'tavaxc:cop2peq',
    'COP Priv Eq02',
    18,
    '0xbd3bd9b0c96be74e006333df6d1b5d9333ae1d43',
    UnderlyingAsset['tavaxc:cop2peq']
  ),
  tavaxErc20(
    '773b63cd-c7fc-4a58-befc-99db997d858c',
    'tavaxc:xsgd',
    'XSGD',
    6,
    '0xd769410dc8772695a7f55a304d2125320a65c2a5',
    UnderlyingAsset['tavaxc:xsgd']
  ),
  tavaxErc20(
    '463e36b1-8f92-40a3-9cb3-bd0aa7df8408',
    'tavaxc:bitgo',
    'BitGo',
    8,
    '0x3ad5f9119ca063189095784b9a7d2bf80fc24de6',
    UnderlyingAsset['tavaxc:bitgo']
  ),
  solToken(
    'cf5040dc-ff15-4be5-97a0-78c53d58e111',
    'sol:spx',
    'SPX6900',
    8,
    'J3NKxxXZcnNiMjKw9hYb2K4LUxgwB6t1FtPtQVsv3KFr', // https://solscan.io/token/J3NKxxXZcnNiMjKw9hYb2K4LUxgwB6t1FtPtQVsv3KFr
    UnderlyingAsset['sol:spx'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '53e6b4e7-6ff6-40d5-8737-af2b31fa0bc0',
    'sol:turbo',
    'Serum',
    8,
    '2Dyzu65QA9zdX1UeE7Gx71k7fiwyUK6sZdrvJ7auq5wm', // https://solscan.io/token/2Dyzu65QA9zdX1UeE7Gx71k7fiwyUK6sZdrvJ7auq5wm
    UnderlyingAsset['sol:turbo'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '45d95e60-81df-4c5d-9ceb-e6e4f5b75eeb',
    'sol:bome',
    'Book Of Meme',
    6,
    'ukHH6c7mMyiWCf1b9pnWe25TSpkDDt3H5pQZgZ74J82', // https://explorer.solana.com/address/ukHH6c7mMyiWCf1b9pnWe25TSpkDDt3H5pQZgZ74J82
    UnderlyingAsset['sol:bome'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'acc2b136-c21e-46b6-aecf-69fd3c8281db',
    'sol:srm',
    'Serum',
    6,
    'SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt', // https://explorer.solana.com/address/SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt
    UnderlyingAsset['sol:srm'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '162c00d8-4262-4a89-b85d-8d938435397e',
    'sol:usdc',
    'USD Coin',
    6,
    'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', // https://explorer.solana.com/address/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v
    UnderlyingAsset['sol:usdc'],
    SOL_TOKEN_FEATURES_WITH_FRANKFURT
  ),
  solToken(
    '2a41c38d-c79a-4734-ae3a-c60e4d1f2d99',
    'sol:wsol',
    'Wrapped SOL',
    9,
    'So11111111111111111111111111111111111111112', // https://explorer.solana.com/address/So11111111111111111111111111111111111111112
    UnderlyingAsset['sol:wsol'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'bb2fca37-c185-490a-8a27-09829c9f699a',
    'sol:ray',
    'Raydium',
    6,
    '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R', // https://explorer.solana.com/address/4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R
    UnderlyingAsset['sol:ray'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'fe85e2b5-1b32-444d-b16e-85b9b1814349',
    'sol:gmt',
    'GMT',
    9,
    '7i5KKsX2weiTkry7jA4ZwSuXGhs5eJBEjY8vVxR4pfRx', // https://explorer.solana.com/address/7i5KKsX2weiTkry7jA4ZwSuXGhs5eJBEjY8vVxR4pfRx
    UnderlyingAsset['sol:gmt'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '1991afb1-84d5-453a-bbc3-e11115389c51',
    'sol:usdt',
    'USD Tether',
    6,
    'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB', // https://explorer.solana.com/address/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB
    UnderlyingAsset['sol:usdt'],
    SOL_TOKEN_FEATURES_WITH_FRANKFURT
  ),
  solToken(
    '4d631f91-02e2-4b89-af01-7b42cb61b1bb',
    'sol:gari',
    'GARI',
    9,
    'CKaKtYvz6dKPyMvYq9Rh3UBrnNqYZAyd7iF4hJtjUvks', // https://explorer.solana.com/address/CKaKtYvz6dKPyMvYq9Rh3UBrnNqYZAyd7iF4hJtjUvks
    UnderlyingAsset['sol:gari'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '4209203a-ddd8-4dea-ae98-529924a63853',
    'sol:orca',
    'ORCA',
    6,
    'orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE', // https://explorer.solana.com/address/orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE
    UnderlyingAsset['sol:orca'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '39022e21-d617-40d8-bf35-0a8a73a55a83',
    'sol:slnd',
    'SOLEND',
    6,
    'SLNDpmoWTVADgEdndyvWzroNL7zSi1dF9PC3xHGtPwp', // https://explorer.solana.com/address/SLNDpmoWTVADgEdndyvWzroNL7zSi1dF9PC3xHGtPwp
    UnderlyingAsset['sol:slnd'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '3aa70291-042d-4aeb-9f8e-f799bd327571',
    'sol:akro-wormhole',
    'Akropolis (Wormhole)',
    8,
    '12uHjozDVgyGWeLqQ8DMCRbig8amW5VmvZu3FdMMdcaG',
    UnderlyingAsset.AKRO,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'fcc057c1-2cee-444b-8684-a511d472fac9',
    'sol:aleph-wormhole',
    'Aleph.im v2 (Wormhole)',
    8,
    '3UCMiSnkcnkPE1pgQ5ggPCBv6dXgVUy16TmMUe1WpG9x',
    UnderlyingAsset.ALEPH,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '11a4f5ac-f812-4085-967e-6c3faa95354c',
    'sol:atlas',
    'Star Atlas',
    8,
    'ATLASXmbPQxBUYbxPsV97usA3fPQYEqzQBUHgiFCUsXx',
    UnderlyingAsset['sol:atlas'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'b08f3838-1784-43dc-a6d3-e92cc3424a4f',
    'sol:brz',
    'BRZ',
    4,
    'FtgGSFADXBtroxq8VCausXRr2of47QBf5AS1NtZCu4GD',
    UnderlyingAsset.BRZ,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '6b734108-6349-43cd-a84e-8af858f267b5',
    'sol:c98',
    'Coin98',
    6,
    'C98A4nkJXhpVZNAZdHUA95RpTF3T4whtQubL3YobiUX9',
    UnderlyingAsset.C98,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'de1c59e5-54fd-4f12-b313-12d032528313',
    'sol:cope',
    'COPE',
    6,
    '8HGyAAB1yoM1ttS7pXjHMa3dukTFGQggnFFH3hJZgzQh',
    UnderlyingAsset.COPE,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '116c9895-8591-4492-82e9-f3c019a86381',
    'sol:cream-wormhole',
    'Cream (Wormhole)',
    8,
    'HihxL2iM6L6P1oqoSeiixdJ3PhPYNxvSKH9A2dDqLVDH',
    UnderlyingAsset.CREAM,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '4536ba09-3d64-40fd-a7f8-68336933dec6',
    'sol:dfl',
    'DeFi Land',
    9,
    'DFL1zNkaGPWm1BqAVqRjCZvHmwTFrEaJtbzJWgseoNJh',
    UnderlyingAsset.DFL,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'c5a4794c-96c9-4ace-a697-c096cd0f750f',
    'sol:fida',
    'Bonfida',
    6,
    'EchesyfXePKdLtoiZSL8pBe8Myagyy8ZRqsACNCFGnvp',
    UnderlyingAsset.FIDA,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'db871834-607b-46d7-94f8-bceddc1a764c',
    'sol:front-wormhole',
    'Frontier Token (Wormhole)',
    8,
    'A9ik2NrpKRRG2snyTjofZQcTuav9yH3mNVHLsLiDQmYt',
    UnderlyingAsset.FRONT,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'e155a1f4-b2f6-4cd5-805d-c39673ab82d7',
    'sol:ftt-wormhole',
    'FTT (Wormhole)',
    8,
    'EzfgjvkSwthhgHaceR3LnKXUoRkP6NUhfghdaHAj1tUv',
    UnderlyingAsset.FTT,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'bb248d80-4233-4c02-8a23-5a09fb9b986c',
    'sol:gene',
    'Genopets',
    9,
    'GENEtH5amGSi8kHAtQoezp1XEXwZJ8vcuePYnXdKrMYz',
    UnderlyingAsset.GENE,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '24387832-c37b-467a-9509-a2a919eac02e',
    'sol:gst',
    'GST',
    9,
    'AFbX8oGjGpmVFywbVouvhQSRmiW2aR1mohfahi4Y2AdB',
    UnderlyingAsset.GST,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'c5d1df84-1a5f-4e97-9845-a503f03a6db3',
    'sol:hbb',
    'Hubble Protocol Token',
    6,
    'HBB111SCo9jkCejsZfz8Ec8nH7T6THF8KEKSnvwT6XK6',
    UnderlyingAsset.HBB,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '36bfbc81-cffa-435c-a769-672cecf7c665',
    'sol:holy',
    'HOLY',
    6,
    '3GECTP7H4Tww3w8jEPJCJtXUtXxiZty31S9szs84CcwQ',
    UnderlyingAsset.HOLY,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '767b8047-1aae-44cb-9079-20e159888b10',
    'sol:hxro-wormhole',
    'Hxro (Wormhole)',
    8,
    'HxhWkVpk5NS4Ltg5nij2G671CKXFRKPK8vy271Ub4uEK',
    UnderlyingAsset.HXRO,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '0474546e-e7c5-4794-8ee8-f7ec7e2be72d',
    'sol:kin',
    'Kin',
    5,
    'kinXdEcpDQeHPEuQnqmUgtYykqKGVFq6CeVX5iAHJq6',
    UnderlyingAsset['sol:kin'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '4521e670-d0ac-441f-8b7c-cc54fe7bebe0',
    'sol:like',
    'Only1',
    9,
    '3bRTivrVsitbmCTGtqwp7hxXPsybkjn4XLNtPsHqa3zR',
    UnderlyingAsset.LIKE,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '5109c4c8-b64f-4375-81e2-50ca7279405d',
    'sol:link-wormhole',
    'Chainlink (Wormhole)',
    8,
    '2wpTofQ8SkACrkZWrZDjXPitYa8AwWgX8AfxdeBRRVLX',
    UnderlyingAsset.LINK,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '9e5bf597-fa7a-4cbf-9d16-5e8c5b0494c6',
    'sol:maps',
    'MAPS',
    6,
    'MAPS41MDahZ9QdKXhVa4dWB9RuyfV4XqhyAZ8XcYepb',
    UnderlyingAsset.MAPS,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '07b7845b-e34b-4dcb-9f3b-92210a319105',
    'sol:math-wormhole',
    'Math (Wormhole)',
    8,
    'CaGa7pddFXS65Gznqwp42kBhkJQdceoFVT7AQYo8Jr8Q',
    UnderlyingAsset.MATH,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '6052c89c-0283-407b-b662-0dad4dc29430',
    'sol:mbs',
    'MonkeyBucks',
    6,
    'Fm9rHUTF5v3hwMLbStjZXqNBBoZyGriQaFM6sTFz3K8A',
    UnderlyingAsset.MBS,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '735fdc61-9e4c-4b59-a135-8f004a03cec3',
    'sol:media',
    'Media Network',
    6,
    'ETAtLmCmsoiEEKfNrHKJ2kYy3MoABhU6NQvpSfij5tDs',
    UnderlyingAsset.MEDIA,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '26ab4764-b9ab-4eb4-836a-f81d9269f160',
    'sol:mer',
    'Mercurial',
    6,
    'MERt85fc5boKw3BW1eYdxonEuJNvXbiMbs6hvheau5K',
    UnderlyingAsset.MER,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'aa540cc1-4019-48ca-8da4-fa9f6abf195f',
    'sol:mngo',
    'Mango',
    6,
    'MangoCzJ36AjZyKwVj3VnYU4GTonjfVEnJmvvWaxLac',
    UnderlyingAsset.MNGO,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '5e5ac729-1e79-4b1c-a36d-81a46e72821d',
    'sol:msol',
    'Marinade Staked SOL',
    9,
    'mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So',
    UnderlyingAsset.MSOL,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'f33ad79e-31b4-4a6f-b85e-5c2a3669b5a5',
    'sol:oxy',
    'Oxygen Protocol',
    6,
    'z3dn17yLaGMKffVogeFHQ9zWVcXgqgf3PQnDsNs2g6M',
    UnderlyingAsset.OXY,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'd1d5ce88-f892-4fe3-92be-7b28a1316aaa',
    'sol:polis',
    'Star Atlas DAO',
    8,
    'poLisWXnNRwC6oBu1vHiuKQzFjGL4XDSu4g9qjz9qVk',
    UnderlyingAsset.POLIS,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '0edccd00-fe20-429d-b098-f0ab67df868c',
    'sol:port',
    'Port Finance',
    6,
    'PoRTjZMPXb9T7dyU7tpLEZRQj7e6ssfAE62j2oQuc6y',
    UnderlyingAsset.PORT,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '371b8d0b-8a6f-4118-a2f7-ad55ad961308',
    'sol:prism',
    'PRISM',
    6,
    'PRSMNsEPqhGVCH1TtWiJqPjJyh2cKrLostPZTNy1o5x',
    UnderlyingAsset.PRISM,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'fd7fc099-4ae9-4c7f-b135-32a47157630d',
    'sol:psy',
    'PsyOptions',
    6,
    'PsyFiqqjiv41G7o5SMRzDJCu4psptThNR2GtfeGHfSq',
    UnderlyingAsset.PSY,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '2dff3c81-a29b-4687-af81-a4c5c26fb21d',
    'sol:real',
    'Realy Token',
    9,
    'AD27ov5fVU2XzwsbvnFvb1JpCBaCB5dRXrczV9CqSVGb',
    UnderlyingAsset.REAL,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '311a4d58-38f9-4e47-9764-75a28b5b5d6f',
    'sol:seco',
    'SECO',
    6,
    '7CnFGR9mZWyAtWxPcVuTewpyC3A3MDW4nLsu5NY6PDbd',
    UnderlyingAsset.SECO,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '0fe956f4-b526-4788-afb8-02bf35d54a69',
    'sol:slrs',
    'Solrise Foundation',
    6,
    'SLRSSpSLUTP7okbCUBYStWCo1vUgyt775faPqz8HUMr',
    UnderlyingAsset.SLRS,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'c70d0e65-8e79-46d3-88ae-a8d6d35fca57',
    'sol:sny',
    'Synthetify',
    6,
    '4dmKkXNHdgYsXqBHCuMikNQWwVomZURhYvkkX5c4pQ7y',
    UnderlyingAsset.SNY,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'f6b508ed-96f1-40d5-b1a3-6759ca4ca068',
    'sol:stars',
    'StarLaunch',
    6,
    'HCgybxq5Upy8Mccihrp7EsmwwFqYZtrHrsmsKwtGXLgW',
    UnderlyingAsset.STARS,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'ae6b25f8-35a8-4d9e-a581-a05cf087b767',
    'sol:sushi-wormhole',
    'Sushiswap (Wormhole)',
    8,
    'ChVzxWRmrTeSgwd3Ui3UumcN8KX7VK3WaD4KGeSKpypj',
    UnderlyingAsset.SUSHI,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '826fe936-c569-42ee-b49b-994d4b2439ad',
    'sol:sxp-wormhole',
    'Swipe (Wormhole)',
    8,
    '3CyiEDRehaGufzkpXJitCP5tvh7cNhRqd9rPBxZrgK5z',
    UnderlyingAsset.SXP,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '4ee5fe5e-70ee-4afa-9c1d-aa636bc61b7f',
    'sol:tryb',
    'BLira',
    6,
    'A94X2fRy3wydNShU4dRaDyap2UuoeWJGWyATtyp61WZf',
    UnderlyingAsset.TRYB,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '3ef9c7a1-913d-455d-a2c3-ab6ddef6ae7c',
    'sol:tulip',
    'Tulip',
    6,
    'TuLipcqtGVXP9XR62wM8WWCm6a9vhLs7T1uoWBk6FDs',
    UnderlyingAsset.TULIP,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '60cab12d-0fad-4574-9e6b-0616a64cbbae',
    'sol:ubxt-wormhole',
    'UpBots (Wormhole)',
    8,
    'FTtXEUosNn6EKG2SQtfbGuYB4rBttreQQcoWn1YDsuTq',
    UnderlyingAsset.UBXT,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '13e7a2c7-ed75-48b4-8616-d8dbee3a580b',
    'sol:uni-wormhole',
    'Uniswap (Wormhole)',
    8,
    '8FU95xFJhUUkyyCLU13HSzDLs7oC4QZdXQHL6SCeab36',
    UnderlyingAsset.UNI,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'e29426bf-3ba8-4539-ad0c-199ab106798c',
    'sol:bat-wormhole',
    'Basic Attention Token (Wormhole)',
    8,
    'EPeUFDgHRxs9xxEPVaL6kfGQvCon7jmAWKVUHuux1Tpz',
    UnderlyingAsset.BAT,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '0e25361a-64ad-454f-91a5-c1e2b50dee5e',
    'sol:weth-wormhole',
    'Wrapped Ether (Wormhole)',
    8,
    '7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs',
    UnderlyingAsset.WETH,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '22fad997-3fb7-442e-88c8-087601c358c8',
    'sol:yfi-wormhole',
    'Yearn.finance (Wormhole)',
    8,
    'BXZX2JRJFjvKazM1ibeDFxgAngKExb74MRXzXKvgikxX',
    UnderlyingAsset.YFI,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'b1baa024-f3d7-4b5b-b1e8-b637bd1f6328',
    'sol:waave',
    'Wrapped Aave',
    6,
    'dK83wTVypEpa1pqiBbHY3MNuUnT3ADUZM4wk9VZXZEc',
    UnderlyingAsset.WAAVE,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '324cb250-bcc0-4178-9455-657f9bd4eb9f',
    'sol:aave-wormhole',
    'Aave Token (Wormhole)',
    8,
    '3vAs4D1WE6Na4tCgt4BApgFfENbm8WY7q4cSPD1yM4Cg',
    UnderlyingAsset.AAVE,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'bd41c638-8184-470d-85d2-c39d653f6969',
    'sol:alm',
    'Almond',
    6,
    'ALMmmmbt5KNrPPUBFE4dAKUKSPWTop5s3kUGCdF69gmw',
    UnderlyingAsset.ALM,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '31095adc-01e5-4775-86d0-f59c53c73eda',
    'sol:apt',
    'Apricot',
    6,
    'APTtJyaRX5yGTsJU522N4VYWg3vCvSb65eam5GrPT5Rt',
    UnderlyingAsset.APT,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'fc1c7819-0268-483b-9e1b-cd542f5fa91b',
    'sol:wavax-wormhole',
    'Wrapped AVAX (Wormhole)',
    8,
    'KgV1GvrHQmRBY8sHQQeUKwTm2r2h8t4C8qt12Cw1HVE',
    UnderlyingAsset.WAVAX,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'b84ba821-b94e-4395-bc6e-2f166ff081ab',
    'sol:bchbear',
    'BCHBEAR',
    6,
    '2VTAVf1YCwamD3ALMdYHRMV5vPUCXdnatJH5f1khbmx6',
    UnderlyingAsset.BCHBEAR,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '109285a4-fe08-4436-8343-1a8b497fa33d',
    'sol:bear',
    'BEAR',
    6,
    '45vwTZSDFBiqCMRdtK4xiLCHEov8LJRW8GwnofG8HYyH',
    UnderlyingAsset.BEAR,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '12ccbec4-50fb-438b-865e-caf37cf48149',
    'sol:bvol',
    'BVOL',
    6,
    '91z91RukFM16hyEUCXuwMQwp2BW3vanNG5Jh5yj6auiJ',
    UnderlyingAsset.BVOL,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '3be4fde1-cbb0-48e8-ad0b-18ff1d3b4b0b',
    'sol:cash',
    'Cashio Dollar',
    6,
    'CASHVDm2wsJXfhj6VWxb7GiMdoLc17Du7paH4bNr5woT',
    UnderlyingAsset.CASH,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'ee788c01-dfd6-4192-8636-c237ef49e2d6',
    'sol:ccai',
    'Aldrin',
    9,
    'E5ndSkaB17Dm7CsD22dvcjfrYSDLCxFcMd6z8ddCk5wp',
    UnderlyingAsset.CCAI,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '12ff2857-8b6f-4a39-bcc9-9677a06978ab',
    'sol:cel',
    'Celsius (Wormhole)',
    4,
    'nRtfwU9G82CSHhHGJNxFhtn7FLvWP2rqvQvje1WtL69',
    UnderlyingAsset.CEL,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '3e85d244-101d-4873-b957-d52e3843da94',
    'sol:cmfi',
    'Compendium Finance',
    6,
    '5Wsd311hY8NXQhkt9cWHwTnqafk7BGEbLu8Py3DSnPAr',
    UnderlyingAsset.CMFI,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '5e938e41-cd27-4d36-bae0-3f9121cbf92c',
    'sol:comp-wormhole',
    'Compound (Wormhole)',
    8,
    'AwEauVaTMQRB71WeDnwf1DWSBxaMKjEPuxyLr1uixFom',
    UnderlyingAsset.COMP,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'ce347f78-6c1f-4335-a4f9-76bdf675e663',
    'sol:cwar',
    'Cryowar Token',
    9,
    'HfYFjMKNZygfMC8LsQ8LtpPsPxEJoXJx4M6tqi75Hajo',
    UnderlyingAsset.CWAR,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'a0aafc30-172c-4947-ad71-bf2a6ae9e11c',
    'sol:fant',
    'Phantasia',
    6,
    'FANTafPFBAt93BNJVpdu25pGPmca3RfwdsDsRrT3LX1r',
    UnderlyingAsset.FANT,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '2c551a1b-194c-453a-a65f-2bd74287adcd',
    'sol:grt-wormhole',
    'Graph Token (Wormhole)',
    8,
    'HGsLG4PnZ28L8A4R5nPqKgZd86zUUdmfnkTRnuFJ5dAX',
    UnderlyingAsset.GRT,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '52b645c1-1e8c-4e19-9b16-7cc4511ecb7c',
    'sol:ibvol',
    'IBlive',
    6,
    '5TY71D29Cyuk9UrsSxLXw2quJBpS7xDDFuFu2K9W7Wf9',
    UnderlyingAsset.IBVOL,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '4951ca14-b95a-46a5-91f9-ce255cd08957',
    'sol:1inch-wormhole',
    '1INCH Token (Wormhole)',
    8,
    'AjkPkq3nsyDe1yKcbyZT7N4aK4Evv9om9tzhQD3wsRC',
    UnderlyingAsset['1INCH'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'f8a262cf-1cee-4c17-a974-396f1938a7d4',
    'sol:jet',
    'Jet Protocol',
    9,
    'JET6zMJWkCN9tpRT2v2jfAmm5VnQFDpUBCyaKojmGtz',
    UnderlyingAsset['sol:jet'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '9fdca02e-29f8-4a13-bf25-ccdf9b522e3b',
    'sol:keep-wormhole',
    'KEEP Token (Wormhole)',
    8,
    '64L6o4G2H7Ln1vN7AHZsUMW4pbFciHyuwn4wUdSbcFxh',
    UnderlyingAsset.KEEP,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '1c5b803d-36b5-49fc-8304-c30286365855',
    'sol:kitty',
    'Kitty Coin',
    9,
    '6XWfkyg5mzGtKNftSDgYjyoPyUsLRf2rafj95XSFSFrr',
    UnderlyingAsset.KITTY,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'f6fec2f1-2ebb-4e72-9a33-3c08202eed4c',
    'sol:luna-wormhole',
    'LUNA (Wormhole)',
    6,
    'F6v4wfAdJB8D8p77bMXZgYt8TDKsYxLYxH5AFhUkYx9W',
    UnderlyingAsset.LUNA,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'e182c58c-5051-486d-97cf-c64668b06367',
    'sol:mean',
    'MEAN',
    6,
    'MEANeD3XDdUmNMsRGjASkSWdC8prLYsoRJ61pPeHctD',
    UnderlyingAsset.MEAN,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'c8a1e543-bb13-4cd9-b9ca-713fd5e421b7',
    'sol:mnde',
    'Marinade',
    9,
    'MNDEFzGvMt87ueuHvVU9VcTqsAP5b3fTGPsHuuPA5ey',
    UnderlyingAsset.MNDE,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'cca43f5b-b74a-40ea-a659-01b1eaf5c1bb',
    'sol:pai',
    'Parrot USD',
    6,
    'Ea5SjE2Y6yvCeW5dYTn7PYMuW5ikXkvbGdcmSnXeaLjS',
    UnderlyingAsset.PAI,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'd9108c43-75cd-4b5a-88b7-b94076083927',
    'sol:paxg-wormhole',
    'Paxos Gold (Wormhole)',
    8,
    'C6oFsE8nXRDThzrMEQ5SxaNFGKoyyfWDDVPw37JKvPTe',
    UnderlyingAsset.PAXG,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '90709afa-318d-40d3-9b86-0b6eaf1eaeab',
    'sol:perp-wormhole',
    'Perpetual (Wormhole)',
    8,
    '9BsnSWDPfbusseZfnXyZ3un14CyPMZYvsKjWY3Y8Gbqn',
    UnderlyingAsset.PERP,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '882e20ec-fff1-4c6b-8f52-fcfaf6c66178',
    'sol:prt',
    'PRT (Parrot Protocol)',
    6,
    'PRT88RkA4Kg5z7pKnezeNH4mafTvtQdfFgpQTGRjz44',
    UnderlyingAsset.PRT,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '29e0e336-1246-497c-bd59-098145fcec0b',
    'sol:rendoge',
    'renDOGE',
    8,
    'ArUkYE2XDKzqy77PRRGjo4wREWwqk6RXTfM9NeqzPvjU',
    UnderlyingAsset.RENDOGE,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'ec19e187-5099-4bd6-8be0-6d5e709eef2b',
    'sol:rsr-wormhole',
    'Reserve Rights (Wormhole)',
    8,
    'DkbE8U4gSRuGHcVMA1LwyZPYUjYbfEbjW8DMR3iSXBzr',
    UnderlyingAsset.RSR,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '07247f23-5b0a-4aad-b447-215702022484',
    'sol:run',
    'Run Token',
    9,
    '6F9XriABHfWhit6zmMUYAQBSy6XK5VF1cHXuW5LDpRtC',
    UnderlyingAsset.RUN,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'f778a49b-2078-4e44-80be-385e4950d169',
    'sol:samo',
    'Samoyed Coin',
    9,
    '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
    UnderlyingAsset.SAMO,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'd206e2ef-d22b-44d9-8d30-8c52f73d0ca8',
    'sol:sbr',
    'Saber Protocol Token',
    6,
    'Saber2gLauYim4Mvftnrasomsv6NvAuncvMEZwcLpD1',
    UnderlyingAsset.SBR,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'e40dba1c-d240-4474-a199-22c4db805756',
    'sol:sbriou',
    'Saber IOU Token (Liquidity Mining Rewards)',
    6,
    'iouQcQBAiEXe6cKLS85zmZxUqaCqBdeHFpqKoSz615u',
    UnderlyingAsset.SBRIOU,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'cb4a4c8f-a707-4fc6-998c-5cc696943ce2',
    'sol:scnsol',
    'Socean staked SOL',
    9,
    '5oVNBeEEQvYi1cX3ir8Dx5n1P7pdxydbGF2X4TxVusJm',
    UnderlyingAsset.SCNSOL,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'f969a869-7923-4a92-b2cf-455d546257fd',
    'sol:shdw',
    'Shadow Token',
    9,
    'SHDWyBxihqiCj6YekG2GUr7wqKLeLAMK1gHZck9pL6y',
    UnderlyingAsset.SHDW,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '431f0f91-85de-4337-b743-efe08ebf7c17',
    'sol:slc',
    'Solice',
    6,
    'METAmTMXwdb8gYzyCPfXXFmZZw4rUsXX58PNsDg7zjL',
    UnderlyingAsset.SLC,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '60045518-9075-43d7-8bd9-008cac6ddb36',
    'sol:step',
    'Step',
    9,
    'StepAscQoEioFxxWGnh2sLBDFp9d8rvKz2Yp39iDpyT',
    UnderlyingAsset.STEP,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '3dc8897e-dc11-4566-b5c2-135ae8b0201a',
    'sol:sunny',
    'Sunny Governance Token',
    6,
    'SUNNYWgPQmFxe9wTZzNK7iPnJ3vYDrkgnxJRJm1s3ag',
    UnderlyingAsset.SUNNY,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '4b0af18b-0a8c-41a7-a1a8-e07e3d148ca9',
    'sol:susd',
    'Solcasino USD',
    9,
    '21jZ1ESEFYh9SBwjT5gqE3jHv3JnaGhgvypLTR96QXW9',
    UnderlyingAsset.SUSD,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'c2b1e6bf-50b1-4f06-b0c4-3df1f985b6cb',
    'sol:svt',
    'Solvent',
    6,
    'svtMpL5eQzdmB3uqK9NXaQkq8prGZoKQFNVJghdWCkV',
    UnderlyingAsset.SVT,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'd6ab8429-995a-4125-846f-49e5ccd4e734',
    'sol:tryb-2',
    'TRYB',
    6,
    '6ry4WBDvAwAnrYJVv6MCog4J8zx6S3cPgSqnTsDZ73AR',
    UnderlyingAsset.TRYB2,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '64523f0c-f87b-46f0-9d50-a1aad2e771c8',
    'sol:usdh',
    'USDH Hubble Stablecoin',
    6,
    'USDH1SM1ojwWUga67PGrgFWUHibbjqMvuMaDkRJTgkX',
    UnderlyingAsset.USDH,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'f1dff494-7e67-40ce-af32-dabc35ee0fd4',
    'sol:uxp',
    'UXP Governance Token',
    9,
    'UXPhBoR3qG4UCiGNJfV7MqhHyFqKN68g45GoYvAeL2M',
    UnderlyingAsset.UXP,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'e13a4349-aee7-4306-9ef0-9cd0938e5339',
    'sol:wbnb-wormhole',
    'Wrapped BNB (Wormhole)',
    8,
    '9gP2kCy3wA1ctvYWQk75guqXuHfrEomqydHLtcTCqiLa',
    UnderlyingAsset.WBNB,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '3419b046-397d-4b5b-9d41-b28147f55f75',
    'sol:wdaiv2-wormhole',
    'Dai Stablecoin (Wormhole)',
    8,
    'EjmyN6qEC1Tf1JxiG1ae7UTJhUxSwk1TCWNWqxWV4J6o',
    UnderlyingAsset.WDAIV2,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'c626955d-2eb3-45b0-8c37-7abfe03cc0e3',
    'sol:usdcv2-wormhole',
    'USD Coin (Wormhole)',
    6,
    'A9mUU4qviSctJVPJdBJWkb28deg915LYJKrzQ19ji3FM',
    UnderlyingAsset.WUSDCV2,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'fcdaedca-10db-4953-b71b-e1dfceadbf21',
    'sol:usdtv2-wormhole',
    'Tether USD (Wormhole)',
    6,
    'Dn4noZ5jgGfkntzcQSUZ8czkreiZ1ForXYoV2H8Dm7S1',
    UnderlyingAsset.WUSDTV2,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'c7a949fb-3d89-4b69-a9fa-1f098bcce9f7',
    'sol:xusd',
    'Synthetic USD',
    6,
    '83LGLCm7QKpYZbX8q4W2kYWbtt8NJBwbVwEepzkVnJ9y',
    UnderlyingAsset.XUSD,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '11c51225-d615-4c5b-93de-be145435d6b1',
    'sol:zbc',
    'ZEBEC',
    9,
    'zebeczgi5fSEtbpfQKVZKCJ3WgYXxjkMUkNNx7fLKAF',
    UnderlyingAsset.ZBC,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'db4f58d4-e5bd-4b63-8ab3-6c5e22d9be6e',
    'sol:blt',
    'Blocto Token',
    8,
    'BLT1noyNr3GttckEVrtcfC6oyK6yV1DpPgSyXbncMwef',
    UnderlyingAsset.BLT,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '2014b543-198c-48ec-8968-f2b1beab86f7',
    'sol:elu',
    'Elumia Crowns',
    9,
    '4tJZhSdGePuMEfZQ3h5LaHjTPsw1iWTRFTojnZcwsAU6',
    UnderlyingAsset.ELU,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '26914ee4-08c6-4a4b-a76b-61e56cd36bff',
    'sol:ip3',
    'IP3',
    9,
    '3uejHm24sWmniGA5m4j4S1DVuGqzYBR5DJpevND4mivq',
    UnderlyingAsset.IP3,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '6f459ab5-5d0c-4d8d-96d8-46aaaa0e73b0',
    'sol:jsol',
    'JPOOL Solana Token',
    9,
    '7Q2afV64in6N6SeZsAAB81TJzwDoD6zpqmHkzi9Dcavn',
    UnderlyingAsset.JSOL,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'f98eb4de-23c4-475d-80f2-382808e8d350',
    'sol:ktrc',
    'Kotaro Chips',
    9,
    'ChywntqwNRzaoWYUcDQ3iALqcwSAVtjM2dPshz5AETMm',
    UnderlyingAsset.KTRC,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'afa97e79-edd8-4800-8e7e-5f460f3b1fe4',
    'sol:mplx',
    'Metaplex Token',
    6,
    'METAewgxyPbgwsseH8T16a39CQ5VyVxZi9zXiDPY18m',
    UnderlyingAsset['sol:mplx'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '2d3c72f4-e7d2-4861-b3cc-469adea25fb0',
    'sol:nova',
    'NOVA FINANCE',
    9,
    'BDrL8huis6S5tpmozaAaT5zhE5A7ZBAB2jMMvpKEeF8A',
    UnderlyingAsset.NOVA,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '9f9896d6-3f9e-462f-afb5-833c01d44699',
    'sol:slcl',
    'Solcial token',
    9,
    'SLCLww7nc1PD2gQPQdGayHviVVcpMthnqUz2iWKhNQV',
    UnderlyingAsset.SLCL,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '8729f8b6-a5ef-4a8e-a094-6c160589dbfb',
    'sol:stsol',
    'Lido Staked SOL',
    9,
    '7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj',
    UnderlyingAsset.STSOL,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '039d4c7d-3e48-40b3-896d-512fcfe60f1e',
    'sol:psol',
    'pSOL (Parrot SOL)',
    9,
    '9EaLkQrbjmbbuZG9Wdpo8qfNUEjHATJFSycEmw6f1rGX',
    UnderlyingAsset.PSOL,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '61a24ea9-7edc-4d6f-a1f5-dd164abe8b69',
    'sol:tkmk',
    'TOKAMAK ON SOLANA',
    9,
    'TKMKgSh3aADsmjr4yFWG52tkCQvmDxsQC1he1aBsi65',
    UnderlyingAsset.TKMK,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '7dc02656-4e0d-4cec-bb92-30495f622ba5',
    'sol:bbsamo',
    'BabySamoio',
    1,
    '7ViSurf5Ve2a8qDWFYsfU8GFmRttQvS5paJ8L94QZgo7',
    UnderlyingAsset.BBSAMO,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'ea958ebb-d9fb-4818-9496-1f07f38e89c8',
    'sol:csol',
    'Solend SOL',
    9,
    '5h6ssFpeDeRbzsEHDbTQNH7nVGgsKrZydxdSTnLm6QdV',
    UnderlyingAsset.CSOL,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '343db8ad-8506-463d-b11b-60953433b37f',
    'sol:rin',
    'Aldrin',
    9,
    'E5ndSkaB17Dm7CsD22dvcjfrYSDLCxFcMd6z8ddCk5wp',
    UnderlyingAsset.ALDRIN,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'f6b48374-29b6-4d31-a914-71f062be25e9',
    'sol:tupolis',
    'tuPOLIS',
    8,
    '658FZo9B4HgKxsKsM7cUHN7jfNFgC7YftusWWYWc4piD',
    UnderlyingAsset.TUPOLIS,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '20fc1d51-4569-440e-b5d1-ddad648c7d1d',
    'sol:xaury',
    'Aurory',
    9,
    'xAURp5XmAG7772mfkSy6vRAjGK9JofYjc3dmQDWdVDP',
    UnderlyingAsset.XAURY,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '8b9463df-9df3-4c9e-bd4d-721e414c3879',
    'sol:scp',
    'SCOPE',
    6,
    '5HbkoVbaMnJYEuiTqeC7cBMSK2zG2MFfoxc9e6VkWPQS',
    UnderlyingAsset.SCOPE,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '8111aef5-0548-4e07-8f86-5984cd983aa4',
    'sol:tusrm',
    'tuSRM',
    6,
    '4QSK13NTKxTBExbMjHFsj3QfHBn4Hfp3DGLSba8GvFvh',
    UnderlyingAsset.TUSRM,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'a605894c-9340-4045-ac4d-b1165d517c23',
    'sol:lqid',
    'LQID',
    6,
    'A6aY2ceogBz1VaXBxm1j2eJuNZMRqrWUAnKecrMH85zj',
    UnderlyingAsset.LQID,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'd82f66bf-e921-44e4-a9b0-462eda94a9ad',
    'sol:vi',
    'VI',
    9,
    '7zBWymxbZt7PVHQzfi3i85frc1YRiQc23K7bh3gos8ZC',
    UnderlyingAsset.VI,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '41e349ad-b727-4659-9b3e-04480304683e',
    'sol:xrp-sollet',
    'Wrapped XRP (Sollet)',
    6,
    'Ga2AXHpfAF6mv2ekZwcsJFqu7wB4NV331qNH7fW9Nst8',
    UnderlyingAsset['xrp-sollet'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '081bd159-8157-4c7e-8836-9147784b7418',
    'sol:aury',
    'Aurory',
    9,
    'AURYydfxJib1ZkTir1Jn1J9ECYUtjb6rKQVmtYaixWPP',
    UnderlyingAsset['aury'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '86600f43-533c-4109-9bba-c66ac837d94c',
    'sol:dio',
    'Decimated',
    9,
    'BiDB55p4G3n1fGhwKFpxsokBMqgctL4qnZpDH1bVQxMD',
    UnderlyingAsset['dio'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'cd8013ff-efc4-4512-a07e-5c5c67d7b1f1',
    'sol:sol-perp',
    'Perp',
    6,
    'D68NB5JkzvyNCZAvi6EGtEcGvSoRNPanU9heYTAUFFRa',
    UnderlyingAsset['sol-perp'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '667b9655-8f73-4231-9ce4-034b5a544fe5',
    'sol:sol-woo',
    'Wootrade Network',
    6,
    'E5rk3nmgLUuKUiS94gg4bpWwWwyjCMtddsAXkTFLtHEy',
    UnderlyingAsset['sol-woo'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '58ed3daa-30b1-4352-8a98-0454b7475696',
    'sol:sol-weth',
    'WETH (alcorbridge.in)',
    9,
    '8kVHYoueJAaZtTqtqK5McRJSqX1yXii1epuxrW6jfsrD',
    UnderlyingAsset['sol-weth'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'd7190522-cc12-435d-9589-23b04bdd949e',
    'sol:btc-sollet',
    'Wrapped Bitcoin (Sollet)',
    6,
    '9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E',
    UnderlyingAsset['btc-sollet'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'c0fce6fb-aad5-462c-94c3-82121613f0ba',
    'sol:eth-sollet',
    'Wrapped Ethereum (Sollet)',
    6,
    '2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk',
    UnderlyingAsset['eth-sollet'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '5f98c609-de50-41b4-8f82-c59e5273166e',
    'sol:ftt-sollet',
    'Wrapped FTT (Sollet)',
    6,
    'AGFEad2et2ZJif9jaGpdMixQqvW5i81aBdvKe7PHNfz3',
    UnderlyingAsset.FTT,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'f194cd14-d0c2-443a-b717-e826143c7e33',
    'sol:srm-wormhole',
    'Serum (Wormhole)',
    6,
    'xnorPhAzWXUczCP3KjU5yDxmKKZi5cSbxytQ1LgE3kG',
    UnderlyingAsset.SRM,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'cd7d9622-1467-405d-af1f-09edd1d431d6',
    'sol:usdc-wormhole',
    'USD Coin (PoS) (Wormhole)',
    6,
    'E2VmbootbVCBkMNNxKQgCLMS1X3NoGMaYAsufaAsf7M',
    UnderlyingAsset.WUSDC,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '24afee36-2422-415e-a2f4-0010bd34a4b1',
    'sol:wusdc-wormhole',
    'USD Coin (Wormhole)',
    6,
    'FVsXUnbhifqJ4LiXQEbpUtXVdB8T5ADLKqSs5t1oc54F',
    UnderlyingAsset.WUSDC,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'bfc197c1-6fcc-4d63-8f20-596b06bf2eec',
    'sol:hget-wormhole',
    'Hedget (Wormhole)',
    6,
    '2ueY1bLcPHfuFzEJq7yN1V2Wrpu8nkun9xG2TVCE1mhD',
    UnderlyingAsset.HGET,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'e18a88f5-c4f4-4ba4-b98a-6318c284524a',
    'sol:ust-wormhole',
    'UST (Wormhole)',
    6,
    '9vMJfxuKxXBoEa7rM12mYLMwTacLMLDJqHozw96WQL8i',
    UnderlyingAsset.UST,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '6c8fb4d1-8a73-46ae-a69f-715648ec1748',
    'sol:wftt-wormhole',
    'Wrapped FTT (Wormhole)',
    9,
    'GbBWwtYTMPis4VHb8MrBbdibPhn28TSrLB53KvUmb7Gi',
    UnderlyingAsset.WFFT,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '2e848aaf-b5ac-49b6-8bd2-eb8b56493ece',
    'sol:inj-wormhole',
    'Injective Token (Wormhole)',
    8,
    'Hgtvu9gsDTzUpBn69WjrhMyzaQhrAM9piTsezmZVQP6Z',
    UnderlyingAsset.INJ,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'f6c73cf5-2faf-4076-bcf3-65a7124c0de7',
    'sol:lua-wormhole',
    'LuaToken (Wormhole)',
    8,
    '5Wc4U1ZoQRzF4tPdqKQzBwRSjYe8vEf3EvZMuXgtKUW6',
    UnderlyingAsset.LUA,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '6d542d82-4af1-4d42-b584-bfafc023388f',
    'sol:ldo-wormhole',
    'Lido DAO Token (Wormhole)',
    8,
    'HZRCwxP2Vq9PCpPXooayhJ2bxTpo5xfpQrwB1svh332p',
    UnderlyingAsset.LDO,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '84ba4555-269a-4e25-8a13-c713defbebb7',
    'sol:wbtc-wormhole',
    'Wrapped BTC (Wormhole)',
    8,
    '3NZ9JMVBmGAqocybic2c7LQCJScmgsAZ6vQqTDzcqmJh',
    UnderlyingAsset.WBTC,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '9e03bb68-c6a2-43c9-95d0-4d27c110ef45',
    'sol:cho-wormhole',
    'choise.com Token (Wormhole)',
    8,
    '59McpTVgyGsSu5eQutvcKLFu7wrFe3ZkE2qdAi3HnvBn',
    UnderlyingAsset.CHO,
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '61ba259d-f6a7-4007-829b-7ca03a0a6db3',
    'sol:hnt',
    'Helium Network Token',
    8,
    'hntyVP6YFm1Hg25TN9WGLqM12b8TQmcknKrdu1oxWux',
    UnderlyingAsset['sol:hnt'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'ffdd42e7-0788-426e-9094-c12954a858d9',
    'sol:qcad',
    'QCAD',
    2,
    'EeBX9JLdvsp4HnBbMgC1HnAjBkBQxgxtWxspcCLtT6ci',
    UnderlyingAsset['sol:qcad'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'd805ce9a-f000-46d2-a23d-71188ae868ec',
    'sol:3uejh-usdc-atrix',
    '3uejH-USDC (Atrix)',
    6,
    '8Vu7Y3xZg75sUYiNxDi5zRFamtDGn7afMoFVpaeoy4Fj',
    UnderlyingAsset['3uejh-usdc'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '68b4748e-72a2-431c-9836-ff6a3d7e7b76',
    'sol:3uejh-usdc-ray',
    '3uejH-USDC (Raydium)',
    9,
    '5Xn6kWHwnQiL5JRFHqZhF9qDE4gWkhCCUomccfak6Pqd',
    UnderlyingAsset['3uejh-usdc'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '011fdc13-c2fe-497a-a3c2-84741833ed7f',
    'sol:avax-usdc',
    'AVAX-USDC (Atrix)',
    6,
    '9Q2Jcc2Xpjr5QExCezwBTKnRyXRfvtyEFTNssYPKrZSP',
    UnderlyingAsset['avax-usdc'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'e4b54695-ea0b-465a-846a-6932f2fc0964',
    'sol:bop-usdc',
    'BOP-USDC (Atrix)',
    6,
    'FuTJE1yfz5u17T7gpqyMuUaCnnzLTes8R5QjXpMd8f1P',
    UnderlyingAsset['bop-usdc'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'aa52fdba-4c35-48c0-851c-491b789a1cd2',
    'sol:crown',
    'CROWN Token',
    9,
    'GDfnEsia2WLAW5t8yx2X5j2mkfA74i5kwGdDuZHt7XmG',
    UnderlyingAsset['sol:crown'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '3d239b43-9ed2-4ea4-9117-10a20c1476b7',
    'sol:elu-usdt',
    'ELU-USDT (Raydium)',
    9,
    '6DGD2tQaPPaupNKYJhp3JpqSHnY1mUqTMQsVqCASriau',
    UnderlyingAsset['elu-usdt'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'aaf93558-44b2-41a4-b526-17af8a60aa25',
    'sol:fida-usdc',
    'FIDA-USDC (Atrix)',
    6,
    '22DFMbkx4jHgaEjKz2D4yaq51YS2LXcQ7GFJT9RDrmJz',
    UnderlyingAsset['fida-usdc'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '8d7214f1-00e2-44e3-b5c1-7f25c7ec5c4e',
    'sol:fida-usdt',
    'FIDA-USDT (Atrix)',
    6,
    '4aN1Vrq1F292EbZ8cW2SbTby7bCG1Ubqh1sLoFrj8Rkf',
    UnderlyingAsset['fida-usdt'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'b8f5c65b-52fc-4de9-a137-888e5d34e2a4',
    'sol:ftt-ftt',
    'FTT-FTT (Atrix)',
    6,
    'HCygAsuXLXyb8Krf88wXi8k3VqJi4qLXJxk9YfojFPEj',
    UnderlyingAsset['ftt-ftt'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '560128e2-1eff-4f3a-b74c-826abf6403d1',
    'sol:link-usdc',
    'LINK-USDC (Atrix)',
    6,
    '3rAjv5d83R47t5TyTjZTbWAKdFY8tb1jYgt44hEiyRhd',
    UnderlyingAsset['link-usdc'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '0300083e-b497-4399-95bc-cb6ee301f42a',
    'sol:lqid-usdc',
    'LQID-USDC (Atrix)',
    6,
    '2dHFjKHdmXLMmZQrF4nuxn3V175XQNCR4kcDBHuiQ4So',
    UnderlyingAsset['lqid-usdc'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '48ced08b-8ee9-4e7c-920c-825d9cffb98d',
    'sol:maticpo-usdc',
    'MATICPO-USDC (Atrix)',
    6,
    'qxWs2xtSZ3ojvhaNiZ48NGRzNjZQU9K46ZmHu6inrc9',
    UnderlyingAsset['maticpo-usdc'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '3cf7a8b8-6cdb-46e7-9371-e63b85d4edf2',
    'sol:msol-sol',
    'MSOL-SOL (Atrix)',
    6,
    '5Ho7kHt8vahC2zW6p99y3ENXWp1s2vSbFKWUPwdoPVEC',
    UnderlyingAsset['msol-sol'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '9518933c-9a10-42f1-903e-e1f85034f13d',
    'sol:msol-usdc',
    'MSOL-USDC (Aldrin)',
    0,
    'H37kHxy82uLoF8t86wK414KzpVJy7uVJ9Kvt5wYsTGPh',
    UnderlyingAsset['msol-usdc'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '64edb7e2-6cd4-4257-b0f9-a873718ad5a7',
    'sol:prism-usdc',
    'PRISM-USDC (Raydium)',
    6,
    '3baYkTcudvSFMe25UpZcBfdp4FA5kL2E4pfaeJ8AiYJB',
    UnderlyingAsset['prism-usdc'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '4d953194-a87c-4d38-923b-a139f4d815f9',
    'sol:pyth',
    'Pyth',
    6,
    'HZ1JovNiVvGrGNiiYvEozEVgZ58xaU3RKwX8eACQBCt3',
    UnderlyingAsset['sol:pyth'],
    SOL_TOKEN_FEATURES_WITH_FRANKFURT
  ),
  solToken(
    '20847b14-4982-448b-a61c-9b7d42085948',
    'sol:bonk',
    'Bonk',
    5,
    'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
    UnderlyingAsset['sol:bonk'],
    SOL_TOKEN_FEATURES_WITH_FRANKFURT
  ),
  solToken(
    '7457400a-dbce-4e33-a50a-356c9a1eca3e',
    'sol:jto',
    'Jito',
    9,
    'jtojtomepa8beP8AuQc6eXt5FriJwfFMwQx2v2f9mCL',
    UnderlyingAsset['jto'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '407cfd7c-ff3d-4501-a0a5-4d53af00512a',
    'sol:jup',
    'Jupiter',
    6,
    'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN',
    UnderlyingAsset['jup'],
    SOL_TOKEN_FEATURES_WITH_FRANKFURT
  ),
  solToken(
    'c4db311f-8a4a-4821-b7b4-c4d04c4de752',
    'sol:honey',
    'HONEY',
    9,
    '4vMsoUT2BWatFweudnQM1xedRLfJgJ7hswhcpz4xgBTy',
    UnderlyingAsset['sol:honey'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '15852e6a-342c-4e37-8745-9782ae25a476',
    'sol:wif',
    'dogwifhat',
    6,
    'EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm',
    UnderlyingAsset['wif'],
    SOL_TOKEN_FEATURES_WITH_FRANKFURT
  ),
  solToken(
    '683e5064-fff0-401d-bf62-08f49bb130fc',
    'sol:natix',
    'NATIX Network ',
    6,
    'FRySi8LPkuByB7VPSCCggxpewFUeeJiwEGRKKuhwpKcX',
    UnderlyingAsset['natix'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '36b8ee60-47d4-47bf-9abb-40268b253f3c',
    'sol:ks',
    'Kalisten ',
    9,
    '3swraHsc77KMg1tFvwH3tfYcd8SWr5fcUhtmRxjavG7H',
    UnderlyingAsset['sol:ks'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '92bfdced-9b06-47ce-968c-a41e83f787df',
    'sol:apusdt',
    'Wrapped USDT (Allbridge from Polygon)',
    6,
    'DNhZkUaxHXYvpxZ7LNnHtss8sQgdAfd1ZYS1fB7LKWUZ',
    UnderlyingAsset['sol:apusdt'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'c0dab533-6101-4b9f-9802-f82bacd05d48',
    'sol:acusd',
    'Wrapped CUSD (Allbridge from Celo)',
    9,
    'EwxNF8g9UfmsJVcZFTpL9Hx5MCkoQFoJi6XNWzKf1j8e',
    UnderlyingAsset['sol:acusd'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '10588bb1-dcc3-4c5f-a813-8a5b4c342bee',
    'sol:solink',
    'Wrapped Chainlink (Sollet)',
    6,
    'CWE8jPTUYhdCTZYWPTe1o5DFqfdjzWKc9WKz6rSjQUdG',
    UnderlyingAsset['sol:solink'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '5f22f687-f90c-488f-bfe0-a669231a3ceb',
    'sol:block',
    'Blockasset',
    6,
    'NFTUkR4u7wKxy9QLaX2TGvd9oZSWoMo4jqSJqdMb7Nk',
    UnderlyingAsset['sol:block'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '2b1d83de-1cb8-4e22-bc25-8f66e758c809',
    'sol:w',
    'Wormhole Token',
    6,
    '85VBFQZC9TZkfaptBWjvUw7YbZjy52A6mjtPGjstQAmQ',
    UnderlyingAsset['W'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '51025e9d-74b7-483e-8649-3628049258dc',
    'sol:mobile',
    'Helium Mobile',
    6,
    'mb1eu7TzEc71KxDpsmsKoucSSuuoGLv1drys1oP2jh6',
    UnderlyingAsset['mobile'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'f63bd5b2-32e5-435b-883d-584476266d28',
    'sol:sbc',
    'Stable Coin',
    9,
    'DBAzBUXaLj1qANCseUPZz4sp9F8d2sc78C4vKjhbTGMA',
    UnderlyingAsset['sol:sbc'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '803bb18c-b9ed-4342-aa94-985f9ab31974',
    'sol:rendoge-usdc',
    'RENDOGE-USDC (Atrix)',
    6,
    'AdP5rgP2cbcG6vib14MRGJZULAAswGLx4desPSMxfzZB',
    UnderlyingAsset['rendoge-usdc'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'ff2bd6df-d901-4adc-a5af-2cad6e59d6bf',
    'sol:shdw-usdc-ray',
    'SHDW-USDC (Raydium)',
    9,
    'BeSq84RRsqQMKonw89mfYDg2dBcVc52LGN3zG6muFczu',
    UnderlyingAsset['shdw-usdc'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '5acc0db3-a5fd-415e-a5b1-8d0f1cf530f7',
    'sol:shdw-usdc-atrix',
    'SHDW-USDC (Atrix)',
    6,
    '63F79Xww6UTSJbPiJeuJ6Yn1yRZUzUAqLddbavPiRG6r',
    UnderlyingAsset['shdw-usdc'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '594e4ed9-8a17-4386-9569-9c4ebcd35815',
    'sol:sol-wtust',
    'SOL-wtUST (Atrix)',
    6,
    '8DUT2gszpXrGjYaJfH6cutUGLCUCDA4zd68dWsxXcF1y',
    UnderlyingAsset['sol-wtust'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'a8b0fd4e-4819-44b1-bb70-7a88dcdb75dd',
    'sol:srm-usdc',
    'SRM-USDC (Atrix)',
    6,
    'Ck9t5PgHSxm3TAcwHB7Ncw1HvGGRwRehdWLzSanUtxzJ',
    UnderlyingAsset['srm-usdc'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '53e04b66-377f-4330-9b69-22914ec1392c',
    'sol:srmet-srm',
    'SRMet-SRM (Atrix)',
    6,
    'E5LLJLgiyQ1QmMAci7efsPXjSxXGfncWrBB6kJ1GaaBT',
    UnderlyingAsset['srmet-srm'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'e784c670-c82f-4cd4-ae43-7416fb68b1ad',
    'sol:sushi-usdc-atrix',
    'SUSHI-USDC (Atrix)',
    6,
    'Fv1LohviCN4qRzmEUqqJdWd7B5zLxrGEQ7dXADyXdcvA',
    UnderlyingAsset['sushi-usdc'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '89312563-c185-4f09-a30f-27501e56a83c',
    'sol:sushi-usdc-ray',
    'SUSHI-USDC (Raydium)',
    8,
    '3wVrtQZsiDNp5yTPyfEzQHPU6iuJoMmpnWg6CTt4V8sR',
    UnderlyingAsset['sushi-usdc'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'af08f93f-e8ee-40d9-be0a-b069017c3517',
    'sol:tuatlas',
    'tuAtlas (Tulip)',
    8,
    '9eGNc4BZCAgpTSEjbu7ACCLjpnZh1WSdts3y4nMik4e7',
    UnderlyingAsset['tuatlas'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'cb63efc6-5184-4fea-8f97-218cad72f412',
    'sol:tucope',
    'tuCOPE (Tulip)',
    6,
    '8cm7UrBiDQ4C1ntQSCZfHSWKUizdW31ddTQGNY6Lym3B',
    UnderlyingAsset['tucope'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'a3d947eb-1dcf-4094-be0c-8503f624270f',
    'sol:tulike',
    'tuLIKE (Tulip)',
    9,
    'DRu91PV94sb6kX6HwMGnGM8TuHrjycS4FmJNRWEgyw6n',
    UnderlyingAsset['tulike'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '8699d0d5-95c1-447b-9f2f-bd2de134a633',
    'sol:tureal',
    'tuREAL (Tulip)',
    6,
    '8B1mqpvZYmpjAXVPBevaQBPbnufLz7ZZTBH6tgMVYCWe',
    UnderlyingAsset['tureal'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '9124d731-ab65-4e43-b9df-42fae8931d28',
    'sol:tusamo',
    'tuSAMO (Tulip)',
    9,
    'CEqYVZCL7sHQ8gChh1yL3uajc2UDs6DXuYjPZyRox6MC',
    UnderlyingAsset['tusamo'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '2203150e-0162-467e-b693-4087fcb434f4',
    'sol:usdt-usdc',
    'USDT-USDC (Atrix)',
    6,
    '4jL2htQtstTzatmtJL85M6z89E238ozg5eUa9u54Qyxb',
    UnderlyingAsset['usdt-usdc'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '79318d31-1c12-4e25-a5ec-f39a86a1459f',
    'sol:wbwbnb-usdc',
    'wbWBNB-USDC (Atrix)',
    6,
    'B8ruZRLvFzk5fF3jBNp5RpT5sNrd3sasgfSyEuTbzZqk',
    UnderlyingAsset['wbwbnb-usdc'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '134fd5d0-c7aa-4446-b6a2-d59aeca1dc4e',
    'sol:wheth-usdc',
    'whETH-USDC (Atrix)',
    6,
    'AW7jJo1Mu6Ht6kgT5RpwGYjpsXEQbEeXpLdKkViotiWU',
    UnderlyingAsset['wheth-usdc'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'b3ca6d5b-db84-4814-a0c0-f154a18fe594',
    'sol:wtust-usdt',
    'wtUST-USDT (Atrix)',
    6,
    '4G6Z1HQcTVE22NgSiZk6JbwiN55KD9Dk2k4Rx6HTnZEm',
    UnderlyingAsset['wtust-usdt'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '78ab6651-a0a0-47b6-9515-08caf7c8e6a6',
    'sol:xcope-usdc',
    'XCOPE-USDC (Raydium)',
    0,
    '2Vyyeuyd15Gp8aH6uKE72c4hxc8TVSLibxDP9vzspQWG',
    UnderlyingAsset['xcope-usdc'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'fce0c388-2167-447f-8d43-d76a1a33833d',
    'sol:wec',
    'Whole Earth Coin',
    9,
    '6y8W5YwAuzostqrS4YDJufBvksosfSi47Pd8U4A5vrBC',
    UnderlyingAsset['sol:wec'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '24a7c99d-4848-45d7-9dcc-01023915c298',
    'sol:render',
    'Render Token',
    8,
    'rndrizKT3MK1iimdxRdWabcF7Zg7AR5T4nud4EkHBof',
    UnderlyingAsset['sol:render'],
    SOL_TOKEN_FEATURES_WITH_FRANKFURT_GERMANY
  ),
  solToken(
    '76d493a6-d674-4987-85ae-5a9dca0711b1',
    'sol:wen',
    'Wen',
    5,
    'WENWENvqqNya429ubCdR81ZmD69brwQaaBYY6p3LCpk',
    UnderlyingAsset['sol:wen'],
    SOL_TOKEN_FEATURES_WITH_FRANKFURT
  ),
  solToken(
    'fe471409-0687-4920-a70d-7db46b08e4f2',
    'sol:mew',
    'cat in a dogs world',
    5,
    'MEW1gQWJ3nEXg2qgERiKu7FAFj79PHvQVREQUzScPP5',
    UnderlyingAsset['sol:mew'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '2ac447ce-0fa2-4f66-9fcf-d84405ad3db1',
    'sol:pyusd',
    'PayPal USD',
    6,
    '2b1kV6DkPAnxd5ixfnxCpjxmKwqjjaYmCZfHsFu24GXo',
    UnderlyingAsset['sol:pyusd'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '213c84a8-9114-46fb-b159-fafe8d30de9e',
    'sol:moveusd',
    'MoveMoney USD',
    6,
    '3AdhVEX6k85yNivHVXDEiY3WyP2WgFQTUZCahGaeC2qm',
    UnderlyingAsset['sol:moveusd'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'a5beabb1-bd50-43e3-8f69-a4622c43ac63',
    'sol:dxl',
    'Dexlab',
    6,
    'GsNzxJfFn6zQdJGeYsupJWzUAm57Ba7335mfhWvFiE9Z',
    UnderlyingAsset['sol:dxl'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '52adeafb-ba97-46a5-bc25-e79d0a3e544d',
    'sol:mother',
    'Mother Iggy',
    6,
    '3S8qX1MsMqRbiwKg2cQyx7nis1oHMgaCuc9c4VfvVdPN',
    UnderlyingAsset['sol:mother'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '1653a37c-b9c4-46f9-b55a-db5be9ad7943',
    'sol:wrose',
    'Wrapped ROSE',
    8,
    'S3SQfD6RheMXQ3EEYn1Z5sJsbtwfXdt7tSAVXPQFtYo',
    UnderlyingAsset['sol:wrose'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'f092f18a-ac79-4f07-b7f9-72df55e08306',
    'sol:mdt',
    'Measurable Data Token',
    8,
    '8Wqbst4qAN2FqBCCh5gdXq2WJ7vTNWEY4oNLrpUg7Tya',
    UnderlyingAsset['sol:mdt'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '10aed18e-75bc-4dac-8acb-c5d7c3ab6279',
    'sol:io',
    'IONET',
    8,
    'BZLbGTNCSFfoth2GYDtwr7e4imWzpR5jqcUuGEwr646K',
    UnderlyingAsset['sol:io'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'e29a3ff9-1045-4c94-afa3-6ecdb4286c58',
    'sol:aave',
    'Aave',
    8,
    '3vAs4D1WE6Na4tCgt4BApgFfENbm8WY7q4cSPD1yM4Cg',
    UnderlyingAsset['sol:aave'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '8e851669-6fea-43a8-9f59-51fd1104ac42',
    'sol:ldo',
    'LIDO DAO',
    8,
    'HZRCwxP2Vq9PCpPXooayhJ2bxTpo5xfpQrwB1svh332p',
    UnderlyingAsset['sol:ldo'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'c4ec49c1-04cc-469d-a1f8-15534c5e619f',
    'sol:gt',
    'Gate Token',
    8,
    'ABAq2R9gSpDDGguQxBk4u13s4ZYW6zbwKVBx15mCMG8',
    UnderlyingAsset['sol:gt'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'a8ebc810-a065-486d-844e-10802fffbabc',
    'sol:popcat',
    'POPCAT',
    9,
    '7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr',
    UnderlyingAsset['sol:popcat'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'ec3a6d0d-e6bf-4a2f-9e07-19bc81beee47',
    'sol:axs',
    'Axie Infinity',
    8,
    'HysWcbHiYY9888pHbaqhwLYZQeZrcQMXKQWRqS7zcPK5',
    UnderlyingAsset['sol:axs'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '468c5741-2612-480d-9857-19a09aca5447',
    'sol:sand',
    'Sand',
    8,
    '49c7WuCZkQgc3M4qH8WuEUNXfgwupZf1xqWkDQ7gjRGt',
    UnderlyingAsset['sol:sand'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '5dad984d-96dd-4a08-88c6-40c9a025810a',
    'sol:ens',
    'Ethereum Name Service',
    8,
    'CLQsDGoGibdNPnVCFp8BAsN2unvyvb41Jd5USYwAnzAg',
    UnderlyingAsset['sol:ens'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '34450f4a-1191-4a7b-a48a-2e5f4414aa02',
    'sol:jitosol',
    'Jito Staked SOL',
    9,
    'J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn',
    UnderlyingAsset['sol:jitosol'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'bd2130ca-c44f-4d7a-977b-62939a1f9fdb',
    'sol:zeus',
    'ZEUS Network',
    6,
    'ZEUS1aR7aX8DFFJf5QjWj2ftDDdNTroMNGo8YoQm3Gq',
    UnderlyingAsset['sol:zeus'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'f435d327-cb31-4a3e-a350-1e2abb2b48bd',
    'sol:kmno',
    'Kamino',
    6,
    'KMNo3nJsBXfcpJTVhZcXLW7RmTwTt4GVFE7suUBo9sS',
    UnderlyingAsset['sol:kmno'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    'cee268cb-6df4-4738-baf0-63564ef08c63',
    'sol:goat',
    'Goatseus Maximus',
    6,
    'CzLSujWBLFsSjncfkh59rUFqvafWcY5tzedWJSuypump',
    UnderlyingAsset['sol:goat'],
    SOL_TOKEN_FEATURES_WITH_FRANKFURT
  ),
  solToken(
    'bb6f1627-0c73-46f2-86bd-80c2c6873522',
    'sol:giga',
    'Gigachad',
    5,
    '63LfDmNb3MQ8mw9MtZ2To9bEA2M71kZUUGq5tiJxcqj9',
    UnderlyingAsset['sol:giga'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '7c423a2c-1651-4145-adf1-1b910a98abc8',
    'sol:tnsr',
    'Tensor',
    9,
    'TNSRxcUxoT9xBG3de7PiJyTDYu7kskLqcpddxnEJAS6',
    UnderlyingAsset['sol:tnsr'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '9d6c29dc-1374-4c59-a9a6-af4c91242281',
    'sol:ssol',
    'Solayer SOL',
    9,
    'sSo14endRuUbvQaJS3dq36Q829a3A6BEfoeeRGJywEh',
    UnderlyingAsset['sol:ssol'],
    SOL_TOKEN_FEATURES
  ),
  solToken(
    '371ba1d9-8abf-48c5-85f5-8af2fa7df7ed',
    'sol:drift',
    'Drift',
    6,
    'DriFtupJYLTosbwoN8koMbEYSx54aFAVLddWsbksjwg7',
    UnderlyingAsset['sol:drift'],
    SOL_TOKEN_FEATURES
  ),

  tsolToken(
    'b98c5a7a-49c5-45f1-a6ee-b08dff596a7d',
    'tsol:srm',
    'Serum',
    9,
    'D8YXLiwWQMibWRaxCTs9k6HwaYE6vtsbzK9KrQVMXU1K',
    UnderlyingAsset['tsol:srm'],
    SOL_TOKEN_FEATURES
  ),
  tsolToken(
    'ea7eb0ea-161c-4ce3-a448-e651d358b7a0',
    'tsol:usdc',
    'USD Coin',
    9,
    'F4uLeXJoFz3hw13MposuwaQbMcZbCjqvEGPPeRRB1Byf',
    UnderlyingAsset['tsol:usdc'],
    SOL_TOKEN_FEATURES
  ),
  tsolToken(
    '6dcb8ff8-be59-471f-9e57-c3b68735d71e',
    'tsol:usdcv2',
    'USD Coin V2',
    6,
    '4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU',
    UnderlyingAsset['tsol:usdc'],
    SOL_TOKEN_FEATURES
  ),
  tsolToken(
    '476582b6-1b18-471d-bdfd-ff29b8cdfd39',
    'tsol:ray',
    'Raydium',
    9,
    '9kLJoGbMgSteptkhKKuh7ken4JEvHrT83157ezEGrZ7R',
    UnderlyingAsset['tsol:ray'],
    SOL_TOKEN_FEATURES
  ),
  tsolToken(
    '30367323-8c04-475b-a6a4-df231032af4b',
    'tsol:gmt',
    'GMT',
    9,
    '64bco36MjrZ8K26FXZGoSrnDFDSCZhvJGfQ5ywLRFUpF',
    UnderlyingAsset['tsol:gmt'],
    SOL_TOKEN_FEATURES
  ),
  tsolToken(
    '12939712-84a2-4c06-bfd0-a58f7b188948',
    'tsol:usdt',
    'USD Tether',
    9,
    '9cgpBeNZ2HnLda7NWaaU1i3NyTstk2c4zCMUcoAGsi9C',
    UnderlyingAsset['tsol:usdt'],
    SOL_TOKEN_FEATURES
  ),
  tsolToken(
    '7ad7512f-90ca-44e3-9238-ae78c1a3e57d',
    'tsol:gari',
    'GARI',
    9,
    'Aub3Nun71bD5B98JQAivGtEdwCuFJVvZVXKkcVJkuzgh',
    UnderlyingAsset['tsol:gari'],
    SOL_TOKEN_FEATURES
  ),
  tsolToken(
    '6bac3f31-06b0-4a35-80d9-d6fa1346d4d3',
    'tsol:orca',
    'ORCA',
    9,
    '4yQY4kNGCCM5rCWiQMWHFe5q3b5o7AqGWbx3XyeTti5h',
    UnderlyingAsset['tsol:orca'],
    SOL_TOKEN_FEATURES
  ),
  tsolToken(
    'de2477a1-d1db-4b58-a62d-aea4d00d8c0a',
    'tsol:slnd',
    'SOLEND',
    9,
    'Ex6rHLLmvZoP9mpunMFvew424seSjPp5PQb5hDy8KJu6',
    UnderlyingAsset['tsol:slnd'],
    SOL_TOKEN_FEATURES
  ),

  polygonErc20(
    'b4404060-9cd8-49ed-91f8-21d9b7b0dde6',
    'polygon:treta',
    'Treta',
    18,
    '0xbda21dcb59b131dc2e6a403d3a2e2b066ae7c33f',
    UnderlyingAsset['polygon:treta'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    '35ac1f4a-3ece-4d7d-83ca-87a5768718a8',
    'polygon:usdc',
    'USD Coin',
    6,
    '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
    UnderlyingAsset['polygon:usdc'],
    POLYGON_TOKEN_FEATURES_WITH_FRANKFURT
  ),
  polygonErc20(
    '5a17fe9c-3b78-4f12-b419-ed3662f4e985',
    'polygon:usdcv2',
    'USD Coin (native)',
    6,
    '0x3c499c542cef5e3811e1192ce70d8cc03d5c3359',
    UnderlyingAsset['polygon:usdcv2'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    'dee07c7a-96cb-4dbb-906c-b0ad98160cff',
    'polygon:usdt',
    'Tether USD',
    6,
    '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
    UnderlyingAsset['polygon:usdt'],
    POLYGON_TOKEN_FEATURES_WITH_FRANKFURT
  ),
  polygonErc20(
    '7e891f15-a29e-4a01-9ff5-d739cfc171f9',
    'polygon:weth',
    'Wrapped Ether',
    18,
    '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
    UnderlyingAsset['polygon:weth'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    '0fb0aecf-c5d1-4c42-a96b-04ddbf45c99c',
    'polygon:wbtc',
    'Wrapped BTC',
    8,
    '0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6',
    UnderlyingAsset['polygon:wbtc'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    'f475d400-7f64-48c3-883a-74af83532c6d',
    'polygon:sand',
    'SAND',
    18,
    '0xbbba073c31bf03b8acf7c28ef0738decf3695683',
    UnderlyingAsset['polygon:sand'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    '58f55267-993e-4773-8c5d-873fa0260f0b',
    'polygon:dai',
    'Dai Stablecoin',
    18,
    '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063',
    UnderlyingAsset['polygon:dai'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    '98b5b13b-d5aa-45a3-b5b2-a5df2ee3c8ab',
    'polygon:woo',
    'Wootrade Network',
    18,
    '0x1b815d120b3ef02039ee11dc2d33de7aa4a8c603',
    UnderlyingAsset['polygon:woo'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    '8adaf6c2-34b3-45c1-9483-355e276eeac2',
    'polygon:aave',
    'Aave',
    18,
    '0xd6df932a45c0f255f85145f286ea0b292b21c90b',
    UnderlyingAsset['polygon:aave'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    '94e3986a-71da-4af8-abe9-ab2d0472dfe3',
    'polygon:link',
    'ChainLink Token',
    18,
    '0xb0897686c545045afc77cf20ec7a532e3120e0f1',
    UnderlyingAsset['polygon:link'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    '2cc67591-9f69-4a42-950f-22a996e63b9a',
    'polygon:tusd',
    'TrueUSD',
    18,
    '0x2e1ad108ff1d8c782fcbbb89aad783ac49586756',
    UnderlyingAsset['polygon:tusd'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    'd137313c-b6da-4ff7-806e-fefc10a931d5',
    'polygon:cel',
    'Celsius',
    4,
    '0xd85d1e945766fea5eda9103f918bd915fbca63e6',
    UnderlyingAsset['polygon:cel'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    '95b52504-fb5c-44fa-8546-91384daa55f6',
    'polygon:busd',
    'BUSD Token',
    18,
    '0x9c9e5fd8bbc25984b178fdce6117defa39d2db39',
    UnderlyingAsset['polygon:busd'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    '467391b7-65a3-48a4-88da-96e024f553ac',
    'polygon:frax',
    'Frax',
    18,
    '0x45c32fa6df82ead1e2ef74d17b76547eddfaff89',
    UnderlyingAsset['polygon:frax'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    '76c72a22-c2f9-41d3-afa5-b90bdefe95f9',
    'polygon:crv',
    'CRV',
    18,
    '0x172370d5cd63279efa6d502dab29171933a610af',
    UnderlyingAsset['polygon:crv'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    'f2f0f5f0-df62-4add-9bcf-e0b0f5d19921',
    'polygon:uni',
    'Uniswap',
    18,
    '0xb33eaad8d922b1083446dc23f610c2567fb5180f',
    UnderlyingAsset['polygon:uni'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    '94a75f8e-cd58-4efa-a08d-7611abe5ca48',
    'polygon:fcd',
    'FreshCut Diamond',
    18,
    '0xf78610d0a197842bf98ca45254897edd13c5d182',
    UnderlyingAsset['polygon:fcd'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    '4f77f9a1-8a58-48b6-8b3c-51ea8c94570c',
    'polygon:ape',
    'ApeCoin',
    18,
    '0xb7b31a6bc18e48888545ce79e83e06003be70930',
    UnderlyingAsset['polygon:ape'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    '79c30aa5-9c03-40f7-aacf-8067643b96e2',
    'polygon:srm',
    'Serum',
    6,
    '0x6bf2eb299e51fc5df30dec81d9445dde70e3f185',
    UnderlyingAsset['polygon:srm'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    '5589b2d1-252e-4948-9252-268ed9e38d2f',
    'polygon:fly',
    'Flycoin',
    18,
    '0x486ffaf06a681bf22b5209e9ffce722662a60e8c',
    UnderlyingAsset['polygon:fly'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    'a6824efa-ecd7-4d19-ab8d-6dc7de06e35b',
    'polygon:gfc',
    'Gcoin',
    18,
    '0x071ac29d569a47ebffb9e57517f855cb577dcc4c',
    UnderlyingAsset['polygon:gfc'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    '5b3642ed-5260-4c5e-9934-b2c3ddf31d21',
    'polygon:rbw',
    'Rainbow Token',
    18,
    '0x431cd3c9ac9fc73644bf68bf5691f4b83f9e104f',
    UnderlyingAsset['polygon:rbw'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    '35fa22f7-6024-4dc0-ada4-dda635b9db91',
    'polygon:zed',
    'ZED RUN',
    18,
    '0x5ec03c1f7fa7ff05ec476d19e34a22eddb48acdc',
    UnderlyingAsset['polygon:zed'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    'adfb6158-a9c9-47eb-871b-fa8a9cc5c57e',
    'polygon:vext',
    'Veloce',
    18,
    '0x27842334c55c01ddfe81bf687425f906816c5141',
    UnderlyingAsset['polygon:vext'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    '674c2d16-1ef2-4f06-8d04-9dd743013c28',
    'polygon:sushi',
    'Sushi',
    18,
    '0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a',
    UnderlyingAsset['polygon:sushi'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    'c0c8d8fa-c382-4970-9d66-1dc21b8b3ee7',
    'polygon:weth-pos',
    'Wrapped Ether (Wormhole)',
    18,
    '0x11cd37bb86f65419713f30673a480ea33c826872',
    UnderlyingAsset['polygon:weth'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    '787887a9-b81f-4de5-b053-06a281afe27e',
    'polygon:wmatic',
    'Wrapped Matic',
    18,
    '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
    UnderlyingAsset['polygon:wmatic'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    '9a835013-7099-467c-857f-75dadca5faf8',
    'polygon:1inch-wormhole',
    '1INCH (Wormhole)',
    18,
    '0x78cabc14b13de601d2b4bfdc608c8ff6896c6e59',
    UnderlyingAsset['polygon:1inch'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    '8705adb8-3c88-4bd0-829b-44d65a511e8f',
    'polygon:comp-wormhole',
    'Compound (Wormhole)',
    18,
    '0x5708971abcd554c3bb92d77cc796ecdd619d2344',
    UnderlyingAsset['polygon:comp'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    '11feac14-8aa6-4afa-8a0a-11305cbecaf3',
    'polygon:sol-wormhole',
    'Wrapped SOL (Wormhole)',
    9,
    '0xd93f7e271cb87c23aaa73edc008a79646d1f9912',
    UnderlyingAsset['polygon:sol'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    'cb9d9f02-9eb6-426d-866a-7287892d2ed5',
    'polygon:sushi-wormhole',
    'Sushi (Wormhole)',
    18,
    '0x39ecfc5941dfb0bf9fede32ba1a8a2a36b0b9d7b',
    UnderlyingAsset['polygon:sushi'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    'a5835e10-3ed0-4827-8636-fcb002e84791',
    'polygon:wavax-wormhole',
    'Wrapped AVAX (wormhole)',
    18,
    '0x7bb11e7f8b10e9e571e5d8eace04735fdfb2358a',
    UnderlyingAsset['polygon:wavax'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    'a0e1824a-6a0e-4cc7-8917-d0ab0b5e4ffb',
    'polygon:wbnb-wormhole',
    'Wrapped BNB (Wormhole) ',
    18,
    '0xecdcb5b88f8e3c15f95c720c51c71c9e2080525d',
    UnderlyingAsset['polygon:wbnb'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    'c7f68740-c8ba-4481-a33e-ac7e8824216f',
    'polygon:wftm-wormhole',
    'Wrapped FTM (Wormhole)',
    18,
    '0x3726831304d77f585f1aca9d9841cc3ef80daa62',
    UnderlyingAsset['polygon:wftm'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    '43411260-a85c-41eb-b98d-6bf1709597bc',
    'polygon:yfi-wormhole',
    'Wrapped YFI (Wormhole)',
    18,
    '0x100c0f661f56b9b1905b6bdd3fa4604eae2ddab4',
    UnderlyingAsset['polygon:yfi'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    'd756367f-5a54-46d3-8513-e9e26974e11d',
    'polygon:wbtc-wormhole',
    'Wrapped BTC (Wormhole)',
    8,
    '0x5d49c278340655b56609fdf8976eb0612af3a0c3',
    UnderlyingAsset['polygon:wbtc'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    '8d759e07-43d3-4611-8a0d-f3bb0f6e7dee',
    'polygon:vcnt',
    'ViciCoin',
    18,
    '0x8a16d4bf8a0a716017e8d2262c4ac32927797a2f',
    UnderlyingAsset['polygon:vcnt'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    '717b0d81-bdd8-4a42-8634-d9fe5a1f3577',
    'polygon:orb',
    'OrbCity (ORB)',
    18,
    '0x20c750c57c3bc5145af4b7a33d4fb66a8e79fe05',
    UnderlyingAsset['polygon:orb'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    '9d6bc29a-c2b9-4bd5-be25-2dce6de261c6',
    'polygon:route',
    'Route (ROUTE)',
    18,
    '0x16eccfdbb4ee1a85a33f3a9b21175cd7ae753db4',
    UnderlyingAsset['polygon:route'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    'a09ea578-80d1-4b09-9004-1eb49bd70366',
    'polygon:sbc',
    'Stable Coin',
    18,
    '0xfdcc3dd6671eab0709a4c0f3f53de9a333d80798',
    UnderlyingAsset['polygon:sbc'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    'c1fda2ae-f4f1-4c39-8d87-71b224018073',
    'polygon:xsgd',
    'XSGD',
    6,
    '0xdc3326e71d45186f113a2f448984ca0e8d201995',
    UnderlyingAsset['polygon:xsgd'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    '59796c49-5253-494b-ba9a-718872df0f37',
    'polygon:dimo',
    'Dimo',
    18,
    '0xe261d618a959afffd53168cd07d12e37b26761db',
    UnderlyingAsset['polygon:dimo'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    '0e72e810-f43a-409e-b7f2-d264ac54d240',
    'polygon:bcut',
    'bitsCrunch Token',
    18,
    '0x3fb83a9a2c4408909c058b0bfe5b4823f54fafe2',
    UnderlyingAsset['polygon:bcut'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    '0e7eaee4-55f9-42f0-bee1-3dfa04082fe5',
    'polygon:pme',
    'PME',
    0,
    '0xe94cdf7da562b5fc67100a75293e170ff67bb7eb',
    UnderlyingAsset['polygon:pme'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    '350ff415-7df8-4149-8e18-1b85911055ab',
    'polygon:dipe',
    'DIPE',
    6,
    '0x5e749d596d2a4cf1e9aa48fbba5843ccd9b7994d',
    UnderlyingAsset['polygon:dipe'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    '74184b74-f8fb-44ea-a444-64646488eb0b',
    'polygon:lif3',
    'LIF3',
    18,
    '0x110b25d2b21ee73eb401f3ae7833f7072912a0bf',
    UnderlyingAsset['polygon:lif3'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    'b9c251ed-0002-414e-b0af-bb8a5073a3dd',
    'polygon:l3usd',
    'L3USD',
    18,
    '0x2c2d8a078b33bf7782a16acce2c5ba6653a90d5f',
    UnderlyingAsset['polygon:l3usd'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    '3452066a-aabf-43b7-9e5d-22f543cc4ac5',
    'polygon:moca',
    'Moca',
    18,
    '0xf944e35f95e819e752f3ccb5faf40957d311e8c5',
    UnderlyingAsset['polygon:moca'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    'ab8ea009-a705-4695-b52b-c7b154a2e1f9',
    'polygon:mask',
    'Mask Network',
    18,
    '0x2b9e7ccdf0f4e5b24757c1e1a80e311e34cb10c7',
    UnderlyingAsset['polygon:mask'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    'a5b61778-bdbb-47f8-81c2-7a22ac0bb6be',
    'polygon:nexo',
    'Nexo',
    18,
    '0x41b3966b4ff7b427969ddf5da3627d6aeae9a48e',
    UnderlyingAsset['polygon:nexo'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    'a7cddd2c-fabc-4ad9-98d5-4f2ef6db9ce5',
    'polygon:om',
    'MANTRA DAO',
    18,
    '0xc3ec80343d2bae2f8e680fdadde7c17e71e114ea',
    UnderlyingAsset['polygon:om'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    'e6560bbc-a35a-4c51-8ce1-62101c9dce9d',
    'polygon:pyr',
    'PYR Token',
    18,
    '0x430ef9263e76dae63c84292c3409d61c598e9682',
    UnderlyingAsset['polygon:pyr'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    'a43ec494-4876-4957-883c-3d382cb52022',
    'polygon:renbtc',
    'renBTC',
    8,
    '0xdbf31df14b66535af65aac99c32e9ea844e14501',
    UnderlyingAsset['polygon:renbtc'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    'e7d6568e-696c-4482-8dbf-9c0bb2364978',
    'polygon:req',
    'Request',
    18,
    '0xb25e20de2f2ebb4cffd4d16a55c7b395e8a94762',
    UnderlyingAsset['polygon:req'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    'bce463f5-4197-405f-b837-47ffa9b61c51',
    'polygon:rndr',
    'Render Token',
    18,
    '0x61299774020da444af134c82fa83e3810b309991',
    UnderlyingAsset['polygon:rndr'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    'dc83a3b6-a25a-47af-b2ea-9473ad9111b8',
    'polygon:snx',
    'Synthetix Network Token (PoS)',
    18,
    '0x50b728d8d964fd00c2d0aad81718b71311fef68a',
    UnderlyingAsset['polygon:snx'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    '8bb3b0dc-c798-468d-a9ab-46f6a2b1b856',
    'polygon:trb',
    'Tellor Tributes',
    18,
    '0xe3322702bedaaed36cddab233360b939775ae5f1',
    UnderlyingAsset['polygon:trb'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    'ba371fdd-ee5c-48e1-bee5-8dcc485b3d35',
    'polygon:ali',
    'Artificial Liquid Intelligence Token',
    18,
    '0xbfc70507384047aa74c29cdc8c5cb88d0f7213ac',
    UnderlyingAsset['polygon:ali'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    'ce76663a-0d44-42b6-a2c2-c265adae38ad',
    'polygon:bal',
    'Balancer',
    18,
    '0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3',
    UnderlyingAsset['polygon:bal'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    '15618ee0-be3d-4ae3-9ce7-7dff7aa624b1',
    'polygon:elon',
    'Dogelon',
    18,
    '0xe0339c80ffde91f3e20494df88d4206d86024cdf',
    UnderlyingAsset['polygon:elon'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    '537bfc3a-161f-47c7-bd11-faf3449ff840',
    'polygon:hex',
    'HEX',
    8,
    '0x23d29d30e35c5e8d321e1dc9a8a61bfd846d4c5c',
    UnderlyingAsset['polygon:hex'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    'dd4a7160-9dd1-4216-a272-10e88f27266a',
    'polygon:iotx',
    'IoTeX Network',
    18,
    '0xf6372cdb9c1d3674e83842e3800f2a62ac9f3c66',
    UnderlyingAsset['polygon:iotx'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    '354c16d3-964e-4bc7-beb8-a3124e2d924a',
    'polygon:agix',
    'SingularityNET Token',
    18,
    '0x190eb8a183d22a4bdf278c6791b152228857c033',
    UnderlyingAsset['polygon:agix'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    'd04c6fdb-9963-423a-ada1-5d8ce9074c16',
    'polygon:avax',
    'Avalanche Token',
    18,
    '0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b',
    UnderlyingAsset['polygon:avax'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    '236cbc31-69fc-4ac6-875f-465cba0525d1',
    'polygon:band',
    'BandToken',
    18,
    '0xa8b1e0764f85f53dfe21760e8afe5446d82606ac',
    UnderlyingAsset['polygon:band'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    '7d6d316a-acd0-4c06-84eb-7a9baeee26e0',
    'polygon:blz',
    'Bluzelle',
    18,
    '0x438b28c5aa5f00a817b7def7ce2fb3d5d1970974',
    UnderlyingAsset['polygon:blz'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    '166becd4-c81d-44c9-8803-9741eb5ea73d',
    'polygon:bnb',
    'BNB',
    18,
    '0x3ba4c387f786bfee076a58914f5bd38d668b42c3',
    UnderlyingAsset['polygon:bnb'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    '23aa9547-505f-4031-a411-77f0b16a33ba',
    'polygon:bnt',
    'Bancor',
    18,
    '0xc26d47d5c33ac71ac5cf9f776d63ba292a4f7842',
    UnderlyingAsset['polygon:bnt'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    '859b986a-87e0-40a4-95ab-776a9b12e7a4',
    'polygon:chz',
    'chiliZ',
    18,
    '0xf1938ce12400f9a761084e7a80d37e732a4da056',
    UnderlyingAsset['polygon:chz'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    'fae58013-619f-42f1-ba1a-3f9c42f9446f',
    'polygon:enj',
    'EnjinCoin',
    18,
    '0x7ec26842f195c852fa843bb9f6d8b583a274a157',
    UnderlyingAsset['polygon:enj'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    '8177a473-e9d5-42a6-bd6e-4618e60635aa',
    'polygon:fet',
    'Fetch',
    18,
    '0x7583feddbcefa813dc18259940f76a02710a8905',
    UnderlyingAsset['polygon:fet'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    '83b325c1-3c0d-4bdd-a484-fce000669275',
    'polygon:forth',
    'Ampleforth Governance',
    18,
    '0x5ecba59dacc1adc5bdea35f38a732823fc3de977',
    UnderlyingAsset['polygon:forth'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    'ccc56956-2b75-4f81-b66c-85675a9ff8c8',
    'polygon:glm',
    'Golem Network Token',
    18,
    '0x0b220b82f3ea3b7f6d9a1d8ab58930c064a2b5bf',
    UnderlyingAsset['polygon:glm'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    '07b3747b-5a16-4cbc-95c6-47c636c62cc8',
    'polygon:gno',
    'Gnosis',
    18,
    '0x5ffd62d3c3ee2e81c00a7b9079fb248e7df024a8',
    UnderlyingAsset['polygon:gno'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    '828af6bd-3837-444b-8c99-931ec3c543be',
    'polygon:gohm',
    'Governance OHM',
    18,
    '0xd8ca34fd379d9ca3c6ee3b3905678320f5b45195',
    UnderlyingAsset['polygon:gohm'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    '255126e3-d3bf-4000-9aa7-21c91dca5618',
    'polygon:gtc',
    'Gitcoin (PoS)',
    18,
    '0xdb95f9188479575f3f718a245eca1b3bf74567ec',
    UnderlyingAsset['polygon:gtc'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    '0bddadf3-9817-416b-848c-3d8a08ecc151',
    'polygon:gusd',
    'Gemini dollar',
    2,
    '0xc8a94a3d3d2dabc3c1caffffdca6a7543c3e3e65',
    UnderlyingAsset['polygon:gusd'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    '0942e4bb-540a-4fe9-a5ff-d5783fa773c9',
    'polygon:hot',
    'HoloToken',
    18,
    '0x0c51f415cf478f8d08c246a6c6ee180c5dc3a012',
    UnderlyingAsset['polygon:hot'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    '0f874c14-89d7-4245-9caf-efbdd8c54e6f',
    'polygon:inj',
    'Injective Token',
    18,
    '0x4e8dc2149eac3f3def36b1c281ea466338249371',
    UnderlyingAsset['polygon:inj'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    '02481e9a-f70b-47aa-9bfd-2bbaf5494a04',
    'polygon:lit',
    'Litentry',
    18,
    '0xe6e320b7bb22018d6ca1f4d8cea1365ef5d25ced',
    UnderlyingAsset['polygon:lit'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    'f5547131-3a1c-4894-a47c-0d326241cfa6',
    'polygon:lrc',
    'LoopringCoin V2',
    18,
    '0x84e1670f61347cdaed56dcc736fb990fbb47ddc1',
    UnderlyingAsset['polygon:lrc'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    '5d78d4ee-aca2-4dff-ab61-b6e2a1bacb6d',
    'polygon:mana',
    'Decentraland',
    18,
    '0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4',
    UnderlyingAsset['polygon:mana'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    '56a8d850-e0b4-4bbf-961a-83325897d1df',
    'polygon:shib',
    'SHIBA INU (PoS)',
    18,
    '0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec',
    UnderlyingAsset['polygon:shib'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    '78a87c7d-4737-43a4-8e37-8f07c8cdea66',
    'polygon:sxp',
    'Swipe',
    18,
    '0x6abb753c1893194de4a83c6e8b4eadfc105fd5f5',
    UnderlyingAsset['polygon:sxp'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    '3a2da3aa-4a98-44c0-868a-97ca83524bb3',
    'polygon:grt',
    'Graph',
    18,
    '0x5fe2b58c013d7601147dcdd68c143a77499f5531',
    UnderlyingAsset['polygon:grt'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    'c8e2bd73-9626-4b5e-90e5-4e306856143a',
    'polygon:mkr',
    'Maker',
    18,
    '0x6f7c932e7684666c9fd1d44527765433e01ff61d',
    UnderlyingAsset['polygon:mkr'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    'b8c4076a-c515-468b-bb85-ed58c9de8a95',
    'polygon:oxt',
    'Orchid',
    18,
    '0x9880e3dda13c8e7d4804691a45160102d31f6060',
    UnderlyingAsset['polygon:oxt'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    '7792ccb8-7b2e-4d43-ae61-56d1ff1269d9',
    'polygon:pax',
    'Paxos Standard',
    18,
    '0x6f3b3286fd86d8b47ec737ceb3d0d354cc657b3e',
    UnderlyingAsset['polygon:pax'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    '6e6267d3-1d2a-4706-a4ee-bff08beb68fa',
    'polygon:paxg',
    'Paxos Gold',
    18,
    '0x553d3d295e0f695b9228246232edf400ed3560b5',
    UnderlyingAsset['polygon:paxg'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    '73ee12ec-dfde-4518-8cce-50e723c3f6c2',
    'polygon:powr',
    'PowerLedger',
    18,
    '0x0aab8dc887d34f00d50e19aee48371a941390d14',
    UnderlyingAsset['polygon:powr'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    'a582610a-38f2-43dd-a6ab-f3aa07ae9539',
    'polygon:super',
    'SuperFarm',
    18,
    '0xa1428174f516f527fafdd146b883bb4428682737',
    UnderlyingAsset['polygon:super'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    'f3c94882-3e72-486c-85ec-18de010ce640',
    'polygon:uma',
    'UMA Voting Token (v1)',
    18,
    '0x3066818837c5e6ed6601bd5a91b0762877a6b731',
    UnderlyingAsset['polygon:uma'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    'b0d13482-44ad-4e19-b2b1-2b60eb14feef',
    'polygon:zrx',
    'ZRX',
    18,
    '0x5559edb74751a0ede9dea4dc23aee72cca6be3d5',
    UnderlyingAsset['polygon:zrx'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    '8e4930ba-9e32-44bc-8a64-a7dd3e5011e8',
    'polygon:ont',
    'Poly-Peg Ontology Token',
    9,
    '0xd4814770065f634003a8d8d70b4743e0c3f334ad',
    UnderlyingAsset['polygon:ont'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    '0041071a-9ca3-44d5-b155-5b1d3b0e3f2a',
    'polygon:wrx',
    'Wazirx (PoS)',
    8,
    '0x72d6066f486bd0052eefb9114b66ae40e0a6031a',
    UnderlyingAsset['polygon:wrx'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    '8c61bb88-f103-4d42-bf5e-26826d4b7712',
    'polygon:voxel',
    'VOXEL Token',
    18,
    '0xd0258a3fd00f38aa8090dfee343f10a9d4d30d3f',
    UnderlyingAsset['polygon:voxel'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    'a50af4dd-dd29-4ce7-8917-0136444be9f9',
    'polygon:uft',
    'UniLend Finance Token',
    18,
    '0x5b4cf2c120a9702225814e18543ee658c5f8631e',
    UnderlyingAsset['polygon:uft'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    '1dedcd57-0934-41b4-b3f1-5c35450bb7be',
    'polygon:ooki',
    'Ooki Protocol',
    18,
    '0xcd150b1f528f326f5194c012f32eb30135c7c2c9',
    UnderlyingAsset['polygon:ooki'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    'b99c9850-2c2d-425a-b630-654e1072acc3',
    'polygon:swap',
    'TrustSwap Token',
    18,
    '0x3809dcdd5dde24b37abe64a5a339784c3323c44f',
    UnderlyingAsset['polygon:swap'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    'eac8b635-e692-40f7-bf22-0197ae5e11f8',
    'polygon:vanry',
    'Vanar Chain Token',
    18,
    '0x8de5b80a0c1b02fe4976851d030b36122dbb8624',
    UnderlyingAsset['polygon:vanry'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    'c78deaf2-08f3-4931-b833-c3d7a0b66b11',
    'polygon:npt',
    'NEOPIN Token',
    18,
    '0x306ee01a6ba3b4a8e993fa2c1adc7ea24462000c',
    UnderlyingAsset['polygon:npt'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    '10945fbd-71b8-49de-867a-1dcfed041755',
    'polygon:volt',
    'Volt Inu',
    9,
    '0x7f792db54b0e580cdc755178443f0430cf799aca',
    UnderlyingAsset['polygon:volt'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    '1fa10ba5-72b3-4a6c-bc4f-3035494b5ee5',
    'polygon:euroe',
    'EUROe Stablecoin',
    6,
    '0x820802fa8a99901f52e39acd21177b0be6ee2974',
    UnderlyingAsset['polygon:euroe'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    '30a182f6-6c47-4b7c-976a-dab1255064d3',
    'polygon:geod',
    'GEODNET',
    18,
    '0xac0f66379a6d7801d7726d5a943356a172549adb',
    UnderlyingAsset['polygon:geod'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    'fd5f6faf-0a77-4bf0-b678-8979f5addad2',
    'polygon:heth',
    'ETH Hop Token',
    18,
    '0x1fdeaf938267ca43388ed1fdb879eaf91e920c7a',
    UnderlyingAsset['polygon:heth'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    'fdf725b0-496a-42f5-a543-6a8cef20d2b4',
    'polygon:copm',
    'COP Minteo',
    18,
    '0x12050c705152931cfee3dd56c52fb09dea816c23',
    UnderlyingAsset['polygon:copm'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    'ef57b1c1-8fd0-4aba-8e20-b7a13fcf0921',
    'polygon:gmt',
    'GMT',
    8,
    '0x714db550b574b3e927af3d93e26127d15721d4c2',
    UnderlyingAsset['polygon:gmt'],
    POLYGON_TOKEN_FEATURES
  ),
  polygonErc20(
    '8aed2ce2-614d-41a1-b276-c26b651d3549',
    'polygon:uhu',
    'Uhu',
    18,
    '0x8d5482c83bb5b49e2b4b97bcf264342eac164c00',
    UnderlyingAsset['polygon:uhu'],
    POLYGON_TOKEN_FEATURES
  ),
  erc721(
    'dd743064-09e6-4028-9e61-ebf7c24ff40b',
    'erc721:polygontoken',
    'Generic Polygon ERC721',
    '0xerc721:polygontoken',
    GENERIC_TOKEN_FEATURES,
    '',
    '',
    Networks.main.polygon,
    KeyCurve.Secp256k1
  ),
  erc1155(
    '296f4fa6-d98b-4bee-801a-154892a97efe',
    'erc1155:polygontoken',
    'Generic Polygon ERC1155',
    '0xerc1155:polygontoken',
    GENERIC_TOKEN_FEATURES,
    '',
    '',
    Networks.main.polygon,
    KeyCurve.Secp256k1
  ),
  // testnet polygon tokens
  tpolygonErc20(
    '09ba76d0-331e-4b75-bb75-739285c3e03a',
    'tpolygon:derc20',
    'Polygon Test ERC20',
    18,
    '0xfe4f5145f6e09952a5ba9e956ed0c25e3fa4c7f1',
    UnderlyingAsset['tpolygon:derc20'],
    POLYGON_TOKEN_FEATURES
  ),
  tpolygonErc20(
    '9da1d62e-2220-4974-a9d9-191c34dfda4e',
    'tpolygon:link',
    'Polygon Test LINK',
    18,
    '0x326c977e6efc84e512bb9c30f76e30c160ed06fb',
    UnderlyingAsset['tpolygon:link'],
    POLYGON_TOKEN_FEATURES
  ),
  tpolygonErc20(
    'e1329794-1e16-4ea7-b7d6-82419b631ad9',
    'tpolygon:opm',
    'Polygon Test OPM',
    18,
    '0xe71b2e809598d8398222b890d7203808fa1d631f',
    UnderlyingAsset['tpolygon:opm'],
    POLYGON_TOKEN_FEATURES
  ),
  tpolygonErc20(
    'bc3dc605-8ab5-4512-abc7-8f5c215f87ae',
    'tpolygon:pme',
    'Token de PME Teste',
    0,
    '0x4659bc13c40a5012663b66102415262712303739',
    UnderlyingAsset['tpolygon:pme'],
    POLYGON_TOKEN_FEATURES
  ),
  tpolygonErc20(
    'eb0abdbf-63a7-45c8-8264-c0f64424c183',
    'tpolygon:usdc',
    'USD Coin',
    6,
    '0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582',
    UnderlyingAsset['tpolygon:usdc'],
    POLYGON_TOKEN_FEATURES
  ),
  tpolygonErc20(
    '6a24d660-0f7b-457e-bd5b-238ca34848ff',
    'tpolygon:xsgd',
    'XSGD',
    6,
    '0xd769410dc8772695a7f55a304d2125320a65c2a5',
    UnderlyingAsset['tpolygon:xsgd'],
    POLYGON_TOKEN_FEATURES
  ),
  tpolygonErc20(
    'aeaea7f4-d7dd-4a65-bc60-035f1129f43e',
    'tpolygon:usdt',
    'Tether USD',
    6,
    '0xbcf39d8616d15fd146dd5db4a86b4f244a9bc772',
    UnderlyingAsset['tpolygon:usdt'],
    POLYGON_TOKEN_FEATURES
  ),
  tpolygonErc20(
    '2262a12e-1154-4f66-9f52-c2554454d2a1',
    'tpolygon:terc18dp',
    'Test ERC Token 18 Decimals',
    18,
    '0xa94c028c2e138b8ce20406e7e0d0b1e6180cb31f',
    UnderlyingAsset['tpolygon:terc18dp'],
    POLYGON_TOKEN_FEATURES
  ),
  tpolygonErc20(
    '00bc4884-8c13-4b71-90b2-73e8ef4ebda4',
    'tpolygon:terc6dp',
    'Test ERC Token 6 Decimals',
    6,
    '0x46bada38d482c0973f45d307ebedd402be104e2d',
    UnderlyingAsset['tpolygon:terc6dp'],
    POLYGON_TOKEN_FEATURES
  ),
  terc721(
    '54d98031-6ebc-428a-b47c-b6ec7d6ad28a',
    'tpolygon:name',
    'Polygon Test NAME',
    '0xba4bfed386dac111866aa2369319f2c2daf454af',
    POLYGON_TOKEN_FEATURES,
    '',
    '',
    Networks.test.polygon,
    KeyCurve.Secp256k1
  ),
  terc721(
    '323f811c-d8b2-4363-8e4c-ebbf64160d4d',
    'terc721:polygontoken',
    'Generic Polygon ERC721',
    '0xterc721:polygontoken',
    GENERIC_TOKEN_FEATURES,
    '',
    '',
    Networks.test.polygon,
    KeyCurve.Secp256k1
  ),
  terc1155(
    '757c1444-887b-427a-95d4-ea87fa035473',
    'terc1155:polygontoken',
    'Generic Polygon ERC1155',
    '0xterc1155:polygontoken',
    GENERIC_TOKEN_FEATURES,
    '',
    '',
    Networks.test.polygon,
    KeyCurve.Secp256k1
  ),
  arbethErc20(
    '14a21e93-b123-4437-b99f-0489947d0379',
    'arbeth:link',
    'Chainlink Token',
    18,
    '0xf97f4df75117a78c1a5a0dbb814af92458539fb4',
    UnderlyingAsset['arbeth:link']
  ),
  arbethErc20(
    '0606676c-1e6b-488a-abe1-ab46c697c4b9',
    'arbeth:usdc',
    'USD Coin',
    6,
    '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
    UnderlyingAsset['arbeth:usdc']
  ),
  arbethErc20(
    '8deaaaf0-f81f-4697-bba6-77f4cfcd4efc',
    'arbeth:usdcv2',
    'USD Coin (native)',
    6,
    '0xaf88d065e77c8cc2239327c5edb3a432268e5831',
    UnderlyingAsset['arbeth:usdcv2'],
    TOKEN_FEATURES_WITH_FRANKFURT
  ),
  arbethErc20(
    'a49b04e6-5a1b-4d55-9187-4d41c41f8f1e',
    'arbeth:usdt',
    'Tether USD',
    6,
    '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
    UnderlyingAsset['arbeth:usdt']
  ),
  arbethErc20(
    '7dfbdd2b-efd6-45ab-90bd-9c3bc16d1397',
    'arbeth:arb',
    'Arbitrum',
    18,
    '0x912ce59144191c1204e64559fe8253a0e49e6548',
    UnderlyingAsset['arbeth:arb'],
    TOKEN_FEATURES_WITH_FRANKFURT
  ),
  arbethErc20(
    '65668b2e-6560-4749-a965-4d03eaeffaec',
    'arbeth:sqd',
    'Subsquid',
    18,
    '0x1337420ded5adb9980cfc35f8f2b054ea86f8ab1',
    UnderlyingAsset['arbeth:sqd']
  ),
  arbethErc20(
    '5a160655-9d96-4fdd-a362-224026b7c1e8',
    'arbeth:w',
    'Wormhole Token',
    18,
    '0xb0ffa8000886e57f86dd5264b9582b2ad87b2b91',
    UnderlyingAsset['arbeth:w']
  ),
  arbethErc20(
    'a7137632-43d0-4bfb-a0d4-252244d00ad6',
    'arbeth:comp',
    'Compound',
    18,
    '0x354a6da3fcde098f8389cad84b0182725c6c91de',
    UnderlyingAsset['arbeth:comp']
  ),
  arbethErc20(
    '12483bbb-b76c-4e77-ba8f-2a9fcb68ddd9',
    'arbeth:coti',
    'COTI Token',
    18,
    '0x6fe14d3cc2f7bddffba5cdb3bbe7467dd81ea101',
    UnderlyingAsset['arbeth:coti']
  ),
  arbethErc20(
    'af28367c-f1e3-4b4a-84ed-a23d71e72314',
    'arbeth:gno',
    'Gnosis Token',
    18,
    '0xa0b862f60edef4452f25b4160f177db44deb6cf1',
    UnderlyingAsset['arbeth:gno']
  ),
  arbethErc20(
    '45853143-95ab-4ebf-a9f9-493625216d15',
    'arbeth:gohm',
    'Governance OHM',
    18,
    '0x8d9ba570d6cb60c7e3e0f31343efe75ab8e65fb1',
    UnderlyingAsset['arbeth:gohm']
  ),
  arbethErc20(
    'e118fa19-9f3d-4297-8983-12d1e43a14ab',
    'arbeth:grt',
    'Graph Token',
    18,
    '0x9623063377ad1b27544c965ccd7342f7ea7e88c7',
    UnderlyingAsset['arbeth:grt']
  ),
  arbethErc20(
    '77d73c2e-f9be-4c66-96e3-76c4169d55d7',
    'arbeth:knc',
    'Kyber Network Crystal v2',
    18,
    '0xe4dddfe67e7164b0fe14e218d80dc4c08edc01cb',
    UnderlyingAsset['arbeth:knc']
  ),
  arbethErc20(
    '89917127-2f82-49fa-9f3c-737ca9f5be4a',
    'arbeth:myrc',
    'Blox MYRC',
    18,
    '0x3ed03e95dd894235090b3d4a49e0c3239edce59e',
    UnderlyingAsset['arbeth:myrc']
  ),
  arbethErc20(
    '230c1576-d591-4123-bac0-756eb9446fbd',
    'arbeth:trb',
    'Tellor Tributes',
    18,
    '0xd58d345fd9c82262e087d2d0607624b410d88242',
    UnderlyingAsset['arbeth:trb']
  ),
  arbethErc20(
    '4561ae66-de18-407b-966b-ae9681dec318',
    'arbeth:tusd',
    'TrueUSD',
    18,
    '0x4d15a3a2286d883af0aa1b3f21367843fac63e07',
    UnderlyingAsset['arbeth:tusd']
  ),
  arbethErc20(
    'eb721759-6da6-46c3-b0d2-a7e9d939c527',
    'arbeth:uma',
    'UMA Voting Token v1',
    18,
    '0xd693ec944a85eeca4247ec1c3b130dca9b0c3b22',
    UnderlyingAsset['arbeth:uma']
  ),
  arbethErc20(
    'df8223b3-f766-412a-bb59-769e4e47138d',
    'arbeth:uni',
    'Uniswap',
    18,
    '0xfa7f8980b0f1e64a2062791cc3b0871572f1f7f0',
    UnderlyingAsset['arbeth:uni']
  ),
  arbethErc20(
    'a87e11ae-51cd-406c-b87b-98abb6ae3386',
    'arbeth:weth',
    'Wrapped Ether',
    18,
    '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
    UnderlyingAsset['arbeth:weth']
  ),
  arbethErc20(
    '769735f8-8788-4d11-98ef-9723e04eee85',
    'arbeth:woo',
    'Woo',
    18,
    '0xcafcd85d8ca7ad1e1c6f82f651fa15e33aefd07b',
    UnderlyingAsset['arbeth:woo']
  ),
  arbethErc20(
    'c8dbdec7-124b-41a0-98a2-88949dbefa72',
    'arbeth:yfi',
    'yearn.finance',
    18,
    '0x82e3a8f066a6989666b031d916c43672085b1582',
    UnderlyingAsset['arbeth:yfi']
  ),
  arbethErc20(
    '5846be2e-06c5-4ce9-a630-f67a60cbc019',
    'arbeth:xsgd',
    'XSGD',
    6,
    '0xe333e7754a2dc1e020a162ecab019254b9dab653',
    UnderlyingAsset['arbeth:xsgd']
  ),
  arbethErc20(
    '32210989-1ce4-4175-b3ca-2acd95ba58ea',
    'arbeth:ztx',
    'ZepetoX',
    18,
    '0x1c43d05be7e5b54d506e3ddb6f0305e8a66cd04e',
    UnderlyingAsset['arbeth:ztx']
  ),
  arbethErc20(
    '0aa284a4-f7cc-4b9c-8564-c305e113e456',
    'arbeth:ldo',
    'LIDO DAO',
    18,
    '0x13ad51ed4f1b7e9dc168d8a00cb3f4ddd85efa60',
    UnderlyingAsset['arbeth:ldo']
  ),
  arbethErc20(
    '64d7ee44-d212-499f-bd2a-4e958f7583ed',
    'arbeth:egp',
    'Eigenpie',
    18,
    '0x7e7a7c916c19a45769f6bdaf91087f93c6c12f78',
    UnderlyingAsset['arbeth:egp']
  ),
  tarbethErc20(
    'd6a8869d-3da4-4b95-a9af-f2a059ca651f',
    'tarbeth:link',
    'Arbitrum Test LINK',
    18,
    '0x143e1dae4f018ff86051a01d44a1b49b13704056',
    UnderlyingAsset['tarbeth:link']
  ),
  tarbethErc20(
    '64477af2-65cb-44d2-a3fd-aed07cfe6bfd',
    'tarbeth:xsgd',
    'XSGD',
    6,
    '0x63681558c1b680e43bbcadc0ced21075854bba87',
    UnderlyingAsset['tarbeth:xsgd']
  ),
  opethErc20(
    '8d80fac6-4cbc-447c-b49b-4229cb8aa89d',
    'opeth:link',
    'Chainlink Token',
    18,
    '0x350a791bfc2c21f9ed5d10980dad2e2638ffa7f6',
    UnderlyingAsset['opeth:link']
  ),
  opethErc20(
    'ff6b3a6a-0cfa-419c-a815-31ea72dd7cb9',
    'opeth:usdc',
    'USD Coin',
    6,
    '0x7f5c764cbc14f9669b88837ca1490cca17c31607',
    UnderlyingAsset['opeth:usdc']
  ),
  opethErc20(
    '00abc58e-c1fb-4b9b-8b9a-d609071bb7be',
    'opeth:usdcv2',
    'USD Coin (native)',
    6,
    '0x0b2c639c533813f4aa9d7837caf62653d097ff85',
    UnderlyingAsset['opeth:usdcv2']
  ),
  opethErc20(
    '634d052e-8c1c-47ed-aded-d0a2399439b0',
    'opeth:usdt',
    'Tether USD',
    6,
    '0x94b008aa00579c1307b0ef2c499ad98a8ce58e58',
    UnderlyingAsset['opeth:usdt']
  ),
  opethErc20(
    '949c4e1f-83b8-4ca0-a6dc-72817a8a86e7',
    'opeth:op',
    'Optimism',
    18,
    '0x4200000000000000000000000000000000000042',
    UnderlyingAsset['opeth:op'],
    TOKEN_FEATURES_WITH_FRANKFURT
  ),
  opethErc20(
    '0d045493-8667-4d86-b5c2-d90d2dd38ae5',
    'opeth:exa',
    'Exactly Protocol',
    18,
    '0x1e925de1c68ef83bd98ee3e130ef14a50309c01b',
    UnderlyingAsset['opeth:exa']
  ),
  opethErc20(
    '555ec04f-1149-4f20-be11-2b97cfa4a833',
    'opeth:wld',
    'Worldcoin',
    18,
    '0xdc6ff44d5d932cbd77b52e5612ba0529dc6226f1',
    UnderlyingAsset['opeth:wld']
  ),
  opethErc20(
    'cceb569d-38fe-48f2-a7f5-8d2e414f80a0',
    'opeth:wct',
    'WalletConnect',
    18,
    '0xef4461891dfb3ac8572ccf7c794664a8dd927945',
    UnderlyingAsset['opeth:wct'],
    WCT_FEATURES
  ),
  topethErc20(
    '3c06bc28-1af2-4869-a632-bd081376fb46',
    'topeth:terc18dp',
    'Optimism Test ERC Token 18 Decimals',
    18,
    '0xe9df68a54bba438c8a6192e95f0f2c53ac93d997',
    UnderlyingAsset['topeth:terc18dp']
  ),
  topethErc20(
    'fa6bc0a9-49f8-4516-88b7-cad6a62f1dc2',
    'topeth:wct',
    'Wallet Connect',
    18,
    '0x75bb6dca2cd6f9a0189c478bbb8f7ee2fef07c78',
    UnderlyingAsset['topeth:wct'],
    WCT_FEATURES
  ),
  zkethErc20(
    '53f0e845-f415-44d3-8517-7565dc346390',
    'zketh:link',
    'Chainlink Token',
    18,
    '0x082fade8b84b18c441d506e1d3a43a387cc59d20',
    UnderlyingAsset['zketh:link']
  ),
  tzkethErc20(
    'ef49b6d1-b7a7-4c5c-8c53-43d22c15cc17',
    'tzketh:link',
    'zkSync Test LINK',
    18,
    '0xcccb29bac5ad81290383643c6fb38130cda9d881',
    UnderlyingAsset['tzketh:link']
  ),
  beraErc20(
    'ef833f4e-7617-4c6d-8a1f-1fef0dd1dd0e',
    'bera:bgt',
    'BGT Token',
    18,
    // TODO: the mainnet contract address is still not available, adding placeholder here
    '0xbda130737bdd9618301681329bf2e46a016ff9aa',
    UnderlyingAsset['bera:bgt']
  ),
  beraErc20(
    'ca86baf8-fcc6-40ff-9d65-08db513a131e',
    'bera:honey',
    'Honey Token',
    18,
    // TODO: the mainnet contract address is still not available, adding placeholder here, WIN-3597
    '0xbda130737bdd9618301681329bf2e46a016ff9ab',
    UnderlyingAsset['bera:honey']
  ),
  beraErc20(
    '31cdb51f-3bcc-489e-8b35-8e074169c573',
    'bera:usdc',
    'USDC Token',
    18,
    // TODO: the mainnet contract address is still not available, adding placeholder here, WIN-3597
    '0xbda130737bdd9618301681329bf2e46a016ff9a0',
    UnderlyingAsset['bera:usdc']
  ),
  tberaErc20(
    '24af5e18-ab4b-43e5-80db-0ddb9beb01b3',
    'tbera:bgt',
    'Bera Testnet BGT',
    18,
    '0xbda130737bdd9618301681329bf2e46a016ff9ad',
    UnderlyingAsset['tbera:bgt']
  ),
  tberaErc20(
    '5fb4ca32-0bce-4f29-bef3-aebff61ed00c',
    'tbera:honey',
    'Bera Testnet Honey',
    18,
    '0x0e4aaf1351de4c0264c5c7056ef3777b41bd8e03',
    UnderlyingAsset['tbera:honey']
  ),
  tberaErc20(
    '7319878e-96ca-4a97-bad8-b4b9d040b94b',
    'tbera:usdc',
    'Bera Testnet USDC',
    18,
    '0xd6d83af58a19cd14ef3cf6fe848c9a4d21e5727c',
    UnderlyingAsset['tbera:usdc']
  ),
  txrpToken(
    '8ef16158-1015-4a67-b6fe-db669c18ab2b',
    'txrp:tst-rP9jPyP5kyvFRb6ZiRghAGw5u8SGAmU4bd',
    'XRPL Testnet Token',
    15,
    'rP9jPyP5kyvFRb6ZiRghAGw5u8SGAmU4bd',
    'TST',
    'xrpl.org',
    UnderlyingAsset['txrp:tst-rP9jPyP5kyvFRb6ZiRghAGw5u8SGAmU4bd']
  ),
  txrpToken(
    '4c472d5f-0b9f-4086-9ff6-dcce51fce7fc',
    'txrp:rlusd',
    'RLUSD',
    96,
    'rQhWct2fv4Vc4KRjRgMrxa8xPN9Zx9iLKV',
    '524C555344000000000000000000000000000000',
    'ripple.com',
    UnderlyingAsset['txrp:rlusd']
  ),
  xrpToken(
    'a5e3e409-4cde-443d-9000-22bfc99ad456',
    'xrp:rlusd',
    'Ripple USD',
    96,
    'rMxCKbEDwqr76QuheSUMdEGf4B9xJ8m5De',
    '524C555344000000000000000000000000000000',
    'ripple.com',
    UnderlyingAsset['xrp:rlusd']
  ),
  suiToken(
    'f26941b7-1110-4aa7-a2bc-29807297a51c',
    'sui:deep',
    'Deepbook',
    6,
    '0xdeeb7a4662eec9f2f3def03fb937a663dddaa2e215b8078a284d026b7946c270',
    'deep',
    'DEEP',
    UnderlyingAsset['sui:deep'],
    SUI_TOKEN_FEATURES
  ),
  suiToken(
    'd868246d-a0e4-4ed3-ac9b-54ff45cf49c1',
    'sui:suins',
    'SuiNS',
    6,
    '0x5145494a5f5100e645e4b0aa950fa6b68f614e8c59e17bc5ded3495123a79178',
    'ns',
    'NS',
    UnderlyingAsset['sui:suins'],
    SUI_TOKEN_FEATURES
  ),
  suiToken(
    '6ba90645-42ba-47d8-ba09-8b00228bfe33',
    'sui:fdusd',
    'First Digital USD',
    6,
    '0xf16e6b723f242ec745dfd7634ad072c42d5c1d9ac9d62a39c381303eaa57693a',
    'fdusd',
    'FDUSD',
    UnderlyingAsset['sui:fdusd'],
    SUI_TOKEN_FEATURES
  ),
  suiToken(
    'e78941b5-9c34-4198-9c2c-cb9e27d4dde7',
    'sui:usdc',
    'USDC',
    6,
    '0xdba34672e30cb065b1f93e3ab55318768fd6fef66c15942c9f7cb846e2f900e7',
    'usdc',
    'USDC',
    UnderlyingAsset['sui:usdc'],
    SUI_TOKEN_FEATURES
  ),
  suiToken(
    'b3729af5-033b-495f-bab6-b5225c8f27e7',
    'sui:wusdc',
    'Wormhole USDC',
    6,
    '0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf',
    'wusdc',
    'WUSDC',
    UnderlyingAsset['sui:wusdc'],
    SUI_TOKEN_FEATURES
  ),
  suiToken(
    '97617c48-004c-4222-9eff-d77d10ce8443',
    'sui:sca',
    'Scallop',
    9,
    '0x7016aae72cfc67f2fadf55769c0a7dd54291a583b63051a5ed71081cce836ac6',
    'sca',
    'SCA',
    UnderlyingAsset['sui:sca'],
    SUI_TOKEN_FEATURES
  ),
  suiToken(
    'a4e5ab0e-5051-4ccc-a04c-c43ae3d9dcfa',
    'sui:times',
    'Darktimes',
    5,
    '0x46fbe54691b27d7abd2c9e5a01088913531f241b98f3c2351f8215e45cc17a4c',
    'times',
    'TIMES',
    UnderlyingAsset['sui:times'],
    SUI_TOKEN_FEATURES
  ),
  suiToken(
    'a7b13b4a-60b3-4167-b2db-5bbb46f8f603',
    'sui:fud',
    'Fud',
    5,
    '0x76cb819b01abed502bee8a702b4c2d547532c12f25001c9dea795a5e631c26f1',
    'fud',
    'FUD',
    UnderlyingAsset['sui:fud'],
    SUI_TOKEN_FEATURES
  ),
  suiToken(
    '0d35b697-01f6-4694-a5b1-283ecfd733ac',
    'sui:afsui',
    'afSUI',
    9,
    '0xf325ce1300e8dac124071d3152c5c5ee6174914f8bc2161e88329cf579246efc',
    'afsui',
    'AFSUI',
    UnderlyingAsset['sui:afsui'],
    SUI_TOKEN_FEATURES
  ),
  suiToken(
    'af864118-e9ec-47b2-896c-735f0530fb8f',
    'sui:navx',
    'navx',
    9,
    '0xa99b8952d4f7d947ea77fe0ecdcc9e5fc0bcab2841d6e2a5aa00c3044e5544b5',
    'navx',
    'NAVX',
    UnderlyingAsset['sui:navx'],
    SUI_TOKEN_FEATURES
  ),
  suiToken(
    '4f2ad1be-7c21-4e15-b8c6-d2329d6b7ffc',
    'sui:vsui',
    'vsui',
    9,
    '0x549e8b69270defbfafd4f94e17ec44cdbdd99820b33bda2278dea3b9a32d3f55',
    'vsui',
    'VSUI',
    UnderlyingAsset['sui:vsui'],
    SUI_TOKEN_FEATURES
  ),
  tsuiToken(
    '0b8a7919-c37e-4be8-8338-7fc13c6c875e',
    'tsui:deep',
    'Deepbook',
    6,
    '0x36dbef866a1d62bf7328989a10fb2f07d769f4ee587c0de4a0a256e57e0a58a8',
    'deep',
    'DEEP',
    UnderlyingAsset['tsui:deep'],
    SUI_TOKEN_FEATURES
  ),
  fiat('3f89b1f5-4ada-49c0-a613-15e484d42426', 'fiatusd', 'US Dollar', Networks.main.fiat, 2, UnderlyingAsset.USD),
  fiat(
    '8691cc4f-a425-4192-b6cb-3b0b6f646cbc',
    'tfiatusd',
    'Testnet US Dollar',
    Networks.test.fiat,
    2,
    UnderlyingAsset.USD
  ),
  fiat(
    '298702fc-1bea-4c8a-95d2-ca49c2895d8e',
    'fiateur',
    'European Union Euro',
    Networks.main.fiat,
    2,
    UnderlyingAsset.EUR
  ),
  fiat(
    '5d22d71c-49a7-42ff-8367-744b59b5fe88',
    'tfiateur',
    'Testnet European Union Euro',
    Networks.test.fiat,
    2,
    UnderlyingAsset.EUR
  ),
  fiat(
    '4718054b-894c-431c-9339-43aa1620acdd',
    'fiatgbp',
    'British Pound Sterling',
    Networks.main.fiat,
    2,
    UnderlyingAsset.GBP
  ),
  fiat(
    'c32e8edc-ec51-4084-9b81-3426605f13b9',
    'tfiatgbp',
    'Testnet British Pound Sterling',
    Networks.test.fiat,
    2,
    UnderlyingAsset.GBP
  ),
]);
