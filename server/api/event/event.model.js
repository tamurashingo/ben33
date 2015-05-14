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

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * イベント情報
 */
var EventSchema = new Schema({
  /** イベント名 */
  eventName: String,
  /** 開始日時 */
  startDate: String,
  /** 終了日時 */
  endDate: String,

  /** イベント管理者情報 */
  mgrName: String,
  
  /** 開催場所 */
  venue: String,

  /** イベント参加者情報 */
  attendees: [{
//    id: Schema.ObjectId,
    userName: String,
    comment: String,
    attendeeDate: Date
  }],
  /** イベント参加者キャンセル情報 */
  cancels: [{
//    id: Schema.ObjectId,
    userName: String,
    comment: String,
    cancelDate: Date
  }],

  /** イベント概要 */
  abstraction: String,
  /** イベント詳細 */
  comment: String,

  /** イベント作成者情報 */
  createdBy: {
    id: Schema.ObjectId,
    userName: String
  },

  /** イベント情報作成日時 */
  createDate: Date,
  /** イベント情報更新日時 */
  updateDate: Date
});

module.exports = mongoose.model('Event', EventSchema);

