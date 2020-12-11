var express = require('express');
var router = express.Router();
var blockchain_controller = require('../controllers/BlockChainController');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('Hello')
});

// // POST request to mine
router.post('/blockchain/mining', blockchain_controller.blockchain_perform_mining_post);

// // POST request to create blockchain
router.post('/blockchain/create', blockchain_controller.blockchain_create_post);

// // POST request to add transaction
router.post('/blockchain/add_transaction', blockchain_controller.blockchain_add_transaction_post);

// // POST request to verify transaction was made
router.get('/blockchain/verify', blockchain_controller.blockchain_verify_get);

// // GET request to get balance for address
router.get('/blockchain/get_balance', blockchain_controller.blockchain_get_balance);

// // GET request to get balance for address
router.get('/blockchain/get_transactions', blockchain_controller.blockchain_get_transactions);


module.exports = router;