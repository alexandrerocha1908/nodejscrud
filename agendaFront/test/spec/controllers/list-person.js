'use strict';

describe('Controller: ListPersonCtrl', function () {

  // load the controller's module
  beforeEach(module('agendaApp'));

  var ListPersonCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ListPersonCtrl = $controller('ListPersonCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ListPersonCtrl.awesomeThings.length).toBe(3);
  });
});
