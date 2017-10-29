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
    'mkm.flickr'
  ])
  .factory('_kylemoseby_', [function() {

    var mkm = {

      photography: {
        flickrPortfolio: [
          '72157671573143060',
          '72157642607219393',
          '72157642608822784',
          '72157641683609583',
        ]
      },

      code: {

        seattleCrimeData: {
          gitUrl: 'angular-seattle-crime-data',
          examples: {

            byLocation: {
              'title': 'Seattle Crime Report Map',
              'description': 'Crime reports filed by the Seattle Police Department plotted to Google Maps.  Data found at data.gov',
              'slugHash': 'JJZbPm',
            },

            plotted: {
              'title': 'Seattle Crime Reports Timeline',
              'description': 'A timeline plotted in D3js of crime reports filed by Seattle Police Department.  Data found at data.gov',
              'slugHash': '0f10e6b7a6fb348908b7dbc212876d62',
            },

            // byType: {
            //   'title': 'Summary of Crime Reports by Report Type',
            //   'description': 'Data found at data.gov',
            //   'slugHash': 'c9f14023eb187bd6836337b939f5f425'
            // }
          }
        },

        flickrIntegrations: {
          gitUrl: 'angular-flickr-integrations',
          examples: {
            recentPhotos: {
              'title': 'Flickr Recent Photos',
              'gitrepo': 'https://github.com/kylemoseby/angular-flickr-integrations',
              'description': 'A Flickr API integration written in Angular',
              'slugHash': '86cbd886a137fb713c61126a98f05780'

            },
            album: {
              'title': 'Flickr Album',
              'description': 'A Flickr API integration written in Angular',
              'slugHash': '48dc386f62becb37fcbb583066955f0b'
            }
          }
        }
      },

      contact: {
        social: {
          // instagram: {
          //   url: 'http://instagram.com/kylemoseby',
          //   spanClass: 'icon-instagram',
          // },
          flickr: {
            url: 'http://flickr.com/photos/kylemoseby',
            spanClass: 'icon-flickr2'
          },
          github: {
            url: 'http://github.com/kylemoseby',
            spanClass: 'icon-github'
          },
          codepen: {
            url: 'https://codepen.io/kylemoseby/',
            spanClass: 'icon-codepen'
          // },
          // tumblr: {
          //   url: 'http://kylemoseby.tumblr.com/',
          //   spanClass: 'icon-tumblr'
          }
        }
      }
    };


    return mkm;
  }]);
