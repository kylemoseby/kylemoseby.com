'use strict';

/**
 * @ngdoc directive
 * @name kylemosebyDotcomApp.directive:fpZion
 * @description
 * # fpZion
 */
angular.module('kylemosebyDotcomApp')
  .directive('fpZion', function() {
    return {
      template: '<div class="fp-zion"></div>',
      restrict: 'E',
      link: function postLink() {}
    };
  });
