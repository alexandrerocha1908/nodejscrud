'use strict';

/**
 * @ngdoc service
 * @name agendaApp.person
 * @description
 * # person
 * Factory in the agendaApp.
 */
angular.module('agendaApp')
  .factory('PersonFactory', function($resource, authInterceptor, $window) {
    return $resource('http://localhost:3000/contacts/api/persons/:id', {}, {
      query:{
        method: "GET",
        params: {},
        isArray: false,
        header:{
        'Authorization': $window.sessionStorage.token
        },
        cache: false
      },
      update:{
        method: "PUT",
        params: {"id": "@id"},
      },
      delete:{
        method: "DELETE",
      }
    });
  });
