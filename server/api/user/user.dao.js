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

var User = require('./user.model');
var Promise = require('bluebird');

function getUser(userid, column) {
  if (arguments.length == 1) {
    column = {};
  }
  
  return new Promise(function (resolve, reject) {
    User.findById(userid, column)
      .exec(function (error, user) {
        if (error) {
          reject({
            result: false,
            message: 'データベースエラー',
            desc: error
          });
        }
        
        if (!user) {
          reject({
            result: false,
            message: 'ユーザが見つかりません',
            desc: ''
          });
        }
        resolve(user);
      });
  });
}


/**
 * ユーザ情報を1レコード取得する.
 *
 * ####Example:
 *
 *     getUser(userid)
 *       .then(function (user) {
 *         console.log(user);
 *       })
 *       .catch(function (error) {
 *         console.log(error);
 *       });
 *
 * @param {String} userid ユーザID(mongodbのPK)
 * @return {Promise} 正常時はユーザ情報(mongoose.Document)、異常時は異常の内容
 *
 */
exports.getUser = function (userid) {
  return new Promise(function (resolve, reject) {
    getUser(userid)
      .then(function (user) {
        resolve(user);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};

/**
 * ユーザ情報のユーザ名を取得する.
 *
 * ####Example:
 *
 *     getUsername(userid)
 *       .then(function (user) {
 *         console.log(user.username);
 *       })
 *       .catch(function (error) {
 *         console.log(error);
 *       });
 *
 * @param {String} userid ユーザID(mongodbのPK)
 * @return {Promise} 正常時はユーザ情報(mongoose.Document)、異常時は異常の内容
 *
 */
exports.getUsername = function (userid) {
  return new Promise(function (resolve, reject) {
    getUser(userid, "username")
      .then(function (user) {
        resolve(user);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};

exports.getEvent = function (userid) {
  return getUser(userid);
};


