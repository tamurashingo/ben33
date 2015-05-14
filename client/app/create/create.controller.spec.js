'use strict';

describe('Controller: CreateCtrl', function () {
  var CreateCtrl,
      scope;

  // load the controller's module
  beforeEach(function () {
    module('ben33App');
    module('ngMockE2E');
    module(function ($urlRouterProvider) {
      $urlRouterProvider.deferIntercept();
    });
  });


  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CreateCtrl = $controller('CreateCtrl', {
      $scope: scope
    });
  }));
  

  describe('登録成功時', function () {
    var $httpBackend;

    beforeEach(inject(function (_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectPOST('/api/event')
        .respond({result: true,
                  message: '登録成功'});
    }));

    it('登録成功時はボタンが非活性になっていること', function () {
      scope.eventName = 'イベントゥ';
      scope.mgr = 'イベントゥ管理者';
      scope.regist();
      $httpBackend.flush();
      expect(scope.registButton).toBe(false);
    });
    
  });

  describe('登録失敗時', function () {
    var $httpBackend;

    beforeEach(inject(function (_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectPOST('/api/event')
        .respond({result: false,
                  message: '登録失敗'});
    }));

    it('登録失敗時はボタンが活性状態になっていること', function () {
      scope.eventName = 'イベントゥ';
      scope.mgr = 'イベントゥ管理者';
      scope.regist();
      $httpBackend.flush();
      expect(scope.registButton).toBe(true);
    });
  });
  
});
