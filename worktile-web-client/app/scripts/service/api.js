/**
 * @ngdoc function
 * @name jtWorkApp.service:api请求
 * @description
 * api请求 service
 * Controller of the jtWorkApp
 */
define(['app'], function (app) {
 	'use strict';

	app.service('api', ['$http','localStorageService','Util','$q',
		function ($http,localStorageService,util,$q) {
			return {
				/************************************************************************
				 * get 父类方法
				 ************************************************************************/
				http_get_template : function(link,success,failure,promise){
					console.log(link);
					var deferred = $q.defer();
					var token = localStorageService.get('token');
					if (token == null) {
						deferred.reject(null);
						return deferred.promise;
						//return;
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
                        	if (promise !=null) {
                        		promise();
                        	}
                    		if (_.isNumber(data.error_code) == false) {
                    			if(success!= null){
                    				success(data);
                    			}
                    			deferred.resolve(data);
                    			return;
                    		}
                    		if (failure != null) 
                    			failure(data);
                    		deferred.reject(data);
                        },
                        function(error){
                        	deferred.reject(error);
                        	if (promise !=null) {
                        		promise();
                        	}
                        	if (failure != null) {//回调函数
                        		failure(error);
                        	}
                        }
                    );

                    return deferred.promise;
				},
				/************************************************************************
				 * post 父类方法
				 ************************************************************************/
				http_post_template : function(link,body,success,failure,promise){
					console.log(link);
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
                            		if(_.isNumber(data.error_code)){
                            			failure(data);
                            		}else{
                            			success(data);
                            		}
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
					return this.http_get_template(
						'http://localhost:8080/user/login/code',
						success,failure);
				},
				/************************************************************************
				* 获取用户信息api
				*************************************************************************/
				me_profile : function(success,failure){
					return this.http_get_template(
						'http://localhost:8080/api/me/profile',
						success,failure);
				},
				/**************************************************************************
				**登出api
				**************************************************************************/
				me_logout : function(success,failure){
					return this.http_get_template(
						'http://localhost:8080/user/logout',
						success,failure);
				},
				/**************************************************************************
				**获取联系人(所有team中成员)api
				**************************************************************************/
				me_contacts : function(success,failure){
					return this.http_get_template(
						'http://localhost:8080/api/team/contacts',
						success,failure);
				},
				/**************************************************************************
				**创建team api
				**************************************************************************/
				create_team : function(body,success,failure,promise){
					return this.http_post_template(
						'http://localhost:8080/api/team/create',
						body,success,failure,promise
						);
				},
				/**************************************************************************
				**获取用户所属team list api
				**************************************************************************/
				team_list : function(success,failure,promise){
					return this.http_get_template(
							'http://localhost:8080/api/team/list',
							success,failure,promise
						);
				},
				/**************************************************************************
				**获取team基本信息 api
				**************************************************************************/
				team_basic : function(team_id){
					return this.http_get_template(
						'http://localhost:8080/api/team/'+team_id+'/basic'
					);
				},
				/**************************************************************************
				**获取team project信息 api
				**************************************************************************/
				get_team_projects : function(team_id,success,failure,promise){
					return this.http_get_template(
						'http://localhost:8080/api/team/'+team_id+'/projects',
						success,failure,promise
					);
				},
				/**************************************************************************
				**获取team template list信息 api
				**************************************************************************/
				get_project_templates:function(team_id){
					return this.http_get_template(
						'http://localhost:8080/api/team/'+team_id+'/project/templates'
					);
				},
				/**************************************************************************
				**获取未完成任务信息 api
				**************************************************************************/
				get_dashboard_task:function(success,failure,promise){
					return this.http_get_template(
						'http://localhost:8080/api/task/uncompleted',
						success,failure,promise
					);
				},
				/**************************************************************************
				**获取静态项目模板列表 api
				**************************************************************************/
				get_template_list:function(){
					return this.http_get_template(
						'http://localhost:8080/api/template/list'
					);
				},
				/**************************************************************************
				**获取静态项目模板列表 api
				**************************************************************************/
				get_feed_list:function(data){
					return this.http_post_template(
						'http://localhost:8080/api/template/list',
						data
					);
				},
				

			}
		}
	]);
});