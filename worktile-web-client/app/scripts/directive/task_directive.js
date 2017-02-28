/**
 * @ngdoc function
 * @name jtWorkApp.task:directive
 * @description
 * # task directive
 */
define(['app'], function (app) {
	'use strict';

	/**************************************************************************************************************
	 *创建任务浮框
	 **************************************************************************************************************/
	app.directive("wtTaskComposer", ["config","$timeout", "wtScrollService",
		function(config,$timeout,wtScrollService) {
            //["$timeout", "wtScrollService"]
            //      a              b
			return {
				restrict: "E",
				templateUrl: config.templateUrls.task_composer,
				replace: !0,
				scope: {
					argEntry: "=",
					argNewTaskModel: "=",
					argPosition: "@",
					argFnSave: "&",
					argFnCancel: "&",
					argFnShowMore: "&"
				},
				link: function($scope, element, attr) {
					//$scope, element, attr
					//   c        d      e
					function f() {
						h(),
							$timeout(function() {
									var c = $("#entry_scroll_" + g.entry.entry_id);
									"top" === g.position ? 
										(b.scrollTo(c, "top"), element.find("textarea")[0].focus()) 
										: 
										$timeout(function() {
											wtScrollService.scrollTo(c, "bottom"),
												element.find("textarea")[0].focus()
										})
								},
								50)
					}
					var g = $scope.vm = {
							entry: $scope.argEntry,
							new_task: $scope.argNewTaskModel,
							position: $scope.argPosition
						},
						h = function() {
							$(document).bind("mousedown.wtTaskComposer",
								function(a) {
									$(a.target).hasClass("entry-task-composer") || 
									$(a.target).parents(".entry-task-composer").length > 0 || 
									$(a.target).hasClass("popbox-avatar") || 
									$(a.target).parents(".popbox-avatar").length > 0 || 
									($(document).unbind("mousedown.wtTaskComposer"), 
										$scope.$apply(function() {

										g.parse_cancel(null);
									}))
								})
						};
					g.focus_textarea = function(a) {
						var b = null;
						b = $(a.target).hasClass("composer-body") ? 
								$(a.target) 
								: 
								$(a.target).parents(".composer-body").eq(0),
						b.find("textarea").focus()
					},
					g.parse_save = function(a, b) {
						$scope.argFnSave({
							$event: a,
							new_task: b,
							entry: g.entry,
							isTop: "top" === g.position
						})
					},
					g.parse_cancel = function(a, b) {
						$scope.argFnCancel({
							$event: a,
							entry: g.entry,
							new_task: b
						})
					},
					g.parse_show_task_menu = function(a, b, d) {
						$scope.argFnShowMore({
							$event: a,
							entry: g.entry,
							new_task: d
						})
					},
					f(),
					$scope.$on("$destory",
						function() {
							$(document).unbind("mousedown.wtTaskComposer")
						})
				}
			}
		
	}])
	/**************************************************************************************************************
	 *
	 **************************************************************************************************************/
	.directive("wtTask", ["config","$timeout", "wtScrollService",
		function(config,$timeout,wtScrollService) {
			//["smartDateFormatFilter", "cutstrFilter", "arrReverseFilter", "sanitize", "$translate"],
			//            a                    b                 c                d           e
			return {
				restrict: "E",
				replace: !0,
				templateUrl: config.templateUrls.task_item,//"/ycjs/directive/task/task.html",
				scope: {
					task: "=",
					entry: "=",
					argViewType: "@",
					argShowProject: "=",
					argFnCheck: "&",
					argDisableCheck: "=",
					argShowMore: "=",
					argFnMore: "&",
					argPopMemberOptions: "="
				},
				compile: function(f, g) {
					return {
						pre: function(f, g, h) {
							function i(c) {
								var f = $(g).children(".task-badges"),
									h = [],
									i = !1;
								if(0 !== c.expire_date) {
									var l = a(c.expire_date),
										m = "",
										n = "",
										o = j(c);
									n = e.instant("directive_task.expire_when", {
											time: l
										}),
										1 === o && (m = "badge-expire-due", n = e.instant("directive_task.expire_already")),
										2 === o && (m = "badge-expire-soon", n = e.instant("directive_task.expire_soon")),
										h.push('<span class="task-badge fa fa-clock-o {{timeClass}}" '.replace("{{timeClass}}", m)),
										h.push('title="{{timeTitle}}">{{timeText}}</span>'.replace("{{timeTitle}}", n).replace("{{timeText}}", l)),
										i = !0
								}
								if(c.badges.todo_count > 0) {
									var p = c.badges.todo_checked_count + "/" + c.badges.todo_count,
										q = "",
										r = "";
									c.badges.todo_checked_count === c.badges.todo_count && (q = " badge-todo-done"),
										r = c.badges.todo_checked_count === c.badges.todo_count ? e.instant("directive_task.todo_completed", {
											count: c.badges.todo_checked_count
										}) : e.instant("directive_task.todo_completed", {
											count: c.badges.todo_checked_count + "/" + c.badges.todo_count
										}),
										h.push('<span class="task-badge fa fa-list {{todoClass}}" '.replace("{{todoClass}}", q)),
										h.push('title="{{todoTitle}}">{{todoText}}</span>'.replace("{{todoTitle}}", r).replace("{{todoText}}", p)),
										i = !0
								}
								if(c.badges.comment_count > 0) {
									var s = c.badges.comment_count,
										t = e.instant("directive_task.comment_count", {
											count: c.badges.comment_count
										});
									h.push('<span class="task-badge fa fa-comment-o" '),
										h.push('title="{{commentTitle}}">{{commentText}}</span>'.replace("{{commentTitle}}", t).replace("{{commentText}}", s)),
										i = !0
								}
								if(c.files && c.files.length > 0 || c.badges.file_count > 0) {
									var u = c.badges.file_count > 0 ? c.badges.file_count : c.files.length,
										v = e.instant("directive_task.file_count", {
											count: u
										}),
										w = u;
									h.push('<span class="task-badge fa fa-paperclip" '),
										h.push('title="{{fileTitle}}">{{fileCount}}</span>'.replace("{{fileTitle}}", v).replace("{{fileCount}}", w)),
										i = !0
								}
								if(c.desc && c.desc.length > 0) {
									var x = e.instant("directive_task.has_desc");
									h.push('<span class="task-badge fa fa-align-left" title="' + x + '"></span>'),
										i = !0
								}
								if(1 === c.is_locked) {
									var x = e.instant("directive_task.is_lock");
									h.push('<span class="task-badge fa fa-lock" title="' + x + '"></span>'),
										i = !0
								}
								if(1 === c.is_loop) {
									var x = e.instant("directive_task.is_timingtask");
									h.push('<span class="task-badge fa fa-repeat" title="' + x + '"></span>'),
										i = !0
								}
								if(k.showProject && i && h.push('<span class="seperator seperator-project"></span>'), k.showProject) {
									var y = d(c.project.name),
										z = c.project.pic;
									h.push('<span class="task-badge fa project-name-icon {{projectIcon}}" title="{{projectName}}">'.replace("{{projectName}}", y).replace("{{projectIcon}}", z)),
										h.push(b([y, 20])),
										h.push("</span>")
								}
								c.labels && c.labels.length > 0 && _.each(c.labels,
										function(a) {
											var c = d(a.desc);
											h.push('<span class="task-badge task-label {{name}}-label" '.replace("{{name}}", a.name)),
												h.push('title="{{desc}}">'.replace("{{desc}}", c)),
												h.push(b([c, 10])),
												h.push("</span>")
										}),
									f.html(h.join(""))
							}

							function j(a) {
								var b = 0;
								if(a.completed) b = 0;
								else {
									var c = moment().valueOf(),
										d = 1e3 * moment(a.expire_date).format("X");
									b = d < c ? 1 : d > c && d < moment().add(1, "days").valueOf() ? 2 : 0
								}
								return b
							}
							var k = f.dm = {
								showProject: f.argShowProject,
								viewType: null == f.argViewType ? "card" : f.argViewType,
								disableCheck: f.argDisableCheck,
								showMore: f.argShowMore,
								members_reverse: []
							};
							f.$watch(h.task,
									function(a) {
										_.isUndefined(a) || _.isNull(a) || _.isEqual(a, {}) || (k.members_reverse = c(a.members), i(a))
									}, !0),
								k.parse_fn_check = function(a, b, c) {
									f.argFnCheck({
										$event: a,
										entry: b,
										task: c
									})
								},
								k.parse_fn_more = function(a, b, c) {
									f.argFnMore({
										$event: a,
										entry: b,
										task: c
									})
								}
						}
					}
				}
			}
		

	}])

	;
})