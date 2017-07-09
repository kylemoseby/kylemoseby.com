angular.module("flickrDemo", ["mkm.flickr"]).controller("flickrDemoCtrl", [
  "$scope",
  "$http",
  function($scope) {
    $scope.flickrID = '91631856@N00';
  }
]);

angular
  .module("mkm.flickr", ["API", "ngMaterial"])
  .config([
    "$qProvider",
    function($qProvider) {
      $qProvider.errorOnUnhandledRejections(false);
    }
  ])
  .config([
    "$sceDelegateProvider",
    function($sceDelegateProvider) {
      $sceDelegateProvider.resourceUrlWhitelist([
        "self",
        "https://api.flickr.com/services/rest/**"
      ]);
    }
  ])
  .service("restAPI", [
    "$http",
    "$api",
    function($http, $api) {
      var apiKey = $api.flickr;

      var trustedURL = "https://api.flickr.com/services/rest/";

      function _getPhotoset(setid) {
        return $http({
          method: "GET",
          url: trustedURL,
          params: {
            nojsoncallback: 1,
            method: "flickr.photosets.getPhotos",
            api_key: apiKey,
            photoset_id: setid,
            extras: "description",
            format: "json"
          }
        });
      }

      function _getRecent(userid) {
        return $http({
          method: "GET",
          url: trustedURL,
          params: {
            nojsoncallback: 1,
            method: "flickr.people.getPhotos",
            user_id: userid,
            api_key: apiKey,
            extras: "o_dims,description",
            format: "json",
            per_page: 500
          }
        });
      }

      function _getImg(imgid) {
        return $http({
          method: "GET",
          url: trustedURL,
          params: {
            nojsoncallback: 1,
            method: "flickr.photos.getInfo",
            api_key: apiKey,
            photo_id: imgid,
            format: "json"
          }
        });
      }

      return {
        getPhotoset: _getPhotoset,
        getRecent: _getRecent,
        getImg: _getImg
      };
    }
  ])
  .directive("recentPhotos", [
    "restAPI",
    "$mdPanel",
    function($flickr, $mdPanel) {
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
          
          console.log(data);
          scope.recent = data.data.photos.photo;

          scope.thumbnailsAdd();
        });

        scope.thumbnailsAdd = function() {
          scope.photoCount += scope.photoStep;

          scope.thumbnailsShow = scope.recent.slice(0, scope.photoCount);
        };

        scope.thumbnailClick = function($event, img, ind) {
          scope.photoDetail = img;

          var position = this.detailPanel
            .newPanelPosition()
            .absolute()
            .center();

          /* OPEN THE PANEL */
          this.detailPanel.open({
            attachTo: angular.element(document.body),
            controller: photoDetailCtrl,
            controllerAs: "ctrl",
            disableParentScroll: true,
            templateUrl: "flickr/flickr-photo-detail.html",
            hasBackdrop: true,
            panelClass: "flickr-photo-detail",
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

        function photoDetailCtrl(
          $scope,
          mdPanelRef,
          photoDetail,
          detailIndex,
          photos
        ) {
          $scope._mdPanelRef = mdPanelRef;

          $scope.photoDetail = photoDetail;
          $scope.detailIndex = detailIndex;
          $scope.photos = photos;

          $scope.detailClose = function() {
            this._mdPanelRef.close().then(function() {
              angular.element(document.querySelector(".recent-tile")).focus();
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
          return element.attr("new-view") || "flickr/flickr-recent.html";
        },
        restrict: "E",
        scope: {
          flickrID: "=flickrId",
          countInit: "=count",
          step: "=step"
        }
      };
    }
  ]);

angular.module("mkm.flickr").run([
  "$templateCache",
  function($templateCache) {
    "use strict";
    $templateCache.put(
      "flickr/flickr-img.html",
      '<img ng-src="https://farm{{img.farm-id}}.staticflickr.com/{{img.server-id}}/{{img.id}}_{{img.secret}}_{{size}}.jpg">'
    );

    $templateCache.put(
      "flickr/flickr-photo-detail.html",
      '<!-- PHOTODETAIL START --> <div class="flickr-detail-photo"> <flickr-img info="photoDetail"></flickr-img> <div class="recent-detail-descrip"> {{photoDetail.title}} {{photoDetail.description._content}} </div> <nav> <ul class="pager"> <li ng-show="detailIndex > 0"> <a ng-click="detailPrev()"> <span class="glyphicon glyphicon-chevron-left"></span> </a> </li> <li> <a ng-click="detailClose()"> <span class="glyphicon glyphicon-remove"></span> </a> </li> <li ng-show="detailIndex < photos.length - 1"> <a ng-click="detailNext()"> <span class="glyphicon glyphicon-chevron-right"></span> </a> </li> </ul> </nav> </div> <!-- PHOTODETAIL END -->'
    );

    $templateCache.put(
      "flickr/flickr-recent.html",
      '<!-- ERROR START --> <br> <div class="alert alert-danger" role="alert" ng-show="recent.stat == \'fail\'"> <b>An error occurred</b> <br> Code: {{recent.code}} / Message: {{recent.message}} </div> <!-- ERROR END --> <!-- THUMBNAILS START --> <md-grid-list md-cols="2" md-cols-gt-xs="5" md-cols-gt-lg="7" md-row-height="1:1" md-gutter="10px"> <md-grid-tile class="recent-photos" ng-repeat="img in thumbnailsShow"> <img ng-src="https://farm{{img.farm-id}}.staticflickr.com/{{img.server-id}}/{{img.id}}_{{img.secret}}_q.jpg" ng-click="thumbnailClick($event, img, $index)"> </md-grid-tile> </md-grid-list> <!-- THUMBNAILS END --> <!-- NAV START --> <nav> <ul class="pager" ng-hide="recent.photos.photo.length === 0"> <li> <a ng-click="thumbnailsAdd()"> <span class="glyphicon glyphicon-plus"></span> </a> </li> </ul> </nav> <!-- NAV END -->'
    );
  }
]);
