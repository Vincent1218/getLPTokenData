import { getCreate2Address } from '@ethersproject/address'
import { keccak256, pack } from '@ethersproject/solidity'

//ACY
// var FACTORY_ADDRESS = '0xb43DD1c50377b6dbaEBa3DcBB2232a3964b22440'
// var INIT_CODE_HASH = '0xfbf3b88d6f337be529b00f1dc9bff44bb43fa3c6b5b7d58a2149e59ac5e0c4a8'

//Uniswap
var FACTORY_ADDRESS = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f'
var INIT_CODE_HASH = '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f'


console.log(
  getCreate2Address(
  FACTORY_ADDRESS,
  keccak256(['bytes'], [pack(['address', 'address'], ['0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48','0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'])]),
  INIT_CODE_HASH
))

// 0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc