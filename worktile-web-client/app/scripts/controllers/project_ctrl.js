/**
 * @ngdoc function
 * @name jtWorkApp.controller:project 相关
 * @description
 * # project related controllers
 * Controller of the jtWorkApp
 */
define(['app'], function (app) {
	'use strict';
	/**************************************************************************************************************
	 *
	 **************************************************************************************************************/
	app.controller('projectHomeCtrl', ['$rootScope','$scope','config','$state',
								'$stateParams','$popbox','$translate','fastProject',
								'Util',
		function ($rootScope,$scope,config,$state,
					stateParams,$popbox,$translate,fastProject,
					util) {
			//["$rootScope", "$scope", "$state", "$stateParams", "$timeout", "globalDataContext", "fastProject", "wtScrollService"],
			//       a           b         c            d             e                f                  g               h

			var i = ($scope.vm = {},
					stateParams.pid),
				j = function(a) {
					_.findIndex(a, {
						eid: "1d9e0c7f416168ad1b1d297816b48341"
					}) !== -1 ? $scope.project.enable_extension_presenter = !0 : b.project.enable_extension_presenter = !1
				},
				k = function(a) {
					if(a && "project" === c.current.name){
						var b = ".task";
						if(null != a.extensions && _.isArray(a.extensions) && a.extensions.length > 0) {
							var d = _.sortBy(_.filter(a.extensions, {
								type: 1
							}), "pos");
							b = "." + d[0].key
						}
						".page" === b && (b = ".page.list"),
							e(function() {
								c.go("project" + b, null, {
									location: "replace"
								})
							})
					}
				},
				l = fastProject;//ui route 传来的参数
			l ? ($scope.project = l, util.project.get_extensions(l.extensions,
					function(a) {
						j(_.filter(a, {
								enable: 1
							})),
							$scope.project.navigations = _.filter(a, {
								enable: 1,
								type: 1
							}),
							k(l)
					})) : e(function() {
					$state.go("project_not_found", {
						pid: i
					}, {
						location: "replace"
					})
				}),
				$scope.task_filters = {
					texts: [],
					labels: [],
					members: [],
					date: "",
					hide_completed: !1,
					turn_on: !1,
					type: ""
				};
			var m = config.localData.get("project_sidebar_status");
			$scope.sidebar = {
					status: "members" === m ? "members" : "",
					sub_status: "",
					change_status: function(b, c) {
						b === this.status && c === this.sub_status ? (this.status = "", this.sub_status = "") : (this.status = b, this.sub_status = c),
							config.localData.set("project_sidebar_status", this.status),
							a.$broadcast(config.event_names.show_project_sidebar, {
								status: this.status,
								sub_status: this.sub_status
							})
					},
					close: function() {
						this.change_status("", "");
					}
				},
				$scope.$on(config.event_names.project_extensions_change,
					function(a, b) {
						j(b.extensions);
					})
		
		}])

		;
})