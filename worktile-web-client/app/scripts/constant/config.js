'use strict';

/**
 * @ngdoc function
 * @name constant
 * @description
 * # AboutCtrl
 * Controller of the jtWorkApp
 */
 define(function (require) {
	return {
		baseUrl: 'views/',
		//路由对应html 模板路径
		templateUrls : {
			login : 'views/gate/base_login.html',
			signup : 'views/gate/base_login.html',
			forgot : 'views/gate/base_login.html',
			dashboard : 'views/work/base_work.html',
			left_menu : 'views/work/left_menu.html',//左引导栏
			about : 'views/about.html',
		},
		//电话前缀
		phone_prefixs:[
				{ name : '中国', val: 86,},
				{ name : '香港', val: 852,},
				{ name : '台湾', val: 886,},
				{ name : '日本', val: 81,},
				{ name : '美国', val: 1,},
				{ name : '其他', val: null,},
			],
		STRING : {
			username_placeholder : '邮箱/用户名/手机',
  			password_placeholder : '密码',
  			tips_change_iscode : '刷新验证码',
  			iscode_placeholder : '验证码',
  			logining : null,
  			dynamic_placeholder : null,
  			security_code_placeholder : null,
  			'outer_signup.phone_placeholder' : '手机',
  			'outer_signup.phone_code_placeholder' : '验证码',
  			'outer_signup.display_name_placeholder' : '姓名',
  			'outer_signup.link_email_try' : '或者试试',
  			'outer_signup.email_placeholder' : '邮箱',
  			signup_phone_text : '获取验证码',
  			'outer_forgot.phone_placeholder' : '注册时填写的手机号',
  			'outer_forgot.btn_submit_phone' : '验证手机验证码',
  			'outer_forgot.btn_submit_email' : '发送重置密码的邮件',
  			phone_code_text : '获取验证码',
  			'outer_forgot.link_signin' : '返回登录',
  			'outer_forgot.link_signup' : '免费注册',
  			'outer_forgot.phone_code_placeholder' : '验证码',
  			'outer_forgot.email_placeholder' : '注册时填写的邮箱',
  			'leftmenu.item_dashboard' : '我的',
  			'leftmenu.item_search' : '搜索',
  			'leftmenu.item_notice' : '消息',
  			'leftmenu.item_project' : '项目',
		},
		//输入验证错误提示信息
		VALIDATE_ERROR : {
			login_name : {
				required : "用户名或者邮箱不能为空",
			},
			login_password : {
				required : "登录密码不能为空",
			},
			signup_phone : {
				required : "手机号码不能为空",
				pattern : "手机号码格式不对",
			},
			phone_code : {
				required : "注册验证码不能为空",
			},
			signup_display_name :{
				required : "用户名不能为空",
				maxlength: "密码长度不能大于{maxlength}",
			},
			signup_email: {
				required : "邮箱不能为空",
				pattern : "邮箱格式不对",
			},
			signup_password: {
				required : "注册密码不能为空",
			},
			// password : {
			// 	required: "密码不能为空",
			// 	minlength: "密码长度不能小于{minlength}",
			// 	maxlength: "密码长度不能大于{maxlength}",
			// },
     	}
	};
});








