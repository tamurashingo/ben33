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

var Promise = require('bluebird');


/**
 * 指定したページのイベント概要を取得する。
 * 一度に取得する件数は10件である。
 *
 * @param {number} pageNo ページ番号
 * @return {Promise<Object>} 取得結果
 *
 */
function getEventModelAll(pageNo) {
var models = require('../../models').models();
var Event = models.Event;
  return Event.findAndCountAll({
    offset: pageNo,
    limit: 10,
    order: 'eventId desc'
  })
  .then(function (result) {
console.log(pageNo);
    if (pageNo * 10 + result.rows.length < result.count) {
      return {
        prev: pageNo == 0 ? false : true,
        next: true,
        result: result.rows
      };
    }
    else {
      return {
        prev: pageNo == 0 ? false : true,
        next: false,
        result: result.rows
      };
    }
  });
}

exports.getEventIndex = function (requestParams) {
  var pageNo = requestParams.pageNo;
  return getEventModelAll(pageNo);
}
