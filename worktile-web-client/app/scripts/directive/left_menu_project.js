/**
 * @ngdoc function
 * @name jtWorkApp.directive:wtProjectsMenu
 * @description 项目控制栏
 * # wtProjectsMenu
 * left menu directive
 */
define(['app'], function (app) {
	'use strict';

	app.directive('wtProjectsMenu', ['$rootScope','$state','config',
		function($rootScope,$state,config) {
	    return {
	      	restrict: 'E',
	      	templateUrl: config.templateUrls.left_menu_project,
	      	link: function (scope,element,attrs) {
				function n() {
					vm.collapse_recent_project = 
						jQuery.indexOf(vm.leftmenu_projects_collapse, "collapse_recent_project") !== -1;
					var b = jQuery.map(a.teams,
						function(a) {
							var b = jQuery.clone(a);
							return b.collapse = jQuery.indexOf(vm.leftmenu_projects_collapse, a.team_id) !== -1,
								b.show_projects = jQuery.clone(a.projects),
								b
						});
					vm.teams = b,
						jQuery.each(vm.teams,
							function(a) {
								jQuery.filter(a.projects,
									function(a) {
										vm.query_all_teams_projects.push(a.pid)
									})
							})
				}
				var vm = scope.vm = {
					selected_pid: c.pid,
					leftmenu_projects_collapse: kzi.localData.get("leftmenu_projects_collapse") ? kzi.localData.get("leftmenu_projects_collapse").split(",") : [],
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
					scope.$on(kzi.constant.event_names.shortcut_key_select_prjs,
						function(a, b) {
							switch(b.event.preventDefault(), b.keyCode) {
								case 13:
									vm.current_pid && vm.js_to_project({
										pid: vm.current_pid
									});
									break;
								case 38:
									vm.current_index <= vm.star_projects.length && vm.on_query === !0 && (vm.current_index = vm.star_projects.length + 1),
										vm.current_index--,
										vm.current_index < 0 && (vm.current_index = 0),
										vm.current_star_project = vm.current_index < vm.star_projects.length,
										vm.current_pid = vm.query_all_teams_projects[vm.current_index],
										f(vm.current_index <= vm.star_projects.length ?
											function() {
												i.scrollTo($("#leftmenu_content .wt-scroll:eq(0)"), "top")
											} : function() {
												var a = [],
													b = $("#leftmenu_content .current");
												0 !== b.parent(":first-child").length ? a = b.parent(":first-child").parent().parent().parent().prev().find("li:last-child") : (a = b.parent().prev().prev(), 0 === a.length && (a = b.parent().prev())),
													i.scrollTo($("#leftmenu_content .wt-scroll:eq(0)"), a)
											});
									break;
								case 40:
									vm.current_index++;
									var c = vm.query_all_teams_projects.length;
									vm.current_index > c - 1 && (vm.current_index = c - 1),
										vm.current_star_project = vm.current_index < vm.star_projects.length,
										vm.current_pid = vm.query_all_teams_projects[vm.current_index],
										f(function() {
											i.scrollTo($("#leftmenu_content .wt-scroll:eq(0)"), "#leftmenu_content .current")
										})
							}
						}),
					vm.change_query = function() {
						var b = vm.query,
							c = b.toLowerCase().trim();
						f(function() {
								i.scrollTo($("#leftmenu_content .wt-scroll:eq(0)"), "top")
							}),
							vm.query_all_teams_projects = [],
							jQuery.each(vm.star_projects,
								function(a) {
									vm.query_all_teams_projects.push(a.pid)
								}),
							jQuery.each(vm.teams,
								function(a) {
									a.show_projects = jQuery.filter(a.projects,
										function(a) {
											if(a.name.toLowerCase().indexOf(c) !== -1 || null != a.name_pinyin && a.name_pinyin.indexOf(c) > -1) return vm.query_all_teams_projects.push(a.pid), !0
										})
								}),
							vm.is_empty = 0 === jQuery.filter(a.projects,
								function(a) {
									return a.name.toLowerCase().indexOf(c) !== -1 || null != a.name_pinyin && a.name_pinyin.indexOf(c) > -1
								}).length,
							vm.on_query = !0,
							vm.current_index = vm.star_projects.length,
							vm.current_pid = vm.query_all_teams_projects[vm.current_index],
							vm.current_star_project = !1,
							"" === c && (vm.on_query = !1, vm.current_pid = "", vm.current_star_project = !0)
					},
					vm.js_goto_team = function(a, b) {
						"-1" !== a.team_id && d.path("/teams/" + a.team_id)
					},
					vm.js_to_project = function(a) {
						e.global.leftmenu_current_expand = "",
							b.go("project", {
								pid: a.pid
							}, {
								reload: !0
							})
					},
					vm.add_project = function() {
						h.showAdd()
					},
					vm.toggle_leftmenu_pin = function() {
						"0" === e.global.me.is_lock_left ? e.global.me.is_lock_left = "1" : e.global.me.is_lock_left = "0",
							wt.data.user.set_user_prefs(e.global.me.uid, "is_lock_left", e.global.me.is_lock_left)
					},
					vm.toggleStar = function(b, c) {
						a.cache.project.set_star(c.pid)
					},
					vm.js_show_projects_archive = function() {
						k.showArchiveList()
					},
					vm.js_show_projects_favorite = function() {
						k.showFavoriteList()
					};
				var p = function(b, c, d, e, f) {
					var g = [];
					if("star" === b) g = j(a.projects, {
						is_star: 1
					});
					else if("team" === b) {
						var h = jQuery.find(vm.teams, {
							team_id: f
						});
						if(!h) return;
						g = h.projects;
					}
					var i = null,
						k = null;
					if(jQuery.isEmpty(e) || (i = jQuery.find(g, {
							pid: e
						})), jQuery.isEmpty(d) || (k = jQuery.find(g, {
							pid: d
						})), i || k) {
						var l = 0;
						"star" === b && (l = wt.bus.project.calculate_prj_star_pos(k, i)),
							"team" === b && (l = wt.bus.project.calculate_prj_pos(k, i));
						var m = jQuery.find(g, {
							pid: c
						});
						"star" === b && wt.data.project.prj_star_position(c, l,
								function(a) {
									m.star_pos = l
								}),
							"team" === b && wt.data.project.prj_position(c, l,
								function(b) {
									m.pos = l,
										vm.projects = jQuery.sortBy(vm.projects,
											function(a) {
												return a.pos
											}),
										a.resortProjects()
								})
					}
				};
				vm.project_sort_options = {
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
							});
					},
					stop: function(a, b) {
						var c = b.item.attr("pid"),
							d = b.item.attr("tid"),
							e = b.item.attr("type"),
							f = b.item.prev().attr("pid"),
							g = b.item.next().attr("pid");
						p(e, c, f, g, d);
					}
				},
				vm.js_remove_recent_project = function(b) {
					a.cache.recent_open.remove("project", b),
						vm.recent_projects = a.recent_projects
				},
				vm.js_collapse_projects = function(a) {
					a ? (a.collapse = !a.collapse, jQuery.indexOf(vm.leftmenu_projects_collapse, a.team_id) === -1 ? vm.leftmenu_projects_collapse.push(a.team_id) : vm.leftmenu_projects_collapse = jQuery.reject(vm.leftmenu_projects_collapse,
							function(b) {
								return b === a.team_id
							})) : jQuery.indexOf(vm.leftmenu_projects_collapse, "collapse_recent_project") === -1 ? (vm.collapse_recent_project = !0, vm.leftmenu_projects_collapse.push("collapse_recent_project")) : (vm.collapse_recent_project = !1, vm.leftmenu_projects_collapse = jQuery.reject(vm.leftmenu_projects_collapse,
							function(a) {
								return "collapse_recent_project" === a
							})),
						kzi.localData.set("leftmenu_projects_collapse", vm.leftmenu_projects_collapse)
				},
				scope.$on(kzi.constant.event_names.project_star_change,
					function(b, c) {
						vm.star_projects = a.star_projects
					})
				
	      	},
	      };
	  }]);
});