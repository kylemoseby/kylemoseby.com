'use strict';

describe('Directive: frontPageKamera', function () {

  // load the directive's module
  beforeEach(module('kylemosebyDotcomApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<front-page-kamera></front-page-kamera>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the frontPageKamera directive');
  }));
});
