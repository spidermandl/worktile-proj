'use strict';

/**
 * @ngdoc function
 * @name jtWorkApp.controller:IdentityService
 * @description
 * # IdentityService
 * Controller of the jtWorkApp
 */
angular.module('jtWorkApp')
	.service('IdentityService', ['$scope','config','$http',function ($scope,config,$http) {
		return {
			//用户登录api
			signin : function(){

			},
			//用户注册api
			signup : function(){

			},
			//登录邮箱取验证码api
			openemailset : function(){

			},
			//发送手机验证码验证登录api
		 	forget_password : function(form){

			},
			//向手机发送登录验证号码api
			get_phone_code : function(form){
				
			},
			//获取图片登录验证码api
			getcode : function(){

			},

		};


	}]);