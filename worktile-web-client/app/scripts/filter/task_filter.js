/**
 * @ngdoc function
 * @name jtWorkApp.controller:translate filter
 * @description
 * # translate filter
 * Controller of the jtWorkApp
 */
define(['app'], function (app) {
	'use strict';

	app.filter("wtTaskComposer", ["$translate",
		function(a,b) {
            //["$timeout", "wtScrollService"]
            //      a              b
			return {
				restrict: "E",
				templateUrl: "/ycjs/directive/task/task_composer.html",
				replace: !0,
				scope: {
					argEntry: "=",
					argNewTaskModel: "=",
					argPosition: "@",
					argFnSave: "&",
					argFnCancel: "&",
					argFnShowMore: "&"
				},
				link: function(c, d, e) {
					function f() {
						h(),
							a(function() {
									var c = $("#entry_scroll_" + g.entry.entry_id);
									"top" === g.position ? (b.scrollTo(c, "top"), d.find("textarea")[0].focus()) : a(function() {
										b.scrollTo(c, "bottom"),
											d.find("textarea")[0].focus()
									})
								},
								50)
					}
					var g = c.vm = {
							entry: c.argEntry,
							new_task: c.argNewTaskModel,
							position: c.argPosition
						},
						h = function() {
							$(document).bind("mousedown.wtTaskComposer",
								function(a) {
									$(a.target).hasClass("entry-task-composer") || $(a.target).parents(".entry-task-composer").length > 0 || $(a.target).hasClass("popbox-avatar") || $(a.target).parents(".popbox-avatar").length > 0 || ($(document).unbind("mousedown.wtTaskComposer"), c.$apply(function() {
										g.parse_cancel(null)
									}))
								})
						};
					g.focus_textarea = function(a) {
							var b = null;
							b = $(a.target).hasClass("composer-body") ? $(a.target) : $(a.target).parents(".composer-body").eq(0),
								b.find("textarea").focus()
						},
						g.parse_save = function(a, b) {
							c.argFnSave({
								$event: a,
								new_task: b,
								entry: g.entry,
								isTop: "top" === g.position
							})
						},
						g.parse_cancel = function(a, b) {
							c.argFnCancel({
								$event: a,
								entry: g.entry,
								new_task: b
							})
						},
						g.parse_show_task_menu = function(a, b, d) {
							c.argFnShowMore({
								$event: a,
								entry: g.entry,
								new_task: d
							})
						},
						f(),
						c.$on("$destory",
							function() {
								$(document).unbind("mousedown.wtTaskComposer")
							})
				}
			}
		
	}])
})