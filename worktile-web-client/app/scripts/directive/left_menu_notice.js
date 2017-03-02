/**
 * @ngdoc function
 * @name jtWorkApp.directive:wtLeftmenu
 * @description
 * # wtLeftmenu 左侧控制栏
 * left menu directive
 */
define(['app'], function (app) {
	'use strict';

	app.directive("wtDropwindow", ['config',function(config) {
		return {
				restrict: "E",
				replace: !0,
				scope: !0,
				templateUrl: config.templateUrls.left_menu_dropwindow,
		}
	}])
	.directive("wtNoticeList", ['config',function(config) {
		return {
				restrict: "E",
				controller: "noticeCtrl",
				replace: !0,
				scope: !0,
				templateUrl: config.templateUrls.notice_list,
				link: function(a, b, c, d) {}
		}
	}])

			
		
})