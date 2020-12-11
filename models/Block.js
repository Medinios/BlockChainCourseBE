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
    constructor(previousHash = '', timestamp, transactions, nonce = 0) {
        this.previousHash = previousHash
        this.timestamp = timestamp
        this.transactions = transactions
        this.nonce = nonce
        this.hash = this.calculateHash()
    }

    calculateHash() {
        return SHA256(this.timestamp + this.previousHash + JSON.stringify(this.transactions) + this.nonce).toString()
    }
    initTransactionsHash() {
        this.hashTransactions = []
        for (let i = 0; i < this.transactions.length; i++) {
            this.hashTransactions.push(this.transactions[i].calculateHash())
        }
    }

    // initBloomFilter() {
    //     this.bloomFilter = BloomFilter.from(this.transactions.map(x => x.calculateHash()), 0.05)
    // }

    // initMerkleTree() {
    //     this.merkleTree = this.merkleTree = new MerkleTree(this.transactions.map(x => x.calculateHash()))
    // }
    initBloomFilter() {
        this.bloomFilter = BloomFilter.from(this.hashTransactions, 0.05)
    }

    initMerkleTree() {
        this.merkleTree = this.merkleTree = new MerkleTree(this.hashTransactions)
    }

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.nonce++
            this.hash = this.calculateHash()
        }
        this.initTransactionsHash()
        this.initBloomFilter()
        this.initMerkleTree()
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