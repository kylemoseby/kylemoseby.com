'use strict';

/**
 * @ngdoc directive
 * @name kylemosebyDotcomApp.directive:fpDonotenter
 * @description
 * # fpDonotenter
 */
angular.module('kylemosebyDotcomApp')
  .directive('fpDonotenter', function() {
    return {
      template: '<div class="fp-donotenter"></div>',
      restrict: 'E',
      link: function postLink() {}
    };
  });
