const GoodsTransaction = artifacts.require("GoodsTransaction");

contract("GoodsTransaction", (accounts) => {
    const [userA, userB, userC, userD] = accounts;

    it("should create a transaction from userA to userB", async () => {
        const goodsTransactionInstance = await GoodsTransaction.deployed();
        await goodsTransactionInstance.makeTransaction(userB, "goodsA", { from: userA });

        const transactions = await goodsTransactionInstance.getGoodsHistory("goodsA");
        assert.equal(transactions.length, 1, "Transaction count should be 1");
        assert.equal(transactions[0].from, userA, "Sender should be userA");
        assert.equal(transactions[0].to, userB, "Recipient should be userB");
    });

    it("should create a transaction from userB to userC", async () => {
        const goodsTransactionInstance = await GoodsTransaction.deployed();
        await goodsTransactionInstance.makeTransaction(userC, "goodsA", { from: userB });

        const transactions = await goodsTransactionInstance.getGoodsHistory("goodsA");
        assert.equal(transactions.length, 2, "Transaction count should be 2");
        assert.equal(transactions[1].from, userB, "Sender should be userB");
        assert.equal(transactions[1].to, userC, "Recipient should be userC");
    });

    it("should create a transaction from userC to userD", async () => {
        const goodsTransactionInstance = await GoodsTransaction.deployed();
        await goodsTransactionInstance.makeTransaction(userD, "goodsA", { from: userC });

        const transactions = await goodsTransactionInstance.getGoodsHistory("goodsA");
        assert.equal(transactions.length, 3, "Transaction count should be 3");
        assert.equal(transactions[2].from, userC, "Sender should be userC");
        assert.equal(transactions[2].to, userD, "Recipient should be userD");
    });
});
