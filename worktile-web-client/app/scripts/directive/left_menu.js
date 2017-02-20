/**
 * @ngdoc function
 * @name jtWorkApp.directive:wtLeftmenu
 * @description
 * # wtLeftmenu 左侧控制栏
 * left menu directive
 */
define(['app'], function (app) {
	'use strict';

	app.directive('wtLeftmenu', ['$rootScope','$state','$popbox','config','globalDataContext',
		function($rootScope,$state,$popbox,config,globalDataContext) {
	    return {
	      	restrict: 'E',
	      	templateUrl: config.templateUrls.left_menu,
	      	link: function (scope,element,attrs) {
				//$rootScope.global.loading_done = true;
		      	scope.vm = {
					//弹出创建快捷方式
					js_pop_shortcut_create : function(event){
						$rootScope.global.leftmenu_current_expand = "shortcut_create";
						this.popbox = $popbox.popbox({
							target: event,
							templateUrl: config.templateUrls.left_menu_shortcut_create,
							controller: ["$scope", "popbox", 
										// "teamService", "projectService", 
										// "taskService", "eventService", "fileService",
								function(scope, popbox){//, c, d, e, f, g) {
									scope.popbox = popbox;
									scope.vm = {};
									scope.vm.js_close = function() {
										popbox.close();
									};
									scope.vm.add_team = function() {
										c.showAdd();
										popbox.close();
									};
									scope.vm.add_project = function() {
										d.showAdd();
										popbox.close();
									};
									scope.vm.add_task = function() {
										e.showAdd(!0);
										popbox.close();
									};
									scope.vm.add_file = function() {
										g.showAdd();
										popbox.close();
									};
									scope.vm.add_event = function() {
										f.showAdd(!0);
										popbox.close();
									};
								}
							],
							onCloseComplete: function() {
								this.popbox = null;
								$rootScope.global.leftmenu_current_expand = "";
							}
						}),
						this.popbox.open();
					},
					//缩进操作面板
					js_leftmenu_collapsed : function(){
						$rootScope.global.leftmenu_current_expand = "";
					},
					star_projects : null ,//star项目
					/**
					 *弹出个人信息
					 **/
					js_pop_avatar_self : function(event){
						$rootScope.global.leftmenu_current_expand = "avatar_self",
	                    this.popbox = $popbox.popbox({
	                        target: event,
	                        templateUrl: config.templateUrls.left_menu_avatar_setting,
	                        controller: ["$scope", "popbox", //"feedbackService", "$uibModal",
	                        function(scope, popbox, c, d) {
	                            scope.popbox = popbox;
	                            scope.vm = {};
	                            scope.vm.js_show_feedback = function() {
	                                c.show(),
	                                popbox.close()
	                            },
	                            scope.vm.js_pop_mobild_download = function() {
	                                var a = d.open({
	                                    windowClass: "dialog-w530",
	                                    templateUrl: "/ycjs/directive/leftmenu/dialog_mobile_download.html",
	                                    controller: ["$scope",
	                                    function(b) {
	                                        var c = b.vm = {};
	                                        c.js_close = function() {
	                                            a.close();
	                                        };
	                                    }]
	                                });
	                                popbox.close();
	                            },
	                            scope.vm.js_pop_watch_wechat = function() {
	                                var a = d.open({
	                                    windowClass: "dialog-w530",
	                                    templateUrl: "/ycjs/directive/leftmenu/dialog_watch_wechat.html",
	                                    controller: ["$scope",
	                                    function(b) {
	                                        var c = b.vm = {};
	                                        c.js_close = function() {
	                                            a.close();
	                                        };
	                                    }]
	                                });
	                                popbox.close();
	                            },
	                            scope.vm.js_pop_solutions = function() {
	                                var a = d.open({
	                                    windowClass: "dialog-w530",
	                                    templateUrl: "/ycjs/directive/leftmenu/dialog_solutions.html",
	                                    controller: ["$scope",
	                                    function(b) {
	                                        var c = b.vm = {};
	                                        c.js_close = function() {
	                                            a.close();
	                                        };
	                                    }]
	                                });
	                                popbox.close();
	                            },
	                            scope.vm.js_close = function() {
	                                popbox.close();
	                            }
	                        }],
	                        onCloseComplete: function() {
	                            this.popbox = null,
	                            $rootScope.global.leftmenu_current_expand = ""
	                        }
	                    }),
	                    this.popbox.open();
					},
					//弹出团队显示界面
					js_pop_show_teams : function(event){
						$rootScope.global.leftmenu_current_expand = "show_teams",
						this.popbox = $popbox.popbox({
						    target: event,
						    templateUrl: config.templateUrls.left_menu_team,
						    controller: ["$scope", "popbox", 
						    			"TeamService", "$uibModal", 
						    			// "$window", "$translate", "$interval",
							    function($scope, c, d, f){//}, g, h, i) {
							        function j() {
							            $scope.vm.teams = _.filter(
							            	_.clone(globalDataContext.teams),
								            function(a) {
								                return "-1" !== a.team_id;
								            }
								        );
								        // console.log(globalDataContext.teams);
								        console.log($scope.vm.teams);
							        }

							        $scope.popbox = c;
							        $scope.vm = {
							            teams: []
							        };
							        j(),
							        $scope.vm.js_show_add_team = function() {
							            d.showAdd(),
							            c.close()
							        },
							        $scope.vm.js_pop_create_pro = function() {
							            var b = f.open({
							                windowClass: "dialog-w680",
							                templateUrl: "/ycjs/directive/leftmenu/dialog_upgrade_pro.html",
							                controller: ["$scope",
							                function(c) {
							                    function d() {
							                        g.send_phone_code = !0,
							                        g.new_phone_text = g.new_phone_text = h.instant("common.resend_phone_code", {
							                            second: 180
							                        }),
							                        g.waiting_for_phone_code = !0,
							                        g.timerInterval = i(function() {
							                            g.new_phone_text = parseInt(g.new_phone_text.match("([0-9]{1,3})")[0], 10),
							                            1 === g.new_phone_text ? e() : 
							                            	(g.new_phone_text--, g.new_phone_text = g.new_phone_text = h.instant("common.resend_phone_code", {
							                                second: g.new_phone_text
							                            }))
							                        },
							                        1e3)
							                    }
							                    function e() {
							                        g.send_phone_code = !1,
							                        g.new_phone_text = h.instant("common.get_phone_code"),
							                        g.waiting_for_phone_code = !1,
							                        i.cancel(g.timerInterval)
							                    }
							                    function f() {
							                        h.use(a.global.me.locale).then(function() {
							                            _.each(g.phone_prefixs,
							                            function(a) {
							                                a.name = h.instant(a.name)
							                            }),
							                            g.phone_prefix = g.phone_prefixs[0]
							                        })
							                    }
							                    var g = c.vm = {
							                        step: 0,
							                        type: "",
							                        phone_prefixs: a.global.constant.phone_prefixs,
							                        phone_prefix: {
							                            val: ""
							                        },
							                        new_phone: "",
							                        phone_code: "",
							                        new_phone_text: h.instant("common.get_phone_code"),
							                        waiting_for_phone_code: !1,
							                        is_sending_phone: !1,
							                        send_phonecode_success: !1,
							                        upgrade_url: ""
							                    };
							                    f(),
							                    g.js_change_phone_prefix = function(a) {
							                        g.phone_prefix = a,
							                        null === a.val ? (angular.element("input[name=new_phone_prefix]").attr("readonly", !1), angular.element("input[name=new_phone_prefix]").focus()) : (angular.element("input[name=new_phone_prefix]").attr("readonly", !0), angular.element("input[name=new_phone]").focus())
							                    },
							                    g.js_close = function() {
							                        b.close()
							                    },
							                    g.js_next = function() {
							                        "" === a.global.me.phone ? g.step = 1 : g.step = 2
							                    },
							                    g.js_user_change_phone = function(b, c) {
							                        return c === a.global.me.phone ? void b.$errors.unshift(h.instant("account.phone_same_self")) : (g.is_sending_phone = !0, void wt.data.user.reset_phone(g.phone_prefix.val, c, g.phone_code,
							                        function() {
							                            g.send_phonecode_success = !0,
							                            a.global.me.phone_prefix = g.phone_prefix.val,
							                            a.global.me.phone = c,
							                            e(),
							                            kzi.msg.success(h.instant("account.phone_bind_success")),
							                            g.step = 2
							                        },
							                        function(a) {
							                            2040 === a.code && (b.$errors.unshift(h.instant("err_info.phone_code_authfail")), e()),
							                            a.code === kzi.statuses.user_error.phone_has_exist.code && b.$errors.unshift(h.instant("err_info.duplicate_phone"))
							                        },
							                        function() {
							                            g.is_sending_phone = !1
							                        }))
							                    },
							                    g.js_get_phone_code = function(a) {
							                        wt.data.get_phone_code(g.phone_prefix.val, g.new_phone, 3,
							                        function() {
							                            d()
							                        },
							                        function(b) {
							                            2041 === b.code ? (a.$errors.unshift(h.instant("err_info.duplicate_phone")), $('input[name="new_phone"]').addClass("error"), e()) : a.$errors.unshift(h.instant("err_info.get_phone_code_fail"))
							                        })
							                    },
							                    g.js_change_phone = function() {
							                        e()
							                    },
							                    c.$on("$destroy",
							                    function() {
							                        i.cancel(g.timerInterval)
							                    }),
							                    g.js_select_type = function(a) {
							                        g.upgrade_url = "",
							                        g.type = a,
							                        "new" === g.type && wt.data.account.upgrade_to_pro(function(a) {
							                            g.upgrade_url = "//pro.worktile.com/setup?token=" + a.data + "&from=upgrade"
							                        }),
							                        "old" === g.type && (g.upgrade_url = "//pro.worktile.com/signin?from=upgrade")
							                    }
							                }]
							            });
							            c.close();
							        },
							        $scope.vm.js_close = function() {
							            c.close();
							        }
							    }],
						    onCloseComplete: function() {
						        this.popbox = null,
						        $rootScope.global.leftmenu_current_expand = "";
						    }
						}),
						this.popbox.open();
					},
					//弹出主页
					goto_dashboard : function(){
						$rootScope.global.leftmenu_current_expand = "",
						$state.go('dashboard');
					},
					//弹出搜索界面
					goto_search : function(){
	                    $rootScope.global.leftmenu_current_expand = "";
	                    $state.go("search", {},
	                    {
	                        reload: !0
	                    });
					},
					//弹出notice或project面板
					expand_item : function(item_type){
						return $rootScope.global.leftmenu_current_expand === item_type ?
							 void($rootScope.global.leftmenu_current_expand = "") : 
							 void($rootScope.global.leftmenu_current_expand = item_type);

					},
					js_to_project : function(project){
						$rootScope.global.leftmenu_current_expand = "";
	                    $state.go("project", {
		                        pid: project.pid
		                    },
		                    {
		                        reload: !0
		                    });
					},
				};
		    }
	    };
  	}]);
});