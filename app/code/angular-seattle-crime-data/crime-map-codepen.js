"use strict";

angular
  .module("mkm.crimeDemo", [
    "ngMaterial"
  ])
  .service("seattleDataGov", [
    "$http",
    "$q",
    function($http, $q) {
      var _http = $http({
        method: "GET",
        url: "https://data.seattle.gov/resource/7ais-f98f.json"
          //  Test URL if data.gov is down / included with GitHub project
          // url: '/7ais-f98f.json'
      });

      /*
      Promise is resolved with data from returned from _http that has been processed by processIncidentData this is then rendered by directives
    */
      var _promise = $q.defer();

      _http.then(function(response) {
        function getIncidentParent(report) {
          return report.indexOf("-") === -1 ? report : report.slice(0, report.indexOf("-"));
        }

        var $offTypeNest = d3
          .nest()
          .key(function(d) {
            try {
              return getIncidentParent(d.offense_type);
            } catch (e) {
              console.log(e);
              console.log(d);
            }
          })
          .entries(response.data);

        var $typeColorScale = d3
          .scaleOrdinal()
          .domain(
            $offTypeNest.map(function(d) {
              return d.key;
            })
          )
          .range(d3.schemeCategory20);

        _promise.resolve({
          incidents: response.data,
          indexOffType: $offTypeNest,
          colorScaleOff: $typeColorScale
        });
      });

      return _promise;
    }
  ])
  .service("mapStyle", function() {
    // Google map style options (like CSS)
    // https://mapstyle.withgoogle.com/
    return {
      styles: [{
        stylers: [{
          hue: "#fff"
        }, {
          saturation: -100
        }]
      }, {
        featureType: "road",
        elementType: "geometry",
        stylers: [{
          lightness: 100
        }, {
          visibility: "simplified"
        }]
      }, {
        featureType: "road",
        elementType: "labels",
        stylers: [{
          visibility: "off"
        }]
      }, {
        featureType: "transit.line",
        stylers: [{
          visibility: "off"
        }]
      }, {
        featureType: "poi",
        stylers: [{
          visibility: "off"
        }]
      }, {
        featureType: "water",
        elementType: "labels",
        stylers: [{
          visibility: "off"
        }]
      }, {
        featureType: "road",
        stylers: [{
          visibility: "on"
        }]
      }]
    };
  })
  .directive("mapCanvas", [
    "$window",
    "$http",
    "$mdPanel",
    function($window, $http, $mdPanel) {
      function _link_($scope, $element) {

        function getIncidentParent(report) {
          return report.indexOf("-") === -1 ? report : report.slice(0, report.indexOf("-"));
        }

        $scope.filters = {
          reportFilter: [],
          indexDateDisabled: [],
          startDate: new Date(),
          endDate: new Date()
        };

        $scope.showApply = false;

        $scope.colorScaleOff = d3.schemeCategory20;

        var $detailModal = function(_incident) {
          var $panel = $mdPanel;

          var position = $panel
            .newPanelPosition()
            .absolute()
            .center();

          $panel
            .open({
              attachTo: angular.element(document.body),
              controller: function($scope, mdPanelRef, incidentDetail) {
                $scope.incidentDetail = incidentDetail;
                $scope.closeDetail = function() {
                  this.incidentDetail = null;
                  mdPanelRef.close();
                };
              },
              panelClass: "map-report-detail",
              controllerAs: "ctrl",
              templateUrl: "views/template-incident-detail.html",
              zIndex: 150,
              disableParentScroll: true,
              hasBackdrop: true,
              position: position,
              trapFocus: true,
              clickOutsideToClose: true,
              escapeToClose: true,
              focusOnOpen: true,
              targetEvent: event,
              locals: {
                incidentDetail: _incident
              }
            })
            .finally(function() {

              var $modalElm = document.getElementById("street-view-detail");

              // slect element from modal that was just created
              // class .map-report-detail defined above at Init
              var StreetView = new google.maps.Map($modalElm, {
                scrollwheel: false,
                zoomControl: false,
                zoom: 0
              });

              var panorama = new google.maps.StreetViewPanorama($modalElm, {
                position: {
                  lat: Number(_incident.latitude),
                  lng: Number(_incident.longitude)
                },
                pov: {
                  heading: 34,
                  pitch: 1
                },
                zoom: 0,
                scrollwheel: false
              });

              StreetView.setStreetView(panorama);
            });

          return {
            init: function() {
              /* OPEN THE PANEL */
            }
          };
        };

        var $infoWindow = function() {
          var infowindow = new google.maps.InfoWindow();

          return {
            mapInit: function(map, report) {
              var _r_ = report.feature.f;

              infowindow.setContent(
                '<ul class="list-unstyled">' +
                '<li><span class="glyphicon glyphicon-pushpin" style="color: ' +
                $scope.colorScaleOff(getIncidentParent(_r_.offense_type)) +
                '"></span>' +
                _r_.offense_type +
                " " +
                _r_.date_reported +
                "</li>" +
                "<li>Block: " +
                _r_.hundred_block_location +
                "</li>" +
                "<li>Description: " +
                _r_.summarized_offense_description +
                "</li>" +
                '<li><button id="map-info-btn" class="btn btn-sm btn-primary"><span class="glyphicon glyphicon-new-window"></span></button></li>' +
                "</ul>"
              );

              var marker = new google.maps.Marker({
                position: report.latLng.toJSON(),
                map: map,
                title: _r_.offense_type,
                icon: "images/spacer.gif"
              });

              infowindow.open(map, marker);

              google.maps.event.addListener(infowindow, "domready", function() {
                var infoWinBtn = d3.select("#map-info-btn");

                infoWinBtn.on("click", function() {
                  marker.setMap(null);
                  $detailModal(_r_);
                });
              });
            }
          };
        };

        var $map = (function() {
          var $googleMap = new google.maps.Map(
            $element.children()[$element.children().length - 1], {
              scrollwheel: false,
              streetViewControl: false,
              mapTypeControl: false,
              panControl: false,
              maxZoom: 17
            }
          );

          function markerClick($event) {
            $infoWindow().mapInit($googleMap, $event);
          }

          $googleMap.data.addListener("click", markerClick);

          // Google map style options (like CSS)
          // https://mapstyle.withgoogle.com/
          if (!!$scope.mapStyle) {
            $googleMap.setOptions($scope.mapStyle);
          }

          return {
            addCrimeData: function(reports) {
              var plots = [];

              var $mapBounds = new google.maps.LatLngBounds();

              // Opacity <>
              function filterByDate(reportDate) {
                var dateReported = new Date(reportDate);
                return dateReported >= $scope.filters.startDate &&
                  dateReported <= $scope.filters.endDate ? true : false;
              }

              // Opacity Array.length of > 0
              function filterByType(reportType) {
                return $scope.filters.reportFilter.indexOf(
                  getIncidentParent(reportType)
                ) > -1 ? false : true;
              }

              for (var i = reports.length - 1; i >= 0; i--) {
                var _report_ = reports[i];

                var long = Number(_report_.longitude);
                var lati = Number(_report_.latitude);

                // valid location
                if (!isNaN(long) && !isNaN(lati)) {
                  // filter type filter date /push/bounds
                  if (filterByDate(_report_.date_reported)) {
                    if (filterByType(_report_.offense_type)) {
                      $mapBounds.extend(new google.maps.LatLng(lati, long));

                      plots.push({
                        type: "Feature",
                        geometry: {
                          type: "Point",
                          coordinates: [long, lati]
                        },
                        properties: _report_
                      });
                    }
                  }
                  // end valid lat/long
                }
                // end for
              }

              $googleMap.data.addGeoJson({
                type: "FeatureCollection",
                features: plots
              });

              var filteredNest = d3
                .nest()
                .key(function(d) {
                  try {
                    return getIncidentParent(d.properties.offense_type);
                  } catch (e) {
                    console.log(e);
                    console.log(d);
                  }
                })
                .entries(plots);

              $scope.filters.indexDateDisabled = filteredNest.map(function(d) {
                return d.key;
              });

              $googleMap.fitBounds($mapBounds);

              // REFORMAT ON WINDOW RESIZE
              angular.element($window).bind("resize", function() {
                $googleMap.fitBounds($mapBounds);
              });

              return this;
            },

            applyFilters: function() {
              $googleMap.data.setStyle(function(feature) {
                return {
                  icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 4,
                    fillColor: typeof $scope.colorScaleOff === "function" ? $scope.colorScaleOff(
                      getIncidentParent(feature.f.offense_type)
                    ) : "transparent",
                    fillOpacity: 1,
                    strokeWeight: 0
                  }
                };
              });

              return this;
            },

            removeCrimeData: function() {
              $googleMap.data.forEach(function(feature) {
                $googleMap.data.remove(feature);
              });

              return this;
            }
          };
        })();

        $scope.mapRefresh = function() {
          $map.removeCrimeData();
        };

        $scope.filterToggleType = function($event) {
          $event.preventDefault();
          $event.cancelBubble = true;

          var toggleKey = $scope.filters.reportFilter.indexOf(this.val.key);

          if (toggleKey === -1) {
            $scope.filters.reportFilter.push(this.val.key);
          } else {
            $scope.filters.reportFilter.splice(toggleKey, 1);
          }

          $scope.showApply = true;
        };

        $scope.filterAll = function() {
          for (var filter in $scope.indexOffType) {
            $scope.filters.reportFilter.push($scope.indexOffType[filter].key);
          }

          $scope.showApply = true;
        };

        $scope.filterNone = function() {
          $scope.filters.reportFilter = [];

          $scope.showApply = true;
        };

        $scope.dateChange = function($event) {
          $event.preventDefault();

          $scope.showApply = true;
        };

        $scope.filterApply = function($event) {
          $event.preventDefault();

          $map.removeCrimeData();
          $map.addCrimeData($scope.crimeReports, $scope.filters);
          $map.applyFilters();

          $scope.showApply = false;
        };

        // INIT
        if ($scope.$seaCrimeData !== undefined) {
          $scope.$seaCrimeData.promise.then(function(data) {
            $scope.dateRange = d3.extent(data.incidents, function(d) {
              return new Date(d.date_reported);
            });

            $scope.filters.startDate = $scope.dateRange[0];
            $scope.filters.endDate = $scope.dateRange[1];

            $scope.indexOffType = data.indexOffType;
            $scope.colorScaleOff = data.colorScaleOff;

            $scope.crimeReports = data.incidents;

            $map.addCrimeData(data.incidents).applyFilters();
          });
        } else if ($scope.report !== undefined) {
          var report = $scope.report;

          $scope.filters.startDate = new Date(report.date_reported);
          $scope.filters.endDate = new Date(report.date_reported);

          var _longitude = Number(report.longitude);
          var _latitude = Number(report.latitude);

          if (!isNaN(_longitude) && !isNaN(_latitude)) {
            var detailBounds = new google.maps.LatLngBounds();

            detailBounds.extend(new google.maps.LatLng(_latitude, _longitude));

            $map.addCrimeData([report]).applyFilters();

          }
        }
      }

      return {
        link: _link_
      };
    }
  ])
  .directive("mapFilters", [
    function() {
      return {
        require: "mapCanvas"
      };
    }
  ])
  .controller("CrimeReportrsCtrl", [
    "$scope",
    "seattleDataGov",
    "mapStyle",
    function($scope, seattleDataGov, mapStyle) {
      $scope.$seaCrimeData = seattleDataGov;

      $scope.$seaCrimeData.promise.then(function(data) {
        $scope.$index = data.index;

        $scope.$reports = data.incidents;
      });

      $scope.mapStyle = mapStyle;
    }
  ])
  .run(["$templateCache", function(a) {
    a.put("views/template-incident-detail.html", [
      '<div layout="row" layout-wrap layout-padding>',
      '<!-- TABLE -->',
      '<div flex="100">',
      '<button type="button" class="btn btn-primary" ng-click="closeDetail()" aria-lable="Close Detail"> <span class="glyphicon glyphicon-remove"></span> </button>',
      '<div class="table-responsive">',
      '<table class="table">',
      '<thead>',
      '<tr>',
      '<td>Date Reported</td>',
      '<td>Address</td>',
      '<td>District Sector</td>',
      '<td>Census Tract</td>',
      '<td>General Offense Number</td>',
      '<td>Offense Type</td>',
      '<td>Offense Code</td>',
      '<td>Description</td>',
      '<td>Zone/Beat</td>',
      '</tr>',
      '</thead>',
      '<tbody>',
      '<tr>',
      '<td>{{incidentDetail.date_reported | date:\'medium\'}}</td>',
      '<td>{{incidentDetail.hundred_block_location}}</td>',
      '<td>{{incidentDetail.district_sector}}</td>',
      '<td>{{incidentDetail.census_tract_2000}}</td>',
      '<td>{{incidentDetail.general_offense_number}}</td>',
      '<td>{{incidentDetail.offense_type}}</td>',
      '<td>{{incidentDetail.offense_code}}</td>',
      '<td>{{incidentDetail.summarized_offense_description}}</td>',
      '<td>{{incidentDetail.zone_beat}}</td>',
      '</tr>',
      '</tbody>',
      '</table>',
      '</div>',
      '</div>',
      '<!-- // TABLE -->',
      '<!-- STREET VIEW -->',
      '<div flex="100">',
      '<div id="street-view-detail"></div>',
      '</div>',
      '<!-- // STREET VIEW -->',
      '</div>'
    ].join('\n'))
  }]);
