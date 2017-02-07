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
			'dashboard.default': 'views/work/dashboard/dashboard_task.html',
			calendar_event_create: 'views/work/dashboard/dialog_event_create.html',//创建日历event
			about: 'views/about.html',
		},
		//正则表达式
		mobile_area: "^[0-9]{1,4}$",
		mobile_probable: "^[0-9]{6,15}$",
		mobile: ["^(\\+?0?86\\-?)?1[345789]\\d{9}$|", "^(\\+?27|0)\\d{9}$|", "^(\\+?61|0)4\\d{8}|", "^(\\+?33|0)[67]\\d{8}$|", "^(\\+351)?9[1236]\\d{7}$"].join(""),
		email: "^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$",
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
  			'pop_my_teams.title_name' : '我的团队',
  			'pop_my_teams.btn_create_team' : '创建新团队',
  			'pop_my_teams.desc_create_team': '邀请伙伴，通过项目组织人和事，一个团队就是一个部门或公司',
  			'pop_my_teams.btn_upgrade_pro' : '升级到企业版',
  			'leftmenu_projects.title_name' : '项目',
  			'leftmenu_projects.placeholder_search_project_name' : '快速查找项目',
  			'leftmenu_projects.toggle_lock_to_left' : '固定到栏边',
  			'leftmenu_projects.toggle_unlock_left' : '取消固定',
  			'leftmenu_projects.link_all_projects' : '全部项目',
  			'leftmenu_projects.link_to_archives' : '归档项目',
  			'leftmenu_projects.link_to_favorite' : '收藏项目',
  			'common.txt_team': '团队',
  			'common.txt_project': '项目',
  			'common.txt_task': '任务',
  			'common.txt_event': '日程',
  			'common.txt_file': '文件',
  			'dashboard.title_name': '我的工作台',
            'dashboard.title_name_my_tasks': '任务',
            'dashboard.title_name_calendar': '日程',
            'dashboard.title_name_feed': '动态',
            'dashboard.title_name_email': '邮件',
            'dashboardTask.sort_by_order': ' 按处理优先级 ',
            'dashboardTask.sort_by_expire': '按截止日期 ',
            'dashboardTask.recent_completed': ' 最近完成的任务 ',
            'dashboardTask.sort_by_update': ' 按更新时间 ',
            'dashboardTask.my_watcher': ' 我关注的 ',
            'dashboardTask.my_create': ' 我创建的 ',
            'dashboardTask.all_tasks': ' 全部任务 ',
            'dashboardTask.inbox': '收件箱',
            'dashboardTask.today_done': '今天要做',
            'dashboardTask.next_step_done': '下一步要做',
            'dashboardTask.later_done': '以后再做',
            'dashboardTask.assign_your_show':'分派给你的任务都会显示在这里',
            'dashboardTask.today_done_show':'今天要做的任务放到这里',
            'dashboardTask.next_done_show':'接下来会做的任务放到这里',
            'dashboardTask.later_show':'以后再考虑的任务放到这里',
            'tasks.btn_add_task' : '新建任务',
            'dashboardCalendar.btn_new_event': '新建日程',
            'dashboardCalendar.btn_subscribe': '订阅',
            'common.today' : '今天',
            'common.week' : '周',
            'common.month' : '月',
            'dialog_event_create.title_name' : '新建日程',
            'calendar_subscribe.title_name' : '日历订阅',
            'calendar_subscribe.tips_iphone_ipad' : '在 iPhone 和 iPad 上订阅',
            'calendar_subscribe.other_app_subscribe' : '在其他日程管理软件中订阅',
            'calendar_subscribe.scan_subscribe' : '扫描下方的二维码即可订阅我的日程，推荐使用 QQ 浏览器扫描',
            'calendar_subscribe.click_link_subscribe' : '点击下方地址直接订阅，或者复制到日历软件中手动添加',
            'calendar_subscribe.btn_restart_subscribe' : '重置订阅链接',
            'calendar_subscribe.info_subscribe': '通过订阅功能，在手机、平板电脑或者其他日历软件中查看我的日程',
            'dashboardActivityFeed.btn_new_feed' : '  刷新动态',
            'common.btn_loading': '加载更多',
            'dashboardActivityFeed.warn_feed_empty' : '没有最新动态',
            'search.title_name':'搜索',
            'search_panel.keywords_placeholder':'输入要搜索的内容',
            'search_panel.search_history':'搜索历史',
            'search_panel.clear':'清空',
            'search_panel.title_standard_search':'常用搜索',
            'search_panel.assign_my':'分配给我的任务',
            'search_panel.my_create':'我创建的',
            'search_panel.my_watch':'我关注的',
            'search_panel.recent_change':'我最近修改的',
            'search_panel.tips_quick_search':' 快捷搜索 (⌘ + K)',


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
     	},
     	errors : error,
	};
});








