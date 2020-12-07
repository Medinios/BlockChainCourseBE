var express = require('express');
var router = express.Router();

// Require controller modules.
var block_controller = require('../controllers/blockController');
var transaction_controller = require('../controllers/transactionController');
var blockChain_controller = require('../controllers/blockChainController');

/// block ROUTES ///

// POST request for creating block.
router.post('/block/create/:walletAddress', block_controller.block_create_post);

// GET request for one block.
router.get('/block/:id', block_controller.block_detail);

/// transaction ROUTES ///

// GET request for creating transaction. NOTE This must come before route for id (i.e. display transaction).
router.get('/transaction/:from/:to/:amount/create', transaction_controller.transaction_create_get);

// POST request for creating transaction.
router.post('/transaction/create', transaction_controller.transaction_create_post);

/// blockChain ROUTES ///

// // GET request to update blockChain.
// router.get('/blockChain/:id/update', blockChain_controller.blockChain_update_get);

// // POST request to update blockChain.
// router.post('/blockChain/:id/update', blockChain_controller.blockChain_update_post);

// // request to detail blockChain.
// router.post('/blockChain/:id/detail', blockChain_controller.blockChain_detail);

module.exports = router;