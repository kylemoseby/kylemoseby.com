'use strict';

/**
 * @ngdoc directive
 * @name mkm.flickr.directive:recentPhotos
 * @description
 * # recentPhotos
 */
angular.module('mkm.flickr')
  .directive('recentPhotos', ['restAPI', '$mdPanel', function($flickr, $mdPanel) {

    function link(scope) {

      scope.detailPanel = $mdPanel;

      scope.detailIndex = null;
      scope.photoDetail = null;
      scope.thumbnailsShow = [];

      scope.recent = [];

      scope.photoStep = scope.photoStep || 5;
      scope.photoCount = scope.countInit - scope.photoStep || 0;


      var photoData = new $flickr.getRecent(scope.flickrID);

      photoData.then(function(data) {

        scope.recent = data.data.photos.photo;

        scope.thumbnailsAdd();

      });

      scope.thumbnailsAdd = function() {

        scope.photoCount += scope.photoStep;

        scope.thumbnailsShow = scope.recent.slice(0, scope.photoCount);

      };

      scope.thumbnailClick = function($event, img, ind) {

        scope.photoDetail = img;

        var position = this.detailPanel.newPanelPosition()
          .absolute()
          .center();

        /* OPEN THE PANEL */
        this.detailPanel.open({
          attachTo: angular.element(document.body),
          controller: photoDetailCtrl,
          controllerAs: 'ctrl',
          disableParentScroll: true,
          templateUrl: 'flickr/flickr-photo-detail.html',
          hasBackdrop: true,
          panelClass: 'flickr-photo-detail',
          position: position,
          trapFocus: true,
          zIndex: 150,
          clickOutsideToClose: true,
          escapeToClose: true,
          focusOnOpen: true,
          targetEvent: $event,
          locals: {
            photoDetail: scope.photoDetail,
            detailIndex: ind,
            photos: scope.thumbnailsShow
          }
        });
      };


      function photoDetailCtrl($scope, mdPanelRef, photoDetail, detailIndex, photos) {

        $scope._mdPanelRef = mdPanelRef;

        $scope.photoDetail = photoDetail;
        $scope.detailIndex = detailIndex;
        $scope.photos = photos;

        $scope.detailClose = function() {

          this._mdPanelRef.close().then(function() {

            angular.element(document.querySelector('.recent-tile')).focus();

          });
        };

        $scope.detailNext = function() {

          $scope.detailIndex++;

          photoDetailSet($scope.detailIndex);

        };

        $scope.detailPrev = function() {

          $scope.detailIndex--;

          photoDetailSet($scope.detailIndex);

        };


        function photoDetailSet(ind) {
          $scope.photoDetail = $scope.photos[ind];
        }

      }

    }

    return {
      link: link,
      templateUrl: function(element) {

        return element.attr('new-view') || 'flickr/flickr-recent.html';
      },
      restrict: 'E',
      scope: {
        flickrID: '=flickrId',
        countInit: '=count',
        step: '=step'
      }
    };
  }]);
