const { getNewAddress } = require('./scripts/simpleAccount/address')
const { transferERC20 } = require('./scripts/simpleAccount/erc20Transfer')

Parse.Cloud.define("get-new-address", async (request) => {
    const result = await getNewAddress()
    console.log(result)
    return result
});

Parse.Cloud.define("transfer-erc20", async (request) => {
    const { token, to, amount } = request.params;
    console.log(token, to, amount)
    const result = await transferERC20(token, to, amount.toString())
    console.log(result)
    return result
});
