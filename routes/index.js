var express = require('express');
var router = express.Router();
var transaction = require('../models/Transaction');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.redirect('catalog');
});

module.exports = router;