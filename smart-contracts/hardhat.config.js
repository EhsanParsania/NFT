require('@nomicfoundation/hardhat-toolbox')

module.exports = {
  solidity: '0.8.9',
  defaultNetwork: 'hardhat',

  networks: {
    hardhat: {
      chainId: 1337,
      allowUnlimitedContractSize: true
    }
  }
}
