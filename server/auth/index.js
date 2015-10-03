'use strict';

var express = require('express');
var passport = require('passport');
var config = require('../config/environment');
var User = require('../api/user/user.model');
var auth = require('./auth.service');

// Passport Configuration
require('./local/passport').setup(User, config);

var router = express.Router();

router.use('/refresh', auth.isAuthenticated);
router.use('/refresh', function (req, res) {
  var id = auth.decode(req.headers.authorization.split(' ')[1]).userid;
  User.findById(id, function (err, user) {
    if (err) {
      res.json(404, {message: 'ユーザ情報の更新に失敗しました(サーバエラー)'});
    }
    else if (!user) {
      res.json(404, {message: 'ユーザ情報の更新に失敗しました(ユーザ情報なし)'});
    }
    else {
      console.log('OK!!!');
      console.log(user);
      res.json({token: auth.signToken(user.username, user._id)});
    }
  });
});
router.use('/', require('./local'));


// 認証OKが出なかった場合はここで認証NGとする
router.get('/*', function (req, res) {
  return res.json(401, {message: 'ユーザ名またはパスワードが違います'});
});
  
module.exports = router;
