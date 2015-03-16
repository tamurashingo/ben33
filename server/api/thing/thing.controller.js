/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');

// Get list of things
exports.index = function(req, res) {
  res.json([
  {
    eventId: 4,
    title: 'テストイベント',
    startDate: '2015-03-16 19:00',
    endDate: '2015-03-16 21:00',
    mgrId: '',
    venue: 'オンライン',
    attendeeId: '',
    abstraction: 'システムが自動生成したテストイベントです。自由に参加登録や資料登録を行ってみてください。',
    comment: '',
    atachId: '',
    createdBy: '',
    createDate: '2015-03-16 19:00',
    updateDate: '2015-03-16 19:00'
  },
  {
    eventId: 3,
    title: 'テストイベント',
    startDate: '2015-03-16 19:00',
    endDate: '2015-03-16 21:00',
    mgrId: '',
    venue: 'オンライン',
    attendeeId: '',
    abstraction: 'システムが自動生成したテストイベントです。自由に参加登録や資料登録を行ってみてください。',
    comment: '',
    atachId: '',
    createdBy: '',
    createDate: '2015-03-16 19:00',
    updateDate: '2015-03-16 19:00'
  },
  {
    eventId: 2,
    title: 'テストイベント',
    startDate: '2015-03-16 19:00',
    endDate: '2015-03-16 21:00',
    mgrId: '',
    venue: 'オンライン',
    attendeeId: '',
    abstraction: 'システムが自動生成したテストイベントです。自由に参加登録や資料登録を行ってみてください。',
    comment: '',
    atachId: '',
    createdBy: '',
    createDate: '2015-03-16 19:00',
    updateDate: '2015-03-16 19:00'
  },
  {
    eventId: 1,
    title: '導入おめでとう会',
    startDate: '2015-03-16 19:00',
    endDate: '2015-03-16 21:00',
    mgrId: '',
    venue: 'オンライン',
    attendeeId: '',
    abstraction: 'Ben33導入を記念してお祝いをします。このイベントはインストール時にシステムが自動生成したイベントです。',
    comment: '',
    atachId: '',
    createdBy: '',
    createDate: '2015-03-16 19:00',
    updateDate: '2015-03-16 19:00'
  }
  ]);
};
