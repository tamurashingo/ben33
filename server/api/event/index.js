'use strict';

var express = require('express');
var controller = require('./event.controller');

var router = express.Router();


/**
 * 一覧面用のイベント概要を10件取得する。
 * - リクエストパラメータ
 *   - ページ番号pp
 * - レスポンス(JSON)
 *   - prev: boolean
 *           前のページがある場合true
 *   - next: boolean
 *           次のページがある場合true
 *   - total: number
 *            全ページ数
 *   - result: object
 *             Eventモデルオブジェクト
 *     - eventId: イベントID
 *     - title: イベント名
 *     - startDate: イベント開始日時
 *     - endDate: イベント終了日時
 *     - mgrId: イベント管理者のID
 *     - venue: 開催場所
 *     - attendeeId: イベント参加者へのID
 *     - abstraction: イベント概要
 *     - comment: イベント詳細
 *     - attachId: 添付へのID
 *     - createdBy: イベント情報作成者ID
 *     - createDate: イベント情報作成日時
 *     - updateDate: イベント情報更新日時
 *
 */
router.get('/page/:pageNo', controller.index);

/**
 * イベント詳細
 *
 *
 */
router.get('/desc/:eventId', controller.description);

/**
 * イベント登録
 *
 *
 */
router.post('/', controller.regist);

/**
 * イベント情報更新
 *
 *
 */
router.put('/:eventId', controller.update);


/**
 * プレビュー
 *
 */
router.post('/preview', controller.preview);

module.exports = router;



