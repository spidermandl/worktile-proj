/**
 * @ngdoc function
 * @name jtWorkApp.service:globalDataContext
 * @description
 * 全局缓存数据 service
 * Controller of the jtWorkApp
 */
define(['app'], function (app) {
 	'use strict';

	app.service('globalDataContext', ['$http','api','$rootScope','localStorageService',
				'$state','config','$q','$translate',
		function ($http,api,$rootScope,localStorageService,
				$state,config,$q,$translate) {
			/**
			 *用户登出
			 */
			$rootScope.logout = function(){
				api.me_logout(
					function(data){
						localStorageService.set('token',null);
						$rootScope.bind =false;
						//$rootScope.global = null;
						$state.go('home');
					},
					function(error){
					}
				);
			};
			/**
			 * 用户是否登录flag
			 */
			$rootScope.bind = false;
			/**
			 * 用户是否登录
			 */
			$rootScope.isLogin = function(){
				return this.bind;
			};

			/**
			 * 全局上下文数据 设置到rootScope的global中
			 * loadAll 的返回值
			 */
			var context = {
				frame :null, //首页面类型 work or guest

				//加载等待阶段
				loading_init : false,//屏幕遮罩
				i18n_loading_done : true,
				//左控制栏
				header_menu : '',
				leftmenu_current_expand : '',//当前展开的面板
				//loading_done : true,

				me : null,//用户基本信息

				constant : config.constant,//常量
				prj_module : config.constant.prj_module,
				team_module: config.constant.team_module,
				
			};
			/**
			 * 服务放回对象
			 */
			var globalDataContext = {
				f : 5,
				g : 5,
				h : 5,


				contacts : [],
				teams : [],
				projects : [],
				star_projects : [],
				recent_open : [],
				recent_members : [],
				recent_projects : [],
				project_abstracts : null,
				project : {
					info: null,
					pid: "",
					entries: [],
					tasks: [],
					navigations: [],
					cal_events: [],
					cal_events_start: void 0,
					cal_events_end: void 0,
					events: []
				},
			   /**
				* 缓存
				**/
                cache: {
					project: {
						updateFull: function(a) {
							a.pid === i.project.info.pid && (i.project.info.name = a.name, i.project.info.desc = a.desc, i.project.info.archived = a.archived, i.project.info.pic = a.pic, i.project.info.bg = a.bg, i.project.info.is_star = a.is_star, i.project.info.curr_role = a.curr_role, i.project.info.permission = a.permission);
							var b = _.find(i.projects, {
								pid: a.pid
							});
							b && (b.name = a.name, b.desc = a.desc, b.archived = a.archived, b.pic = a.pic, b.bg = a.bg, b.is_star = a.is_star, b.curr_role = a.curr_role, b.permission = a.permission)
						},
						update: function(a, b, c, d, e, f) {
							a === i.project.info.pid && (i.project.info.name = b, i.project.info.bg = c, i.project.info.pic = d, i.project.info.desc = e, i.project.info.visibility = f);
							var g = _.find(i.projects, {
								pid: a
							});
							g && (g.name = b, g.bg = c, g.pic = d, g.desc = e, g.visibility = f)
						},
						set_logo: function(a, b, c) {
							wt.data.project.set_logo(a, b, c,
								function() {
									a === i.project.info.pid && (i.project.info.bg = b, i.project.info.pic = c);
									var d = _.find(i.projects, {
										pid: a
									});
									d && (d.bg = b, d.pic = c)
								})
						},
						change_extensions: function(a, c, d, e, f) {
							wt.bus.project.get_extensions(e,
								function(f) {
									if(0 === d && (e = _.reject(e, {
											eid: c.eid
										})), 1 === d) {
										e = _.sortBy(e, "pos");
										var g = _.last(e);
										e.push({
											eid: c.eid,
											type: 1,
											join_date: moment().valueOf(),
											pos: 2 * g.pos
										})
									}
									a === i.project.info.pid && 1 === c.type && (i.project.info.navigations = _.filter(f, {
										type: 1,
										enable: 1
									}));
									var h = _.find(i.projects, {
										pid: a
									});
									h && 1 === c.type && (h.navigations = _.filter(f, {
											type: 1,
											enable: 1
										})),
										b.$broadcast(config.constant.event_names.project_extensions_change, {
											extensions: e
										})
								})
						},
						extension_change_pos: function(a, c, d, e) {
							wt.data.project.extension_change_pos(a, c, d,
								function(d) {
									if(a === i.project.info.pid && 1 === c.type) {
										var f = _.find(i.project.info.navigations, {
											eid: c.eid
										});
										f.pos = d.data;
										var g = _.find(i.project.info.extensions, {
											eid: c.eid
										});
										g.pos = d.data,
											i.project.info.extensions = _.sortBy(i.project.info.extensions, "pos"),
											b.$broadcast(config.constant.event_names.project_extensions_change, {
												extensions: i.project.info.extensions
											})
									}
									e(d)
								})
						},
						add: function(a) {
							var b = _.find(i.projects, {
								pid: a.pid
							});
							b || i.projects.push(a),
								i.setTeamProjects()
						},
						remove: function(a) {
							if(i.cache.recent_open.remove("project", a), i.cache.star_projects.remove(a), a === i.project.info.pid && (_.findIndex(i.star_projects, {
									pid: a
								}) !== -1 && i.cache.project.set_star(a), i.clearProject()), i.projects && i.projects.length > 0) {
								var b = _.findWhere(i.projects, {
									pid: a
								});
								b && 1 === b.is_star && i.cache.project.set_star(a),
									i.projects = _.reject(i.projects,
										function(b) {
											return b.pid === a
										}),
									i.setTeamProjects()
							}
						},
						shift: function(a, d) {
							if(i.project.info && i.project.info.pid === a) {
								i.project.info.team_id = d,
									i.project.info.visibility === config.constant.prj_visibility.protected && d === -1 && (i.project.info.visibility = config.constant.prj_visibility.private);
								var e = _.find(i.teams, {
									team_id: d
								});
								e && (i.project.info.team = {
										team_id: e.team_id,
										name: e.name,
										status: e.status,
										is_owner: e.is_owner,
										edition: e.edition
									}),
									d === -1 && (i.project.info.team = {
											team_id: -1,
											is_owner: 0
										},
										$translate.use(b.global.me.locale).then(function() {
											i.project.info.team.name = $translate.instant("projects.project_type_name_personal")
										}))
							}
							var f = _.find(i.projects, {
								pid: a
							});
							f && (f.team_id = d, f.visibility === config.constant.prj_visibility.protected && d === -1 && (f.visibility = config.constant.prj_visibility.private), i.setTeamProjects())
						},
						add_admin: function(a, b) {
							if(i.projects && i.projects.length > 0) {
								var c = _.find(i.projects, {
									pid: a
								});
								if(c) {
									var d = _.find(c.admins, {
										uid: b.uid
									});
									d || c.admins.push(b)
								}
							}
						},
						remove_admin: function(a, b) {
							if(i.projects && i.projects.length > 0) {
								var c = _.find(i.projects, {
									pid: a
								});
								c && (c.admins = _.reject(c.admins,
									function(a) {
										return a.uid === b.uid
									}))
							}
						},
						set_star: function(a) {
							i.getProject(a, !1, !1).then(function(c) {
								return 1 === c.archived ? result : (c.is_star = c.is_star ? 0 : 1, void wt.data.project.set_prefs(c.pid, "is_star", c.is_star,
									function(d) {
										i.project.info && a === i.project.info.pid && (i.project.info.is_star = c.is_star, i.project.info.star_pos = d.data),
											c.is_star ? i.cache.star_projects.add(c) : i.cache.star_projects.remove(a),
											b.$broadcast(config.constant.event_names.project_star_change, {
												pid: a,
												star_pos: d.data
											})
									},
									function() {
										c.is_star = c.is_star ? 0 : 1
									}))
							})
						},
						set_favorite: function(a, b) {
							i.project.info && a === i.project.info.pid && (i.project.info.is_favorite = b);
							var c = _.find(i.projects, {
								pid: a
							});
							c && (c.is_favorite = b)
						},
						label_remove: function(a, b) {
							if(i.project && i.project.pid === a) {
								var c = _.filter(i.project.tasks,
										function(a) {
											return a.labels.length > 0
										}),
									d = _.map(c, "tid");
								_.each(d,
									function(a) {
										var c = _.find(i.project.tasks, {
											tid: a
										});
										c.labels = _.reject(c.labels,
											function(a) {
												return a.name === b
											})
									});
							}
						},
						member_remove: function(a, b) {
							var c = _.find(i.projects, {
								pid: a
							});
							c && c.members && _.remove(c.members, {
									uid: b
								}),
								i.project.pid == a && i.project.info && i.project.info.members && (_.remove(i.project.info.members, {
									uid: b
								}), _.forEach(i.project.tasks,
									function(a) {
										_.remove(a.members, {
												uid: b
											}),
											_.remove(a.watchers, {
												uid: b
											})
									}))
						},
						label_rename: function(a, b) {
							if(i.project && i.project.pid === a) {
								var c = _.filter(i.project.tasks,
										function(a) {
											return a.labels.length > 0
										}),
									d = _.map(c, "tid");
								_.each(d,
									function(a) {
										var c = _.find(i.project.tasks, {
											tid: a
										});
										$(c.labels).each(function(a, c) {
											c.name === b.name && (c.desc = b.desc)
										})
									})
							}
						}
					},
					star_projects: {
						add: function(a) {
							i.star_projects.push(a)
						},
						remove: function(a) {
							i.star_projects = _.reject(i.star_projects, {
								pid: a
							})
						}
					},
					recent_open: {
						get: function() {
							var a = [];
							return config.localData.get("quickswitch_recentOpen") ? (a = JSON.parse(config.localData.get("quickswitch_recentOpen")), _.each(a,
								function(a) {
									a.is_current = !1
								}), a) : a
						},
						add: function(a, b) {
							switch(a) {
								case "member":
									var c = {
										uid: b.uid,
										name: b.name,
										display_name: b.display_name,
										avatar: b.avatar
									};
									_.findIndex(globalDataContext.recent_open, {
											uid: b.uid
										}) === -1 ? 
											globalDataContext.recent_open.unshift(c) 
											: 
											(globalDataContext.recent_open = _.reject(globalDataContext.recent_open, {
												uid: b.uid
											}), 
											globalDataContext.recent_open.unshift(c)),
											globalDataContext.cache.recent_members._add(b);
									break;
								case "project":
									_.findIndex(globalDataContext.recent_open, {
										pid: b.pid
									}) !== -1 && 
									(globalDataContext.recent_open = _.reject(globalDataContext.recent_open, {
										pid: b.pid
									}));
									var d = {
										pid: b.pid,
										name: b.name,
										bg: b.bg,
										pic: b.pic
									};
									globalDataContext.recent_open.unshift(d),
										globalDataContext.cache.recent_projects._add(d)
							}
							globalDataContext.recent_open = globalDataContext.recent_open.slice(0, globalDataContext.f),
							config.localData.set("quickswitch_recentOpen", JSON.stringify(globalDataContext.recent_open))
						},
						remove: function(a, b) {
							switch(a) {
								case "member":
									globalDataContext.recent_open = _.reject(globalDataContext.recent_open, {
											uid: b
										}),
										globalDataContext.cache.recent_members._remove(b);
									break;
								case "project":
									globalDataContext.recent_open = _.reject(globalDataContext.recent_open, {
											pid: b
										}),
										globalDataContext.cache.recent_projects._remove(b)
							}
							return config.localData.set("quickswitch_recentOpen", JSON.stringify(globalDataContext.recent_open)),
								globalDataContext.recent_open
						}
					},
					recent_projects: {
						get: function() {
							var a = [];
							return config.localData.get("quickswitch_recentProject") ? 
								(a = JSON.parse(config.localData.get("quickswitch_recentProject")), _.each(a,
									function(a) {
										a.is_current = !1
									}), a) 
								: 
								a
						},
						_add: function(a) {
							_.findIndex(globalDataContext.recent_projects, {
									pid: a.pid
								}) !== -1 && 
									(globalDataContext.recent_projects = _.reject(globalDataContext.recent_projects, {
									pid: a.pid
								})),
								globalDataContext.recent_projects.unshift(a),
								globalDataContext.recent_projects = globalDataContext.recent_projects.slice(0, globalDataContext.h),
								config.localData.set("quickswitch_recentProject", 
									JSON.stringify(globalDataContext.recent_projects))
						},
						_remove: function(a) {
							globalDataContext.recent_projects = _.reject(globalDataContext.recent_projects, {
									pid: a
								}),
								config.localData.set("quickswitch_recentProject", JSON.stringify(globalDataContext.recent_projects))
						}
					},
					recent_members: {
						get: function() {
							var a = [];
							return config.localData.get("quickswitch_recentMember") ? 
								(a = JSON.parse(config.localData.get("quickswitch_recentMember")), _.each(a,
								function(a) {
									a.is_current = !1
								}), a) : a
						},
						_add: function(a) {
							_.findIndex(globalDataContext.recent_members, {
									pid: a.uid
								}) !== -1 && (globalDataContext.recent_members = _.reject(globalDataContext.recent_members, {
									pid: a.uid
								})),
								globalDataContext.recent_members.unshift(a),
								globalDataContext.recent_members = globalDataContext.recent_members.slice(0, g),
								config.localData.set("quickswitch_recentMember", JSON.stringify(globalDataContext.recent_members))
						},
						_remove: function(a) {}
					},
					team: {
						dismiss: function(a) {
							var b = i.getTeam(a);
							i.teams.splice(i.teams.indexOf(b), 1),
								i.projects = _.reject(i.projects,
									function(b) {
										return b.team_id === a
									}),
								i.setTeamProjects()
						},
						sync: function(a, b) {
							var c = i.getTeam(a);
							_.map(b,
								function(a, b) {
									void 0 !== c[b] && (c[b] = a)
								})
						},
						remove_member: function(a, b) {
							var c = _.find(i.teams, {
								team_id: a
							});
							c && (c.member_count = c.member_count - 1);
							var d = _.reject(i.projects,
								function(b) {
									return b.team_id === a
								});
							_.forEach(d,
								function(a) {
									a.member_count = a.member_count - 1,
										a.members && (a.members = _.reject(a.members, {
											uid: b
										})),
										a.pid == i.project.pid && (i.project.info.members = _.reject(i.project.info.members, {
											uid: b
										}), _.forEach(i.project.tasks,
											function(a) {
												a.members = _.reject(a.members, {
													uid: b
												})
											}))
								})
						},
						leave: function(a) {
							i.teams = _.reject(i.teams,
									function(b) {
										return b.team_id === a
									}),
								i.projects = _.reject(i.projects,
									function(b) {
										return b.team_id === a
									})
						},
						update_base: function(a, b, c, d) {
							var e = _.find(i.teams, {
								team_id: a
							});
							e && (e.name = b, e.desc = c, e.url = d)
						},
						set_logo: function(a, b) {
							var c = _.find(i.teams, {
								team_id: a
							});
							c && (c.pic = b)
						},
						update_visibility: function(a, b) {
							var c = _.find(i.teams, {
								team_id: a
							});
							c && (c.visibility = b)
						}
					},
					task: {
						add: function(a) {
							if(null !== i.project.info && a.pid === i.project.info.pid) {
								var b = _.find(i.project.tasks, {
									tid: a.tid
								});
								b || i.project.tasks.push(a);
								var c = _.find(i.project.entries, {
									entry_id: a.entry_id
								});
								c && c.tasks && !_.find(c.tasks, {
									tid: a.tid
								}) && c.tasks.push(a)
							}
						},
						batch_add: function(a) {
							if(null !== i.project.info && a[0].pid === i.project.info.pid) {
								var b = _.find(i.project.entries, {
									entry_id: a[0].entry_id
								});
								_.each(a,
									function(a) {
										i.project.tasks.push(a),
											b && b.tasks && (b.tasks.push(a), b.tasks = _.sortBy(b.tasks,
												function(a) {
													return a.pos
												}))
									})
							}
						},
						set_expire: function(a, b) {
							var c = _.find(i.project.tasks, {
								tid: a
							});
							c && (c.expire_date = b, c.update_date = Date.now(), c.badges.expire_date = b)
						},
						move: function(a, b, c, d) {
							var e = _.find(i.project.entries, {
								entry_id: d
							});
							if(e) {
								var f = _.find(i.project.tasks, {
									tid: a
								});
								f.pos = b,
									f.update_date = Date.now(),
									c !== d && (f.entry_id = d)
							}
						},
						del: function(a) {
							var b = _.find(i.project.tasks, {
								tid: a
							});
							if(b) {
								b.is_deleted = !0,
									b.update_date = Date.now();
								var c = _.find(i.project.entries, {
									entry_id: b.entry_id
								});
								c && c.tasks && (c.tasks = _.reject(c.tasks,
									function(b) {
										return b.tid === a
									}))
							}
							return i.project.tasks = _.reject(i.project.tasks,
									function(b) {
										return b.tid === a
									}),
								i.project.tasks
						},
						archive: function(a) {
							var b = _.find(i.project.tasks, {
								tid: a
							});
							if(b) {
								b.archived = !0,
									b.update_date = Date.now();
								var c = _.find(i.project.entries, {
									entry_id: b.entry_id
								});
								c && c.tasks && (c.tasks = _.reject(c.tasks,
									function(b) {
										return b.tid === a
									}))
							}
							return i.project.tasks = _.reject(i.project.tasks,
									function(b) {
										return b.tid === a
									}),
								i.project.tasks
						},
						batch_archive: function(a) {
							_.each(a,
								function(a) {
									i.cache.task.archive(a)
								})
						},
						complete: function(a, b) {
							var c = _.find(i.project.tasks, {
								tid: a
							});
							c && (c.completed = b, c.update_date = Date.now())
						},
						lock: function(a, b) {
							var c = _.find(i.project.tasks, {
								tid: a
							});
							c && (c.is_locked = b, c.update_date = Date.now())
						},
						update_full: function(a) {
							var b = _.find(i.project.tasks, {
								tid: a.tid
							});
							if(b) {
								b.name = a.name,
									b.desc = a.desc,
									b.pos = a.pos,
									b.completed = a.completed,
									b.is_expire = a.is_expire,
									b.expire_date = a.expire_date,
									b.update_date = a.update_date,
									b.badges = a.badges,
									b.labels = a.labels,
									b.members = a.members,
									b.watchers = a.watchers,
									b.todos = a.todos;
								var c = _.find(i.project.entries, {
									entry_id: a.entry_id
								});
								c && (b.entry_name = c.name)
							}
						}
					},
					entry: {
						add: function(a) {
							if(a.pid === i.project.pid) {
								var b = _.find(i.project.entries, {
									entry_id: a.entry_id
								});
								return b ? b : (i.project.entries.push(a), a)
							}
						},
						archive: function(a, b) {
							if(a === i.project.pid) return i.cache.entry.del(a, b)
						},
						unarchive: function(a, b, c) {
							a === i.project.pid && wt.data.entry.get_tasks(a, b,
								function(a) {
									var d = _.find(i.project.entries, {
										entry_id: b
									});
									d || i.project.entries.push(a.data.entry),
										c(i.project.entries)
								})
						},
						move: function(a, b, c) {
							if(a === i.project.pid) {
								var d = _.find(i.project.entries, {
									entry_id: b
								});
								if(d) return d.pos = c,
									i.project.entries
							}
						},
						rename: function(a, b, c) {
							if(a === i.project.pid) {
								var d = _.find(i.project.entries, {
									entry_id: b
								});
								if(d) return d.name = c,
									i.project.entries
							}
						},
						del: function(a, b) {
							if(a === i.project.pid) {
								var c = _.find(i.project.entries, {
									entry_id: b
								});
								return c && (i.project.entries = _.reject(i.project.entries,
										function(a) {
											return a.entry_id === b
										}), i.project.tasks = _.reject(i.project.tasks,
										function(a) {
											return a.entry_id === b
										})),
									i.project.entries
							}
						},
						untrash: function(a, b, c) {
							a === i.project.pid && wt.data.entry.get_tasks(a, b,
								function(a) {
									var d = _.find(i.project.entries, {
										entry_id: b
									});
									d || i.project.entries.push(a.data.entry),
										c(i.project.entries)
								})
						}
					},
					file: {
						del: function(a, b) {
							var c = _.filter(i.project.tasks,
								function(a) {
									return _.includes(a.fids, b)
								});
							_.each(c,
								function(a) {
									a.files && (a.files = _.reject(a.files, {
											fid: b
										})),
										a.fids = _.without(a.fids, b)
								})
						}
					},
					event: {
						update: function(a, b, c) {
							var d = _.find(i.project.events, {
								event_id: a.event_id
							});
							if(b === config.constant.event_update_type.one) {
								var e = _.find(i.project.cal_events, {
									id: a.event_id
								});
								d && (d = a),
									e && (e.title = a.name, e.start = moment(a.start.date).format("YYYY-MM-DD HH:MM"), e.end = moment(a.end.date).format("YYYY-MM-DD HH:MM"))
							}
							if(b === config.constant.event_update_type.follow_up) {
								var f = a.event_id,
									g = _.find(i.project.cal_events, {
										id: f
									}),
									h = moment(a.start.date) - moment(g.start),
									j = moment(a.end.date) - moment(g.end),
									k = _.filter(i.project.cal_events, {
										extend: {
											recurrence_id: a.recurrence_id
										}
									});
								k = _.filter(k,
										function(a) {
											return moment(g.start) <= moment(a.start)
										}),
									_.each(k,
										function(b) {
											b.title = a.name,
												b.extend.recurrence_id = c,
												0 != h && (b.start = moment(b.start).add(h, "milliseconds").format("YYYY-MM-DDTHH:MM")),
												0 != j && (b.end = moment(b.end).add(j, "milliseconds").format("YYYY-MM-DDTHH:MM"))
										})
							}
						},
						update_date: function(a, c, d, e, f, g, h) {
							var j = _.find(i.project.events, {
									event_id: c
								}),
								k = _.find(i.project.cal_events, {
									id: c
								});
							wt.data.event.update_date(a, c, d, e, f, g,
								function(a) {
									200 === a.code && (k && (k.start = d + "T" + e + ":00+08:00", k.end = f + "T" + g + ":00+08:00"), j && (j.start.date = parseInt(moment(d + "T" + e).format("x"), 10), j.start.time = e, j.start.time_zone = j.start.time_zone, j.end.date = parseInt(moment(f + "T" + g).format("x"), 10), j.end.time = g, j.end.time_zone = j.end.time_zone), b.$broadcast(config.constant.event_names.on_event_update_date, {
										start_date: parseInt(moment(d + "T" + e).format("x"), 10),
										end_date: parseInt(moment(f + "T" + g).format("x"), 10)
									}))
								})
						},
						trash: function(a, b) {
							var c = parseInt(b);
							switch(i.project.events = _.reject(i.project.events,
								function(b) {
									return b.event_id === a.event_id
								}), c) {
								case config.constant.event_trash_type.one:
									i.project.cal_events = _.reject(i.project.cal_events,
										function(b) {
											return b.id === a.event_id
										});
									break;
								case config.constant.event_trash_type.follow_up:
									i.project.cal_events = _.reject(i.project.cal_events,
										function(b) {
											var c = new Date(b.start).getTime();
											return c >= a.start.date && b.extend.recurrence_id === a.recurrence_id
										});
									break;
								case config.constant.event_trash_type.all:
									i.project.cal_events = _.reject(i.project.cal_events,
										function(b) {
											return b.extend.recurrence_id === a.recurrence_id
										})
							}
							return i.project.events
						}
					},
					user: {
						avatar: function(a, b) {
							j(a,
								function(a) {
									a.avatar = b
								})
						},
						update: function(a, b, c) {
							j(a,
								function(a) {
									a.display_name = b,
										a.desc = c
								})
						},
						remove: function(a) {
							i.project && i.project.info.members && i.project.info.members.length > 0 && (i.project.info.members = _.reject(i.project.info.members,
								function(b) {
									return b.uid === a
								}), i.project.tasks && i.project.tasks.length > 0 && (_.each(i.project.tasks,
								function(b) {
									b.members && b.members.length > 0 && (b.members = _.reject(b.members,
										function(b) {
											return b.uid === a
										}))
								}), b.$broadcast("socket_message_project_member_remove", {
								uid: a
							})))
						},
						change_state: function(a, c) {
							if(b.$broadcast(config.constant.event_names.member_state_change, {
									uid: a,
									state: c
								}), i.project.info) {
								var d = _.find(i.project.info.members, {
									uid: a
								});
								d && (d.online = c)
							}
							b.global.me.uid === a && (b.global.me.online = c)
						}
					}
				
                },
				/**
				 * 获取用户信息
				 */
				load_profile : function(){
					return api.me_profile(
						function(msg){
							context.me =msg.data;
							$rootScope.bind = true;
							$state.go("dashboard");
						},
						function(msg){
							context.me =null;
							$rootScope.bind = false;
							//localStorageService.set('token',null);
						}
					);
				},

				/**
				 * 加载所有缓存信息
				 **/
				loadAll :function(){
					console.log("================= global loadAll ");
					/**
					 * 判断是否需要重新登录
					 **/
					if ($rootScope.bind==false && localStorageService.get('token')==null) {
						return context;
					}

					if ($rootScope.bind) {
						return context;
					}
 
					/**
					 * 数据请求
					 */
					return this.load_profile()//加载个人信息
					.then(
						function(msg){
							console.log("================= load_profile success");
							context.me = msg.data;
							context.me.locale = 'zh-cn';
							$rootScope.bind = true;
							/**
							* 加载所有账号信息
							*/
							return $q.all([api.team_list(),api.project_list()]).
									then(
										function(msgs){
											//console.log(msgs[0].data);
											//取出team数据
											_.map(msgs[0].data,
								                function(a) {
								                    var b = globalDataContext.getTeam(a.team_id);
								                    b ? (delete b.faked, _.extend(b, a)) : 
								                    	globalDataContext.teams.push(a);
								                });
											//console.log(globalDataContext.teams);
											//取出project数据
							                globalDataContext.projects = _.sortBy(msgs[1].data,
										        function(a) {
										            return a.pos;
										        });
							                //console.log(globalDataContext.projects);
											return context;
										},
										function(msgs){
											//console.log("================= team_list failure");
											return context;
										}
									);


						},function(msg){
							console.log("================= load_profile failure");
							$rootScope.bind = false;
							localStorageService.set('token',null);
							//$state.go('home');
						}
					);
		            // if (!_.isEmpty(i.projects)) {
		            //     var c = a.defer();
		            //     c.resolve(i);
		            //     return c.promise;
		            // }
		            // return a.all([wt.data.team.get_list(), wt.data.project.get_all("active"), wt.data.notice.unread_count(), wt.data.account.get_contacts()]).then(function(a) {
		            //     return _.map(a[0].data.data,
		            //     function(a) {
		            //         var b = i.getTeam(a.team_id);
		            //         b ? (delete b.faked, _.extend(b, a)) : i.teams.push(a)
		            //     }),
		            //     i.projects = _.sortBy(a[1].data.data,
		            //     function(a) {
		            //         return a.pos
		            //     }),
		            //     i.star_projects = _.filter(i.projects,
		            //     function(a) {
		            //         return a.is_star
		            //     }),
		            //     b.global.unread_count = a[2].data.data,
		            //     i.contacts = a[3].data.data,
		            //     i.setTeamProjects(),
		            //     i
		            // },
		            // function(a) {
		            //     return i
		            // })
				},

				getTeam : function(team_id) {
					return _.find(this.teams,
						function(team) {
							return team && team.team_id === team_id;
						});
				},
				getProject : function(b, c, d) {
					var e = null != c && 0 != c,
						d = null != d && 0 != d,
						f = _.find(this.projects, function(proj){
							return proj.pid.toString()===b; 
						}),
						g = $q.defer();
					return f && e === !1 ? 
							(g.resolve(f), g.promise) 
							: 
								f && e === !0 ? 
									null == f.extensions ? 
									api.get_project_info(b).then(
										function(msg) {
											//console.log(msg);
											return f = msg.data.info,
												f.members = msg.data.members,
												d && (globalDataContext.clearProject(), 
													globalDataContext.project.pid = b, 
													globalDataContext.project.info = f),
												g.resolve(f),
												g.promise
										},
										function() {
											return null;
									}) 
									: 
									void 0 
								: 
								api.get_project_info.get(b).then(
									function(msg) {
										return msg.data.info.members = msg.data.members,
											d && (globalDataContext.clearProject(), 
												globalDataContext.project.pid = b, 
												globalDataContext.project.info = msg.data.info),
											msg.data.info
									},
									function() {
										return null;
									})
				},
				//清空项目数据
				clearProject : function() {
					this.project.info = null,
					this.project.pid = "",
					this.project.entries = [],
					this.project.tasks = [],
					this.project.navigations = [],
					this.project.files = [],
					this.project.cal_events = [],
					this.project.cal_events_start = void 0,
					this.project.cal_events_end = void 0,
					this.project.events = []
				},
				getPacketProjects : function(a) {
					var d = a;
					d instanceof Array || (d = this.projects);
					var e = [],
						f = [];
					return _.each(d,
							function(a) {
								if(config.constant.prj_module.crud & a.permission) {
									var d = _.clone(a);
									if(d.is_star) d.sort = 100,
										$translate.use($rootScope.global.me.locale).then(function() {
											d.team_name = $translate.instant("projects.project_type_name_star")
										}),
										f.push(d);
									else {
										if(globalDataContext.teams) {
											var g = _.find(globalDataContext.teams,
												function(a) {
													return a.team_id === d.team_id
												});
											$translate.use($rootScope.global.me.locale).then(function() {
													d.team_name = g ? g.name : $translate.instant("projects.project_type_name_personal")
												}),
												d.sort = g && d.team_id !== -1 ? g.create_date : 1e3
										}
										e.push(d)
									}
								}
							}),
						e = _.union(f, e),
						globalDataContext.teams ? _.sortBy(e,
							function(a) {
								return a.sort
							}) : e
				},
				// setTeamProjects = function() {
				// 	var a = _.find(i.projects, {
				// 			team_id: "-1"
				// 		}),
				// 		d = _.find(i.teams, {
				// 			team_id: "-1"
				// 		});
				// 	if(a && !d) {
				// 		var e = {
				// 			team_id: "-1"
				// 		};
				// 		$translate.use(b.global.me.locale).then(function() {
				// 				e.name = $translate.instant("projects.project_type_name_personal")
				// 			}),
				// 			i.teams.unshift(e)
				// 	}!a && d && (i.teams = _.reject(i.teams,
				// 			function(a) {
				// 				return "-1" === a.team_id
				// 			})),
				// 		_.each(i.teams,
				// 			function(a) {
				// 				a.projects = _.where(i.projects, {
				// 					team_id: a.team_id
				// 				})
				// 			})
				// },
				// loadTeam = function(a) {
				// 	var b = _.find(i.teams, {
				// 		team_id: a
				// 	});
				// 	return b ? b : wt.data.team.summary(a).then(function(a) {
				// 			return a.data.data.info
				// 		},
				// 		function() {
				// 			return null
				// 		})
				// },
				/**
				 * 获取team中且不在项目中的成员
				 */
				loadTeamMembers : function(team_id) {
					//需要重写
					return api.me_contacts(function(a) {
							return a.data.data
						},
						function() {
							return null
						})
				},
				// loadProjectMembers = function(a, b) {
				// 	return a === i.project.pid && i.project.info && !_.isEmpty(i.project.info.members) ? b(i.project.info.members) : void wt.data.project.get_members(a,
				// 		function(a) {
				// 			return b(a.data)
				// 		})
				// },
				/**
				 *加载项目 entry和task
				 */
				loadEntriesAndTasks : function(pid, b, c) {
					return this.project.pid !== pid || _.isEmpty(this.project.entries) ?
						// void wt.data.entry.get_list(pid, !1,
						// 	function(c) {
						// 		var d = c.data.entries,
						// 			e = c.data.tasks;
						// 		globalDataContext.pid = pid,
						// 		globalDataContext.project.entries = d,
						// 		globalDataContext.project.tasks = e,
						// 		b(globalDataContext.project)
						// 	},
						// 	c, null, "globalDataContext-loadEntriesAndTasks") 
						api.get_project_tasks(pid).then(
							function(c) {
								var d = c.data.entries,
									e = c.data.tasks;
								globalDataContext.pid = pid,
								globalDataContext.project.entries = d,
								globalDataContext.project.tasks = e,
								b(globalDataContext.project)
							},
							c
						)
						: b(this.project)
				},
				// reloadEntriesAndTasks = function(a, b, c) {
				// 	wt.data.entry.get_list(a, !1,
				// 		function(b) {
				// 			var d = b.data.entries,
				// 				e = b.data.tasks;
				// 			i.pid = a,
				// 				i.project.entries = d,
				// 				i.project.tasks = e,
				// 				c(i.project)
				// 		},
				// 		null, null, "globalDataContext-reloadEntriesAndTasks-" + b)
				// },
				// clearProject = function() {
				// 	i.project.info = null,
				// 		i.project.pid = "",
				// 		i.project.entries = [],
				// 		i.project.tasks = [],
				// 		i.project.navigations = [],
				// 		i.project.files = [],
				// 		i.project.cal_events = [],
				// 		i.project.cal_events_start = void 0,
				// 		i.project.cal_events_end = void 0,
				// 		i.project.events = []
				// },
				// clearEntries = function() {
				// 	i.project.entries = [],
				// 		i.project.tasks = []
				// },
				// loadEntries = function(a, b, c) {
				// 	return i.project.pid !== a || _.isEmpty(i.project.entries) ? void wt.data.entry.get_list(a, !0,
				// 		function(a) {
				// 			var c = _.sortBy(a.data.entries,
				// 				function(a) {
				// 					return a.pos
				// 				});
				// 			return b(c)
				// 		},
				// 		c, null, "globalDataContext-loadEntries") : b(i.project.entries)
				// },
				// loadTask = function(a, b, c, d, e) {
				// 	var f = null;
				// 	a !== i.project.pid || _.isEmpty(i.project.tasks) || (f = _.find(i.project.tasks, {
				// 			tid: b
				// 		})),
				// 		f ? (c && c(f), e && e()) : wt.data.task.get(a, b,
				// 			function(a) {
				// 				c(a.data)
				// 			},
				// 			d, e)
				// },
				// loadCalEvents = function(a, b, c, d, e) {
				// 	return i.project.pid === a && i.project.cal_events_start <= b && i.project.cal_events_end >= c ? d(i.project.cal_events) : void wt.data.event.get_list(a, b, c,
				// 		function(a) {
				// 			return i.project.cal_events_start = b,
				// 				i.project.cal_events_end = c,
				// 				_.each(a.data,
				// 					function(a) {
				// 						a.allDay = !1,
				// 							a.extend.recurrence_id && (a.editable = !1),
				// 							a.start.length < 25 && (a.start = moment.unix(a.start).format("YYYY-MM-DDTHH:mm"), a.end = moment.unix(a.end).format("YYYY-MM-DDTHH:mm"))
				// 					}),
				// 				i.project.cal_events = a.data,
				// 				d(i.project.cal_events)
				// 		},
				// 		e)
				// },
				// loadEvent = function(a, b, c, d, e) {
				// 	var f = null;
				// 	a !== i.project.pid || _.isEmpty(i.project.events) || (f = _.find(i.project.events, {
				// 			event_id: b
				// 		})),
				// 		f ? (c && c(f), e && e()) : wt.data.event.get(a, b,
				// 			function(a) {
				// 				200 === a.code && (i.project.events.push(a.data), c(a.data))
				// 			},
				// 			d, e)
				// },
				// reloadUnread = function() {
				// 	wt.data.notice.unread_count().success(function(a) {
				// 		i.unread_count = a.count
				// 	})
				// },
				// changeUnreadCount = function(a) {
				// 	b.global.unread_count = a
				// },
				// readNotice = function(a) {
				// 	a || (a = 1),
				// 		b.global.unread_count >= a ? b.global.unread_count = b.global.unread_count - a : b.global.unread_count = 0
				// },
				// loadProjectAbstracts = function(a) {
				// 	return i.project_abstracts ? a(i.project_abstracts) : void wt.data.project.get_all_abstracts("visible",
				// 		function(b) {
				// 			i.project_abstracts = _(b.data).map(function(a) {
				// 					return [a.pid, a]
				// 				}).zipObject().value(),
				// 				a(i.project_abstracts)
				// 		})
				// },
			};
			return globalDataContext;
		}
	]);
});









