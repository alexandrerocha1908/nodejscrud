'use strict';

describe('Directive: maskTel', function () {

  // load the directive's module
  beforeEach(module('agendaApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<mask-tel></mask-tel>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the maskTel directive');
  }));
});
