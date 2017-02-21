/**
 * @ngdoc function
 * @name jtWorkApp.controller:dashboard相关
 * @description
 * # Dashboard related controller
 * Controller of the jtWorkApp
 */
define(['app'], function (app) {
	'use strict';

	//父类
	app.controller('WorkCtrl', ['$scope','$rootScope','config',function ($scope,$rootScope,config) {
		//全局访问变量
		// $rootScope.global = {
		// 	loading_done:true,
		// };
	}])
	.controller('DashboardTaskCtrl', ['$scope','$rootScope','config','ycTrack','$translate','api',
		function ($scope,$rootScope,config,ycTrack,translate,api) {
		
		$rootScope.global.loading_done = true;//需要重构

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
			switch($scope.vm.mytaskViewStatus) {
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
			gtdEntrys: [ [], [], [], [] ],
			gtdTaskTempMark: [],
			currentTask: {},
			mytaskViewStatus: "gtd",//null !== kzi.localData.get("mytaskViewStatus") ? kzi.localData.get("mytaskViewStatus") : "gtd",
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
				if($scope.vm.taskAll = a.sort(wt.bus.task.compare_task), 
					$scope.vm.gtdEntrys = [ [],[],[],[] ], 
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
				p.uncompleted_tasks = a.sort(wt.bus.task.compare_task),
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
						if(c)
							if(1 === b.completed) $scope.vm.completed_tasks.unshift(b),
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
							if(_.isEmpty(e) && _.isEmpty(f)) $scope.vm.currentTask.pos = kzi.config.default_pos;
							else if(_.isEmpty(e)) {
								var g = parseFloat(c.item.next().attr("task-pos"));
								$scope.vm.currentTask.pos = g / 2
							} else if(_.isEmpty(f)) {
								var h = parseFloat(c.item.prev().attr("task-pos"));
								$scope.vm.currentTask.pos = h + kzi.config.default_pos
							} else {
								var h = parseFloat(c.item.prev().attr("task-pos")),
									g = parseFloat(c.item.next().attr("task-pos"));
								$scope.vm.currentTask.pos = (g + h) / 2
							}
							if($scope.vm.currentTask.mark = b, _.remove($scope.vm.gtdEntrys[d - 1],
									function(a) {
										return a.tid === $scope.vm.currentTask.tid
									}), b === d) {
								var i = c.item.next().attr("task-id");
								if(i) {
									var j = _.findIndex($scope.vm.gtdEntrys[b - 1],
										function(a) {
											return a.tid === i
										});
									$scope.vm.gtdEntrys[b - 1].splice(j, 0, $scope.vm.currentTask)
								} else $scope.vm.gtdEntrys[b - 1].push($scope.vm.currentTask)
							} else {
								var k = a.parent().find(".task");
								if(k.length > 0) {
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
				if(a.global.prj_module.crud) {
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
			$scope.$on(config.event_names.on_task_trash,
				function(a, b) {
					$scope.vm.toggle_task(b, !1, !0)
				}),
			$scope.$on(config.event_names.on_task_complete,
				function(a, b, c) {
					$scope.vm.toggle_task(b, !0)
				}),
			$scope.$on(config.event_names.on_task_update,
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
			$scope.$on(config.event_names.on_task_assign,
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
		

	}])
	.controller('DashboardCalendarCtrl', ['$scope','$rootScope','$uibModal','config',
		function ($scope,$rootScope,$modal,config) {
			//$controller('WorkCtrl', {$scope: $scope,$rootScope: $rootScope});
			$scope.vm = {
				js_add_event:function(){
					$modal.open({
						//$uibModalStack
		                windowClass: "dialog-w680",
		                templateUrl: config.templateUrls.calendar_event_create,
		                controller: ["$rootScope", "$scope", "$uibModalInstance",
			                function($rootScope, $scope, $uibModalInstance) {
			                    $scope.vm = {
			                        saving: !1,
			                        new_event: {
			                            //attendees: [_.clone(a.global.me)]
			                        },
			                        change_event_project : function(){
			                        	//this.new_event.attendees = [_.clone(a.global.me)]
			                        },
			                        js_toggle_member : function(){
										// b.setting_toggle_member !== !0 && 
										// 	(b.setting_toggle_member = !0, 
										// 		wt.bus.member.set_event_attendees_toggle(i.new_event.pid, i.new_event, b,
							   //                      function() {},
							   //                      null,
							   //                      function() {
							   //                          b.setting_toggle_member = !1
							   //                      }));
			                        },
			                        js_remove_attendee : function(a, b) {
				                        // this.new_event.attendees = _.reject(this.new_event.attendees,
				                        // function(a) {
				                        //     return a.uid === b.uid;
				                        // });
			                    	},
			                    	js_attendee_all : function(a, b, c, d) {
			                        	//wt.bus.member.event_attend_all(i.new_event.pid, i.new_event, b, null, null, d);
			                    	},
			                    	submit_create_event : function(b) {
				                        this.saving = !0;
				                        // var g = _.map(this.new_event.attendees, "uid");
				                        // wt.data.event.add(this.new_event.pid, 
				                        // 	this.new_event.name, 
				                        // 	this.new_event.location, 
				                        // 	g, 
				                        // 	this.new_event.start_date, 
				                        // 	this.new_event.start_time, 
				                        // 	this.new_event.end_date, 
				                        // 	this.new_event.end_time, 
				                        // 	this.new_event.repeat_interval.key,
					                       //  function(b) {
					                       //      e.track("add_event", "done", "新建日程弹窗"),
					                       //      i.close(),
					                       //      a.$broadcast(kzi.constant.event_names.on_event_add, b.data),
					                       //      f && c.go("project.event.detail", {
					                       //          pid: this.new_event.pid,
					                       //          event_id: b.data[0].event_id,
					                       //      },
					                       //      {
					                       //          reload: !0
					                       //      });
					                       //  },
					                       //  function(a) {
					                       //      13012 === a.code && kzi.msg.error(d.instant("event.name_too_large"));
					                       //  },
					                       //  function() {
					                       //      i.saving = !1;
					                       //  });
			                    	},
				                    close : function() {
				                        $uibModalInstance.close();
				                    }
			                    };
			                    // g.projects = b.getPacketProjects(),
			                    // g.repeat_intervals = kzi.constant.event_repeat_intervals,
			                    // _.each(g.repeat_intervals,
			                    // function(a) {
			                    //     a.desc = d.instant(a.desc);
			                    // }),
			                    // i.new_event.repeat_interval = g.repeat_intervals[0];
			                    // var j = g.projects[0];
			                    // c.params.pid && (j = _.find(g.projects, {
			                    //     pid: c.params.pid
			                    // })),
			                    // i.new_event.team_id = j.team_id,
			                    // i.new_event.pid = j.pid,
			                    // i.new_event.permission = j.permission,
			                }]
		            });
				},
				calendar_view : 'month',
			};
			$scope.changeView = function(type){
				this.vm.calendar_view = type;
			};
	}])
	.controller('CalendarSubscribeCtrl', ['$scope','$rootScope','config',
		function ($scope,$rootScope,config) {

	}])
	.controller('DashboardActivityFeedCtrl', ['$scope','$rootScope','config',
		function ($scope,$rootScope,config) {
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
			d.track("dashboard_feed", "visit");
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
	.controller('DashboardEmailCtrl', ['$scope','$rootScope','config',
		function ($scope,$rootScope,config) {

	}])
	.filter('indexOf',['config',function(config){
		return function(input){
			var collection = input[0];
			var filter = input[1];
			return collection.indexOf(filter) == -1 ? false : true;
		};
	}])
	.filter('orderBy',['config',function(config){
		return function(input,star_pos){

		};
	}])
	;
});




