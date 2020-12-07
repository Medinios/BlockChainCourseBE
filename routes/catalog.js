var express = require('express');
var router = express.Router();

// Require controller modules.
var block_controller = require('../controllers/BlockController');
var transaction_controller = require('../controllers/TransactionController');
var blockChain_controller = require('../controllers/BlockChainController');

/// Block ROUTES ///

// GET request for creating a Block. NOTE This must come before routes that display Block (uses id).
router.get('/Block/create', block_controller.block_create_get);

// POST request for creating Block.
router.post('/Block/create', block_controller.block_create_post);

// GET request for one Block.
router.get('/Block/:id', block_controller.block_detail);

// GET request for list of all Block items.
router.get('/Blocks', block_controller.block_list);

/// Transaction ROUTES ///

// GET request for creating Transaction. NOTE This must come before route for id (i.e. display Transaction).
router.get('/Transaction/:from/:to/:amount/create', transaction_controller.transaction_create_get);

// POST request for creating Transaction.
router.post('/Transaction/create', transaction_controller.transaction_create_post);


/// BlockChain ROUTES ///

// GET request to update BlockChain.
router.get('/BlockChain/:id/update', blockChain_controller.blockChain_update_get);

// POST request to update BlockChain.
router.post('/BlockChain/:id/update', blockChain_controller.blockChain_update_post);

module.exports = router;