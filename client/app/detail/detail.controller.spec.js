'use strict';

describe('Controller: DetailCtrl', function () {
  var scope;

  // load the controller's module
  beforeEach(module('ben33App'));

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  describe('各カラムの変換の確認', function () {
    var DetailCtrl,
        $httpBackend,
        stateParams;

    beforeEach(inject(function ($controller, _$httpBackend_) {
      stateParams = {eventId: 1};
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('/api/event/desc/1')
        .respond({
          eventId: 1,
          title: 'イベント名',
          startDate: '12:00',
          endDate: '13:00',
          mgrId: 11,
          venue: '開催場所',
          attendeeId: 21,
          abstraction: 'イベント概要',
          comment: 'イベント詳細',
          attachId: 31,
          createdBy: 41,
          createDate: '2015-04-01 00:00:00',
          updateDate: '2015-04-01 10:00:00',
          userName: 'イベント管理者'
        });
      DetailCtrl = $controller('DetailCtrl', {
        $scope: scope,
        $stateParams: stateParams
      });
    }));

    it('', function () {
      $httpBackend.flush();
console.log('111');
console.log(typeof(scope.detail));
console.log(scope.detail);
//      expect($(scope.detail)).toContain('h1');
      
//console.log(fixture);
//      console.log(scope.detail);
    });

  });


});
