'use strict';

describe('Controller: DetailCtrl', function () {
  var scope;

  // load the controller's module
  beforeEach(function () {
    module('ben33App');
    module('ngMockE2E');
    module(function ($urlRouterProvider) {
      $urlRouterProvider.deferIntercept();
    });
  });


  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  describe('各カラムの変換の確認 参加:0 キャンセル:0', function () {
    var DetailCtrl,
        $httpBackend,
        stateParams,
        response = {
          result: true,
          event: {
            _id: 1,
            eventName: 'イベント名',
            startDate: '12:00',
            endDate: '13:00',
            createdBy: {
              _id: 2,
              username: 'イベント管理者'
            },
            venue: '開催場所',
            attends: [
            ],
            cancels: [
            ],
            abstraction: 'イベント概要',
            comment: 'イベント詳細',
            createDate: '2015-04-01 00:00:00',
            updateDate: '2015-04-01 10:00:00'
          }
        };

    beforeEach(inject(function ($controller, _$httpBackend_) {
      stateParams = {eventId: 1};
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('/api/event/desc/1')
        .respond(response);
      DetailCtrl = $controller('DetailCtrl', {
        $scope: scope,
        $stateParams: stateParams
      });
    }));

    it('イベントIDが設定されていること', function () {
      $httpBackend.flush();
      jasmine.getFixtures().set(scope.detail);
      expect($('p:first')).toContainText('event id:1');
    });

    it('イベント名が設定されていること', function () {
      $httpBackend.flush();
      jasmine.getFixtures().set(scope.detail);
      expect($('h1')).toContainText('イベント名');
    });

    it('開始日時が設定されていること', function () {
      $httpBackend.flush();
      jasmine.getFixtures().set(scope.detail);
      expect($('h3:eq(0)')).toContainText('12:00');
    });

    it('終了日時が設定されていること', function () {
      $httpBackend.flush();
      jasmine.getFixtures().set(scope.detail);
      expect($('h3:eq(0)')).toContainText('13:00');
    });

    it('開催場所が設定されていること', function () {
      $httpBackend.flush();
      jasmine.getFixtures().set(scope.detail);
      expect($('h3:eq(1)')).toContainText('開催場所');
    });

    it('イベント管理者が設定されていること', function () {
      $httpBackend.flush();
      jasmine.getFixtures().set(scope.detail);
      expect($('h4:eq(0)')).toContainText('イベント管理者');
    });

    it('イベント概要が設定されていること', function () {
      $httpBackend.flush();
      jasmine.getFixtures().set(scope.detail);
      expect($('p:eq(1)')).toContainText('イベント概要');
    });

    it('イベント詳細が設定されていること', function () {
      $httpBackend.flush();
      jasmine.getFixtures().set(scope.detail);
      expect($('p:eq(2)')).toContainText('イベント詳細');
    });
  });

});
