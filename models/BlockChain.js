const SHA256 = require('crypto-js/sha256')
const {
    format
} = require('morgan')
const {
    Block
} = require('./Block.js')
const {
    Transaction
} = require('./Transaction.js')

class BlockChain {
    constructor() {
        this.chain = []
        this.pendingTransaction = []
        this.difficulty = 2
        this.miningReward = 90
    }

    createGenesisBlock() {
        // constructor(previousHash = '', timestamp, transactions, nonce = 0)
        return new Block('Genesis block', '01/01/2009', [], 0)
    }
    getLatestBlock() {
        return this.chain[this.chain.length - 1]
    }

    miningPendingTransaction(miningRewardAddress) {
        if (this.pendingTransaction.length != 0) {
            const rewardTx = new Transaction(null, miningRewardAddress, this.miningReward)
            this.pendingTransaction.push(rewardTx)
            let block = new Block(this.getLatestBlock().hash, Date.now(), this.pendingTransaction, 0)
            block.mineBlock(this.difficulty)
            console.log('Block Successfully Mined')
            this.chain.push(block)
            this.pendingTransaction = []
        } else {
            console.log("There is nothing to mine...");
        }
    }

    addTransaction(transaction) {
        if (!transaction.fromAddress || !transaction.toAddress) {
            throw new Error('Transaction must include from and to address')
        }
        if (!transaction.isValid()) {
            throw new Error('Cannot add invalid transaction')
        }
        this.pendingTransaction.push(transaction)
    }

    getBalanceOfAddress(address) {
        let balance = 0
        for (const block of this.chain) {
            for (const trans of block.transactions) {
                if (trans.fromAddress === address) {
                    balance -= parseInt(trans.amount);
                }
                if (trans.toAddress === address) {
                    balance += parseInt(trans.amount);
                }
            }
        }
        return balance
    }

    getTransactionsOfAddress(address) {
        var txs = {
            received: [],
            sent: []
        }
        for (const block of this.chain) {
            for (const trans of block.transactions) {
                if (trans.fromAddress === address) {
                    txs.sent.push(trans)
                }
                if (trans.toAddress === address) {
                    txs.received.push(trans)
                }
            }
        }
        return txs
    }

    isChainValidate() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i]
            const previousBlock = this.chain[i - 1]

            if (!currentBlock.hasValidTransactions()) {
                return false
            }
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false
            }

        }
        return true
    }

    hasTransaction(transaction) {
        for (let i = 1; i < this.chain.length; i++) {
            const block = this.chain[i]
            var res = block.hasTransaction(transaction)
            if (res !== false)
                return res
        }
        return res
    }

    toBlockChainSchema() {
        for (let i = 0; i < this.chain.length; i++) {
            this.chain[i] = Object.assign(new Block, this.chain[i])
            for (let j = 0; j < this.chain[i].transactions.length; j++) {
                this.chain[i].transactions[j] = Object.assign(new Transaction, this.chain[i].transactions[j])
            }
            this.chain[i].initTransactionsHash()
            this.chain[i].initBloomFilter()
            this.chain[i].initMerkleTree()
        }
        for (let i = 0; i < this.pendingTransaction.length; i++) {
            this.pendingTransaction[i] = Object.assign(new Transaction, this.pendingTransaction[i])
        }
        return this

    }

    addNewUser(publicKey) {
        var tx = new Transaction(null, publicKey, 1000)
        var block = new Block(this.getLatestBlock(), Date.now(), [tx], 0)
        this.chain.push(block.mineBlock(this.difficulty))
    }

    getCoinTotal() {
        let balance = 0
        for (const block of this.chain)
            for (const trans of block.transactions)
                if (trans.fromAddress === null)
                    balance += parseInt(trans.amount)
        return balance
    }

}

module.exports.BlockChain = BlockChain