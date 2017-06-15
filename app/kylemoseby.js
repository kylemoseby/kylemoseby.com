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
              'js_external': null
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
              'js_external': null
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
              'example': '/code/angular-flickr-integrations/flickr-recent-codepen.html',
              'html': flickrRoot + 'app/views/flickr-recent-codepen.html',
              'css': flickrRoot + 'less/flickr-recents.less',
              'css_pre_processor': 'less',
              'js': flickrRoot + 'app/flickr/flickr-recent.js',
              'head': '<meta name=\"viewport\" content=\"width=device-width\">',
              'css_external': [
                flickrRoot + '/styles/main.css',
                flickrRoot + 'styles/vendor.css'
              ],
              // 'js_external': null
            },
            album: {
              'title': 'Flickr Album',
              'description': 'A Flickr API integration written in Angular',
              'tags': ['flickr', 'angular'],
              'layout': 'left',
              'example': '/code/angular-flickr-integrations/flickr-album-codepen.html',
              'html': flickrRoot + 'app/views/flickr-album-codepen.html',
              'css': flickrRoot + 'less/flickr-albums.less',
              'css_pre_processor': 'less',
              'js': flickrRoot + 'app/flickr/flickr-album.js',
              'head': '<meta name=\"viewport\" content=\"width=device-width\">',
              'css_external': [
                flickrRoot + '/styles/main.css',
                flickrRoot + 'styles/vendor.css'
              ],
              // 'js_external': null
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
              'tags': ['google maps', 'angular'],
              'layout': 'left',
              'example': '/code/angular-seattle-crime-data/example-map-canvas.html',
              'html': '',
              'css': '',
              'css_pre_processor': 'less',
              'js': '',
              'head': '<meta name=\"viewport\" content=\"width=device-width\">',
              'css_external': [],
              'js_external': ''
            },
            byTimeReported: {
              'title': 'Reports by Time',
              'description': 'All crime reports filed by the SPD.  Data found at data.gov',
              'tags': ['d3', 'angular'],
              'layout': 'left',
              'example': '/code/angular-seattle-crime-data/example-crime-timeline.html',
              'html': '',
              'css': '',
              'css_pre_processor': 'less',
              'js': '',
              'head': '<meta name=\"viewport\" content=\"width=device-width\">',
              'css_external': [],
              'js_external': ''
            },
            byType: {
              'title': 'Reports by Type',
              'description': 'All crime reports filed by the SPD.  Data found at data.gov',
              'tags': ['d3', 'angular'],
              'layout': 'left',
              'example': '/code/angular-seattle-crime-data/example-crime-block.html',
              'html': '',
              'css': '',
              'css_pre_processor': 'less',
              'js': '',
              'head': '<meta name=\"viewport\" content=\"width=device-width\">',
              'css_external': [],
              'js_external': ''
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



// var flickrExtJS = [
//   'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular.js',
//   'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-animate.min.js',
//   'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-route.min.js',
//   'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-aria.min.js',
//   'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-messages.min.js',
//   'https://cdn.gitcdn.link/cdn/angular/bower-material/v1.1.0/angular-material.js',
//   '/app/flickr/flickr-restapi.js',
//   '/app/flickr/flickr-img.js',
//   '/source/angular-flickr-templates.js',
//   'https://dl.dropboxusercontent.com/u/227926/MiscWeb/api_key.js'
// ];
