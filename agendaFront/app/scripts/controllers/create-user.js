'use strict';

/**
 * @ngdoc function
 * @name agendaApp.controller:CreateUserCtrl
 * @description
 * # CreateUserCtrl
 * Controller of the agendaApp
 */
angular.module('agendaApp')
	.controller('CreateUserCtrl', function ($scope, $http, $location) {
		$scope.user = {}
		var registerUrl = 'http://localhost:3000/users/api/create-user/'

		$scope.loginError = {}

		$scope.$watch(function(){
			if ($scope.user.password) {
				$scope.loginError.password = ""
			} else if ($scope.user.username) {
				$scope.loginError.username = ""
			} else if ($scope.user.email) {
				$scope.loginError.email = ""
			} 
		});

		$scope.create = function(user){
			if (!user.username) {
				$scope.loginError.username = ["This field is required."]
			} 

			if (!user.password) {
				$scope.loginError.password = ["This field is required."]
			}
			if (!user.email) {
				$scope.loginError.email = ["This field is required."]	
			}
			if (user.username && user.password && user.email) {
				$http({
					method: "POST",
					url: registerUrl,
					data: {
						username: user.username,
						password: user.password,
						email: user.email
					},
					headers: {}
					}).then(function success(r_data, r_status, r_headers, r_config){
						console.log(r_data)
						$location.path("/")
						window.location.reload()
					}, function error(e_data, e_status, e_headers, e_config){
						// console.log(e_data) // error
						$scope.registerError = e_data
				});
			}
		}
});