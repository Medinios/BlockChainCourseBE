var Transaction = require('../models/Transaction');

// Display Transaction create form on GET.
exports.transaction_create_get = function (req, res) {
    req.params.from
    res.send(`${req.params.from}\n${req.params.to}\n${req.params.amount}`);
};

// Handle Transaction create on POST.
exports.transaction_create_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Transaction create POST');
};