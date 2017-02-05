/**
 * @ngdoc function
 * @name jtWorkApp.controller:IdentityService
 * @description
 * # IdentityService
 * Controller of the jtWorkApp
 */
define(['app'], function (app) {
 	'use strict';

	app.service('IdentityService', ['config','util','$http',
		function (config,util,$http) {
			return {
				//用户登录api
				signin : function(input){
					//$http.defaults.headers.common['Authorization'] = 'Bearer ' ;
		            $http.defaults.headers.post['Content-Type'] = 
                  		'application/x-www-form-urlencoded;charset=utf-8';

            		console.log($http.defaults.headers);
		            return $http.post(
		                'http://localhost:8080/user/login',
		                util.transformPostRequest({
		                    username: input.name,
		                    password: input.password,
		                    phone: input.phone,
		                })
		                ).then(function(response) {
		                    return response.data.token;
		                });

		            // return $http.get(
		            //     'http://localhost:8080/error/101'
		            //     ).then(function(response) {
		            //         return response.data.token;
		            //     });
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
});