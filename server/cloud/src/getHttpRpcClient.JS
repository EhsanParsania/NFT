const { HttpRpcClient } = require("@account-abstraction/sdk/dist/src/HttpRpcClient");

 async function getHttpRpcClient(
  provider,
  bundlerUrl,
  entryPointAddress
) {
  const chainId = await provider.getNetwork().then((net) => net.chainId);
  return new HttpRpcClient(bundlerUrl, entryPointAddress, chainId);
}

module.exports = {
  getHttpRpcClient
}