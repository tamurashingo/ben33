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

var Attend = require('./attend.model');
var Promise = require('bluebird');

exports.upsert = function (eventid, userid, attendtype, comment) {
  var now = (new Date()).toFormat('YYYY/MM/DD HH24:MI:SS'),
      condition = {
        eventid: eventid,
        userid: userid
      },
      data = {
        evnetid: eventid,
        userid: userid,
        attendtype: attendtype,
        comment: comment,
        updateDate: now
      };
  
  return new Promise(function (resolve, reject) {
    Attend.findOneAndUpdate(
      condition,
      data,
      {
        new: true,
        upsert: true
      }
    )
      .exec(function (error, attend) {
        
        if (error) {
          reject({
            result: false,
            message: 'データベースエラー',
            desc: error
          });
        }

        resolve(attend);
      });
  });
};

exports.findByEventIdAndUserId = function (eventid, userid) {
  return new Promise(function (resolve, reject) {
    Attend.findOne({eventid: eventid, userid: userid})
      .exec(function (error, attend) {
        if (error) {
          reject({
            result: false,
            message: 'データベースエラー',
            desc: error
          });

          if (!attend) {
            resolve({
              result: false,
              message: '参加登録がありません',
              desc: ''
            });
          }

          resolve({
            result: true,
            attend: attend
          });
        }
      });
  });
};

exports.getEventname = function (attendid) {
  return new Promise(function (resolve, reject) {
    Attend.findById(attendid)
      .populate('eventid')
      .exec(function (error, attend) {
        if (error) {
          reject({
            result: false,
            message: 'データベースエラー',
            desc: error
          });
        }

        if (!attend) {
          resolve({
            attendtype: 'unknown',
            comment: '',
            eventid: {
              eventname: 'not found'
            }
          });
        }
        else {
          console.log('getEventname');
          console.log(attend);
          console.log(error);
          resolve({
            attendtype: attend.attendtype,
            comment: attend.comment,
            eventid: {
              eventid: attend.eventid._id,
              eventname: attend.eventid.eventName
            }
          });
        }
      });
  });
};


