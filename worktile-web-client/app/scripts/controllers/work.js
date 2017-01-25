/**
 * @ngdoc function
 * @name jtWorkApp.controller:WorkCtrl
 * @description
 * # WorkCtrl
 * Controller of the jtWorkApp
 */
define(['app'], function (app) {
	'use strict';
	//父类
	app.controller('WorkCtrl', ['$scope','$rootScope','config',function ($scope,$rootScope,config) {
		//全局访问变量
		$rootScope.global = {
			//加载等待阶段
			loading_init : true,
			i18n_loading_done : true,
			//左控制栏
			header_menu : '',
			leftmenu_current_expand : '',//当前展开的面板
		};

		$scope.vm = {
			//弹出快捷方式
			js_pop_shortcut_create : function(event){
				
			},
			//缩进操作面板
			js_leftmenu_collapsed : function(){

			},
			star_projects : null ,//star项目
			//弹出个人信息
			js_pop_avatar_self : function(event){

			},
			//弹出团队界面
			js_pop_show_teams : function(event){

			},
			//弹出主页
			goto_dashboard : function(){

			},
			//弹出搜索界面
			goto_search : function(){

			},
			//弹出notice或project面板
			expand_item : function(menu){

			},
			js_to_project : function(){

			},
		};
	}])
	.directive('wtLeftmenu', ['config',function(config) {
	    return {
	      	restrict: 'E',
	      	templateUrl: config.templateUrls.left_menu,
	    };
  	}])
	.filter('indexOf',['config',function(config){
		return function(input){
			var collection = input[0];
			var filter = input[1];
			return collection.indexOf(filter) == -1 ? false : true;
		};
	}])
	.filter('orderBy',['config',function(config){
		return function(input,star_pos){

		};
	}])
  	.filter('translate',['config',function(config){//输入提示过滤器
		return function(input){
			if(input.indexOf('leftmenu.item_dashboard') >= 0){
				return config.STRING['leftmenu.item_dashboard'];
			}else if(input.indexOf('leftmenu.item_search') >= 0){
				return config.STRING['leftmenu.item_search'];
			}else if(input.indexOf('leftmenu.item_notice') >= 0){
				return config.STRING['leftmenu.item_notice'];
			}else if(input.indexOf('leftmenu.item_project') >= 0){
				return config.STRING['leftmenu.item_project'];
			}else{
				return input;
			}
		};
	}])
	;
});




