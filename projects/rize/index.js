const addresses = require('../helper/coreAssets.json')
const axios = require("axios");
const BigNumber = require("bignumber.js");

async function tvl(_, _1, _2, {api}) {
    const result = await axios.get("https://referral.rizefi.io/tvl")
    const data = result.data
    const tvl ={};
    data.coins.forEach(coin =>{
        if (coin.coinType === "ethereum"){
            tvl[`ethereum:${addresses.null}`] = new BigNumber(coin.amount).times(1e18).toString();
        }else if(addresses.ethereum.hasOwnProperty(coin.coinType.toUpperCase())){
            console.log(`ethereum:${addresses.ethereum[coin.coinType.toUpperCase()]}`)
            tvl[`ethereum:${addresses.ethereum[coin.coinType.toUpperCase()]}`] = new BigNumber(coin.amount).times(1e6).toString();
        }
    })
    return tvl;
}

module.exports = {
    start: 19944102,
    ethereum: {
        tvl
    },
};