'use strict';

var should = require('should');
var Event = require('./event.model');
var eventlogic = require('./event.logic');

/**
 * テストデータ.
 * 1ページ未満のデータ量
 */
var testdata_01_09 = [{
  eventName: 'event 01',
  startDate: '12:00',
  endDate: '13:00',
  venue: '東京駅',
  attends: [],
  abstraction: '最初のイベント',
  comment: '最初のイベントを開催します',
  createDate: new Date('Mon, 11 Oct 2015 00:00:00 +0900'),
  updateDate: new Date('Mon, 11 Oct 2015 00:00:00 +0900')
}, {
  eventName: 'event 02',
  startDate: '14:00',
  endDate: '15:00',
  venue: '有楽町駅',
  attends: [],
  abstraction: '２回目のイベント',
  comment: '２回目のイベントを開催します',
  createDate: new Date('Mon, 11 Oct 2015 01:00:00 +0900'),
  updateDate: new Date('Mon, 11 Oct 2015 01:00:00 +0900')
}, {
  eventName: 'event 03',
  startDate: '15:00',
  endDate: '16:00',
  venue: '新橋駅',
  attends: [],
  abstraction: '３回目のイベント',
  comment: '３回目のイベントを開催します',
  createDate: new Date('Mon, 11 Oct 2015 02:00:00 +0900'),
  updateDate: new Date('Mon, 11 Oct 2015 02:00:00 +0900')
}, {
  eventName: 'event 04',
  startDate: '15:00',
  endDate: '16:00',
  venue: '浜松町駅',
  attends: [],
  abstraction: '４目のイベント',
  comment: '４回目のイベントを開催します',
  createDate: new Date('Mon, 11 Oct 2015 03:00:00 +0900'),
  updateDate: new Date('Mon, 11 Oct 2015 03:00:00 +0900')
}, {
  eventName: 'event 05',
  startDate: '16:00',
  endDate: '17:00',
  venue: '田町駅',
  attends: [],
  abstraction: '５目のイベント',
  comment: '５回目のイベントを開催します',
  createDate: new Date('Mon, 11 Oct 2015 04:00:00 +0900'),
  updateDate: new Date('Mon, 11 Oct 2015 04:00:00 +0900')
}, {
  eventName: 'event 06',
  startDate: '17:00',
  endDate: '18:00',
  venue: '品川駅',
  attends: [],
  abstraction: '６目のイベント',
  comment: '６回目のイベントを開催します',
  createDate: new Date('Mon, 11 Oct 2015 05:00:00 +0900'),
  updateDate: new Date('Mon, 11 Oct 2015 05:00:00 +0900')
}, {
  eventName: 'event 07',
  startDate: '18:00',
  endDate: '19:00',
  venue: '大崎駅',
  attends: [],
  abstraction: '７目のイベント',
  comment: '７回目のイベントを開催します',
  createDate: new Date('Mon, 11 Oct 2015 06:00:00 +0900'),
  updateDate: new Date('Mon, 11 Oct 2015 06:00:00 +0900')
}, {
  eventName: 'event 08',
  startDate: '19:00',
  endDate: '20:00',
  venue: '五反田駅',
  attends: [],
  abstraction: '８目のイベント',
  comment: '８回目のイベントを開催します',
  createDate: new Date('Mon, 11 Oct 2015 07:00:00 +0900'),
  updateDate: new Date('Mon, 11 Oct 2015 07:00:00 +0900')
}, {
  eventName: 'event 09',
  startDate: '20:00',
  endDate: '21:00',
  venue: '目黒駅',
  attends: [],
  abstraction: '９目のイベント',
  comment: '９回目のイベントを開催します',
  createDate: new Date('Mon, 11 Oct 2015 08:00:00 +0900'),
  updateDate: new Date('Mon, 11 Oct 2015 08:00:00 +0900')
}];

/**
 * テストデータ.
 * 1ページちょうどのデータ量
 *
 */
var testdata_10 = [{
  eventName: 'event 10',
  startDate: '20:00',
  endDate: '21:00',
  venue: '目黒駅',
  attends: [],
  abstraction: '１０目のイベント',
  comment: '１０回目のイベントを開催します',
  createDate: new Date('Mon, 11 Oct 2015 09:00:00 +0900'),
  updateDate: new Date('Mon, 11 Oct 2015 09:00:00 +0900')
}];

/**
 * テストデータ.
 * 2ページ分のデータ量
 *
 */
