const SHA256 = require('crypto-js/sha256')
const {
    Block
} = require('./Block.js')
const {
    Transaction
} = require('./Transaction.js')

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()]
        this.difficulty = 2
        this.pendingTransaction = []
        this.miningReward = 90
    }

    createGenesisBlock() {
        return new Block('01/01/2009', 'Genesis block', 0)
    }
    getLatestBlock() {
        return this.chain[this.chain.length - 1]
    }

    miningPendingTransaction(miningRewardAddress) {
        const rewardTx = new Transaction(null, miningRewardAddress, this.miningReward)
        this.pendingTransaction.push(rewardTx)

        let block = new Block(Date.now(), this.pendingTransaction, this.getLatestBlock().hash)
        block.mineBlock(this.difficulty)
        console.log('Block Successfully Mined')

        this.chain.push(block)
        this.pendingTransaction = []
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
                    balance -= trans.amount
                }
                if (trans.toAddress === address) {
                    balance += trans.amount
                }

            }

        }

        return balance

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
}
module.exports.Blockchain = Blockchain