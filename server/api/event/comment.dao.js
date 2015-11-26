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

var Comment = require('./comment.model');
var Promise = require('bluebird');


function getComment(commentid) {
  return new Promise(function (resolve, reject) {
    Comment.findById(commentid)
      .exec(function (error, comment) {
	if (error) {
	  reject({
	    result: false,
	    message: 'データベースエラー',
	    desc: error
	  });
	}

	if (!comment) {
	  reject({
	    result: false,
	    message: 'コメントが見つかりません',
	    desc: ''
	  });
	}
	resolve(comment);
      });
  });
}

exports.getComment = function (commentid) {
  return getComment(commentid);
};

exports.insert = function (userid, comment) {
  var now = (new Date()).toFormat('YYYY/MM/DD HH24:MI:SS'),
      data = {
	comment: comment,
	createdBy: userid,
	updateDate: now
      };

  return new Promise(function (resolve, reject) {
    Comment.insert(data)
      .exec(function (error, comment) {
	if (error) {
	  reject({
	    result: false,
	    message: 'データベースエラー',
	    desc: error
	  });
	}

	resolve(comment);
      });
  });
	
};
