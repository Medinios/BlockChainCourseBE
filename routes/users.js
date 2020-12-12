var express = require('express');
var router = express.Router();
var userController = require('../controllers/UserController');
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/create', userController.createUser);
router.post('/login', userController.login);
router.get('/profile/:username', userController.profile);
router.get('/users_list', userController.users_list);
module.exports = router;