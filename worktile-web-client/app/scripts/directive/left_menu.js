/**
 * @ngdoc function
 * @name jtWorkApp.directive:wtLeftmenu
 * @description
 * # wtLeftmenu 左侧控制栏
 * left menu directive
 */
define(['app'], function (app) {
	'use strict';

	app.directive('wtLeftmenu', ["$rootScope", "$popbox", "$state", "$stateParams", "globalDataContext", 
				"$timeout", "shortcutKey",'config',
		function(a,b,c,d,e,f,g,config) {
		//["$rootScope", "$popbox", "$state", "$stateParams", "globalDataContext", "$timeout", "shortcutKey"]
		//      a             b         c             d                e                f           g
	    
			return {
				restrict: "E",
				replace: !0,
				scope: {},
				templateUrl: config.templateUrls.left_menu,
				link: function(f, g, h, i) {
					function j() {
						k()
					}

					function k() {
						f.$watch(function() {
								return e.star_projects
							},
							function(a) {
								l.star_projects = a
							})
					}
					var l = f.vm = {
						$stateParams: d,
						start_sorting: !1,
						projects: e.projects,
						star_projects: []
					};
					j(),
					l.goto_dashboard = function() {
						a.global.leftmenu_current_expand = "",
							c.go("dashboard.default")
					},
					l.goto_search = function() {
						a.global.leftmenu_current_expand = "",
							c.go("search", {}, {
								reload: !0
							})
					},
					l.expand_item = function(b) {
						return a.global.leftmenu_current_expand === b ? 
							void(a.global.leftmenu_current_expand = "") 
							: 
							void(a.global.leftmenu_current_expand = b)
					},
					//弹出团队显示界面
					l.js_pop_show_teams = function(c) {
						a.global.leftmenu_current_expand = "show_teams",
							l.popbox = b.popbox({
								target: c,
								templateUrl: config.templateUrls.left_menu_team,
								controller: ["$scope", "popbox", "TeamService", "$uibModal", "$window", 
										"$translate", "$interval",
									function(b, c, d, f, g, h, i) {
										function j() {
											k.teams = _.filter(_.clone(e.teams),
												function(a) {
													return "-1" !== a.team_id
												})
										}
										b.popbox = c;
										var k = b.vm = {
											teams: []
										};
										j(),
											k.js_show_add_team = function() {
												d.showAdd(),
													c.close()
											},
											k.js_pop_create_pro = function() {
												var b = f.open({
													windowClass: "dialog-w680",
													templateUrl: "/ycjs/directive/leftmenu/dialog_upgrade_pro.html",
													controller: ["$scope",
														function(c) {
															function d() {
																g.send_phone_code = !0,
																	g.new_phone_text = g.new_phone_text = h.instant("common.resend_phone_code", {
																		second: 180
																	}),
																	g.waiting_for_phone_code = !0,
																	g.timerInterval = i(function() {
																			g.new_phone_text = parseInt(g.new_phone_text.match("([0-9]{1,3})")[0], 10),
																				1 === g.new_phone_text ? e() : (g.new_phone_text--, g.new_phone_text = g.new_phone_text = h.instant("common.resend_phone_code", {
																					second: g.new_phone_text
																				}))
																		},
																		1e3)
															}

															function e() {
																g.send_phone_code = !1,
																	g.new_phone_text = h.instant("common.get_phone_code"),
																	g.waiting_for_phone_code = !1,
																	i.cancel(g.timerInterval)
															}

															function f() {
																h.use(a.global.me.locale).then(function() {
																	_.each(g.phone_prefixs,
																			function(a) {
																				a.name = h.instant(a.name)
																			}),
																		g.phone_prefix = g.phone_prefixs[0]
																})
															}
															var g = c.vm = {
																step: 0,
																type: "",
																phone_prefixs: a.global.constant.phone_prefixs,
																phone_prefix: {
																	val: ""
																},
																new_phone: "",
																phone_code: "",
																new_phone_text: h.instant("common.get_phone_code"),
																waiting_for_phone_code: !1,
																is_sending_phone: !1,
																send_phonecode_success: !1,
																upgrade_url: ""
															};
															f(),
																g.js_change_phone_prefix = function(a) {
																	g.phone_prefix = a,
																		null === a.val ? (angular.element("input[name=new_phone_prefix]").attr("readonly", !1), angular.element("input[name=new_phone_prefix]").focus()) : (angular.element("input[name=new_phone_prefix]").attr("readonly", !0), angular.element("input[name=new_phone]").focus())
																},
																g.js_close = function() {
																	b.close()
																},
																g.js_next = function() {
																	"" === a.global.me.phone ? g.step = 1 : g.step = 2
																},
																g.js_user_change_phone = function(b, c) {
																	return c === a.global.me.phone ? void b.$errors.unshift(h.instant("account.phone_same_self")) : (g.is_sending_phone = !0, void wt.data.user.reset_phone(g.phone_prefix.val, c, g.phone_code,
																		function() {
																			g.send_phonecode_success = !0,
																				a.global.me.phone_prefix = g.phone_prefix.val,
																				a.global.me.phone = c,
																				e(),
																				kzi.msg.success(h.instant("account.phone_bind_success")),
																				g.step = 2
																		},
																		function(a) {
																			2040 === a.code && (b.$errors.unshift(h.instant("err_info.phone_code_authfail")), e()),
																				a.code === kzi.statuses.user_error.phone_has_exist.code && b.$errors.unshift(h.instant("err_info.duplicate_phone"))
																		},
																		function() {
																			g.is_sending_phone = !1
																		}))
																},
																g.js_get_phone_code = function(a) {
																	wt.data.get_phone_code(g.phone_prefix.val, g.new_phone, 3,
																		function() {
																			d()
																		},
																		function(b) {
																			2041 === b.code ? (a.$errors.unshift(h.instant("err_info.duplicate_phone")), $('input[name="new_phone"]').addClass("error"), e()) : a.$errors.unshift(h.instant("err_info.get_phone_code_fail"))
																		})
																},
																g.js_change_phone = function() {
																	e()
																},
																c.$on("$destroy",
																	function() {
																		i.cancel(g.timerInterval)
																	}),
																g.js_select_type = function(a) {
																	g.upgrade_url = "",
																		g.type = a,
																		"new" === g.type && wt.data.account.upgrade_to_pro(function(a) {
																			g.upgrade_url = "//pro.worktile.com/setup?token=" + a.data + "&from=upgrade"
																		}),
																		"old" === g.type && (g.upgrade_url = "//pro.worktile.com/signin?from=upgrade")
																}
														}
													]
												});
												c.close()
											},
											k.js_close = function() {
												c.close()
											}
									}
								],
								onCloseComplete: function() {
									l.popbox = null,
										a.global.leftmenu_current_expand = ""
								}
							}),
							l.popbox.open()
					},
					l.js_pop_shortcut_create = function(c) {
						a.global.leftmenu_current_expand = "shortcut_create",
							l.popbox = b.popbox({
								target: c,
								templateUrl: config.templateUrls.left_menu_shortcut_create,
								controller: ["$scope", "popbox", "TeamService", "ProjectService", "taskService", "eventService", "fileService",
									function(a, b, c, d, e, f, g) {
										a.popbox = b;
										var h = a.vm = {};
										h.js_close = function() {
												b.close()
											},
											h.add_team = function() {
												c.showAdd(),
													b.close()
											},
											h.add_project = function() {
												d.showAdd(),
													b.close()
											},
											h.add_task = function() {
												e.showAdd(!0),
													b.close()
											},
											h.add_file = function() {
												g.showAdd(),
													b.close()
											},
											h.add_event = function() {
												f.showAdd(!0),
													b.close()
											}
									}
								],
								onCloseComplete: function() {
									l.popbox = null,
										a.global.leftmenu_current_expand = ""
								}
							}),
							l.popbox.open()
					},
					/**
					*弹出个人信息
					*/
					l.js_pop_avatar_self = function(c) {
						a.global.leftmenu_current_expand = "avatar_self",
							l.popbox = b.popbox({
								target: c,
								templateUrl: config.templateUrls.left_menu_avatar_setting,
								controller: ["$scope", "popbox", "feedbackService", "$uibModal",
									function(a, b, c, d) {
										a.popbox = b;
										var e = a.vm = {};
										e.js_show_feedback = function() {
												c.show(),
													b.close()
											},
											e.js_pop_mobild_download = function() {
												var a = d.open({
													windowClass: "dialog-w530",
													templateUrl: "/ycjs/directive/leftmenu/dialog_mobile_download.html",
													controller: ["$scope",
														function(b) {
															var c = b.vm = {};
															c.js_close = function() {
																a.close()
															}
														}
													]
												});
												b.close()
											},
											e.js_pop_watch_wechat = function() {
												var a = d.open({
													windowClass: "dialog-w530",
													templateUrl: "/ycjs/directive/leftmenu/dialog_watch_wechat.html",
													controller: ["$scope",
														function(b) {
															var c = b.vm = {};
															c.js_close = function() {
																a.close()
															}
														}
													]
												});
												b.close()
											},
											e.js_pop_solutions = function() {
												var a = d.open({
													windowClass: "dialog-w530",
													templateUrl: "/ycjs/directive/leftmenu/dialog_solutions.html",
													controller: ["$scope",
														function(b) {
															var c = b.vm = {};
															c.js_close = function() {
																a.close()
															}
														}
													]
												});
												b.close()
											},
											e.js_close = function() {
												b.close()
											}
									}
								],
								onCloseComplete: function() {
									l.popbox = null,
										a.global.leftmenu_current_expand = ""
								}
							}),
							l.popbox.open()
					},
					l.js_leftmenu_collapsed = function(b) {
						a.global.leftmenu_current_expand = ""
					},
					l.js_to_project = function(b) {
						a.global.leftmenu_current_expand = "",
							c.go("project", {
								pid: b.pid
							}, {
								reload: !0
							})
					},
					f.js_pop_showhelp = function(a) {
						b.popbox({
							target: a,
							templateUrl: "/tpl/dashboard/pop_dashboard_mailhelp.html",
							controller: ["$scope", "popbox", "pop_data",
								function(a, b, c) {
									a.popbox = b;
									a.pm = {};
									a.js_close = function() {
										b.close()
									}
								}
							],
							resolve: {
								pop_data: function() {
									return {
										$scope: f
									};
								}
							}
						}).open()
					},
					a.$on("$stateChangeStart",
						function(b, c, d, e, f) {
							a.global.leftmenu_current_expand = ""
						}),
					f.$on(config.constant.event_names.shortcut_key_left_menu,
						function(b, d) {
							var e = a.global.leftmenu_current_expand,
								f = "";
							switch(d.keyCode) {
								case config.constant.keyASCIIs.T:
									f = "show_teams",
										l.popbox && l.popbox.close(),
										e !== f && $("#btn_leftmenu_show_teams").click();
									break;
								case config.constant.keyASCIIs.G:
									c.go("dashboard.default");
									break;
								case config.constant.keyASCIIs.S:
									c.go("search");
									break;
								case config.constant.keyASCIIs.N:
									f = "notice";
									break;
								case config.constant.keyASCIIs.P:
									f = "project";
									break;
								case config.constant.keyASCIIs.F:
									f = "shortcut_create",
										l.popbox && l.popbox.close(),
										e !== f && $("#btn_leftmenu_shortcut_create").click();
									break;
								case config.constant.keyASCIIs.U:
									f = "avatar_self",
										l.popbox && l.popbox.close(),
										e !== f && $("#btn_leftmenu_avatar_self").click()
							}
							_.indexOf(["show_teams", "shortcut_create", "avatar_self"], f) === -1 && 
								(a.global.leftmenu_current_expand === f ? 
									a.global.leftmenu_current_expand = "" 
									: 
									a.global.leftmenu_current_expand = f)
						})
				}
			}
		
		    
	    
  	}]);
});