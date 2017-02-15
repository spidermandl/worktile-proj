/**
 * @ngdoc function
 * @name jtWorkApp.service:api请求
 * @description
 * api请求 service
 * Controller of the jtWorkApp
 */
define(['app'], function (app) {
 	'use strict';

	app.service('api', ['$http','localStorageService','util',
		function ($http,localStorageService,util) {
			return {
				/************************************************************************
				 *get 父类方法
				 ************************************************************************/
				http_get_template : function(link,success,failure){
					var token = localStorageService.get('token');
					if (token == null) {
						return;
					}
                    $http({
                        method: 'GET', 
                        url: link,
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
				/************************************************************************
				 *post 父类方法
				 ************************************************************************/
				http_post_template : function(link,body,success,failure,promise){
					var token = localStorageService.get('token');
					if (token == null) {
						return;
					}
					$http.defaults.headers.post['Content-Type'] = 
                  		//'application/json;charset=utf-8';
                  		'application/x-www-form-urlencoded;charset=utf-8';
              		$http.defaults.headers.post['Authorization'] =
              			"Bearer "+token;
                    return $http.post(
			                link,
			                //body
			                util.transformPostRequest(body)
		                )
                        .then(function(response) {
                            return response.data;
                        })
		            	.then(
		            		function(data) {
                            	if (success != null) {//回调函数
                            		success(data);
                            	}
                            	if (promise !=null) {
                            		promise();
                            	}
                            },
                            function(error){
                            	if (failure != null) {//回调函数
                            		failure(error);
                            	}
                            	if (promise !=null) {
                            		promise();
                            	}
                            }
                        );
				},
				/************************************************************************
				 *用户登录
				 ************************************************************************/
				signin : function(input,success,failure,promise){
					$http.defaults.headers.post['Content-Type'] = 
                  		'application/x-www-form-urlencoded;charset=utf-8';

		            return $http.post(
		                'http://localhost:8080/user/login',
		                util.transformPostRequest({
		                    username: input.name,
		                    password: input.password,
		                    phone: input.phone,
		                })
		                )
						// return $http({
						//         method: 'POST',
						//         url : 'http://localhost:8080/user/login',
						//         data: util.transformPostRequest({
						//                     username: input.name,
						//                     password: input.password,
						//                     phone: input.phone,
						//                 }),
						//         headers: {
						// 				'Content-Type' :"application/json;charset=utf-8",
						//         },
						//      })
                        .then(function(response) {
                            return response.data;
                        })
		            	.then(
		            		function(data) {
                            	if (success != null) {//回调函数
                            		success(data);
                            	}
                            	if (promise !=null) {
                            		promise();
                            	}
                            },
                            function(error){
                            	if (failure != null) {//回调函数
                            		failure(error);
                            	}
                            	if (promise !=null) {
                            		promise();
                            	}
                            }
                        );
				},
				/************************************************************************
				* 获取登录验证码
				*************************************************************************/
				getcode : function(success,failure){
					this.http_get_template(
						'http://localhost:8080/user/login/code',
						success,failure);
				},
				/************************************************************************
				* 获取用户信息api
				*************************************************************************/
				me_profile : function(success,failure){
					this.http_get_template(
						'http://localhost:8080/api/me/profile',
						success,failure);
				},
				/**************************************************************************
				**登出api
				**************************************************************************/
				me_logout : function(success,failure){
					this.http_get_template(
						'http://localhost:8080/user/logout',
						success,failure);
				},
				/**************************************************************************
				**获取联系人(所有team中成员)api
				**************************************************************************/
				me_contacts : function(success,failure){
					this.http_get_template(
						'http://localhost:8080/api/team/contacts',
						success,failure);
				},
				/**************************************************************************
				**创建team api
				**************************************************************************/
				create_team : function(body,success,failure,promise){
					this.http_post_template(
						'http://localhost:8080/api/team/create',
						body,success,failure,promise
						);
				}



			}
		}
	]);
});