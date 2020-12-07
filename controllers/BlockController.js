var block = require('../models/Block');

// Display detail page for a specific Block.
exports.block_detail = function (req, res) {
    res.send('NOT IMPLEMENTED: Block detail: ' + req.params.id);
};

// Handle Block create on POST.
exports.block_create_post = function (req, res) {
    req.params.walletAddress
    res.send('NOT IMPLEMENTED: Block create POST');
};