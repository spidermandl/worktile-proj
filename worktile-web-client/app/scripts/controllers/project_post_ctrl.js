/**
 * @ngdoc function
 * @name jtWorkApp.controller:post 相关
 * @description
 * # post related controllers
 * Controller of the jtWorkApp
 */
define(['app'], function (app) {
	'use strict';

	/**************************************************************************************************************
	 *
	 **************************************************************************************************************/
	app.controller('projectPostsToolbarCtrl', ["$scope", "postsFilterData", "Util",'config',
		function (a, b, c,config) {
			var d = a.vm = {
				posts_filter: b
			};
			b.init(),
				d.set_sort = function(a) {
					b.set_sort(a),
						c.$execute("postsSortOrFilterChangeEvent")
				},
				d.set_filter_type = function(a) {
					b.filter_type = a,
						c.$execute("postsSortOrFilterChangeEvent")
				},
				d.show_add_post = function() {
					c.$execute("postsShowAddPostEvent")
				}
		
		
		
	}])
	/**************************************************************************************************************
	 *
	 **************************************************************************************************************/
	.controller('projectPostsCtrl', ["$rootScope", "$scope", "$stateParams", "$popbox", "$timeout", "$location", "postsFilterData", 
					"Util", "locator", "$translate", "ycTrack",'config','api',
		function (a, b, c, d, e, f, g, h, i, j, k,config,api) {

			function l(a) {
				n.part_loading_done = !1,
					b.set_pop_watcher_options(),
					api.get_post_list(
						{	
							pid: n.pid, 
							since_id: o, 
							count:config.default_count, 
							sort:g.sort, 
							desc:1, 
							type:g.filter_type,
						},
						function(b) {
							b.data.length > 0 && (o = b.data[b.data.length - 1][g.sort]),
								_.isEmpty(n.posts) ? n.posts = b.data : n.posts = n.posts.concat(b.data),
								_.each(n.posts,
									function(a) {
										null == a.last_reply_user && (a.last_reply_date = 0)
									}),
								n.posts = _.sortByOrder(n.posts, ["is_top", g.sort], ["desc", "desc"]),
								b.data.length === config.config.default_count ? n.has_more = !0 : n.has_more = !1,
								angular.isFunction(a) && a(b.data)
						},
						null,
						function() {
							n.part_loading_done = !0
						})
			}
			k.track("project_post", "visit");
			var m = _.clone(a.global.me);
			m.watched = !0;
			var n = b.vm = {
					posts_filter: g,
					pid: c.pid,
					part_loading_done: !1,
					show_add_post: !1,
					is_saving: !1,
					edit_post: {
						name: "",
						content: "",
						watchers: [m]
					},
					posts: []
				},
				o = 0;
			a.global.loading_done = !0,
				h.$on("postsShowAddPostEvent",
					function() {
						n.show_add_post = !n.show_add_post,
							n.edit_post.post_id = ""
					},
					b),
				h.$on("postsSortOrFilterChangeEvent",
					function() {
						o = 0,
							n.posts = [],
							l()
					},
					b),
				n.set_sort = function(a) {
					g.set_sort(a),
						h.$execute("postsSortOrFilterChangeEvent")
				},
				n.js_cancel_edit_post = function() {
					n.show_add_post = !1,
						n.edit_post.name = "",
						n.edit_post.content = "",
						n.edit_post.watchers = [m]
				},
				n.js_remove_watcher = function(a, b) {
					n.edit_post.watchers = _.reject(n.edit_post.watchers,
						function(a) {
							return a.uid === b.uid
						})
				},
				n.js_save_post = function(a) {
					if(n.edit_post.name = n.edit_post.name.trim(), _.isEmpty(n.edit_post.name)) return void config.msg.error(j.instant("post.err_name_require"));
					n.is_saving = !0;
					var b = _.map(n.edit_post.watchers, "uid");
					wt.data.post.add(n.pid, n.edit_post.name, n.edit_post.content, b,
						function(a) {
							k.track("add_post", "done"),
								n.is_saving = !1,
								n.posts.unshift(a.data),
								n.js_cancel_edit_post()
						},
						function(a) {
							switch(1 * a.code) {
								case 9011:
									config.msg.error(j.instant("post.name_too_large"));
									break;
								case 9012:
									config.msg.error(j.instant("post.content_too_large"));
									break;
								default:
									config.msg.error(j.instant("post.add_fail"))
							}
						},
						function() {
							n.is_saving = !1
						})
				},
				b.js_show_post_menu = function(c, e, f, g) {
					c.stopPropagation(),
						d.popbox({
							target: c,
							top: f,
							left: g,
							templateUrl: "/tpl/project/post/pop_post_action.html",
							controller: ["$scope", "popbox", "pop_data",
								function(b, c, d) {
									var f = b.vm = {
										step: 0,
										is_deleting: !1,
										edit_post: e
									};
									b.popbox = c,
										b.project = d.scope.project,
										f.js_step = function(a) {
											f.step = a
										},
										a.global.me.watched = _.map(f.edit_post.watchers, "uid").indexOf(a.global.me.uid) >= 0,
										f.js_toggle_top = function(b) {
											wt.data.post.toggle_top(b.pid, b.post_id,
												function(c) {
													b.is_top = c.data.is_top,
														b.update_date = c.data.update_date,
														d.parent_vm.posts = _.sortByOrder(d.parent_vm.posts, ["is_top", "update_date"], ["desc", "asc"]),
														a.$broadcast(config.constant.event_names.on_post_toggle_top, {
															post_id: b.post_id,
															is_top: b.is_top,
															update_date: b.update_date
														}),
														f.js_close()
												})
										},
										f.js_toggle_watch = function(a, b, c) {
											wt.bus.watch.set_watcher_toggle(c.pid, c, config.constant.xtype.post, c.post_id, b)
										},
										f.js_watch_all = function(a, b, d, e) {
											wt.bus.watch.watch_all(d.pid, d, config.constant.xtype.post, d.post_id, b, null, null, e),
												c.close()
										},
										f.js_delete_post = function(a) {
											f.is_deleting = !0,
												wt.data.post.trash(a.pid, a.post_id,
													function(b) {
														f.is_deleting = !1,
															f.js_close(),
															d.parent_vm.posts = _.reject(d.parent_vm.posts,
																function(b) {
																	return b.post_id === a.post_id
																})
													})
										},
										f.js_close = function() {
											c.close()
										}
								}
							],
							resolve: {
								pop_data: function() {
									return {
										scope: b,
										parent_vm: n
									}
								}
							}
						}).open()
				},
				b.set_pop_watcher_options = function() {
					a.global.prj_module.watch & b.project.permission && (b.pop_watcher_options = {
						name: j.instant("post.unwatch"),
						ongoing: j.instant("post.unwatching"),
						click: function(a, b, c, d) {
							c.watched = !0,
								wt.bus.watch.set_watcher_toggle(n.pid, n.edit_post, config.constant.xtype.post, null, c),
								d()
						}
					})
				},
				n.js_toggle_watch = function(a, b, c) {
					wt.bus.watch.set_watcher_toggle(n.pid, c, config.constant.xtype.post, null, b)
				},
				n.js_watch_all = function(a, b, c, d) {
					wt.bus.watch.watch_all(n.pid, c, config.constant.xtype.post, null, b, null, null, d)
				},
				a.global.title = [j.instant("post.title_name"), " | ", b.project.name].join(""),
				n.js_load_more = function() {
					l()
				},
				b.show_post_entity = function(a, b) {
					f.path("/project/" + a + "/post/" + b)
				},
				l(),
				b.$on(config.constant.event_names.on_post_comment,
					function(a, b) {
						if(!_.isEmpty(b)) {
							var c = _.find(n.posts, {
								post_id: b.post_id
							});
							c && (c.comment_count++, c.last_reply_user = b.last_reply_user, c.last_reply_date = b.last_reply_date)
						}
					}),
				b.$on(config.constant.event_names.on_post_trash,
					function(a, b) {
						_.isEmpty(b) || (n.posts = _.reject(n.posts,
							function(a) {
								return a.post_id === b.post_id
							}))
					}),
				b.$on(config.constant.event_names.on_post_toggle_top,
					function(a, b) {
						if(!_.isEmpty(b)) {
							var c = _.find(n.posts, {
								post_id: b.post_id
							});
							c.is_top = b.is_top,
								c.update_date = b.update_date,
								n.posts = _.sortByOrder(n.posts, ["is_top", "update_date"], ["desc", "asc"])
						}
					}),
				b.$on(config.constant.event_names.on_post_update,
					function(a, b) {
						if(!_.isEmpty(b)) {
							var c = _.find(n.posts, {
								post_id: b.post_id
							});
							c && (c.name = b.name, c.summary = config.helper.substr(b.content, 60))
						}
					}),
				b.$on(config.constant.event_names.on_right_menu,
					function(c, d) {
						if(a.global.prj_module.watch & b.project.permission) {
							var e = config.helper.mouse_position(d),
								f = null,
								g = "post-item";
							if($(d.target).hasClass(g)) f = $(d.target).attr("post-id");
							else {
								if(!($(d.target).parents("." + g).length > 0)) return;
								f = $(d.target).parents("." + g).attr("post-id")
							}
							if(f) {
								var h = _.find(n.posts, {
									post_id: f
								});
								h && b.js_show_post_menu(d, h, e.y, e.x)
							}
						}
					}),
				b.$on(config.constant.event_names.shortcut_key_to_cancel,
					function() {
						//  / \ /project\ / .*\/ post$ /.test(location.pathname) && 
						!i.isOpened && !wt.bus.mkEditor.checkClose()
					}),
				b.$on(config.constant.event_names.post_created_by_editor,
					function(a, b) {
						n.posts.unshift(b)
					}),
				b.$on(config.constant.event_names.post_updated_by_editor,
					function(a, b) {
						var c = _.find(n.posts,
							function(a) {
								return a.post_id === b.post_id
							});
						c && (c.name = b.name, c.content = b.content)
					}),
				b.$on(config.constant.event_names.on_file_add,
					function(a, b) {
						if(b && "post" === b.type && n.pid === b.file.pid) {
							var c = _.find(n.posts, {
								post_id: b.ext.post_id
							});
							c && c.post_id === b.ext.post_id && (_.isArray(c.files) ? c.files.push(b.file) : c.files = [b.file], c.attachments_count = c.files.length)
						}
					}),
				b.$on(config.constant.event_names.on_uploadfile_add_to_post,
					function(a, b) {
						var c = b.post_id,
							d = b.files || [1],
							e = _.find(n.posts, {
								post_id: c
							});
						e.attachments_count ? e.attachments_count = 1 * e.attachments_count + 1 * d.length : e.attachments_count = d.length
					}),
				b.$on(config.constant.event_names.on_uploadfile_del_to_post,
					function(a, b) {
						var c = b.post_id,
							d = _.find(n.posts, {
								post_id: c
							});
						d.attachments_count || 1 * d.attachments_count > 1 ? d.attachments_count = d.attachments_count - 1 : d.attachments_count = 0
					})
		
			
		
	}])
	;
});