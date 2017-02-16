/**
 * @ngdoc function
 * @name constant
 * @description
 * constant of the jtWorkApp
 */
 define(['error'],function (error,require) {
 	'use strict';

	return {
		baseUrl: 'views/',
		//路由对应html 模板路径
		templateUrls : {
			login: 'views/gate/signin.html',
			signup: 'views/gate/signup.html',
			forgot: 'views/gate/forgot.html',
			dashboard: 'views/work/base_work.html',
			dashboard_task: 'views/work/dashboard/dashboard_task.html',
			dashboard_calendar: 'views/work/dashboard/dashboard_calendar.html',
			dashboard_activity_feed: 'views/work/dashboard/dashboard_activity_feed.html',
			dashboard_email: 'views/work/dashboard/dashboard_email.html',
			calendar_subscribe: 'views/work/dashboard/calendar_subscribe.html',
			search: 'views/work/search/search_panel.html',
			left_menu: 'views/work/left_menu.html',//左引导栏
			left_menu_team: 'views/work/toolbar/pop_my_teams.html',
			left_menu_project: 'views/work/toolbar/left_menu_project.html',
			left_menu_shortcut_create: 'views/work/toolbar/pop_shortcut_create.html',
			left_menu_avatar: 'views/work/toolbar/avatar.html',
			left_menu_avatar_setting: '/views/work/toolbar/pop_avatar_self.html',
			left_menu_dialog_team_create: '/views/work/toolbar/dialog_team_create.html',
			team_logo: '/views/work/toolbar/team/team_logo.html',
			'dashboard.default': 'views/work/dashboard/dashboard_task.html',
			calendar_event_create: 'views/work/dashboard/dialog_event_create.html',//创建日历event
			about: 'views/about.html',
		},
		//正则表达式
		regex:{
			mobile_area: "^[0-9]{1,4}$",
			mobile_probable: "^[0-9]{6,15}$",
			mobile: ["^(\\+?0?86\\-?)?1[345789]\\d{9}$|", "^(\\+?27|0)\\d{9}$|", "^(\\+?61|0)4\\d{8}|", "^(\\+?33|0)[67]\\d{8}$|", "^(\\+351)?9[1236]\\d{7}$"].join(""),
			email: "^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$",
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
		team_industries : {
	        0 : "",
	        1 : "CONS.team_industries.www",
	        2 : "CONS.team_industries.b2b",
	        3 : "CONS.team_industries.education",
	        4 : "CONS.team_industries.game",
	        5 : "CONS.team_industries.industry",
	        6 : "CONS.team_industries.finance",
	        7 : "CONS.team_industries.consulting",
	        8 : "CONS.team_industries.estate",
	        9 : "CONS.team_industries.ngo",
	        13 : "CONS.team_industries.other"
	    },
	    scale : [{
			    value: 1,
		        text: "CONS.scale.1-10"
		    },
		    {
		        value: 2,
		        text: "CONS.scale.11-20"
		    },
		    {
		        value: 3,
		        text: "CONS.scale.21-50"
		    },
		    {
		        value: 4,
		        text: "CONS.scale.51-100"
		    },
		    {
		        value: 5,
		        text: "CONS.scale.101-200"
		    },
		    {
		        value: 6,
		        text: "CONS.scale.201-500"
		    },
		    {
		        value: 7,
		        text: "CONS.scale.500+"
		    }],

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
     	},
     	errors : error,
	};
});








