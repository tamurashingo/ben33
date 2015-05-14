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
var controller = require('./event.controller');

var router = express.Router();


/**
 * 一覧面用のイベント概要を10件取得する。
 * - リクエストパラメータ
 *   - ページ番号
 * - レスポンス(JSON)
 *   - prev: boolean
 *           前のページがある場合true
 *   - next: boolean
 *           次のページがある場合true
 *   - total: number
 *            全ページ数
 *   - result: object
 *             Eventモデルオブジェクト
 *     - _id: イベントID
 *     - eventName: イベント名
 *     - startDate: イベント開始日時
 *     - endDate: イベント終了日時
 *     - mgrName: イベント管理者
 *     - venue: 開催場所
 *     - attendees: イベント参加者情報の配列
 *       - id: id
 *       - userName: ユーザ名
 *       - comment: コメント
 *       - attendeeDate: 登録日時
 *     - cancels: イベント参加者キャンセル情報の配列
 *       - id: id
 *       - userName: ユーザ名
 *       - comment: コメント
 *       - cancelDate: キャンセル日時
 *     - abstraction: イベント概要
 *     - comment: イベント詳細
 *     - createdBy: イベント作成者情報
 *       - id: id
 *       - userName: ユーザ名
 *     - createDate: イベント情報作成日時
 *     - updateDate: イベント情報更新日時
 */
router.get('/page/:pageNo', controller.index);

/**
 * 詳細画面用のイベント情報を１件取得する。
 * - リクエストパラメータ
 *   - イベントID
 * - レスポンス(JSON)
 *   - _id: イベントID
 *   - eventName: イベント名
 *   - startDate: イベント開始日時
 *   - endDate: イベント終了日時
 *   - mgrName: イベント管理者
 *   - venue: 開催場所
 *   - attendees: イベント参加者情報の配列
 *     - id: id
 *     - userName: ユーザ名
 *     - comment: コメント
 *     - attendeeDate: 登録日時
 *   - cancels: イベント参加者キャンセル情報の配列
 *     - id: id
 *     - userName: ユーザ名
 *     - comment: コメント
 *     - cancelDate: キャンセル日時
 *   - abstraction: イベント概要
 *   - comment: イベント詳細
 *   - createdBy: イベント作成者情報
 *     - id: id
 *     - userName: ユーザ名
 *   - createDate: イベント情報作成日時
 *   - updateDate: イベント情報更新日時
 */
router.get('/desc/:id', controller.show);

/**
 * イベントを１件登録する。
 * - リクエストパラメータ
 *   - eventName: イベント名
 *   - startDate: イベント開始日時
 *   - endDate: イベント終了日時
 *   - mgrName: イベント管理者
 *   - venue: 開催場所
 *   - abstraction: イベント概要
 *   - desc: イベント詳細
 *   - createdBy: イベント作成者情報
 *     - id: id
 *     - userName: ユーザ名
 */
router.post('/', controller.regist);


/**
 * イベント参加登録
 * - リクエストパラメータ
 *   - userName: ユーザ名
 *   - comment: コメント
 */
router.post('/entry', controller.entry);


/**
 * プレビュー
 *
 */
//router.post('/preview', controller.preview);

module.exports = router;



