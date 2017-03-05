/**
 * @ngdoc function
 * @name jtWorkApp.controller:entity 右侧弹出层相关
 * @description
 * # entity related controllers
 * Controller of the jtWorkApp
 */
define(['app'], function (app) {
	'use strict';

	/**************************************************************************************************************
 	 * entity task
 	 **************************************************************************************************************/
	app.controller('entityTaskCtrl', ["$scope", "$rootScope", "$location", "$popbox", "$timeout", 
				"Util", "globalDataContext", "locator", "tempData", "$UploadFile", "$element", 
				"timingtaskService", "taskLockPermissionFilter", "permissionFilter", "$translate", 
				"ProjectService",'config','api',
		function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, config,api) {

			function q() {
				return b.global.prj_module.crud & a.root_vm.entityExt.permission ? 
					void(a.pop_member_options = {
						name: o.instant("task.member_remove"),
						ongoing: o.instant("task.member_removing"),
						click: function(a, c, d, e) {
							d.assigned = !0,
								t.task.update_date = Date.now(),
								wt.bus.member.set_task_member_toggle(t.pid, t.task, d,
									function() {
										d.setting_toggle_member = !1,
											b.$broadcast(config.constant.event_names.on_task_update, t.task),
											d.assigned = !1
									},
									null, e)
						}
					}) 
					: 
					void(a.pop_member_options = null)
			}

			function r() {
				t.checkEntityPermission() ? 
					a.pop_watcher_options = {
						name: o.instant("task.unwatch"),
						ongoing: o.instant("task.unwatching"),
						click: function(a, b, c, d) {
							t.task.update_date = Date.now(),
								wt.bus.watch.unwatch(t.pid, t.task, config.constant.xtype.task, t.task.tid, c,
									function() {},
									null, d)
						}
					} 
					: 
					a.pop_watcher_options = null
			}
			var s, t = a.vm = {
				team_id: "",
				pid: "",
				task: {},
				task_expireDateStyle: "",
				temp: {},
				new_todo: {
					temp_name: "",
					is_saving: !1
				},
				todo_atwho_members: [],
				uploadlink_url: "",
				uploadlink_option: {
					url: function() {
						return [config.config.box_url(), "uploadbylink", "?pid=" + t.pid, "&token=" + config.get_cookie("sid")].join("")
					}
				},
				is_fullscreen: !1
			};
			a.$wtUpload = j;
			var u, 
			loadAllTaskInfo = function(c) {
				t.task = {},
				a.entity_not_found_msg = "",
				s = c.xid,
				t.pid = c.pid,
				g.loadTask(t.pid, c.xid,
					function(c) {
						return t.task = c,
							a.root_vm.entityExt.loading_done = !0,
							c ? 
								($(".slide-content > :visible").find("a").blur(), i.task.tid === c.tid ? 
									t.temp = i.task 
									: 
									t.temp = i.task = {
										tid: t.task.tid,
										name: t.task.name,
										desc: t.task.desc,
										is_edit: !1
									},
								a.project && (t.todo_atwho_members = _.filter(a.project.members,
									function(a) {
										return 1 === a.status
									})), 
								void(null != a.project && 
									(a.root_vm.entityExt.permission = a.project.permission, 
										b.global.prj_module.view & a.root_vm.entityExt.permission &&
										(c.archived || c.is_deleted) && 
										(a.root_vm.entityExt.permission = config.constant.prj_permission.viewer), 
										config.constant.prj_module.crud & a.root_vm.entityExt.permission && A(), 
										config.constant.prj_module.crud & a.root_vm.entityExt.permission && A(), 
										r(), q(), 
										b.global.me.watched = _.map(t.task.watchers, "uid").indexOf(b.global.me.uid) >= 0, 
										e(function() {
											t.task = x(t.task),
												z(),
												a.$broadcast(config.constant.event_names.select_comment_tab)
											}), 
										e(function() {
											$(document.body).on("mousedown", ".atwho-container",
												function(a) {
													a.stopPropagation(),
														a.preventDefault()
												})
										}), 
										api.get_attach_list(
											t.pid, 
											t.task.tid,
											function(a) {
												a.data && a.data.length > 0 && (_.each(a.data,
													function(a) {
														a.icon = config.helper.build_file_icon(a)
													}), t.task.files = a.data)
											}))))
							: 
							void(a.root_vm.entityExt.permission = config.constant.prj_permission.deny)
					},
					function(b) {
						b.code === config.statuses.task_error.not_found.code ? 
							(a.root_vm.entityExt.permission = config.constant.prj_permission.deny, 
								a.root_vm.entityExt.not_found_msg = o.instant("task.not_found_msg")) 
							: 
							a.root_vm.entityExt.permission = config.constant.prj_permission.deny
					},
					function() {})
			};
			t.checkProjectSettingPermission = function() {
					var c = !1;
					return b.global.prj_module.setting & a.root_vm.entityExt.permission && (c = !0),
						c
				},
				t.checkProjectPermission = function() {
					var c = !1;
					return b.global.prj_module.crud & a.root_vm.entityExt.permission && (c = !0),
						c
				},
				t.checkLockEntityPermission = function() {
					var c = !1;
					return !(0 !== t.task.members.length || 0 !== t.task.watchers.length || !t.task.creator || _.findIndex(a.project.members, {
						uid: t.task.creator.uid
					}) !== -1 || !n(b.global.prj_module.setting, a.project.permission)) || (b.global.prj_module.crud & a.root_vm.entityExt.permission && (m(t.task, b.global.me) || (c = !0)), c)
				},
				t.checkEntityPermission = function() {
					var c = !1;
					return b.global.prj_module.crud & a.root_vm.entityExt.permission && (t.task.is_locked ? m(t.task, b.global.me) || (c = !0) : c = !0),
						c
				},
				t.checkGuestPermission = function(c, d) {
					var e = !1;
					return c.is_deleted || n(b.global.prj_module.view, a.root_vm.entityExt.permission) && !n(b.global.prj_module.crud, a.root_vm.entityExt.permission) && (e = !0),
						e
				},
				a.$on("$destroy",
					function() {
						$(document.body).off("mousedown", ".atwho-container")
					});
			var w = function(a, c, d) {
					var e = 0;
					_.isEmpty(a.todos) || (e = _.max(a.todos,
						function(a) {
							return a.pos
						}).pos);
					var f = c.temp_name.split(/\n/),
						g = 0;
					f.forEach(function(c) {
							e += config.config.default_pos,
								"" !== c && (a.update_date = Date.now(), wt.data.task.add_todo(t.pid, s, c, e,
									function(b) {
										a.todos.push(b.data),
											a.todos = _.sortBy(a.todos,
												function(a) {
													return a.pos
												})
									},
									null,
									function() {
										g++,
										g === f.length && _.isFunction(d) && (a = x(a), b.$broadcast(config.constant.event_names.on_task_update, a), d())
									}))
						}),
						c.temp_name = ""
				},
				x = function(a) {
					a.todos || (a.todos = []);
					var b = _.size(a.todos),
						c = _.size(_.where(a.todos, {
							checked: 1
						}));
					return b > 0 ? (a.percentage = parseInt(c / b * 100, 10), a.status = c + "/" + b) : a.percentage = 0,
						0 !== a.expire_date && (t.task_expireDateStyle = y(a)),
						a.badges || (a.badges = {}),
						a.badges.todo_checked_count = c,
						a.badges.todo_count = b,
						a
				},
				y = function(a) {
					var b = 0;
					if(a.completed) b = 0;
					else {
						var c = moment().valueOf(),
							d = 1e3 * moment(a.expire_date).format("X");
						b = d < c ? "expire-text-due" : d > c && d < moment().add(1, "days").valueOf() ? "expire-text-soon" : ""
					}
					return b
				},
				z = function() {
					_.isEmpty(t.task.todos) || (t.task.todos = _.sortBy(t.task.todos,
						function(a) {
							return a.pos
						}))
				},
				A = function() {
					a.todo_sort_options = {
						containment: ".task-todos",
						placeholder: "todo-placeholder",
						helper: "clone",
						revert: 10,
						dropOnEmpty: !0,
						tolerance: "pointer",
						distance: "4",
						delay: "75",
						disabled: !1,
						start: function(a, b) {
							$(".todo-placeholder").css({
								height: b.item.outerHeight() + 10
							})
						},
						stop: function(a, b) {
							var c = b.item.attr("todo-id"),
								d = _.find(t.task.todos, {
									todo_id: c
								}),
								e = b.item.prev().attr("todo-id"),
								f = b.item.next().attr("todo-id"),
								g = 0;
							if(_.isEmpty(e)) {
								var h = _.find(t.task.todos, {
									todo_id: f
								});
								g = h.pos / 2 + 1
							} else if(_.isEmpty(f)) {
								var i = _.find(t.task.todos, {
									todo_id: e
								});
								g = i.pos + config.config.default_pos + 1
							} else {
								var h = _.find(t.task.todos, {
										todo_id: f
									}),
									i = _.find(t.task.todos, {
										todo_id: e
									});
								g = (h.pos + i.pos) / 2 + 1
							}
							d.pos !== g && (d.pos = g, wt.data.task.update_todo_pos(t.pid, t.task.tid, d.todo_id, g,
								function(a) {
									z()
								}))
						}
					}
				};
			t.show_task_move_dialog = function(a, c) {
					d.popbox({
						target: a,
						templateUrl: "/tpl/project/task/pop_move_task.html",
						controller: ["$scope", "popbox", "task", "globalDataContext",
							function(a, c, d, e) {
								a.popbox = c,
									a.task_move = {},
									a.task_move.move_to_prj = {},
									a.task_move.from_entry_id = d.entry_id,
									a.is_task_moving = !1,
									a.task_move.projects = e.getPacketProjects(),
									a.task_move.move_to_prj = _.find(a.task_move.projects,
										function(a) {
											return a.pid === t.pid
										}),
									a.handle_move_to_prj_change = function() {
										a.task_move.entries = null,
											a.task_move.move_to_entry = null,
											e.loadEntries(a.task_move.move_to_prj.pid,
												function(b) {
													a.task_move.entries = b,
														a.task_move.move_to_prj.pid == d.pid ? a.task_move.move_to_entry = _.find(a.task_move.entries,
															function(a) {
																return a.entry_id === d.entry_id
															}) : a.task_move.move_to_entry = a.task_move.entries[0]
												},
												function(a) {
													config.msg.error(o.instant("task.load_project_entry_list_fails"))
												})
									},
									a.handle_move_to_prj_change(),
									a.js_close = function() {
										c.close()
									},
									a.move_task = function() {
										if(a.task_move.move_to_prj.pid === t.pid) {
											if(a.task_move.move_to_entry.entry_id === a.task_move.from_entry_id) return;
											a.is_task_moving = !0;
											var c = 0;
											a.task_move.move_to_entry.tasks && a.task_move.move_to_entry.tasks.length > 0 && (c = _.max(a.task_move.move_to_entry.tasks,
													function(a) {
														return a.pos
													}).pos + config.config.default_pos + 1),
												wt.data.task.change_entry(t.pid, d.tid, a.task_move.from_entry_id, a.task_move.move_to_entry.entry_id, c,
													function() {
														a.is_task_moving = !1,
															d.entry_id = a.task_move.move_to_entry.entry_id,
															d.entry_name = a.task_move.move_to_entry.name,
															b.$broadcast(config.constant.event_names.on_task_move, {
																task: d,
																from_entry_id: a.task_move.from_entry_id
															}),
															a.js_close()
													})
										} else {
											if(a.is_task_moving = !0, _.isEmpty(a.task_move.move_to_entry)) return void(a.is_task_moving = !1);
											wt.data.task.move(t.pid, d.tid, a.task_move.move_to_prj.pid, a.task_move.move_to_entry.entry_id,
												function() {
													e.cache.task.del(d.tid),
														b.$broadcast(config.constant.event_names.on_task_trash, d),
														h.close()
												},
												function() {
													config.msg.error(o.instant("task.move_fail"))
												},
												function() {
													a.is_task_moving = !1,
														a.js_close()
												})
										}
									}
							}
						],
						resolve: {
							task: function() {
								return c
							}
						}
					}).open()
				},
				t.js_lock_toggle = function(a, b) {
					wt.data.task.toggle_lock(b.pid, b.tid,
						function(a) {
							200 === a.code && (b.update_date = Date.now(), b.is_locked = a.data)
						},
						function(a) {
							7047 === a.code && config.msg.warn(o.instant("entity_task.warn_lock_fail_not_valid_memeber"))
						})
				},
				t.js_timingtask = function(a, b) {
					g.loadEntries(b.pid,
						function(a) {
							t.entries = a,
								l.showAddEdit(null, b, t.entries)
						})
				},
				t.js_show_project_timingtask = function(b) {
					p.showTimingtasks(a.project)
				},
				t.js_show_copy = function(a, c) {
					d.popbox({
						target: a,
						templateUrl: "/tpl/project/task/pop_copy_task.html",
						controller: ["$scope", "popbox",
							function(a, d) {
								a.popbox = d,
									a.new_task = wt.bus.task.get_copy_task(c),
									a.js_copy_task = function(c) {
										_.isEmpty(c.name) || (a.is_copying = !0, wt.data.task.copy_task(t.pid, c.tid, c.name, 0, c.keep_comments, c.keep_members, c.keep_labels, c.keep_attachments, c.keep_todos, c.keep_watchers,
											function(c) {
												a.js_close(),
													g.cache.task.add(c.data),
													b.$broadcast(config.constant.event_names.on_task_add, {
														task: c.data
													})
											},
											null,
											function() {
												a.is_copying = !1
											}))
									},
									a.js_close = function() {
										d.close()
									}
							}
						]
					}).open()
				},
				t.js_trash = function(a, c) {
					d.popbox({
						target: a,
						templateUrl: "/tpl/project/task/pop_delete_task.html",
						controller: ["$scope", "popbox",
							function(a, d) {
								a.popbox = d,
									a.js_close = function() {
										d.close()
									},
									a.js_delete_task = function() {
										wt.data.task.trash(t.pid, s,
											function() {
												c.is_deleted = 1,
													g.cache.task.del(c.tid),
													b.$broadcast(config.constant.event_names.on_task_trash, c),
													h.close(),
													d.close()
											})
									}
							}
						]
					}).open()
				},
				t.js_archive = function() {
					wt.data.task.archive(t.pid, s,
						function() {
							g.cache.task.archive(s),
								b.$broadcast(config.constant.event_names.on_task_archive, s),
								h.close()
						})
				},
				t.js_complete_task = function(a) {
					t.checkEntityPermission() && (a.update_date = Date.now(), a.completed ? (a.completed = 0, wt.data.task.uncomplete(t.pid, s,
						function() {
							b.$broadcast(config.constant.event_names.on_task_complete, a)
						})) : (a.completed = 1, wt.data.task.complete(t.pid, s,
						function() {
							b.$broadcast(config.constant.event_names.on_task_complete, a)
						})))
				},
				a.$on(config.constant.event_names.load_entity_task,
					function(a, b) {
						loadAllTaskInfo(b)
					}),
				a.$on(config.constant.event_names.on_task_complete,
					function(a, b) {
						b.tid === t.task.tid && (t.task.completed = b.completed, x(t.task))
					}),
				a.$on(config.constant.event_names.on_task_archive,
					function(b, c) {
						c == s && (t.task.archived = 1, a.root_vm.entityExt.permission = config.constant.prj_permission.viewer)
					}),
				a.$on(config.constant.event_names.on_task_trash,
					function(b, c) {
						c.tid === t.task.tid && (t.task.is_deleted = 1, a.root_vm.entityExt.permission = config.constant.prj_permission.viewer)
					}),
				a.$on(config.constant.event_names.on_task_comment,
					function(a, c) {
						c.tid === t.task.tid && (t.task.badges.comment_count += 1, b.$broadcast(config.constant.event_names.on_task_update, t.task))
					}),
				a.$on(config.constant.event_names.on_task_badges_file,
					function(a, b) {
						t.task.tid === b.file.formData.tid && (_.isArray(t.task.files) ? t.task.files.push(b.file) : t.task.files = [b.file], _.isArray(t.task.files) && (t.task.badges.file_count = t.task.files.length))
					}),
				a.$on(config.constant.event_names.on_task_expire_date,
					function(a, b) {
						t.task && b.tid === t.task.tid && x(t.task)
					}),
				a.$on(config.constant.event_names.on_task_badges_check,
					function(a, b) {
						t.task && b.tid === t.task.tid && x(t.task)
					}),
				a.$on(config.constant.event_names.shortcut_key_to_edit,
					function(a) {
						_.isEmpty(t.task) || t.js_show_editor(t.task)
					}),
				a.$on(config.constant.event_names.shortcut_key_to_cancel,
					function(a) {
						t.temp.is_edit ? t.js_cancel_editor(t.task) : h.isOpened && h.close()
					}),
				t.js_show_editor = function(a) {
					t.checkEntityPermission() && (t.temp.is_edit = !0, _.isEmpty(t.temp.name) && (t.temp.name = a.name), _.isEmpty(t.temp.desc) && (t.temp.desc = a.desc))
				},
				t.js_cancel_editor = function(a) {
					t.temp.is_edit = !1,
						a.shouldBeOpen = !1,
						t.temp.name = "",
						t.temp.desc = ""
				},
				t.js_set_update = function(a, c) {
					if(c.is_saving !== !0) {
						if(_.isEmpty(t.temp.name)) return void(t.temp.name = c.name);
						if(c.name === t.temp.name && c.desc === t.temp.desc) return void(t.temp.is_edit = !1);
						c.is_saving = !0,
							wt.data.task.update(t.pid, s, t.temp.name, t.temp.desc,
								function() {
									t.temp.is_edit = !1,
										c.name = t.temp.name,
										c.desc = t.temp.desc,
										t.temp.name = "",
										t.temp.desc = "",
										c.update_date = Date.now(),
										b.$broadcast(config.constant.event_names.on_task_update, c)
								},
								function(a) {
									switch(1 * a.code) {
										case 7045:
											config.msg.error(o.instant("task.name_too_large"));
											break;
										case 7046:
											config.msg.error(o.instant("task.desc_too_large"));
											break;
										default:
											config.msg.error(o.instant("task.save_fail"))
									}
								},
								function() {
									c.is_saving = !1
								})
					}
				},
				t.js_show_datepicker = function(c, e) {
					a.project && 1 === a.project.archived || 1 !== e.archived && d.popbox({
						target: c,
						templateUrl: "/ycjs/directive/datepicker/pop_task_datepicker.html",
						controller: ["$scope", "popbox",
							function(a, c) {
								a.popbox = c,
									e.expire_date ? e.expire_date_temp = moment(e.expire_date).format("YYYY-MM-DD HH:mm") : e.expire_date_temp = moment().format("YYYY-MM-DD") + " 23:59",
									a.task = e,
									a.js_close = function() {
										c.close()
									},
									a.js_today = function() {
										var b = moment().format("YYYY-MM-DD");
										a.set_expire(b)
									},
									a.js_tomorrow = function() {
										var b = moment().add(1, "days").format("YYYY-MM-DD");
										a.set_expire(b)
									},
									a.js_week = function() {
										var b = moment().endOf("week").format("YYYY-MM-DD");
										a.set_expire(b)
									},
									a.js_next_week = function() {
										var b = moment().add(7, "days").endOf("week").format("YYYY-MM-DD");
										a.set_expire(b)
									},
									a.js_month = function() {
										var b = moment().endOf("month").format("YYYY-MM-DD");
										a.set_expire(b)
									},
									a.js_set_expire = function(b) {
										a.set_expire(b)
									},
									a.js_cancel_expire = function() {
										e.expire_date = 0,
											e.badges.expire_date = 0,
											wt.data.task.set_expire(t.pid, s, 0,
												function(a) {
													e.update_date = Date.now(),
														b.$broadcast(config.constant.event_names.on_task_expire_date, e),
														b.$broadcast(config.constant.event_names.on_task_update, e),
														c.close()
												},
												function() {
													config.msg.error(o.instant("task.expire_cancel_fail"))
												})
									},
									a.set_expire = function(a) {
										var d = 0;
										d = "00:00" === moment(a).format("HH:mm") ? moment(a).endOf("day").valueOf() : moment(a).valueOf(),
											wt.data.task.set_expire(t.pid, s, d,
												function(a) {
													e.expire_date = d,
														e.update_date = Date.now(),
														b.$broadcast(config.constant.event_names.on_task_expire_date, e),
														b.$broadcast(config.constant.event_names.on_task_update, e),
														c.close()
												},
												function() {
													config.msg.error(o.instant("task.expire_set_fail"))
												})
									}
							}
						]
					}).open()
				},
				t.js_show_todo = function(a) {
					a.is_todo_edit = !0,
						a.is_add_todo_edit = !0
				},
				t.js_cancel_todo_editor = function(a) {
					a.is_todo_edit = !1
				},
				t.js_show_todo_editor = function(a) {
					t.checkEntityPermission() && (a.is_todo_edit = !0, u = a.name)
				},
				t.js_show_add_todo_editor = function(a) {
					a.is_add_todo_edit = !0
				},
				t.js_cancel_add_todo_editor = function(a) {
					a.is_todo_edit = !1,
						a.is_add_todo_edit = !1
				},
				t.js_add_todo = function(a, b) {
					return _.isUndefined(b) || _.isUndefined(b.temp_name) || _.isEmpty(b.temp_name) ? void(a.is_add_todo_edit = !1) : (b.is_saving = !0, void w(a, b,
						function() {
							$(".new-todo-control").find("textarea").focus(),
								b.is_saving = !1
						}))
				},
				t.js_save_todo = function(a, b) {
					return _.isEmpty(b.name) ? (b.is_todo_edit = !1, void(b.name = u)) : u === b.name ? void(b.is_todo_edit = !1) : (b.is_saving = !0, t.task.update_date = Date.now(), void wt.data.task.update_todo(t.pid, s, b.todo_id, b.name, b.pos,
						function(a) {
							b.name = a.data.name
						},
						null,
						function() {
							b.is_saving = !1,
								b.is_todo_edit = !1
						}))
				},
				t.js_keydown_edit_todo = function(a, b, c) {
					if(!a.isPropagationStopped()) {
						var d = a.which || a.keyCode;
						d === config.constant.keyASCIIs.ESC ? (t.js_cancel_todo_editor(c), a.stopPropagation()) : d === config.constant.keyASCIIs.ENTER && t.js_save_todo(a, c),
							a.preventDefault()
					}
				},
				t.js_keydown_add_todo = function(a, b, c) {
					if(!a.isPropagationStopped()) {
						var d = a.which || a.keyCode;
						d === config.constant.keyASCIIs.ESC ? (t.js_cancel_add_todo_editor(b), a.stopPropagation()) : d === config.constant.keyASCIIs.ENTER && t.js_add_todo(b, c),
							a.preventDefault()
					}
				},
				t.js_remove_label = function(a) {
					t.task.labels = _.reject(t.task.labels,
							function(b) {
								return b.name === a.name
							}),
						t.task.update_date = Date.now(),
						wt.data.task.del_labels(t.pid, s, a.name,
							function() {})
				},
				t.js_del_todo = function(a, c) {
					a.todos = _.reject(a.todos,
							function(a) {
								return a.todo_id === c.todo_id
							}),
						a.update_date = Date.now(),
						wt.data.task.del_todo(t.pid, s, c.todo_id,
							function(a) {}),
						a = x(a),
						0 === a.todos.length && (a.is_todo_edit = !1),
						c.is_todo_edit = !1,
						0 === a.todos.length && (a.is_todo_edit = !1),
						b.$broadcast(config.constant.event_names.on_task_update, a)
				},
				t.js_complete_todo = function(a, c) {
					if(t.checkEntityPermission()) {
						var d = c.todo_id;
						a.update_date = Date.now(),
							c.checked ? (c.checked = 0, wt.data.task.uncomplete_todo(t.pid, s, d,
								function(a) {})) : (c.checked = 1, wt.data.task.complete_todo(t.pid, s, d,
								function(a) {})),
							a = x(a),
							b.$broadcast(config.constant.event_names.on_task_update, a)
					}
				},
				t.js_toggle_watch = function(a, b, c) {
					c.update_date = Date.now(),
						wt.bus.watch.set_watcher_toggle(t.pid, c, config.constant.xtype.task, c.tid, b)
				},
				t.js_watch_all = function(a, b, c, d) {
					c.update_date = Date.now(),
						wt.bus.watch.watch_all(t.pid, c, config.constant.xtype.task, c.tid, b, null, null, d)
				},
				t.js_toggle_member = function(a, c, d) {
					d.update_date = Date.now(),
						wt.bus.member.set_task_member_toggle(t.pid, d, c,
							function() {
								b.$broadcast(config.constant.event_names.on_task_update, d)
							})
				},
				t.js_remove_member = function(a, b, c) {
					c.update_date = Date.now(),
						wt.data.task.unassign(t.pid, c.tid, b.uid,
							function() {
								c.members = _.reject(c.members,
									function(a) {
										return a.uid === b.uid
									})
							})
				},
				t.js_remove_watcher = function(a, b, c) {
					c.update_date = Date.now(),
						wt.data.unwatch(t.pid, config.constant.xtype.task, c.tid, b.uid,
							function() {
								c.watchers = _.reject(c.watchers,
									function(a) {
										return a.uid === b.uid
									})
							})
				},
				t.js_assign_label = function(b, c) {
					var e = a;
					d.popbox({
						target: b,
						template: '<wt-set-task-labels task="task" project="project"></wt-set-task-labels>',
						controller: ["$scope", "popbox",
							function(a, b) {
								a.popbox = b,
									a.task = c,
									a.project = e.project
							}
						]
					}).open()
				},
				t.js_show_entry_menu = function(c, e) {
					c.stopPropagation(),
						d.popbox({
							target: c,
							templateUrl: "/tpl/project/task/pop_unarchive_task.html",
							controller: "popUnarchiveTaskCtrl",
							resolve: {
								pop_data: function() {
									return {
										scope: a,
										task: e,
										fnSuccess: function(a) {
											b.$broadcast(config.constant.event_names.on_task_unarchived, a),
												h.close()
										}
									}
								}
							}
						}).open()
				},
				a.$on(config.constant.event_names.on_pastefile_to_task,
					function(a, b) {
						t.js_files_select(b)
					}),
				a.$on(config.constant.event_names.on_file_add,
					function(a, b) {
						b && "task" === b.type && b.ext.tid === t.task.tid && (_.isArray(t.task.files) ? t.task.files.push(b.file) : t.task.files = [b.file], t.task.badges.file_count = t.task.files.length)
					}),
				t.js_uploadbylink_uploading = !1,
				t.js_uploadbylink = function(a) {
					if(_.isEmpty(t.uploadlink_url) || !config.validator.isUrl(t.uploadlink_url)) return config.msg.warn(o.instant("common.uploadbylink_err_link_valid")),
						void $(a.target).prev().focus();
					t.js_uploadbylink_uploading = !0;
					var b = _.extend({
						link: escape(t.uploadlink_url)
					}, {
						target: "prj",
						type: "task",
						pid: t.pid,
						tid: t.task.tid
					});
					wt.data.file.uploadlink(t.uploadlink_option.url(), b,
						function(b) {
							8100 === b.code && config.msg.warn(o.instant("common.uploadbylink_err_file_too_large")),
								200 === b.code && (t.task.update_date = Date.now(), f.file.new_upload(b,
									function() {
										t.uploadlink_url = "",
											$(a.target).parents(".open").removeClass("open"),
											config.msg.info(o.instant("common.uploadbylink_success"))
									}))
						},
						function() {
							config.msg.warn(o.instant("common.uploadbylink_fail"))
						},
						function() {
							t.js_uploadbylink_uploading = !1
						})
				},
				t.js_go_to_file = function(a, b) {
					h.openFile(a, b)
				},
				t.js_del_attachment = function(a, c) {
					wt.data.file.detach(t.pid, "tasks", s, c.fid,
						function(a) {
							t.task.update_date = Date.now(),
								t.task.badges.file_count--;
							var d = _.find(t.task.files, {
								fid: c.fid
							});
							d && (t.task.files = _.reject(t.task.files,
									function(a) {
										return a.fid === c.fid
									})),
								b.$broadcast(config.constant.event_names.on_task_update, t.task)
						})
				},
				t.js_go_to_tasks = function() {
					b.global.leftmenu_current_expand = "",
						h.close(),
						c.path("/project/" + t.pid + "/task", {
							reload: !0
						})
				},
				t.js_files_select = function(b) {
					if(0 !== b.length) {
						var c = [];
						_.forEach(b,
								function(b) {
									c.push({
										original: b,
										data: {
											target: "prj",
											type: "task",
											pid: a.project.pid,
											tid: t.task.tid
										}
									})
								}),
							j.addFiles(a.project.pid, c,
								function(a, b) {
									b && b.file && "task" === b.type && (_.isArray(t.task.files) ? t.task.files.push(b.file) : t.task.files = [b.file], t.task.update_date = Date.now(), t.task.badges.file_count = t.task.files.length)
								})
					}
				},
				t.js_toggle_fullscreen = function(a) {
					t.is_fullscreen = !t.is_fullscreen,
						k.parents(".slide-content").data("skipLoadOnce", !0),
						t.is_fullscreen ? k.parents(".slide-content").addClass("none") : k.parents(".slide-content").removeClass("none"),
						e(function() {
								if(a) {
									var b = "I" === a.target.tagName ? $(a.target).parent() : $(a.target);
									b.blur()
								}
							},
							40)
				},
				a.$on(config.constant.event_names.page_go_full_screen,
					function(a) {
						t.js_toggle_fullscreen()
					})
		
	}])
	/**************************************************************************************************************
 	 *
 	 **************************************************************************************************************/
 	 
 	 /**************************************************************************************************************
 	 *
 	 **************************************************************************************************************/
	;
});