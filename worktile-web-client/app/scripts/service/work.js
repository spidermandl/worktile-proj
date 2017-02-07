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
				getRole : function(){

				},
			}
		}
	]);
});