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
var logic = require('./event.logic');
var _ = require('lodash');

exports.index = function (req, res) {
  logic.getEventIndex(req.params)
    .then(function (result) {
      res.json(result);
    });
};

exports.show = function (req, res) {
  console.log(req.params.id);
  Event.findById(req.params.id, function (err, event) {
    if (err) {
      console.log(err);
      return handleError(res, err);
    }
    if (!event) {
      console.log('not found');
      return res.send(404);
    }
    return res.json(event);
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
  var param = logic.convertRegistParam(req.body);
  logic.regist(param)
    .then(function (result) {
      res.json({result: true,
                message: 'イベント『' + param.eventName + '』を登録しました'});
    })
    .catch(function (e) {
      console.log("error!");
      console.log(e);
      res.json({result: false,
                message: 'イベント登録に失敗しました'});
    });
};

exports.edit = function (req, res) {
  var param = logic.convertEditParam(req.body),
      eventId = req.body.eventId;
  logic.edit(eventId, param)
    .then(function (result) {
      res.json({result: true,
                message: 'イベント『' + param.eventName + '』を更新しました'});
    })
    .catch(function (e) {
      console.log("error!");
      console.log(e);
      res.json({result: false,
                message: 'イベント更新に失敗しました'});
    });
};


exports.update = function (req, res) {
};


exports.preview = function (req, res) {
  var markUp = logic.preview(req.body.md);
  res.json({html: markUp});
};

exports.entry = function (req, res) {
  var eventId = req.body.id,
      attendee = logic.convertEntryParam(req.body);

  logic.entry(eventId, attendee)
    .then(function (result) {
      res.json({result: true,
                message: '参加を受け付けました'});
    })
    .catch(function (e) {
      res.json({result:false,
                message: '参加登録に失敗しました'});
    });
};

exports.cancel = function (req, res) {
  var eventId = req.body.id,
      cancel = logic.convertEntryParam(req.body);

  logic.cancel(eventId, cancel)
    .then(function (result) {
      res.json({result: true,
                message: 'キャンセルしました'});
    })
    .catch(function (e) {
      res.json({result:false,
                message: 'キャンセルに失敗しました'});
    });
};


function handleError(res, err) {
  return res.send(500, err);
}


