'use strict';

describe('Controller: MainCtrl', function () {
  var MainCtrl,
      scope;

  // load the controller's module
  beforeEach(module('ben33App'));

  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));


  describe('0件', function () {
    var $httpBackend;

    beforeEach(inject(function (_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('/api/event/page/0')
        .respond({
          prev: false,
          next: false,
          total: 0,
          result: []
        });
    }));

    it('戻るボタンが非活性であること', function () {
      $httpBackend.flush();
      expect(scope.prevButton).toBe(false);
    });
    it('次へボタンが非活性であること', function () {
      $httpBackend.flush();
      expect(scope.nextButton).toBe(false);
    });
    it('イベント件数が0件であること', function () {
      $httpBackend.flush();
      expect(scope.allEvents.length).toBe(0);
    });
  });


  describe('全15件/1ページ目', function () {
    var $httpBackend;

    beforeEach(inject(function (_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('/api/event/page/0')
        .respond({
          prev: false,
          next: true,
          total: 2,
          result: [{
            eventId: 1,
            title: 'テスト1',
            startDate: '1:00',
            endDate: '1:30',
            venue: '会場101',
          }, {
            eventId: 2,
            title: 'テスト2',
            startDate: '2:00',
            endDate: '2:30',
            venue: '会場102',
          }, {
            eventId: 3,
            title: 'テスト3',
            startDate: '3:00',
            endDate: '3:30',
            venue: '会場103',
          }, {
            eventId: 4,
            title: 'テスト4',
            startDate: '4:00',
            endDate: '4:30',
            venue: '会場104',
          }, {
            eventId: 5,
            title: 'テスト5',
            startDate: '5:00',
            endDate: '5:30',
            venue: '会場105',
          }, {
            eventId: 6,
            title: 'テスト6',
            startDate: '6:00',
            endDate: '6:30',
            venue: '会場106',
          }, {
            eventId: 7,
            title: 'テスト7',
            startDate: '7:00',
            endDate: '7:30',
            venue: '会場107',
          }, {
            eventId: 8,
            title: 'テスト8',
            startDate: '8:00',
            endDate: '8:30',
            venue: '会場108',
          }, {
            eventId: 9,
            title: 'テスト9',
            startDate: '9:00',
            endDate: '9:30',
            venue: '会場109',
          }, {
            eventId: 10,
            title: 'テスト10',
            startDate: '10:00',
            endDate: '10:30',
            venue: '会場110',
          }]
        });
    }));

    it('戻るボタンが非活性であること', function () {
      $httpBackend.flush();
      expect(scope.prevButton).toBe(false);
    });
    it('次へボタンが活性であること', function () {
      $httpBackend.flush();
      expect(scope.nextButton).toBe(true);
    });
    it('イベント件数が10件であること', function () {
      $httpBackend.flush();
      expect(scope.allEvents.length).toBe(10);
    });
    it('レスポンス順に表示されること', function () {
      $httpBackend.flush();
      expect(scope.allEvents[0].eventId).toBe(1);
    });
  });


  describe('全15件/2ページ目', function () {
    var $httpBackend;

    beforeEach(inject(function (_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('/api/event/page/0')
        .respond({
          prev: true,
          next: false,
          total: 2,
          result: [{
            eventId: 11,
            title: 'テスト11',
            startDate: '11:00',
            endDate: '11:30',
            venue: '会場111',
          }, {
            eventId: 12,
            title: 'テスト12',
            startDate: '12:00',
            endDate: '12:30',
            venue: '会場112',
          }, {
            eventId: 13,
            title: 'テスト13',
            startDate: '13:00',
            endDate: '13:30',
            venue: '会場113',
          }, {
            eventId: 14,
            title: 'テスト14',
            startDate: '14:00',
            endDate: '14:30',
            venue: '会場114',
          }, {
            eventId: 15,
            title: 'テスト15',
            startDate: '15:00',
            endDate: '15:30',
            venue: '会場115',
          }]
        });
    }));

    it('戻るボタンが活性であること', function () {
      $httpBackend.flush();
      expect(scope.prevButton).toBe(true);
    });
    it('次へボタンが非活性であること', function () {
      $httpBackend.flush();
      expect(scope.nextButton).toBe(false);
    });
    it('イベント件数が5件であること', function () {
      $httpBackend.flush();
      expect(scope.allEvents.length).toBe(5);
    });
    it('レスポンス順に表示されること', function () {
      $httpBackend.flush();
      expect(scope.allEvents[0].eventId).toBe(11);
    });
  });

});
