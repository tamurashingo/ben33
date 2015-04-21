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

var models = require('../../models');
var logic = require('./event.logic');


exports.index = function (req, res) {
  logic.getEventIndex(req.params)
    .then(function (result) {
      res.json(result);
    });
};

exports.description = function (req, res) {
  // req.eventId
  logic.getEventDetail(req.params)
    .then(function (result) {
      console.log('ok');
      res.json(result);
    });
};


exports.regist = function (req, res) {
  var param = createRegistParam(req.body);

  logic.regist(param)
    .then(function (result) {
      res.json({result: true,
                message: 'イベント『' + param.event.title + '』を登録しました'});
    })
    .catch(function (e) {
      console.log(e);
      res.json({result: false,
                message: 'イベント登録に失敗しました'});
    });
};


exports.update = function (req, res) {
};


exports.preview = function (req, res) {
  var markUp = logic.preview(req.body.md);
  res.json({html: markUp});
};


/**
 * リクエストパラメータからイベント登録に必要なデータを生成する。
 * @param {} req リクエストパラメータのbody(POSTされたパラメータ)
 *
 */
function createRegistParam(req) {
  var requestParams = {
    event: {
      eventId: null,
      title: req.createParam.eventName,
      startDate: req.createParam.startDate,
      endDate: req.createParam.endDate,
      mgrId: null,
      venue: req.createParam.venue,
      abstraction: req.createParam.abstraction,
      comment: req.createParam.desc
    },
    user: {
      username: req.createParam.mgr,
      valid: true
    },
    mgr: {
      eventId: null,
      userId: null,
      userName: req.createParam.mgr,
      rollName: null
    }
  };

  return requestParams;
}

