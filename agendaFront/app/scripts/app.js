'use strict';

/**
 * @ngdoc overview
 * @name agendaApp
 * @description
 * # agendaApp
 *
 * Main module of the application.
 */
angular
  .module('agendaApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    // 'ngTouch',
    'angularModalService',
    'ui-notification',
    'ui.bootstrap',
    'ngMaterial',
    'angularUtils.directives.dirPagination'
  ])
  .config(function ($routeProvider, NotificationProvider, $httpProvider) {
    $routeProvider
      .when('/list-person', {
        templateUrl: 'views/list-person.html',
        controller: 'ListPersonCtrl',
        controllerAs: 'listPerson'
      })
      .when('/create-person', {
        templateUrl: 'views/create-person.html',
        controller: 'CreatePersonCtrl',
        controllerAs: 'createPerson'
      })
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/create-user', {
        templateUrl: 'views/create-user.html',
        controller: 'CreateUserCtrl',
        controllerAs: 'createUser'
      })
      .when('/confirmation-modal', {
        templateUrl: 'views/confirmation-modal.html',
        controller: 'ConfirmationModalCtrl',
        controllerAs: 'confirmationModal'
      })
      .when('/detail-person/:id', {
        templateUrl: 'views/detail-person.html',
        controller: 'DetailPersonCtrl',
        controllerAs: 'detailPerson'
      })
      .otherwise({
        redirectTo: '/'
      });
      $httpProvider.interceptors.push(function($window) {
        return {
         'request': function(config) {
              config.headers['Authorization'] = $window.sessionStorage.token;
              return config;
          }
        };
      });
      // $httpProvider.interceptors.push('authInterceptor');
      NotificationProvider.setOptions({
        delay: 5000,
        startTop: 10,
        startRight: 10,
        verticalSpacing: 10,
        horizontalSpacing: 10,
        positionX: 'center',
        positionY: 'top'
      });
  });
