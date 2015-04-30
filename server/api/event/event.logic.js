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

/**
 * @fileoverview イベント情報関連の処理ロジック。
 * @author tamura shingo
 *
 */

var Event = require('./event.model');
var models = require('../../models').models();
var Promise = require('bluebird');
var _ = require('lodash');
require('date-utils');


/**
 * 指定したページのイベント概要を取得する。
 * 一度に取得する件数は10件である。
 *
 * @param {number} pageNo ページ番号
 * @return {Promise<Object>} 取得結果
 *
 */
function getEventModelAll(pageNo) {

  return new Promise(function (resolve, reject) {
    Event.find()
      .limit(10)
      .skip(pageNo * 10)
      .sort({
        createDate: 'desc'
      })
      .exec(function (err, events) {
        if (err) {
          reject(err);
        }
        Event.count().exec(function (err, count) {
          if (err) {
            reject(err);
          }
          resolve({
            prev: pageNo == 0 ? false : true,
            next: (pageNo * 10) + events.length < count ? true : false,
            result: events,
            total: Math.floor(count / 10) + 1
          });
        });
      });
  });
};



function getDetail(eventId) {
  var Event = models.Event,
      Mgr = models.Mgr,
      ret = {};
  
  return Event.find({where: {eventId: eventId}})
    .then(function (event) {
      console.log(event.dataValues);
      ret = event.dataValues;
      return Mgr.find({where: {mgrId: event.dataValues.mgrId}});
    })
    .then(function (mgr) {
      console.log(mgr.dataValues);
      ret.userName = mgr.dataValues.userName;
      return new Promise(function (resolve) {
        resolve(ret);
      });
    })
  ;
}



exports.getEventIndex = function (requestParams) {
  var pageNo = parseInt(requestParams.pageNo, 10);
  return getEventModelAll(pageNo);
};

exports.getEventDetail = function (requestParams) {
  var eventId = requestParams.eventId;
  return getDetail(eventId);
};

exports.preview = function (txt) {
  return converter.makeHtml(txt);
 };


function convertRows(rows) {
  var array = [];
  _.each(rows, function (elm, index) {
    array[index] = elm.dataValues;
  });
  
  return array;
}

function registEvent (data, t) {
  return models.Event.create(data.event,
                             {transaction: t});
}


function registUser (data, t) {
  return models.User.create(data.user,
                            {transaction: t});
}

function registMgr (data, t) {
  return models.Mgr.create(data.mgr,
                           {transaction: t});
};


exports.regist = function (data) {
  return new Promise(function (resolve, reject) {
    Event.create(data, function (err, event) {
      if (err) {
        reject(err);
      }
      else {
        resolve();
      }
    });
  });
};


/**
 * リクエストパラメータをイベント登録用オブジェクトに変換する。
 *
 * @param {Object} req リクエストパラメータ
 " @return {Object} イベント登録用オブジェクト
 */
exports.convertRegistParam = function (req) {
  var now = (new Date()).toFormat('YYYY/MM/DD HH24:MI:SS');
  console.log(req);
  return {
    eventName: req.createParam.eventName,
    startDate: req.createParam.startDate,
    endDate: req.createParam.endDate,
    mgrName: req.createParam.mgrName,
    venue: req.createParam.venue,
    abstraction: req.createParam.abstraction,
    comment: req.createParam.desc,
    createdBy: {
//      id: req.user.id,
//      userName: req.user.name
    },
    createDate: now,
    updateDate: now
  };
};



