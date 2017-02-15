'use strict';

describe('Controller: ConfirmationModalCtrl', function () {

  // load the controller's module
  beforeEach(module('agendaApp'));

  var ConfirmationModalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ConfirmationModalCtrl = $controller('ConfirmationModalCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ConfirmationModalCtrl.awesomeThings.length).toBe(3);
  });
});
