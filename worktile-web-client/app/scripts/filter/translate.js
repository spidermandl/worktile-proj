/**
 * @ngdoc function
 * @name jtWorkApp.controller:translate filter
 * @description
 * # translate filter
 * Controller of the jtWorkApp
 */
define(['app'], function (app) {
	'use strict';

	app.filter('translate',['config',function(config){//多语言适配
		return function(input){
			/*
			********************************leftmenu 相关************************************
			**/
			if(input.indexOf('leftmenu.item_dashboard') >= 0){
				return config.STRING['leftmenu.item_dashboard'];
			}else if(input.indexOf('leftmenu.item_search') >= 0){
				return config.STRING['leftmenu.item_search'];
			}else if(input.indexOf('leftmenu.item_notice') >= 0){
				return config.STRING['leftmenu.item_notice'];
			}else if(input.indexOf('leftmenu.item_project') >= 0){
				return config.STRING['leftmenu.item_project'];
			}else if(input.indexOf('pop_my_teams.title_name') >= 0){
				return config.STRING['pop_my_teams.title_name'];
			}else if(input.indexOf('pop_my_teams.btn_create_team') >= 0){
				return config.STRING['pop_my_teams.btn_create_team'];
			}else if(input.indexOf('pop_my_teams.desc_create_team') >= 0){
				return config.STRING['pop_my_teams.desc_create_team'];
			}else if(input.indexOf('pop_my_teams.btn_upgrade_pro') >= 0){
				return config.STRING['pop_my_teams.btn_upgrade_pro'];
			}else if(input.indexOf('common.txt_team') >= 0){
				return config.STRING['common.txt_team'];
			}else if(input.indexOf('common.txt_project') >= 0){
				return config.STRING['common.txt_project'];
			}else if(input.indexOf('common.txt_task') >= 0){
				return config.STRING['common.txt_task'];
			}else if(input.indexOf('common.txt_event') >= 0){
				return config.STRING['common.txt_event'];
			}else if(input.indexOf('common.txt_file') >= 0){
				return config.STRING['common.txt_file'];
			}
			/*
			************************************dashboard相关页面****************************************
			**/
			else if(input.indexOf('dashboard.title_name_my_tasks') >= 0){
				return config.STRING['dashboard.title_name_my_tasks'];
			}else if(input.indexOf('dashboard.title_name_calendar') >= 0){
				return config.STRING['dashboard.title_name_calendar'];
			}else if(input.indexOf('dashboard.title_name_feed') >= 0){
				return config.STRING['dashboard.title_name_feed'];
			}else if(input.indexOf('dashboard.title_name_email') >= 0){
				return config.STRING['dashboard.title_name_email'];
			}else if(input.indexOf('dashboard.title_name') >= 0){
				return config.STRING['dashboard.title_name'];
			}else if(input.indexOf('dashboardTask.sort_by_order') >= 0){
				return config.STRING['dashboardTask.sort_by_order'];
			}else if(input.indexOf('dashboardTask.sort_by_expire') >= 0){
				return config.STRING['dashboardTask.sort_by_expire'];
			}else if(input.indexOf('dashboardTask.recent_completed') >= 0){
				return config.STRING['dashboardTask.recent_completed'];
			}else if(input.indexOf('dashboardTask.sort_by_update') >= 0){
				return config.STRING['dashboardTask.sort_by_update'];
			}else if(input.indexOf('dashboardTask.my_watcher') >= 0){
				return config.STRING['dashboardTask.my_watcher'];
			}else if(input.indexOf('dashboardTask.my_create') >= 0){
				return config.STRING['dashboardTask.my_create'];
			}else if(input.indexOf('dashboardTask.all_tasks') >= 0){
				return config.STRING['dashboardTask.all_tasks'];
			}else if(input.indexOf('dashboardCalendar.btn_new_event') >= 0){
				return config.STRING['dashboardCalendar.btn_new_event'];
			}else if(input.indexOf('dashboardCalendar.btn_subscribe') >= 0){
				return config.STRING['dashboardCalendar.btn_subscribe'];
			}else if(input.indexOf('common.today') >= 0){
				return config.STRING['common.today'];
			}else if(input.indexOf('common.week') >= 0){
				return config.STRING['common.week'];
			}else if(input.indexOf('common.month') >= 0){
				return config.STRING['common.month'];
			}else if(input.indexOf('dialog_event_create.title_name') >= 0){
				return config.STRING['dialog_event_create.title_name'];
			}else if(input.indexOf('calendar_subscribe.title_name') >= 0){
				return config.STRING['calendar_subscribe.title_name'];
			}else if(input.indexOf('calendar_subscribe.tips_iphone_ipad') >= 0){
				return config.STRING['calendar_subscribe.tips_iphone_ipad'];
			}else if(input.indexOf('calendar_subscribe.other_app_subscribe') >= 0){
				return config.STRING['calendar_subscribe.other_app_subscribe'];
			}else if(input.indexOf('calendar_subscribe.scan_subscribe') >= 0){
				return config.STRING['calendar_subscribe.scan_subscribe'];
			}else if(input.indexOf('calendar_subscribe.click_link_subscribe') >= 0){
				return config.STRING['calendar_subscribe.click_link_subscribe'];
			}else if(input.indexOf('calendar_subscribe.btn_restart_subscribe') >= 0){
				return config.STRING['calendar_subscribe.btn_restart_subscribe'];
			}else if(input.indexOf('calendar_subscribe.info_subscribe') >= 0){
				return config.STRING['calendar_subscribe.info_subscribe'];
			}else if(input.indexOf('dashboardActivityFeed.btn_new_feed') >= 0){
				return config.STRING['dashboardActivityFeed.btn_new_feed'];
			}else if(input.indexOf('common.btn_loading') >= 0){
				return config.STRING['common.btn_loading'];
			}else if(input.indexOf('dashboardActivityFeed.warn_feed_empty') >= 0){
				return config.STRING['dashboardActivityFeed.warn_feed_empty'];
			}
			/*
			********************************search 相关页面************************************
			**/
			else if(input.indexOf('search.title_name') >= 0){
				return config.STRING['search.title_name'];
			}else if(input.indexOf('search_panel.keywords_placeholder') >= 0){
				return config.STRING['search_panel.keywords_placeholder'];
			}else if(input.indexOf('search_panel.search_history') >= 0){
				return config.STRING['search_panel.search_history'];
			}else if(input.indexOf('search_panel.clear') >= 0){
				return config.STRING['search_panel.clear'];
			}else if(input.indexOf('search_panel.title_standard_search') >= 0){
				return config.STRING['search_panel.title_standard_search'];
			}else if(input.indexOf('search_panel.assign_my') >= 0){
				return config.STRING['search_panel.assign_my'];
			}else if(input.indexOf('search_panel.my_create') >= 0){
				return config.STRING['search_panel.my_create'];
			}else if(input.indexOf('search_panel.my_watch') >= 0){
				return config.STRING['search_panel.my_watch'];
			}else if(input.indexOf('search_panel.recent_change') >= 0){
				return config.STRING['search_panel.recent_change'];
			}else if(input.indexOf('search_panel.tips_quick_search') >= 0){
				return config.STRING['search_panel.tips_quick_search'];
			}else{
				return input;
			}







		};
	}]);
});