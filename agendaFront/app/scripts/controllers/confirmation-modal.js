'use strict';

/**
 * @ngdoc function
 * @name agendaApp.controller:ConfirmationModalCtrl
 * @description
 * # ConfirmationModalCtrl
 * Controller of the agendaApp
 */
angular.module('agendaApp')
  .controller('ConfirmationModalCtrl', function ($scope, close) {
    $scope.close = function(result) {
 	  close(result, 500);
  	};
  });
