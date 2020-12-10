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

// Handle BlockChain update on POST.
exports.blockchain_perform_mining_post = function (req, res) {
    BlockChainSchema.findById(1)
        .exec()
        .then(doc => {
            doc.miningPendingTransaction("Daniel")
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
exports.blockchain_create_post = function (req, res) {
    let sashaCoin = new BlockChainSchema({
        _id: 1,
        chain: [],
        difficulty: 2,
        pendingTransaction: [],
        miningReward: 90
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

// Add transaction
exports.blockchain_add_transaction_post = function (req, res) {
    BlockChainSchema.update(({
            _id: 1
        }, {
            $push: {
                pendingTransaction: new Transaction(req.body.from, req.body.to, req.body.amount).signTransaction(ec.keyFromPrivate(req.body.privateKey)) // TO DO: add .signTransaction 
            }
        })).exec()
        .then(doc => {
            res.status(200).json({
                message: "OK"
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
};

exports.blockchain_verify_get = function (req, res) {
    BlockChainSchema.findById(1)
        .exec()
        .then(doc => {
            doc.toBlockChain()
            doc.chain[1].calculateHash()
            console.log(doc);
            // doc.chain = Object.assign(new Array, doc.chain)
            // for (var block of doc.chain) {
            //     block.pendingTransaction = Object.assign(new Array, block.pendingTransaction)
            //     block = Object.assign(new Block, block)
            //     for (var tx of block.pendingTransaction)
            //         tx = Object.assign(new Transaction, tx)
            // }
            // console.log(doc.isChainValidate());
            // console.log(doc.isChainValidate());
            // doc.miningPendingTransaction("Wallet")
            // if (doc instanceof BlockChain)
            //     console.log("Yes");
            // else if (doc instanceof BlockChainSchema)
            //     console.log("Yes2");
            // else
            //     console.log("No");
        })
        .catch(err => {
            console.log(err);
            res.json({
                Error: "Error"
            })
        })
}

function get_blockchain_from_server() {
    BlockChainSchema.findById(1)
        .exec()
        .then(doc => {
            doc.getFromServer()
            console.log(doc);
        })
        .catch(err => {
            console.log(err);
        })
}