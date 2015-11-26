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

var Event = require('./event.model');
var Attend = require('./attend.model');
var User = require('../user/user.model');
var logic = require('./event.logic');
var auth = require('../../auth/auth.service');
var _ = require('lodash');

/**
 * 一覧情報の取得
 *
 */
exports.index = function (req, res) {
  logic.getEventIndex(req.params)
    .then(function (result) {
      res.json(result);
    });
};

/**
 * 詳細画面の取得
 *
 */
exports.show = function (req, res) {
  logic.getEventDetail(req.params.id)
    .then(function (result) {
      res.json({
        result: true,
        event: result
      });
    })
    .catch(function (error) {
      res.json({
        result: false,
        message: error.message,
        desc: error.desc
      });
    });
};


/**
 * イベント登録
 *
 */
exports.regist = function (req, res) {
  var userid = auth.decode(req.headers.authorization.split(' ')[1]).userid,
      param = logic.convertRegistParam(req.body, userid);
  logic.regist(param)
    .then(function (result) {
      res.json({
        result: true,
        message: 'イベント『' + param.eventName + '』を登録しました'
      });
    })
    .catch(function (e) {
      console.log("error!");
      console.log(e);
      res.json({
        result: false,
        message: 'イベント登録に失敗しました'
      });
    });
};


/**
 * イベント修正
 *
 */
exports.edit = function (req, res) {
  var param = logic.convertEditParam(req.body),
      eventId = req.body.eventId;
  logic.edit(eventId, param)
    .then(function (result) {
      res.json({
        result: true,
        message: 'イベント『' + param.eventName + '』を更新しました'
      });
    })
    .catch(function (e) {
      console.log("error!");
      console.log(e);
      res.json({
        result: false,
        message: 'イベント更新に失敗しました'
      });
    });
};


/**
 * イベント参加登録
 */
exports.entry = function (req, res) {
  var eventid = req.body.eventid,
      userid = req.body.userid,
      comment = req.body.comment,
      atnd = null;

  logic.createAttend(eventid, userid, comment)
    .then(function (attend) {
      atnd = attend;
      return logic.entry(eventid, atnd);
    })
    .then(function (event) {
      return logic.entryuser(userid, atnd);
    })
    .then(function (result) {
      res.json({
        result: true,
        message: '参加を受け付けました'
      });
    })
    .catch(function (error) {
      res.json({
        result: false,
        message: '参加登録に失敗しました',
        error: error
      });
    });
};


/**
 * イベントキャンセル登録
 *
 */
exports.cancel = function (req, res) {
  var eventid = req.body.eventid,
      userid = req.body.userid,
      comment = req.body.comment;

  logic.createCancel(eventid, userid, comment)
    .then(function (attend) {
      return logic.entry(eventid, attend);
    })
    .then(function (result) {
      res.json({
        result: true,
        message: 'キャンセルしました'
      });
    })
    .catch(function (error) {
      res.json({
        result: false,
        message: 'キャンセルに失敗しました',
        error: error
      });
    });
};


/**
 * コメント追加
 */
exports.comment = function (req, res) {
  var eventid = req.body.eventid,
      userid = req.body.userid,
      comment = req.body.comment;

  logic.createComment(eventid, userid, comment)
    .then(function (comment) {
      return logic.entryComment(eventid, comment);
    })
    .then(function (result) {
      res.json({
	result: true,
	message: 'コメントを追加しました'
      });
    })
    .catch(function (error) {
      res.json({
	result: false,
	message: 'コメントの追加に失敗しました',
	error: error
      });
    });
};
