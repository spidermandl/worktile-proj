/**
 * @ngdoc function
 * @name jtWorkApp.service:globalDataContext
 * @description
 * 全局缓存数据 service
 * Controller of the jtWorkApp
 */
define(['app'], function (app) {
 	'use strict';

	app.service('globalDataContext', ['$http','api','$rootScope','localStorageService','$state','config','$q',
		function ($http,api,$rootScope,localStorageService,$state,config,$q) {
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
			 * 全局上下文数据
			 * loadAll 的返回值
			 */
			var context = {
				frame :null, //首页面类型 work or guest

				//加载等待阶段
				loading_init : true,
				i18n_loading_done : true,
				//左控制栏
				header_menu : '',
				leftmenu_current_expand : '',//当前展开的面板
				//loading_done : true,

				me : null,//用户基本信息

				constant : config,//常量

				team_module: config.team_module,
				/**
				 * team相关
				 */
				team : {
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
			};
			var globalDataContext = {
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
						}
					);
				},

				/**
				 * 加载所有缓存信息
				 **/
				loadAll :function(){
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
							context.me =msg.data;
							$rootScope.bind = true;
							/**
							* 加载所有账号信息
							*/
							return $q.all([api.team_list()]).
									then(
										function(msgs){
											//console.log(msgs[0].data);
											_.map(msgs[0].data,
								                function(a) {
								                    var b = globalDataContext.getTeam(a.team_id);
								                    b ? (delete b.faked, _.extend(b, a)) : 
								                    	globalDataContext.teams.push(a);
								                });
											//console.log(globalDataContext.teams);
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
				// getProject = function(b, c, d) {
				// 	var e = null != c && 0 != c,
				// 		d = null != d && 0 != d,
				// 		f = _.find(i.projects, {
				// 			pid: b
				// 		}),
				// 		g = a.defer();
				// 	return f && e === !1 ? (g.resolve(f), g.promise) : f && e === !0 ? null == f.extensions ? wt.data.project.get(b).then(function(a) {
				// 			return f = a.data.data.info,
				// 				f.members = a.data.data.members,
				// 				d && (i.clearProject(), i.project.pid = b, i.project.info = f),
				// 				g.resolve(f),
				// 				g.promise
				// 		},
				// 		function() {
				// 			return null
				// 		}) : void 0 : wt.data.project.get(b).then(function(a) {
				// 			return a.data.data.info.members = a.data.data.members,
				// 				d && (i.clearProject(), i.project.pid = b, i.project.info = a.data.data.info),
				// 				a.data.data.info
				// 		},
				// 		function() {
				// 			return null
				// 		})
				// },
				// getPacketProjects = function(a) {
				// 	var d = a;
				// 	d instanceof Array || (d = i.projects);
				// 	var e = [],
				// 		f = [];
				// 	return _.each(d,
				// 			function(a) {
				// 				if(kzi.constant.prj_module.crud & a.permission) {
				// 					var d = _.clone(a);
				// 					if(d.is_star) d.sort = 100,
				// 						c.use(b.global.me.locale).then(function() {
				// 							d.team_name = c.instant("projects.project_type_name_star")
				// 						}),
				// 						f.push(d);
				// 					else {
				// 						if(i.teams) {
				// 							var g = _.find(i.teams,
				// 								function(a) {
				// 									return a.team_id === d.team_id
				// 								});
				// 							c.use(b.global.me.locale).then(function() {
				// 									d.team_name = g ? g.name : c.instant("projects.project_type_name_personal")
				// 								}),
				// 								d.sort = g && d.team_id !== -1 ? g.create_date : 1e3
				// 						}
				// 						e.push(d)
				// 					}
				// 				}
				// 			}),
				// 		e = _.union(f, e),
				// 		i.teams ? _.sortBy(e,
				// 			function(a) {
				// 				return a.sort
				// 			}) : e
				// },
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
				// 		c.use(b.global.me.locale).then(function() {
				// 				e.name = c.instant("projects.project_type_name_personal")
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
				// loadTeamMembers = function(a) {
				// 	return wt.data.team.get_team_members_basic(a).then(function(a) {
				// 			return a.data.data
				// 		},
				// 		function() {
				// 			return null
				// 		})
				// },
				// loadProjectMembers = function(a, b) {
				// 	return a === i.project.pid && i.project.info && !_.isEmpty(i.project.info.members) ? b(i.project.info.members) : void wt.data.project.get_members(a,
				// 		function(a) {
				// 			return b(a.data)
				// 		})
				// },
				// loadEntriesAndTasks = function(a, b, c) {
				// 	return i.project.pid !== a || _.isEmpty(i.project.entries) ? void wt.data.entry.get_list(a, !1,
				// 		function(c) {
				// 			var d = c.data.entries,
				// 				e = c.data.tasks;
				// 			i.pid = a,
				// 				i.project.entries = d,
				// 				i.project.tasks = e,
				// 				b(i.project)
				// 		},
				// 		c, null, "globalDataContext-loadEntriesAndTasks") : b(i.project)
				// },
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









