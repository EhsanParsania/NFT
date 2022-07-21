const EparsFactory = artifacts.require("./EparsFactory.sol");

module.exports = function (deployer) {
  deployer.deploy(EparsFactory);
};