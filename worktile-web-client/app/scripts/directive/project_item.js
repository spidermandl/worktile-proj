/**
 * @ngdoc function
 * @name jtWorkApp.directive:wtLeftmenu
 * @description
 * # wtLeftmenu 左侧控制栏
 * left menu directive
 */
define(['app'], function (app) {
	'use strict';

	app.directive('wtProjectGridItem', ["$parse", "$popbox", "$state", "globalDataContext","config",
		function(a,b,c,d,config) {
			"use strict";
			return {
				restrict: "E",
				replace: !0,
				templateUrl: config.templateUrls.project_grid_item,
				scope: {
					project: "=project"
				},
				link: function(a, b, e) {
					var f = a.vm = {
						icon: "star" !== e.like ? "heart" : "star",
						type: "star" !== e.like ? "favorite" : "star"
					};
					f.js_toggle_star = function(b) {
							d.cache.project.set_star(a.project.pid)
						},
						f.js_toggle_favorite = function(b) {
							var c = a.project.is_favorite ? 0 : 1;
							a.project.is_favorite = c,
								wt.data.project.set_favorite(a.project.pid, c,
									function(b) {
										d.cache.project.set_favorite(a.project.pid, a.project.is_favorite)
									},
									null, null)
						},
						f.js_toggle_like = function(a) {
							return "star" === f.type ? f.js_toggle_star(a) : f.js_toggle_favorite(a)
						},
						f.go_project = function() {
							c.go("project", {
								pid: a.project.pid
							})
						}
				}
			}
	}])
})