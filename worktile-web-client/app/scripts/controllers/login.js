'use strict';

/**
 * @ngdoc function
 * @name jtWorkApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the jtWorkApp
 */
angular.module('jtWorkApp')
  .controller('LoginCtrl', ['$scope',function ($scope) {
  	    //状态对象
		$scope.status = {};
		$scope.status.code = 0;

		//
		$scope.outer_login = {};
		

		$scope.vm = {
			weixin_unionid : '',
			weixin_login : false,
			//注册模式
			js_change_login_mode : function(type){
				this.weixin_login = type === 'default'?false:true;
			}
		}
  }]);