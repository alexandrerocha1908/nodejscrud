'use strict';

describe('Controller: DetailPersonCtrl', function () {

  // load the controller's module
  beforeEach(module('agendaApp'));

  var DetailPersonCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DetailPersonCtrl = $controller('DetailPersonCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DetailPersonCtrl.awesomeThings.length).toBe(3);
  });
});
