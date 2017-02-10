/**
 * @ngdoc function
 * @name jtWorkApp.service:globalDataContext
 * @description
 * 全局缓存数据 service
 * Controller of the jtWorkApp
 */
define(['app'], function (app) {
 	'use strict';

	app.service('globalDataContext', ['$http','api','$rootScope','localStorageService','$state',
		function ($http,api,$rootScope,localStorageService,$state) {

			/**
			*用户登出
			*/
			$rootScope.logout = function(){
				api.me_logout(
					function(data){
						localStorageService.set('token',null);
						//$rootScope.global = null;
						$state.go('');
					},
					function(error){
					}
				);
			}
			/**
			 * 全局上下文数据
			 */
			var context = {
				frame :null, //首页面类型 work or guest

				//加载等待阶段
				loading_init : true,
				i18n_loading_done : true,
				//左控制栏
				header_menu : '',
				leftmenu_current_expand : '',//当前展开的面板
				//loading_done : true,

				me : null,//用户基本信息
			};

			return {
				
				loadAll :function(){
					/**
					* 加载个人信息
					*/
					if (context.me == null) {
						api.me_profile(
							function(data){
								context.me = data.data;
								context.frame = 'work';
							},
							function(error){
								context.frame = 'guest';
							}
						);
					}else{
						context.frame = 'work';
					}
					return context;
				}
			}
		}
	]);
});









