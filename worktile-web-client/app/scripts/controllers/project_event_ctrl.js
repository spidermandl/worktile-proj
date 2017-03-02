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
	app.controller('projectEventsCtrl', ["$scope", "$stateParams", "$rootScope", "$popbox", 
					"$timeout", "$location", "uiCalendarConfig", "eventsFilterData", "Util", "locator", 
					"globalDataContext", "$q", "$translate",'config','Util',
		function (a, b, c, d, e, f, g, h, i, j, k, l, m,config,util) {
			
			function n() {
				_.findIndex(a.project.extensions, {
					eid: "0c85466e9909ea5bcea29203c8f21447"
				}) !== -1 ? 
					r.project_extensions_for_event.show_task_completed = !0 
					: 
					r.project_extensions_for_event.show_task_completed = !1
			}

			function o() {
				var a = g.calendars.myCalendar.fullCalendar("getView");
				$("#calendar_title").html(a.title);
				var b = new Date(a.start).getTime(),
					c = new Date(a.end).getTime(),
					d = (new Date).getTime();
				d < b || d > c ? $("#calendar_today").css("visibility", "visible") : $("#calendar_today").css("visibility", "hidden")
			}

			function p() {
				0 !== $("#calendar").find(".fc-agendaWeek-view").size() && ($("#calendar").find(".fc-agendaWeek-view tbody td:eq(0)").css({
					height: config.util.winHeight() - r.header_height - 40,
					overflow: "auto",
					display: "block"
				}), $("#calendar").find(".fc-agendaWeek-view tbody td:eq(0)").find(".fc-time-grid-container").css({
					height: "",
					overflow: "auto"
				}))
			}

			function q() {
				n()
			}
			var r = a.vm = {
				part_loading_done: !1,
				events: [],
				header_height: 118,
				events_filter: h,
				pid: b.pid,
				project_extensions_for_event: {
					show_task_completed: !1
				}
			};
			a.member_id = "all",
				a.myCalendar = {};
			var s = "",
				t = function() {
					g.calendars.myCalendar.fullCalendar("refetchEvents")
				},
				u = function() {
					g.calendars.myCalendar.fullCalendar("removeEvents"),
						s = ""
				},
				v = function(b, c, d, e) {
					var f = [];
					0 !== h.filter_type && 2 !== h.filter_type || k.loadEntriesAndTasks(b,
						function(b) {
							var g = _.filter(b.tasks,
									function(a) {
										return a.expire_date = config.util.dateToTimestamp(a.expire_date),
											a.expire_date >= c && a.expire_date <= d
									}),
								h = !1;
							_.each(g,
								function(b) {
									if("all" !== a.member_id) {
										var c = _.find(b.members, {
											uid: a.member_id
										});
										h = !!c
									} else h = !0;
									if(h) {
										var d = {
											id: b.tid,
											title: b.name,
											allDay: "23:59" === moment(b.expire_date).format("HH:mm"),
											start: b.expire_date,
											url: "",
											editable: !0,
											durationEditable: !1,
											textColor: "#333",
											extend: {
												expire_date: b.expire_date,
												badges: b.badges,
												pid: b.pid,
												xtype: config.constant.xtype.task
											}
										};
										d.allDay === !1 && (d.start = moment(b.expire_date).format(), d.end = moment(b.expire_date).add(40, "minutes").format()),
											1 === b.completed ? 
												r.project_extensions_for_event.show_task_completed === !0 && 
													(d.className = "cal_task cal_task_completed slide-trigger", f.push(d)) 
												: 
												(d.className = "cal_task cal_task_uncompleted slide-trigger", f.push(d))
									}
								}),
							_.isFunction(e) && e(f)
						})
				};
				c.global.title = [m.instant("event.title_name"), " | ", a.project.name].join(""),
				a.calendarEventSources = [{
					events: function(a, b, c, d) {
						var e = moment(a.format()).unix() + "000",
							f = moment(b.format()).unix() + "000";
						r.events = [],
							0 === h.filter_type && v(r.pid, e, f,
								function(a) {
									k.loadCalEvents(r.pid, e, f,
										function(b) {
											r.events = a.concat(b),
												d(r.events)
										})
								}),
							1 === h.filter_type && k.loadCalEvents(r.pid, e, f,
								function(a) {
									r.events = a,
										d(r.events)
								}),
							2 === h.filter_type && v(r.pid, e, f,
								function(a) {
									r.events = a,
										d(r.events)
								})
					}
				}],
				a.calendarConfig = {
					header: !1,
					height: config.util.winHeight() - r.header_height,
					editiable: !0,
					droppable: !0,
					nextDayThreshold: "00:00:00",
					firstDay: 0,
					weekMode: "liquid",
					axisFormat: "HH:mm",
					timeFormat: "✓",
					defaultView: "month",
					dayClick: function(b, c, d) {
						config.constant.prj_module.crud & a.project.permission && a.onDayClick(b, c, d)
					},
					loading: function(b) {
						a.myCalendar = g.calendars.myCalendar,
							o(),
							b ? r.part_loading_done = !1 : r.part_loading_done = !0,
							p()
					},
					eventClick: function(b, c, d) {
						a.onEventClick(b, c, d)
					},
					eventDrop: function(a, b, c, d, e, f) {
						var g = a.extend.pid;
						if(a.extend.xtype === config.constant.xtype.task && a.allDay === !1) {
							var h = a.id,
								i = a.extend.expire_date,
								j = moment(i).add(b._data.days, "days").add(b._data.hours, "hours").valueOf();
							wt.data.task.set_expire(g, h, j,
								function(b) {
									a.extend.expire_date = j,
										a.extend.badges.expire_date = j,
										k.cache.task.set_expire(h, j)
								})
						}
						if(a.extend.xtype === config.constant.xtype.event && a.allDay === !0) return a.allDay = !1,
							void c();
						var l = _.findIndex(_.valuesIn(b._data),
							function(a) {
								return 0 !== a
							});
						if(l !== -1) {
							if(a.extend.xtype === config.constant.xtype.task && a.allDay === !0) {
								var h = a.id,
									i = a.extend.expire_date,
									j = moment(i).add(b._data.days, "days").endOf("day").valueOf();
								wt.data.task.set_expire(g, h, j,
									function(b) {
										a.extend.expire_date = j,
											a.extend.badges.expire_date = j,
											k.cache.task.set_expire(h, j)
									})
							}
							if(a.extend.xtype === config.constant.xtype.event && a.allDay === !1) {
								var m = moment(a.start),
									n = moment(a.end || a.start);
								k.cache.event.update_date(g, a.id, m.format("YYYY-MM-DD"), m.format("HH:mm"), n.format("YYYY-MM-DD"), n.format("HH:mm"),
									function() {
										a.extend.end = n.valueOf()
									})
							}
						}
					},
					eventResize: function(a, b, c) {
						if("month" === h.calendar_view) {
							var d = moment(a.start._i).format("HH"),
								e = moment(a.start._i).format("mm");
							a.extend.end = a.end.valueOf();
							var f = moment(a.end._i).format("HH"),
								g = moment(a.end._i).format("mm");
							k.cache.event.update_date(r.pid, a.id, a.start.format("YYYY-MM-DD"), d + ":" + e, a.end.format("YYYY-MM-DD"), f + ":" + g,
								function() {
									angular.noop()
								})
						}
						if("agendaWeek" === h.calendar_view) {
							var d = a.start.format("HH"),
								e = a.start.format("mm");
							a.extend.end = a.end.valueOf();
							var f = a.end.format("HH"),
								g = a.end.format("mm");
							k.cache.event.update_date(r.pid, a.id, a.start.format("YYYY-MM-DD"), d + ":" + e, a.end.format("YYYY-MM-DD"), f + ":" + g,
								function() {
									angular.noop()
								})
						}
					},
					windowResize: function(a) {
						$(this).fullCalendar("option", "height", config.util.winHeight() - r.header_height),
							p()
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
				a.onEventClick = function(a, b, c) {
					b.preventDefault(),
						b.stopPropagation(),
						a.extend.xtype === config.constant.xtype.task ? 
							j.openTask(a.extend.pid, a.id) 
							: 
							a.extend.xtype === config.constant.xtype.event && e(function() {
								f.path("/project/" + a.extend.pid + "/event/" + a.id)
							})
				},
				a.onDayClick = function(b, c, e) {
					if(r.part_loading_done) {
						var f = config.helper.mouse_position(c);
						$(c.currentTarget).attr("data-placement", "right"),
							$(c.currentTarget).attr("data-align", "bottom"),
							$(c.currentTarget).addClass("js-popbox"),
							$(c.currentTarget).attr("data-auto-adapt", "true"),
							d.popbox({
								target: c,
								templateUrl: config.templateUrls.event_pop_add,
								controller: "newEventCtrl",
								top: f.y,
								left: f.x,
								resolve: {
									pop_data: function() {
										return {
											save_success: function(b) {
												a.js_new_event_success(b)
											},
											start_date: b
										}
									}
								}
							}).open()
					}
				},
				i.$on("eventsCalendarViewChangeEvent",
					function() {
						g.calendars.myCalendar.fullCalendar("changeView", r.events_filter.calendar_view),
							o(),
							u(),
							t()
					},
					a),
				i.$on("addTaskSuccessEvent",
					function(a) {
						u(),
							t()
					},
					a),
				i.$on("addEventSuccessEvent",
					function(b) {
						a.js_new_event_success(b)
					},
					a),
				i.$on("setEventsFilterTypeEvent",
					function() {
						u(),
							t()
					},
					a),
				r.prev = function() {
					g.calendars.myCalendar.fullCalendar("prev"),
						o()
				},
				r.next = function() {
					g.calendars.myCalendar.fullCalendar("next"),
						o()
				},
				r.today = function() {
					g.calendars.myCalendar.fullCalendar("today"),
						o()
				},
				r.set_calendar_view = function(a) {
					r.events_filter.calendar_view !== a && (r.events_filter.calendar_view = a, i.$execute("eventsCalendarViewChangeEvent"))
				},
				a.$on(config.constant.event_names.on_task_update,
					function(a, b) {
						u(),
							t(),
							k.cache.task.update_full(b)
					}),
				a.$on(config.constant.event_names.on_task_add,
					function() {
						u(),
							t()
					}),
				a.$on(config.constant.event_names.on_task_trash,
					function() {
						u(),
							t()
					}),
				a.$on(config.constant.event_names.on_task_complete,
					function() {
						u(),
							t()
					}),
				a.$on(config.constant.event_names.on_task_archive,
					function() {
						u(),
							t()
					}),
				a.$on(config.constant.event_names.shortcut_key_to_task,
					function(b, d) {
						if(c.global.prj_module.crud & a.project.permission) switch(d) {
							case config.constant.keyASCIIs.I:
							case config.constant.keyASCIIs.N:
								$("#btn_new_event").click()
						}
					}),
				a.$on(config.constant.event_names.on_event_add,
					function(b, c) {
						a.js_new_event_success(c),
							u(),
							t()
					}),
				a.$on(config.constant.event_names.on_event_update,
					function(a, b, c, d) {
						k.cache.event.update(b, c, d),
							u(),
							t()
					}),
				a.$on(config.constant.event_names.on_event_trash,
					function(a, b, c) {
						k.cache.event.trash(b, c),
							e(function() {
									u(),
										t()
								},
								1e3)
					}),
				a.$on(config.constant.event_names.project_extensions_change,
					function(a, b) {
						n(),
							u(),
							t()
					}),
				a.js_new_event_success = function(a) {
					a.forEach(function(a) {
						if(a.end.date >= k.project.cal_events_start && a.start.date <= k.project.cal_events_end) {
							var b = _.find(k.projects, {
								pid: a.pid
							});
							if(b) {
								var c = wt.bus.event.event_to_calEvent(a, b.bg);
								k.project.cal_events && (k.project.cal_events.push(c), u(), t()),
									b.is_calendar || (b.is_calendar = 1)
							} else k.project.cal_events = [],
								u(),
								t()
						}
					})
				},
				q()
		

		}])
		/**************************************************************************************************************
		 *
		 **************************************************************************************************************/
		.controller('projectEventsToolbarCtrl', ["$scope", "Util", "$stateParams", "eventsFilterData", 
							"eventService", "taskService",'config',
				function (a, b, c, d, e, f,config) {

					var g = a.vm = {
						pid: c.pid,
						events_filter: d
					};
					d.init(),
					g.js_add_event = function() {
						e.showAdd(!0)
					},
					g.js_add_task = function() {
						f.showAdd(!1, !0)
					},
					a.add_tasks_success = function(a) {
						_.each(a,
							function(a) {
								b.$execute("addTaskSuccessEvent", a)
							})
					},
					a.js_new_event_success = function(a) {
						b.$execute("addEventSuccessEvent", a)
					},
					g.set_filter_type = function(a) {
						d.set_filter_type(a),
							b.$execute("setEventsFilterTypeEvent", null)
					}
		}])
		/**************************************************************************************************************
		 *
		 **************************************************************************************************************/
		.controller('newEventCtrl', ["$rootScope", "$scope", "popbox", "$stateParams", "pop_data", 
						"globalDataContext", "$translate",'config',
				function (a, b, c, d, e, f, g,config) {
	
					var h = d.pid,
						i = e.team_id || "",
						j = e.save_success;
					b.popbox = c,
						b.step = 0,
						b.is_team_calendar = e.is_team_calendar || !1,
						b.repeat_intervals = config.constant.event_repeat_intervals,
						_.each(b.repeat_intervals,
							function(a) {
								a.desc = g.instant(a.desc)
							});
					var k = moment().format("HH"),
						l = moment().format("mm"),
						m = config.constant.all_hour_sections,
						n = config.constant.all_minute_sections,
						o = e.start_date ? moment(e.start_date) : moment(),
						p = e.start_date ? moment(e.start_date) : moment();
					p._d.setHours(p._d.getHours() + 1);
					var q = function() {
							b.start_hour_sections = m,
								b.start_minute_sections = n;
							var a = l.substring(0, 1) + "0";
							b.new_event.start_minute = a,
								b.new_event.end_minute = a,
								b.new_event.repeat_interval = b.repeat_intervals[0]
						},
						r = function(a) {
							var c = a;
							c ? null : c = {
								isChangeStartDate: !1
							};
							var d = b.new_event.start_date,
								e = b.new_event.start_hour,
								f = b.new_event.start_minute,
								g = b.new_event.end_date,
								h = b.new_event.end_hour;
							if(g <= d ? (b.new_event.end_date = d, e >= h ? (b.new_event.end_hour = e, b.new_event.end_minute <= f && (b.new_event.end_minute = f), b.end_minute_sections = _.filter(n,
									function(a) {
										return a >= f
									})) : b.end_minute_sections = n, b.end_hour_sections = _.filter(m,
									function(a) {
										return a >= e
									})) : (b.end_hour_sections = m, b.end_minute_sections = n), c.isChangeStartDate) {
								if(1 * b.new_event.start_hour + 1 >= 1 * b.new_event.end_hour && (b.new_event.end_hour = 1 * b.new_event.start_hour + 1 + "", 1 == b.new_event.end_hour.length ? "0" + b.new_event.end_hour : null, b.new_event.end_hour > "23" && (b.new_event.end_hour = "00")), "23" == b.new_event.start_hour && b.new_event.start_date == b.new_event.end_date) {
									var i = moment(b.new_event.start_date);
									i._d.setDate(i._d.getDate() + 1),
										b.new_event.end_date = i.format("YYYY-MM-DD"),
										b.new_event.end_hour = "00",
										b.new_event.end_minute = "00",
										b.end_hour_sections = m
								}
								b.end_minute_sections = n
							}
						};
					b.new_event = {
							start_date: o.format("YYYY-MM-DD"),
							end_date: p.format("YYYY-MM-DD"),
							start_hour: k,
							start_minute: l,
							end_hour: p.format("HH"),
							end_minute: l,
							attendees: [a.global.me]
						},
						h ? (b.new_event.pid = h, b.show_project_select = !1) : (b.selected_projects = f.getPacketProjects(), b.is_team_calendar && (b.selected_projects = _.filter(b.selected_projects,
							function(a) {
								return a.team_id === i
							})), _.isEmpty(b.selected_projects) || (b.new_event.pid = b.selected_projects[0].pid, b.new_event.original_pid = b.new_event.pid), b.show_project_select = !0),
						q(),
						b.$watch("[new_event.start_date,new_event.start_hour,new_event.start_minute]",
							function(a) {
								r({
									isChangeStartDate: !0
								})
							}, !0),
						r(),
						b.js_to_set_date = function(a) {
							b.current_date_type = a,
								"start_date" === a ? (b.current_date = b.new_event.start_date, b.min_date = null, b.set_date_title = g.instant("directive_event.err_start_too_large")) : (b.current_date = b.new_event.end_date, b.min_date = b.new_event.start_date, b.set_date_title = g.instant("directive_event.err_end_too_large")),
								b.js_step(1)
						},
						b.js_set_date = function(a) {
							a = moment(a).format("YYYY-MM-DD"),
								"start_date" === b.current_date_type ? (b.new_event.start_date = a, q(moment(a))) : (b.new_event.end_date = a, r()),
								b.js_step(0)
						},
						b.js_change_end_hour = function() {
							r()
						},
						b.js_change_project = function() {
							b.new_event.pid !== b.new_event.original_pid && (b.new_event.original_pid = b.new_event.pid, b.new_event.attendees = [a.global.me])
						},
						b.js_to_attendee = function() {
							b.members = [],
								b.loading_members = !0,
								f.loadProjectMembers(b.new_event.pid,
									function(a) {
										var c = [];
										_.each(a,
												function(a) {
													if(1 === a.status && a.role !== config.constant.role.guest) {
														var d = _.find(b.new_event.attendees, {
															uid: a.uid
														});
														d ? a.assigned = 1 : a.assigned = 0,
															c.push(a)
													}
												}),
											b.members = c,
											b.loading_members = !1
									}),
								b.js_step(2)
						},
						b.js_toggle_member = function(a) {
							a.setting_toggle_member !== !0 && (a.setting_toggle_member = !0, wt.bus.member.set_event_attendees_toggle(h, b.new_event, a,
								function() {},
								null,
								function() {
									a.setting_toggle_member = !1
								}))
						},
						b.js_save_event = function(a) {
							if(!_.isEmpty(b.new_event.name)) {
								b.new_event.is_saving = !0;
								var c = _.map(b.new_event.attendees, "uid"),
									d = b.new_event.end_date,
									e = b.new_event.end_hour + ":" + b.new_event.end_minute,
									f = b.new_event.location,
									h = b.new_event.start_hour + ":" + b.new_event.start_minute;
								wt.data.event.add(b.new_event.pid, b.new_event.name, f, c, b.new_event.start_date, h, d, e, b.new_event.repeat_interval.key,
									function(a) {
										b.js_close(),
											_.isFunction(j) && j(a.data)
									},
									function(a) {
										switch(1 * a.code) {
											case 13012:
												config.msg.error(g.instant("directive_event.err_name_too_large"));
												break;
											case 13013:
												config.msg.error(g.instant("directive_event.err_location_too_large"));
												break;
											case 13014:
												config.msg.error(g.instant("directive_event.err_desc_too_large"));
												break;
											default:
												config.msg.error(g.instant("directive_event.fail_save"))
										}
									},
									function() {
										b.new_event.is_saving = !1
									})
							}
						},
						b.js_add_all = function() {
							_.each(b.members,
									function(a) {
										a.assigned = 1,
											_.find(b.new_event.attendees, {
												uid: a.uid
											}) || b.new_event.attendees.push(a)
									}),
								b.js_step(0)
						},
						b.js_close = function() {
							c.close()
						},
						b.js_step = function(a) {
							b.step = a
						}
		
		}])
		/**************************************************************************************************************
		 *
		 **************************************************************************************************************/

		;
})