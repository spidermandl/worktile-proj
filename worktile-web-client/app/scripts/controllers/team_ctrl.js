/**
 * @ngdoc function
 * @name jtWorkApp.controller:team相关
 * @description
 * # team related controllers
 * Controller of the jtWorkApp
 */
define(['app'], function (app) {
	'use strict';
	/**************************************************************************************************************
	 *
	 **************************************************************************************************************/
	app.controller('TeamCtrl', ["$rootScope", "$scope", "$state", "$stateParams", "team_basic_info", 
				"teamCalendarFilterData", "$popbox", "$translate",'config',
		function (a, b, c, d, e, f, g, h,config) {

			function i() {
				e && e.permission != config.constant.team_permission.guest ? (b.team = e, a.global.loading_done = !0, j.user_is_team_owner = b.team.permission == config.constant.team_permission.owner, j.user_is_team_admin = b.team.permission == config.constant.team_permission.owner || b.team.permission == config.constant.team_permission.admin, b.$on(config.constant.event_names.team_member_role_change,
					function(a, d) {
						b.team && b.team.team_id === d.team_id && (b.team.permission = d.team_permission, config.constant.team_module.view_base & d.team_permission || c.go("dashboard.default"))
					})) : wt.data.team.get_full(j.team_id,
					function(b) {
						j.public_team = b.data,
							a.global.title = [h.instant("team.title_name_public_team"), " | ", j.public_team.info.name].join(""),
							a.global.loading_done = !0
					},
					function(a) {
						c.go("not_found", {
							type: "team"
						})
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
					}).open()
				},
				j.js_toggle_team_filter = function() {
					f.team_calendar_filter_status = !f.team_calendar_filter_status
				}
		
		

	}])
	/**************************************************************************************************************
	 *
	 **************************************************************************************************************/
	.controller('TeamProjectsCtrl', 
		['$scope','$rootScope','config','$translate','globalDataContext','api','ProjectService',
		function ($scope,$rootScope,config,$translate,globalDataContext,api,projectService) {
			//["$rootScope", "$scope", "$state", "projectService", "globalDataContext", "$translate"]
			//       a           b          c            d                   e                f
			function g() {
				return $scope.team ? 
					($rootScope.global.title = 
						[$translate.instant("team_projects.title_name"), 
						" | ", 
						$scope.team.name].join(""), 
						_.each(globalDataContext.projects,
							function(a) {
								$scope.vm.me_pids.push(a.pid);
							}), 
						$rootScope.global.loading_done = !0, 
						$scope.vm.part_loading_done = !1, 
						api.get_team_projects($scope.team.team_id,
							function(a) {
								$scope.team.projects = a.data
								i();
							},
							null,
							function() {
								$scope.vm.part_loading_done = !0;
							})) 
					: c.go("dashboard.default")
			}
			$scope.vm = {
				part_loading_done: !1,
				me_pids: [],
				filter_type: "me",
				projects: {
					participateds: [],
					teampublics: []
				}
			};
			$scope.parent_vm = $scope.$parent.vm;
			if(null != $scope.team) {
				g();
				var i = function() {
					$scope.vm.projects.participateds = 
						_.filter($scope.team.projects,
							function(a) {
								return _.includes($scope.vm.me_pids, a.pid);
							});
					$scope.vm.projects.teampublics = 
						_.filter($scope.team.projects,
							function(a) {
								return !_.includes($scope.vm.me_pids, a.pid) && 
									(a.visibility === config.constant.prj_visibility.protected || 
										a.visibility === config.constant.prj_visibility.public)
							}),
					$scope.vm.projects.participateds = 
						_.sortBy($scope.vm.projects.participateds,
							function(a) {
								return a.pos;
							}),
					$scope.vm.projects.teampublics = 
						_.sortBy($scope.vm.projects.teampublics,
							function(a) {
								return a.pos;
							})
				};
				$scope.vm.js_reset_filter_type = function(a) {
						$scope.vm.filter_type = a;
					};
				$scope.vm.js_new_project = function(a) {
					projectService.showAdd($scope.team ? $scope.team.team_id : "");
				};
			}
		
	}])
	/**************************************************************************************************************
	 *
	 **************************************************************************************************************/
	.controller('TeamMembersCtrl', ["$rootScope", "$scope", "$state", "Util", "TeamService", 
				"$translate",'config','api',
		function (a, b, c, d, e, f, config,api) {
			
			function g() {
				api.get_team_members_with_stats(i,
					function(a) {
						b.team.members = a.data.members,
							j()
					},
					null,
					function() {
						h.part_loading_done = !0
					})
			}
			if(!b.team) return c.go("dashboard.default");
			a.global.title = [f.instant("team_members.title_name"), " | ", b.team.name].join(""),
				a.global.loading_done = !0;
			var h = b.vm = {
					part_loading_done: !1,
					filter_type: "normals",
					members: {}
				},
				i = (b.parent_vm = b.$parent.vm, b.team.team_id),
				j = function() {
					h.members.normals = _.filter(b.team.members,
							function(a) {
								return a.role > 0 && a.role <= config.constant.role.member && a.status == config.constant.user_status.ok
							}),
						h.members.inviteds = _.filter(b.team.members,
							function(a) {
								return a.status == config.constant.user_status.pending
							}),
						h.members.guests = _.filter(b.team.members,
							function(a) {
								return a.role == config.constant.role.guest
							})
				};
			g();
			var k = function(a) {
				if(a.role != config.constant.role.deleted) {
					var c = _.find(b.team.members, {
						uid: a.uid
					});
					c.role = a.role
				} else {
					var d = _.findIndex(b.team.members, {
						uid: a.uid
					});
					d >= 0 && b.team.members.splice(d, 1)
				}
				j()
			};
			d.addListener(config.constant.event_names.team_member_role_change, k, b),
				b.$on(config.constant.event_names.member_state_change,
					function(c, d) {
						if(d.uid !== a.global.me.uid) {
							var e = _.find(b.team.members, {
								uid: d.uid
							});
							e && (e.online = d.state),
								j()
						}
					}),
				h.js_goto_team_admin = function() {
					return b.team.is_dingteam ? void config.msg.info("该团队为钉钉创建，请从钉钉中邀请新团队成员。") : void c.go("team.admin.members", {
						team_id: b.team.team_id
					})
				},
				h.js_add_team_member = function() {
					return b.team.is_dingteam ? void config.msg.info("该团队为钉钉创建，请从钉钉中邀请新团队成员。") : void e.showAddMember(b.team,
						function() {
							c.reload(!0)
						})
				},
				h.js_reset_filter_type = function(a) {
					h.filter_type = a
				}
		
		
	}])
	/**************************************************************************************************************
	 *
	 **************************************************************************************************************/
	.controller('TeamTasksCtrl', ["$rootScope", "$scope", "$state", "$popbox", "globalDataContext", 
			"locator", "$translate",'config','api',
		function (a, b, c, d, e, f, g, config,api) {
			
			if(!b.team) return c.go("dashboard.default");
			a.global.title = [g.instant("team_tasks.title_name"), " | ", b.team.name].join(""),
				a.global.loading_done = !0,
				b.loading_tasks = !1;
			var h = b.team.team_id;
			b.part_loading_done = !1;
			var i = b.vm = {
					filter_type_reg: "uncompleted",
					filter_project_reg: "all",
					filter_user_reg: "all",
					is_has_more_task: !0
				},
				j = 1;
			b.locator = f,
				b.tasks = [];
			var k = b.load_tasks = function() {
				b.loading_tasks = !0,
					api.get_tasks(
						{
							0:h, 
							1:i.filter_user_reg, 
							2:i.filter_project_reg, 
							3:i.filter_type_reg, 
							4:j,
						},
						function(a) {
							_.each(a.data,
									function(a) {
										var c = _.find(e.projects, {
											pid: a.pid
										});
										c && (a.project = c),
											b.tasks.push(a)
									}),
								a.data.length > 0 ? (j += 1, i.is_has_more_task = !0) : i.is_has_more_task = !1
						},
						function() {
							config.msg.error(g.instant("team_tasks.get_tasks_fail"))
						},
						function() {
							b.loading_tasks = !1
						})
			};
			api.get_team_members(
					h,
					function(a) {
						b.team.members = _.filter(a.data.members,
							function(a) {
								return a.role != config.constant.role.guest && a.status == config.constant.user_status.ok
							})
					},
					null,
					function() {
						b.part_loading_done = !0
					}),
				k(),
				b.js_reset_filter_type = function(a) {
					i.filter_type_reg !== a && (i.filter_type_reg = a, j = 1, b.tasks = [], k())
				},
				b.js_toggle_filter_user = function(a) {
					i.filter_user_reg === a ? i.filter_user_reg = "all" : i.filter_user_reg = a,
						j = 1,
						b.tasks = [],
						k()
				}
		
		
	}])
	/**************************************************************************************************************
	 *
	 **************************************************************************************************************/
	.controller('TeamGraphsCtrl', ['$scope','$rootScope','config',
		function ($scope,$rootScope,config) {
	 	//["$rootScope", "$scope", "$state", "projectService", "globalDataContext", "$popbox", "$translate"]
	 	//       a           b         c             d                   e               f            g
			var h = b.vm = {
				part_loading_done: !1,
				overview: {
					completed: null,
					uncompleted: null,
					expired: null,
					today_pending: null,
					total: null
				},
				stats_list: []
			};
			if(b.team) {
				a.global.title = [g.instant("team_graphs.title_name"), " | ", b.team.name].join(""),
					h.part_loading_done = !1;
				var i = function(a) {
						var b = [];
						return _.each(a,
								function(a) {
									_.each(a.stats,
										function(c) {
											c.pid = a.pid,
												c.name = a.name,
												c.bg = a.bg,
												c.pic = a.pic,
												b.push(c)
										})
								}),
							b
					},
					j = function(a, b, c, d) {
						if(c || d) {
							var e = wt.bus.team.calculate_stats_pos(c, d),
								f = _.find(h.stats_list, {
									pid: a,
									type: b
								});
							f.pos = e,
								wt.data.team.update_team_stats_pos(a, b, e,
									function(a) {
										200 === a.code && (h.stats_list = _.sortBy(h.stats_list,
											function(a) {
												return a.pos
											}))
									})
						}
					};
				wt.data.team.get_team_stats(b.team.team_id,
						function(a) {
							200 === a.code && a.data.length > 0 && (h.stats_list = i(a.data), h.stats_list = _.sortBy(h.stats_list, "pos"))
						},
						null,
						function() {
							wt.data.team.get_tasks_overview(b.team.team_id,
									function(a) {
										200 === a.code && (h.overview = a.data)
									}),
								a.global.loading_done = !0,
								h.part_loading_done = !0
						}),
					h.js_pop_add_stats = function(a) {
						f.popbox({
							target: a,
							templateUrl: "/tpl/team/pop_add_team_stats.html",
							controller: ["$scope", "popbox", "pop_data", "globalDataContext", "$rootScope",
								function(a, b, c, d, e) {
									function f() {
										_.each(h.stats_type,
											function(a) {
												a.disable = !1
											})
									}
									a.popbox = b;
									var h = a.vm = {
										projects: _.find(d.teams, {
											team_id: c.team_id
										}).projects,
										project_not_select: !1,
										project_select: void 0,
										stats_type_select: [],
										stats_type: config.constant.stats_type_list,
										pop_add_loading: !1
									};
									_.each(h.stats_type,
											function(a) {
												a.desc = g.instant(a.desc)
											}),
										f(),
										h.js_close = function() {
											b.close()
										},
										h.js_select_click = function() {
											h.project_not_select = !1
										},
										h.js_select_project = function() {
											var a = _.map(_.filter(c.stats_list, {
												pid: h.project_select
											}), "type");
											_.each(h.stats_type,
												function(b) {
													_.indexOf(a, b.value) >= 0 ? (b.disable = !0, h.stats_type_select = _.reject(h.stats_type_select,
														function(a) {
															return a === b.value
														})) : b.disable = !1
												})
										},
										h.js_select_stats = function(a, b) {
											$(a.target).parents("li").hasClass("disable") || (_.indexOf(h.stats_type_select, b) < 0 ? h.stats_type_select.push(b) : h.stats_type_select = _.reject(h.stats_type_select,
												function(a) {
													return a === b
												}))
										},
										h.js_add_stats = function() {
											return h.project_select ? _.filter(h.stats_type, {
												disable: !0
											}).length === config.constant.stats_type_list.length ? void config.msg.warn(g.instant("team_graphs.stats_overall_exist")) : void 0 === h.stats_type_select ? void config.msg.warn(g.instant("team_graphs.choose_stats_type")) : (h.pop_add_loading = !0, void wt.data.team.add_team_stats(h.project_select, h.stats_type_select,
												function(a) {
													200 === a.code && (config.msg.success(g.instant("team_graphs.add_stats_success")), e.$broadcast(config.constant.event_names.team_add_stats, a.data), h.js_close())
												},
												null,
												function() {
													h.pop_add_loading = !1
												})) : (h.project_not_select = !0, void config.msg.warn(g.instant("team_graphs.choose_stats_project")))
										}
								}
							],
							resolve: {
								pop_data: function() {
									return {
										team_id: b.team.team_id,
										stats_list: b.vm.stats_list
									}
								}
							}
						}).open()
					},
					h.stats_sort_options = {
						containment: ".team-dashboard",
						placeholder: "portlet-placeholder",
						helper: "clone",
						revert: 10,
						dropOnEmpty: !0,
						tolerance: "pointer",
						distance: "4",
						delay: "75",
						accept: ".portlet-item",
						cancel: ".ui-sortable-cancel",
						start: function(a, b) {
							b.helper.addClass("portlet-picked-up"),
								$(".portlet-placeholder").css({
									height: b.item.css("height")
								})
						},
						stop: function(a, b) {
							var c = b.item.scope().stats,
								d = void 0;
							b.item.prev().scope() && b.item.prev().scope().stats && (d = b.item.prev().scope().stats.pos);
							var e = void 0;
							b.item.next().scope() && b.item.next().scope().stats && (e = b.item.next().scope().stats.pos),
								j(c.pid, c.type, d, e)
						}
					},
					b.$on(config.constant.event_names.team_add_stats,
						function(a, b) {
							h.stats_list = h.stats_list.concat(i([b])),
								h.stats_list = _.sortBy(h.stats_list, "pos")
						}),
					b.$on(config.constant.event_names.team_remove_stats,
						function(a, b) {
							h.stats_list = _.reject(h.stats_list, {
								pid: b.pid,
								type: b.type
							})
						})
			}
		
	}])
	 /**************************************************************************************************************
	 *
	 **************************************************************************************************************/
 	.controller('TeamCalendarCtrl', ['$scope','$rootScope','config',
		function ($scope,$rootScope,config) {
			//"$rootScope", "$scope", "$popbox", "uiCalendarConfig", "globalDataContext", "locator", "teamCalendarFilterData", "$translate"
			//     a            b          c             d                     e              f                g                     h
			function i() {
				var a = g.myCalendar.fullCalendar("getView");
				$("#calendar_title").html(a.title);
				var b = new Date(a.start).getTime(),
					c = new Date(a.end).getTime(),
					d = (new Date).getTime();
				d < b || d > c ? $("#calendar_today").css("visibility", "visible") : $("#calendar_today").css("visibility", "hidden")
			}

			function j() {
				0 != $("#calendar").find(".fc-agendaWeek-view").size() && ($("#calendar").find(".fc-agendaWeek-view tbody td:eq(0)").css({
					height: config.util.winHeight() - l.header_height - 40,
					overflow: "auto",
					display: "block"
				}), $("#calendar").find(".fc-agendaWeek-view tbody td:eq(0)").find(".fc-time-grid-container").css({
					height: "",
					overflow: "auto"
				}))
			}

			function k() {}
			var l = b.vm = {
				header_height: 120,
				calendar_view: "month",
				show_my_task: !0,
				team_id: b.team.team_id,
				cache_calendar: null
			};
			a.global.title = [h.instant("team_calendars.title_name"), " | ", b.team.name].join("");
			var m, n, o = null,
				p = null;
			k();
			var q = function(a, c, d, e, f) {
				if(_.isEmpty(o) || m !== a || n !== c) {
					var g = _.map(b.projects, "pid");
					wt.data.calendar.get_list(g, 1, a, c,
						function(a) {
							o = a.data,
								_.isFunction(d) && d(o)
						},
						e, f)
				} else _.isFunction(d) && d(o),
					_.isFunction(f) && f()
			};
			b.js_new_event_success = function(c) {
					c.forEach(function(c) {
						if(c.end.date >= m && c.start.date <= n) {
							var d = _.find(b.projects, {
								pid: c.pid
							});
							if(d) {
								var e = wt.bus.event.event_to_calEvent(c, d.bg);
								c.attendees && c.attendees.indexOf(a.global.me.uid) >= 0 ? e.extend.i_attended = 1 : e.extend.i_attended = 0,
									d.is_calendar || (d.is_calendar = 1, _.defaults(d, {
										is_checked: !0
									}), b.calendar_projects.push(d), b.calendar_projects = _.sortBy(b.calendar_projects,
										function(a) {
											return a.pos
										})),
									o && (o.push(e), g.removeEvents(), g.refetchEvents())
							} else o = null,
								g.removeEvents(),
								g.refetchEvents()
						}
					})
				},
				b.onEventClick = function(a, b, c) {
					b.preventDefault(),
						b.stopPropagation(),
						a.extend && a.extend.xtype === config.constant.xtype.event ? f.openEvent(a.extend.pid, a.id) : f.openTask(a.extend.pid, a.id)
				},
				b.onDayClick = function(d, e, f) {
					if(a.global.loading_done) {
						var g = config.helper.mouse_position(e);
						$(e.currentTarget).attr("data-placement", "right"),
							$(e.currentTarget).attr("data-align", "top"),
							$(e.currentTarget).addClass("js-popbox"),
							$(e.currentTarget).attr("data-auto-adapt", "true"),
							c.popbox({
								target: e,
								templateUrl: config.templateUrls.event_pop_add,
								controller: "newEventCtrl",
								top: g.y,
								left: g.x,
								resolve: {
									pop_data: function() {
										return {
											save_success: function(a) {
												b.js_new_event_success(a)
											},
											start_date: d,
											is_team_calendar: !0,
											team_id: l.team_id
										}
									}
								}
							}).open()
					}
				},
				l.calendarEventSources = [{
					events: function(a, b, c, d) {
						function f(a) {
							var b, c = a.data.events,
								d = a.data.tasks;
							switch(c = _.filter(c,
								function(a) {
									return a.extend.recurrence_id && (a.editable = !1),
										a.start.length < 25 && (a.start = moment.unix(a.start).format(), a.end = moment.unix(a.end).format()),
										0 == g.team_calendar_filter_member_uids.length || 0 != _.intersection(a.attendees, g.team_calendar_filter_member_uids).length
								}), d = _.filter(d,
								function(a) {
									var b = _.find(e.projects, {
										pid: a.extend.pid
									});
									return b && (a.borderColor = b.bg),
										1 === a.extend.completed ? a.className = "cal_task cal_task_completed slide-trigger" : a.className = "cal_task cal_task_uncompleted slide-trigger",
										a.start.length < 25 && (a.start = moment.unix(a.start).startOf("day").format()),
										"agendaWeek" === g.myCalendar.fullCalendar("getView").name && (a.editable = !1, "23:59" !== moment(a.extend.expire_date).format("HH:mm") ? (a.allDay = !1, a.start = moment(a.extend.expire_date).format(), a.end = moment(a.extend.expire_date).add(40, "minutes").format()) : a.allDay = !0),
										0 == g.team_calendar_filter_member_uids.length || 0 != _.intersection(a.members, g.team_calendar_filter_member_uids).length
								}), g.team_calendar_filter_type) {
								case 0:
									b = l.cache_calendar = c.concat(d);
									break;
								case 1:
									b = l.cache_calendar = c;
									break;
								case 2:
									b = l.cache_calendar = d
							}
							return b
						}
						var h = moment(a.format()).unix() + "000",
							i = moment(b.format()).unix() + "000";
						null == l.cache_calendar ? 
							wt.data.calendar.get_teams_events_and_tasks(l.team_id, 0, g.team_calendar_filter_pids, h, i,
							function(a) {
								f(a),
									d(l.cache_calendar),
									m = h,
									n = i
							},
							null, null) : (d(l.cache_calendar), wt.data.calendar.get_teams_events_and_tasks(l.team_id, 0, g.team_calendar_filter_pids, h, i,
							function(a) {
								f(a),
									g.removeEvents(),
									g.myCalendar.fullCalendar("addEventSource", l.cache_calendar),
									m = h,
									n = i
							},
							null, null))
					}
				}],
				l.calendarConfig = {
					header: !1,
					height: config.util.winHeight() - l.header_height,
					editable: !0,
					droppable: !0,
					nextDayThreshold: "00:00:00",
					firstDay: 0,
					weekMode: "liquid",
					axisFormat: "HH:mm",
					timeFormat: "✓",
					defaultView: l.calendar_view,
					dayClick: b.onDayClick,
					loading: function(b) {
						g.myCalendar = d.calendars.myCalendar,
							i(),
							b ? a.global.loading_done = !1 : a.global.loading_done = !0,
							j()
					},
					eventClick: function(a, c, d) {
						b.onEventClick(a, c, d)
					},
					eventDrop: function(a, b, c, d, f, g) {
						if(0 !== b) {
							var h = a.extend.pid;
							if(a.extend.xtype === config.constant.xtype.task) {
								var i = a.id,
									j = a.extend.expire_date,
									k = moment(j).add(b, "days").endOf("day").valueOf();
								wt.data.task.set_expire(h, i, k,
									function() {
										a.extend.expire_date = k,
											a.extend.badges.expire_date = k,
											e.cache.task.set_expire(i, k)
									})
							} else if(a.extend.xtype === config.constant.xtype.event) {
								var l = moment(a.start),
									m = moment(a.end || a.start);
								e.cache.event.update_date(h, a.id, l.format("YYYY-MM-DD"), l.format("HH:mm"), m.format("YYYY-MM-DD"), m.format("HH:mm"),
									function() {
										a.extend.end = m.valueOf()
									})
							}
						}
					},
					eventResize: function(a, b, c) {
						if("month" === l.calendar_view) {
							var d = moment(a.start._i).format("HH"),
								f = moment(a.start._i).format("mm");
							a.extend.end = a.end.valueOf();
							var g = moment(a.end._i).format("HH"),
								h = moment(a.end._i).format("mm");
							e.cache.event.update_date(a.extend.pid, a.id, a.start.format("YYYY-MM-DD"), d + ":" + f, a.end.format("YYYY-MM-DD"), g + ":" + h,
								function() {
									angular.noop()
								})
						}
						if("agendaWeek" === l.calendar_view) {
							var d = a.start.format("HH"),
								f = a.start.format("mm");
							a.extend.end = a.end.valueOf();
							var g = a.end.format("HH"),
								h = a.end.format("mm");
							e.cache.event.update_date(a.extend.pid, a.id, a.start.format("YYYY-MM-DD"), d + ":" + f, a.end.format("YYYY-MM-DD"), g + ":" + h,
								function() {
									angular.noop()
								})
						}
					},
					windowResize: function() {
						$(this).fullCalendar("option", "height", config.util.winHeight() - l.header_height),
							j()
					},
					eventRender: function(a, b) {
						b.attr("title", b.find(".fc-title").text())
					},
					views: {
						agendaWeek: {
							axisFormat: "Ah"
						}
					}
				},
				b.changeView = function(a) {
					g.myCalendar.fullCalendar("changeView", a),
						l.calendar_view = a,
						config.localData.set("calendar_view", a),
						i(),
						g.removeEvents(),
						g.refetchEvents()
				},
				b.prev = function() {
					g.myCalendar.fullCalendar("prev"),
						i()
				},
				b.next = function() {
					g.myCalendar.fullCalendar("next"),
						i()
				},
				b.today = function() {
					g.myCalendar.fullCalendar("today"),
						i()
				},
				b.$on(config.constant.event_names.on_task_update,
					function(a, b) {
						var c = _.find(p, {
							id: b.tid
						});
						c && (c.title = b.name, c.start = b.expire_date.toString().substring(0, 10)),
							g.removeEvents(),
							g.refetchEvents()
					}),
				b.$on(config.constant.event_names.on_task_trash,
					function(a, b) {
						var c = _.find(p, {
							id: b.tid
						});
						c && (p = _.reject(p,
								function(a) {
									return a.id === b.tid
								})),
							g.removeEvents(),
							g.refetchEvents()
					}),
				b.$on(config.constant.event_names.on_task_complete,
					function(a, b) {
						var c = _.find(p, {
							id: b.tid
						});
						c && (b.completed ? (c.className = "cal_task cal_task_completed slide-trigger", c.extend.completed = 1) : (c.className = "cal_task cal_task_uncompleted slide-trigger", c.extend.completed = 0)),
							g.removeEvents(),
							g.refetchEvents()
					}),
				b.$on(config.constant.event_names.on_event_update,
					function(b, c, d, e) {
						if(o) {
							var f = _.find(o, {
								id: c.event_id
							});
							if(d === config.constant.event_update_type.one && f && (f.title = c.name, f.start = moment(c.start.date).valueOf().toString().substring(0, 10), f.end = moment(c.end.date).valueOf().toString().substring(0, 10), _.find(c.attendees, {
									uid: a.global.me.uid
								}) ? f.extend.i_attended = 1 : f.extend.i_attended = 0, g.removeEvents(), g.refetchEvents()), d === config.constant.event_update_type.follow_up) {
								var h = new Date(c.start.date) - new Date(f.start),
									i = new Date(c.end.date) - new Date(c.start.date),
									j = new Date(f.start);
								h > 0 ? (o.forEach(function(a) {
									var b = new Date(a.start);
									a.extend.recurrence_id === c.recurrence_id && b >= j && (a.start = moment(a.start).add(h, "milliseconds"), a.end = moment(a.start).add(i, "milliseconds"), a.start = a.start.valueOf().toString().substring(0, 10), a.end = a.end.valueOf().toString().substring(0, 10), e && (a.extend.recurrence_id = e))
								}), g.removeEvents(), g.refetchEvents()) : (o = [], q(m, n,
									function() {
										g.removeEvents(),
											g.refetchEvents()
									},
									null,
									function() {}))
							}
						}
					}),
				b.$on(config.constant.event_names.on_event_trash,
					function(a, c, d) {
						if(o) {
							var e = parseInt(d);
							switch(e) {
								case config.constant.event_trash_type.one:
									o = _.reject(o,
										function(a) {
											return a.id === c.event_id
										});
									break;
								case config.constant.event_trash_type.follow_up:
									o = _.reject(o,
										function(a) {
											var b = new Date(a.start).getTime();
											return b >= c.start.date && a.extend.recurrence_id === c.recurrence_id
										});
									break;
								case config.constant.event_trash_type.all:
									o = _.reject(o,
										function(a) {
											return a.extend.recurrence_id === c.recurrence_id
										})
							}
						}
						b.calendar_projects = _.filter(b.projects,
								function(a) {
									return 1 === a.is_calendar
								}),
							g.removeEvents(),
							g.refetchEvents()
					})
		
	 	
	}])
	/**************************************************************************************************************
	 *
	 **************************************************************************************************************/
 	.controller('TeamCalendarSidebarCtrl', ['$scope','$rootScope','config',
		function ($scope,$rootScope,config) {
			//"$rootScope", "$scope", "teamCalendarFilterData
			//      a            b                 c
			function d() {
				wt.data.team.get_team_projects(b.team.team_id,
						function(a) {
							c.team_all_projects = a.data,
								_.each(c.team_all_projects,
									function(a) {
										a.is_checked = !0
									})
						}),
					wt.data.team.get_team_members(b.team.team_id,
						function(b) {
							c.team_all_member = _.filter(b.data.members,
								function(b) {
									return b.role == config.constant.role.admin && b.uid == a.global.me.uid && (e.user_is_team_admin = !0),
										(b.role == config.constant.role.admin || b.role == config.constant.role.member) && b.status == config.constant.user_status.ok
								})
						})
			}
			var e = b.vm = {
				teamCalendarFilterData: c,
				is_filter_action: !1
			};
			d(),
				e.js_close_filter = function() {
					c.team_calendar_filter_status = !1
				},
				e.js_clear_filter = function() {
					c.clear_filter()
				},
				e.js_filter_type = function(a) {
					switch(a) {
						case "task":
							c.filter_only_task = !0,
								c.filter_only_schedule = !1,
								c.team_calendar_filter_type = 2;
							break;
						case "schedule":
							c.filter_only_schedule = !0,
								c.filter_only_task = !1,
								c.team_calendar_filter_type = 1;
							break;
						default:
							c.filter_only_schedule = !1,
								c.filter_only_task = !1,
								c.team_calendar_filter_type = 0
					}
					c.removeEvents(),
						c.refetchEvents()
				},
				e.js_calendar_filter_project_toggle = function(a) {
					a.is_checked === !0 ? a.is_checked = !1 : a.is_checked = !0,
						c.team_calendar_filter_pids = _.map(_.filter(c.team_all_projects, {
							is_checked: !0
						}), "pid").toString() || "",
						c.removeEvents(),
						c.refetchEvents()
				},
				e.js_calendar_filter_member_toggle = function(a) {
					void 0 == a.is_checked ? a.is_checked = !1 : null,
						0 == a.is_checked ? a.is_checked = !0 : a.is_checked = !1,
						c.team_calendar_filter_member_uids = _.map(_.filter(c.team_all_member, {
							is_checked: !0
						}), "uid"),
						c.removeEvents(),
						c.refetchEvents()
				},
				b.$on("$destroy",
					function() {
						e.js_close_filter()
					})
		
	 	
	}])
	 /**************************************************************************************************************
	 *
	 **************************************************************************************************************/
 	.controller('teamQuitCtrl', ['$scope','$rootScope','config',
		function ($scope,$rootScope,config) {
	 	
	}])
	 /**************************************************************************************************************
	 *
	 **************************************************************************************************************/



	;
});