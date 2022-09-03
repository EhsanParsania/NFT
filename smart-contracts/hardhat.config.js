require('dotenv-flow').config()
require('@nomicfoundation/hardhat-toolbox')
require('@nomiclabs/hardhat-etherscan')



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
