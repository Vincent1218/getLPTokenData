// const axios = require('axios');
import axios from 'axios'
import { getCreate2Address } from '@ethersproject/address'
import { keccak256, pack } from '@ethersproject/solidity'
import tokenList from './TokenList.js';

//Constant

//ACY
// var FACTORY_ADDRESS = '0xb43DD1c50377b6dbaEBa3DcBB2232a3964b22440'
// var INIT_CODE_HASH = '0xfbf3b88d6f337be529b00f1dc9bff44bb43fa3c6b5b7d58a2149e59ac5e0c4a8'

//Uniswap
var FACTORY_ADDRESS = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f'
var INIT_CODE_HASH = '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f'
const uniswapURL = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2" ; // https://thegraph.com/explorer/subgraph/uniswap/uniswap-v2

//Graphql
const queryLP = async (id) =>{
    try {
        const result = await axios.post(
            uniswapURL,
            {
                query: `
                {
                  pairs (where:{id:"${id}"}){
                    id
                    token0 {
                      id
                      symbol
                    }
                    reserve0
                    token1 {
                      id
                      symbol
                    }
                    reserve1
                  }
                }                           
                `
            }
            );           
          return (result.data.data);
          // console.log ("Query result: \n", result.data.data);
    } catch (err){
        console.log(err);
    }
}

//Driver Program
for (let i = 0; i < tokenList.length; i++) { 
  for (let x = 0; x < tokenList.length; x++) { 
    if(i!==x){
      // get token Symbol
      const tokenA = tokenList[i].symbol;
      const tokenB = tokenList[x].symbol;
      // get token address and sort
      const tokenAAddress = tokenList[i].addressOnEth;
      const tokenBAddress = tokenList[x].addressOnEth;

      var tokens =  [tokenAAddress, tokenBAddress];
      tokens.sort()
  
      // generating LPaddress
      const LPaddress = (getCreate2Address(
                        FACTORY_ADDRESS,
                        keccak256(['bytes'], [pack(['address', 'address'], tokens)]),
                        INIT_CODE_HASH)).toLowerCase()
                  
      // sending query with LP address
      const LPdata = await queryLP(LPaddress);
      
      // visualising data
      console.log("Token A:" ,tokenA)
      console.log("Token B:" ,tokenB)
      
      if(LPdata.pairs[0]){
        console.log("x:y ratio", (LPdata.pairs[0].reserve0)/(LPdata.pairs[0].reserve1))
        console.log("k value", (LPdata.pairs[0].reserve0)*(LPdata.pairs[0].reserve1))
        console.log("Pool Data",LPdata.pairs[0])
      }
      else{
        console.log("Pair", tokenA, tokenB,"does not exist in uniswap")
      }
    }
  }
}
