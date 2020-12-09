const SHA256 = require('crypto-js/sha256')
const {
    MerkleTree
} = require('merkletreejs')
const {
    BloomFilter
} = require('bloom-filters')
const {
    Transaction
} = require('./Transaction')

class Block {
    constructor(timestamp, transactions, previousHash = '') {
        this.previousHash = previousHash
        this.timestamp = timestamp
        this.transactions = transactions
        this.hash = this.calculateHash()
        this.nonce = 0
    }

    calculateHash() {
        return SHA256(this.timestamp + this.previousHash + JSON.stringify(this.transactions) + this.nonce).toString()
    }

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.nonce++
            this.hash = this.calculateHash()
        }
        let hashTransactions = this.transactions.map(x => Object.assign(new Transaction, x).calculateHash())
        this.bloomFilter = BloomFilter.from(hashTransactions, 0.05)
        this.merkleTree = new MerkleTree(hashTransactions)
        console.log('Block mined - ' + this.hash);
    }
    hasValidTransactions() {
        for (const tx of this.transactions) {
            if (!tx.isValid()) {
                return false
            }

        }
        return true

    }

    hasTransaction(transaction) {
        //first check if bloom filter has this transaction, if so, check if actually in block => False-Positive
        let txHash = transaction.calculateHash()
        if (this.bloomFilter.has(txHash)) {
            let root = this.merkleTree.getRoot()
            let proof = this.merkleTree.getProof(txHash)
            return this.merkleTree.verify(proof, txHash, root)
        }
        return false

    }

}

module.exports.Block = Block