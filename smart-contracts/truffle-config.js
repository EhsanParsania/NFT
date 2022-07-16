
// module.exports = {
//   networks: {
//     development: {
//       host: "127.0.0.1",
//       port: 8585,
//       network_id: "*" // Match any network id
//     }
//   },
//   solc: {
//     optimizer: {
//       enabled: true,
//       runs: 200
//     }
//   }
// }

const HDWalletProvider = require("@truffle/hdwallet-provider");
//
const fs = require("fs");
const mnemonic = fs.readFileSync(".secret").toString().trim();
const Key = "N32IGQG3M36B2IF37QIHHVI47UNP4P6EM5";
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8585,
      network_id: "*" // Match any network id

      // you can handle network id in helper js and metamask extention by 
      // name :  local network
      // id : '0x69' (  converted id will be 105 )
      // rpc url: 'HTTP://127.0.0.1:8585'
      // currency symbol : ETH
      
    },
    testnet: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://data-seed-prebsc-2-s3.binance.org:8545`
        ),
      network_id: 97,
      confirmations: 2,
      timeoutBlocks: 400,
      skipDryRun: true,
      networkCheckTimeout: 2000000,
    },
    bsc: {
      provider: () =>
        new HDWalletProvider(mnemonic, `https://bsc-dataseed1.binance.org`),
      network_id: 56,
      confirmations: 2,
      timeoutBlocks: 400,
      skipDryRun: true,
      networkCheckTimeout: 2000000,
    },
    rinkeby: {
      provider: function () {
        return new HDWalletProvider(
          mnemonic,
          `https://rinkeby.infura.io/v3/${`3c522dd0717747d4bc751d5f12356643`}`
        );
      },
      network_id: 4,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
      networkCheckTimeout: 20000,
    },
    // ,
    // develop: {
    //   host: "localhost",
    //   port: 7545,
    //   network_id: "*", // Match any network id
    // },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.9", // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {
        // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: true,
          runs: 200,
        },
        //  evmVersion: "byzantium"
      },
    },
  },
  plugins: ["truffle-plugin-verify"],
  api_keys: {
    testnet: Key,
    bsc: Key,
    bscscan: Key,
    etherscan: "2NHXYFI1ESQYW14PCDWVCJZRJN2B9ETBST",
  },
  // Truffle DB is currently disabled by default; to enable it, change enabled:
  // false to enabled: true. The default storage location can also be
  // overridden by specifying the adapter settings, as shown in the commented code below.
  //
  // NOTE: It is not possible to migrate your contracts to truffle DB and you should
  // make a backup of your artifacts to a safe location before enabling this feature.
  //
  // After you backed up your artifacts you can utilize db by running migrate as follows:
  // $ truffle migrate --reset --compile-all
  //
  // db: {
  // enabled: false,
  // host: "127.0.0.1",
  // adapter: {
  //   name: "sqlite",
  //   settings: {
  //     directory: ".db"
  //   }
  // }
  // }
};
