const { ethers } = require("ethers");

async function getGasFee(provider) {
  const [fee, block] = await Promise.all([
    provider.send("eth_maxPriorityFeePerGas", []),
    provider.getBlock("latest"),
  ]);
  const tip = ethers.BigNumber.from(fee);
  const buffer = tip.div(100).mul(13);
  const maxPriorityFeePerGas = tip.add(buffer);
  const maxFeePerGas = block.baseFeePerGas
    ? block.baseFeePerGas.mul(2).add(maxPriorityFeePerGas)
    : maxPriorityFeePerGas;

  return { maxFeePerGas, maxPriorityFeePerGas };
}

module.exports = {
  getGasFee
}