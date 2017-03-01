/**
 * @ngdoc function
 * @name jtWorkApp.directive:wtProjectsMenu
 * @description 项目控制栏
 * # wtProjectsMenu
 * left menu directive
 */
define(['app'], function (app) {
	'use strict';

	app.directive('wtProjectsMenu', ["globalDataContext", "$state", "$stateParams", "$location", 
						"$rootScope", "$timeout", "$animate", "ProjectService", "wtScrollService", 
						"filterFilter",'config',
		function(a, b, c, d, e, f, g, h, i, j,config) {
		//["globalDataContext", "$state", "$stateParams", "$location", "$rootScope", "$timeout", "$animate", "projectService", "wtScrollService", "filterFilter", "projectsService"]
	    //          a               b            c              d            e            f           g              h                  i                j                 k
	    
			return {
				restrict: "E",
				replace: !0,
				scope: !0,
				templateUrl: config.templateUrls.left_menu_project,
				link: function(g, l, m) {
					function n() {
						o.collapse_recent_project = _.indexOf(o.leftmenu_projects_collapse, "collapse_recent_project") !== -1;
						var b = _.map(a.teams,
							function(a) {
								var b = _.clone(a);
								return b.collapse = _.indexOf(o.leftmenu_projects_collapse, a.team_id) !== -1,
									b.show_projects = _.clone(a.projects),
									b
							});
						o.teams = b,
							_.each(o.teams,
								function(a) {
									_.filter(a.projects,
										function(a) {
											o.query_all_teams_projects.push(a.pid)
										})
								})
					}
					var o = g.vm = {
						selected_pid: c.pid,
						leftmenu_projects_collapse: config.localData.get("leftmenu_projects_collapse") ? 
									config.localData.get("leftmenu_projects_collapse").split(",") : [],
						collapse_recent_project: !1,
						teams: [],
						projects: [],
						query: "",
						query_all_teams_projects: [],
						current_index: -1,
						current_pid: "",
						current_star_project: !0,
						on_query: !1,
						star_projects: a.star_projects,
						recent_projects: a.recent_projects
					};
					n(),
						g.$on(config.constant.event_names.shortcut_key_select_prjs,
							function(a, b) {
								switch(b.event.preventDefault(), b.keyCode) {
									case 13:
										o.current_pid && o.js_to_project({
											pid: o.current_pid
										});
										break;
									case 38:
										o.current_index <= o.star_projects.length && o.on_query === !0 && (o.current_index = o.star_projects.length + 1),
											o.current_index--,
											o.current_index < 0 && (o.current_index = 0),
											o.current_star_project = o.current_index < o.star_projects.length,
											o.current_pid = o.query_all_teams_projects[o.current_index],
											f(o.current_index <= o.star_projects.length ?
												function() {
													i.scrollTo($("#leftmenu_content .wt-scroll:eq(0)"), "top")
												} : function() {
													var a = [],
														b = $("#leftmenu_content .current");
													0 !== b.parent(":first-child").length ? 
														a = b.parent(":first-child").parent().parent().parent().prev().find("li:last-child") 
														: 
														(a = b.parent().prev().prev(), 0 === a.length && (a = b.parent().prev())),
														i.scrollTo($("#leftmenu_content .wt-scroll:eq(0)"), a)
												});
										break;
									case 40:
										o.current_index++;
										var c = o.query_all_teams_projects.length;
										o.current_index > c - 1 && (o.current_index = c - 1),
											o.current_star_project = o.current_index < o.star_projects.length,
											o.current_pid = o.query_all_teams_projects[o.current_index],
											f(function() {
												i.scrollTo($("#leftmenu_content .wt-scroll:eq(0)"), "#leftmenu_content .current")
											})
								}
							}),
						o.change_query = function() {
							var b = o.query,
								c = b.toLowerCase().trim();
							f(function() {
									i.scrollTo($("#leftmenu_content .wt-scroll:eq(0)"), "top")
								}),
								o.query_all_teams_projects = [],
								_.each(o.star_projects,
									function(a) {
										o.query_all_teams_projects.push(a.pid)
									}),
								_.each(o.teams,
									function(a) {
										a.show_projects = _.filter(a.projects,
											function(a) {
												if(a.name.toLowerCase().indexOf(c) !== -1 || 
													null != a.name_pinyin && a.name_pinyin.indexOf(c) > -1) 
													return o.query_all_teams_projects.push(a.pid), !0
											})
									}),
								o.is_empty = 0 === _.filter(a.projects,
									function(a) {
										return a.name.toLowerCase().indexOf(c) !== -1 || null != a.name_pinyin && a.name_pinyin.indexOf(c) > -1
									}).length,
								o.on_query = !0,
								o.current_index = o.star_projects.length,
								o.current_pid = o.query_all_teams_projects[o.current_index],
								o.current_star_project = !1,
								"" === c && (o.on_query = !1, o.current_pid = "", o.current_star_project = !0)
						},
						o.js_goto_team = function(a, b) {
							"-1" !== a.team_id && d.path("/teams/" + a.team_id)
						},
						o.js_to_project = function(a) {
							e.global.leftmenu_current_expand = "",
								b.go("project", {
									pid: a.pid
								}, {
									reload: !0
								})
						},
						o.add_project = function() {
							h.showAdd()
						},
						o.toggle_leftmenu_pin = function() {
							"0" === e.global.me.is_lock_left ? 
								e.global.me.is_lock_left = "1" : e.global.me.is_lock_left = "0",
								wt.data.user.set_user_prefs(e.global.me.uid, "is_lock_left", e.global.me.is_lock_left)
						},
						o.toggleStar = function(b, c) {
							a.cache.project.set_star(c.pid)
						},
						o.js_show_projects_archive = function() {
							h.showArchiveList()
						},
						o.js_show_projects_favorite = function() {
							h.showFavoriteList()
						};
					var p = function(b, c, d, e, f) {
						var g = [];
						if("star" === b) g = j(a.projects, {
							is_star: 1
						});
						else if("team" === b) {
							var h = _.find(o.teams, {
								team_id: f
							});
							if(!h) return;
							g = h.projects
						}
						var i = null,
							k = null;
						if(_.isEmpty(e) || (i = _.find(g, {
								pid: e
							})), _.isEmpty(d) || (k = _.find(g, {
								pid: d
							})), i || k) {
							var l = 0;
							"star" === b && (l = wt.bus.project.calculate_prj_star_pos(k, i)),
								"team" === b && (l = wt.bus.project.calculate_prj_pos(k, i));
							var m = _.find(g, {
								pid: c
							});
							"star" === b && wt.data.project.prj_star_position(c, l,
									function(a) {
										m.star_pos = l
									}),
								"team" === b && wt.data.project.prj_position(c, l,
									function(b) {
										m.pos = l,
											o.projects = _.sortBy(o.projects,
												function(a) {
													return a.pos
												}),
											a.resortProjects()
									})
						}
					};
					o.project_sort_options = {
							containment: ".leftmenu_projects_list",
							placeholder: "project-placeholder",
							helper: "clone",
							revert: 10,
							dropOnEmpty: !0,
							tolerance: "pointer",
							distance: "4",
							delay: "75",
							handle: ".wtf-projectmove",
							start: function(a, b) {
								b.helper.addClass("project-picked-up"),
									$(".project-placeholder").css({
										height: b.item.css("height"),
										width: b.item.css("width")
									})
							},
							stop: function(a, b) {
								var c = b.item.attr("pid"),
									d = b.item.attr("tid"),
									e = b.item.attr("type"),
									f = b.item.prev().attr("pid"),
									g = b.item.next().attr("pid");
								p(e, c, f, g, d)
							}
						},
						o.js_remove_recent_project = function(b) {
							a.cache.recent_open.remove("project", b),
								o.recent_projects = a.recent_projects
						},
						o.js_collapse_projects = function(a) {
							a ? 
								(a.collapse = !a.collapse, _.indexOf(o.leftmenu_projects_collapse, a.team_id) === -1 ? 
									o.leftmenu_projects_collapse.push(a.team_id) 
									: 
									o.leftmenu_projects_collapse = _.reject(o.leftmenu_projects_collapse,
										function(b) {
											return b === a.team_id
										})) 
								: 
								_.indexOf(o.leftmenu_projects_collapse, "collapse_recent_project") === -1 ? 
									(o.collapse_recent_project = !0, o.leftmenu_projects_collapse.push("collapse_recent_project")) 
									: 
									(o.collapse_recent_project = !1, o.leftmenu_projects_collapse = _.reject(o.leftmenu_projects_collapse,
										function(a) {
											return "collapse_recent_project" === a
										})),
								config.localData.set("leftmenu_projects_collapse", o.leftmenu_projects_collapse)
						},
						g.$on(config.constant.event_names.project_star_change,
							function(b, c) {
								o.star_projects = a.star_projects
							})
				}
			}
		
	  }]);
});