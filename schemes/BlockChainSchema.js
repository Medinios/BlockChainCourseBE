var mongoose = require('mongoose');
const ObjectId = require('mongoose/lib/schema/objectid');
const Schema = mongoose.Schema;
const {
    BlockChain
} = require('../models/BlockChain');

const BlockChainSchema = new Schema({
    _id: Number,
    chain: Array,
    difficulty: Number,
    pendingTransaction: Array,
    miningReward: Number
});

BlockChainSchema.loadClass(BlockChain)
module.exports = mongoose.model('BlockChain', BlockChainSchema);