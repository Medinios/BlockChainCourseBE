var Transaction = require('../models/Transaction');

// Display Transaction create form on GET.
exports.transaction_create_get = function (req, res) {
    res.json(new Transaction.Transaction(req.params.from, req.params.to, req.params.amount))
};

// Handle Transaction create on POST.
exports.transaction_create_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Transaction create POST');
};