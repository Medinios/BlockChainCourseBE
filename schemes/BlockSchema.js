const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const {
    Block
} = require('../models/Block');

const BlockSchema = new Schema({
    previousHash: String,
    timestamp: String,
    transactions: Array,
    hash: String,
    nonce: Number
});

BlockSchema.loadClass(Block)
module.exports = mongoose.model('Block', BlockSchema);