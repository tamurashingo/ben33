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

var express = require('express');
var controller = require('./user.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

/**
 * ユーザ登録を行う
 * - リクエストパラメータ
 *   - username: ユーザ名
 *   - email: メールアドレス
 *   - password: パスワード
 * - レスポンス(JSON)
 *   - result: boolean
 *             登録成功の場合true
 *   - message: string
 *              サーバからの回答
 */
router.post('/signup', controller.signup);

/**
 * 自分のユーザ情報を取得する
 * - リクエストパラメータ
 *   - なし
 *     ヘッダの認証情報からユーザIDを取得する
 * - レスポンス(JSON)
 *   - result: boolean
 *             取得成功の場合true
 *   - user: object
 *     - userid: ユーザID
 *     - username: ユーザ名
 *     - email: メールアドレス
 *     - provider: 認証方式
 *
 */
router.get('/profile', auth.isAuthenticated);
router.get('/profile', controller.getOwnProfile);


/**
 * 他人のユーザ情報を取得する
 * - リクエストパラメータ
 *   - userid: ユーザID(pk)
 * - レスポンス(JSON)
 *   - result: boolean
 *             取得成功の場合true
 *   - user: object
 *     - userid: ユーザID
 *     - username: ユーザ名
 *     - events: 参加／キャンセルしたイベント情報の配列
 *       - eventid: イベントID
 *       - eventtype: 参加した場合は'attend'、キャンセルした場合は'cancel'
 *       - updatedate: 更新日時
 *
 */
router.get('/profile/:id', controller.getProfile);

/**
 * 自分のユーザ情報を更新する
 * - リクエストパラメータ
 *   - username: ユーザ名
 *   - password: パスワード
 * - レスポンス(JSON)
 *   - result: boolean
 *             登録成功の場合true
 *   - message: string
 *              サーバからの回答
 *
 */
router.post('/profile', auth.isAuthenticated);
router.post('/profile', controller.updateProfile);

module.exports = router;
