// Import du smart contract "Storage"
const Voting = artifacts.require("Voting");

module.exports = function (deployer) {
  deployer.deploy(Voting);  // Deployer le smart contract!
};