'use strict';

angular.module('ben33App')
  .controller('CreateCtrl', ['$scope', '$sce', 'createService', function($scope, $sce, createService) {

    function concat(scope) {
      var obj = {
        eventName: scope.eventName,
        startDate: scope.startDate,
        endDate: scope.endDate,
        venue: scope.venue,
        mgr: scope.mgr,
        abstraction: scope.abstraction,
        desc: scope.desc
      };
      var markdown = createService.concatEvent(obj);
      return markdown;
    }

    $scope.$watchGroup([
      'eventName',
      'startDate',
      'endDate',
      'venue',
      'mgr',
      'abstraction',
      'desc'],
      function(oldVal, newVal) {
        var markdown = concat($scope);
        createService.convertMarkdown(markdown)
          .then(function (html) {
            $scope.preview = html;
          });
      });
  }]);
