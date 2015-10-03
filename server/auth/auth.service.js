'use strict';

var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/environment');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');
var User = require('../api/user/user.model');

/**
 * Returns a jwt token signed by the app secret
 */
function signToken(username, userid) {
  return jwt.sign({
    username: username,
    userid: userid
  }, config.secrets.session, { expiresInMinutes: 60*5 });
}

exports.isAuthenticated = expressJwt({ secret: config.secrets.session });
exports.signToken = signToken;
exports.decode = jwt.decode;

