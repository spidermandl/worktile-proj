/**
 * @ngdoc function
 * @name jtWorkApp.controller:page 相关
 * @description
 * # page related controllers
 * Controller of the jtWorkApp
 */
define(['app'], function (app) {
	'use strict';

	/**************************************************************************************************************
	 *
	 **************************************************************************************************************/
	app.controller('projectPagesToolbarCtrl', ["$scope", "pagesFilterData", "Util", "shimoService",'config',
		function (a, b, c,d,config) {
			
			function e() {
				_.findIndex(a.project.extensions, {
					eid: "292dd670b2cddc156713b1878237dc5e"
				}) !== -1 ? f.enable_extension_shimo = !0 : f.enable_extension_shimo = !1
			}
			var f = a.vm = {
				pages_filter: b,
				enable_extension_shimo: !1
			};
			b.init(),
				f.set_filter_type = function(a) {
					b.filter_type !== a && (b.filter_type = a, c.$execute("pagesFilterTypeChangeEvent"))
				},
				f.show_add_subpage_pop = function(a) {
					c.$execute("pagesShowAddSubPagePopEvent", a)
				},
				a.$on(config.constant.event_names.project_extensions_change,
					function(a, b) {
						_.findIndex(b.extensions, {
							eid: "292dd670b2cddc156713b1878237dc5e"
						}) !== -1 ? f.enable_extension_shimo = !0 : f.enable_extension_shimo = !1
					}),
				f.js_add_shimo_modal = function(a) {
					d.showAdd()
				},
				e()
		
		
	}])
	/**************************************************************************************************************
	 *
	 **************************************************************************************************************/
	.controller('projectPagesCtrl', ["$scope", "$stateParams", "$rootScope", "$popbox", "pagesFilterData", "Util", 
					"$translate", "ycTrack",'config','api',
		function (a, b, c, d, e, f, g, h,config,api) {

			function i(a) {
				wt.data.page.del_shimo_file(j.pid, a.page_id,
					function(a) {
						m(a.data.page_id)
					})
			}
			h.track("project_page", "visit");
			var j = a.vm = {
					pages: [],
					pages_filter: e,
					pid: b.pid,
					part_loading_done: !1
				},
				k = a.parent_vm = a.$parent.vm,
				l = function() {
					"tree" === e.view_type ? (j.pages = _.where(k.cached_pages, {
							parent_id: ""
						}), _.each(j.pages,
							function(a) {
								var b = [],
									c = _.where(k.cached_pages, {
										parent_id: a.page_id
									});
								_.each(c,
										function(a) {
											b.push(a)
										}),
									a.sub_pages = _.sortBy(b,
										function(a) {
											return a.create_date
										})
							})) : j.pages = k.cached_pages,
						"default" === e.sort ? (_.each(j.pages,
							function(a) {
								a.sub_pages && a.sub_pages.length > 1 && (a.sub_pages = _.sortBy(a.sub_pages, "name"))
							}), j.pages = _.sortBy(j.pages, "name")) : "create_date" === e.sort ? (_.each(j.pages,
							function(a) {
								a.sub_pages && a.sub_pages.length > 1 && (a.sub_pages = _.sortBy(a.sub_pages, "create_date").reverse())
							}), j.pages = _.sortBy(j.pages, "create_date").reverse()) : "update_date" === e.sort && (_.each(j.pages,
							function(a) {
								a.sub_pages && a.sub_pages.length > 1 && (a.sub_pages = _.sortBy(a.sub_pages, "update_date").reverse())
							}), j.pages = _.sortBy(j.pages, "update_date").reverse())
				},
				m = function(a) {
					k.cached_pages = _.reject(k.cached_pages,
							function(b) {
								return b.page_id === a
							}),
						l()
				},
				n = function() {
					j.part_loading_done = !1,
						c.global.title = [g.instant("page.title_name"), " | ", a.project.name].join(""),
						k.load_all_pages(j.pid,
							function() {
								l()
							},
							null,
							function() {
								j.part_loading_done = !0
							})
				};
			f.$on("pagesViewTypeChangeEvent",
					function() {
						l()
					},
					a),
				f.$on("pagesFilterTypeChangeEvent",
					function() {
						switch(e.filter_type) {
							case 0:
								_.each(k.cached_pages,
									function(a) {
										a.is_hide = !1
									});
								break;
							case 1:
								_.each(k.cached_pages,
									function(a) {
										a.owner.uid === c.global.me.uid ? a.is_hide = !1 : a.is_hide = !0
									});
								break;
							case 2:
								_.each(k.cached_pages,
									function(a) {
										var b = _.find(a.watchers, {
											uid: c.global.me.uid
										});
										b ? a.is_hide = !1 : a.is_hide = !0
									})
						}
					},
					a),
				f.$on("setPagesSortTypeEvent",
					function() {
						j.pages = [],
							l()
					},
					a),
				f.$on("pagesShowAddSubPagePopEvent",
					function(b) {
						b.stopPropagation(),
							d.popbox({
								target: b,
								templateUrl: "/tpl/project/page/pop_parents_page.html",
								controller: ["$scope", "popbox", "pop_data",
									function(a, b, c) {
										a.popbox = b;
										var d = a.vm = {
											pid: c.scope.vm.pid,
											pages: _.where(c.scope.parent_vm.cached_pages, {
												parent_id: ""
											})
										};
										d.js_close = function() {
											b.close()
										}
									}
								],
								resolve: {
									pop_data: function() {
										return {
											scope: a
										}
									}
								}
							}).open()
					},
					a),
				j.js_show_menu = function(b, c, e, f) {
					b.stopPropagation(),
						d.popbox({
							target: b,
							top: e,
							left: f,
							templateUrl: "/tpl/project/page/pop_page_action.html",
							controller: ["$scope", "popbox", "pop_data", "$rootScope",
								function(a, b, d, e) {
									function f() {
										a.popbox = b,
											a.project = d.scope.project,
											a.step = 0,
											"worktile" === g.page_type && (g.edit_url = "/project/" + g.pid + "/page/" + c.page_id + "/edit"),
											"shimo" === g.page_type && (g.edit_url = c.join_url)
									}
									var g = a.vm = {
										pid: d.scope.vm.pid,
										page_type: c.join_type == config.constant.page_extend.shimo ? "shimo" : "worktile",
										show_sub_menu: !1,
										edit_url: ""
									};
									f(),
										g.js_step = a.js_step = function(b) {
											a.step = b
										},
										a.page = c,
										"" === c.parent_id && (g.show_sub_menu = !0),
										g.js_delete_page = function(b) {
											"shimo" === g.page_type ? (i(b), g.js_close()) : (a.is_deleting = !0, wt.data.page.trash(g.pid, b.page_id,
												function(c) {
													a.is_deleting = !1,
														e.$broadcast(config.constant.event_names.autosave_cancel, {
															key: "autosave:page:uid_" + e.global.me.uid + ":xid_" + b.page_id
														}),
														g.js_close(),
														m(b.page_id)
												}))
										},
										g.js_toggle_watch = function(a, b, c) {
											wt.bus.watch.set_watcher_toggle(g.pid, c, config.constant.xtype.page, c.page_id, b)
										},
										g.js_watch_all = function(a, c, d) {
											wt.bus.watch.watch_all(g.pid, d, config.constant.xtype.page, d.page_id, c, null, null,
													function() {}),
												b.close()
										},
										g.js_close = a.js_close = function() {
											b.close()
										}
								}
							],
							resolve: {
								pop_data: function() {
									return {
										scope: a
									}
								}
							}
						}).open()
				},
				j.set_view_type = function(a) {
					e.view_type !== a && (e.set_view_type(a), f.$execute("pagesViewTypeChangeEvent"))
				},
				j.set_sort = function(a) {
					e.set_sort(a),
						f.$execute("setPagesSortTypeEvent", null)
				},
				a.$on(config.constant.event_names.on_page_trash,
					function(a, b) {
						_.isEmpty(b) || m(b)
					}),
				a.$on(config.constant.event_names.on_right_menu,
					function(b, d) {
						if(c.global.prj_module.watch & a.project.permission) {
							var e = config.helper.mouse_position(d),
								f = null,
								g = "page-item-mark";
							if($(d.target).hasClass(g)) f = $(d.target).attr("page-id");
							else {
								if(!($(d.target).parents("." + g).length > 0)) return;
								f = $(d.target).parents("." + g).attr("page-id")
							}
							if(f) {
								var h = _.find(k.cached_pages, {
									page_id: f
								});
								h && j.js_show_menu(d, h, e.y, e.x)
							}
						}
					}),
				a.$on(config.constant.event_names.on_page_add,
					function(a, b) {
						k.cached_pages.push(b),
							l()
					}),
				n()
		
	}])
	/**************************************************************************************************************
	 *
	 **************************************************************************************************************/
	.controller('projectPagesHomeCtrl', ["$scope", "ycTrack",'config','api',
		function (a, b,config,api) {

			var c = a.vm = {
				cached_pages: []
			};
			c.load_all_pages = function(a, b, d, e) {
				return _.isEmpty(c.cached_pages) ? 
					void api.get_page_list(a,
						function(a) {
							c.cached_pages = a.data,
								b()
						},
						d, e) 
					: (b(), void(e && e()))
			},
			a.$on(config.constant.event_names.on_page_trash,
				function(a, b) {
					_.isEmpty(b) || (c.cached_pages = _.reject(c.cached_pages,
						function(a) {
							return a.page_id === b.page_id
						}))
				}),
			a.$on(config.constant.event_names.on_page_update,
				function(a, b) {
					_.isEmpty(b) || _.each(c.cached_pages,
						function(a) {
							if(a.page_id == b.page.page_id) return _.assign(a, b.page), !0
						})
				}),
			a.$on(config.constant.event_names.page_updated_by_editor,
				function(a, b) {
					_.isEmpty(b) || _.each(c.cached_pages,
						function(a) {
							if(a.page_id == b.page.page_id) return _.assign(a, b.page), !0
						})
				}),
			a.$on(config.constant.event_names.page_created_by_editor,
				function(a, b) {
					c.cached_pages.push(b)
				})
		
	}])
	;
});







