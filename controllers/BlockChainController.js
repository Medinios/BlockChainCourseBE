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
exports.blockchain_update_post = function (req, res) {
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
exports.blockchain_add_transaction = function (req, res) {
    BlockChainSchema.update(({
            _id: 1
        }, {
            $push: {
                pendingTransaction: new Transaction(req.body.from, req.body.to, req.body.amount) // TO DO: add .signTransaction 
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