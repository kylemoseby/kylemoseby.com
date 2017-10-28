'use strict';

describe('Controller: PhotographyCtrl', function () {

  // load the controller's module
  beforeEach(module('kylemosebyDotcomApp'));

  var PhotographyCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PhotographyCtrl = $controller('PhotographyCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PhotographyCtrl.awesomeThings.length).toBe(3);
  });
});
