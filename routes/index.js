var express = require('express');
var router = express.Router();
var blockchain_controller = require('../controllers/BlockChainController');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('Hello')
});

// // POST request to update blockchain.
router.post('/blockchain/update', blockchain_controller.blockchain_update_post);

// // POST request to create blockchain.
router.post('/blockchain/create', blockchain_controller.blockchain_create_post);

// // GET request to detail blockchain.
router.post('/blockchain/add_transaction', blockchain_controller.blockchain_add_transaction);
module.exports = router;