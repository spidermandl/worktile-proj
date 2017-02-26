/**
 * @ngdoc function
 * @name jtWorkApp.controller:dashboard相关
 * @description
 * # Dashboard related controller
 * Controller of the jtWorkApp
 */
define(['app'], function(app) {
	'use strict';

	app.controller('DashboardTaskCtrl', ['$scope', '$rootScope', 'config', 'ycTrack', '$translate', 'api', 'Util',
			function($scope, $rootScope, config, ycTrack, translate, api, util) {

				$rootScope.global.loading_done = true; //需要重构
				//["$rootScope", "$scope", "$location", "locator", "globalDataContext", "$timeout", "bus", "$translate", "taskService", "ycTrack"]
				//       a,          b,         c,          d,             e,                f,       g,        h,              i,           j
				function k() {
					$scope.vm.part_loading_done = !1;
					api.get_dashboard_task(
						function(a) {
							q(a.data);
						},
						null,
						function() {
							$scope.vm.loaded = !0;
							$scope.vm.part_loading_done = !0;
							$scope.vm.isBoarded = !0;
						});
				}

				function l() {
					_.isEmpty($scope.vm.uncompleted_tasks) && ($scope.vm.part_loading_done = !1,
						wt.data.task.get_for_uncompleted(function(a) {
								r(a.data)
							},
							null,
							function() {
								$scope.vm.loaded = !0;
								$scope.vm.part_loading_done = !0;
								$scope.vm.isListed = !0;
							}))
				}

				function m() {
					$scope.vm.part_loading_done = !1;
					wt.data.task.get_for_completed($scope.vm.page,
						function(a) {
							$scope.vm.page++;
							_.isEmpty(a.data) || (_.isEmpty($scope.vm.completed_tasks) ?
									$scope.vm.completed_tasks = a.data :
									$scope.vm.completed_tasks = $scope.vm.completed_tasks.concat(a.data)),
								a.data.length < kzi.config.default_count && ($scope.vm.has_more_completed_tasks = !1)
						},
						null,
						function() {
							$scope.vm.loaded = !0;
							$scope.vm.part_loading_done = !0
							$scope.vm.isListed = !0;
						});
				}

				function n(a) {
					var b = null;
					switch ($scope.vm.mytaskViewStatus) {
						case "all_tasks":
							b = 0;
							break;
						case "my_watcher":
							b = 2;
							break;
						case "my_create":
							b = 1;
							break;
						case "update":
							b = 4
					}
					null !== b && (a && ($scope.vm.part_loading_done = !1),
						wt.data.task.get_all_list(b,
							$scope.vm.page,
							function(a) {
								$scope.vm.page++;
								_.isEmpty(a.data) || (_.isEmpty($scope.vm.tasks) ?
										$scope.vm.tasks = a.data : $scope.vm.tasks = $scope.vm.tasks.concat(a.data)),
									a.data.length < kzi.config.default_count && ($scope.vm.has_more_tasks = !1)
							},
							null,
							function() {
								$scope.vm.loaded = !0;
								$scope.vm.part_loading_done = !0;
								$scope.vm.isListed = !0;
							}))
				}

				function o() {
					"gtd" === $scope.vm.mytaskViewStatus && k(),
						"time" === $scope.vm.mytaskViewStatus && l(),
						"completed" === $scope.vm.mytaskViewStatus &&
						($scope.vm.page = 1, $scope.vm.has_more_completed_tasks = !0, $scope.vm.completed_tasks = [], m()),
						"update" !== $scope.vm.mytaskViewStatus &&
						"my_watcher" !== $scope.vm.mytaskViewStatus &&
						"my_create" !== $scope.vm.mytaskViewStatus &&
						"all_tasks" !== $scope.vm.mytaskViewStatus ||
						($scope.vm.page = 1, $scope.vm.has_more_completed_tasks = !0, $scope.vm.completed_tasks = [], n(!0))
				}
				ycTrack.track("dashboard_task", "visit");
				$scope.vm = {
					loaded: !1,
					taskAll: [],
					gtdEntrys: [
						[],
						[],
						[],
						[]
					],
					gtdTaskTempMark: [],
					currentTask: {},
					mytaskViewStatus: "gtd", //null !== kzi.localData.get("mytaskViewStatus") ? kzi.localData.get("mytaskViewStatus") : "gtd",
					isBoarded: !1,
					isListed: !1,
					page: 1,
					has_more_completed_tasks: !0,
					tasks: [],
					has_more_tasks: !0,
					group_tasks: [],
					uncompleted_tasks: [],
					completed_tasks: [],
					pop_member_options: "onlyinfo",
					new_task: {
						temp_name: "",
						pid: "",
						members: [$rootScope.global.me],
						expire_date: 0,
						labels: []
					}
				};
				$rootScope.global.title = [translate.instant("dashboard.title_name_my_tasks"), " | ", translate.instant("dashboard.title_name")].join("");
				var q = function(a) {
						if ($scope.vm.taskAll = a.sort(util.task.compare_task),
							$scope.vm.gtdEntrys = [
								[],
								[],
								[],
								[]
							],
							$($scope.vm.taskAll).each(function(a, b) {
								var c = b.mark;
								c > 0 && $scope.vm.gtdEntrys[c - 1].push(b)
							}),
							$scope.vm.gtdEntrys[0].length > 0) {

							$scope.vm.sortArray = g.task.group_tasks_by_date($scope.vm.gtdEntrys[0]);
							var b = [];
							$scope.vm.sortArray.length > 0 && ($($scope.vm.sortArray).each(function(a, c) {
								$(c.tasks).each(function(a, c) {
									b.push(c)
								})
							}), $scope.vm.gtdEntrys.splice(0, 1, b))
						}
						_.each($scope.vm.gtdEntrys,
							function(a) {
								a.task_bottom_enabled = !1,
									a.maxheight = 184
							})
					},
					r = function(a) {
						p.uncompleted_tasks = a.sort(util.task.compare_task),
							p.group_tasks = g.task.group_tasks_by_date(p.uncompleted_tasks)
					},
					s = function(a, b) {
						a.name = b.name;
						a.desc = b.desc;
						a.pos = b.pos;
						a.completed = b.completed;
						a.is_expire = b.is_expire;
						a.expire_date = b.expire_date;
						a.badges = b.badges;
						a.labels = b.labels;
						a.members = b.members;
						a.watchers = b.watchers;
						a.todos = b.todos;
						a.mark = b.mark;
					},
					t = function() {
						$scope.vm.new_task.temp_name = "";
						$scope.vm.new_task.members = [a.global.me];
						$scope.vm.new_task.labels = [];
						$scope.vm.new_task.expire_date = null;
					};
				$scope.vm.toggle_task = function(b, c, d) {
						var e = function(a) {
								$scope.vm.taskAll = _.reject($scope.vm.taskAll, {
										tid: a
									}),
									_.each($scope.vm.gtdEntrys,
										function(b) {
											b = _.reject(b, {
												tid: a
											})
										}),
									q($scope.vm.taskAll),
									$scope.vm.uncompleted_tasks = _.reject($scope.vm.uncompleted_tasks, {
										tid: a
									}),
									_.each($scope.vm.group_tasks,
										function(b) {
											b.tasks = _.reject(b.tasks, {
												tid: a
											})
										}),
									r($scope.vm.uncompleted_tasks)
							},
							f = function(a) {
								$scope.vm.completed_tasks = _.reject($scope.vm.completed_tasks, {
									tid: a
								})
							},
							g = function(b) {
								var c = _.find(b.members, {
									uid: a.global.me.uid
								});
								if (c)
									if (1 === b.completed) $scope.vm.completed_tasks.unshift(b),
										e(b.tid);
									else {
										f(b.tid);
										var d = _.find($scope.vm.taskAll, {
												tid: b.tid
											}),
											g = _.find($scope.vm.uncompleted_tasks, {
												tid: b.tid
											}),
											h = _.find($scope.vm.completed_tasks, {
												tid: b.tid
											});
										d ? (b.mark = d.mark, s(d, b)) : (null == b.mark && (b.mark = 1), $scope.vm.taskAll.push(b)),
											q($scope.vm.taskAll),
											g ? s(g, b) : $scope.vm.uncompleted_tasks.push(b),
											r($scope.vm.uncompleted_tasks),
											h && s(h, b)
									}
								else e(b.tid),
									f(b.tid)
							};
						return d ? (e(b.tid), void f(b.tid)) : void(c ? wt.data.task.get(b.pid, b.tid,
							function(a) {
								g(a.data)
							}) : g(b))
					},
					$scope.vm.tasks_sort_options = {
						appendTo: ".layout_content_main:last",
						helper: "clone",
						revert: 10,
						containment: ".layout_content_main",
						connectWith: ".entry-tasks",
						placeholder: "wt-task-placeholder",
						tolerance: "pointer",
						dropOnEmpty: !0,
						delay: "75",
						over: function(a, b) {},
						start: function(a, b) {
							$(".wt-task-placeholder").css({
									height: b.item.outerHeight()
								}),
								b.item.addClass("picked-up");
							var c = b.item.attr("task-id");
							$scope.vm.currentTask = _.find($scope.vm.taskAll, {
								tid: c
							})
						},
						stop: function(a, c) {
							b.$apply(function() {
									var a = c.item,
										b = parseInt(a.parent().attr("mark")),
										d = $scope.vm.currentTask.mark,
										e = c.item.prev().attr("task-id"),
										f = c.item.next().attr("task-id");
									if (_.isEmpty(e) && _.isEmpty(f)) $scope.vm.currentTask.pos = kzi.config.default_pos;
									else if (_.isEmpty(e)) {
										var g = parseFloat(c.item.next().attr("task-pos"));
										$scope.vm.currentTask.pos = g / 2
									} else if (_.isEmpty(f)) {
										var h = parseFloat(c.item.prev().attr("task-pos"));
										$scope.vm.currentTask.pos = h + kzi.config.default_pos
									} else {
										var h = parseFloat(c.item.prev().attr("task-pos")),
											g = parseFloat(c.item.next().attr("task-pos"));
										$scope.vm.currentTask.pos = (g + h) / 2
									}
									if ($scope.vm.currentTask.mark = b, _.remove($scope.vm.gtdEntrys[d - 1],
											function(a) {
												return a.tid === $scope.vm.currentTask.tid
											}), b === d) {
										var i = c.item.next().attr("task-id");
										if (i) {
											var j = _.findIndex($scope.vm.gtdEntrys[b - 1],
												function(a) {
													return a.tid === i
												});
											$scope.vm.gtdEntrys[b - 1].splice(j, 0, $scope.vm.currentTask)
										} else $scope.vm.gtdEntrys[b - 1].push($scope.vm.currentTask)
									} else {
										var k = a.parent().find(".task");
										if (k.length > 0) {
											var l = [];
											l.maxheight = $scope.vm.gtdEntrys[b - 1].maxheight,
												$scope.vm.gtdEntrys[b - 1] = l,
												$(k).each(function(a, c) {
													var d = $(c).attr("task-id"),
														e = _.find($scope.vm.taskAll, {
															tid: d
														});
													$scope.vm.gtdEntrys[b - 1].push(e)
												})
										}
									}
									wt.data.task.drop_dashboard_task($scope.vm.currentTask.pid, $scope.vm.currentTask.tid, b, f,
										function(a) {
											200 === a.code && ($scope.vm.currentTask.pos = a.data)
										},
										null, null)
								}),
								c.item.removeClass("picked-up")
						},
						update: function(a, b) {}
					},
					$scope.vm.js_open_task_detail = function(a, b) {
						d.openTask(b.pid, b.tid, null)
					},
					$scope.vm.js_complete_task = function(b, c, d) {
						if (a.global.prj_module.crud) {
							b.stopPropagation();
							var e = d.tid,
								g = d.pid;
							0 === d.completed && wt.data.task.complete(g, e,
								function(a) {
									200 === a.code && (d.completed = 1, f(function() {
											$scope.vm.toggle_task(d, !1)
										},
										300))
								})
						}
					},
					$scope.vm.js_toggle_viewstatus = function(a) {
						$scope.vm.mytaskViewStatus = a,
							kzi.localData.set("mytaskViewStatus", a),
							"gtd" === $scope.vm.mytaskViewStatus && ($scope.vm.isBoarded || k()),
							"time" === $scope.vm.mytaskViewStatus && $scope.vm.isBoarded && l(),
							"completed" === $scope.vm.mytaskViewStatus && ($scope.vm.page = 1, $scope.vm.has_more_completed_tasks = !0, p.completed_tasks = [], m()),
							"update" !== $scope.vm.mytaskViewStatus &&
							"my_watcher" !== $scope.vm.mytaskViewStatus &&
							"my_create" !== $scope.vm.mytaskViewStatus &&
							"all_tasks" !== $scope.vm.mytaskViewStatus ||
							($scope.vm.page = 1, $scope.vm.has_more_tasks = !0, $scope.vm.tasks = [], n(!0))
					},
					$scope.vm.js_show_task_quickcreate = function(a, b) {
						b.task_bottom_enabled = !0,
							b.maxheight -= 34
					},
					$scope.vm.js_cancel_quickcreate = function(a, b, c) {
						b.task_bottom_enabled && (b.maxheight += 34),
							b.task_bottom_enabled = !1,
							c && t()
					},
					$scope.vm.js_add_task = function(a, b, c) {
						var c = parseInt(c, 10),
							d = kzi.helper.split_line(b.temp_name);
						wt.data.task.batch_add_gtd(b.pid, c, d,
							function(a) {
								$scope.vm.gtdTaskTempMark = $scope.vm.gtdTaskTempMark.concat(a.data),
									t()
							},
							function(a) {
								7048 === a.code ? kzi.msg.error(h.instant("dashboardTask.err_add_task_entry_null")) : kzi.msg.error(h.instant("dashboardTask.err_add_task", {
									code: a.code
								}))
							})
					},
					$scope.vm.load_more_tasks = function() {
						n(!1)
					},
					$scope.vm.load_more_completed_tasks = function() {
						m()
					},
					$scope.$on(config.constant.event_names.on_task_trash,
						function(a, b) {
							$scope.vm.toggle_task(b, !1, !0)
						}),
					$scope.$on(config.constant.event_names.on_task_complete,
						function(a, b, c) {
							$scope.vm.toggle_task(b, !0)
						}),
					$scope.$on(config.constant.event_names.on_task_update,
						function(a, b, c) {
							var d = _.find($scope.vm.gtdTaskTempMark, {
								tid: b.tid
							});
							d &&
								(b.mark = d.mark,
									b.position = d.position, $scope.vm.gtdTaskTempMark =
									_.reject($scope.vm.gtdTaskTempMark, {
										tid: b.tid
									})),
								$scope.vm.toggle_task(b, !1)
						}),
					$scope.$on(config.constant.event_names.on_task_assign,
						function(a, b) {
							"gtd" === $scope.vm.mytaskViewStatus &&
								(_.find($scope.vm.gtdEntrys[0], {
										tid: b.tid
									}) ||
									$scope.vm.gtdEntrys[0].push(b)),
								"time" === p.mytaskViewStatus &&
								(_.find($scope.vm.uncompleted_tasks, {
										tid: b.tid
									}) ||
									($scope.vm.uncompleted_tasks.push(b),
										$scope.vm.group_tasks = g.task.group_tasks_by_date($scope.vm.uncompleted_tasks)))
						}),
					o()


			}
		])
		/**************************************************************************************************************
		 *
		 **************************************************************************************************************/
		.controller('DashboardCalendarCtrl', ['$scope', '$rootScope', '$uibModal', 'config', 'ycTrack', '$translate', 'uiCalendarConfig', '$popbox',
			function($scope, $rootScope, $modal, config, ycTrack, $translate, uiCalendarConfig, $popbox) {
				//$controller('WorkCtrl', {$scope: $scope,$rootScope: $rootScope});
				//"$rootScope", "$scope", "$timeout", "$popbox", "uiCalendarConfig", "globalDataContext", "locator", "eventService", "$translate", "ycTrack"
				//      a           b           c          d              e                      f            g            h               i            j

				function k() {
					var a = m.myCalendar.fullCalendar("getView");
					$("#calendar_title").html(a.title);
					var b = new Date(a.start).getTime(),
						c = new Date(a.end).getTime(),
						d = (new Date).getTime();
					d < b || d > c ? $("#calendar_today").css("visibility", "visible") : $("#calendar_today").css("visibility", "hidden")
				}

				function l() {
					0 != $("#calendar").find(".fc-agendaWeek-view").size() && ($("#calendar").find(".fc-agendaWeek-view tbody td:eq(0)").css({
						height: config.util.winHeight() - m.header_height - 40,
						overflow: "auto",
						display: "block"
					}), $("#calendar").find(".fc-agendaWeek-view tbody td:eq(0)").find(".fc-time-grid-container").css({
						height: "",
						overflow: "auto"
					}))
				}
				ycTrack.track("dashboard_calendar", "visit");
				var m = $scope.vm = {
					myCalendar: {},
					header_height: 120,
					calendar_view: "month",
					show_my_task: !0,
					show_all_events: 1,
					calendar_project_filter_status: null,
					cache_calendar_events: null
				};
				m.js_toggle_filter = function() {
						"setting" === m.calendar_project_filter_status ? m.calendar_project_filter_status = null : m.calendar_project_filter_status = "setting"
					},
					$rootScope.global.title =
					[$translate.instant("dashboard.title_name_calendar"), " | ", $translate.instant("dashboard.title_name")].join(""),
					$scope.project_ids = [],
					$scope.filter_type = "all",
					$scope.show_task_uid = $rootScope.global.me.uid,
					$scope.show_task_team_id = null,
					$scope.current_team = {},
					$scope.show_completed_tasks = 1,
					$scope.filterColumnFold = !0;
				var n, o, p = null,
					q = null,
					r = function() {
						$scope.show_completed_tasks = 0 === config.localData.get("cale_show_completed_tasks") ? 0 : 1,
							m.show_all_events = 0 === config.localData.get("cale_show_all_events") ? 0 : 1;
						var a = config.localData.get("calendar_checked_project_ids");
						null != a ?
							"none" === a ? $scope.project_ids = [] : $scope.project_ids = a.split(",") : $scope.project_ids = null,
							config.localData.get("calendar_view") ?
							m.calendar_view = config.localData.get("calendar_view") :
							config.localData.set("calendar_view", m.calendar_view),
							config.localData.get("calendar_sidebar_view") ?
							$scope.calendar_sidebar_view = config.localData.get("calendar_sidebar_view") :
							$scope.calendar_sidebar_view = "event",
							$scope.calendar_sidebar_view = "event"
					},
					s = function() {
						var a = _.filter($scope.projects,
								function(a) {
									return a.is_checked
								}),
							c = _.map(a, "pid");
						$scope.project_ids = c,
							_.isEmpty(c) ?
							config.localData.set("calendar_checked_project_ids", "none") :
							config.localData.set("calendar_checked_project_ids", $scope.project_ids)
					};
				r();
				var t = function() {
						m.myCalendar.fullCalendar("refetchEvents")
					},
					u = function() {
						m.myCalendar.fullCalendar("removeEvents")
					},
					v = function(a, c, d, e, f) {
						if (_.isEmpty(p) || n !== a || o !== c) {
							var g = _.map(b.projects, "pid");
							wt.data.calendar.get_list(g, 1, a, c,
								function(a) {
									if (p = a.data, _.isFunction(d))
										if (m.show_all_events) d(p);
										else {
											var b = [];
											_.each(p,
													function(a) {
														a.extend.i_attended && b.push(a)
													}),
												d(b)
										}
								},
								e, f)
						} else {
							if (_.isFunction(d))
								if (m.show_all_events) d(p);
								else {
									var h = [];
									_.each(p,
											function(a) {
												a.extend.i_attended && h.push(a)
											}),
										d(h)
								}
							_.isFunction(f) && f()
						}
					};
				$scope.js_new_event_success = function(c) {
						c.forEach(function(c) {
							if (c.end.date >= n && c.start.date <= o) {
								var d = _.find(b.projects, {
									pid: c.pid
								});
								if (d) {
									var e = wt.bus.event.event_to_calEvent(c, d.bg);
									c.attendees && c.attendees.indexOf(a.global.me.uid) >= 0 ? e.extend.i_attended = 1 : e.extend.i_attended = 0,
										d.is_calendar || (d.is_calendar = 1, _.defaults(d, {
											is_checked: !0
										}), b.calendar_projects.push(d), b.calendar_projects = _.sortBy(b.calendar_projects,
											function(a) {
												return a.pos
											})),
										p && (p.push(e), u(), t())
								} else p = null,
									u(),
									t()
							}
						})
					},
					$scope.onEventClick = function(a, b, c) {
						b.preventDefault(),
							b.stopPropagation(),
							a.extend && a.extend.xtype === config.xtype.event ? g.openEvent(a.extend.pid, a.id) : g.openTask(a.extend.pid, a.id)
					},
					$scope.onDayClick = function(c, e, f) {
						if ($rootScope.global.loading_done) {
							var g = config.helper.mouse_position(e);
							$(e.currentTarget).attr("data-placement", "right"),
								$(e.currentTarget).attr("data-align", "top"),
								$(e.currentTarget).addClass("js-popbox"),
								$(e.currentTarget).attr("data-auto-adapt", "true"),
								$popbox.popbox({
									target: e,
									templateUrl: config.templateUrls.calendar_pop_event_create,
									controller: "newEventCtrl",
									top: g.y,
									left: g.x,
									resolve: {
										pop_data: function() {
											return {
												save_success: function(a) {
													b.js_new_event_success(a)
												},
												start_date: c
											}
										}
									}
								}).open()
						}
					},
					$scope.calendarEventSources = [{
						events: function(a, b, c, d) {
							function e(a) {
								var b = a.data.events,
									c = a.data.tasks;
								_.each(b,
										function(a) {
											a.extend.recurrence_id && (a.editable = !1),
												a.start.length < 25 && (a.start = moment.unix(a.start).format(), a.end = moment.unix(a.end).format())
										}),
									_.each(c,
										function(a) {
											var b = _.find(f.projects, {
												pid: a.extend.pid
											});
											b && (a.borderColor = b.bg),
												a.durationEditable = !1,
												a.allDay = "23:59" === moment(a.extend.expire_date).format("HH:mm"),
												a.allDay === !1 ? (a.start = moment(a.extend.expire_date).format(), a.end = moment(a.extend.expire_date).add(40, "minutes").format()) : a.start = moment.unix(a.start).startOf("day").format(),
												1 === a.extend.completed ? a.className = "cal_task cal_task_completed slide-trigger" : a.className = "cal_task cal_task_uncompleted slide-trigger"
										}),
									m.cache_calendar_events = b.concat(c)
							}
							var g = moment(a.format()).unix() + "000",
								h = moment(b.format()).unix() + "000";
							null == m.cache_calendar_events ? wt.data.calendar.get_events_and_tasks(g, h,
								function(a) {
									e(a),
										d(m.cache_calendar_events),
										n = g,
										o = h
								},
								null, null) : (d(m.cache_calendar_events), wt.data.calendar.get_events_and_tasks(g, h,
								function(a) {
									e(a),
										m.myCalendar.fullCalendar("removeEvents"),
										m.myCalendar.fullCalendar("addEventSource", m.cache_calendar_events),
										n = g,
										o = h
								},
								null, null))
						}
					}],
					$scope.calendarConfig = {
						header: !1,
						height: config.util.winHeight() - m.header_height,
						editable: !0,
						droppable: !0,
						nextDayThreshold: "00:00:00",
						firstDay: 0,
						weekMode: "liquid",
						axisFormat: "HH:mm",
						timeFormat: "✓",
						defaultView: m.calendar_view,
						dayClick: $scope.onDayClick,
						loading: function(b) {
							m.myCalendar = uiCalendarConfig.calendars.myCalendar,
								k(),
								b ? $rootScope.global.loading_done = !1 : $rootScope.global.loading_done = !0,
								l()
						},
						eventClick: function(a, c, d) {
							$scope.onEventClick(a, c, d)
						},
						eventDrop: function(a, b, c, d, e, g) {
							var h = a.extend.pid;
							if (a.extend.xtype === config.xtype.task && a.allDay === !1) {
								var i = a.id,
									j = a.extend.expire_date,
									k = moment(j).add(b._data.days, "days").add(b._data.hours, "hours").valueOf();
								wt.data.task.set_expire(h, i, k,
									function(b) {
										a.extend.expire_date = k,
											a.extend.badges.expire_date = k,
											f.cache.task.set_expire(i, k)
									})
							}
							if (a.extend.xtype === config.xtype.event && a.allDay === !0) return a.allDay = !1,
								void c();
							if (0 !== b)
								if (a.extend.xtype === config.xtype.task && a.allDay === !0) {
									var i = a.id,
										j = a.extend.expire_date,
										k = moment(j).add(b, "days").endOf("day").valueOf();
									wt.data.task.set_expire(h, i, k,
										function() {
											a.extend.expire_date = k,
												a.extend.badges.expire_date = k,
												f.cache.task.set_expire(i, k)
										})
								} else if (a.extend.xtype === config.xtype.event) {
								var l = moment(a.start),
									m = moment(a.end || a.start);
								f.cache.event.update_date(h, a.id, l.format("YYYY-MM-DD"), l.format("HH:mm"), m.format("YYYY-MM-DD"), m.format("HH:mm"),
									function() {
										a.extend.end = m.valueOf()
									})
							}
						},
						eventResize: function(a, b, c) {
							if ("month" === m.calendar_view) {
								var d = moment(a.start._i).format("HH"),
									e = moment(a.start._i).format("mm");
								a.extend.end = a.end.valueOf();
								var g = moment(a.end._i).format("HH"),
									h = moment(a.end._i).format("mm");
								f.cache.event.update_date(a.extend.pid, a.id, a.start.format("YYYY-MM-DD"), d + ":" + e, a.end.format("YYYY-MM-DD"), g + ":" + h,
									function() {
										angular.noop()
									})
							}
							if ("agendaWeek" === m.calendar_view) {
								var d = a.start.format("HH"),
									e = a.start.format("mm");
								a.extend.end = a.end.valueOf();
								var g = a.end.format("HH"),
									h = a.end.format("mm");
								f.cache.event.update_date(a.extend.pid, a.id, a.start.format("YYYY-MM-DD"), d + ":" + e, a.end.format("YYYY-MM-DD"), g + ":" + h,
									function() {
										angular.noop()
									})
							}
						},
						windowResize: function() {
							$(this).fullCalendar("option", "height", config.util.winHeight() - m.header_height),
								l()
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
					$scope.changeView = function(a) {
						m.myCalendar.fullCalendar("changeView", a),
							m.calendar_view = a,
							config.localData.set("calendar_view", a),
							k(),
							u(),
							t()
					},
					$scope.prev = function() {
						m.myCalendar.fullCalendar("prev"),
							k()
					},
					$scope.next = function() {
						m.myCalendar.fullCalendar("next"),
							k()
					},
					$scope.today = function() {
						m.myCalendar.fullCalendar("today"),
							k()
					},
					$scope.js_filter_calendar_toggle = function(a) {
						a.is_checked ? a.is_checked = !1 : a.is_checked = !0,
							s(),
							u(),
							t()
					},
					$scope.js_toggle_showall = function() {
						1 == m.show_all_events ? m.show_all_events = 0 : m.show_all_events = 1,
							kzi.localData.set("cale_show_all_events", m.show_all_events),
							u(),
							t()
					},
					$scope.js_team_members_toggle = function(a) {
						b.current_team.team_id === a.team_id ? b.current_team.expand = !b.current_team.expand : (b.current_team.expand = !1, b.current_team = a, b.current_team.expand = !0, _.isEmpty(a.members) && (b.members_loading_done = !1, wt.data.team.get_team_members(a.team_id,
							function(b) {
								a.members = wt.bus.member.get_normal_members(b.data.members),
									_.each(a.members,
										function(b) {
											b.team_id = a.team_id
										})
							},
							null,
							function() {
								b.members_loading_done = !0
							})))
					},
					$scope.js_view_member_tasks = function(a, c) {
						b.show_task_uid = a.uid,
							b.show_task_team_id = c.team_id,
							m.show_my_task = !1,
							q = null,
							u(),
							t()
					},
					$scope.js_view_my_tasks = function() {
						b.show_task_uid = a.global.me.uid,
							m.show_my_task = !0,
							b.show_task_team_id = null,
							q = null,
							u(),
							t()
					},
					$scope.js_show_completed_tasks = function() {
						b.show_completed_tasks = b.show_completed_tasks ? 0 : 1,
							config.localData.set("cale_show_completed_tasks", b.show_completed_tasks),
							u(),
							t()
					},
					$scope.js_toggle_right = function() {
						b.filterColumnFold = !b.filterColumnFold,
							c(function() {
									$("#calendar").fullCalendar("render")
								},
								320)
					},
					$scope.js_change_calendar_siderview = function(a) {
						b.calendar_sidebar_view !== a &&
							(b.calendar_sidebar_view = a, config.localData.set("calendar_sidebar_view", b.calendar_sidebar_view), u(), t())
					},
					m.js_add_event = function() {
						h.showAdd(!1)
					},
					$scope.$on(config.constant.event_names.on_task_update,
						function(a, b) {
							var c = _.find(q, {
								id: b.tid
							});
							c && (c.title = b.name, c.start = b.expire_date.toString().substring(0, 10)),
								u(),
								t()
						}),
					$scope.$on(config.constant.event_names.on_event_add,
						function(a, b) {
							u(),
								t()
						}),
					$scope.$on(config.constant.event_names.on_task_trash,
						function(a, b) {
							var c = _.find(q, {
								id: b.tid
							});
							c && (q = _.reject(q,
									function(a) {
										return a.id === b.tid
									})),
								u(),
								t()
						}),
					$scope.$on(config.constant.event_names.on_task_complete,
						function(a, b) {
							var c = _.find(q, {
								id: b.tid
							});
							c && (b.completed ? (c.className = "cal_task cal_task_completed slide-trigger", c.extend.completed = 1) : (c.className = "cal_task cal_task_uncompleted slide-trigger", c.extend.completed = 0)),
								u(),
								t()
						}),
					$scope.$on(config.constant.event_names.on_event_update,
						function(b, c, d, e) {
							if (p) {
								var f = _.find(p, {
									id: c.event_id
								});
								if (d === config.event_update_type.one && f && (f.title = c.name, f.start = moment(c.start.date).valueOf().toString().substring(0, 10), f.end = moment(c.end.date).valueOf().toString().substring(0, 10), _.find(c.attendees, {
										uid: a.global.me.uid
									}) ? f.extend.i_attended = 1 : f.extend.i_attended = 0, u(), t()), d === config.event_update_type.follow_up) {
									var g = new Date(c.start.date) - new Date(f.start),
										h = new Date(c.end.date) - new Date(c.start.date),
										i = new Date(f.start);
									g > 0 ? (p.forEach(function(a) {
										var b = new Date(a.start);
										a.extend.recurrence_id === c.recurrence_id && b >= i && (a.start = moment(a.start).add(g, "milliseconds"), a.end = moment(a.start).add(h, "milliseconds"), a.start = a.start.valueOf().toString().substring(0, 10), a.end = a.end.valueOf().toString().substring(0, 10), e && (a.extend.recurrence_id = e))
									}), u(), t()) : (p = [], v(n, o,
										function() {
											u(),
												t()
										},
										null,
										function() {}))
								}
							}
							u(),
							t()
					})
		
	}])
	/**************************************************************************************************************
	 *
	 **************************************************************************************************************/
	.controller('CalendarSubscribeCtrl', 
		['$scope','$rootScope','config',
		function ($scope,$rootScope,config) {

	}])
	/**************************************************************************************************************
	 *
	 **************************************************************************************************************/
	.controller('DashboardActivityFeedCtrl', 
		['$scope','$rootScope','config','ycTrack',
		function ($scope,$rootScope,config,ycTrack) {
			//["$rootScope", "$scope", "$translate", "ycTrack"]
			//      a            b            c           d
			function e() {
				a.global.title = [c.instant("dashboard.title_name_feed"), " | ", c.instant("dashboard.title_name")].join(""),
					f.loadingDone = !1,
					wt.data.activity.get_feeds("all", 0, f.feedData.currentPage, kzi.config.default_count,
						function(a) {
							_.isEmpty(a.data) ? f.feedData.feeds = f.feedData.feeds || [] : (f.feedData.currentPage++, _.isEmpty(f.feedData.feeds) ? f.feedData.feeds = a.data : f.feedData.feeds = f.feedData.feeds.concat(a.data)),
								a.data.length < kzi.config.default_count ? f.feedData.hasMore = !1 : f.feedData.hasMore = !0
						},
						null,
						function() {
							f.loadingDone = !0
						})
			}
			ycTrack.track("dashboard_feed", "visit");
			var f = b.vm = {
				loadingDone: !0,
				feedData: {
					currentPage: 1,
					feeds: [],
					hasMore: !0
				}
			};
			e(),
				f.js_loadMoreActivityFeeds = function() {
					e()
				},
				f.js_refresh_feed = function() {
					f.feedData.feeds = [],
						f.feedData.currentPage = 1,
						e()
				}

	}])
	/**************************************************************************************************************
	 *
	 **************************************************************************************************************/
	.controller('DashboardEmailCtrl', ['$scope','$rootScope','config',
		function ($scope,$rootScope,config) {
			//["$rootScope", "$scope", "locator", "$popbox", "$translate", "ycTrack"]
			//       a           b         c           d           e            f
			function g() {
				a.global.title = [e.instant("dashboard.title_name_email"), " | ", e.instant("dashboard.title_name")].join(""),
					b.loadingDone = !1,
					wt.data.mail.get_list(b.emailData.currentPage, "all",
						function(a) {
							_.isEmpty(a.data) ? b.emailData.emails = b.emailData.emails || [] : (b.emailData.currentPage++, _.isEmpty(b.emailData.emails) ? b.emailData.emails = a.data : b.emailData.emails = b.emailData.emails.concat(a.data)),
								a.data.length < kzi.config.default_count ? b.emailData.hasMore = !1 : b.emailData.hasMore = !0
						},
						null,
						function() {
							b.loadingDone = !0
						})
			}
			f.track("dashboard_email", "visit"),
				b.loadingDone = !0,
				b.emailData = {},
				b.emailData.currentPage = 1,
				b.emailData.emails = [],
				b.emailData.hasMore = !0,
				g(),
				b.loadMoreEmails = function() {
					g()
				},
				b.js_pop_showhelp = function(a) {
					d.popbox({
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
									$scope: b
								}
							}
						}
					}).open()
				},
				b.showEmailDetail = function(a) {
					c.openMail(a.mail_id),
						wt.data.mail.set_read(a.mail_id,
							function() {
								a.is_read = !0
							})
				},
				b.$on(config.constant.event_names.on_mail_trash,
					function(a, c) {
						b.emailData.emails && (b.emailData.emails = _.reject(b.emailData.emails,
							function(a) {
								return a.mail_id === c.mail_id
							}))
					})

			}
		])
		/**************************************************************************************************************
		 *
		 **************************************************************************************************************/
		.controller('CalendarSubscribeCtrl', ['$scope', '$rootScope', 'config',
			function($scope, $rootScope, config) {

			}
		])
		/**************************************************************************************************************
		 *
		 **************************************************************************************************************/
		.controller('DashboardActivityFeedCtrl', ['$scope', '$rootScope', 'config', 'api', 'ycTrack', '$translate',
			function($scope, $rootScope, config, api, ycTrack, translate) {
				//["$rootScope", "$scope", "$translate", "ycTrack"]
				//      a            b            c           d
				function trends_ret() {
					$rootScope.global.title = [translate.instant("dashboard.title_name_feed"), " | ", translate.instant("dashboard.title_name")].join(""),
						$scope.vm.loadingDone = !1,
						api.get_feed_list({
								pid: 1,
								type: 0,
								page: $scope.vm.feedData.currentPage,
								size: config.default_count,
							},
							function(trends) {
								_.isEmpty(trends.data) ? $scope.vm.feedData.feeds = $scope.vm.feedData.feeds || [] : ($scope.vm.feedData.currentPage++, _.isEmpty($scope.vm.feedData.feeds) ? $scope.vm.feedData.feeds = a.data : $scope.vm.feedData.feeds = $scope.vm.feedData.feeds.concat(trends.data)),
									trends.data.length < config.default_count ? $scope.vm.feedData.hasMore = !1 : $scope.vm.feedData.hasMore = !0
							},
							null,
							function() {
								$scope.vm.loadingDone = !0
							})
				}
				ycTrack.track("dashboard_feed", "visit");
				$scope.vm = {
					loadingDone: !0,
					feedData: {
						currentPage: 1,
						feeds: [],
						hasMore: !0
					}
				};
				trends_ret(),
					$scope.vm.js_loadMoreActivityFeeds = function() {
						trends_ret()
					},
					$scope.vm.js_refresh_feed = function() {
						$scope.vm.feedData.feeds = [],
							$scope.vm.feedData.currentPage = 1,
							trends_ret()
					}

			}
		])
		/**************************************************************************************************************
		 *
		 **************************************************************************************************************/
		.controller('DashboardEmailCtrl', ['$scope', '$rootScope', 'config',
			function($scope, $rootScope, config) {

			}
		])
		/**************************************************************************************************************
		 *
		 **************************************************************************************************************/
		.filter('indexOf', ['config', function(config) {
			return function(input) {
				var collection = input[0];
				var filter = input[1];
				return collection.indexOf(filter) == -1 ? false : true;
			};
		}])
		.filter('orderBy', ['config', function(config) {
			return function(input, star_pos) {

			};
		}]);
});