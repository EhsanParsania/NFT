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
    },
    bscTestnet: {
      url: process.env.RPC_URL_BSCTEST,
      accounts
    },
    bscMain: {
      url: process.env.RPC_URL_BSCMAIN,
      accounts
    },
    goerli: {
      url: process.env.RPC_URL_GOERLI,
      accounts
    }
  },
    }
  }
}
