// Import du smart contract "Voting"
const Voting = artifacts.require("Voting");

module.exports = function (deployer) {
  deployer.deploy(Voting);  // Deployer le smart contract!
};
