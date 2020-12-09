const TransactionSchema = require('../schemes/TransactionSchema.js');

// Display Transaction create form on GET.
exports.transaction_create_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Transaction create GET');
    // res.json(new Transaction.Transaction(req.params.from, req.params.to, req.params.amount))
};

// Handle Transaction create on POST.
exports.transaction_create_post = function (req, res) {
    const p = new TransactionSchema({
        fromAddress: req.body.from,
        toAddress: req.body.to,
        amount: req.body.amount,
        timestamp: Date.now()
    })
    p.save().then(result => {
        console.log(result);
    }).catch(err => console.log(err))
    res.status(201).json({
        message: "Handling Post",
        created: p
    })

    // res.send('NOT IMPLEMENTED: Transaction create POST');
};