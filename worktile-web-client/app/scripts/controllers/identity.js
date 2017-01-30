/**
 * @ngdoc function
 * @name jtWorkApp.controller:IdentityCtrl
 * @description
 * # IdentityCtrl
 * Controller of the jtWorkApp
 */
 define(['app'], function (app) {
 	'use strict';
	//angular.module('jtWorkApp')
  //父类
	app.controller('BaseCtrl', ['$scope','config',function ($scope,config) {
		$scope.action_type = 0;

		$scope.vm = {
			//===========================登录相关===============================
			weixin_unionid : '',
			weixin_login : false,//是否是微信登录 
			//登录模式
			js_change_login_mode : function(type){
				this.weixin_login = type === 'default'?false:true;
			},

			//===========================注册相关===============================
			show_signup : true,
			show_signmode : false,
			signmode : 'phone',
			phone_prefixs:config.phone_prefixs,//国码信息
			phone_prefix:config.phone_prefixs[0],
			js_change_phone_prefix : function(prefix){ //获取国码选择
				this.phone_prefix = prefix;
			},
			js_change_phone : function(event){//实时更新输入电话
				return 'event';
			},
			user:{ //用户输入信息
				phone : null,
				phone_code : null,
				email:null,
				display_name:null,
			},
			signup_phone_text:config.STRING.signup_phone_text,
			check_platform : {//客户端平台检测
				is_mobile : false,
			},
			js_show_signmode : function(){
				this.show_signup = true;
			},
			js_change_signup_mode : function(mode){ //改变注册方式
				this.show_signmode = mode;
				this.signmode = mode;
				this.forgotmode = mode;

			},
			signup_success : false,//注册成功标志位

			//==========================忘记密码相关===============================
			forgotmode : 'phone',
			phone_code_text: config.STRING.phone_code_text,
			send_success : false,//忘记密码请求发送成功
			//==============================公共方法================================
			//登录邮箱验证
			openemailset : function(){

			},
			//发送手机验证码验证信息
		 	js_forget_password : function(form){

			},
			//获取手机号，发送验证信息至手机
			js_get_phone_code : function(form){
				
			},
			//获取验证码方法
			getcode : function(){
				$scope.signin_user.imgsrc = '';
			},

		};
	}])
	//登录界面
	.controller('LoginCtrl', ['$scope','config','$controller',function ($scope,config, $controller) {
		$controller('BaseCtrl', {$scope: $scope});
		$scope.action_type = 0;
		//状态对象
		$scope.status = {};
		$scope.status.code = 0;
		$scope.iscode = false;//登录输入图片验证码
		//输入信息
		$scope.signin_user = {
			name : null,
			password : null,
			imgsrc : null,//验证码图片src
			code : null,
			is_login_ing : null,
			factor : null,
			is_signfactoing : null,
			recovery_code : null,
			is_signrecoverying : null,
		};

		//登录请求
		$scope.signin = function(login_form){

		};
	}])
	//注册界面
	.controller('RegisterCtrl', ['$scope', '$controller',function ($scope, $controller) {
		$controller('BaseCtrl', {$scope: $scope});
		$scope.action_type = 1;
		$scope.regist_phone_reminde_msg = null;
		$scope['$root.global.constant.regex.mobile_area'] = '/^[0-9]{1,4}$/';
		$scope['$root.global.constant.regex.mobile_probable'] ='/^[0-9]{6,15}$/';
		$scope['$root.global.constant.regex.display_name'] = '/^([\u4e00-\u9fa5]|[0-9a-zA-Z!@#$%^&*()_\-\+=\s]){1,100}$/';
		$scope.regist_phone_code_reminde_msg = false;
		$scope.regist_email_reminde_msg = false;
		$scope.regist_password_reminde_msg = false;
		$scope.regist_display_name_reminde_msg = false;

		//提交注册信息
		$scope.signup = function(register_form){

		};

	}])
	.controller('ForgotCtrl', ['$scope', '$controller',function ($scope, $controller) {
		$controller('BaseCtrl', {$scope: $scope});
		$scope.action_type = 2;

		
	}])
	.filter('translate',['config',function(config){//输入提示过滤器
		return function(input){
			if(input.indexOf('username_placeholder') >= 0){
				return config.STRING.username_placeholder;
			}else if(input.indexOf('password_placeholder') >= 0){
				return config.STRING.password_placeholder;
			}else if(input.indexOf('tips_change_iscode') >= 0){
				return config.STRING.tips_change_iscode;
			}else if(input.indexOf('iscode_placeholder') >= 0){
				return config.STRING.iscode_placeholder;
			}else if(input.indexOf('logining') >= 0){
				return '';
			}else if(input.indexOf('dynamic_placeholder') >= 0){
				return '';
			}else if(input.indexOf('security_code_placeholder') >= 0){
				return '';
			}else if(input.indexOf('outer_signup.phone_placeholder') >= 0){
				return config.STRING['outer_signup.phone_placeholder'];
			}else if(input.indexOf('outer_signup.phone_code_placeholder') >= 0){
				return config.STRING['outer_signup.phone_code_placeholder'];
			}else if(input.indexOf('outer_signup.display_name_placeholder') >= 0){
				return config.STRING['outer_signup.display_name_placeholder'];
			}else if(input.indexOf('outer_signup.link_email_try') >= 0){
				return config.STRING['outer_signup.link_email_try'];
			}else if(input.indexOf('outer_signup.email_placeholder') >= 0){
				return config.STRING['outer_signup.email_placeholder'];
			}else if(input.indexOf('outer_forgot.phone_placeholder') >= 0){
				return config.STRING['outer_forgot.phone_placeholder'];
			}else if(input.indexOf('outer_forgot.btn_submit_phone') >= 0){
				return config.STRING['outer_forgot.btn_submit_phone'];
			}else if(input.indexOf('outer_forgot.btn_submit_email') >= 0){
				return config.STRING['outer_forgot.btn_submit_email'];
			}else if(input.indexOf('outer_forgot.phone_code_placeholder') >= 0){
				return config.STRING['outer_forgot.phone_code_placeholder'];
			}else if(input.indexOf('outer_forgot.email_placeholder') >= 0){
				return config.STRING['outer_forgot.email_placeholder'];
			}else if(input.indexOf('outer_forgot.link_signin') >= 0){
				return config.STRING['outer_forgot.link_signin'];
			}else if(input.indexOf('outer_forgot.link_signup') >= 0){
				return config.STRING['outer_forgot.link_signup'];
			}else{
				return input;
			}
		};
	}]);
});






