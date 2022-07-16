const EhpToken = artifacts.require("./EhpToken.sol");

module.exports = function (deployer) {
  deployer.deploy(EhpToken);
};