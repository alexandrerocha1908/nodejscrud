'use strict';

/**
 * @ngdoc function
 * @name agendaApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the agendaApp
 */
angular.module('agendaApp')
	.controller('LoginCtrl', function ($scope, $http, $location, Notification, $window) {
		var loginUrl = 'http://localhost:3000/users/api/user/'

		if(typeof $window.sessionStorage.token === 'undefined')
			$scope.auth = false;
		else
			$scope.auth = true;

		$scope.loginError = {}
		$scope.user = {}

		$scope.$watch(function(){
			if ($scope.user.password) {
				$scope.loginError.password = ""
			} else if ($scope.user.username) {
				$scope.loginError.username = ""
			}
		})

		$scope.loginTeste = function(user){
			if (!user.username) {
				$scope.loginError.username = ["This field is required."]
			} 

			if (!user.password) {
				$scope.loginError.password = ["This field is required."]
			}

			if ($scope.user.username && $scope.user.password) {
				$http({
					method: "POST",
					url: loginUrl,
					data: {
						username: $scope.user.username,
						password: $scope.user.password
					},
					headers: {}
				}).then(function success(r_data, r_status, r_headers, r_config){
					if(r_data){
						$window.sessionStorage.token = r_data.data.token;
					}
					$scope.auth = true;
					Notification.success({message: "Login Done", delay: 3000})
					$location.path("/list-person");
				}, function error(e_data, e_status, e_headers, e_config){
					console.log(e_data) // error
				});
			}
		}

		$scope.newUser = function(){
			$location.path('/create-user');
		}

		$scope.logout = function(){
			delete $window.sessionStorage.token;
			console.log($window.sessionStorage.token)
			$location.path("/");
			window.location.reload();
		}
});
