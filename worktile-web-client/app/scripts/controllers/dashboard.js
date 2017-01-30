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
		$rootScope.global = {
			//加载等待阶段
			loading_init : true,
			i18n_loading_done : true,
			//左控制栏
			header_menu : '',
			leftmenu_current_expand : '',//当前展开的面板
		};
	}])
	.controller('DashboardTaskCtrl', ['$scope','$rootScope','config',function ($scope,$rootScope,config) {
		//$controller('WorkCtrl', {$scope: $scope,$rootScope: $rootScope});
		$scope.vm = {
			mytaskViewStatus : 'gtd',
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




