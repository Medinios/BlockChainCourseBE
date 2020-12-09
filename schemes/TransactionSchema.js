const mongoose = require('mongoose')
const {
    Transaction
} = require('../models/Transaction');
const TransactionSchema = mongoose.Schema({
    from: String,
    to: String,
    amount: Number,
    timestamp: String
});

TransactionSchema.loadClass(Transaction)
module.exports = mongoose.model('Transaction', TransactionSchema);