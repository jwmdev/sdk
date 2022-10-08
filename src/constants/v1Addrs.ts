import { ChainId } from './external'

/**
 * DEX SDK
 */
export const FACTORY_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.FUJI]: '0xF5c7d9733e5f53abCC1695820c4818C59B457C2C',
  [ChainId.AVALANCHE]: '0x9Ad6C38BE94206cA50bb0d90783181662f0Cfa10'
}

export const JOE_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.FUJI]: '0x477Fd10Db0D80eAFb773cF623B258313C3739413',
  [ChainId.AVALANCHE]: '0x6e84a6216eA6dACC71eE8E6b0a5B7322EEbC0fDd'
}

export const MASTERCHEF_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.FUJI]: '0xEAA9637E54D4Da88d7A56E797C2EAa4950111033',
  [ChainId.AVALANCHE]: '0xd6a4F121CA35509aF06A0Be99093d08462f53052'
}

export const MASTERCHEF_V3_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.FUJI]: '0x47e4B09651D76609e902183c2315b0638fa8375E',
  [ChainId.AVALANCHE]: '0x188bED1968b795d5c9022F6a0bb5931Ac4c18F00'
}

export const BAR_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.FUJI]: '0x200BdB3Ed6bF347421329FdbF1813dE87F1A456a',
  [ChainId.AVALANCHE]: '0x57319d41F71E81F3c65F2a47CA4e001EbAFd4F33'
}

export const ZAP_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.FUJI]: '0x035CA9dB0e001808cB8CD20D1d1C592dF1250107',
  [ChainId.AVALANCHE]: '0x2C7B8e971c704371772eDaf16e0dB381A8D02027'
}

export const ROUTER_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.FUJI]: '0xd7f655E3376cE2D7A2b08fF01Eb3B1023191A901',
  [ChainId.AVALANCHE]: '0x60aE616a2155Ee3d9A68541Ba4544862310933d4'
}

export const MAKER_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.FUJI]: '0x6De03a4221d325Edc9707CEdeff9C150e99d6eC5',
  [ChainId.AVALANCHE]: '0x861726BFE27931A4E22a7277bDe6cb8432b65856'
}

export const ROLL_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.FUJI]: '0x41d5f5F66e4cEd197Ff273308A1c194E9E249f4F',
  [ChainId.AVALANCHE]: '0xacFF0fBf56bAeb9Ef677DE19ADED8F7A950BCb58'
}

export const BORINGHELPER_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.FUJI]: '0x832452DBa66232193C0fb525D5165a3A58b6811B',
  [ChainId.AVALANCHE]: '0x1dd4D86180EEe39ac4fB35ECa67CACF608Ab5741'
}

export const BORINGHELPER_MCV3_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.FUJI]: '0x87631c1Ec5312e030D4874231d8e0AFc545928A2',
  [ChainId.AVALANCHE]: '0xce63ECA0C8A2084C1BaEcE7737dB88f10c412c5E'
}

export const BORINGHELPER_BMCJ_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.FUJI]: '0x9B427cBE6cee480773Fb889ec7067B8b1541dA7f',
  [ChainId.AVALANCHE]: '0x80242b13F37eEB5B59fFe0e988d69133f1b19747'
}

export const BORINGTOKENSCANNER_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.FUJI]: '0xD28be693a573a26f50195213613EC893Ad5c4460',
  [ChainId.AVALANCHE]: '0x5cFcA5b2149A20A166508B28e5FCFA65c44c6B9c'
}

export const BORINGDASHBOARD_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.FUJI]: '0xD28be693a573a26f50195213613EC893Ad5c4460',
  [ChainId.AVALANCHE]: '0x1Af353148F2316487b5311Fcd522c037842D232c'
}

export const LOCKING_WRAPPER_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.FUJI]: '0x0000000000000000000000000000000000000000',
  [ChainId.AVALANCHE]: '0xDc3B37B5F0Fe5d3f8b8701a3F8d81A02EE8A1E1a'
}

export const FARMLENS_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.FUJI]: '0x0000000000000000000000000000000000000000',
  [ChainId.AVALANCHE]: '0x8A6FA314799b5E5553Cbce7fab3d9EAdEf5ee85a'
}

export const FARMLENSV2_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.FUJI]: '0x6B41A932D2A9f00476229733980D80EE11Dd1617',
  [ChainId.AVALANCHE]: '0xF16d25Eba0D8E51cEAF480141bAf577aE55bfdd2'
}

export const ROCKET_JOE_TOKEN_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.FUJI]: '0x2Dc95E863BE58a6EFfe9b5B5D8275537e83bfbE4',
  [ChainId.AVALANCHE]: '0x5483ce08659fABF0277f9314868Cc4f78687BD08'
}

export const LAUNCH_EVENT_LENS_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.FUJI]: '0xBeC83e09C4e461de91fD0F65AFbEd17046F3D9DD',
  [ChainId.AVALANCHE]: '0x039AA5d3FC07f6f265656793A8c437055b653d68'
}

export const ROCKET_JOE_STAKING_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.FUJI]: '0x1a1171b5faa9954A68F3679EF91E4dACd6D2c247',
  [ChainId.AVALANCHE]: '0x102D195C3eE8BF8A9A89d63FB3659432d3174d81'
}

export const STABLE_JOE_STAKING_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.FUJI]: '0x5Fd0A10CA299a02429418EAAcC7286482a5f075D',
  [ChainId.AVALANCHE]: '0x1a731B2299E22FbAC282E7094EdA41046343Cb51'
}

export const MONEY_MAKER_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.FUJI]: '0x6De03a4221d325Edc9707CEdeff9C150e99d6eC5',
  [ChainId.AVALANCHE]: '0x63C0CF90aE12190B388F9914531369aC1e4e4e47'
}

export const SJOE_REWARD_TOKEN: { [chainId in ChainId]: string } = {
  [ChainId.FUJI]: '0x950c6f4f97dd62bd3ca76f084663224fd2e6b555',
  [ChainId.AVALANCHE]: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E'
}

export const VEJOE_STAKING_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.FUJI]: '0x63064873AC2e94bbe82479265BD252417b34C462',
  [ChainId.AVALANCHE]: '0x25D85E17dD9e544F6E9F8D44F99602dbF5a97341'
}

export const VEJOE_TOKEN_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.FUJI]: '0x8043E85a15c7F4Ad58a24712Cf08C624B52fAa34',
  [ChainId.AVALANCHE]: '0x3cabf341943Bc8466245e4d6F1ae0f8D071a1456'
}

export const BOOSTED_MASTERCHEF_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.FUJI]: '0xEE7B7871755bCe3CD1B0aa1d01320Dd311b08279',
  [ChainId.AVALANCHE]: '0x4483f0b6e2F5486D06958C20f8C39A7aBe87bf8F'
}

export const INIT_CODE_HASH: { [chainId in ChainId]: string } = {
  [ChainId.FUJI]:
    '0x6c67ac67d0dad54be7b066edd9b4154fb5a0ab7d01232259b9ff26ebc1739ba2',
  [ChainId.AVALANCHE]:
    '0x0bbca9af0511ad1a1da383135cf3a8d2ac620e549ef9f6ae3a4c33c2fed0af91'
}