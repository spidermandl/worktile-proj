/**
 * @ngdoc function
 * @description
 * # Util 由bus组件演变过来
 * Controller of the jtWorkApp
 */
 define(['app'], function (app) {
    'use strict';

    app.factory("Util",["$http", "$rootScope", "$translate","config",
    	function($http, $rootScope, $translate,config){
    		//[$http, $rootScope, $translate]
    		//    a       b           c
			var d = {},
				e = function(a, b, c) {
					_.isArray(d[a]) && _.isFunction(b) ? d[a].push(b) : d[a] = [b],
						_.isEmpty(c) || c.$on("$destroy",
							function() {
								f(a, b)
							})
				},
				f = function(a, b) {
					d[a] && d[a].splice(d[a].indexOf(b), 1)
				},
				g = function(a) {
					if(_.isArray(d[a])) {
						var b = _.toArray(arguments);
						_.each(d[a],
							function(a) {
								a.apply(void 0, b.slice(1))
							})
					}
				};

    		return {
				/** 
				 *修改angularjs $http.post的默认传参方式
				 **/
				transformPostRequest : function(data){
					var param = function(obj){
						var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
			                
			            for(name in obj) {
			                value = obj[name];
			                    
			                if(value instanceof Array) {
			                    for(i=0; i<value.length; ++i) {
			                        subValue = value[i];
			                        fullSubName = name + '[' + i + ']';
			                        innerObj = {};
			                        innerObj[fullSubName] = subValue;
			                        query += param(innerObj) + '&';
			                    }
			                }
			                else if(value instanceof Object) {
			                    for(subName in value) {
			                        subValue = value[subName];
			                        fullSubName = name + '[' + subName + ']';
			                        innerObj = {};
			                        innerObj[fullSubName] = subValue;
			                        query += param(innerObj) + '&';
			                    }
			                }
			                else if(value !== undefined && value !== null)
			                    query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
			            }
			            
			            return query.length ? query.substr(0, query.length - 1) : query;
					};

					var result = angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
					return result;
				},



				/*********************************************************************************
				*
				**********************************************************************************/
				user: {
					get: function(a, b, c) {

					}
				},
				team: {
					find_add_prj_teams: function() {
						var a = _.clone(b.teams);
						if(void 0 === _.find(a, {
								team_id: "-1"
							})) {
							var d = {
								name: c.instant("bus.personal_project"),
								team_id: "-1",
								curr_role: "1"
							};
							a.unshift(d)
						}
						return a = _.filter(a,
							function(a) {
								return 1 === a.curr_role || 
										"-1" === a.team_id || 
										a.permission & b.global.team_module.add_project;
							})
					},
					get_add_prj_teams: function(a) {
						var d = _.clone(a);
						d = _.filter(d,
							function(a) {
								return a.permission & $rootScope.global.team_module.add_project;
							});
						_.find(d, {
							team_id: "-1"
						}) || d.unshift({
							name: $translate.instant("bus.personal_project"),
							team_id: "-1",
							curr_role: "1"
						});
						return d;
					},
					calculate_stats_pos: function(a, b) {
						var c = 0;
						return c = _.isUndefined(a) && !_.isUndefined(b) ? b / 2 + 1 : _.isUndefined(b) && !_.isUndefined(a) ? a + kzi.config.default_pos + 1 : _.isUndefined(b) || _.isUndefined(a) ? kzi.config.default_pos : (b + a) / 2 + 1
					}
				},
				project: {
					set_fav_toggle: function(a, b, c, d) {
						if(1 !== a.archived) {
							var e = a.is_favorite ? 0 : 1;
							a.is_favorite = e,
								wt.data.project.set_favorite(a.pid, e,
									function(a) {
										_.isFunction(b) && b(a)
									},
									function() {
										a.is_favorite = e ? 0 : 1
									})
						}
					},
					calculate_prj_pos: function(a, b) {
						var c = 0;
						return c = _.isEmpty(a) && !_.isEmpty(b) ? b.pos / 2 + 1 : _.isEmpty(b) && !_.isEmpty(a) ? a.pos + kzi.config.default_pos + 1 : _.isEmpty(b) || _.isEmpty(a) ? kzi.config.default_pos : (b.pos + a.pos) / 2 + 1
					},
					calculate_prj_star_pos: function(a, b) {
						var c = 0;
						return c = _.isEmpty(a) && !_.isEmpty(b) ? b.star_pos / 2 + 1 : _.isEmpty(b) && !_.isEmpty(a) ? a.star_pos + kzi.config.default_pos + 1 : _.isEmpty(b) || _.isEmpty(a) ? kzi.config.default_pos : (b.star_pos + a.star_pos) / 2 + 1
					},
					label: {
						load: function(a, b) {
							return _.each(b,
									function(b) {
										b.assigned = a && _.find(a.labels, {
											name: b.name
										}) ? 1 : 0
									}),
								b
						},
						set_labels: function(a, b, c, d, e, f, g, h, i, j) {
							var k = [{
								name: "blue",
								desc: b
							}, {
								name: "green",
								desc: c
							}, {
								name: "orange",
								desc: d
							}, {
								name: "purple",
								desc: e
							}, {
								name: "red",
								desc: f
							}, {
								name: "yellow",
								desc: g
							}];
							wt.data.project.set_labels(a, k,
								function() {
									h(k)
								},
								i, j)
						}
					},
					get_member_projects: function(a, b) {
						var d = [];
						return _.each(a,
								function(a) {
									if(kzi.constant.prj_module.crud & a.permission) {
										var e = _.clone(a);
										if(b) {
											var f = _.find(b,
												function(a) {
													return a.team_id === e.team_id
												});
											e.team_name = f ? f.name : c.instant("bus.personal_project"),
												e.sort = f && e.team_id !== -1 ? f.create_date : 1e3
										}
										d.push(e)
									}
								}),
							b ? _.sortBy(d,
								function(a) {
									return a.sort
								}) : d
					},
					get_extensions: function(a, d) {
						var e = config.constant.extensions,
							f = [];
						$translate.use($rootScope.global.me.locale).then(function() {
							return _.each(e,
									function(b) {
										_.each(b,
											function(b) {
												b.name = $translate.instant(b.name),
													b.desc = $translate.instant(b.desc);
												var d = _.clone(b),
													e = _.find(a, {
														eid: b.eid
													});
												e ? 
													(d.enable = 1, d.join_date = e.join_date, d.pos = e.pos) 
													: 
													d.enable = 0,f.push(d)
											})
									}),
								f = _.sortBy(f, "pos"),
								d(f)
						});
					},
					check_extension: function() {},
					get_visibilities: function(a) {
						return a == -1 ? [{
							id: config.constant.prj_visibility.private,
							name: $translate.instant("bus.prj_visibility_private_desc")
						}, {
							id: config.constant.prj_visibility.public,
							name: $translate.instant("bus.prj_visibility_public_desc")
						}] : [{
							id: config.constant.prj_visibility.private,
							name: $translate.instant("bus.prj_visibility_private_desc")
						}, {
							id: config.constant.prj_visibility.protected,
							name: $translate.instant("bus.prj_visibility_protected_desc")
						}, {
							id: config.constant.prj_visibility.public,
							name: $translate.instant("bus.prj_visibility_public_desc")
						}]
					}
				},
				entry: {
					calculate_copy_entry_pos: function(a, b) {
						for(var c = 0; c < a.length; c++)
							if(a[c].entry_id === b.entry_id) {
								if(c + 1 < a.length) {
									var d = a[c + 1].pos;
									return(d + b.pos) / 2 + 1
								}
								return b.pos + kzi.config.default_pos + 1
							}
						return b.pos + kzi.config.default_pos + 1
					},
					calculate_entry_pos: function(a, b) {
						var c = kzi.config.default_pos;
						if(!_.isEmpty(a))
							if(b) {
								var d = _.min(a,
									function(a) {
										return a.pos
									});
								_.isEmpty(d) || (c = d.pos / 2 + 1)
							} else {
								var e = _.max(a,
									function(a) {
										return a.pos
									});
								_.isEmpty(e) || (c = e.pos + kzi.config.default_pos + 1)
							}
						return c
					},
					batch_toggle_member: function(a, b, c, d, e, f) {
						var g = "",
							h = null;
						0 === c.assigned_all ? (g = "set", h = wt.data.entry.batch_assign) : (g = "unset", h = wt.data.entry.batch_unassign),
							h(a, b.entry_id, c.uid, b.selected_tasks,
								function(a) {
									c.assigned_all = 1 === c.assigned_all ? 0 : 1,
										_.each(b.tasks,
											function(a) {
												a.update_date = Date.now();
												var d = _.any(b.selected_tasks,
													function(b) {
														return b === a.tid
													});
												if(d)
													if(_.isEmpty(a.members)) a.members = [c];
													else {
														var e = _.any(a.members,
															function(a) {
																return a.uid === c.uid
															});
														e && "unset" === g && (a.members = _.remove(a.members,
																function(a) {
																	return a.uid !== c.uid
																})),
															e || "set" !== g || a.members.push(c)
													}
											}),
										_.isFunction(d) && d(a)
								},
								e, f)
					},
					batch_toggle_label: function(a, b, c, d, e, f, g) {
						var h = "",
							i = null;
						1 === d.assigned ? (h = "set", i = wt.data.entry.batch_set_label) : (h = "unset", i = wt.data.entry.batch_remove_label),
							i(a, b.entry_id, c, d.name,
								function(a) {
									_.each(b.tasks,
											function(a) {
												if(!(c.indexOf(a.tid) < 0))
													if(_.isEmpty(a.labels)) a.labels = [d];
													else {
														var b = _.any(a.labels,
															function(a) {
																return a.name === d.name
															});
														b && "unset" === h && (a.labes = _.remove(a.labels,
																function(a) {
																	return a.name === d.name
																})),
															b || "set" !== h || (a.labels.push(d), a.labels = _.sortBy(a.labels,
																function(a) {
																	return a.name
																}))
													}
											}),
										_.isFunction(e) && e(a)
								},
								f, g)
					}
				},
				task: {
					calculate_task_pos: function(a, b) {
						var c = kzi.config.default_pos;
						return b ? _.isEmpty(a.tasks) || (c = _.min(a.tasks,
								function(a) {
									return a.pos
								}).pos / 2 + 1) : _.isEmpty(a.tasks) || (c = _.max(a.tasks,
								function(a) {
									return a.pos
								}).pos + kzi.config.default_pos + 1),
							c
					},
					calculate_copy_task_pos: function(a, b) {
						for(var c = 0; c < a.tasks.length; c++)
							if(a.tasks[c].tid === b.tid) {
								if(c + 1 < a.tasks.length) {
									var d = a.tasks[c + 1].pos;
									return(d + b.pos) / 2 + 1
								}
								return b.pos + kzi.config.default_pos + 1
							}
						return b.pos + kzi.config.default_pos + 1
					},
					set_toggle_label: function(a, b, c, d) {
						var e = _.find(b.labels, {
							name: c.name
						});
						c.assigned ? (e && (b.labels = _.reject(b.labels,
							function(a) {
								return a.name === c.name
							}), b.labels = _.sortBy(b.labels,
							function(a) {
								return a.name
							})), c.assigned = 0, _.isEmpty(b.tid) || wt.data.task.del_labels(a, b.tid, c.name, d)) : e || (b.labels.push(c), c.assigned = 1, b.labels = _.sortBy(b.labels,
							function(a) {
								return a.name
							}), _.isEmpty(b.tid) || wt.data.task.set_labels(a, b.tid, c.name, d))
					},
					get_copy_task: function(a) {
						var b = {
								name: a.name,
								tid: a.tid,
								entry_id: a.entry_id,
								pos: a.pos,
								comment_count: a.badges.comment_count,
								file_count: a.badges.file_count,
								todo_count: a.badges.todo_count,
								member_count: a.members.length,
								watcher_count: a.watchers.length,
								label_count: a.labels.length
							},
							c = !1;
						return b.comment_count > 0 ? (b.keep_comments = !0, c = !0) : b.keep_comments = !1,
							b.file_count > 0 ? (b.keep_attachments = !0, c = !0) : b.keep_attachments = !1,
							b.todo_count > 0 ? (b.keep_todos = !0, c = !0) : b.keep_todos = !1,
							b.member_count > 0 ? (b.keep_members = !0, c = !0) : b.keep_members = !1,
							b.watcher_count > 0 ? (b.keep_watchers = !0, c = !0) : b.keep_watchers = !1,
							b.label_count > 0 ? (b.keep_labels = !0, c = !0) : b.keep_labels = !1,
							b.show_keeps = c,
							b
					},
					set_is_show_data: function(a, b) {
						return _.each(a,
								function(a) {
									var c = moment(a.update_date).format("YYYY-MM-DD");
									c === b ? a.is_show_date = !1 : (a.is_show_date = !0, b = c)
								}),
							b
					},
					compare_task: function(a, b) {
						if(a.expire_date > 0 && b.expire_date > 0) {
							var c = (new Date).getTime();
							return a.expire_date === b.expire_date ? 0 : a.expire_date > c && b.expire_date < c ? -1 : a.expire_date < c && b.expire_date > c ? 1 : a.expire_date > c && b.expire_date > c ? a.expire_date > b.expire_date ? 1 : -1 : a.expire_date > b.expire_date ? -1 : 1
						}
						return a.expire_date > 0 && 0 === b.expire_date ? -1 : 0 === a.expire_date && b.expire_date > 0 ? 1 : a.create_date > b.create_date ? -1 : 1
					},
					group_tasks_by_date: function(a) {
						var b = {
								today: [],
								tomorrow: [],
								week: [],
								nextweek: [],
								month: [],
								due: [],
								other: []
							},
							d = moment(),
							e = moment().add(1, "days"),
							f = moment().endOf("week"),
							g = moment().add(7, "days").endOf("week"),
							h = moment().endOf("month");
						_.each(a,
							function(a) {
								var c = moment(a.expire_date);
								c.isSame(d, "day") ? b.today.push(a) : c.isSame(e, "day") ? b.tomorrow.push(a) : c > d && c < f ? b.week.push(a) : c > d && c < g ? b.month.push(a) : c > d && c < h ? b.month.push(a) : c < d && c > 0 ? b.due.push(a) : b.other.push(a)
							});
						var i = [];
						return _.isEmpty(b.today) || i.push({
								phase: c.instant("common.today"),
								tasks: b.today
							}),
							_.isEmpty(b.tomorrow) || i.push({
								phase: c.instant("common.tomorrow"),
								tasks: b.tomorrow
							}),
							_.isEmpty(b.week) || i.push({
								phase: c.instant("common.thisweek"),
								tasks: b.week
							}),
							_.isEmpty(b.month) || i.push({
								phase: c.instant("common.thismonth"),
								tasks: b.month
							}),
							_.isEmpty(b.due) || i.push({
								phase: c.instant("common.txt_expired"),
								tasks: b.due
							}),
							_.isEmpty(b.other) || i.push({
								phase: c.instant("task.unset_expire"),
								tasks: b.other
							}),
							i
					},
					group_tasks_by_project: function(a) {
						var b = _.map(_.map(a, "project"), "pid");
						b = _.map(b,
								function(a) {
									return [a, []]
								}),
							b = _.zipObject(b),
							_.each(a,
								function(a) {
									b[a.pid].push(a)
								});
						var c = [];
						return _.each(b,
								function(a) {
									_.isEmpty(a) || c.push({
										phase: a[0].project.name,
										pic: a[0].project.pic,
										bg: a[0].project.bg,
										tasks: a
									})
								}),
							c
					}
				},
				file: {
					load_files_db: function(a, c, d, e, f, g, h, i, j) {
						wt.data.file.get_list(a, c, d, e, f,
							function(a) {
								b.folder = {
										folder_id: a.data.folder.folder_id,
										name: a.data.folder.name
									},
									_.each(a.data.files,
										function(a) {
											if(a.icon = kzi.helper.build_file_icon(a), g) {
												var c = _.find(b.project.files, {
													fid: a.fid
												});
												c || b.project.files.push(a)
											}
										}),
									h(g ? b.project : a.data)
							},
							i, j)
					},
					load_one_page_files: function(a, d) {
						_.isUndefined(d) && (d = !1),
							a.files_controls.loading_done = !1;
						var e = function(b) {
							var e = [];
							if(a.files_controls.folder_id) {
								a.files_controls.is_folder = !0,
									e = _.where(b.files, {
										folder_id: a.files_controls.folder_id
									});
								var f = _.find(a.files_controls.files, {
									fid: a.files_controls.folder_id
								});
								_.isEmpty(f) ? a.files_controls.folder_name = a.folder.name : a.files_controls.folder_name = f.name
							} else e = _.where(b.files, {
									folder_id: ""
								}),
								a.files_controls.is_folder = !1,
								a.files_controls.folder_name = c.instant("bus.file_root_folder_name");
							e.length > 0 && (d ? a.files_controls.files = e : a.files_controls.files = a.files_controls.files.concat(e)),
								e.length < 20 ? a.files_controls.has_more_files = !1 : (a.files_controls.has_more_files = !0, a.files_controls.page++),
								a.files_controls.folders = b.folders,
								a.files_controls.loading_done = !0
						};
						wt.bus.file.load_files_db(a.files_controls.pid, a.files_controls.folder_id, a.files_controls.page, a.files_controls.sort_method_id, a.files_controls.filter, !1, e,
							function() {
								kzi.msg.error(c.instant("bus.err_load_files_fail"))
							},
							function() {
								b.global.loading_done = !0
							})
					},
					new_upload: function(a, c, d, e) {
						var f = a.files[0],
							g = {};
						switch(g.target = f.formData.target, g.type = f.formData.type || "project", g.file = {
								pid: f.formData.pid,
								name: f.fname,
								ext: kzi.constant.get_ext(f.ext),
								size: f.size,
								path: f.url
							},
							f.formData.type) {
							case "task":
								g.ext = {
									tid: f.formData.tid
								};
								break;
							case "post":
								g.ext = {
									post_id: f.formData.post_id
								};
								break;
							case "file":
								g.ext = {
									fid: f.formData.fid
								};
								break;
							case "event":
								g.ext = {
									event_id: f.formData.event_id
								};
								break;
							default:
								g.ext = {
									folder_id: f.formData.folder_id
								}
						}
						wt.data.file.new_upload(f.formData.pid, g,
							function(a) {
								g.file = _.extend(g.file, f, a.data),
									g.file.icon = kzi.helper.build_file_icon(g.file),
									b.$broadcast(kzi.constant.event_names.on_file_add, g),
									_.isFunction(c) && c(a)
							},
							function(a) {
								_.isFunction(d) && d(a)
							},
							function() {
								_.isFunction(e) && e()
							})
					}
				},
				event: {
					event_to_calEvent: function(a, b) {
						var c = {
							id: a.event_id,
							title: a.name,
							allDay: 0,
							start: moment(a.start.date).format(),
							end: moment(a.end.date).format(),
							url: "",
							editable: !a.recurrence_id,
							textColor: "#fff",
							borderColor: "#fbfbfb",
							className: "cal_event slide-trigger",
							backgroundColor: b,
							extend: {
								xtype: kzi.constant.xtype.event,
								pid: a.pid,
								end: a.end.date,
								recurrence_id: a.recurrence_id
							}
						};
						return c
					}
				},
				mkEditor: {
					checkClose: function() {
						var a = $(".fullscreen-editing"),
							b = !1;
						return _.each(a,
								function(a) {
									$(a).scope().isFullscreen === !0 && ($(a).scope().cancelFullscreen(), b = !0)
								}),
							b
					}
				},
				comment: {},
				calendar: {},
				post: {},
				page: {},
				activity: {
					set_activities_show_date: function(a) {
						var b = null;
						_.each(a,
							function(a) {
								var c = moment(a.published).format("YYYY-MM-DD");
								c === b ? a.is_show_date = !1 : (a.is_show_date = !0, b = c)
							})
					}
				},
				notice: {},
				invite: {},
				feedback: {},
				watch: {
					get_scope_watcher_members: function(a, b) {
						var c = [],
							d = _.map(b, "uid");
						return _.each(a,
								function(a) {
									var b = _.clone(a);
									b.status === kzi.constant.status.ok && (_.contains(d, b.uid) ? b.watched = !0 : b.watched = !1, c.push(b))
								}),
							c
					},
					mail_convert_post_watch_toggle: function(a, b, c, d, e, f) {
						if(!c.watched) {
							var g = _.find(b.watchers, {
								uid: c.uid
							});
							return c.watched = !0,
								g || b.watchers.push(c),
								_.isFunction(d) && d(),
								void(_.isFunction(f) && f())
						}
						var g = _.find(b.watchers, {
							uid: c.uid
						});
						c.watched = !1,
							g && (b.watchers = _.reject(b.watchers,
								function(a) {
									return a.uid === c.uid
								})),
							_.isFunction(d) && d(),
							_.isFunction(f) && f()
					},
					unwatch: function(a, b, c, d, e, f, g, h) {
						wt.data.unwatch(a, c, d, e.uid,
							function(a) {
								var c = _.find(b.watchers, {
									uid: e.uid
								});
								c && (b.watchers = _.reject(b.watchers,
										function(a) {
											return a.uid === e.uid
										})),
									e.watched = !1,
									_.isFunction(f) && f(a)
							},
							g, h)
					},
					set_watcher_toggle: function(a, b, c, d, e, f, g, h) {
						var i = null;
						if(e.watched) {
							if(i = _.find(b.watchers, {
									uid: e.uid
								}), i && (b.watchers = _.reject(b.watchers,
									function(a) {
										return a.uid === e.uid
									})), e.watched = !1, !d) return _.isFunction(f) && f(),
								void(_.isFunction(h) && h());
							wt.data.unwatch(a, c, d, e.uid, f, g, h)
						} else if(i = _.find(b.watchers, {
								uid: e.uid
							}), !i) {
							if(b.watchers.push(e), e.watched = !0, !d) return _.isFunction(f) && f(),
								void(_.isFunction(h) && h());
							wt.data.watch(a, c, d, e.uid, f, g, h)
						}
					},
					watch_all: function(a, b, c, d, e, f, g, h) {
						if(b.watchers.length !== e.length)
							if(d) {
								var i = _.map(e, "uid");
								if(i.length > 50) return void kzi.msg.error("添加全部关注一次不能大于 50 人");
								wt.data.watch_batch(a, c, d, i,
									function() {
										_.each(e,
												function(a) {
													a.watched = !0
												}),
											b.watchers = e,
											_.isFunction(f) && f()
									},
									function(a) {
										21006 === a.code && kzi.msg.error("添加全部关注一次不能大于 50 人"),
											_.isFunction(g) && g(a)
									},
									h)
							} else b.watchers = e,
								_.isFunction(f) && f(),
								_.isFunction(h) && h()
					}
				},
				member: {
					set_task_member_toggle: function(a, b, c, d, e, f) {
						if(c.assigned) {
							var g = _.find(b.members, {
								uid: c.uid
							});
							if(_.isEmpty(b.tid)) return c.assigned = 0,
								void(g && (b.members = _.reject(b.members,
									function(a) {
										return a.uid === c.uid
									})));
							if(c.setting_toggle_member === !0) return;
							c.setting_toggle_member = !0,
								wt.data.task.unassign(a, b.tid, c.uid,
									function(a) {
										g && (b.members = _.reject(b.members,
												function(a) {
													return a.uid === c.uid
												})),
											c.assigned = 0,
											_.isFunction(d) && d(a)
									},
									e,
									function() {
										c.setting_toggle_member = !1,
											_.isFunction(f) && f()
									})
						} else {
							var g = _.find(b.members, {
								uid: c.uid
							});
							if(_.isEmpty(b.tid)) return c.assigned = 1,
								void(g || b.members.push(c));
							if(!g) {
								if(c.setting_toggle_member === !0) return;
								c.setting_toggle_member = !0,
									wt.data.task.assign(a, b.tid, c.uid,
										function(a) {
											g = _.find(b.members, {
													uid: c.uid
												}),
												g || (b.members.push(c), c.assigned = 1, _.isFunction(d) && d(a))
										},
										e,
										function() {
											c.setting_toggle_member = !1,
												_.isFunction(f) && f()
										})
							}
						}
					},
					get_normal_members: function(a) {
						var b = [];
						return _.each(a,
								function(a) {
									a.status === config.constant.status.ok && 
										(a.role !== config.constant.role.admin && 
											a.role !== config.constant.role.member || b.push(a))
								}),
							b
					},
					set_event_attendees_toggle: function(a, b, c, d, e, f) {
						if(c.assigned) {
							var g = _.find(b.attendees, {
								uid: c.uid
							});
							if(_.isEmpty(b.event_id)) return c.assigned = 0,
								g && (b.attendees = _.reject(b.attendees,
									function(a) {
										return a.uid === c.uid
									})),
								_.isFunction(d) && d(),
								void(_.isFunction(f) && f());
							wt.data.event.attendee_remove(a, b.event_id, c.uid,
								function(a) {
									g && (b.attendees = _.reject(b.attendees,
											function(a) {
												return a.uid === c.uid
											})),
										c.assigned = 0,
										_.isFunction(d) && d(a)
								},
								e, f)
						} else {
							var g = _.find(b.attendees, {
								uid: c.uid
							});
							if(_.isEmpty(b.event_id)) return c.assigned = 1,
								g || b.attendees.push(c),
								_.isFunction(d) && d(),
								void(_.isFunction(f) && f());
							g || wt.data.event.attendee_add(a, b.event_id, c.uid,
								function(a) {
									g = _.find(b.attendees, {
											uid: c.uid
										}),
										g || (b.attendees.push(c), c.assigned = 1, _.isFunction(d) && d(a))
								},
								e, f)
						}
					},
					get_scope_members_for_assigned: function(a, b) {
						var c = [],
							d = _.map(b, "uid");
						return _.each(a,
								function(a) {
									var b = _.clone(a);
									b.status === kzi.constant.status.ok && b.role !== kzi.constant.role.guest && (_.contains(d, b.uid) ? b.assigned = !0 : b.assigned = !1, c.push(b))
								}),
							c
					},
					event_attend_all: function(a, b, c, d, e, f) {
						var g = _.map(c, "uid"),
							h = function() {
								_.each(c,
										function(a) {
											a.assigned = 1,
												_.find(b.attendees, {
													uid: a.uid
												}) || b.attendees.push(a)
										}),
									_.isFunction(d) && d(result)
							};
						return b.event_id ? void wt.data.event.attendee_add(a, b.event_id, g,
							function(a) {
								h()
							},
							e, f) : h()
					}
				},
				addListener: e,
				removeListener: f,
				triggerEvent: g,
				$on: e,
				$delete: f,
				$execute: g
			




			};
    		
	}]).
	service("tempData", [function() {
				this.task = {},
					this.file = {},
					this.post = {},
					this.page = {},
					this.event = {},
					this.comment = {},
					this.ensure = function(a, b, c) {
						return this[a][b] = c,
							this[a][b]
					},
					this.checkout = function(a, b) {
						return this[a][b]
					},
					this.purge = function(a, b) {
						this[a][b] = null
					}
			}]);
	
})