'use strict';

var express = require('express');
var controller = require('./event.controller');

var router = express.Router();


/**
 * イベント一覧
 *
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



