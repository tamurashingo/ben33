'use strict';

angular.module('ben33App')
  .factory('Util', ['marked', function (marked) {

    return {
      md2html: function (md) {
        return marked(md);
      }
    };
    
  }])
;
