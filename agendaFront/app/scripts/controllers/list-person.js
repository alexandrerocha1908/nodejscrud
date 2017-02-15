'use strict';

/**
 * @ngdoc function
 * @name agendaApp.controller:ListPersonCtrl
 * @description
 * # ListPersonCtrl
 * Controller of the agendaApp
 */
angular.module('agendaApp')
  .controller('ListPersonCtrl', function ($scope, $http, PersonFactory, ModalService, $location, $uibModal, $window, Notification) {
    
    $scope.ready = false;

    // console.log(typeof $window.sessionStorage.token)
    // if(typeof $window.sessionStorage.token === 'undefined'){
    //     $location.path("/")
    //     Notification.error({message: 'Login first', delay: 3000});
    // }

    PersonFactory.query(function(response, status){    
    	$scope.persons = response.data;
        $scope.ready = true;
    }); 

    $scope.detailPerson = function(personId){
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views/detail-person.html',
            controller: 'DetailPersonCtrl', 
            resolve: {
                id: function(){
                    return personId;
                }
            }
        });

        modalInstance.result.then(function(){
            window.location.reload();
        });
    };

    $scope.createPerson = function(){
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views/create-person.html',
            controller: 'CreatePersonCtrl',
        });

        modalInstance.result.then(function(){
            window.location.reload();
        });
    };

    $scope.deletePerson = function(personId){
    	$scope.confirmation = false;

    	ModalService.showModal({
    		templateUrl: 'views/confirmation-modal.html',
        	controller: 'ConfirmationModalCtrl',
    	}).then(function(modal){
    		modal.element.modal();
    		modal.close.then(function(result){
    			$scope.confirmation = result;
		    	if($scope.confirmation)
		    		PersonFactory.delete({id : personId}).$promise.then(
		            function success(){
		                window.location.reload()
		            },
		            function error(){
		                // Notification.error({message:"Error deleting contact", delay:3000})
		            });
    		});
    	});	
    };
  });
