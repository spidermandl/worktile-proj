/**
 * @ngdoc function
 * @name jtWorkApp.controller:dashboard相关
 * @description
 * # Dashboard related controller
 * Controller of the jtWorkApp
 */
define(['app'], function(app) {
	'use strict';

	app.controller('dashboardTaskCtrl', ["$rootScope", "$scope", "$location", "locator", "globalDataContext", 
						"$timeout", "Util", "$translate", "taskService", "ycTrack", 'api','Center','config',
			function(a, b, c, d, e, f, g, h, i, j, api,center,config) {

				
				function k() {
					p.part_loading_done = !1,
						api.get_dashboard_task(function(a) {
								q(a.data)
							},
							null,
							function() {
								p.loaded = !0,
									p.part_loading_done = !0,
									p.isBoarded = !0
							})
				}

				function l() {
					_.isEmpty(p.uncompleted_tasks) && 
						(p.part_loading_done = !1, 
							api.get_for_uncompleted(function(a) {
								r(a.data)
							},
							null,
							function() {
								p.loaded = !0,
									p.part_loading_done = !0,
									p.isListed = !0
							}))
				}

				function m() {
					p.part_loading_done = !1,
						api.get_for_completed(p.page,
							function(a) {
								p.page++,
									_.isEmpty(a.data) || (_.isEmpty(p.completed_tasks) ? 
										p.completed_tasks = a.data 
										: 
										p.completed_tasks = p.completed_tasks.concat(a.data)),
									a.data.length < config.config.default_count && 
										(p.has_more_completed_tasks = !1)
							},
							null,
							function() {
								p.loaded = !0,
									p.part_loading_done = !0,
									p.isListed = !0
							})
				}

				function n(a) {
					var b = null;
					switch(p.mytaskViewStatus) {
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
					null !== b && (a && (p.part_loading_done = !1), 
						wt.data.task.get_all_list(b, p.page,
						function(a) {
							p.page++,
								_.isEmpty(a.data) || (_.isEmpty(p.tasks) ? p.tasks = a.data : p.tasks = p.tasks.concat(a.data)),
								a.data.length < config.config.default_count && (p.has_more_tasks = !1)
						},
						null,
						function() {
							p.loaded = !0,
								p.part_loading_done = !0,
								p.isListed = !0
						}))
				}

				function o() {
					"gtd" === p.mytaskViewStatus && k(),
						"time" === p.mytaskViewStatus && l(),
						"completed" === p.mytaskViewStatus && (p.page = 1, p.has_more_completed_tasks = !0, p.completed_tasks = [], m()),
						"update" !== p.mytaskViewStatus && "my_watcher" !== p.mytaskViewStatus && "my_create" !== p.mytaskViewStatus && "all_tasks" !== p.mytaskViewStatus || (p.page = 1, p.has_more_completed_tasks = !0, p.completed_tasks = [], n(!0))
				}
				j.track("dashboard_task", "visit");
				var p = b.vm = {
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
					mytaskViewStatus: null !== config.localData.get("mytaskViewStatus") ? config.localData.get("mytaskViewStatus") : "gtd",
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
						members: [a.global.me],
						expire_date: 0,
						labels: []
					}
				};
				a.global.title = [h.instant("dashboard.title_name_my_tasks"), " | ", h.instant("dashboard.title_name")].join("");
				var q = function(a) {
						if(p.taskAll = a.sort(g.task.compare_task), p.gtdEntrys = [
								[],
								[],
								[],
								[]
							], $(p.taskAll).each(function(a, b) {
								var c = b.mark;
								c > 0 && p.gtdEntrys[c - 1].push(b)
							}), p.gtdEntrys[0].length > 0) {
							p.sortArray = g.task.group_tasks_by_date(p.gtdEntrys[0]);
							var b = [];
							p.sortArray.length > 0 && ($(p.sortArray).each(function(a, c) {
								$(c.tasks).each(function(a, c) {
									b.push(c)
								})
							}), p.gtdEntrys.splice(0, 1, b))
						}
						_.each(p.gtdEntrys,
							function(a) {
								a.task_bottom_enabled = !1,
									a.maxheight = 184
							})
					},
					r = function(a) {
						p.uncompleted_tasks = a.sort(wt.bus.task.compare_task),
							p.group_tasks = g.task.group_tasks_by_date(p.uncompleted_tasks)
					},
					s = function(a, b) {
						a.name = b.name,
							a.desc = b.desc,
							a.pos = b.pos,
							a.completed = b.completed,
							a.is_expire = b.is_expire,
							a.expire_date = b.expire_date,
							a.badges = b.badges,
							a.labels = b.labels,
							a.members = b.members,
							a.watchers = b.watchers,
							a.todos = b.todos,
							a.mark = b.mark
					},
					t = function() {
						p.new_task.temp_name = "",
							p.new_task.members = [a.global.me],
							p.new_task.labels = [],
							p.new_task.expire_date = null
					};
				p.toggle_task = function(b, c, d) {
						var e = function(a) {
								p.taskAll = _.reject(p.taskAll, {
										tid: a
									}),
									_.each(p.gtdEntrys,
										function(b) {
											b = _.reject(b, {
												tid: a
											})
										}),
									q(p.taskAll),
									p.uncompleted_tasks = _.reject(p.uncompleted_tasks, {
										tid: a
									}),
									_.each(p.group_tasks,
										function(b) {
											b.tasks = _.reject(b.tasks, {
												tid: a
											})
										}),
									r(p.uncompleted_tasks)
							},
							f = function(a) {
								p.completed_tasks = _.reject(p.completed_tasks, {
									tid: a
								})
							},
							g = function(b) {
								var c = _.find(b.members, {
									uid: a.global.me.uid
								});
								if(c)
									if(1 === b.completed) p.completed_tasks.unshift(b),
										e(b.tid);
									else {
										f(b.tid);
										var d = _.find(p.taskAll, {
												tid: b.tid
											}),
											g = _.find(p.uncompleted_tasks, {
												tid: b.tid
											}),
											h = _.find(p.completed_tasks, {
												tid: b.tid
											});
										d ? (b.mark = d.mark, s(d, b)) : (null == b.mark && (b.mark = 1), p.taskAll.push(b)),
											q(p.taskAll),
											g ? s(g, b) : p.uncompleted_tasks.push(b),
											r(p.uncompleted_tasks),
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
					p.tasks_sort_options = {
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
							p.currentTask = _.find(p.taskAll, {
								tid: c
							})
						},
						stop: function(a, c) {
							b.$apply(function() {
									var a = c.item,
										b = parseInt(a.parent().attr("mark")),
										d = p.currentTask.mark,
										e = c.item.prev().attr("task-id"),
										f = c.item.next().attr("task-id");
									if(_.isEmpty(e) && _.isEmpty(f)) p.currentTask.pos = config.config.default_pos;
									else if(_.isEmpty(e)) {
										var g = parseFloat(c.item.next().attr("task-pos"));
										p.currentTask.pos = g / 2
									} else if(_.isEmpty(f)) {
										var h = parseFloat(c.item.prev().attr("task-pos"));
										p.currentTask.pos = h + config.config.default_pos
									} else {
										var h = parseFloat(c.item.prev().attr("task-pos")),
											g = parseFloat(c.item.next().attr("task-pos"));
										p.currentTask.pos = (g + h) / 2
									}
									if(p.currentTask.mark = b, _.remove(p.gtdEntrys[d - 1],
											function(a) {
												return a.tid === p.currentTask.tid
											}), b === d) {
										var i = c.item.next().attr("task-id");
										if(i) {
											var j = _.findIndex(p.gtdEntrys[b - 1],
												function(a) {
													return a.tid === i
												});
											p.gtdEntrys[b - 1].splice(j, 0, p.currentTask)
										} else p.gtdEntrys[b - 1].push(p.currentTask)
									} else {
										var k = a.parent().find(".task");
										if(k.length > 0) {
											var l = [];
											l.maxheight = p.gtdEntrys[b - 1].maxheight,
												p.gtdEntrys[b - 1] = l,
												$(k).each(function(a, c) {
													var d = $(c).attr("task-id"),
														e = _.find(p.taskAll, {
															tid: d
														});
													p.gtdEntrys[b - 1].push(e)
												})
										}
									}
									wt.data.task.drop_dashboard_task(p.currentTask.pid, p.currentTask.tid, b, f,
										function(a) {
											200 === a.code && (p.currentTask.pos = a.data)
										},
										null, null)
								}),
								c.item.removeClass("picked-up")
						},
						update: function(a, b) {}
					},
					p.js_open_task_detail = function(a, b) {
						d.openTask(b.pid, b.tid, null)
					},
					p.js_complete_task = function(b, c, d) {
						if(a.global.prj_module.crud) {
							b.stopPropagation();
							var e = d.tid,
								g = d.pid;
							0 === d.completed && wt.data.task.complete(g, e,
								function(a) {
									200 === a.code && (d.completed = 1, f(function() {
											p.toggle_task(d, !1)
										},
										300))
								})
						}
					},
					p.js_toggle_viewstatus = function(a) {
						p.mytaskViewStatus = a,
							config.localData.set("mytaskViewStatus", a),
							"gtd" === p.mytaskViewStatus && (p.isBoarded || k()),
							"time" === p.mytaskViewStatus && p.isBoarded && l(),
							"completed" === p.mytaskViewStatus && (p.page = 1, p.has_more_completed_tasks = !0, p.completed_tasks = [], m()),
							"update" !== p.mytaskViewStatus && "my_watcher" !== p.mytaskViewStatus && "my_create" !== p.mytaskViewStatus && "all_tasks" !== p.mytaskViewStatus || (p.page = 1, p.has_more_tasks = !0, p.tasks = [], n(!0))
					},
					p.js_show_task_quickcreate = function(a, b) {
						b.task_bottom_enabled = !0,
							b.maxheight -= 34
					},
					p.js_cancel_quickcreate = function(a, b, c) {
						b.task_bottom_enabled && (b.maxheight += 34),
							b.task_bottom_enabled = !1,
							c && t()
					},
					p.js_add_task = function(a, b, c) {
						var c = parseInt(c, 10),
							d = config.helper.split_line(b.temp_name);
						wt.data.task.batch_add_gtd(b.pid, c, d,
							function(a) {
								p.gtdTaskTempMark = p.gtdTaskTempMark.concat(a.data),
									t()
							},
							function(a) {
								7048 === a.code ? config.msg.error(h.instant("dashboardTask.err_add_task_entry_null")) : config.msg.error(h.instant("dashboardTask.err_add_task", {
									code: a.code
								}))
							})
					},
					p.load_more_tasks = function() {
						n(!1)
					},
					p.load_more_completed_tasks = function() {
						m()
					},
					b.$on(config.constant.event_names.on_task_trash,
						function(a, b) {
							p.toggle_task(b, !1, !0)
						}),
					b.$on(config.constant.event_names.on_task_complete,
						function(a, b, c) {
							p.toggle_task(b, !0)
						}),
					b.$on(config.constant.event_names.on_task_update,
						function(a, b, c) {
							var d = _.find(p.gtdTaskTempMark, {
								tid: b.tid
							});
							d && (b.mark = d.mark, b.position = d.position, p.gtdTaskTempMark = _.reject(p.gtdTaskTempMark, {
									tid: b.tid
								})),
								p.toggle_task(b, !1)
						}),
					b.$on(config.constant.event_names.on_task_assign,
						function(a, b) {
							"gtd" === p.mytaskViewStatus && (_.find(p.gtdEntrys[0], {
									tid: b.tid
								}) || p.gtdEntrys[0].push(b)),
								"time" === p.mytaskViewStatus && (_.find(p.uncompleted_tasks, {
									tid: b.tid
								}) || (p.uncompleted_tasks.push(b), p.group_tasks = g.task.group_tasks_by_date(p.uncompleted_tasks)))
						}),
					o()
		


		}])
		/**************************************************************************************************************
		 *
		 **************************************************************************************************************/
		.controller('dashboardCalendarCtrl', ["$rootScope", "$scope", "$timeout", "$popbox", "uiCalendarConfig", 
				"globalDataContext", "locator", "eventService", "$translate", "ycTrack",'config','$timeout',
				'api',
			function(a, b, c, d, e, f, g, h, i, j,config,$timeout,api) {
				
				function k() {
					var a = m.myCalendar.fullCalendar("getView");
					$("#calendar_title").html(a.title);
					var b = new Date(a.start).getTime(),
						c = new Date(a.end).getTime(),
						d = (new Date).getTime();
					d < b || d > c ? $("#calendar_today").css("visibility", "visible") : $("#calendar_today").css("visibility", "hidden")
				}

				function l() {
					// console.log($("#calendar").find(".fc-agendaWeek-view"));
					0 != $("#calendar").find(".fc-agendaWeek-view").size() && 
						($("#calendar").find(".fc-agendaWeek-view tbody td:eq(0)").css({
						height: config.util.winHeight() - m.header_height - 40,
						overflow: "auto",
						display: "block"
					}), $("#calendar").find(".fc-agendaWeek-view tbody td:eq(0)").find(".fc-time-grid-container").css({
						height: "",
						overflow: "auto"
					}))
				}
				j.track("dashboard_calendar", "visit");
				var m = b.vm = {
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
				a.global.title = [i.instant("dashboard.title_name_calendar"), " | ", i.instant("dashboard.title_name")].join(""),
				b.project_ids = [],
				b.filter_type = "all",
				b.show_task_uid = a.global.me.uid,
				b.show_task_team_id = null,
				b.current_team = {},
				b.show_completed_tasks = 1,
				b.filterColumnFold = !0;
				var n, o, p = null,
					q = null,
					r = function() {
						b.show_completed_tasks = 0 === config.localData.get("cale_show_completed_tasks") ? 0 : 1,
							m.show_all_events = 0 === config.localData.get("cale_show_all_events") ? 0 : 1;
						var a = config.localData.get("calendar_checked_project_ids");
						null != a ? "none" === a ? b.project_ids = [] : b.project_ids = a.split(",") : b.project_ids = null,
							config.localData.get("calendar_view") ? m.calendar_view = config.localData.get("calendar_view") : config.localData.set("calendar_view", m.calendar_view),
							config.localData.get("calendar_sidebar_view") ? b.calendar_sidebar_view = config.localData.get("calendar_sidebar_view") : b.calendar_sidebar_view = "event",
							b.calendar_sidebar_view = "event"
					},
					s = function() {
						var a = _.filter(b.projects,
								function(a) {
									return a.is_checked
								}),
							c = _.map(a, "pid");
						b.project_ids = c,
							_.isEmpty(c) ? config.localData.set("calendar_checked_project_ids", "none") : config.localData.set("calendar_checked_project_ids", b.project_ids)
					};
				r();
				var t = function() {
						m.myCalendar.fullCalendar("refetchEvents")
					},
					u = function() {
						m.myCalendar.fullCalendar("removeEvents")
					},
					v = function(a, c, d, e, f) {
						if(_.isEmpty(p) || n !== a || o !== c) {
							var g = _.map(b.projects, "pid");
							wt.data.calendar.get_list(g, 1, a, c,
								function(a) {
									if(p = a.data, _.isFunction(d))
										if(m.show_all_events) d(p);
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
							if(_.isFunction(d))
								if(m.show_all_events) d(p);
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
				b.js_new_event_success = function(c) {
					c.forEach(function(c) {
						if(c.end.date >= n && c.start.date <= o) {
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
									p && (p.push(e), u(), t())
							} else p = null,
								u(),
								t()
						}
					})
				},
				b.onEventClick = function(a, b, c) {
					b.preventDefault(),
					b.stopPropagation(),
					a.extend && a.extend.xtype === config.constant.xtype.event ? 
						g.openEvent(a.extend.pid, a.id) 
						: 
						g.openTask(a.extend.pid, a.id)
				},
				b.onDayClick = function(c, e, f) {
					if(a.global.loading_done) {
						var g = config.helper.mouse_position(e);
						$(e.currentTarget).attr("data-placement", "right"),
							$(e.currentTarget).attr("data-align", "top"),
							$(e.currentTarget).addClass("js-popbox"),
							$(e.currentTarget).attr("data-auto-adapt", "true"),
							d.popbox({
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
											start_date: c
										}
									}
								}
							}).open()
					}
				},
				b.calendarEventSources = [{
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
						null == m.cache_calendar_events ? 
							api.get_events_and_tasks(
								{
									start:g, 
									end:h,
								},
								function(a) {
									e(a),
										d(m.cache_calendar_events),
										n = g,
										o = h
								},
								null, null) 
							: 
							(d(m.cache_calendar_events), 
								wt.data.calendar.get_events_and_tasks(
									g, 
									h,
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
				b.calendarConfig = {
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
					dayClick: b.onDayClick,
					loading: function(b) {
						//if (e.calendars.myCalendar) {
							m.myCalendar = e.calendars.myCalendar,
							k(),
							b ? a.global.loading_done = !1 : a.global.loading_done = !0,
							l()
						//}
						// $timeout(function() {
						// 	m.myCalendar = e.calendars.myCalendar,
						// 	k(),
						// 	b ? a.global.loading_done = !1 : a.global.loading_done = !0,
						// 	l()
						// });

					},
					eventClick: function(a, c, d) {
						b.onEventClick(a, c, d)
					},
					eventDrop: function(a, b, c, d, e, g) {
						var h = a.extend.pid;
						if(a.extend.xtype === config.constant.xtype.task && a.allDay === !1) {
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
						if(a.extend.xtype === config.constant.xtype.event && a.allDay === !0) return a.allDay = !1,
							void c();
						if(0 !== b)
							if(a.extend.xtype === config.constant.xtype.task && a.allDay === !0) {
								var i = a.id,
									j = a.extend.expire_date,
									k = moment(j).add(b, "days").endOf("day").valueOf();
								wt.data.task.set_expire(h, i, k,
									function() {
										a.extend.expire_date = k,
											a.extend.badges.expire_date = k,
											f.cache.task.set_expire(i, k)
									})
							} else if(a.extend.xtype === config.constant.xtype.event) {
							var l = moment(a.start),
								m = moment(a.end || a.start);
							f.cache.event.update_date(h, a.id, l.format("YYYY-MM-DD"), l.format("HH:mm"), m.format("YYYY-MM-DD"), m.format("HH:mm"),
								function() {
									a.extend.end = m.valueOf()
								})
						}
					},
					eventResize: function(a, b, c) {
						if("month" === m.calendar_view) {
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
						if("agendaWeek" === m.calendar_view) {
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
				b.changeView = function(a) {
					m.myCalendar.fullCalendar("changeView", a),
						m.calendar_view = a,
						config.localData.set("calendar_view", a),
						k(),
						u(),
						t()
				},
				b.prev = function() {
					m.myCalendar.fullCalendar("prev"),
						k()
				},
				b.next = function() {
					m.myCalendar.fullCalendar("next"),
						k()
				},
				b.today = function() {
					m.myCalendar.fullCalendar("today"),
						k()
				},
				b.js_filter_calendar_toggle = function(a) {
					a.is_checked ? a.is_checked = !1 : a.is_checked = !0,
						s(),
						u(),
						t()
				},
				b.js_toggle_showall = function() {
					1 == m.show_all_events ? m.show_all_events = 0 : m.show_all_events = 1,
						config.localData.set("cale_show_all_events", m.show_all_events),
						u(),
						t()
				},
				b.js_team_members_toggle = function(a) {
					b.current_team.team_id === a.team_id ? 
						b.current_team.expand = !b.current_team.expand 
						: 
						(b.current_team.expand = !1, 
							b.current_team = a, 
							b.current_team.expand = !0, 
							_.isEmpty(a.members) && (b.members_loading_done = !1, 
								wt.data.team.get_team_members(a.team_id,
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
				b.js_view_member_tasks = function(a, c) {
					b.show_task_uid = a.uid,
						b.show_task_team_id = c.team_id,
						m.show_my_task = !1,
						q = null,
						u(),
						t()
				},
				b.js_view_my_tasks = function() {
					b.show_task_uid = a.global.me.uid,
						m.show_my_task = !0,
						b.show_task_team_id = null,
						q = null,
						u(),
						t()
				},
				b.js_show_completed_tasks = function() {
					b.show_completed_tasks = b.show_completed_tasks ? 0 : 1,
						config.localData.set("cale_show_completed_tasks", b.show_completed_tasks),
						u(),
						t()
				},
				b.js_toggle_right = function() {
					b.filterColumnFold = !b.filterColumnFold,
						c(function() {
								$("#calendar").fullCalendar("render")
							},
							320)
				},
				b.js_change_calendar_siderview = function(a) {
					b.calendar_sidebar_view !== a && (b.calendar_sidebar_view = a, config.localData.set("calendar_sidebar_view", b.calendar_sidebar_view), u(), t())
				},
				m.js_add_event = function() {
					h.showAdd(!1)
				},
				b.$on(config.constant.event_names.on_task_update,
					function(a, b) {
						var c = _.find(q, {
							id: b.tid
						});
						c && (c.title = b.name, c.start = b.expire_date.toString().substring(0, 10)),
							u(),
							t()
					}),
				b.$on(config.constant.event_names.on_event_add,
					function(a, b) {
						u(),
							t()
					}),
				b.$on(config.constant.event_names.on_task_trash,
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
				b.$on(config.constant.event_names.on_task_complete,
					function(a, b) {
						var c = _.find(q, {
							id: b.tid
						});
						c && (b.completed ? (c.className = "cal_task cal_task_completed slide-trigger", c.extend.completed = 1) : (c.className = "cal_task cal_task_uncompleted slide-trigger", c.extend.completed = 0)),
							u(),
							t()
					}),
				b.$on(config.constant.event_names.on_event_update,
					function(b, c, d, e) {
						if(p) {
							var f = _.find(p, {
								id: c.event_id
							});
							if(d === config.constant.event_update_type.one && f && 
									(f.title = c.name, 
										f.start = moment(c.start.date).valueOf().toString().substring(0, 10), 
										f.end = moment(c.end.date).valueOf().toString().substring(0, 10), 
										_.find(c.attendees, {
											uid: a.global.me.uid
										}) ? 
										f.extend.i_attended = 1 
										: 
										f.extend.i_attended = 0, u(), t()), 
									d === config.constant.event_update_type.follow_up) {
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
					}),
				b.$on(config.constant.event_names.on_event_trash,
					function(a, c, d) {
						if(p) {
							var e = parseInt(d);
							switch(e) {
								case config.constant.event_trash_type.one:
									p = _.reject(p,
										function(a) {
											return a.id === c.event_id
										});
									break;
								case config.constant.event_trash_type.follow_up:
									p = _.reject(p,
										function(a) {
											var b = new Date(a.start).getTime();
											return b >= c.start.date && a.extend.recurrence_id === c.recurrence_id
										});
									break;
								case config.constant.event_trash_type.all:
									p = _.reject(p,
										function(a) {
											return a.extend.recurrence_id === c.recurrence_id
										})
							}
						}
						b.calendar_projects = _.filter(b.projects,
								function(a) {
									return 1 === a.is_calendar
								}),
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
						wt.data.activity.get_feeds("all", 0, f.feedData.currentPage, config.config.default_count,
							function(a) {
								_.isEmpty(a.data) ? f.feedData.feeds = f.feedData.feeds || [] : (f.feedData.currentPage++, _.isEmpty(f.feedData.feeds) ? f.feedData.feeds = a.data : f.feedData.feeds = f.feedData.feeds.concat(a.data)),
									a.data.length < config.config.default_count ? f.feedData.hasMore = !1 : f.feedData.hasMore = !0
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
									a.data.length < config.config.default_count ? b.emailData.hasMore = !1 : b.emailData.hasMore = !0
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
			;
});