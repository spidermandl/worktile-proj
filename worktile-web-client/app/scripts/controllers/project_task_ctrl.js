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
	 * task显示主页
	 **************************************************************************************************************/
	app.controller('projectTasksCtrl', 
					["$scope", "$stateParams", "$rootScope", "$popbox", "$location", "$timeout", 
					"$interval", "permissionFilter", "Util", "globalDataContext", "locator", 
					"wtScrollService", "taskLockPermissionFilter", "$translate", "fastProject", 
					"ycTrack",'api','config',
			function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p,api,config) {
				//["$scope", "$stateParams", "$rootScope", "$popbox", "$location", "$timeout", "$interval", "permissionFilter", "bus", "globalDataContext", "locator", "wtScrollService", "taskLockPermissionFilter", "$translate", "fastProject", "ycTrack"],
				//     a            b              c            d            e            f          g             h              i            j                 k            l                    m                           n          o             p
				
				function q(a) {
					var b = null;
					return _.isEmpty(G.entries) ? null : (_.each(G.entries,
						function(c) {
							c.entry_id === a && (b = c)
						}), b)
				}

				function r(a) {
					if(0 === a.length) return null;
					var b = a.attr("entry-id");
					return null == b || "" === b ? null : q(b)
				}

				function s(a, b, c, d) {
					a.pos = d,
						b.entry_id !== c.entry_id && (a.entry_id = c.entry_id, a.entry_name = c.name, _.isEmpty(c.tasks) ? c.tasks = [a] : c.tasks.push(a), b.tasks = _.reject(b.tasks,
							function(b) {
								return b.tid === a.tid
							}), b.tasks = _.sortBy(b.tasks,
							function(a) {
								return a.pos
							})),
						c.tasks = _.sortBy(c.tasks,
							function(a) {
								return a.pos
							})
				}

				function t(a, b, c, d, e, f) {
					s(b, c, d, e),
					wt.data.task.change_entry(a, b.tid, c.entry_id, d.entry_id, e,
						function(a) {
							_.isFunction(f) && f()
						})
				}

				function u(a, b, c, d, e, f) {
					var g = e;
					_.each(b,
							function(a) {
								var b = _.find(c.tasks, {
									tid: a
								});
								b && (g++, s(b, c, d, g))
							}),
						wt.data.task.change_entry_for_batch_task(a, b, c.entry_id, d.entry_id, e, !1,
							function(a) {
								_.isFunction(f) && (_.each(a.data,
									function(a) {
										var b = _.find(d.tasks, {
											tid: a.tid
										});
										b && (b.pos = a.pos),
											d.tasks = _.sortBy(d.tasks,
												function(a) {
													return a.pos
												})
									}), f(a))
							})
				}
				/**
				* 获取entries和task 后的回调函数
				**/
				function v(b, d) {
					G.team_id = o.team_id,
						G.permission = o.permission;
					var e = null;
					_.each(b.tasks,
							function(a) {
								a.is_filter = !1,
								a.selected = !1,
								H === a.tid && (e = a)
							}),
						_.each(b.entries,
							function(a) {
								var c = _.where(b.tasks, {
									entry_id: a.entry_id
								});
								a.batch_action_flag = 0,
									a.selected_tasks = [],
									a.tasks = c,
									d && 0 !== a.tasks.length && (a.task_loop_done = !1),
									a.maxheight = G.entry_maxheight
							}),
						G.entries = b.entries,
						G.tasks = b.tasks,
						_.each(G.entries,
							function(a) {
								a.tasks = _.sortBy(a.tasks,
										function(a) {
											return a.pos
										}),
									a.countComplateTask = _.filter(a.tasks, {
										completed: 1
									}).length
							}),
						_.isEmpty(a.task_filters.turn_on) && ("assign_me" === a.task_filters.type ? 
							T(c.global.me) 
							: 
							"my_watch" === a.task_filters.type ? 
								U(c.global.me) 
								: 
								"my_create" === a.task_filters.type ? 
									V(c.global.me) 
									: 
									(a.task_filters.texts.length > 0 || 
										a.task_filters.labels.length > 0 || 
										a.task_filters.members.length > 0 || 
										a.task_filters.date.length > 0 || 
										a.task_filters.hide_completed) && R()),
						G.part_loading_done = !0,
						c.global.prj_module.crud & a.project.permission ? (y(), B(), C(), w()) : (G.project_archived = !0, G.entries_sort_options = G.tasks_sort_options = {
								disabled: !0
							},
							G.member_drop_options = null, G.pop_member_options = null),
						ja()
				}

				function w() {
					G.pop_member_options = {
						name: n.instant("task.member_remove"),
						ongoing: n.instant("task.member_removing"),
						click: function(b, d, e, f, g) {
							g && (e.assigned = !0, wt.bus.member.set_task_member_toggle(G.pid, g, e,
								function() {
									e.setting_toggle_member = !1,
										c.$broadcast(config.constant.event_names.on_task_update, a.task),
										e.assigned = !1
								},
								null, f))
						}
					}
				}

				function x(a, b) {
					var c = a.pageX,
						d = $(".entries_panel_sortarea").parents(".wt-scroll").width(),
						e = $(".entries_panel_sortarea").parents(".wt-scroll").offset().left;
					$(document).bind("mousemove.wtTaskEntryMove",
						function(a) {
							a.pageX < c && a.pageX < e + 190 && l.scrollTo($(".entries_panel"), "-=20"),
								a.pageX + 200 > e + d && l.scrollTo($(".entries_panel"), "+=20")
						})
				}

				function y() {
					G.entries_sort_options = {
						appendTo: ".layout_content_main:last",
						containment: ".layout_content_main",
						placeholder: "wt-entry-placeholder",
						helper: "clone",
						revert: 15,
						dropOnEmpty: !0,
						tolerance: "pointer",
						distance: 8,
						delay: 0,
						handle: ".entry_header",
						disabled: !1,
						accept: ".entry",
						start: function(a, b) {
							x(a, b),
								b.item.addClass("picked-up"),
								$(".wt-entry-placeholder").css({
									height: b.item.css("height"),
									width: b.item.outerWidth()
								})
						},
						stop: function(a, b) {
							b.item.removeClass("picked-up"),
								$(document).unbind("mousemove.wtTaskEntryMove");
							var c = r(b.item),
								d = b.item.attr("entry-id"),
								e = r(b.item.prev()),
								f = r(b.item.next()),
								g = 0;
							g = null == e ? f.pos / 2 : null == f ? e.pos + config.config.default_pos : (f.pos + e.pos) / 2,
								c.pos !== g && (c.pos = g, wt.data.entry.change_pos(G.pid, d, g,
									function(a) {
										G.entries = j.cache.entry.move(G.pid, d, g)
									}))
						}
					}
				}

				function z() {
					$(document).unbind("mousemove.sort_scroll"),
						oa = null,
						g.cancel(na),
						na = void 0
				}

				function A() {
					$(document).bind("mousemove.sort_scroll",
							function(a) {
								oa = a.pageY
							}),
						na = g(function() {
								null !== oa && $.each($(".wt-task-placeholder").parents(".wt-scroll"),
									function() {
										if("y" === $(this).data("wtScroll").dir) {
											var a = $(this).offset().top,
												b = $(this).height(),
												c = $(this).find(".wt-task-placeholder").height();
											if(oa - a < c) return void l.scrollTo(this, "-=30");
											if(a + b - oa < c) return void l.scrollTo(this, "+=30")
										}
									})
							},
							100)
				}

				function B() {
					G.tasks_sort_options = {
						appendTo: ".layout_content_main:last",
						helper: "clone",
						revert: 15,
						containment: ".layout_content_main",
						connectWith: ".entry-tasks",
						placeholder: "wt-task-placeholder",
						tolerance: "pointer",
						dropOnEmpty: !0,
						distance: 8,
						delay: 0,
						start: function(a, b) {
							x(a, b),
								$(".wt-task-placeholder").css({
									height: b.item.outerHeight()
								}),
								b.item.addClass("picked-up"),
								na || A(a, b)
						},
						stop: function(a, b) {
							b.item.removeClass("picked-up"),
								$(document).unbind("mousemove.wtTaskEntryMove"),
								z()
						},
						update: function(b, c) {
							a.$apply(function() {
								var a = c.item.attr("task-id"),
									b = _.find(G.tasks, {
										tid: a
									}),
									d = 0,
									e = c.item.prev().attr("task-id"),
									f = c.item.next().attr("task-id");
								if(b.update_date = Date.now(), _.isEmpty(e) && _.isEmpty(f)) d = config.config.default_pos;
								else if(_.isEmpty(e)) {
									var g = _.find(G.tasks, {
										tid: f
									});
									d = g.pos / 2
								} else if(_.isEmpty(f)) {
									var h = _.find(G.tasks, {
										tid: e
									});
									d = h.pos + config.config.default_pos
								} else {
									var g = _.find(G.tasks, {
											tid: f
										}),
										h = _.find(G.tasks, {
											tid: e
										});
									d = (g.pos + h.pos) / 2
								}
								var i = c.item.parents(".entry").attr("entry-id"),
									j = _.find(G.entries, {
										entry_id: i
									}),
									k = _.find(G.entries, {
										entry_id: b.entry_id
									});
								i === k.entry_id && d === b.pos || j && (i !== k.entry_id && c.item.remove(), t(G.pid, b, k, j, d))
							})
						}
					}
				}

				function C() {
					G.member_drop_options = {
						accept: ".avatar",
						over: function(a, b) {},
						out: function(a, b) {},
						hoverClass: "task-state-member-over",
						drop: function(b, c) {
							var d = b.pageX;
							if(!(d > $(".slide-content").offset().left || d > $(".layout_right_sidebar").offset().left)) {
								var e = $(b.target).attr("task-id");
								a.$apply(function() {
									_.each(G.entries,
										function(b) {
											_.each(b.tasks,
												function(b) {
													if(b.tid === e) {
														var d = (c.helper.context.title, $(c.helper.context).attr("member-id"));
														if(_.isArray(b.members) && b.members.length > 0) {
															var f = _.find(b.members, {
																uid: d
															});
															if(!_.isUndefined(f)) return
														} else b.members = [];
														var g = _.find(a.project.members, {
															uid: d
														});
														b.members.push(g),
															wt.data.task.assign(G.pid, b.tid, d,
																function(a) {
																	b.update_date = Date.now()
																})
													}
												})
										})
								})
							}
						}
					}
				}

				function D() {
					$(".ui-sortable").sortable("option", "disabled", !1)
				}

				function E() {
					$(".ui-sortable").sortable("option", "disabled", !0)
				}

				function F() {
					_.findIndex(a.project.extensions, {
							eid: "c6c45e4495a68b6d99b5ae9afd78ad03"
						}) !== -1 ? G.project_extensions_for_task.show_entry_number = !0 : G.project_extensions_for_task.show_entry_number = !1,
						_.findIndex(a.project.extensions, {
							eid: "de70ff6da777e4c47bafbdf735cc3985"
						}) !== -1 ? G.project_extensions_for_task.show_task_aging = !0 : G.project_extensions_for_task.show_task_aging = !1
				}
				if(p.track("project_task", "visit"), a.project) {
					var G = a.vm = {
						permissionCRUD: h(c.global.prj_module.crud, a.project.permission),
						task_menu_default_step: 0,
						currentEntry: null,
						currentTask: null,
						entryIndex: 0,
						taskIndex: 0,
						part_loaeding_done: !1,
						team_id: -1,
						pid: b.pid,
						permission: 0,
						new_task: {
							members: [],
							expire_date: 0,
							labels: []
						},
						entries: [],
						tasks: [],
						entries_sort_options: {},
						tasks_sort_options: {},
						project_archived: !1,
						entry_name: "",
						is_show_add_entry: !1,
						is_adding_entry: !1,
						entry_input_focus: !1,
						loop_entries_count: 0,
						project_extensions_for_task: {
							show_task_aging: !1,
							show_entry_number: !1
						}
					};
					G.entry_maxheight = G.permissionCRUD ? 186 : 150;
					var H = b.tid,
						I = !1,
						J = null,
						K = null,
						L = !1;
					c.global.title = [n.instant("task.title_name"), " | ", a.project.name].join("");
					var M = function(a) {
							f(function() {
								var b = "#task_main_" + a;
								l.scrollTo($(b).parents(".wt-scroll").eq(0), b)
							})
						},
						N = function(a) {
							f(function() {
								var b = "#entry_main_" + a;
								l.scrollTo($(b).parents(".wt-scroll").last(), b)
							})
						},
						O = function() {
							a.$$phase || a.$apply(),
								l.scrollTo($(".task-selected").parents(".wt-scroll").eq(0), ".task-selected")
						},
						P = function() {
							f(function() {
								l.scrollTo($(".entry-selected").last().parents(".wt-scroll"), ".entry-selected")
							})
						},
						Q = function(a, b) {
							var c = !0;
							if(b && b.texts.length > 0 && (c = !1, _.each(b.texts,
									function(b) {
										b.length > 0 && a.name.toLowerCase().indexOf(b.trim()) > -1 && (c = !0)
									})), c && b.labels.length > 0 && (_.isEmpty(a.labels) ? c = !1 : (c = !1, _.each(b.labels,
									function(b) {
										var d = _.any(a.labels,
											function(a) {
												return a.name === b
											});
										d && (c = !0)
									}))), c && b.members.length > 0 && (_.isEmpty(a.members) ? c = b.members.indexOf(-1) >= 0 : (c = !1, _.each(b.members,
									function(b) {
										var d = [];
										d = b === -1 ? _.isEmpty(a.members) : _.any(a.members,
												function(a) {
													return a.uid === b
												}),
											d && (c = !0)
									}))), c) {
								var d = moment(),
									e = moment(a.expire_date);
								if("today" === b.date) {
									var f = e.isSame(d, "day");
									c = !!f
								} else if("tomorrow" === b.date) {
									var g = e.isSame(d.add(1, "days"), "day");
									c = !!g
								} else if("week" === b.date) {
									var h = moment().endOf("week"),
										i = moment().startOf("week");
									c = e >= i && e <= h
								} else if("nextweek" === b.date) {
									var h = moment().endOf("week").add(7, "days"),
										i = moment().startOf("week").add(7, "days");
									c = e >= i && e <= h
								} else if("month" === b.date) {
									var j = moment().endOf("month"),
										k = moment().startOf("month");
									c = e >= k && e <= j
								} else if("due" === b.date) {
									var f = e.isSame(d, "day");
									c = !!(!f && a.expire_date && e < d && e > 0)
								} else "noset" === b.date && (c = !a.expire_date)
							}
							c && b.hide_completed && (c = !a.completed),
								c ? a.is_filter = !1 : a.is_filter = !0
						},
						R = function() {
							_.isEmpty(G.entries) || (a.task_filters.texts.length > 0 || 
								a.task_filters.labels.length > 0 || a.task_filters.members.length > 0 || 
								a.task_filters.date.length > 0 || a.task_filters.hide_completed ? 
									a.task_filters.turn_on = !0 
									: 
									a.task_filters.turn_on = !1, 
									_.each(G.entries,
										function(b) {
											_.isEmpty(b.tasks) || _.each(b.tasks,
												function(b) {
													Q(b, a.task_filters)
												})
										}))
						};
					a.$on(config.constant.event_names.on_project_tasks_filter,
							function(a, b) {
								R()
							}),
						a.$on(config.constant.event_names.project_clear_task_filter,
							function(b, c) {
								W(),
									a.task_filters.type = ""
							});
					var S = function(b, c) {
							if(_.isEmpty(a.task_filters.turn_on)) {
								var d = !0;
								if("assign_me" === a.task_filters.type) d = _.any(b.members,
									function(a) {
										return a.uid === c.uid
									});
								else if("my_watch" === a.task_filters.type) d = _.any(b.watchers,
									function(a) {
										return a.uid === c.uid
									});
								else if("my_create" === a.task_filters.type) d = c.uid === b.uid;
								else if(a.task_filters.texts.length > 0 || 
									a.task_filters.labels.length > 0 || 
									a.task_filters.members.length > 0 || 
									a.task_filters.date.length > 0 || 
									a.task_filters.hide_completed) 
									return void Q(b, a.task_filters);
								d ? b.is_filter = !1 : b.is_filter = !0
							}
						},
						T = function(a) {
							_.isEmpty(G.entries) || _.each(G.entries,
								function(b) {
									_.isEmpty(b.tasks) || _.each(b.tasks,
										function(b) {
											var c = !0;
											_.isEmpty(a) || (c = _.any(b.members,
													function(b) {
														return b.uid == a.uid
													})),
												c ? b.is_filter = !1 : b.is_filter = !0
										})
								})
						},
						U = function(a) {
							_.isEmpty(G.entries) || _.each(G.entries,
								function(b) {
									_.isEmpty(b.tasks) || _.each(b.tasks,
										function(b) {
											var c = !0;
											_.isEmpty(a) || (c = _.any(b.watchers,
													function(b) {
														return b.uid === a.uid
													})),
												c ? b.is_filter = !1 : b.is_filter = !0
										})
								})
						},
						V = function(a) {
							_.isEmpty(G.entries) || _.each(G.entries,
								function(b) {
									_.isEmpty(b.tasks) || _.each(b.tasks,
										function(b) {
											var c = !0;
											_.isEmpty(a) || (c = a.uid === b.uid),
												c ? b.is_filter = !1 : b.is_filter = !0
										})
								})
						},
						W = function() {
							a.task_filters.texts = [],
								a.task_filters.labels = [],
								a.task_filters.members = [],
								a.task_filters.hide_completed = !1,
								a.task_filters.date = "",
								R()
						},
						X = function() {
							G.part_loaeding_done = !1,
								G.loop_entries_count = 0,
								F(),
								j.loadEntriesAndTasks(G.pid,
									function(a) {
										v(a, !0)
									},
									function(a) {
										a.code === config.statuses.prj_error.not_found.code ? 
											e.path("/project/" + G.pid + "/notfound") 
											: 
											a.code === config.statuses.error.permission_deny.code ? 
												e.path("/project/" + G.pid + "/notfound") 
												: 
												wt.data.error(a)
									})
						},
						Y = function(b, d) {
							c.global.prj_module.crud & a.project.permission && b.tasks.length !== _.uniq(b.tasks, "pos").length ? 
								wt.data.task.change_entry_for_batch_task(
									G.pid, 
									_.map(b.tasks, "tid"), 
									b.entry_id, 
									b.entry_id, 
									config.config.default_pos, 
									!0,
									function(a) {
										_.each(a.data,
											function(a) {
												var c = _.find(b.tasks, {
													tid: a.tid
												});
												c && (c.pos = a.pos)
											})
									},
									null,
									function() {
										d()
									}) 
								: 
								d()
						},
						Z = function() {
							G.new_task.temp_name = "",
								G.new_task.members = [],
								G.new_task.labels = [],
								G.new_task.expire_date = null
						},
						create_task = function(b, c, d) {
							if(!_.isUndefined(b) && !_.isUndefined(b.temp_name) && !_.isEmpty(b.temp_name)) {
								a.is_task_adding = !0;
								var e = c.entry_id,
									g = [],
									h = [],
									i = function() {
										var b = $("#entry_scroll_" + c.entry_id);
										d === !0 ? l.scrollTo(b, "top") : f(function() {
												l.scrollTo(b, "bottom")
											}),
											a.is_task_adding = !1
									};
								_.isEmpty(b.members) || (g = _.map(b.members, "uid")),
									_.isEmpty(b.labels) || (h = _.map(b.labels, "name"));
								var k = config.helper.split_line(b.temp_name),
									m = d ? "top" : "bottom";
								

								api.add_task(
									{	
										pid: G.pid, 
										entry_id: e, 
										pos_type: m, 
										names: angular.toJson(k, true), 
										members: angular.toJson(g,true), 
										labels: angular.toJson(h,true), 
										expire_date: b.expire_date, 
										is_locked: 0,
									},
									function(a) {
										200 === a.code && 
										globalDataContext.cache.task.batch_add(a.data)
									},
									null,
									function() {
										i()
									}),
																
								Z()
							}
						},
						ba = function(a, b) {
							b ? G.tasks = j.cache.task.archive(a.tid) : G.tasks = j.cache.task.del(a.tid)
						},
						ca = function(a, b) {
							b.tasks = _.reject(b.tasks,
									function(b) {
										return _.contains(a, b.tid)
									}),
								config.console.log("remove batch task …")
						},
						da = function(a, b) {
							_.each(a.tasks,
									function(a, c) {
										1 === a.completed && _.includes(b, a.tid) && j.cache.task.archive(a.tid)
									}),
								a.tasks = _.reject(a.tasks,
									function(a) {
										return 1 === a.completed && _.includes(b, a.tid)
									}),
								G.tasks = _.reject(G.tasks,
									function(c) {
										return c.completed && c.entry_id === a.entry_id && _.includes(b, c.tid)
									})
						},
						ea = function(a) {
							var b = _.find(G.entries, {
								entry_id: a.entry_id
							});
							if(b) {
								var d = _.find(b.tasks, {
									tid: a.tid
								});
								d || b.tasks.push(a),
									S(a, c.global.me),
									b.tasks = _.sortBy(b.tasks,
										function(a) {
											return a.pos
										})
							}
							_.find(G.tasks, {
								tid: a.tid
							}) || G.tasks.push(a)
						},
						fa = function(a) {
							G.entries = j.cache.entry.del(G.pid, a.entry_id)
						};
					a.$on("socket_message_entry_list",
							function(a, b) {
								v(j.project)
							}),
					a.$on("socket_message_entry_list_update",
						function(a, b) {
							G.entries = b.entries
						}),
					a.$on("socket_message_entry_add",
						function(a, b) {
							b.entry.tasks = [],
								b.entry.maxheight = G.entry_maxheight,
								b.entry.countComplateTask = 0
						}),
					a.$on(config.constant.event_names.on_task_move,
						function(a, b) {
							v(j.project)
						}),
					a.$on(config.constant.event_names.on_task_add,
						function(a, b) {
							ea(b.task)
						}),
					a.$on("socket_message_project_member_remove",
						function(a, b) {
							_.each(G.entries,
								function(a) {
									a.tasks && a.tasks.length > 0 && _.each(a.tasks,
										function(a) {
											a.members && a.members.length > 0 && (a.members = _.reject(a.members,
												function(a) {
													return a.uid == b.uid
												}))
										})
								})
						});
					var ga = function() {
							if(!_.isEmpty(G.entries)) {
								G.entryIndex = 0;
								for(var a = 0; a < G.entries.length; a++)
									if(!_.isEmpty(G.entries[a].tasks)) {
										G.entryIndex = a,
											G.currentEntry = G.entries[a],
											G.currentTask = G.currentEntry.tasks[0],
											G.taskIndex = 0,
											G.currentTask.selected = !0;
										break
									}
							}
						},
					ha = function(a) {
						_.isEmpty(G.currentEntry) || (G.currentEntry.selected = !1),
							G.currentEntry = a,
							G.currentEntry.selected = !0
					},
					ia = function(a) {
						_.isEmpty(G.currentTask) || (G.currentTask.selected = !1),
							G.currentTask = a,
							G.currentTask.selected = !0
					},
					ja = function() {
						_.isEmpty(G.currentEntry) || (G.currentEntry.selected = !1, G.entryIndex = 0, G.currentEntry = null),
							_.isEmpty(G.currentTask) || (G.currentTask.selected = !1, G.taskIndex = 0, G.currentTask = null)
					},
					ka = function(a) {
						if(G.entries.length > a + 1) {
							var b = G.entries[a + 1];
							_.isEmpty(b.tasks) ? ka(a + 1) : (G.entryIndex = a + 1, ha(b), G.taskIndex = 0, ia(b.tasks[0]), P(), O())
						}
					},
					la = function(a, b) {
						if(a > 0) {
							var c = G.entries[a - 1];
							_.isEmpty(c.tasks) ? la(a - 1) : (G.entryIndex = a - 1, ha(c), b === !0 ? G.taskIndex = c.tasks.length - 1 : G.taskIndex = 0, ia(c.tasks[G.taskIndex]), P(), O())
						}
					},
					ma = function(a) {
						if(null != a) {
							var b = 0;
							G.currentEntry && G.currentEntry.entry_id === a.entry_id || _.each(G.entries,
									function(c) {
										c.entry_id === a.entry_id && (ha(c), G.entryIndex = b),
											b++
									}),
								null != G.currentEntry && (b = 0, _.each(G.currentEntry.tasks,
									function(c) {
										c.tid === a.tid && (ia(c), G.taskIndex = b),
											b++
									}))
						}
					};
					a.$on(config.constant.event_names.shortcut_key_to_task,
							function(b, d) {
								if(c.global.prj_module.crud & a.project.permission) {
									L = !0;
									var e = [config.constant.keyASCIIs.A, config.constant.keyASCIIs.L, config.constant.keyASCIIs.D, config.constant.keyASCIIs.W, config.constant.keyASCIIs.M];
									if(!(I === !0 && $.inArray(d, e) < 0)) switch(d) {
										case config.constant.keyASCIIs.VK_DOWN:
										case config.constant.keyASCIIs.J:
											_.isEmpty(G.currentTask) ? ga() : G.currentEntry.tasks.length > G.taskIndex + 1 ? (G.taskIndex++, ia(G.currentEntry.tasks[G.taskIndex]), O()) : _.isEmpty(G.currentEntry) ? ga() : ka(G.entryIndex);
											break;
										case config.constant.keyASCIIs.VK_UP:
										case config.constant.keyASCIIs.K:
											_.isEmpty(G.currentTask) ? ga() : G.taskIndex > 0 ? (G.taskIndex--, ia(G.currentEntry.tasks[G.taskIndex]), O()) : _.isEmpty(G.currentEntry) ? ga() : la(G.entryIndex, !0);
											break;
										case config.constant.keyASCIIs.VK_LEFT:
											_.isEmpty(G.currentEntry) ? ga() : la(G.entryIndex, !1);
											break;
										case config.constant.keyASCIIs.VK_RIGHT:
											_.isEmpty(G.currentEntry) ? ga() : ka(G.entryIndex);
											break;
										case config.constant.keyASCIIs.ENTER:
											_.isEmpty(G.currentTask) || k.openTask(G.pid, G.currentTask.tid);
											break;
										case config.constant.keyASCIIs.I:
											$("#btn_new_task").click();
											break;
										case config.constant.keyASCIIs.M:
											if(!_.isEmpty(G.currentTask)) {
												var f = "icon_action_task_" + G.currentTask.tid;
												G.task_menu_default_step = 1,
													$("#" + f).click()
											}
											break;
										case config.constant.keyASCIIs.L:
											if(!_.isEmpty(G.currentTask)) {
												var f = "icon_action_task_" + G.currentTask.tid;
												G.task_menu_default_step = 2,
													$("#" + f).click()
											}
											break;
										case config.constant.keyASCIIs.D:
											if(!_.isEmpty(G.currentTask)) {
												var f = "icon_action_task_" + G.currentTask.tid;
												G.task_menu_default_step = 3,
													$("#" + f).click()
											}
											break;
										case config.constant.keyASCIIs.W:
											if(!_.isEmpty(G.currentTask)) {
												var f = "icon_action_task_" + G.currentTask.tid;
												G.task_menu_default_step = 4,
													$("#" + f).click()
											}
											break;
										case config.constant.keyASCIIs.A:
											if(!_.isEmpty(G.currentTask)) {
												var f = "icon_action_task_" + G.currentTask.tid;
												G.task_menu_default_step = 40,
													$("#" + f).click()
											}
											break;
										case config.constant.keyASCIIs.C:
											if(G.checkEntityPermission(G.currentTask) && !_.isEmpty(G.currentTask)) {
												var f = "task_check_" + G.currentTask.tid;
												$("#" + f).click()
											}
											break;
										case config.constant.keyASCIIs.VK_SPACE:
											if(G.checkEntityPermission(G.currentTask) && !_.isEmpty(G.currentTask)) {
												var g = _.find(G.currentTask.members, {
													uid: c.global.me.uid
												});
												g ? (g.assigned = 1, wt.bus.member.set_task_member_toggle(G.pid, G.currentTask, g)) : wt.bus.member.set_task_member_toggle(G.pid, G.currentTask, _.clone(c.global.me))
											}
											break;
										case config.constant.keyASCIIs.VK_LessThan:
											if(!_.isEmpty(G.currentEntry) && !_.isEmpty(G.currentTask) && G.checkEntityPermission(G.currentTask) && G.entryIndex > 0) {
												var h = G.entries[G.entryIndex - 1],
													i = config.config.default_pos;
												_.isEmpty(h.tasks) || (i = _.max(h.tasks,
														function(a) {
															return a.pos
														}).pos + config.config.default_pos + 1),
													delete G.currentTask.$$hashKey,
													t(G.pid, G.currentTask, G.currentEntry, h, i,
														function() {
															G.entryIndex = G.entryIndex - 1,
																ha(h),
																G.taskIndex = h.tasks.length - 1,
																P(),
																O()
														})
											}
											break;
										case config.constant.keyASCIIs.VK_GreaterThan:
											if(!_.isEmpty(G.currentEntry) && !_.isEmpty(G.currentTask) && G.checkEntityPermission(G.currentTask) && G.entries.length > G.entryIndex + 1) {
												var h = G.entries[G.entryIndex + 1],
													i = config.config.default_pos;
												_.isEmpty(h.tasks) || (i = _.max(h.tasks,
														function(a) {
															return a.pos
														}).pos + config.config.default_pos + 1),
													delete G.currentTask.$$hashKey,
													t(G.pid, G.currentTask, G.currentEntry, h, i,
														function() {
															G.entryIndex = G.entryIndex + 1,
																ha(h),
																G.taskIndex = h.tasks.length - 1,
																P(),
																O()
														})
											}
									}
								}
							}),
						G.js_mouseover_entries_panel = function(a) {
							if(L !== !0 && !I) {
								var b = $(a.target),
									c = "";
								if(b.length > 0 && (c = b.attr("task-id"), _.isEmpty(c) && (b = b.parents(".task_style"), c = b.attr("task-id")), !_.isEmpty(c))) {
									var d = _.find(G.tasks, {
										tid: c
									});
									ma(d)
								}
							}
						},
						G.js_mousemove_entries_panel = function(a) {
							L === !0 && (L = !1)
						},
						G.js_mouseleave_task = function(a, b, c) {
							if(!_.isEmpty(G.currentTask) && G.currentTask.tid === b.tid) {
								if(I) return;
								ja()
							}
						},
						G.js_add_entry_pop = function(b) {
							d.popbox({
								target: b,
								templateUrl: "/tpl/project/task/pop_add_entry.html",
								controller: ["$scope", "popbox", "pop_data",
									function(a, b, c) {
										a.popbox = b;
										var d = a.vm = {
											pid: c.scope.vm.pid,
											is_save_ing: !1
										};
										d.js_add_entry = function(a, e) {
												if(d.is_save_ing !== !0) {
													d.is_save_ing = !0;
													var g = wt.bus.entry.calculate_entry_pos(c.entries, !0);
													wt.data.entry.add(d.pid, e, g,
														function(a) {
															var d = j.cache.entry.add(a.data);
															d.tasks = [],
																d.maxheight = c.scope.vm.entry_maxheight,
																d.countComplateTask = 0,
																b.close(),
																f(function() {
																		N(d.entry_id)
																	},
																	100)
														},
														null,
														function() {
															d.is_save_ing = !1
														})
												}
											},
											d.js_close = function() {
												b.close()
											}
									}
								],
								resolve: {
									pop_data: function() {
										return {
											scope: a,
											entries: a.vm.entries
										}
									}
								}
							}).open()
						},
						G.js_add_entry = function(a) {
							if(!_.isEmpty(a) && G.is_adding_entry !== !0) {
								G.is_adding_entry = !0;
								var b = wt.bus.entry.calculate_entry_pos(G.entries, !1);
								wt.data.entry.add(G.pid, a, b,
									function(a) {
										_.isEmpty(G.entries) && (G.entries = []),
											G.entry_name = "";
										var b = j.cache.entry.add(a.data);
										b.tasks = [],
											b.maxheight = G.entry_maxheight,
											b.countComplateTask = 0,
											f(function() {
													l.scrollTo($(".entries_panel"), "right")
												},
												100)
									},
									null,
									function() {
										G.is_adding_entry = !1,
											G.entry_input_focus = !0
									})
							}
						},
						G.js_add_task = function(a, b, c, d) {
							create_task(b, c, d)
						},
						G.js_batch_select_all = function(a, b) {
							var c = [];
							_.each(b.tasks,
									function(a) {
										void 0 === a.is_filter && (a.is_filter = !1),
											0 == a.is_filter && G.checkEntityPermission(a) && (a.selected_batch = !0, c.push(a.tid))
									}),
								b.selected_tasks = c
						},
						G.js_batch_close_action = function(a, b) {
							b.maxheight -= 60,
								b.batch_action_flag = !1,
								b.selected_tasks = [],
								_.each(b.tasks,
									function(a) {
										a.selected_batch = !1
									}),
								D()
						},
						G.js_batch_select_reverse = function(a, b) {
							var c = [],
								d = [];
							_.each(b.tasks,
									function(a) {
										0 == a.is_filter && G.checkEntityPermission(a) && (a.selected_batch && d.push(a.tid), c.push(a.tid), a.selected_batch = !a.selected_batch)
									}),
								b.selected_tasks = _.difference(c, d)
						},
						G.js_batch_set_expiredate = function(b, c, e, f) {
							d.popbox({
								target: b,
								top: e,
								left: f,
								templateUrl: "/ycjs/directive/datepicker/pop_batch_set_expiredate.html",
								controller: ["$rootScope", "$scope", "popbox", "pop_data",
									function(a, b, d, e) {
										b.popbox = d;
										var f = b.vm = {
												expire_date: moment().format("YYYY-MM-DD") + " 23:59",
												has_set_expire_task: !1
											},
											g = e.scope.vm;
										_.each(c.selected_tasks,
												function(a) {
													f.has_set_expire_task || 0 !== _.find(c.tasks, {
														tid: a
													}).expire_date && (f.has_set_expire_task = !0)
												}),
											f.js_close = function() {
												d.close()
											},
											f.js_set_expire = function(a) {
												var b = 0;
												b = "00:00" === moment(a).format("HH:mm") ? moment(a).endOf("day").valueOf() : moment(a).valueOf(),
													wt.data.entry.batch_set_expire(g.pid, c.entry_id, c.selected_tasks, b,
														function(a) {
															_.each(c.tasks,
																function(a) {
																	var d = _.any(c.selected_tasks,
																		function(b) {
																			return b === a.tid
																		});
																	d && (a.expire_date = b)
																})
														}),
													f.js_close()
											},
											f.js_set_expire_date = function(a) {
												switch(a) {
													case "today":
														f.expire_date = moment().format("YYYY-MM-DD");
														break;
													case "tomorrow":
														f.expire_date = moment().add(1, "days").format("YYYY-MM-DD");
														break;
													case "week":
														f.expire_date = moment().endOf("week").format("YYYY-MM-DD");
														break;
													case "next_week":
														f.expire_date = moment().add(7, "days").endOf("week").format("YYYY-MM-DD");
														break;
													case "month":
														f.expire_date = moment().endOf("month").format("YYYY-MM-DD")
												}
												f.js_set_expire(f.expire_date)
											},
											f.js_cancel_expire = function() {
												var a = 0;
												wt.data.entry.batch_set_expire(g.pid, c.entry_id, c.selected_tasks, a,
														function(b) {
															_.each(c.tasks,
																function(b) {
																	var d = _.any(c.selected_tasks,
																		function(a) {
																			return a === b.tid
																		});
																	d && (b.expire_date = a)
																})
														}),
													d.close()
											}
									}
								],
								resolve: {
									pop_data: function() {
										return {
											scope: a
										}
									}
								}
							}).open()
						},
						G.js_batch_move_task = function(b, c, e, f) {
							c.entry_id;
							d.popbox({
								target: b,
								top: e,
								left: f,
								templateUrl: "/tpl/project/task/pop_move_task.html",
								controller: ["$rootScope", "$scope", "popbox", "pop_data",
									function(a, b, d, e) {
										b.popbox = d,
											b.project = e.scope.project,
											b.entry_name = c.name,
											b.entry = c,
											b.pid = G.pid,
											b.task_move = {},
											b.task_move.move_to_prj = "",
											b.entries = e.scope.vm.entries,
											G.js_close = function() {
												d.close()
											},
											b.is_task_moving = !1,
											b.task_move.projects = j.getPacketProjects(),
											b.task_move.move_to_prj = _.find(b.task_move.projects,
												function(a) {
													return a.pid === G.pid
												});
										var f = !0;
										b.$watch("task_move.move_to_prj",
												function(a, d) {
													a && (b.task_move.entries = null, b.task_move.move_to_entry = null, wt.data.entry.get_list(a.pid, !0,
														function(a) {
															b.task_move.entries = a.data.entries,
																f ? (f = !1, b.task_move.move_to_entry = _.find(b.task_move.entries,
																	function(a) {
																		return a.entry_id === c.entry_id
																	})) : b.task_move.move_to_entry = b.task_move.entries[0]
														},
														function(a) {
															config.msg.error(n.instant("task.load_project_entry_list_fails"))
														},
														null, "project-task-js_batch_move_task"))
												}),
											b.move_task = function() {
												if(_.each(e.entry.tasks,
														function(a) {
															a.selected_batch = !1
														}), b.task_move.move_to_prj.pid === G.pid) {
													if(b.task_move.move_to_entry.entry_id === _.find(e.entry.tasks, {
															tid: c.selected_tasks[0]
														}).entry_id) return void G.js_close();
													var a = _.find(b.entries, {
															entry_id: b.task_move.move_to_entry.entry_id
														}).tasks,
														d = config.config.default_pos;
													a && (d = _.max(a,
														function(a) {
															return a.pos
														}).pos + config.config.default_pos + 1);
													var f = _.find(b.entries,
														function(a) {
															return a.entry_id === b.task_move.move_to_entry.entry_id
														});
													u(G.pid, c.selected_tasks, c, f, d,
														function(a) {
															c.selected_tasks = [],
																G.js_close()
														})
												} else b.is_task_moving = !0,
													wt.data.task.batch_move(G.pid, b.entry.selected_tasks, b.task_move.move_to_prj.pid, b.task_move.move_to_entry.entry_id,
														function() {
															ca(b.entry.selected_tasks, b.entry)
														},
														function() {
															config.msg.error(n.instant("task.move_fail"))
														},
														function() {
															b.is_task_moving = !1,
																G.js_close()
														})
											}
									}
								],
								resolve: {
									pop_data: function() {
										return {
											scope: a,
											entries: a.vm.entries,
											entry: c
										}
									}
								}
							}).open()
						},
						G.js_batch_set_assignee = function(b, c, e, f) {
							c.entry_id;
							d.popbox({
								target: b,
								top: e,
								left: f,
								templateUrl: "/tpl/project/task/pop_batch_assignee.html",
								controller: ["$rootScope", "$scope", "popbox", "pop_data",
									function(a, b, d, e) {
										var f = b.pm = {
											selected_member_intersection: null
										};
										b.project = e.scope.project,
											b.popbox = d,
											b.entry_name = c.name,
											b.entry = c,
											_.each(c.selected_tasks,
												function(a) {
													null === f.selected_member_intersection ? f.selected_member_intersection = _.map(_.find(c.tasks, {
														tid: a
													}).members, "uid") : f.selected_member_intersection = _.intersection(f.selected_member_intersection, _.map(_.find(c.tasks, {
														tid: a
													}).members, "uid"))
												}),
											b.task = {
												members: _.map(f.selected_member_intersection,
													function(a) {
														return {
															uid: a
														}
													})
											},
											G.js_close = function() {
												d.close()
											},
											b.js_toggle_member = function(a) {
												wt.bus.entry.batch_toggle_member(G.pid, c, a)
											};
										var g = function() {
											var a = wt.bus.member.get_normal_members(b.project.members);
											_.each(a,
													function(a) {
														_.indexOf(f.selected_member_intersection, a.uid) !== -1 ? a.assigned_all = 1 : a.assigned_all = 0
													}),
												b.members = a
										};
										g()
									}
								],
								resolve: {
									pop_data: function() {
										return {
											scope: a,
											entries: a.vm.entries,
											entry: c
										}
									}
								}
							}).open()
						},
						G.js_batch_set_labels = function(b, c) {
							var e = a;
							d.popbox({
								target: b,
								template: '<wt-set-task-labels task="task" batchsetlabelfn="set_label" project="project"></wt-set-task-labels>',
								controller: ["$scope", "popbox",
									function(a, b) {
										var d = a.pm = {
											batch_assigned_labe: [],
											selected_labels_intersection: null
										};
										a.popbox = b,
											a.project = e.project,
											_.each(c.selected_tasks,
												function(a) {
													null === d.selected_labels_intersection ? d.selected_labels_intersection = _.map(_.find(c.tasks, {
														tid: a
													}).labels, "name") : d.selected_labels_intersection = _.intersection(d.selected_labels_intersection, _.map(_.find(c.tasks, {
														tid: a
													}).labels, "name"))
												}),
											a.task = {
												labels: _.map(d.selected_labels_intersection,
													function(a) {
														return {
															name: a
														}
													})
											},
											a.set_label = function(a) {
												_.isEmpty(c.selected_tasks) || wt.bus.entry.batch_toggle_label(G.pid, c, c.selected_tasks, a)
											}
									}
								]
							}).open()
						},
						G.js_show_entry_menu = function(b, c, e, f) {
							var g = c.entry_id;
							d.popbox({
								target: b,
								top: e,
								left: f,
								templateUrl: config.templateUrls.task_pop_entry_menu,
								controller: ["$rootScope", "$scope", "popbox", "pop_data",
									function(a, b, d, e) {
										var f = b.vm = {
											pid: e.scope.project.pid
										};
										b.project = e.scope.project,
											b.popbox = d,
											b.entry_name = c.name,
											b.entry = c,
											b.step = 0,
											b.entry_move = {},
											b.entry_move.dest_project = {},
											f.js_step = function(a) {
												b.step = a
											},
											f.js_close = function() {
												d.close()
											},
											f.js_show_batch_action = function() {
												c.maxheight += 60,
													c.batch_action_flag = 1,
													d.close(),
													E()
											},
											f.js_change_name = function(a, c) {
												b.is_save_ing = !0,
													wt.data.entry.update(f.pid, g, c,
														function(a) {
															e.entry.name = c
														},
														null,
														function() {
															b.is_save_ing = !1,
																d.close()
														})
											},
											f.js_archive_entry = function() {
												wt.data.entry.archive(f.pid, g,
														function() {
															fa(c)
														}),
													d.close()
											},
											f.js_del_entry = function() {
												wt.data.entry.trash(f.pid, g,
														function(a) {
															fa(c)
														}),
													d.close()
											},
											f.js_archived_all = function() {
												wt.data.task.archived_all(f.pid, g,
														function(a) {
															da(c, a.data)
														}),
													d.close()
											},
											f.js_top_open_add_task_composer = function(a) {
												c.task_top_enabled = !0,
													d.close()
											},
											f.js_set_sort = function(a, b) {
												c.vmSortType = a,
													c.tasks = _.sortByOrder(c.tasks, [a], [b]),
													d.close()
											},
											f.js_watcher_entry_toggle = function() {
												c.watched ? wt.data.entry.unwatch_entry(f.pid, c.entry_id,
														function(a) {}) : wt.data.entry.watch_entry(f.pid, c.entry_id,
														function(a) {}),
													c.watched = !c.watched
											},
											f.js_to_copy_entry = function() {
												b.new_entry = {
														name: c.name,
														entry_id: c.entry_id,
														pos: c.pos
													},
													f.js_step(12)
											},
											f.js_to_move_entry = function() {
												b.entry_move_to_prjs = j.getPacketProjects(),
													b.entry_move.dest_project = _.find(b.entry_move_to_prjs,
														function(a) {
															return a.pid === f.pid
														}),
													f.js_step(13)
											},
											f.js_move_entry = function() {
												return f.pid === b.entry_move.dest_project.pid ? void f.js_close() : void wt.data.entry.move(f.pid, c.entry_id, b.entry_move.dest_project.pid,
													function() {
														j.cache.entry.del(f.pid, c.entry_id),
															e.scope.vm.entries = _.reject(e.scope.vm.entries,
																function(a) {
																	return a.entry_id === c.entry_id;
																})
													},
													function() {
														config.msg.error(n.instant("task.move_entry_fail"))
													},
													function() {
														f.js_close()
													})
											},
											f.js_move_entry_cancel = function() {
												f.js_close()
											},
											f.js_copy_entry = function(a) {
												if(!_.isEmpty(a.name)) {
													var c = wt.bus.entry.calculate_copy_entry_pos(e.entries, a);
													b.is_copying = !0,
														wt.data.entry.copy_entry(f.pid, a.entry_id, a.name, c,
															function(a) {
																e.entries.push(a.data),
																	j.reloadEntriesAndTasks(f.pid, "fromCopyEntry",
																		function(a) {
																			v(a)
																		}),
																	f.js_close()
															},
															null,
															function() {
																b.is_copying = !1
															})
												}
											}
									}
								],
								resolve: {
									pop_data: function() {
										return {
											scope: a,
											entries: a.vm.entries,
											entry: c
										}
									}
								}
							}).open()
						},
						G.js_show_task_menu = function(b, e, f, g, h) {
							if(!(1 == e.batch_action_flag || f.is_locked && m(f, c.global.me))) {
								if(b.stopPropagation(), I && f.tid === J) return void K.close();
								f.tid && ma(f),
									K = d.popbox({
										target: b,
										top: g,
										left: h,
										autoAdapt: !0,
										templateUrl: config.templateUrls.task_pop_task_menu,
										controller: ["$scope", "popbox", "pop_data", "$rootScope", "$UploadFile", "Util", "timingtaskService",
											function(a, b, c, d, g, h, i) {
												a.popbox = b;
												var l = a.vm = {
													new_task: null,
													team_id: c.scope.vm.team_id,
													pid: c.scope.vm.pid,
													permission: c.scope.vm.permission,
													step: c.scope.vm.task_menu_default_step
												};
												a.task = f,
													a.project = c.scope.project,
													a.entries = c.entries,
													I = !0,
													J = f.tid,
													a.prj_files_loading = !1,
													a.task_move = {},
													a.task_move.move_to_prj = "",
													l.js_step = function(a) {
														l.step = a
													},
													l.js_close = function() {
														b.close()
													};
												var m = !1;
												_.isEmpty(f.tid) && (m = !0),
													d.global.me.watched = _.map(f.watchers, "uid").indexOf(d.global.me.uid) >= 0,
													a.is_add_task = m,
													l.js_toggle_member = function(a, b, c) {
														wt.bus.member.set_task_member_toggle(l.pid, c, b,
															function() {
																c.update_date = Date.now(),
																	d.$broadcast(config.constant.event_names.on_task_update, c)
															})
													},
													l.js_toggle_watch = function(a, b, c) {
														wt.bus.watch.set_watcher_toggle(l.pid, c, config.constant.xtype.task, c.tid, b,
															function() {
																c.update_date = Date.now()
															})
													},
													l.js_watch_all = function(a, c, d, e) {
														wt.bus.watch.watch_all(l.pid, d, config.constant.xtype.task, d.tid, c,
																function() {
																	d.update_date = Date.now()
																},
																null, e),
															b.close()
													},
													f.expire_date ? f.expire_date_temp = moment(f.expire_date).format("YYYY-MM-DD HH:mm") : f.expire_date_temp = moment().format("YYYY-MM-DD") + " 23:59",
													l.js_today = function() {
														f.expire_date = moment().format("YYYY-MM-DD"),
															l.set_expire(f.expire_date)
													},
													l.js_tomorrow = function() {
														f.expire_date = moment().add(1, "days").format("YYYY-MM-DD"),
															l.set_expire(f.expire_date)
													},
													l.js_week = function() {
														f.expire_date = moment().endOf("week").format("YYYY-MM-DD"),
															l.set_expire(f.expire_date)
													},
													l.js_next_week = function() {
														f.expire_date = moment().add(7, "days").endOf("week").format("YYYY-MM-DD"),
															l.set_expire(f.expire_date)
													},
													l.js_month = function() {
														f.expire_date = moment().endOf("month").format("YYYY-MM-DD"),
															l.set_expire(f.expire_date)
													},
													l.js_set_expire = function(a) {
														l.set_expire(a)
													},
													l.js_cancel_expire = function() {
														m ? (f.expire_date = null, f.expire_date_temp = null) : (f.expire_date_temp = null, f.expire_date = 0, f.badges.expire_date = 0, wt.data.task.set_expire(l.pid, f.tid, 0,
																function(a) {
																	f.update_date = Date.now()
																})),
															b.close()
													},
													l.set_expire = function(a) {
														var c = 0;
														c = "00:00" === moment(a).format("HH:mm") ? moment(a).endOf("day").valueOf() : moment(a).valueOf(),
															m ? (f.expire_date = c, l.js_step(0)) : (wt.data.task.set_expire(l.pid, f.tid, c,
																function(a) {
																	f.update_date = Date.now()
																}), f.badges.expire_date = c, f.expire_date = c, 0 !== l.task_menu_default_step ? b.close() : l.js_step(0))
													},
													l.js_show_task_move = function() {
														l.js_step(5),
															a.task_move.projects = j.getPacketProjects(),
															a.task_move.project = _.find(a.task_move.projects,
																function(a) {
																	return a.pid === l.pid
																}),
															l.js_change_project()
													},
													l.move_task = function() {
														if(a.task_move.project.pid === l.pid) {
															if(a.task_move.entry.entry_id === f.entry_id) return;
															var b = config.config.default_pos;
															a.task_move.entry.tasks.length > 0 && (b = _.max(a.task_move.entry.tasks,
																function(a) {
																	return a.pos
																}).pos + config.config.default_pos + 1);
															var c = _.find(a.task_move.entries,
																function(b) {
																	return b.entry_id === a.task_move.entry.entry_id
																});
															t(l.pid, f, e, c, b,
																function() {
																	l.js_close()
																})
														} else a.is_task_moving = !0,
															wt.data.task.move(l.pid, f.tid, a.task_move.project.pid, a.task_move.entry.entry_id,
																function() {
																	ba(f)
																},
																function() {
																	config.msg.error(n.instant("task.move_fail"))
																},
																function() {
																	a.is_task_moving = !1,
																		l.js_close()
																})
													},
													l.js_change_project = function() {
														j.loadEntries(a.task_move.project.pid,
															function(b) {
																if(b && 0 !== b.length) {
																	a.task_move.entries = b;
																	var c = _.find(b, {
																		entry_id: f.entry_id
																	});
																	a.task_move.entry = c ? c : a.task_move.entries[0]
																}
															})
													},
													l.js_del_task = function() {
														wt.data.task.trash(l.pid, f.tid,
																function(a) {
																	ba(f),
																		k.isOpened && k.xid === f.tid && k.close()
																}),
															b.close()
													},
													l.js_archive_task = function() {
														wt.data.task.archive(l.pid, f.tid,
																function() {
																	d.$broadcast(config.constant.event_names.on_task_archive, f.tid)
																}),
															b.close()
													},
													l.js_to_copy_task = function() {
														l.new_task = wt.bus.task.get_copy_task(f),
															l.js_step(31)
													},
													l.js_copy_task = function(b, c) {
														if(!_.isEmpty(c.name)) {
															a.is_copying = !0;
															var d = q(c.entry_id),
																e = wt.bus.task.calculate_copy_task_pos(d, c);
															wt.data.task.copy_task(l.pid, c.tid, c.name, e, c.keep_comments, c.keep_members, c.keep_labels, c.keep_attachments, c.keep_todos, c.keep_watchers,
																function(a) {
																	l.js_close(),
																		ea(a.data)
																},
																null,
																function() {
																	a.is_copying = !1
																})
														}
													},
													l.file_upload_option = {
														url: [config.box_url(), "?pid=" + f.pid, "&token=" + config.get_cookie("sid")].join(""),
														formData: {
															target: "prj",
															type: "task",
															pid: f.pid,
															tid: f.tid
														},
														addCallback: function() {
															f.update_date = Date.now(),
																l.js_close()
														}
													},
													l.uploadlink_option = {
														url: [config.box_url(), "uploadbylink", "?pid=" + f.pid, "&token=" + config.get_cookie("sid")].join(""),
														formData: l.file_upload_option.formData
													},
													l.js_uploadbylink_uploading = !1,
													l.js_uploadbylink = function(a) {
														if(_.isEmpty(l.uploadlink_url) || !config.validator.isUrl(l.uploadlink_url)) return config.msg.warn(n.instant("common.uploadbylink_err_link_valid")),
															void $(a.target).prev().focus();
														l.js_uploadbylink_uploading = !0;
														var b = _.extend({
																link: escape(l.uploadlink_url)
															},
															l.uploadlink_option.formData);
														wt.data.file.uploadlink(l.uploadlink_option.url, b,
															function(a) {
																8100 === a.code && config.msg.warn(n.instant("common.uploadbylink_err_file_too_large")),
																	200 === a.code && h.file.new_upload(a,
																		function(a) {
																			f.update_date = Date.now(),
																				f.files ? f.files.push(a.data) : f.files = [a.data],
																				f.badges.file_count = f.files.length,
																				config.msg.info(n.instant("common.uploadbylink_success")),
																				l.uploadlink_url = "",
																				l.js_uploadbylink_uploading = !1,
																				l.js_close()
																		})
															},
															function() {
																config.msg.warn(n.instant("common.uploadbylink_fail"))
															},
															function() {
																l.js_uploadbylink_uploading = !1
															})
													},
													l.js_files_select = function(a) {
														if(0 !== a.length) {
															l.js_close();
															var b = [];
															_.forEach(a,
																	function(a) {
																		b.push({
																			original: a,
																			data: {
																				target: "prj",
																				type: "task",
																				pid: f.pid,
																				tid: f.tid
																			}
																		})
																	}),
																g.addFiles(f.pid, b,
																	function(a, b) {
																		b && b.file && "task" === b.type && (f.update_date = Date.now(), _.isArray(f.files) ? f.files.push(b.file) : f.files = [b.file], f.badges.file_count = f.files.length)
																	})
														}
													},
													l.add_timingtask = function(a) {
														i.showAddEdit(null, a, c.entries),
															b.close()
													}
											}
										],
										resolve: {
											pop_data: function() {
												return {
													scope: a,
													entries: G.entries,
													entry: e
												}
											}
										}
									}),
									K.open().then(function() {
										G.task_menu_default_step = 0,
											I = !1,
											J = null
									})
							}
						},
						G.js_delegate_task_click = function(a, b) {
							var c = $(a.target);
							if(c.hasClass("task_style")) c = c.scope().task;
							else {
								if(!c.parents(".task_style").eq(0).length) return;
								c = c.parents(".task_style").eq(0).scope().task
							}
							if(b.batch_action_flag) {
								if(G.checkEntityPermission(c)) {
									c.selected_batch = !c.selected_batch;
									for(var d = -1,
											f = 0,
											g = 0; f < b.selected_tasks.length; f++) b.selected_tasks[f] != c.tid ? b.selected_tasks[g++] = b.selected_tasks[f] : d = f;
									d != -1 ? b.selected_tasks.length -= 1 : b.selected_tasks.push(c.tid)
								}
							} else e.path("/project/" + c.pid + "/task/" + c.tid)
						},
						G.task_loop_done = function(a) {
							G.loop_entries_count++,
								f(function() {
										Y(a,
											function() {
												a.task_loop_done = !0
											})
									},
									0),
								G.loop_entries_count === G.entries.length - 1
						},
						i.$on("addTaskSuccessEvent",
							function(a) {
								ea(a),
									M(a.tid),
									N(a.entry_id)
							},
							a),
						i.$on("showAddEntryPopEvent",
							function(a) {
								G.js_add_entry_pop(a)
							},
							a),
						i.$on("filterTasksAssignMeEvent",
							function(b) {
								W(),
									"assign_me" === a.task_filters.type ? (T(null), a.task_filters.turn_on = !1, a.task_filters.type = null) : (a.task_filters.type = "assign_me", a.task_filters.turn_on = !0, T(c.global.me))
							},
							a),
						i.$on("filterTasksMyWatchEvent",
							function(b) {
								W(),
									"my_watch" === a.task_filters.type ? (U(null), a.task_filters.turn_on = !1, a.task_filters.type = null) : (a.task_filters.type = "my_watch", a.task_filters.turn_on = !0, U(c.global.me))
							},
							a),
						i.$on("filterTasksMyCreateEvent",
							function(b) {
								W(),
									"my_create" === a.task_filters.type ? (V(null), a.task_filters.turn_on = !1, a.task_filters.type = null) : (a.task_filters.type = "my_create", a.task_filters.turn_on = !0, V(c.global.me))
							},
							a),
						i.$on("showTasksFilterDetailEvent",
							function(b) {
								a.task_filters.turn_on && (W(), a.task_filters.type = ""),
									a.sidebar.change_status("filter_tasks")
							},
							a),
						G.js_show_add_task_composer = function(a, b) {
							this.task_name = "",
								b.task_bottom_enabled = !0,
								b.maxheight -= 34
						},
						G.js_cancel_composer = function(a, b, c) {
							b.task_bottom_enabled && (b.maxheight += 34),
								b.task_bottom_enabled = !1,
								b.task_top_enabled = !1,
								c && Z()
						},
						G.js_complete_task = function(b, d, e) {
							if(1 != d.batch_action_flag && c.global.prj_module.crud & a.project.permission && G.checkEntityPermission(e)) {
								b.stopPropagation();
								var f = e.tid;
								e.update_date = Date.now(),
									e.completed ? (e.completed = 0, wt.data.task.uncomplete(G.pid, f,
										function() {
											c.$broadcast(config.constant.event_names.on_task_complete, e)
										})) : (e.completed = 1, wt.data.task.complete(G.pid, f,
										function() {
											c.$broadcast(config.constant.event_names.on_task_complete, e)
										}))
							}
						},
						G.checkEntityPermission = function(a) {
							var b = !0;
							return a && a.is_locked && m(a, c.global.me) && (b = !1),
								b
						},
						a.$on(config.constant.event_names.on_task_complete,
							function(a, b) {
								if(b.pid === G.pid) {
									j.cache.task.complete(b.tid, b.completed);
									var c = _.find(G.entries, {
										entry_id: b.entry_id
									});
									c && (0 === b.completed ? c.countComplateTask-- : c.countComplateTask++)
								}
							}),
						a.$on(config.constant.event_names.on_task_trash,
							function(a, b) {
								b && ba(b)
							}),
						a.$on(config.constant.event_names.on_task_archive,
							function(a, b) {
								if(b) {
									var c = _.find(G.tasks, {
										tid: b
									});
									c && ba(c, !0)
								}
							}),
						a.$on(config.constant.event_names.on_right_menu,
							function(b, d) {
								if(c.global.prj_module.watch & a.project.permission) {
									var e = config.helper.mouse_position(d),
										f = null,
										g = null;
									if($(d.target).hasClass("task") ? 
										f = $(d.target).attr("task-id") 
										: 
										$(d.target).parents(".task").length > 0 ? 
											f = $(d.target).parents(".task").attr("task-id") 
											: 
											$(d.target).parents(".entry").length > 0 && 
											(g = $(d.target).parents(".entry").attr("entry-id")), f) {
												var h = _.find(G.tasks, {
														tid: f
													}),
													g = h.entry_id,
													i = _.find(G.entries, {
														entry_id: g
													});
												G.js_show_task_menu(d, i, h, e.y, e.x)
											} else {
												var i = _.find(G.entries, {
													entry_id: g
												});
												G.js_show_entry_menu(d, i, e.y, e.x)
											}
								}
							}),
						a.$on(config.constant.event_names.project_extensions_change,
							function(a, b) {
								F()
							});
					var na, oa = null;
					X()
				}

			

			}])
			/**************************************************************************************************************
			 *
			 **************************************************************************************************************/
			.controller('projectTasksToolbarCtrl', ['$scope','Util','taskService',
						function ($scope,util,taskService) {
				//["$scope", "bus", "taskService"],
				//     a       b           c
				$scope.vm = {};
				$scope.vm.add_tasks_success = function(a) {
					_.each(a,
						function(a) {
							util.$execute("addTaskSuccessEvent", a)
						})
				},
				$scope.vm.js_add_task = function(a) {
					c.showAdd(!0)
				},
				$scope.vm.show_add_entry_pop = function(a) {
					util.$execute("showAddEntryPopEvent", a)
				},
				$scope.vm.filter_tasks_assign_me = function(a) {
					util.$execute("filterTasksAssignMeEvent", a)
				},
				$scope.vm.filter_tasks_my_watch = function(a) {
					util.$execute("filterTasksMyWatchEvent", a)
				},
				$scope.vm.filter_tasks_my_create = function(a) {
					util.$execute("filterTasksMyCreateEvent", a)
				},
				$scope.vm.show_tasks_filter_detail = function(a) {
					util.$execute("showTasksFilterDetailEvent", a)
				}
						
			}])
			/**************************************************************************************************************
			 *
			 **************************************************************************************************************/
			.controller('projectTaskDetailCtrl', 
							['$scope','$stateParams','$location','locator','config',
					function ($scope,stateParams,$location,locator,config) {
					//["$scope", "$stateParams", "$location", "locator"],
					//    a            b              c            d

					locator.openTask(stateParams.pid, stateParams.tid),
					$scope.$on(config.constant.event_names.on_slide_hide,
						function() {
							$location.path("/project/" + stateParams.pid + "/task")
						})
		
			}])
			/**************************************************************************************************************
			 * 右侧显示成员栏
			 **************************************************************************************************************/
			.controller('sidebarMembersCtrl', 
							['$scope','$stateParams','globalDataContext','$translate','ProjectService','config',
					function ($scope,stateParams,globalDataContext,$translate,projectService,config) {
					//["$scope", "$stateParams", "globalDataContext", "$translate", "projectService"]
					//    a            b                    c                 d             e

				var f = $scope.vm = {},
					g = stateParams.pid;
				f.draggable_options = {
					appendTo: $("#main"),
					helper: "clone",
					zIndex: 2e3,
					delay: 300,
					start: function(a, b) {
						b.helper.find("span.avatar-name").remove(),
							b.helper.find(".avatar-face > i").remove(),
							b.helper.addClass("member-state-on-drag")
					},
					stop: function(a, b) {},
					drag: function(a, b) {}
				},
				f.isMemberFilter = function() {
					return function(a) {
						return a.status === config.constant.status.ok && 
							(a.role === config.constant.role.admin || a.role === config.constant.role.member)
					}
				},
				f.isGuestFilter = function() {
					return function(a) {
						return a.status === config.constant.status.ok && 
							a.role === config.constant.role.guest
					}
				},
				f.isOnlineFilter = function() {
					return function(a) {
						return a.status === config.constant.status.ok && (1 === a.online || "1" == a.online)
					}
				},
				f.isStatusPendingFilter = function() {
					return function(a) {
						return a.status === config.constant.status.pending
					}
				},
				f.close_sidebar = function() {
					$scope.sidebar.close()
				},
				f.to_add_member = function() {
					projectService.showAddMember($scope.project)
				},
				$scope.$on(config.constant.event_names.project_add_member,
					function(b, c) {
						c.pid === g && (_.find($scope.project.members, {
							uid: c.member.uid
						}) || $scope.project.members.push(c.member))
					})
		
		
			}])
			/**************************************************************************************************************
			 * 右侧删选栏
			 **************************************************************************************************************/
			.controller('sidebarFilterTasksCtrl',
							['$rootScope','$scope','config','Util',
					function ($rootScope,$scope,config,util) {
				//["$rootScope", "$scope"]
				//       a           b


				var c = $scope.vm = {},
					d = $scope.task_filters,
					e = function() {
						$scope.labels = $scope.project.labels,
							_.isArray($scope.task_filters.texts) ? 
								$scope.task_filter_text = $scope.task_filters.texts.join(" ") 
								: 
								$scope.task_filter_text = "";
						var a = //wt.bus.member.get_normal_members($scope.project.members);
								util.member.get_normal_members($scope.project.members);
						a = _.clone(a),
							a.push({
								uid: -1
							}),
							$scope.members = a
					};
				e(),
				c.js_filter_text = function() {
					if(_.isEmpty($scope.task_filter_text)) d.texts = "",
						$rootScope.$broadcast(config.constant.event_names.on_project_tasks_filter);
					else {
						var c = $scope.task_filter_text.toLowerCase().replace("，", ",").replace("　", ",").replace(" ", ",").replace("  ", ",");
						d.texts = c.split(","),
							$rootScope.$broadcast(config.constant.event_names.on_project_tasks_filter)
					}
				},
				c.clear_text = function() {
					$scope.task_filter_text = "",
						d.texts = [],
						$rootScope.$broadcast(config.constant.event_names.on_project_tasks_filter)
				},
				c.js_filter_member = function(b) {
					d.members.indexOf(b.uid) < 0 ? 
						(b.uid == -1 ? 
							d.members = [b.uid] 
							: 
							(d.members.indexOf("-1") >= 0 && d.members.splice(d.members.indexOf("-1"), 1), 
								d.members.push(b.uid)), b.filter = !0) 
						: (d.members.splice(d.members.indexOf(b.uid), 1), b.filter = !1),
						$rootScope.$broadcast(config.constant.event_names.on_project_tasks_filter, {})
				},
				c.member_is_filter = function(a) {
					if(d.members.indexOf(a) >= 0) return !0
				},
				c.js_filter_label = function(b) {
					var c = d.labels.indexOf(b.name);
					c < 0 ? (d.labels.push(b.name), b.filter = !0) : (b.filter = !1, d.labels.splice(c, 1)),
						$rootScope.$broadcast(config.constant.event_names.on_project_tasks_filter)
				},
				c.label_is_filter = function(a) {
					if(d.labels.indexOf(a) >= 0) return !0
				},
				c.toggle_hide_completed = function() {
					$scope.task_filters.hide_completed = !$scope.task_filters.hide_completed,
						$rootScope.$broadcast(config.constant.event_names.on_project_tasks_filter)
				},
				c.js_filter_date = function(b) {
					d.date === b ? d.date = "" : d.date = b,
						$rootScope.$broadcast(config.constant.event_names.on_project_tasks_filter, {})
				},
				c.clear_task_filters = function() {
					$scope.task_filter_text = "",
						$rootScope.$broadcast(config.constant.event_names.project_clear_task_filter, null)
				},
				c.close_sidebar = function() {
					c.clear_task_filters(),
						$scope.sidebar.close()
				}
		



			}])





})