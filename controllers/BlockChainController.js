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
            console.log(request.publicKey);
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

// Create New BlockChain
exports.blockchain_create_post = function (req, res) {
    let sashaCoin = new BlockChainSchema({
        _id: 1,
        chain: [],
        difficulty: 2,
        pendingTransaction: [],
        miningReward: 100
    })
    sashaCoin.chain.push(sashaCoin.createGenesisBlock())
    sashaCoin.save().then(result => {
        res.status(201).json({
            message: "BlockChain Created"
        })
    }).catch(err => {
        res.status(500).json({
            message: "BlockChain Already Exist"
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