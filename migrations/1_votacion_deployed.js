const VotacionContract = artifacts.require("Votacion");

module.exports = function (deployer) {
    deployer.deploy(VotacionContract);
};