/**
 * @ngdoc function
 * @name jtWorkApp.controller:team相关
 * @description
 * # team related controllers
 * Controller of the jtWorkApp
 */
define(['app'], function (app) {
	'use strict';

	app.controller('TeamCtrl', ['$rootScope','$scope','config','$state','teamCalendarFilterData',
								'$stateParams','$popbox','$translate',
		function ($rootScope,$scope,config,$state,teamCalendarFilterData,
					stateParams,$popbox,$translate) {
			//["$rootScope", "$scope", "$state", "$stateParams", "team", "teamCalendarFilterData", "$popbox", "$translate"]
			//    a             b         c           d             e              f                   g           h
			function i() {
				e && e.permission != kzi.constant.team_permission.guest ? 
					($scope.team = e, 
						a.global.loading_done = !0, 
						$scope.vm.user_is_team_owner = $scope.team.permission == kzi.constant.team_permission.owner,
						$scope.vm.user_is_team_admin = $scope.team.permission == 
							kzi.constant.team_permission.owner || $scope.team.permission == kzi.constant.team_permission.admin, 
						$scope.$on(kzi.constant.event_names.team_member_role_change,
							function(a, d) {
								$scope.team && 
								$scope.team.team_id === d.team_id && 
								($scope.team.permission = d.team_permission, 
									kzi.constant.team_module.view_base & d.team_permission || $state.go("dashboard.default"))
							})) 
					: 
					wt.data.team.get_full(
						$scope.vm.team_id,
						function(b) {
							$scope.vm.public_team = b.data;
							$rootScope.global.title = [$translate.instant("team.title_name_public_team"), " | ", $scope.vm.public_team.info.name].join("");
							$rootScope.global.loading_done = !0;
						},
						function(a) {
							$state.go("not_found", {
								type: "team"
							});
						})
			}
			$scope.vm = {
				state: $state,
				user_is_team_admin: !1,
				display_team_setting: !1,
				user_is_team_owner: !1,
				teamCalendarFilterData: teamCalendarFilterData,
				team_id: stateParams.team_id,
				public_team: null
			};
			i(),
			$scope.vm.js_view_team_info = function(a) {
				$popbox.popbox({
					target: a,
					templateUrl: "/tpl/team/pop_team_info.html",
					controller: ["$scope", "popbox", "pop_data",
						function(a, b, c) {
							var d = a.vm = {
								team: c.team
							};
							a.popbox = b;
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
			$scope.vm.js_toggle_team_filter = function() {
				teamCalendarFilterData.team_calendar_filter_status = !teamCalendarFilterData.team_calendar_filter_status;
			}
		

	}])
	.controller('TeamProjectsCtrl', ['$scope','$rootScope','config',function ($scope,$rootScope,config) {
		console.log('--------------get in TeamProjectsCtrl');
	}])
	;
});