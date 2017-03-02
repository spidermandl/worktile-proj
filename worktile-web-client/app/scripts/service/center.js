/**
 * @ngdoc function
 * @name jtWorkApp.service:center
 * @description
 */
define(['app'], function (app) {
 	'use strict';

	app.service('Center', ["$rootScope", "TeamService", "$location", "$stateParams", 
					"$window", "$log", "globalDataContext", "locator", "$timeout", 
					"$translate", "w5cValidator",  
					"ycTrack",'config',
		function (a, b, c, d, e, f, h, i, j, l, m, p,config) {
			//g: feed
			//k:"$wtNotify"
			//n:"commonW5cValidator"
			//o: "wtBroadcastService",
			a.locator = i,
			// a.returnToSignin = function() {
			// 	a.global.is_login = !1,
			// 		i.close(),
			// 		e.location.href = "/signin?return_url=" + e.location.pathname
			// },
			// a.login = function(b, d, e, f, h, i) {
			// 	wt.data.signin(b, d,
			// 		function(b) {
			// 			a.global.me = b.data.session,
			// 				a.global.is_login = !0,
			// 				config.feed_turn_on && g.connect(),
			// 				null !== e && c.path(e),
			// 				angular.isFunction(f) && f(b)
			// 		},
			// 		h, i)
			// },
			// a.logout = function(b) {
			// 	g.close(),
			// 		delete a.global.me,
			// 		a.global.is_login = !1,
			// 		wt.data.signout(function(a) {
			// 			if(!b) {
			// 				e.location.href = "/";
			// 				var c = config.localData.get("broadcast_show_id"),
			// 					d = config.localData.get("project_sidebar_status");
			// 				config.localData.clear(),
			// 					config.localData.set("broadcast_show_id", c),
			// 					config.localData.set("project_sidebar_status", d)
			// 			}
			// 		})
			// },
			// a.auth = function(b, c) {
			// 	wt.data.auth(function(d) {
			// 		200 === d.code ? 
			// 			(a.global.me = d.data.session, 
			// 				a.global.me.role = "1", 
			// 				a.global.is_login = !0, 
			// 				null !== b && "function" == typeof b && b()) 
			// 		: 
			// 		(delete a.global.me, a.global.is_login = !1, 
			// 			null !== c && "function" == typeof c && c())
			// 	})
			// },
			a.$on(config.constant.event_names.emit_filter_activity_by_type,
				function(b, c) {
					a.$broadcast(config.constant.event_names.filter_activity_by_type, {
						data: c
					})
				}),
			a.$on(config.constant.event_names.emit_filter_watch_by_type,
				function(b, c) {
					a.$broadcast(config.constant.event_names.filter_watch_by_type, {
						data: c
					})
				}),
			a.$on("$stateChangeStart",
				function(b, c, d, e, f) {
					//console.log('--------------stateChangeStart');
					null == c.need_load || c.need_load === !0 ? 
						a.global.loading_done = !1 
						: 
						a.global.loading_done = !0,
						a.global.is_outter = !!c.is_outter
				}),
			a.$on("$stateChangeSuccess",
				function(b, d, f, g, h) {
					//console.log(a.global.header_menu);
					f.pid && (a.global.current_pid = f.pid),
						a.global.header_menu = d.header_menu,
						d.project_iconmenu && (a.global.project_iconmenu = d.project_iconmenu)
						// ,
						// a.global.is_login || d.is_outter === !0 ? 
						// 	d.is_outter === !0 && angular.noop() 
						// 	:
						// 	/^\/signin/g.test(c.$$path) || (e.location.href = "/signin?return_url=" + c.$$path)
				}),
			a.$on("$stateChangeError",
				function(a, b, c, d, e, g) {
					f.debug(g)
				}),
			a.$on("$locationChangeSuccess",
				function(b, d, e, f, g) {
					a.actualLocation = c.path()
				});
			var q = {
				notice_new: function(b) {
					if(a.global.unread_count++, 
						a.$broadcast(config.constant.event_names.notice_new, b.notice), 
						"1" === a.global.me.notice_for_desktop && b && b.notice) {
						var c = b.notice;
						"task_assign" === c.template ? k.notify({
							title: l.instant("desktop_notify.new_task_title"),
							body: l.instant("desktop_notify.new_task_info", {
								sender: c.sender.display_name,
								task_name: c.data.entity.name
							}),
							notifyClick: function() {
								i.openTask(c.filter.prj, c.data.entity.eid)
							}
						}) : "task_complete" === c.template ? k.notify({
							title: l.instant("desktop_notify.task_complete_title"),
							body: l.instant("desktop_notify.task_complete_info", {
								sender: c.sender.display_name,
								task_name: c.data.entity.name
							}),
							notifyClick: function() {
								i.openTask(c.filter.prj, c.data.entity.eid)
							}
						}) : "metion_at_comment" === c.template && ("task" === c.data.target.etype ? k.notify({
							title: l.instant("desktop_notify.mention_you_title"),
							body: l.instant("desktop_notify.mention_you_info", {
								sender: c.sender.display_name,
								entity_title: l.instant("task.entity_name"),
								entity_name: c.data.target.name,
								content: c.data.entity.name
							}),
							notifyClick: function() {
								i.openTask(c.filter.prj, c.data.target.eid)
							}
						}) : "file" === c.data.target.etype ? k.notify({
							title: l.instant("desktop_notify.mention_you_title"),
							body: l.instant("desktop_notify.mention_you_info", {
								sender: c.sender.display_name,
								entity_title: l.instant("file.entity_name"),
								entity_name: c.data.target.name,
								content: c.data.entity.name
							}),
							notifyClick: function() {
								i.openFile(c.filter.prj, c.data.target.eid)
							}
						}) : "post" === c.data.target.etype ? k.notify({
							title: l.instant("desktop_notify.mention_you_title"),
							body: l.instant("desktop_notify.mention_you_info", {
								sender: c.sender.display_name,
								entity_title: l.instant("post.entity_name"),
								entity_name: c.data.target.name,
								content: c.data.entity.name
							}),
							notifyClick: function() {
								i.openPost(c.filter.prj, c.data.target.eid, !1)
							}
						}) : "page" === c.data.target.etype ? k.notify({
							title: l.instant("desktop_notify.mention_you_title"),
							body: l.instant("desktop_notify.mention_you_info", {
								sender: c.sender.display_name,
								entity_title: l.instant("page.entity_name"),
								entity_name: c.data.target.name,
								content: c.data.entity.name
							}),
							notifyClick: function() {
								i.openPage(c.filter.prj, c.data.target.eid, !1)
							}
						}) : "event" === c.data.target.etype && k.notify({
							title: l.instant("desktop_notify.mention_you_title"),
							body: l.instant("desktop_notify.mention_you_info", {
								sender: c.sender.display_name,
								entity_title: l.instant("event.entity_name"),
								entity_name: c.data.target.name,
								content: c.data.entity.name
							}),
							notifyClick: function() {
								i.openEvent(c.filter.prj, c.data.target.eid, !1)
							}
						}))
					}
				},
				project_list: function(b) {
					b.uid !== a.global.me.uid && 
						(b.owner === a.global.me.uid && 
						"remove_member" === b.action || "delete_project" === b.action ? 
							(h.cache.project.remove(b.pid), 
								h.project.info && h.project.pid === b.pid && c.path("/projects")) 
							: 
							(h.project.info && b.pid === h.project.pid && 
								"archive_project" === b.action && 
								(h.project.info.permission = kzi.constant.prj_module.view, 
									h.project.info.archived = 1, 
									a.$broadcast(kzi.constant.event_names.project_permission_change, b)), 
								h.project.info && b.pid === h.project.pid && 
								"unarchive_project" === b.action && 
								(h.project.info.archived = 0, 
									h.getProject(b.pid, !1, !1).then(function(c) {
										c && (h.project.info.permission = c.permission, 
											a.$broadcast(kzi.constant.event_names.project_permission_change, b))
											})), 
								h.reloadProjects(function(a) {
									if(h.project.info) {
										var c = _.find(a, {
											pid: b.pid
										});
										c && (h.project.info.permission = c.permission, h.project.info.archived = c.archived)
									}
								})))
				},
				project_single: function(b) {
					var c = _.find(h.projects, {
						pid: b.pid
					});
					c && b.uid !== a.global.me.uid && wt.data.project.get(b.pid,
						function(a) {
							h.project && a.pid === h.project.info.pid,
								h.cache.project.updateFull(a.data.info)
						})
				},
				team_list: function(b) {
					if(b.owner === a.global.me.uid && b.uid !== a.global.me.uid) {
						var e = _.find(h.teams, {
							team_id: b.team_id
						});
						if(e && "remove_member" === b.action) {
							h.cache.team.leave(b.team_id);
							var f = d.team_id;
							f && f === b.team_id && (kzi.constant.team_module.view_base & b.team_permission ? a.$broadcast(kzi.constant.event_names.team_member_role_change, b) : c.path("/projects"))
						} else h.reloadTeams(function() {})
					}
				},
				team_member_remove: function(a) {},
				team_member_leave: function(a) {
					_.find(h.teams, {
						team_id: a.team_id
					})
				},
				project_members: function(b) {
					h.project.info && b.pid === h.project.info.pid && b.uid !== a.global.me.uid && wt.data.project.get_members(b.pid,
						function(a) {
							h.project.info.members = a.data
						})
				},
				project_member_remove: function(b) {
					b.uid === a.global.me.uid && b.owner === a.global.me.uid || (b.owner === a.global.me.uid ? (h.cache.project.remove(b.pid), b.pid === h.project.pid && c.path("/dashboard")) : h.cache.project.member_remove(b.pid, b.owner))
				},
				project_member_role: function(b) {
					h.project.info && b.pid === h.project.info.pid && b.owner === a.global.me.uid && (h.project.info.permission = b.permission, d.pid !== b.pid || kzi.constant.prj_module.view & b.permission || c.path("/projects"), a.$broadcast(kzi.constant.event_names.project_permission_change, b));
					var e = _.find(h.projects, {
						pid: b.pid
					});
					e && b.owner === a.global.me.uid && (e.permission = b.permission, a.$broadcast(kzi.constant.event_names.project_permission_change, b))
				},
				entry_list: function(b) {
					b && h.project && h.project.info && b.pid === h.project.info.pid && b.uid !== a.global.me.uid && h.reloadEntriesAndTasks(b.pid, "fromEntryList",
						function() {
							a.$broadcast("socket_message_entry_list")
						})
				},
				entry_list_position: function(b) {
					if(h.project && null != b) {
						if(null == h.project.info) return;
						b.pid === h.project.info.pid && b.uid !== a.global.me.uid && a.$broadcast("socket_message_entry_list_update", {
							entries: h.cache.entry.move(b.pid, b.entry_id, b.pos)
						})
					}
				},
				entry_add: function(b) {
					h.project && null != b && b.pid === h.project.info.pid && b.uid !== a.global.me.uid && a.$broadcast("socket_message_entry_add", {
						entry: h.cache.entry.add({
							pid: b.pid,
							uid: b.uid,
							entry_id: b.entry_id,
							name: b.name,
							pos: b.pos
						})
					})
				},
				entry_rename: function(b) {
					h.project && null != b && b.pid === h.project.info.pid && b.uid !== a.global.me.uid && a.$broadcast("socket_message_entry_list_update", {
						entries: h.cache.entry.rename(b.pid, b.entry_id, b.name)
					})
				},
				entry_is_archive: function(b) {
					h.project && null != b && b.pid === h.project.info.pid && b.uid !== a.global.me.uid && (1 === b.archive ? a.$broadcast("socket_message_entry_list_update", {
						entries: h.cache.entry.archive(b.pid, b.entry_id)
					}) : h.cache.entry.unarchive(b.pid, b.entry_id,
						function(b) {
							a.$broadcast("socket_message_entry_list_update", {
								entries: b
							})
						}))
				},
				entry_is_trash: function(b) {
					h.project && null != b && b.pid === h.project.info.pid && b.uid !== a.global.me.uid && (1 === b.trash ? a.$broadcast("socket_message_entry_list_update", {
						entries: h.cache.entry.del(b.pid, b.entry_id)
					}) : h.cache.entry.untrash(b.pid, b.entry_id,
						function(b) {
							a.$broadcast("socket_message_entry_list_update", {
								entries: b
							})
						}))
				},
				task_single: function(b) {
					if(h.project && h.project.info && b.pid === h.project.info.pid) var c = _.find(h.project.tasks, {
						tid: b.tid
					});
					wt.data.task.get(b.pid, b.tid,
						function(d) {
							if(a.$broadcast(config.constant.event_names.on_task_update, d.data), c) {
								if(h.cache.task.update_full(d.data), 
									a.$broadcast(config.constant.event_names.on_task_badges_check, {
										tid: c.tid
									}), b.moved) {
									var e = c.entry_id;
									c.entry_id = d.data.entry_id,
										a.$broadcast(config.constant.event_names.on_task_move, {
											task: d.data,
											from_entry_id: e
										})
								}
							} else h.cache.task.add(d.data),
								a.$broadcast(config.constant.event_names.on_task_add, {
									task: d.data
								})
						})
				},
				task_lock: function(b) {
					h.project && h.project.pid === b.pid && h.cache.task.lock(b.tid, b.lock),
						b.uid !== a.global.me.uid && a.$broadcast(config.constant.event_names.on_task_lock, {
							tid: b.tid,
							lock: b.lock
						})
				},
				task_delete: function(b) {
					h.project && h.project.pid === b.pid && h.cache.task.del(b.tid),
						b.uid !== a.global.me.uid && a.$broadcast(config.constant.event_names.on_task_trash, {
							tid: b.tid
						})
				},
				task_complete: function(b) {
					h.project && h.project.pid === b.pid && h.cache.task.complete(b.tid, b.completed),
						b.uid !== a.global.me.uid && a.$broadcast(config.constant.event_names.on_task_complete, b)
				},
				task_archive: function(b) {
					h.project && h.project.pid === b.pid && h.cache.task.archive(b.tid),
						b.uid !== a.global.me.uid && a.$broadcast(config.constant.event_names.on_task_archive, b.tid)
				},
				tasks_batch_archive: function(b) {
					h.project && h.project.pid === b.pid && h.cache.task.batch_archive(b.tids),
						b.uid !== a.global.me.uid && _.each(b.tids,
							function(b) {
								a.$broadcast(config.constant.event_names.on_task_archive, b)
							})
				},
				team_member_role: function(b) {
					if(b.owner === a.global.me.uid) {
						var c = _.find(h.teams, {
							team_id: b.team_id
						});
						c && config.constant.team_module.view & b.team_permission ? (c.permission = b.team_permission, a.$broadcast(kzi.constant.event_names.team_member_role_change, b)) : c && (h.cache.team.leave(b.team_id), a.$broadcast(kzi.constant.event_names.team_member_role_change, b))
					}
				},
				comment_new: function(b) {
					a.global.me.uid !== b.uid && a.$broadcast(config.constant.event_names.on_comment_new, b)
				},
				notice_read: function(b) {
					b.owner === a.global.me.uid && ("all" === b.nid ? 
						a.global.unread_count = 0 
						: 
						a.global.unread_count = a.global.unread_count > 0 ? a.global.unread_count - 1 : 0)
				},
				weixin_bind: function(b) {
					b.owner !== a.global.me.uid || b.error ? 
						config.msg.error(l.instant("err_info.weixin_bind_err")) 
						: 
						(a.global.me.is_bind_weixin = !0, 
							a.$broadcast(config.constant.event_names.on_weixin_bind, {
							data: !0
						}))
				}
			};
					// a.global.me && ("1" === wt.me.is_new && (a.global.is_first_landing = !0, j(function() {
					// 		b.showAdd()
					// 	},
					// 	2e3), wt.data.user.set_user_old(function(b) {
					// 	a.global.is_first_landing = !1
					// })), g.onMessage(function(b) {
					// 	return q[b.args] && a.$apply(function() {
					// 		q[b.args](b.data)
					// 	}), !0
					// }), 
					// g.onPresence(function(b, c) {
					// 	return a.$apply(function() {
					// 		h.cache.user.change_state(b, c)
					// 	}), !0
					// }), config.feed_turn_on && g.connect(a.global.me.uid, a.global.me.sid);
					//var r = wt.me && "" !== wt.me.locale ? wt.me.locale : "zh-cn";
					// l.use(r).then(function() {
					// 		a.global.i18n_loading_done = !0,
					// 			"undefined" != typeof Heyoffline && new Heyoffline({
					// 				text: {
					// 					title: l.instant("err_info.offline_title"),
					// 					content: l.instant("err_info.offline_info"),
					// 					button: l.instant("err_info.offline_btns")
					// 				}
					// 			}),
					// 			n.init()
					// 	}),
					// o.check(),
						a.global.me && (p.identify(a.global.me.uid), p.track("app", "visit"))
		
			
		}
	]);
});