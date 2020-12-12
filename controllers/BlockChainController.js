const EC = require('elliptic').ec
const ec = new EC('secp256k1')
const BlockChainSchema = require('../schemes/BlockChainSchema.js');
const {
    Transaction
} = require('../models/Transaction.js');
const {
    BlockChain
} = require('../models/BlockChain.js');
const {
    Block
} = require('../models/Block.js');
const {
    request
} = require('express');

// Mine Pending Transactions 
exports.blockchain_perform_mining_post = function (req, res) {
    const request = req.body
    BlockChainSchema.findById(1)
        .exec()
        .then(doc => {
            doc.toBlockChainSchema().miningPendingTransaction(request.publicKey)
            doc.save()
            res.json(doc)
        })
        .catch(err => {
            console.log(err);
            res.json({
                Error: "Error"
            })
        })
};

// Add and Sign new transaction
exports.blockchain_add_transaction_post = function (req, res) {
    tx = new Transaction(req.body.from, req.body.to, req.body.amount)
    tx.signTransaction(ec.keyFromPrivate(req.body.privateKey))
    BlockChainSchema.findById(1)
        .exec()
        .then(doc => {
            doc.toBlockChainSchema().addTransaction(tx)
            doc.save()
            res.json({
                doc
            })
        })
        .catch(err => {
            console.log(err);
            res.json({
                Error: "Error"
            })
        })
}

// Checks if transaction exist in BC
exports.blockchain_verify_get = function (req, res) {
    const request = req.body
    BlockChainSchema.findById(1)
        .exec()
        .then(doc => {
            res.json({
                hasTransaction: doc.toBlockChainSchema().hasTransaction(new Transaction(request.from, request.to, request.amount, request.timestamp))
            })
        })
        .catch(err => {
            console.log(err);
            res.json({
                Error: "Error"
            })
        })
}

// GET user balance
exports.blockchain_get_balance = function (req, res) {
    const request = req.body
    BlockChainSchema.findById(1)
        .exec()
        .then(doc => {
            res.json({
                balance: doc.toBlockChainSchema().getBalanceOfAddress(request.publicKey)
            })
        })
        .catch(err => {
            console.log(err);
            res.json({
                Error: "Error"
            })
        })
}

// GET user transactions
exports.blockchain_get_transactions = function (req, res) {
    const request = req.body
    BlockChainSchema.findById(1)
        .exec()
        .then(doc => {
            res.json({
                transactions: doc.toBlockChainSchema().getTransactionsOfAddress(request.publicKey)
            })
        })
        .catch(err => {
            console.log(err);
            res.json({
                Error: "Error"
            })
        })

}

exports.blockchain_add_user = function (req, res) {
    const request = req.body
    BlockChainSchema.findById(1)
        .exec()
        .then(doc => {
            doc.toBlockChainSchema().addNewUser(request.publicKey)
            doc.save()
            res.json({
                publicKey: request.publicKey
            })
        })
        .catch(err => {
            console.log(err);
            res.json({
                Error: "Error"
            })
        })

}

exports.blockchain_get_total = function (req, res) {
    BlockChainSchema.findById(1)
        .exec()
        .then(doc => {
            res.json({
                totalCoins: doc.toBlockChainSchema().getCoinTotal()
            })
        })
        .catch(err => {
            console.log(err);
            res.json({
                Error: "Error"
            })
        })

}

exports.blockchain_get_pending = function (req, res) {
    BlockChainSchema.findById(1)
        .exec()
        .then(doc => {
            res.json({
                count: doc.toBlockChainSchema().pendingTransaction.length
            })
        })
        .catch(err => {
            console.log(err);
            res.json({
                Error: "Error"
            })
        })

}


exports.blockchain_get_last_blocks = function (req, res) {
    const request = req.body
    BlockChainSchema.findById(1)
        .exec()
        .then(doc => {
            length = doc.toBlockChainSchema().chain.length
            res.json({
                lastBlocksMined: doc.toBlockChainSchema().chain.slice(Math.max(length - 3, 0))
            })
        })
        .catch(err => {
            console.log(err);
            res.json({
                Error: "Error"
            })
        })

}