'use strict';

/**
 * @ngdoc function
 * @name jtWorkApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jtWorkApp
 */
angular.module('jtWorkApp')
  .controller('MainCtrl', ['$scope',function ($scope) {
  		$scope.code = 0;
	    this.awesomeThings = [
	      'HTML5 Boilerplate',
	      'AngularJS',
	      'Karma'
	    ];
  }]);
