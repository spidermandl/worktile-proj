/**
 * @ngdoc function
 * @name jtWorkApp.controller:dashboard相关
 * @description
 * # Dashboard related controller
 * Controller of the jtWorkApp
 */
define(['app'], function (app) {
	'use strict';
	console.log("dashboard相关");
	//父类
	app.controller('WorkCtrl', ['$scope','$rootScope','config',function ($scope,$rootScope,config) {
		//全局访问变量
		// $rootScope.global = {
		// 	loading_done:true,
		// };
	}])
	.controller('DashboardTaskCtrl', ['$scope','$rootScope','config',function ($scope,$rootScope,config) {
		//$controller('WorkCtrl', {$scope: $scope,$rootScope: $rootScope});
		var vm = $scope.vm = {
			part_loading_done:true,//页面加载

            loaded: !1,
            taskAll: [],
            gtdEntrys: [[], [], [], []],
            gtdTaskTempMark: [],
            currentTask: {},
            mytaskViewStatus: 'gtd',//null !== kzi.localData.get("mytaskViewStatus") ? kzi.localData.get("mytaskViewStatus") : "gtd",
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
                members: [],//[$rootScope.global.me],
                expire_date: 0,
                labels: []
            }
        };
		//console.log($rootScope.$root);//
		//$rootScope.global['loading_done'] = true;
        vm.loaded = true;
        vm.toggle_task = function(b, c, d) {
            // var e = function(a) {
            //     this.taskAll = _.reject(this.taskAll, {
            //         tid: a
            //     }),
            //     _.each(this.gtdEntrys,
            //     function(b) {
            //         b = _.reject(b, {
            //             tid: a
            //         })
            //     }),
            //     q(this.taskAll),
            //     this.uncompleted_tasks = _.reject(this.uncompleted_tasks, {
            //         tid: a
            //     }),
            //     _.each(this.group_tasks,
            //     function(b) {
            //         b.tasks = _.reject(b.tasks, {
            //             tid: a
            //         })
            //     }),
            //     r(this.uncompleted_tasks)
            // },
            // f = function(a) {
            //     this.completed_tasks = _.reject(this.completed_tasks, {
            //         tid: a
            //     })
            // },
            // g = function(b) {
            //     var c = _.find(b.members, {
            //         uid: a.global.me.uid
            //     });
            //     if (c) if (1 === b.completed) this.completed_tasks.unshift(b),
            //     e(b.tid);
            //     else {
            //         f(b.tid);
            //         var d = _.find(this.taskAll, {
            //             tid: b.tid
            //         }),
            //         g = _.find(this.uncompleted_tasks, {
            //             tid: b.tid
            //         }),
            //         h = _.find(this.completed_tasks, {
            //             tid: b.tid
            //         });
            //         d ? (b.mark = d.mark, s(d, b)) : (null == b.mark && (b.mark = 1), this.taskAll.push(b)),
            //         q(this.taskAll),
            //         g ? s(g, b) : this.uncompleted_tasks.push(b),
            //         r(this.uncompleted_tasks),
            //         h && s(h, b)
            //     } else e(b.tid),
            //     f(b.tid)
            // };
            // return d ? (e(b.tid), void f(b.tid)) : void(c ? wt.data.task.get(b.pid, b.tid,
            // function(a) {
            //     g(a.data)
            // }) : g(b))
        };
        vm.tasks_sort_options = {
            // appendTo: ".layout_content_main:last",
            // helper: "clone",
            // revert: 10,
            // containment: ".layout_content_main",
            // connectWith: ".entry-tasks",
            // placeholder: "wt-task-placeholder",
            // tolerance: "pointer",
            // dropOnEmpty: !0,
            // delay: "75",
            // over: function(a, b) {},
            // start: function(a, b) {
            //     $(".wt-task-placeholder").css({
            //         height: b.item.outerHeight()
            //     }),
            //     b.item.addClass("picked-up");
            //     var c = b.item.attr("task-id");
            //     this.currentTask = _.find(this.taskAll, {
            //         tid: c
            //     })
            // },
            // stop: function(a, c) {
            //     b.$apply(function() {
            //         var a = c.item,
            //         b = parseInt(a.parent().attr("mark")),
            //         d = this.currentTask.mark,
            //         e = c.item.prev().attr("task-id"),
            //         f = c.item.next().attr("task-id");
            //         if (_.isEmpty(e) && _.isEmpty(f)) this.currentTask.pos = kzi.config.default_pos;
            //         else if (_.isEmpty(e)) {
            //             var g = parseFloat(c.item.next().attr("task-pos"));
            //             this.currentTask.pos = g / 2
            //         } else if (_.isEmpty(f)) {
            //             var h = parseFloat(c.item.prev().attr("task-pos"));
            //             p.currentTask.pos = h + kzi.config.default_pos
            //         } else {
            //             var h = parseFloat(c.item.prev().attr("task-pos")),
            //             g = parseFloat(c.item.next().attr("task-pos"));
            //             p.currentTask.pos = (g + h) / 2
            //         }
            //         if (p.currentTask.mark = b, _.remove(p.gtdEntrys[d - 1],
            //         function(a) {
            //             return a.tid === p.currentTask.tid
            //         }), b === d) {
            //             var i = c.item.next().attr("task-id");
            //             if (i) {
            //                 var j = _.findIndex(p.gtdEntrys[b - 1],
            //                 function(a) {
            //                     return a.tid === i
            //                 });
            //                 p.gtdEntrys[b - 1].splice(j, 0, p.currentTask)
            //             } else p.gtdEntrys[b - 1].push(p.currentTask)
            //         } else {
            //             var k = a.parent().find(".task");
            //             if (k.length > 0) {
            //                 var l = [];
            //                 l.maxheight = p.gtdEntrys[b - 1].maxheight,
            //                 p.gtdEntrys[b - 1] = l,
            //                 $(k).each(function(a, c) {
            //                     var d = $(c).attr("task-id"),
            //                     e = _.find(p.taskAll, {
            //                         tid: d
            //                     });
            //                     p.gtdEntrys[b - 1].push(e)
            //                 })
            //             }
            //         }
            //         wt.data.task.drop_dashboard_task(p.currentTask.pid, p.currentTask.tid, b, f,
            //         function(a) {
            //             200 === a.code && (p.currentTask.pos = a.data)
            //         },
            //         null, null)
            //     }),
            //     c.item.removeClass("picked-up")
            // },
            // update: function(a, b) {}
        };
        vm.js_open_task_detail = function(a, b) {
            // d.openTask(b.pid, b.tid, null)
        };
        vm.js_complete_task = function(b, c, d) {
            // if (a.global.prj_module.crud) {
            //     b.stopPropagation();
            //     var e = d.tid,
            //     g = d.pid;
            //     0 === d.completed && wt.data.task.complete(g, e,
            //     function(a) {
            //         200 === a.code && (d.completed = 1, f(function() {
            //             p.toggle_task(d, !1)
            //         },
            //         300))
            //     })
            // }
        };
        vm.js_toggle_viewstatus = function(a) {
        //     p.mytaskViewStatus = a,
        //     kzi.localData.set("mytaskViewStatus", a),
        //     "gtd" === p.mytaskViewStatus && (p.isBoarded || k()),
        //     "time" === p.mytaskViewStatus && p.isBoarded && l(),
        //     "completed" === p.mytaskViewStatus && (p.page = 1, p.has_more_completed_tasks = !0, p.completed_tasks = [], m()),
        //     "update" !== p.mytaskViewStatus && "my_watcher" !== p.mytaskViewStatus && "my_create" !== p.mytaskViewStatus && "all_tasks" !== p.mytaskViewStatus || (p.page = 1, p.has_more_tasks = !0, p.tasks = [], n(!0))
        };
        vm.js_show_task_quickcreate = function($event, gtd_entry) {
            gtd_entry.task_bottom_enabled = !0,
            gtd_entry.maxheight -= 34;
        };
        vm.js_cancel_quickcreate = function(a, b, c) {
            // b.task_bottom_enabled && (b.maxheight += 34),
            // b.task_bottom_enabled = !1,
            // c && t()
        };
        vm.js_add_task = function(a, b, c) {
            // var c = parseInt(c, 10),
            // d = kzi.helper.split_line(b.temp_name);
            // wt.data.task.batch_add_gtd(b.pid, c, d,
            // function(a) {
            //     p.gtdTaskTempMark = p.gtdTaskTempMark.concat(a.data),
            //     t()
            // },
            // function(a) {
            //     7048 === a.code ? kzi.msg.error(h.instant("dashboardTask.err_add_task_entry_null")) : kzi.msg.error(h.instant("dashboardTask.err_add_task", {
            //         code: a.code
            //     }))
            // })
        };
        vm.load_more_tasks = function() {
            // n(!1)
        };
        vm.load_more_completed_tasks = function() {
            // m()
        };

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




