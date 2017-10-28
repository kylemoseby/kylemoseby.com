'use strict';

/**
 * @ngdoc function
 * @name kylemosebyDotcomApp.controller:ProjectsCtrl
 * @description
 * # ProjectsCtrl
 * Controller of the kylemosebyDotcomApp
 */


angular.module('kylemosebyDotcomApp')
  .controller('CodeCtrl', ['$scope', '$location', '_kylemoseby_', function($scope, $location, _mkm_) {

    $scope.mkm = _mkm_;

    $scope.initOpen = $location.hash();

  }])
  .directive('codepenEmbed', [function() {

    return {
      scope: {
        'penTitle': '=penTitle',
        'slugHash': '=slugHash',
        'showPen': '=showPen'
      },
      templateUrl: 'views/codepen-embed.html',
      link: function($scope) {

        $scope.loadPen = false;
        $scope.showCodepen = $scope.showPen ? true : false;

        $scope.codepenToggle = function() {
          $scope.showCodepen = !$scope.showCodepen;
        };

        /* function __CodePenIFrameAddedToPage() {
         If defined globally thing function could run after Codepen is loaded
        } */

        (function codepenInit() {

          var headID = document.getElementsByTagName("head")[0];
          var newScript = document.createElement('script');

          newScript.type = 'text/javascript';

          var randomID = Math.floor(Math.random() * 1000000000000000);

          newScript.id = 'codepen_' + randomID;

          newScript.src = 'https://production-assets.codepen.io/assets/embed/ei.js';

          headID.appendChild(newScript);

          $scope.loadPen = true;
        })();

      }
    };

  }]);
