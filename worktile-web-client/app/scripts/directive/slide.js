/**
 * @ngdoc function
 * @name jtWorkApp.directive:wtSlideBody
 * @description
 * # wtSlideBody 任务项，右侧划出详情框
 */
define(['app'], function (app) {
	'use strict';
	app.directive('wtSlideBody', 
		['$timeout','config',
		  function(a,config) {
		  	
			return {
				restrict: "E",
				replace: !0,
				scope: !0,
				controller: ["$scope", "locator", "globalDataContext",
					function(b, c, d) {
						var e = b.root_vm = {
							entityExt: {
								loading_done: !1,
								permission: 1
							}
						};
						b.locator = c;
						var f = function() {
							a(function() {
									switch(c.xtype) {
										case config.constant.xtype.task:
											b.$broadcast(config.constant.event_names.load_entity_task, b.locator);
											break;
										case config.constant.xtype.file:
											b.$broadcast(config.constant.event_names.load_entity_file, b.locator);
											break;
										case config.constant.xtype.page:
											b.$broadcast(config.constant.event_names.load_entity_page, b.locator);
											break;
										case config.constant.xtype.post:
											b.$broadcast(config.constant.event_names.load_entity_post, b.locator);
											break;
										case config.constant.xtype.event:
											b.$broadcast(config.constant.event_names.load_entity_event, b.locator);
											break;
										case config.constant.xtype.email:
											b.$broadcast(config.constant.event_names.load_entity_mail, b.locator)
									}
								},
								100)
						};
						b.loadData = function() {
							return e.entityExt.loading_done = !1,
								e.entityExt.permission = 1,
								c.pid ? 
									void d.getProject(c.pid, !0, !1).then(function(a) {
										b.project = a,
											f()
									},
									function() {
										e.entityExt.loading_done = !0,
											e.entityExt.permission = 0
									}) : void f()
						},
						b.clearData = function() {
							e.entityExt.loading_done = !1,
								e.entityExt.permission = 0,
								b.project = null
						}
					}
				],
				templateUrl: config.templateUrls.entity_main,
				link: function(b, c, d) {
					var e = function(c) {
						$(c.target).hasClass("slide-content") || $(c.target).parents(".slide-content").length > 0 || $(c.target).hasClass("slide-trigger") || $(c.target).parents(".slide-trigger").length > 0 || $(c.target).hasClass("atwho-container") || $(c.target).parents(".atwho-container").length > 0 || $(c.target).hasClass("modal") || $(c.target).parents(".modal").length > 0 || $(c.target).hasClass("popbox") || $(c.target).parents(".popbox").length > 0 || $(c.target).parents(".notifications").length > 0 || $(c.target).hasClass("fancybox-overlay") || $(c.target).parents(".fancybox-overlay").length > 0 || $(c.target).hasClass("layout_right_sidebar") || $(c.target).parents(".layout_right_sidebar").length > 0 || "fancybox-buttons" === $(c.target).attr("id") || $(c.target).parents("#fancybox-buttons").length > 0 || $(c.target).hasClass("fancybox-overlay") || $(c.target).parents(".fancybox-overlay").length > 0 || "fancybox-thumbs" === $(c.target).attr("id") || $(c.target).parents("#fancybox-thumbs").length > 0 || $(c.target).hasClass("fancybox-wrap") || $(c.target).parents(".fancybox-wrap").length > 0 || $(c.target).hasClass("right_click_trigger") || $(c.target).parents(".right_click_trigger").length > 0 || $(c.target).parents(".line-item").length > 0 || $(c.target).hasClass("line-item") || a(function() {
							b.locator.close()
						})
					};
					c.bind("transitionend.slide webkitTransitionEnd.slide oTransitionEnd.slide MSTransitionEnd.slide",
						function(a) {
							$(a.target).hasClass("in") && ($(a.target).data("skipLoadOnce") ? 
								$(a.target).data("skipLoadOnce", null) 
								: 
								b.loadData())
						}),
					b.locator.onStartOpen(function(a) {
						c.addClass("in"),
							$(document).bind("mousedown.wtSlideBodyClose drag", e),
							a && b.loadData()
					}),
					b.locator.onStartClose(function() {
						c.removeClass("in").removeClass("none"),
							b.clearData(),
							$(document).unbind("mousedown.wtSlideBodyClose drag")
					})
				}
			}
		
	}]);
});