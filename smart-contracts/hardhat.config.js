require('dotenv-flow').config()
require('@nomicfoundation/hardhat-toolbox')
require('@nomiclabs/hardhat-web3')
require('@nomiclabs/hardhat-etherscan')
require('hardhat-watcher')

let OWNER_PRIVATE_KEY
if (process.env.OWNER_PRIVATE_KEY && process.env.OWNER_PRIVATE_KEY.length === 64) {
  OWNER_PRIVATE_KEY = process.env.OWNER_PRIVATE_KEY
} else {
  try {
    const fs = require('fs')
    const secret = fs.readFileSync('.secret', 'utf8').trim()
    if (secret.length === 64) {
      OWNER_PRIVATE_KEY = secret
    }
  } catch (err) {
    // ignore if local
    const yargs = require('yargs/yargs')
    const argv = yargs(process.argv).argv
    if (argv.network && argv.network !== 'hardhat' && argv.network !== 'localhost') {
      console.error('ERROR: when using a non-local network, an owner wallet secret should be provided to run scripts as a hex value, either in a .secret file or in the OWNER_PRIVATE_KEY env variable.')
      process.exit(1)
    }
  }
}

const accounts = OWNER_PRIVATE_KEY ? [OWNER_PRIVATE_KEY] : undefined

module.exports = {
  solidity: '0.8.17',
  defaultNetwork: 'hardhat',

  networks: {
    hardhat: {
      chainId: 1337,
      allowUnlimitedContractSize: true
    },
    bscTestnet: {
      url: 'https://data-seed-prebsc-1-s1.binance.org:8545',
      accounts
    },
    bscMain: {
      url: 'process.env.RPC_URL_BSCMAIN',
      accounts
    },
    goerli: {
      url: 'process.env.RPC_URL_GOERLI',
      accounts
    }
  },
  etherscan: {
    apiKey: {
      bscTestnet: process.env.ETHERSCAN_APIKEY_BSCTEST,
      bscMain: process.env.ETHERSCAN_APIKEY_BSCMAIN,
      rinkeby: process.env.ETHERSCAN_APIKEY_RINKEBY
    }
  },
  watcher: {
    test: {
      tasks: [{ command: 'test', params: { testFiles: ['{path}'] } }],
      files: ['./test/**/*'],
      verbose: true
    }
  }
}
