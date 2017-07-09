'use strict';

/**
 * @ngdoc overview
 * @name kylemosebyDotcomApp
 * @description
 * # kylemosebyDotcomApp
 *
 * Main module of the application.
 */
angular
  .module('kylemosebyDotcomApp', [
    'ngAnimate',
    'ngRoute',
    'ngSanitize',
    'ngMaterial',
    'mkm.flickr',
    'mkm.seaCrimeData',
    'mkm.githubActivityVizApp',
    'mkm.codetools'
  ])
  .factory('_kylemoseby_', [function() {

    var flickrRoot = 'https://kylemoseby.github.io/angular-flickr-integrations/';


    var mkm = {

      code: {

        gitHubActivity: {
          gitUrl: 'github-activity-viz',
          examples: {
            commitsRecentFiles: {
              'title': 'Vizualization of Recent Files Committed to Github',
              'description': '',
              'tags': ['github', 'angular', 'javascript', 'data vizualization', 'jsonp'],
              'layout': 'left',
              'html': '',
              'css': '',
              'css_pre_processor': 'less',
              'js': '',
              'head': '',
              'css_external': [
                '/styles/main.css',
                'styles/vendor.css'
              ],
              'js_external': []
            },
            commitsByDate: {
              'title': 'Vizualization of Commits by Date',
              'description': '',
              'tags': ['github', 'angular', 'javascript', 'data vizualization', 'jsonp'],
              'layout': 'left',
              'html': '',
              'css': '',
              'css_pre_processor': 'less',
              'js': '',
              'head': '',
              'css_external': [
                '/styles/main.css',
                'styles/vendor.css'
              ],
              'js_external': []
            }
          },
        },

        flickrIntegrations: {
          gitUrl: 'angular-flickr-integrations',
          examples: {
            recentPhotos: {
              'title': 'Flickr Recent Photos',
              'gitrepo': 'https://github.com/kylemoseby/angular-flickr-integrations',
              'description': 'A Flickr API integration written in Angular',
              'tags': ['flickr', 'angular', 'javascript'],
              'layout': 'left',
              'html': 'code/angular-flickr-integrations/flickr-recent-codepen.html',
              'css': 'code/angular-flickr-integrations/flickr-recent-codepen.less',
              'css_pre_processor': 'less',
              'js': 'code/angular-flickr-integrations/flickr-recent-codepen.js',
              'js_external': [
                'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.4/angular.min.js',
                'https://u227926.dl.dropboxusercontent.com/u/227926/MiscWeb/api_key.js',
                'https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular-animate.min.js',
                'https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular-aria.min.js',
                'https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular-messages.min.js',
                'https://ajax.googleapis.com/ajax/libs/angular_material/1.1.4/angular-material.min.js'
              ],
              'css_external': [
                'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css',
                'https://s3-us-west-2.amazonaws.com/s.cdpn.io/765020/variables.less',
                'https://ajax.googleapis.com/ajax/libs/angular_material/1.1.0/angular-material.min.css'
              ]
            },
            album: {
              'title': 'Flickr Album',
              'description': 'A Flickr API integration written in Angular',
              'tags': ['flickr', 'angular', 'javascript', 'angular material'],
              'layout': 'left',
              'html': '/code/angular-flickr-integrations/flickr-album-codepen.html',
              'css': '/code/angular-flickr-integrations/flickr-album-codepen.less',
              'css_pre_processor': 'less',
              'js': '/code/angular-flickr-integrations/flickr-album-codepen.js',
              'js_external': [
                'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.4/angular.min.js',
                'https://u227926.dl.dropboxusercontent.com/u/227926/MiscWeb/api_key.js',
                'https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular-animate.min.js',
                'https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular-aria.min.js',
                'https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular-messages.min.js',
                'https://ajax.googleapis.com/ajax/libs/angular_material/1.1.4/angular-material.min.js'
              ],
              'css_external': [
                'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css',
                'https://s3-us-west-2.amazonaws.com/s.cdpn.io/765020/variables.less',
                'https://ajax.googleapis.com/ajax/libs/angular_material/1.1.0/angular-material.min.css'
              ]
            }
          }
        },

        seattleCrimeData: {
          gitUrl: 'angular-seattle-crime-data',
          examples: {
            byLocation: {

              'title': 'Reports by Location',

              'description': 'All crime reports filed by the SPD.  Data found at data.gov',

              'parent': '10406123',

              'tags': ['google maps', 'angular', 'data visualization'],

              'layout': 'left',

              'css': '/code/angular-seattle-crime-data/crime-map-codepen.css',

              'html': '/code/angular-seattle-crime-data/crime-map-codepen.html',

              'js': '/code/angular-seattle-crime-data/crime-map-codepen.js',

              'js_external': 'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.1/angular.min.js;' +
                'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false;' +
                'https://cdnjs.cloudflare.com/ajax/libs/d3/4.5.0/d3.min.js;' +
                'https://ajax.googleapis.com/ajax/libs/angular_material/1.1.4/angular-material.min.js;' +
                'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-animate.min.js;' +
                'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-aria.min.js;' +
                'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-messages.min.js;',

              'css_external': [
                'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css;',
                'https://ajax.googleapis.com/ajax/libs/angular_material/1.1.0/angular-material.min.css;'
              ]
            }

          }
        }

      },

      photography: {
        flickrPortfolio: [
          '72157641683609583',
          '72157642608822784',
          '72157642607219393',
          '72157671573143060'
        ]
      },

      cv: {},

      contact: {
        social: {
          instagram: {
            url: 'http://instagram.com/kylemoseby',
            spanClass: 'icon-instagram',
          },
          flickr: {
            url: 'http://flickr.com/photos/kylemoseby',
            spanClass: 'icon-flickr2'
          },
          github: {
            url: 'http://github.com/kylemoseby',
            spanClass: 'icon-github'
          },
          tumblr: {
            url: 'http://kylemoseby.tumblr.com/',
            spanClass: 'icon-tumblr'
          }
        }
      }
    };


    return mkm;
  }]);
