'use strict';

/**
 * @ngdoc directive
 * @name agendaApp.directive:maskTel
 * @description
 * # maskTel
 */
angular.module('agendaApp')
  .directive('maskTel', function () {
    return {
      require: "ngModel",
      link: function (scope, element, attrs, ctrl) {
        element.bind("keyup", function(){
        	// console.log(ctrl.$viewValue);
        	// ctrl.setViewValue
        	var formatTel = function(value){
        		value = value.replace(/[^0-9]+/g,"");

        		if(value.length > 4 && value.length <= 8){
        			value = value.substring(0, 4) + "-" + value.substring(4, 8);
        		} else if(value.length > 4){
        			value = value.substring(0, 5) + "-" + value.substring(5, 9);
        		}
        		return value;
        	};
        	ctrl.$setViewValue(formatTel(ctrl.$viewValue));
        	ctrl.$render();
        });
      }
    };
  });
