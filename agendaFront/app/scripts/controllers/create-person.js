'use strict';

/**
 * @ngdoc function
 * @name agendaApp.controller:CreatePersonCtrl
 * @description
 * # CreatePersonCtrl
 * Controller of the agendaApp
 */
angular.module('agendaApp')
  .controller('CreatePersonCtrl', function ($uibModalInstance, $scope, PersonFactory, Notification) {

  	$scope.person = {};
	$scope.createPersonError = {};

	$scope.$watch(function(){
		if ($scope.person.name) {
			$scope.createPersonError.name = "";
		}
		if ($scope.person.email) {
			$scope.createPersonError.email = "";
		}
	});

	$scope.add = function (person) {
		if(!person.name){
			$scope.createPersonError.name = "This field is required.";
		}
		if(!person.email){
			$scope.createPersonError.email = "This field is required.";
		}
		if(person.name && person.email){
			PersonFactory.save(person).$promise.then(
				function success(){
					$uibModalInstance.close();
				},
				function error(){
					Notification.error({message: 'Error creating contact', delay: 3000});
				});
		}
	};

	$scope.close = function(){
		$uibModalInstance.dismiss();
	};
  });
