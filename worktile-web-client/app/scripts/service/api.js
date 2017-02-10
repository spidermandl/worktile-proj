/**
 * @ngdoc function
 * @name jtWorkApp.service:api请求
 * @description
 * api请求 service
 * Controller of the jtWorkApp
 */
define(['app'], function (app) {
 	'use strict';

	app.service('api', ['$http','localStorageService',
		function ($http,localStorageService) {
			return {
				/**
				* 获取用户信息api
				*/
				me_profile : function(success,failure){
					var token = localStorageService.get('token');
					if (token == null) {
						return;
					}
                    $http({
                            method: 'GET', 
                            url: 'http://localhost:8080/api/me/profile',
                            //withCredentials: true, 
                            headers: {
                                'Authorization': "Bearer "+token, 
                                'Content-Type' :"application/json;charset=utf-8",
                            },  
                        })
                        .then(function(response) {
                            return response.data;
                        })
                        .then(
                            function(data) {
                            	if (success != null) {//回调函数
                            		success(data);
                            	}
                            },
                            function(error){
                            	if (failure != null) {//回调函数
                            		failure(error);
                            	}
                            }
                        );
				},

				/**
				* 登出api
				**/
				me_logout : function(success,failure){
					var token = localStorageService.get('token');
					if (token == null) {
						return;
					}
                    $http({
                        method: 'GET', 
                        url: 'http://localhost:8080/user/logout',
                    })
                    .then(function(response) {
                        return response.data;
                    })
                    .then(
                        function(data) {
                        	if (success != null) {//回调函数
                        		success(data);
                        	}
                        },
                        function(error){
                        	if (failure != null) {//回调函数
                        		failure(error);
                        	}
                        }
                    );
				}

			}
		}
	]);
});