import {
  Args,
  bytesToStr,
  bytesToU256,
  bytesToU32,
  strToBytes,
  MAX_GAS_CALL
} from '@massalabs/massa-web3'
import { IERC20 } from './token'
import { maxGas } from './base'

const TOKEN_Y = strToBytes('TOKEN_Y')
const PAIR = strToBytes('PAIR')
const BIN_STEP = strToBytes('BIN_STEP')
const FLOOR_PER_BIN = strToBytes('FLOOR_PER_BIN')
const FLOOR_ID = strToBytes('FLOOR_ID')
const ROOF_ID = strToBytes('ROOF_ID')
const REBALANCE_PAUSED = strToBytes('REBALANCE_PAUSED')

const TAX_RECIPIENT = strToBytes('TAX_RECIPIENT')
const TAX_RATE = strToBytes('TAX_RATE')

export class IFloorToken extends IERC20 {
  // FLOOR FUNCTIONS
  async raiseRoof(nbBins: number) {
    const parameter = new Args().addU32(nbBins)
    const simulatedGas = await this.simulate('raiseRoof', parameter)
    return this.call({
      targetFunction: 'raiseRoof',
      parameter: parameter,
      maxGas: simulatedGas
    })
  }

  async reduceRoof(nbBins: number) {
    const parameter = new Args().addU32(nbBins)
    const simulatedGas = await this.simulate('reduceRoof', parameter)
    return this.call({
      targetFunction: 'reduceRoof',
      parameter,
      maxGas: simulatedGas
    })
  }

  async floorId(): Promise<number> {
    return this.client
      .publicApi()
      .getDatastoreEntries([{ address: this.address, key: FLOOR_ID }])
      .then((res) => {
        if (!res[0].candidate_value) throw new Error()
        return bytesToU32(res[0].candidate_value)
      })
  }

  async roofId(): Promise<number> {
    return this.client
      .publicApi()
      .getDatastoreEntries([{ address: this.address, key: ROOF_ID }])
      .then((res) => {
        if (!res[0].candidate_value) throw new Error()
        return bytesToU32(res[0].candidate_value)
      })
  }

  async pair(): Promise<string> {
    return this.client
      .publicApi()
      .getDatastoreEntries([{ address: this.address, key: PAIR }])
      .then((res) => {
        if (!res[0].candidate_value) throw new Error()
        return bytesToStr(res[0].candidate_value)
      })
  }

  async tokenY(): Promise<string> {
    return this.client
      .publicApi()
      .getDatastoreEntries([{ address: this.address, key: TOKEN_Y }])
      .then((res) => {
        if (!res[0].candidate_value) throw new Error()
        return bytesToStr(res[0].candidate_value)
      })
  }

  async binStep(): Promise<number> {
    return this.client
      .publicApi()
      .getDatastoreEntries([{ address: this.address, key: BIN_STEP }])
      .then((res) => {
        if (!res[0].candidate_value) throw new Error()
        return bytesToU32(res[0].candidate_value)
      })
  }

  async floorPerBin(): Promise<bigint> {
    return this.client
      .publicApi()
      .getDatastoreEntries([{ address: this.address, key: FLOOR_PER_BIN }])
      .then((res) => {
        if (!res[0].candidate_value) throw new Error()
        return bytesToU256(res[0].candidate_value)
      })
  }

  async floorPrice(): Promise<bigint> {
    return this.read({
      targetFunction: 'floorPrice',
      parameter: new Args(),
      maxGas
    }).then((res) => bytesToU256(res.returnValue))
  }

  async rebalancePaused(): Promise<boolean> {
    return this.client
      .publicApi()
      .getDatastoreEntries([{ address: this.address, key: REBALANCE_PAUSED }])
      .then((res) => {
        if (!res[0].candidate_value) throw new Error()
        return !!bytesToU32(res[0].candidate_value)
      })
  }

  async tokensInPair(): Promise<{ amountFloor: bigint; amountY: bigint }> {
    return this.read({
      targetFunction: 'tokensInPair',
      parameter: new Args(),
      maxGas
    }).then((res) => {
      const args = new Args(res.returnValue)
      return {
        amountFloor: args.nextU256(),
        amountY: args.nextU256()
      }
    })
  }

  async calculateNewFloorId(): Promise<number> {
    return this.read({
      targetFunction: 'calculateNewFloorId',
      parameter: new Args(),
      maxGas
    }).then((res) => bytesToU32(res.returnValue))
  }

  async rebalanceFloor(): Promise<string> {
    const simulatedGas = await this.simulate('rebalanceFloor', new Args())
    return this.call({
      targetFunction: 'rebalanceFloor',
      parameter: new Args(),
      maxGas: simulatedGas
    })
  }

  async pauseRebalance(): Promise<string> {
    return this.call({
      targetFunction: 'pauseRebalance',
      parameter: new Args(),
      maxGas
    })
  }

  async unpauseRebalance(): Promise<string> {
    return this.call({
      targetFunction: 'unpauseRebalance',
      parameter: new Args(),
      maxGas
    })
  }

  // TRANSFER TAX FUNCTIONS

  async taxRecipient(): Promise<string> {
    return this.client
      .publicApi()
      .getDatastoreEntries([{ address: this.address, key: TAX_RECIPIENT }])
      .then((res) => {
        if (!res[0].candidate_value) throw new Error()
        return bytesToStr(res[0].candidate_value)
      })
  }

  async taxRate(): Promise<bigint> {
    return this.client
      .publicApi()
      .getDatastoreEntries([{ address: this.address, key: TAX_RATE }])
      .then((res) => {
        if (!res[0].candidate_value) throw new Error()
        return bytesToU256(res[0].candidate_value)
      })
  }

  setTaxRate(taxRate: bigint): Promise<string> {
    return this.call({
      targetFunction: 'setTaxRate',
      parameter: new Args().addU256(taxRate),
      maxGas
    })
  }

  setTaxRecipient(taxRecipient: string): Promise<string> {
    return this.call({
      targetFunction: 'setTaxRecipient',
      parameter: new Args().addString(taxRecipient),
      maxGas
    })
  }

  // ESTIME GAS

  private async simulate(targetFunction: string, parameter: Args) {
    return this.read({
      targetFunction,
      parameter,
      maxGas: MAX_GAS_CALL
    })
      .then((res) => BigInt(res.info.gas_cost))
      .catch(() => MAX_GAS_CALL)
  }
}