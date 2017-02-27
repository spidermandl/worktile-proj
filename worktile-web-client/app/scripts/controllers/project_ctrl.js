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
								'Util','$timeout',
		function ($rootScope,$scope,config,$state,
					stateParams,$popbox,$translate,fastProject,
					util,$timeout) {
			//["$rootScope", "$scope", "$state", "$stateParams", "$timeout", "globalDataContext", "fastProject", "wtScrollService"],
			//       a           b         c            d             e                f                  g               h

			var i = ($scope.vm = {},
					stateParams.pid),
				j = function(a) {
					_.findIndex(a, {
						eid: "1d9e0c7f416168ad1b1d297816b48341"
					}) !== -1 ? 
						$scope.project.enable_extension_presenter = !0 
						: 
						$scope.project.enable_extension_presenter = !1
				},
				k = function(a) {
					if(a && "project" === $state.current.name){
						var b = ".task";
						if(null != a.extensions && _.isArray(a.extensions) && a.extensions.length > 0) {
							var d = _.sortBy(_.filter(a.extensions, {
								type: 1
							}), "pos");
							b = "." + d[0].key
						}
						".page" === b && (b = ".page.list"),
							$timeout(function() {
								$state.go("project" + b, null, {
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
						k(l);
						console.log($scope.project.navigations);
					})) 
					: 
					$timeout(function() {
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
							a.$broadcast(config.constant.event_names.show_project_sidebar, {
								status: this.status,
								sub_status: this.sub_status
							})
					},
					close: function() {
						this.change_status("", "");
					}
				},
				$scope.$on(config.constant.event_names.project_extensions_change,
					function(a, b) {
						j(b.extensions);
					})
		
		}])
		/**************************************************************************************************************
		 *
		 **************************************************************************************************************/
		.controller('projectInfoCtrl', ['$rootScope','$scope','config','$state',
								'$stateParams','$popbox','$translate',
								'Util','$timeout',
					function ($rootScope,$scope,config,$state,
								stateParams,$popbox,$translate,
								util,$timeout) {

				//["$scope", "$rootScope", "$popbox", "globalDataContext", "permissionFilter", "$timeout"],
				//     a           b            c              d                    e                f
				function g() {
					$(window).bind("resize.checkMoreNavMenu", j)
				}
				$scope.pm = {
					showNavMore: !1,
					elNavbar: $(".mod-navbar"),
					elToolbar: $(".main_toolbar"),
					elMenubar: $(".mod-navbar .center-menu")
				};
				$scope.pm.js_pop_project_menu = function(b) {
						$popbox.popbox({
							target: b,
							templateUrl: config.templateUrls.task_pop_project_menu,
							controller: ["$rootScope", "$scope", "popbox", "pop_data", "ProjectService",
								function(a, b, c, e, f) {
									b.popbox = c;
									var g = b.vm = {
										step: 0,
										project: e.project,
										prj_permission_admin: config.constant.prj_permission.admin,
										prj_permission_member: config.constant.prj_permission.member,
										prj_permission_guest: config.constant.prj_permission.guest
									};
									g.js_close = function() {
											c.close()
										},
										g.js_step = function(a) {
											g.step = a
										},
										g.js_add_project_member = function() {
											f.showAddMember(g.project),
												g.js_close()
										},
										g.js_project_setting = function() {
											f.showSetting(g.project),
												g.js_close()
										},
										g.js_project_extension = function() {
											f.showExtension(g.project),
												g.js_close()
										},
										g.js_project_labels = function() {
											f.showLabels(g.project),
												g.js_close()
										},
										g.js_project_timingtasks = function() {
											f.showTimingtasks(g.project),
												g.js_close()
										},
										g.js_project_copy = function() {
											f.showCopy(g.project),
												g.js_close()
										},
										g.js_project_move = function() {
											f.showMove(g.project),
												g.js_close()
										},
										g.js_project_export = function() {
											f.showExport(g.project),
												g.js_close()
										},
										g.js_project_webhook = function() {
											f.showWebhook(g.project),
												g.js_close()
										},
										g.js_project_createbymail = function() {
											f.showCreateByMail(g.project),
												g.js_close()
										},
										g.js_project_quit = function() {
											f.showQuit(g.project),
												g.js_close()
										},
										g.js_project_active = function() {
											f.showActive(g.project),
												g.js_close()
										},
										g.js_project_archive = function() {
											f.showArchive(g.project),
												g.js_close()
										},
										g.js_project_del = function() {
											f.showDel(g.project),
												g.js_close()
										},
										g.js_toggle_star = function() {
											d.cache.project.set_star(e.project.pid)
										},
										g.js_toggle_favorite = function() {
											var a = e.project.is_favorite ? 0 : 1;
											e.project.is_favorite = a,
												wt.data.project.set_favorite(e.project.pid, a,
													function(a) {
														d.cache.project.set_favorite(e.project.pid, e.project.is_favorite)
													},
													function() {
														e.project.is_favorite = a ? 0 : 1
													})
										},
										g.change_sidebar_status = function(a, b) {
											e.sidebar.change_status(a, b),
												c.close()
										}
								}
							],
							resolve: {
								pop_data: function() {
									return {
										sidebar: $rootScope.sidebar,
										project: $rootScope.project
									}
								}
							}
						}).open()
					},
					$scope.pm.js_pop_set_project_logo = function(f) {
						e(b.global.prj_module.setting, a.project.permission) && 
						$popbox.popbox({
							target: f,
							templateUrl: "/tpl/project/pop_project_logo.html",
							controller: ["$rootScope", "$scope", "popbox", "pop_data",
								function(a, b, c, e) {
									var f = b.vm = {
										prj_colors: config.constant.prj_colors,
										prj_icons: config.constant.prj_icons,
										project: e.project
									};
									b.popbox = c,
										f.js_close = function() {
											c.close()
										},
										f.js_icon_select = function(a) {
											d.cache.project.set_logo(f.project.pid, f.project.bg, a)
										},
										f.js_color_select = function(a) {
											d.cache.project.set_logo(f.project.pid, a, f.project.pic)
										}
								}
							],
							resolve: {
								pop_data: function() {
									return {
										project: $scope.project
									}
								}
							}
						}).open()
					};
				var i = 0,
					j = _.debounce(function(b) {
							$timeout(function() {
									$scope.project && 
									$scope.project.navigations && 
									(0 == i && $scope.pm.elMenubar.find("li").each(function(a, b) {
										i += $(b).outerWidth(!0)
									}), 
									i > $scope.pm.elMenubar.width() ? 
										$scope.pm.showNavMore = !0 : $scope.pm.showNavMore = !1)
								},
								150)
						},
						50);
				g(),
				$scope.$watch("project.navigations",
					function(a) {
						j()
					}),
				$scope.$watch("sidebar.status",
					function(a) {
						j(a)
					}),
				$scope.$on("$destroy",
					function() {
						$(window).unbind("resize.checkMoreNavMenu")
					})
		
		}])
		/**************************************************************************************************************
		 *
		 **************************************************************************************************************/
		.controller('prjSidebarCtrl', ['$scope','config',
							function ($scope,config) {
			//["$scope"]
			//     a
			var b = {
					default: 0,
					members: 1,
					filter_tasks: 4
				};
			$scope.vm = {
				step: 0,
				mail_domain: config.constant.mail.domain,
				prj_permission_admin: config.constant.prj_permission.admin,
				prj_permission_member: config.constant.prj_permission.member,
				prj_permission_guest: config.constant.prj_permission.guest
			};
			$scope.steps = b,
				"members" === $scope.sidebar.status && ($scope.vm.step = b.members),
				$scope.$on(config.constant.event_names.show_project_sidebar,
					function(a, d) {
						"members" === d.status ? 
							$scope.vm.step = b.members 
							: 
							"filter_tasks" === d.status ? 
								$scope.vm.step = b.filter_tasks 
								: 
								"setting" === d.status ? 
									d.sub_status ? 
										"base_info" === d.sub_status ? 
											$scope.vm.step = b.setting_base_info 
											: 
											"labels" === d.sub_status && ($scope.vm.step = b.setting_label) 
										: $scope.vm.step = b.setting 
									: "timing_tasks" === d.status ? 
										$scope.vm.step = b.setting_timing_tasks 
										: 
										"project_copy" === d.status ? 
											$scope.vm.step = b.project_copy 
											: 
											"export_data" === d.status ? 
												$scope.vm.step = b.export_data 
												: 
												"create_by_mail" === d.status ? 
													$scope.vm.step = b.create_by_mail 
													: 
													"setting_webhook" === d.status ? 
														$scope.vm.step = b.setting_webhook 
														: 
														"setting_transfer" === d.status ? 
															$scope.vm.step = b.setting_transfer 
															: 
															"setting_quit" === d.status ? 
																$scope.vm.step = b.setting_quit 
																: 
																$scope.vm.step = b.default
					}),
				$scope.vm.to_members = function() {
					$scope.vm.step = b.members,
						$scope.sidebar.status = "members",
						$scope.sidebar.sub_status = ""
				},
				$scope.vm.to_step = function(d) {
					switch(d) {
						case b.setting:
							$scope.sidebar.sub_status = "";
							break;
						case b.setting_base_info:
							$scope.sidebar.sub_status = "base_info";
							break;
						default:
							$scope.sidebar.sub_status = d
					}
					$scope.vm.step = d
				}
		
		}])
		/**************************************************************************************************************
		 *
		 **************************************************************************************************************/

		;
})