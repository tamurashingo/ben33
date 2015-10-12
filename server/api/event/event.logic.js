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
var Attend = require('./attend.model');
var User = require('../user/user.model');
var Promise = require('bluebird');
var _ = require('lodash');
var EventDAO = require('./event.dao');
var AttendDAO = require('./attend.dao');
var UserDAO = require('../user/user.dao');

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
      .populate('attends', 'attendtype')
      .populate('createdBy', 'username')
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

/**
 * イベント情報を取得する.
 *
 * ####Example:
 *
 *     getEvent(eventid)
 *       .then(function (event) {
 *         console.log(event);
 *       })
 *       .catch(function (error) {
 *         console.log(error);
 *       });
 *
 * @param {String} eventid イベントID(mongodbのPK)
 * @return {Promise} 正常時はイベント情報(mongoose.Document)、異常時は異常の内容
 */
function getEvent(eventid) {
  return new Promise(function (resolve, reject) {
    Event.findById(eventid,
      'eventName startDate endDate venue attends abstraction comment createdBy createDate updateDate')
      .exec(function (error, event) {
        if (error) {
          reject({
            result: false,
            message: 'データベースエラー',
            desc: error
          });
        }

        if (!event) {
          reject({
            result: false,
            message: 'イベントが見つかりません',
            desc: ''
          });
        }

        resolve(event);
      });
  });
}

/**
 *
 *
 *
 *
 *
 *
 */
function eventPopulateAttend(event) {
  return new Promise(function (resolve, reject) {
    var options = {
      path: 'attends',
      model: 'Attend',
      select: 'eventid userid eventname attendtype comment updateDate'
    };
    Event.populate(event, options, function (error, event) {
      if (error) {
        reject({
          result: false,
          message: 'データベースエラー',
          desc: error
        });
      }
      console.log('eventPopulateAttend...ok');
      resolve(event.attends);
    });
  });
}

function attendPopulateUser(attend) {
  return new Promise(function (resolve, reject) {
    var options = {
      path: 'userid',
      model: 'User',
      select: 'username'
    };

    Attend.populate(attend, options, function (error, attend) {
      if (error) {
        reject({
          result: false,
          message: 'データベースエラー',
          desc: error
        });
      }

      console.log('attendPopulateUser...ok');
      resolve(attend);
    });
  });
}

exports.getEventDetail = function (eventid) {
  var e = {};
  return new Promise(function (resolve, reject) {
    getEvent(eventid)
      .then(function (event) {
        console.log('getEventDetail');
        e = event.toObject();
        console.log('getEventDetail...ok');

        // attend
        return new Promise(function (resolve, reject) {
          eventPopulateAttend(event)
            .then(function (attend) {
              return attendPopulateUser(attend);
            })
            .then(function (attend) {
              var attends = [],
                  cancels = [];
              _.each(attend, function (elm, idx) {
                var obj = {
                  username: elm.userid.username,
                  userid: elm.userid._id,
                  comment: elm.comment,
                  updateDate: elm.updateDate
                };
                if (elm.attendtype === 'attend') {
                  attends.push(obj);
                }
                else {
                  cancels.push(obj);
                }
              });
              e.attends = attends;
              e.cancels = cancels;
              resolve();
            })
            .catch(function (error) {
              reject(error);
            });
          ;
        });
      })
      .then(function () {
        return UserDAO.getUsername(e.createdBy);
      })
      .then(function (user) {
        e.createdBy = user.toObject();
        console.log(e);
        resolve(e);
      })
      .catch(function (error) {
        reject(error);
      });
  });
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



function evententry (id, attend) {
  return new Promise(function (resolve, reject) {
    Event.findByIdAndUpdate(id,
      {
        $push: {attends: attend}
      },
      function (error, result) {
        if (error) {
          console.log('evententry error-->');
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
}

function userentry(id, attend) {
  return new Promise(function (resolve, reject) {
    User.findByIdAndUpdate(id,
      {
        $push: {events: attend}
      },
      function (error, result) {
        if (error) {
          console.log('userentry error-->');
          console.log(error);
          reject(error);
        }
        else {
          resolve();
        }
      });
  });
}



exports.cancel = function (eventid, userid, cancel) {
  return new Promise(function (resolve, reject) {
    Attend.find({
      '$and': [
        {eventid: eventid},
        {userid: userid}
      ]},
      function (error, attend) {
        if (error) {
          console.log(error);
          reject('データベースエラー');
        }

        if (!attend) {
          reject('キャンセルデータがありません');
        }
                
        Attend.findByIdAndUpdate(
          attend._id,
          {
            $set: {
              attendtype: 'cancel',
              comment: comment
            }
          });
      });
  });      


  
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
 * @param {String} userid ユーザID
 * @return {Object} イベント登録用オブジェクト
 */
exports.convertRegistParam = function (req, userid) {
  var now = (new Date()).toFormat('YYYY/MM/DD HH24:MI:SS');
  return {
    eventName: req.createParam.eventName,
    startDate: req.createParam.startDate,
    endDate: req.createParam.endDate,
    venue: req.createParam.venue,
    abstraction: req.createParam.abstraction,
    comment: req.createParam.desc,
    createdBy: userid,
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
 * イベント参加用のデータ作成
 */
exports.createAttend = function (eventid, userid, comment) {
  var now = (new Date()).toFormat('YYYY/MM/DD HH24:MI:SS');

  return AttendDAO.upsert(eventid, userid, 'attend', comment);
};

/**
 * イベント参加/キャンセルの登録
 */
exports.entry = function (eventid, attend) {

  return new Promise(function (resolve, reject) {
    EventDAO.getEvent(eventid)
      .then(function (event) {

        // attends[] に同一IDがある場合はpushしない
        var attends = event.toObject().attends,
            id = attend.toObject()._id.toString();

        var flag = true;
        _.each(attends, function (elm, idx) {
          if (elm.toString() === id) {
            flag = false;
          }
        });
        
        if (flag) {
          event.attends.push(attend);
          event.save();
        }

        resolve();
      })
      .catch(function (error) {
        reject(error);
      });
  });
};

/**
 * イベントキャンセル用データの作成
 */
exports.createCancel = function (eventid, userid, comment) {
  var now = (new Date()).toFormat('YYYY/MM/DD HH24:MI:SS');

  return AttendDAO.upsert(eventid, userid, 'cancel', comment);
};


exports.entryuser = function (userid, attend) {
  return new Promise(function (resolve, reject) {
    UserDAO.getUser(userid)
      .then(function (user) {
        // events[]に同一IDがある場合はpushしない
        var attends = user.toObject().events,
            id = attend.toObject()._id.toString();

        var flag = true;
        _.each(attends, function (elm, idx) {
          console.log('element');
          console.log(elm);
          if (elm.toString() == id) {
            flag = false;
          }
        });

        if (flag) {
          user.events.push(attend);
          user.save();
        }

        resolve();
      })
      .catch(function (error) {
        reject(error);
      });
  });
};

