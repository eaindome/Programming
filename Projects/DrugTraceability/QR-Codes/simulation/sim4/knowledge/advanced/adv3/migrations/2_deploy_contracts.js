const GoodsTransaction = artifacts.require("GoodsTransaction");
const UserContract = artifacts.require("UserContract");

module.exports = function (deployer) {
    deployer.deploy(GoodsTransaction);
    deployer.deploy(UserContract)
};
