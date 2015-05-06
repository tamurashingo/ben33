'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');

var router = express.Router();

router.post('/', function(req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    var error = err || info;

    // 認証エラー発生時は401を返す
    if (error) {
      res.json(401, error);
    }

    // ユーザ未登録の場合は次の認証方式を試す
    if (!user) {
      next();
    }

    // 認証OKの場合、トークンを返す
    var token = auth.signToken(user._id, user.role);
    res.json({token: token});
    
  })(req, res, next);
});

module.exports = router;
