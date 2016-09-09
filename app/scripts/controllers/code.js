'use strict';

/**
 * @ngdoc function
 * @name kylemosebyDotcomApp.controller:ProjectsCtrl
 * @description
 * # ProjectsCtrl
 * Controller of the kylemosebyDotcomApp
 */
angular.module('kylemosebyDotcomApp')
  .controller('CodeCtrl', ['$scope', function($scope) {

    $scope.albumID = '72157641683609583';

    $scope.flickrID = '91631856@N00';

    // public URL for all flickr codepen dependencies
    var flickrRoot = 'https://kylemoseby.github.io/angular-flickr-integrations/';
    var crimeRepRoot = 'https://kylemoseby.github.io/angular-seattle-crime-data/';

    // External JS files for flickr codens
    var flickrExtJS = [
      'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular.js',
      'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-animate.min.js',
      'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-route.min.js',
      'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-aria.min.js',
      'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-messages.min.js',
      'https://cdn.gitcdn.link/cdn/angular/bower-material/v1.1.0/angular-material.js',
      flickrRoot + 'app/flickr/flickr-restapi.js',
      flickrRoot + 'app/flickr/flickr-img.js',
      flickrRoot + 'source/angular-flickr-templates.js',
      'https://dl.dropboxusercontent.com/u/227926/MiscWeb/api_key.js'
    ];

    $scope.codepen = {
      flickrAlbum: {
        'title': 'Flickr Album',
        'description': 'A Flickr API integration written in Angular',
        'tags': ['flickr', 'angular'],
        'layout': 'left',
        'html': flickrRoot + 'app/views/flickr-album-codepen.html',
        'css': flickrRoot + 'less/flickr-albums.less',
        'css_pre_processor': 'less',
        'js': flickrRoot + 'app/flickr/flickr-album.js',
        'head': '<meta name=\"viewport\" content=\"width=device-width\">',
        'css_external': [
          flickrRoot + '/styles/main.css',
          flickrRoot + 'styles/vendor.css'
        ],
        'js_external': flickrExtJS
      },
      flickrRecent: {
        'title': 'Flickr Recent Photos',
        'gitrepo': 'https://github.com/kylemoseby/angular-flickr-integrations',
        'description': 'A Flickr API integration written in Angular',
        'tags': ['flickr', 'angular'],
        'layout': 'left',
        'html': flickrRoot + 'app/views/flickr-recent-codepen.html',
        'css': flickrRoot + 'less/flickr-recents.less',
        'css_pre_processor': 'less',
        'js': flickrRoot + 'app/flickr/flickr-recent.js',
        'head': '<meta name=\"viewport\" content=\"width=device-width\">',
        'css_external': [
          flickrRoot + '/styles/main.css',
          flickrRoot + 'styles/vendor.css'
        ],
        'js_external': flickrExtJS
      },
      seaCrimeMap: {
        'title': 'Seattle Crime Map',
        'gitrepo': 'https://github.com/kylemoseby/angular-seattle-crime-data',
        'description': '',
        'tags': ['flickr', 'angular'],
        'layout': 'left',
        'html': crimeRepRoot + 'codepen-map-canvas.html',
        'css': crimeRepRoot + 'app/styles/crime-map.less',
        'css_pre_processor': 'less',
        'js': crimeRepRoot + 'app/scripts/sea-crime/crime-reports-map.js',
        'head': '<meta name=\"viewport\" content=\"width=device-width\">',
        'css_external': [
          crimeRepRoot + 'styles/main.css',
          crimeRepRoot + 'styles/vendor.css'
        ],
        'js_external': [
          'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular.js',
          'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-animate.min.js',
          'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-route.min.js',
          'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-aria.min.js',
          'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-messages.min.js',
          'https://cdn.gitcdn.link/cdn/angular/bower-material/v1.1.0/angular-material.js',
          'https://maps.googleapis.com/maps/api/js?key=AIzaSyDWg2nWuw9Fc2RrufSxT3T_z3BCnci6sA0',
          crimeRepRoot + 'app/scripts/sea-crime/crime-view.js',
        ]
      }
    };

  }]);
