/**
 * @ngdoc function
 * @name jtWorkApp.service:IdentityService
 * @description
 * 登录前相关api service
 * Controller of the jtWorkApp
 */
define(['app'], function (app) {
 	'use strict';

	app.service('WorkService', ['config','util','$http','localStorageService',
		function (config,util,$http,localStorageService) {
			return {
				//获取用户基本信息
				// getProfile : function(){

				// 	$http.defaults.headers.common['Authorization']= "Bearer "+localStorageService.get('token');
		  //           return $http.get(
		  //               'http://localhost:8080/api/me/profile'
		  //               ).then(function(response) {
		  //                   return response.data;
		  //               });
				// },
			}
		}
	]);
});