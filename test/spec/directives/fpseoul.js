'use strict';

describe('Directive: fpSeoul', function () {

  // load the directive's module
  beforeEach(module('kylemosebyDotcomApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<fp-seoul></fp-seoul>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the fpSeoul directive');
  }));
});
