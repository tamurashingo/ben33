'use strict';
/*-
 *
 * The MIT License (MIT)
 * 
 * Copyright (c) 2015 tamura shingo
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */

var UserSchema = require('./user.model');
var logic = require('./user.logic');
var auth = require('../../auth/auth.service');

exports.signup = function (req, res) {
  console.log(req);
  logic.signup(req.body.username, req.body.email, req.body.password)
    .then(function (result) {
      res.json({
        result: true,
        message: '登録しました'
      });
    })
    .catch(function (err) {
      res.json({
        result: false,
        message: err
      });
    });
};

exports.getOwnProfile = function (req, res) {
  var userid = auth.decode(req.headers.authorization.split(' ')[1]).userid;

  console.log('getOwnProfile');
  console.log('userid:' + userid);
  console.log(auth.decode(req.headers.authorization.split(' ')[1]));

  
  logic.getUser(userid)
    .then(function (user) {
      res.json({
        result: true,
        userid: userid,
        username: user.username,
        email: user.email,
        provider: user.provider
      });
    })
    .catch(function (error) {
      res.json({
        result: false,
        message: error
      });
    });
};


exports.updateProfile = function (req, res) {
  var userid = auth.decode(req.headers.authorization.split(' ')[1]).userid,
      username = req.body.username,
      password = req.body.password;

  logic.updateUser(userid, username, password)
    .then(function (message) {
      res.json({
        result: true,
        message: message
      });
    })
    .catch(function (error) {
      res.json({
        result: false,
        message: error
      });
    });
};

exports.getProfile = function (req,res) {
  var userid = req.params.id,
      u = {};
  logic.getUser(userid)
    .then(function (user) {
      console.log('getProfile');
      console.log(user);
      u = user;
      return logic.getAttend(user.events);
    })
    .then(function (event) {
      console.log('getAttend -->');
      console.log(event);
      res.json({
        result: true,
        userid: u.userid,
        username: u.username,
        events: event
      });
    })
    .catch(function (error) {
      res.json({
        result: false,
        message: error
      });
    });
};
