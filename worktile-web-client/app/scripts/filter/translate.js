// /**
//  * @ngdoc function
//  * @name jtWorkApp.controller:translate filter
//  * @description
//  * # translate filter
//  * Controller of the jtWorkApp
//  */
// define(['app'], function (app) {
// 	'use strict';
// 	console.log("translate");
// 	app.filter('translate',['config',function(config){//多语言适配
// 		return function(input){
// 			/*
// 			********************************登录 相关************************************
// 			*/
// 			if(input.indexOf('username_placeholder') >= 0){
// 				return config.STRING.username_placeholder;
// 			}else if(input.indexOf('password_placeholder') >= 0){
// 				return config.STRING.password_placeholder;
// 			}else if(input.indexOf('tips_change_iscode') >= 0){
// 				return config.STRING.tips_change_iscode;
// 			}else if(input.indexOf('iscode_placeholder') >= 0){
// 				return config.STRING.iscode_placeholder;
// 			}else if(input.indexOf('logining') >= 0){
// 				return '';
// 			}else if(input.indexOf('dynamic_placeholder') >= 0){
// 				return '';
// 			}else if(input.indexOf('security_code_placeholder') >= 0){
// 				return '';
// 			}else if(input.indexOf('outer_signup.phone_placeholder') >= 0){
// 				return config.STRING['outer_signup.phone_placeholder'];
// 			}else if(input.indexOf('outer_signup.phone_code_placeholder') >= 0){
// 				return config.STRING['outer_signup.phone_code_placeholder'];
// 			}else if(input.indexOf('outer_signup.display_name_placeholder') >= 0){
// 				return config.STRING['outer_signup.display_name_placeholder'];
// 			}else if(input.indexOf('outer_signup.link_email_try') >= 0){
// 				return config.STRING['outer_signup.link_email_try'];
// 			}else if(input.indexOf('outer_signup.email_placeholder') >= 0){
// 				return config.STRING['outer_signup.email_placeholder'];
// 			}else if(input.indexOf('outer_forgot.phone_placeholder') >= 0){
// 				return config.STRING['outer_forgot.phone_placeholder'];
// 			}else if(input.indexOf('outer_forgot.btn_submit_phone') >= 0){
// 				return config.STRING['outer_forgot.btn_submit_phone'];
// 			}else if(input.indexOf('outer_forgot.btn_submit_email') >= 0){
// 				return config.STRING['outer_forgot.btn_submit_email'];
// 			}else if(input.indexOf('outer_forgot.phone_code_placeholder') >= 0){
// 				return config.STRING['outer_forgot.phone_code_placeholder'];
// 			}else if(input.indexOf('outer_forgot.email_placeholder') >= 0){
// 				return config.STRING['outer_forgot.email_placeholder'];
// 			}else if(input.indexOf('outer_forgot.link_signin') >= 0){
// 				return config.STRING['outer_forgot.link_signin'];
// 			}else if(input.indexOf('outer_forgot.link_signup') >= 0){
// 				return config.STRING['outer_forgot.link_signup'];
// 			}
// 			/*
// 			********************************leftmenu 相关************************************
// 			**/
// 			if(input.indexOf('leftmenu.item_dashboard') >= 0){
// 				return config.STRING['leftmenu.item_dashboard'];
// 			}else if(input.indexOf('leftmenu.item_search') >= 0){
// 				return config.STRING['leftmenu.item_search'];
// 			}else if(input.indexOf('leftmenu.item_notice') >= 0){
// 				return config.STRING['leftmenu.item_notice'];
// 			}else if(input.indexOf('leftmenu.item_project') >= 0){
// 				return config.STRING['leftmenu.item_project'];
// 			}else if(input.indexOf('pop_my_teams.title_name') >= 0){
// 				return config.STRING['pop_my_teams.title_name'];
// 			}else if(input.indexOf('pop_my_teams.btn_create_team') >= 0){
// 				return config.STRING['pop_my_teams.btn_create_team'];
// 			}else if(input.indexOf('pop_my_teams.desc_create_team') >= 0){
// 				return config.STRING['pop_my_teams.desc_create_team'];
// 			}else if(input.indexOf('pop_my_teams.btn_upgrade_pro') >= 0){
// 				return config.STRING['pop_my_teams.btn_upgrade_pro'];
// 			}else if(input.indexOf('leftmenu_projects.title_name') >= 0){
// 				return config.STRING['leftmenu_projects.title_name'];
// 			}else if(input.indexOf('leftmenu_projects.placeholder_search_project_name') >= 0){
// 				return config.STRING['leftmenu_projects.placeholder_search_project_name'];
// 			}else if(input.indexOf('leftmenu_projects.toggle_lock_to_left') >= 0){
// 				return config.STRING['leftmenu_projects.toggle_lock_to_left'];
// 			}else if(input.indexOf('leftmenu_projects.toggle_unlock_left') >= 0){
// 				return config.STRING['leftmenu_projects.toggle_unlock_left'];
// 			}else if(input.indexOf('leftmenu_projects.link_all_projects') >= 0){
// 				return config.STRING['leftmenu_projects.link_all_projects'];
// 			}else if(input.indexOf('leftmenu_projects.link_to_archives') >= 0){
// 				return config.STRING['leftmenu_projects.link_to_archives'];
// 			}else if(input.indexOf('leftmenu_projects.link_to_favorite') >= 0){
// 				return config.STRING['leftmenu_projects.link_to_favorite'];
// 			}else if(input.indexOf('leftmenu_me.go_preferences') >= 0){
// 				return config.STRING['leftmenu_me.go_preferences'];
// 			}else if(input.indexOf('leftmenu_me.go_account_info') >= 0){
// 				return config.STRING['leftmenu_me.go_account_info'];
// 			}else if(input.indexOf('leftmenu_me.post_feedback') >= 0){
// 				return config.STRING['leftmenu_me.post_feedback'];
// 			}else if(input.indexOf('leftmenu_me.link_worktile_app') >= 0){
// 				return config.STRING['leftmenu_me.link_worktile_app'];
// 			}else if(input.indexOf('leftmenu_me.watch_wechat') >= 0){
// 				return config.STRING['leftmenu_me.watch_wechat'];
// 			}else if(input.indexOf('leftmenu_me.link_help') >= 0){
// 				return config.STRING['leftmenu_me.link_help'];
// 			}else if(input.indexOf('leftmenu_me.link_club') >= 0){
// 				return config.STRING['leftmenu_me.link_club'];
// 			}else if(input.indexOf('leftmenu_me.link_blog') >= 0){
// 				return config.STRING['leftmenu_me.link_blog'];
// 			}else if(input.indexOf('leftmenu_me.link_can') >= 0){
// 				return config.STRING['leftmenu_me.link_can'];
// 			}else if(input.indexOf('leftmenu_me.btn_quit_session') >= 0){
// 				return config.STRING['leftmenu_me.btn_quit_session'];
// 			}else if(input.indexOf('common.txt_team') >= 0){
// 				return config.STRING['common.txt_team'];
// 			}else if(input.indexOf('common.txt_project') >= 0){
// 				return config.STRING['common.txt_project'];
// 			}else if(input.indexOf('common.txt_task') >= 0){
// 				return config.STRING['common.txt_task'];
// 			}else if(input.indexOf('common.txt_event') >= 0){
// 				return config.STRING['common.txt_event'];
// 			}else if(input.indexOf('common.txt_file') >= 0){
// 				return config.STRING['common.txt_file'];
// 			}
// 			/*
// 			************************************dashboard相关页面****************************************
// 			**/
// 			else if(input.indexOf('dashboard.title_name_my_tasks') >= 0){
// 				return config.STRING['dashboard.title_name_my_tasks'];
// 			}else if(input.indexOf('dashboard.title_name_calendar') >= 0){
// 				return config.STRING['dashboard.title_name_calendar'];
// 			}else if(input.indexOf('dashboard.title_name_feed') >= 0){
// 				return config.STRING['dashboard.title_name_feed'];
// 			}else if(input.indexOf('dashboard.title_name_email') >= 0){
// 				return config.STRING['dashboard.title_name_email'];
// 			}else if(input.indexOf('dashboard.title_name') >= 0){
// 				return config.STRING['dashboard.title_name'];
// 			}else if(input.indexOf('dashboardTask.sort_by_order') >= 0){
// 				return config.STRING['dashboardTask.sort_by_order'];
// 			}else if(input.indexOf('dashboardTask.sort_by_expire') >= 0){
// 				return config.STRING['dashboardTask.sort_by_expire'];
// 			}else if(input.indexOf('dashboardTask.recent_completed') >= 0){
// 				return config.STRING['dashboardTask.recent_completed'];
// 			}else if(input.indexOf('dashboardTask.sort_by_update') >= 0){
// 				return config.STRING['dashboardTask.sort_by_update'];
// 			}else if(input.indexOf('dashboardTask.my_watcher') >= 0){
// 				return config.STRING['dashboardTask.my_watcher'];
// 			}else if(input.indexOf('dashboardTask.my_create') >= 0){
// 				return config.STRING['dashboardTask.my_create'];
// 			}else if(input.indexOf('dashboardTask.all_tasks') >= 0){
// 				return config.STRING['dashboardTask.all_tasks'];
// 			}else if(input.indexOf('dashboardCalendar.btn_new_event') >= 0){
// 				return config.STRING['dashboardCalendar.btn_new_event'];
// 			}else if(input.indexOf('dashboardCalendar.btn_subscribe') >= 0){
// 				return config.STRING['dashboardCalendar.btn_subscribe'];
// 			}else if(input.indexOf('dashboardTask.inbox') >= 0){
// 				return config.STRING['dashboardTask.inbox'];
// 			}else if(input.indexOf('dashboardTask.today_done') >= 0){
// 				return config.STRING['dashboardTask.today_done'];
// 			}else if(input.indexOf('dashboardTask.next_step_done') >= 0){
// 				return config.STRING['dashboardTask.next_step_done'];
// 			}else if(input.indexOf('dashboardTask.later_done') >= 0){
// 				return config.STRING['dashboardTask.later_done'];
// 			}else if(input.indexOf('dashboardTask.assign_your_show') >= 0){
// 				return config.STRING['dashboardTask.assign_your_show'];
// 			}else if(input.indexOf('dashboardTask.today_done_show') >= 0){
// 				return config.STRING['dashboardTask.today_done_show'];
// 			}else if(input.indexOf('dashboardTask.next_done_show') >= 0){
// 				return config.STRING['dashboardTask.next_done_show'];
// 			}else if(input.indexOf('dashboardTask.later_show') >= 0){
// 				return config.STRING['dashboardTask.later_show'];
// 			}else if(input.indexOf('tasks.btn_add_task') >= 0){
// 				return config.STRING['tasks.btn_add_task'];
// 			}else if(input.indexOf('common.today') >= 0){
// 				return config.STRING['common.today'];
// 			}else if(input.indexOf('common.week') >= 0){
// 				return config.STRING['common.week'];
// 			}else if(input.indexOf('common.month') >= 0){
// 				return config.STRING['common.month'];
// 			}else if(input.indexOf('dialog_event_create.title_name') >= 0){
// 				return config.STRING['dialog_event_create.title_name'];
// 			}else if(input.indexOf('calendar_subscribe.title_name') >= 0){
// 				return config.STRING['calendar_subscribe.title_name'];
// 			}else if(input.indexOf('calendar_subscribe.tips_iphone_ipad') >= 0){
// 				return config.STRING['calendar_subscribe.tips_iphone_ipad'];
// 			}else if(input.indexOf('calendar_subscribe.other_app_subscribe') >= 0){
// 				return config.STRING['calendar_subscribe.other_app_subscribe'];
// 			}else if(input.indexOf('calendar_subscribe.scan_subscribe') >= 0){
// 				return config.STRING['calendar_subscribe.scan_subscribe'];
// 			}else if(input.indexOf('calendar_subscribe.click_link_subscribe') >= 0){
// 				return config.STRING['calendar_subscribe.click_link_subscribe'];
// 			}else if(input.indexOf('calendar_subscribe.btn_restart_subscribe') >= 0){
// 				return config.STRING['calendar_subscribe.btn_restart_subscribe'];
// 			}else if(input.indexOf('calendar_subscribe.info_subscribe') >= 0){
// 				return config.STRING['calendar_subscribe.info_subscribe'];
// 			}else if(input.indexOf('dashboardActivityFeed.btn_new_feed') >= 0){
// 				return config.STRING['dashboardActivityFeed.btn_new_feed'];
// 			}else if(input.indexOf('common.btn_loading') >= 0){
// 				return config.STRING['common.btn_loading'];
// 			}else if(input.indexOf('dashboardActivityFeed.warn_feed_empty') >= 0){
// 				return config.STRING['dashboardActivityFeed.warn_feed_empty'];
// 			}
// 			/*
// 			********************************search 相关页面************************************
// 			**/
// 			else if(input.indexOf('search.title_name') >= 0){
// 				return config.STRING['search.title_name'];
// 			}else if(input.indexOf('search_panel.keywords_placeholder') >= 0){
// 				return config.STRING['search_panel.keywords_placeholder'];
// 			}else if(input.indexOf('search_panel.search_history') >= 0){
// 				return config.STRING['search_panel.search_history'];
// 			}else if(input.indexOf('search_panel.clear') >= 0){
// 				return config.STRING['search_panel.clear'];
// 			}else if(input.indexOf('search_panel.title_standard_search') >= 0){
// 				return config.STRING['search_panel.title_standard_search'];
// 			}else if(input.indexOf('search_panel.assign_my') >= 0){
// 				return config.STRING['search_panel.assign_my'];
// 			}else if(input.indexOf('search_panel.my_create') >= 0){
// 				return config.STRING['search_panel.my_create'];
// 			}else if(input.indexOf('search_panel.my_watch') >= 0){
// 				return config.STRING['search_panel.my_watch'];
// 			}else if(input.indexOf('search_panel.recent_change') >= 0){
// 				return config.STRING['search_panel.recent_change'];
// 			}else if(input.indexOf('search_panel.tips_quick_search') >= 0){
// 				return config.STRING['search_panel.tips_quick_search'];
// 			}else{
// 				return input;
// 			}







// 		};
// 	}]);
// });