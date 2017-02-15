'use strict';

/**
 * @ngdoc function
 * @name agendaApp.controller:DetailPersonCtrl
 * @description
 * # DetailPersonCtrl
 * Controller of the agendaApp
 */
angular.module('agendaApp')
  .controller('DetailPersonCtrl', function ($uibModalInstance, $routeParams, PersonFactory, $scope, id, $location, Notification, $window) {
    // $scope.person = new PersonFactory();

    $scope.ready = false;

    PersonFactory.get({id: id}).$promise.then(
        function success(response){
            $scope.person = response.data[0];
            console.log($scope.person)
            $scope.ready = true;
            $scope.edit = false;
            $scope.updatePersonError = {}

            $scope.$watch(function(){
                if ($scope.person.name) {
                    $scope.updatePersonError.name = ""
                }
                if ($scope.person.email) {
                    $scope.updatePersonError.email = ""
                }
            })
        });
    $scope.close = function (person) {
        console.log(person.id)
        if(!person.name){
          $scope.updatePersonError.name = "This field is required."
        }
        if(!person.email){
          $scope.updatePersonError.email = "This field is required."
        }
        if(person.name && person.email){
        PersonFactory.update(person).$promise.then(
            function success(){
                $uibModalInstance.close();
            },
            function error(){
                Notification.error({message: 'Error editing contact', delay: 3000});
            });                    
        }

    };

    $scope.cancel = function(){
        $uibModalInstance.dismiss();
    }

    $scope.editPerson = function(){
        $scope.edit = true;
    }
        

    

  });
