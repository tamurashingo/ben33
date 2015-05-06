'use strict';

var express = require('express');
var passport = require('passport');
var config = require('../config/environment');
var User = require('../api/user/user.model');

// Passport Configuration
require('./local/passport').setup(User, config);

var router = express.Router();

router.use('/', require('./local'));


// 認証OKが出なかった場合はここで認証NGとする
router.get('/*', function (req, res) {
  return res.json(401, {message: 'ユーザ名またはパスワードが違います'});
});
  
module.exports = router;
