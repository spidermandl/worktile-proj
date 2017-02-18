/**
 * @ngdoc function
 * @name jtWorkApp.controller:team相关
 * @description
 * # team related controllers
 * Controller of the jtWorkApp
 */
define(['app'], function (app) {
	'use strict';

	app.controller('TeamCtrl', ['$rootScope','$scope','config',
		function ($rootScope,$scope,config) {
			//["$rootScope", "$scope", "$state", "$stateParams", "team", "teamCalendarFilterData", "$popbox", "$translate"]
			//    a             b         c           d             e              f                   g           h
			function i() {
				e && e.permission != kzi.constant.team_permission.guest ? (b.team = e, a.global.loading_done = !0, j.user_is_team_owner = b.team.permission == kzi.constant.team_permission.owner, j.user_is_team_admin = b.team.permission == kzi.constant.team_permission.owner || b.team.permission == kzi.constant.team_permission.admin, b.$on(kzi.constant.event_names.team_member_role_change,
				function(a, d) {
					b.team && b.team.team_id === d.team_id && (b.team.permission = d.team_permission, kzi.constant.team_module.view_base & d.team_permission || c.go("dashboard.default"))
				})) : wt.data.team.get_full(
						j.team_id,
						function(b) {
							j.public_team = b.data,
								a.global.title = [h.instant("team.title_name_public_team"), " | ", j.public_team.info.name].join(""),
								a.global.loading_done = !0
						},
						function(a) {
							c.go("not_found", {
								type: "team"
							});
						})
			}
			var j = b.vm = {
				state: c,
				user_is_team_admin: !1,
				display_team_setting: !1,
				user_is_team_owner: !1,
				teamCalendarFilterData: f,
				team_id: d.team_id,
				public_team: null
			};
			i(),
			j.js_view_team_info = function(a) {
				g.popbox({
					target: a,
					templateUrl: "/tpl/team/pop_team_info.html",
					controller: ["$scope", "popbox", "pop_data",
						function(a, b, c) {
							var d = a.vm = {
								team: c.team
							};
							a.popbox = b,
								d.js_close = function() {
									b.close()
								}
						}
					],
					resolve: {
						pop_data: function() {
							return {
								team: b.team
							}
						}
					}
				}).open();
			},
			j.js_toggle_team_filter = function() {
				f.team_calendar_filter_status = !f.team_calendar_filter_status
			}
		

	}]).controller('TeamProjectsCtrl', ['$scope','$rootScope','config',function ($scope,$rootScope,config) {
		console.log('--------------get in TeamProjectsCtrl');
	}])
	;
});