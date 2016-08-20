'use strict';

describe('Controller: HireCtrl', function () {

  // load the controller's module
  beforeEach(module('kylemosebyDotcomApp'));

  var HireCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HireCtrl = $controller('HireCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(HireCtrl.awesomeThings.length).toBe(3);
  });
});
