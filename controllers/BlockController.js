var block = require('../models/Block');

// Display list of all Blocks.
exports.block_list = function (req, res) {
    res.send('NOT IMPLEMENTED: Block list');
};

// Display detail page for a specific Block.
exports.block_detail = function (req, res) {
    res.send('NOT IMPLEMENTED: Block detail: ' + req.params.id);
};

// Display Block create form on GET.
exports.block_create_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Block create GET');
};

// Handle Block create on POST.
exports.block_create_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Block create POST');
};