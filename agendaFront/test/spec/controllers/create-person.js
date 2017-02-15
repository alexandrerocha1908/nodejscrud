'use strict';

describe('Controller: CreatePersonCtrl', function () {

  // load the controller's module
  beforeEach(module('agendaApp'));

  var CreatePersonCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CreatePersonCtrl = $controller('CreatePersonCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CreatePersonCtrl.awesomeThings.length).toBe(3);
  });
});
