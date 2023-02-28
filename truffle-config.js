// const { MNEMONIC, PROJECT_ID } = process.env;
const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();

module.exports = {

  networks: {
     //Localhost :
     development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
     },

     goerli: {
      provider: function() {return new HDWalletProvider({mnemonic:{phrase:'${process.env.MNEMONIC}'},providerOrUrl:'https://goerli.infura.io/v3/${process.env.INFURA_ID}'})},
      network_id: 5,
    //   confirmations: 2,    // # of confirmations to wait between deployments. (default: 0)
    //   timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
    //   skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
     },

     mumbai: {
      provider: function() {return new HDWalletProvider({mnemonic:{phrase:'${process.env.MNEMONIC}'},providerOrUrl:'https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_ID}'})},
      network_id: 80001,
    //   confirmations: 2,    // # of confirmations to wait between deployments. (default: 0)
    //   timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
    //   skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
     },
  },

  // Set default mocha options here, use special reporters, etc.
  mocha: {

  },


  compilers: {
    solc: {
      version: "0.8.17",      // Fetch exact version from solc-bin (default: truffle's version)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: false,
          runs: 200
        },
       }
    }
  },
}
