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
  .module('kylemosebyDotcomApp')
  .factory('_kylemoseby_', [function() {
    return {
      kylemoseby: {
        code: {
          flickr: {
            github: 'angular-flickr-integrations',
            code_pen: {
              recent: {
                less: '',
                html: '',
                js: ''
              },
              album: {
                less: '',
                html: '',
                js: ''
              }
            }
          },
          seattle_crime_data: {
            github: 'angular-seattle-crime-data',
            code_pen: {
              timeline: {
                less: '',
                html: '',
                js: ''
              },
              map: {
                less: '',
                html: '',
                js: ''
              },
              type: {
                less: '',
                html: '',
                js: ''
              }
            }
          },
          github: {
            github: '',
            code_pen: {
              activity: {
                less: '',
                html: '',
                js: ''
              }
            }
          },
          codepen: {
            github: 'angular-codepen',
            code_pen: {
              open_in: {
                less: '',
                html: '',
                js: ''
              }
            }
          }
        },
        photography: {},
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
      }
    };
  }]);
