'use strict';

describe('Directive: fp100', function () {

  // load the directive's module
  beforeEach(module('kylemosebyDotcomApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<fp100></fp100>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the fp100 directive');
  }));
});
