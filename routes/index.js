var express = require('express');
var router = express.Router();
var blockchain_controller = require('../controllers/BlockChainController');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('Hello')
});

// // POST request to mine
router.post('/blockchain/mining', blockchain_controller.blockchain_perform_mining_post);

// // POST request to add new user
router.post('/blockchain/add_new_user', blockchain_controller.blockchain_add_user);

// // POST request to add transaction
router.post('/blockchain/add_transaction', blockchain_controller.blockchain_add_transaction_post);

// // POST request to verify transaction was made
router.get('/blockchain/verify', blockchain_controller.blockchain_verify_get);

// // POST request to get balance for address
router.post('/blockchain/get_balance', blockchain_controller.blockchain_get_balance);

// // POST request to get transactions for address
router.post('/blockchain/get_transactions', blockchain_controller.blockchain_get_transactions);

// // POST request to get total coins
router.post('/blockchain/get_total', blockchain_controller.blockchain_get_total);

// // POST request to get count of pending
router.post('/blockchain/get_pending', blockchain_controller.blockchain_get_pending);

module.exports = router;