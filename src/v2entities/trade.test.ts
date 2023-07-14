import { Percent, Token, TokenAmount } from 'v1entities'
import { PairV2 } from './pair'
import { RouteV2 } from './route'
import { TradeV2 } from './trade'
import { parseUnits, utils } from '../../lib/ethers'
import { LBPairABI } from 'abis/ts'
import { ChainId } from '../constants'
import {
  ClientFactory,
  ProviderType,
  WalletClient
} from '@massalabs/massa-web3'
import { WMAS as _WMAS } from 'v1entities'
import JSBI from 'jsbi'
import { ILBPair } from 'contracts'

describe('TradeV2 entity', async () => {
  const DUSANET_URL = 'https://buildnet.massa.net/api/v2'
  const CHAIN_ID = ChainId.DUSANET
  const privateKey = process.env.PRIVATE_KEY
  if (!privateKey) throw new Error('Missing PRIVATE_KEY in .env file')
  const account = await WalletClient.getAccountFromSecretKey(privateKey)
  const client = await ClientFactory.createCustomClient(
    [
      { url: DUSANET_URL, type: ProviderType.PUBLIC },
      { url: DUSANET_URL, type: ProviderType.PRIVATE }
    ],
    true,
    account
  )

  // init tokens and route bases
  const lbPairAddress = '0x88F36a6B0e37E78d0Fb1d41B07A47BAD3D995453'
  const lbPairContract = new ILBPair(lbPairAddress, client)
  const USDC = new Token(
    ChainId.DUSANET,
    '0xB6076C93701D6a07266c31066B298AeC6dd65c2d',
    6,
    'USDC',
    'USD Coin'
  )
  const USDT = new Token(
    ChainId.DUSANET,
    '0xAb231A5744C8E6c45481754928cCfFFFD4aa0732',
    6,
    'USDT.e',
    'Tether USD'
  )
  const WMAS = _WMAS[ChainId.DUSANET]
  const BASES = [WMAS, USDC, USDT]

  // init input / output
  const inputToken = USDC
  const outputToken = WMAS

  // token pairs
  const allTokenPairs = PairV2.createAllTokenPairs(
    inputToken,
    outputToken,
    BASES
  )
  const allPairs = PairV2.initPairs(allTokenPairs) // console.log('allPairs', allPairs)

  // all routes
  const allRoutes = RouteV2.createAllRoutes(
    allPairs,
    inputToken,
    outputToken,
    2
  )

  // user input for exactIn trade
  const typedValueIn = '4'
  const typedValueInParsed = parseUnits(
    typedValueIn,
    inputToken.decimals
  ).toString()

  const amountIn = new TokenAmount(inputToken, JSBI.BigInt(typedValueInParsed))

  // user input for exactOut trade
  const typedValueOut = '0.2'
  const typedValueOutParsed = parseUnits(
    typedValueOut,
    outputToken.decimals
  ).toString()
  const amountOut = new TokenAmount(
    outputToken,
    JSBI.BigInt(typedValueOutParsed)
  )

  describe('TradeV2.getTradesExactIn()', () => {
    it('generates at least one trade', async () => {
      const trades = await TradeV2.getTradesExactIn(
        allRoutes,
        amountIn,
        outputToken,
        false,
        false,
        client,
        CHAIN_ID
      )

      expect(trades.length).toBeGreaterThan(0)
    })
  })
  describe('TradeV2.getTradesExactOut()', () => {
    it('generates at least one exact out trade', async () => {
      const trades = await TradeV2.getTradesExactOut(
        allRoutes,
        amountOut,
        inputToken,
        false,
        false,
        client,
        CHAIN_ID
      )

      expect(trades.length).toBeGreaterThan(0)
    })

    it('calculates price impact correctly', async () => {
      const reserves = await lbPairContract.getReservesAndId()
      const amountOut = new TokenAmount(
        outputToken,
        JSBI.BigInt(reserves.reserveX.toString())
      )

      const trades = await TradeV2.getTradesExactOut(
        allRoutes,
        amountOut,
        inputToken,
        false,
        false,
        client,
        CHAIN_ID
      )

      if (!trades[0]) {
        throw new Error('No trades')
      }

      expect(Number(trades[0].priceImpact.toFixed(2))).toBeGreaterThan(5)
    })
  })
  describe('TradeV2.chooseBestTrade()', () => {
    it('chooses the best trade among exactIn trades', async () => {
      const trades = await TradeV2.getTradesExactIn(
        allRoutes,
        amountIn,
        outputToken,
        false,
        false,
        client,
        CHAIN_ID
      )

      const isExactIn = true

      let maxOutputAmount = (trades[0] as TradeV2).outputAmount.raw

      trades.forEach((trade) => {
        if (trade) {
          if (JSBI.greaterThan(trade.outputAmount.raw, maxOutputAmount)) {
            maxOutputAmount = trade.outputAmount.raw
          }
        }
      })

      const bestTrade = TradeV2.chooseBestTrade(trades as TradeV2[], isExactIn)

      expect(
        JSBI.equal(maxOutputAmount, (bestTrade as TradeV2).outputAmount.raw)
      ).toBe(true)
    })
    it('chooses the best trade among exactOut trades', async () => {
      const trades = await TradeV2.getTradesExactOut(
        allRoutes,
        amountOut,
        inputToken,
        false,
        false,
        client,
        CHAIN_ID
      )

      const isExactIn = false

      let minInputAmount = (trades[0] as TradeV2).inputAmount.raw

      trades.forEach((trade) => {
        if (trade) {
          if (JSBI.lessThan(trade.inputAmount.raw, minInputAmount)) {
            minInputAmount = trade.inputAmount.raw
          }
        }
      })

      const bestTrade = TradeV2.chooseBestTrade(trades as TradeV2[], isExactIn)

      expect(
        JSBI.equal(minInputAmount, (bestTrade as TradeV2).inputAmount.raw)
      ).toBe(true)
    })
  })
  describe('TradeV2.getTradesExactIn() and TradeV2.getTradesExactIn()', () => {
    it('generates the same route for the same inputToken / outputToken', async () => {
      const tradesExactIn = await TradeV2.getTradesExactIn(
        allRoutes,
        amountIn,
        outputToken,
        false,
        false,
        client,
        CHAIN_ID
      )

      const tradesExactOut = await TradeV2.getTradesExactOut(
        allRoutes,
        amountOut,
        inputToken,
        false,
        false,
        client,
        CHAIN_ID
      )

      const isExactIn = true
      const bestTradeExactIn = TradeV2.chooseBestTrade(
        tradesExactIn as TradeV2[],
        isExactIn
      )
      const bestTradeExactOut = TradeV2.chooseBestTrade(
        tradesExactOut as TradeV2[],
        !isExactIn
      )

      expect((bestTradeExactIn as TradeV2).route.path.length).toBe(
        (bestTradeExactOut as TradeV2).route.path.length
      )

      if (bestTradeExactIn && bestTradeExactOut) {
        bestTradeExactIn.route.path.forEach((token, i) => {
          const otherRouteToken = bestTradeExactOut.route.path[i]
          expect(token.address).toBe(otherRouteToken.address)
        })
      }
    })
  })
  describe('TradeV2.swapCallParameters()', () => {
    it('generates swapExactTokensForNATIVE method', async () => {
      const isNativeOut = true

      const trades = await TradeV2.getTradesExactIn(
        allRoutes,
        amountIn,
        outputToken,
        false,
        isNativeOut,
        client,
        CHAIN_ID
      )

      const bestTrade = TradeV2.chooseBestTrade(trades as TradeV2[], true)

      const options = {
        allowedSlippage: new Percent(JSBI.BigInt(50), JSBI.BigInt(10000)),
        ttl: 1000,
        recipient: '0x0000000000000000000000000000000000000000'
      }
      expect(bestTrade?.swapCallParameters(options)?.methodName).toBe(
        'swapExactTokensForNATIVE'
      )
    })
    it('generates swapExactTokensForTokens method', async () => {
      const isNativeOut = false

      const trades = await TradeV2.getTradesExactIn(
        allRoutes,
        amountIn,
        outputToken,
        false,
        isNativeOut,
        client,
        CHAIN_ID
      )

      const bestTrade = TradeV2.chooseBestTrade(trades as TradeV2[], true)

      const options = {
        allowedSlippage: new Percent(JSBI.BigInt(50), JSBI.BigInt(10000)),
        ttl: 1000,
        recipient: '0x0000000000000000000000000000000000000000'
      }
      expect(bestTrade?.swapCallParameters(options)?.methodName).toBe(
        'swapExactTokensForTokens'
      )
    })
  })
})
