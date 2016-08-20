'use strict';

/**
 * @ngdoc directive
 * @name kylemosebyDotcomApp.directive:fp100
 * @description
 * # fp100
 */
angular.module('kylemosebyDotcomApp')
  .directive('fp100', function() {
    return {
      template: '<div class="fp-100"><div class="fp-100-lg" hide-sm hide-md></div></div>',
      restrict: 'E',
      link: function postLink() {
        // element.text('this is the fp100 directive');
      }
    };
  });
