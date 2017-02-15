'use strict';

/**
 * @ngdoc service
 * @name agendaApp.authInterceptor
 * @description
 * # authInterceptor
 * Factory in the agendaApp.
 */
angular.module('agendaApp')
  .factory('authInterceptor', function ($location, Notification) { //$rootScope, $q, $window) {
    return function(response){
      console.log(response)
    if (response.status == 401){
      var currentPath = $location.path();
      console.log(currentPath)
      if (currentPath == "/") {
        $location.path("/")
      } else {
        $location.path("/").search("next", currentPath)
        Notification.warning({message: 'Please Sign in', delay: 3000});
      }
    }
  }
    // return {
    //   request: function (config) {
    //     config.headers = config.headers || {};
    //     if ($window.sessionStorage.token) {
    //       config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
    //       // console.log(config.headers.Authorization)
    //     }
    //     return config;
    //   },
    //   response: function (response) {
    //     if (response.status === 401) {
    //       // console.log('entrou aqui')
    //       // handle the case where the user is not authenticated
    //     }
    //     return response || $q.when(response);
    //   }
    // };
  });
