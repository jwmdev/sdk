import { ABI } from '.'

export const LBQuoterABI: ABI[] = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_routerV2',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_factoryV1',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_factoryV2',
        type: 'address'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'bp',
        type: 'uint256'
      }
    ],
    name: 'BinHelper__BinStepOverflows',
    type: 'error'
  },
  {
    inputs: [],
    name: 'BinHelper__IdOverflows',
    type: 'error'
  },
  {
    inputs: [],
    name: 'JoeLibrary__AddressZero',
    type: 'error'
  },
  {
    inputs: [],
    name: 'JoeLibrary__IdenticalAddresses',
    type: 'error'
  },
  {
    inputs: [],
    name: 'JoeLibrary__InsufficientAmount',
    type: 'error'
  },
  {
    inputs: [],
    name: 'JoeLibrary__InsufficientLiquidity',
    type: 'error'
  },
  {
    inputs: [],
    name: 'LBQuoter_InvalidLength',
    type: 'error'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'x',
        type: 'uint256'
      },
      {
        internalType: 'int256',
        name: 'y',
        type: 'int256'
      }
    ],
    name: 'Math128x128__PowerUnderflow',
    type: 'error'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'prod1',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'denominator',
        type: 'uint256'
      }
    ],
    name: 'Math512Bits__MulDivOverflow',
    type: 'error'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'prod1',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'offset',
        type: 'uint256'
      }
    ],
    name: 'Math512Bits__MulShiftOverflow',
    type: 'error'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'offset',
        type: 'uint256'
      }
    ],
    name: 'Math512Bits__OffsetOverflows',
    type: 'error'
  },
  {
    inputs: [],
    name: 'factoryV1',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'factoryV2',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: '_route',
        type: 'address[]'
      },
      {
        internalType: 'uint256',
        name: '_amountIn',
        type: 'uint256'
      }
    ],
    name: 'findBestPathFromAmountIn',
    outputs: [
      {
        components: [
          {
            internalType: 'address[]',
            name: 'route',
            type: 'address[]'
          },
          {
            internalType: 'address[]',
            name: 'pairs',
            type: 'address[]'
          },
          {
            internalType: 'uint256[]',
            name: 'binSteps',
            type: 'uint256[]'
          },
          {
            internalType: 'uint256[]',
            name: 'amounts',
            type: 'uint256[]'
          },
          {
            internalType: 'uint256[]',
            name: 'virtualAmountsWithoutSlippage',
            type: 'uint256[]'
          },
          {
            internalType: 'uint256[]',
            name: 'fees',
            type: 'uint256[]'
          }
        ],
        internalType: 'struct LBQuoter.Quote',
        name: 'quote',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: '_route',
        type: 'address[]'
      },
      {
        internalType: 'uint256',
        name: '_amountOut',
        type: 'uint256'
      }
    ],
    name: 'findBestPathFromAmountOut',
    outputs: [
      {
        components: [
          {
            internalType: 'address[]',
            name: 'route',
            type: 'address[]'
          },
          {
            internalType: 'address[]',
            name: 'pairs',
            type: 'address[]'
          },
          {
            internalType: 'uint256[]',
            name: 'binSteps',
            type: 'uint256[]'
          },
          {
            internalType: 'uint256[]',
            name: 'amounts',
            type: 'uint256[]'
          },
          {
            internalType: 'uint256[]',
            name: 'virtualAmountsWithoutSlippage',
            type: 'uint256[]'
          },
          {
            internalType: 'uint256[]',
            name: 'fees',
            type: 'uint256[]'
          }
        ],
        internalType: 'struct LBQuoter.Quote',
        name: 'quote',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'routerV2',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  }
]
