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


exports.entry = function () {
};

exports.getEventIndex = function (requestParams) {
  var pageNo = parseInt(requestParams.pageNo, 10);
  return getEventModelAll(pageNo);
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

exports.edit = function (id, data) {
  return new Promise(function (resolve, reject) {
    Event.findByIdAndUpdate(id,
      {
        $set: data
      },
      function (error, result) {
        if (error) {
          // 更新失敗！
          reject(error);
        }
        else {
          // 更新成功！
          resolve();
        }
      });
  });
};

exports.entry = function (id, attndee) {
  return new Promise(function (resolve, reject) {
    Event.findByIdAndUpdate(id,
      {
        $push: {attendees: attndee}
      },
      function (error, result) {
        if (error) {
          console.log(error);
          // 参加登録失敗！
          reject(error);
        }
        else {
          // 参加登録成功！
          resolve();
        }
      });
    });
};

exports.cancel = function (id, cancel) {
  return new Promise(function (resolve, reject) {
    Event.findById(id,
      function (error, event) {
        var index = -1,
            attendees = event.attendees;

        if (error) {
          reject(error);
        }

        _.each(attendees, function (elm, idx) {
          if (elm.userName === cancel.userName) {
            index = idx;
          }
        });

        if (index != -1) {
          attendees.splice(index, 1);
          Event.findByIdAndUpdate(id,
            {
              $set : {attendees: attendees},
              $push: {cancels: cancel}
            },
            function (error, result) {
              if (error) {
                  console.log(error);
              }
              resolve();
            });
        }
        else {
          reject("キャンセルデータがありませんでした");
        }
      });
  });
};

/**
 * リクエストパラメータをイベント登録用オブジェクトに変換する。
 *
 * @param {Object} req リクエストパラメータ
 * @return {Object} イベント登録用オブジェクト
 */
exports.convertRegistParam = function (req) {
  var now = (new Date()).toFormat('YYYY/MM/DD HH24:MI:SS');
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

/**
 * リクエストパラメータをイベント更新用オブジェクトに変換する。
 *
 * @param {Object} req リクエストパラメータ
 * @return {Object} イベント更新用オブジェクト
 */
exports.convertEditParam = function (req) {
  var now = (new Date()).toFormat('YYYY/MM/DD HH24:MI:SS');
  return {
    eventName: req.editParam.eventName,
    startDate: req.editParam.startDate,
    endDate: req.editParam.endDate,
    mgrName: req.editParam.mgrName,
    venue: req.editParam.venue,
    abstraction: req.editParam.abstraction,
    comment: req.editParam.desc,
    updateDate: now
  };
};


/**
 * リクエストパラメータをイベント参加登録用オブジェクトに変換する。
 *
 * @param {Object} req リクエストパラメータ
 " @return {Object} イベント参加登録用オブジェクト
 */
exports.convertEntryParam = function (req) {
  var now = (new Date()).toFormat('YYYY/MM/DD HH24:MI:SS');
  return {
    userName: req.userName,
    comment: req.comment
  };
};