var testdata_11_12 = [{
  eventName: 'event 11',
  startDate: '21:00',
  endDate: '22:00',
  venue: '恵比寿駅',
  attends: [],
  abstraction: '１１目のイベント',
  comment: '１１回目のイベントを開催します',
  createDate: new Date('Mon, 11 Oct 2015 12:00:00 +0900'),
  updateDate: new Date('Mon, 11 Oct 2015 12:00:00 +0900')
}, {
  eventName: 'event 12',
  startDate: '22:00',
  endDate: '23:00',
  venue: '渋谷駅',
  attends: [],
  abstraction: '１２目のイベント',
  comment: '１２回目のイベントを開催します',
  createDate: new Date('Mon, 11 Oct 2015 11:00:00 +0900'),
  updateDate: new Date('Mon, 11 Oct 2015 11:00:00 +0900')
}];

describe('event', function () {
  beforeEach(function (done) {
    // Clear events before testing
    Event.remove().exec().then(function () {
      done();
    });
  });

  it('一覧情報の取得 0件', function (done) {
    var req = {
      pageNo: '0'
    };
    eventlogic.getEventIndex(req)
      .then(function (result) {
        result.prev.should.equal(false, '前ページがないこと');
        result.next.should.equal(false, '次ページがないこと');
        result.result.length.should.equal(0, '取得件数が0件であること');
        result.total.should.equal(1, 'ページ数が1であること');
        done();
      })
      .error(function (error) {
        done(error);
      });
  });

  it('一覧情報の取得 9件', function (done) {
    Event.collection.insert(testdata_01_09, function (error, docs) {
      if (error) {
        done(error);
      }
      var req = {
        pageNo: '0'
      };
      eventlogic.getEventIndex(req)
        .then(function (result) {
          result.prev.should.equal(false, '前ページがないこと');
          result.next.should.equal(false, '次ページがないこと');
          result.result.length.should.equal(9, '取得件数が9件であること');
          result.total.should.equal(1, 'ページ数が1であること');

          result.result[0].eventName.should.equal('event 09', '表示順の確認');
          result.result[1].eventName.should.equal('event 08', '表示順の確認');

          done();
        })
        .error(function (error) {
          done(error);
        });
    });
  });


  it('一覧情報の取得 10件', function (done) {
    var testdata = testdata_01_09.concat(testdata_10);
    Event.collection.insert(testdata, function (error, docs) {
      if (error) {
        done(error);
      }
      var req = {
        pageNo: '0'
      };
      eventlogic.getEventIndex(req)
        .then(function (result) {
          result.prev.should.equal(false, '前ページがないこと');
          result.next.should.equal(false, '次ページがないこと');
          result.result.length.should.equal(10, '取得件数が10件であること');
          result.total.should.equal(1, 'ページ数が1であること');

          result.result[0].eventName.should.equal('event 10', '表示順の確認');
          result.result[1].eventName.should.equal('event 09', '表示順の確認');
          
          done();
        })
        .error(function (error) {
          done(error);
        });
    });    
  });
  
  it('一覧情報の取得 12件 - 1/2ページ', function (done) {
    var testdata = testdata_01_09.concat(testdata_10, testdata_11_12);
    Event.collection.insert(testdata, function (error, docs) {
      if (error) {
        done(error);
      }
      var req = {
        pageNo: '0'
      };
      eventlogic.getEventIndex(req)
        .then(function (result) {
          result.prev.should.equal(false, '前ページがないこと');
          result.next.should.equal(true, '次ページがあること');
          result.result.length.should.equal(10, '取得件数が10件であること');
          result.total.should.equal(2, 'ページ数が2であること');

          result.result[0].eventName.should.equal('event 11', '表示順の確認');
          result.result[1].eventName.should.equal('event 12', '表示順の確認');
          
          done();
        })
        .error(function (error) {
          done(error);
        });
    });    
  });

  it('一覧情報の取得 12件 - 2/2ページ', function (done) {
    var testdata = testdata_01_09.concat(testdata_10, testdata_11_12);
    Event.collection.insert(testdata, function (error, docs) {
      if (error) {
        done(error);
      }
      var req = {
        pageNo: '1'
      };
      eventlogic.getEventIndex(req)
        .then(function (result) {
          result.prev.should.equal(true, '前ページがあること');
          result.next.should.equal(false, '次ページがないこと');
          result.result.length.should.equal(2, '取得件数が2件であること');
          result.total.should.equal(2, 'ページ数が2であること');

          result.result[0].eventName.should.equal('event 02', '表示順の確認');
          result.result[1].eventName.should.equal('event 01', '表示順の確認');
          
          done();
        })
        .error(function (error) {
          done(error);
        });
    });    
  });
});

