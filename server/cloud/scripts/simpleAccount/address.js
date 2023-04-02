
const { getSimpleAccount } = require("../../src/getSimpleAccount");
const { ethers } = require("ethers");
// @ts-ignore
const config = require("../../config.json");

async function getNewAddress() {
  const provider = new ethers.providers.JsonRpcProvider(config.rpcUrl);
  const accountAPI = getSimpleAccount(
    provider,
    config.signingKey,
    config.entryPoint,
    config.simpleAccountFactory
  );
  const address = await accountAPI.getCounterFactualAddress();
  console.log(`SimpleAccount address: ${address}`);
  return address;
}

module.exports = {
  getNewAddress,
};
