'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');
var jwt = require('jsonwebtoken');

var router = express.Router();

router.post('/', function(req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    var error = err || info;

    // サーバエラー発生時は401を返す
    if (error) {
      return res.json(401, {
          message: error.message ? error.message :
              "サーバエラーが発生しました。再度やり直してください。 err=" + error});
    }

    // ユーザ未登録でここまで来たの場合は404を返す
    // 通常はこの前段階で401を返しているため
    if (!user) {
      return res.json(404, {message: "サーバエラーが発生しました。再度やり直してください。"});
    }

    console.log("user");
    console.log(user);

    // 認証OKの場合、トークンを返す
    var token = auth.signToken(user.username, user._id);
    res.json({token: token});
    
  })(req, res, next);
});

module.exports = router;
