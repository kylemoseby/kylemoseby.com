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
    // 'ngAnimate',
    'ngRoute',
    // 'ngSanitize',
    'ngMaterial',
    'mkm.flickr',
    'mkm.seaCrimeData',
    'mkm.codepen'
  ])
  .factory('_kylemoseby_', [function() {

    var flickrRoot = 'https://kylemoseby.github.io/angular-flickr-integrations/';


    var flickrExtJS = [
      'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular.js',
      'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-animate.min.js',
      'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-route.min.js',
      'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-aria.min.js',
      'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-messages.min.js',
      'https://cdn.gitcdn.link/cdn/angular/bower-material/v1.1.0/angular-material.js',
      '/app/flickr/flickr-restapi.js',
      '/app/flickr/flickr-img.js',
      '/source/angular-flickr-templates.js',
      'https://dl.dropboxusercontent.com/u/227926/MiscWeb/api_key.js'
    ];

    //   CODE PEN OPTIONS

    // All Optional
    // title                 : "New Pen!",
    // description           : "It's about stuff.",
    // private               : false, // true || false - When the Pen is saved, it will save as Private if logged in user has that privledge, otherwise it will save as public
    // parent                : id // If supplied, the Pen will save as a fork of this id. Note it's not the slug, but ID. You can find the ID of a Pen with `window.CP.pen.id` in the browser console.
    // tags                  : ["tag1", "tag2"], // an array of strings
    // editors               : "101", // Set which editors are open. In this example HTML open, CSS closed, JS open
    // layout                : "left", // top | left | right
    // html                  : "<div>HTML here.</div>",
    // html_pre_processor    : "none" || "slim" || "haml" || "markdown",
    // css                   : "html { color: red; }",
    // css_pre_processor     : "none" || "less" || "scss" || "sass" || "stylus",
    // css_starter           : "normalize" || "reset" || "neither",
    // css_prefix            : "autoprefixer" || "prefixfree" || "neither",
    // js                    : "alert('test');",
    // js_pre_processor      : "none" || "coffeescript" || "babel" || "livescript" || "typescript",
    // html_classes          : "loading",
    // head                  : "<meta name='viewport' content='width=device-width'>",
    // css_external          : "http://yoursite.com/style.css", // semi-colon separate multiple files
    // js_external           : "http://yoursite.com/script.js" // semi-colon separate multiple files


    var mkm = {
      code: {
        seattleCrimeData: {
          gitUrl: 'angular-seattle-crime-data',
          codepen: [{
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
          }, {
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
          }, {
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
          }]
        },
        flickrIntegrations: {
          gitUrl: 'angular-flickr-integrations',
          codepen: [{
            'title': 'Flickr Recent Photos',
            'gitrepo': 'https://github.com/kylemoseby/angular-flickr-integrations',
            'description': 'A Flickr API integration written in Angular',
            'tags': ['flickr', 'angular'],
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
            'js_external': flickrExtJS
          }, {
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
            'js_external': flickrExtJS
          }]
        },
        gitHubActivity: {
          gitUrl: 'github-activity-viz',
          codepen: []
        },
        angularCodepen: {
          gitUrl: 'angular-codepen',
          codepen: []
        }
      },
      photography: {
        recentFlickr: [{}],
        recentInstagram: [{}],
        portfolio: [{}]
      },
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
