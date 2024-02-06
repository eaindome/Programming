const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = '';
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain {
    constructor(){
        this.chain = [this.createGenesisBlock];
    }

    createGenesisBlock(){
        return new Block(0, "02/06/2024", "Genesis Block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length -1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock)
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash != currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash != previousBlock.hash){
                return false;
            }
        }

        return true;
    }
}


let ekow = new Blockchain();
ekow.addBlock(new Block(1, "02/07/2024", { amount: 4 }));
ekow.addBlock(new Block(2, "02/08/2024", { amount: 10 }));

console.log('Is blockchain valid: ' + ekow.isChainValid());

// tampering with the blocks
ekow.chain[1].data = { amount: 100 };
ekow.chain[1].hash = ekow.chain[1].calculateHash();     // trying to be smart to create a new hash

console.log('Is blockchain valid: ' + ekow.isChainValid());
//console.log(JSON.stringify(ekow, null, 4));
