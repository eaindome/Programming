const GoodsTransaction = artifacts.require("GoodsTransaction");

module.exports = function (deployer) {
    deployer.deploy(GoodsTransaction);
};
