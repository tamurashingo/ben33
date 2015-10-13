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
var EventDAO = require('../event/event.dao');
var AttendDAO = require('../event/attend.dao');
var Promise = require('bluebird');
var _ = require('lodash');

/**
 * ユーザ登録。
 * 通常のパスワード認証を行うユーザ用。
 *
 */
function signup(username, email, password) {
  var user = new User({
    provider: 'local',
    username: username,
    email: email,
    password: password
  });
  return new Promise(function (resolve, reject) {
    user.save(function (err) {
      if (err) {
        reject(handleRegistError(err));
      }
      else {
        resolve();
      }
    });
  });
}

/**
 * 指定したユーザの情報を取得する
 *
 */
function getUser(userid) {
  return new Promise(function (resolve, reject) {
    User.findById(userid, function (err, user) {
      if (err) {
        reject(handleSearchError(err));
      }
      else if (!user) {
        reject("ユーザ情報がありません");
      }
      else {
        resolve({
          userid: user._id,
          username: user.username,
          email: user.email,
          provider: user.provider === 'local' ? 'パスワード': user.provider,
          events: user.events
        });
      }
    });
  });
}

function getAttend(attendid) {
  return new Promise(function(resolve, reject) {
    Promise.all(attendid.map(function (id) {
      console.log('attendid -->' + id);
      return AttendDAO.getEventname(id);
    }))
      .then(function (result) {
        console.log('getAttend  result -->');
        console.log(result);
        resolve(result);
      })
      .catch(function (error) {
        reject(error);
      });
  });
}


/**
 * ユーザ情報を更新する
 * パスワードは何か入っていれば更新する
 *
 */
function updateUser(userid, username, password) {
  return new Promise(function (resolve, reject) {
    User.findByIdAndUpdate(userid,
      {
        $set: {username: username}
      },
      function (error, user) {
        if (error) {
          reject('更新に失敗しました');
        }
        else {
          if (password) {
            user.password = password;
            // パスワードはすぐ使わないのでPromiseで待たないことにした
            user.save();
          }
          resolve('更新しました');
        }
      });
  });
}

/**
 * 登録時のエラー原因を元に画面に返すエラーメッセージを生成する
 *
 */
function handleRegistError(err) {
  if (err.name === 'MongoError') {
    if (err.code === 11000) {
      return '登録済みのメールアドレスです';
    }
    else {
      return 'データベースエラーが発生しました。再操作してください:code = ' + err.code;
    }
  }
  else if (err.name === 'ValidationError') {
    if (err.errors.username) {
      return 'ユーザ名を入力してください';
    }
    if (err.errors.email) {
      return 'メールアドレスを入力してください';
    }
    if (err.errors.hashedPassword) {
      return 'パスワードを入力してください';
    }
  }
  return '登録エラーです';
}

/**
 * 検索時のエラー原因を元に画面に返すメッセージを生成する
 *
 */
function handleSearchError(err) {
  if (err.name === 'MongoError') {
    return 'データベースエラーが発生しました。再操作してください:code = ' + err.code;
  }

  return 'データベースエラーが発生しました。再操作してください';
}

exports.signup = signup;
exports.getUser = getUser;
exports.updateUser = updateUser;
exports.getAttend = getAttend;
