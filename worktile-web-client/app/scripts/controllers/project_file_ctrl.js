/**
 * @ngdoc function
 * @name jtWorkApp.controller:file 相关
 * @description
 * # file related controllers
 * Controller of the jtWorkApp
 */
define(['app'], function (app) {
	'use strict';

	/**************************************************************************************************************
	 *
	 **************************************************************************************************************/
	app.controller('projectFilesToolbarCtrl', ["$scope", "Util", "filesFilterData", "fileService",
		function (a, b, c, d) {

			var e = a.vm = {
				files_filter: c
			};
			e.set_filter_type = function(a) {
					c.filter_type = a,
						b.$execute("setFilesFilterTypeEvent", null)
				},
				e.show_add_folder_pop = function(a) {
					b.$execute("showAddFolderPopEvent", a)
				},
				e.file_select = function(a) {
					b.$execute("selectFileUploadEvent", a)
				},
				e.js_add_file = function() {
					d.showAdd()
				},
				e.js_trigger_upload = function(a) {
					$(a.target).parents(".btn-group").eq(0).find(".btn--fancy").eq(0).click()
				},
				c.init()
		
	}])
	/**************************************************************************************************************
	 *
	 **************************************************************************************************************/
	.controller('projectFilesCtrl', ["$scope", "$stateParams", "$rootScope", "$UploadFile", 
				"Util", "$popbox", "filesFilterData", "$translate", "ycTrack",'config','api',
		function (a, b, c, d, e, f, g, h, i,config,api) {

			i.track("project_file", "visit");
			var j = a.vm = {
					part_loading_done: !1,
					has_more: !1,
					pid: b.pid,
					folder_id: b.folder_id || "",
					page: 1,
					folders: [],
					files: [],
					files_filter: g
				},
				k = {
					default: 0,
					name: 1,
					create_date: 2,
					update_date: 3,
					undefined: 0
				};
			a.files_filter = g,
				c.global.loading_done = !0,
				c.global.title = [h.instant("file.title_name"), " | ", a.project.name].join("");
			var l = function() {
					j.part_loading_done = !1,
						api.get_file_list(
							{
								pid:j.pid, 
								folder_id:j.folder_id, 
								page:j.page, 
								sort:k[g.sort], 
								filter:g.filter_type,
							},
							function(a) {
								j.folders = a.data.folders,
									j.folders.length > 0 && (c.global.title = [h.instant("file.title_name"), " | ", j.folders[j.folders.length - 1].name].join("")),
									_.each(a.data.files,
										function(a) {
											a.icon = config.helper.build_file_icon(a)
										}),
									j.has_more = !1,
									a.data.files.length >= config.config.default_count && (j.has_more = !0),
									_.isEmpty(j.files) ? j.files = a.data.files : j.files = j.files.concat(a.data.files),
									j.part_loading_done = !0
							})
				},
				m = function(a, b) {
					wt.data.file.move(j.pid, a.fid, a.folder_id, b.fid,
						function() {
							a.folder_id = b.fid,
								j.files = _.reject(j.files,
									function(b) {
										return b.fid === a.fid
									})
						})
				},
				n = function(a) {
					j.files = _.reject(j.files,
						function(b) {
							return b.fid === a.fid || b.folder_id === a.fid
						})
				};
			l(),
				j.js_files_select = function(b) {
					var c = [];
					_.forEach(b,
							function(b) {
								c.push({
									original: b,
									data: {
										target: "prj",
										type: "project",
										pid: a.project.pid,
										folder_id: j.folder_id
									}
								})
							}),
						d.addFiles(a.project.pid, c,
							function(a, b) {
								b && b.file && (i.track("add_file", "done", "项目-文件模块"), j.files.unshift(b.file))
							})
				},
				e.$on("setFilesFilterTypeEvent",
					function() {
						j.page = 1,
							j.files = [],
							l()
					},
					a),
				e.$on("setFilesSortTypeEvent",
					function() {
						j.page = 1,
							j.files = [],
							l()
					},
					a),
				e.$on("selectFileUploadEvent",
					function(a) {
						j.js_files_select(a)
					},
					a),
				e.$on("showAddFolderPopEvent",
					function(b) {
						f.popbox({
							target: b,
							templateUrl: "/tpl/project/file/pop_add_folder.html",
							controller: ["$scope", "popbox", "pop_data",
								function(a, b, c) {
									a.popbox = b;
									var d = a.vm = {
										pid: c.scope.vm.pid,
										folder_id: c.scope.vm.folder_id,
										folder_icons: config.constant.get_folder_icons,
										name: "",
										ext: 0,
										dropmenu_isopen: !1,
										is_save_ing: !1
									};
									d.js_close = function() {
											b.close()
										},
										d.js_add_folder = function(a, e, f) {
											_.isEmpty(e) || (d.save_ing = !0, wt.data.file.add_folder(d.pid, e, f, d.folder_id,
												function(a) {
													i.track("add_folder", "done", "添加文件夹弹窗"),
														a.data.icon = config.helper.build_file_icon(a.data),
														c.scope.vm.files.unshift(a.data),
														b.close()
												},
												function() {
													config.msg.error(h.instant("file.add_folder_fail"))
												},
												function() {
													d.save_ing = !1
												}))
										},
										d.js_set_folder_icon = function(a) {
											d.ext = a.ext,
												d.dropmenu_isopen = !1
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
				j.load_more_files = function() {
					j.page++,
						l()
				},
				j.js_show_menu = function(b, c, e, g) {
					b.stopPropagation(),
						1 === c.type ? f.popbox({
							target: b,
							top: e,
							left: g,
							templateUrl: "/tpl/project/file/pop_folder_menu.html",
							controller: ["$scope", "popbox", "pop_data", "$translate",
								function(a, b, d, e) {
									var f = a.vm = {
										pid: d.scope.project.pid
									};
									a.project = d.scope.project,
										a.popbox = b,
										a.folder = c,
										a.folder_name = c.name,
										a.folder_icons = config.constant.get_folder_icons,
										a.data = {},
										a.data.selected_move_to_node = "",
										wt.data.file.get_folders(f.pid,
											function(b) {
												a.folder_structure = {},
													a.folder_structure.name = e.instant("file.rootdir"),
													a.folder_structure.fid = "",
													a.folder_structure.children = b.data
											},
											function() {
												config.msg.error(e.instant("file.read_dir_err"))
											},
											function() {}),
										f.js_step = function(b) {
											a.step = b
										},
										f.js_close = function() {
											b.close()
										},
										f.js_change_name = function(d, e) {
											wt.data.file.update(f.pid, c.fid, e, "",
													function() {},
													null,
													function() {
														a.is_save_ing = !1
													}),
												c.name = e,
												b.close()
										},
										f.js_set_folder_icon = function(b) {
											wt.data.file.update_ext(f.pid, c.fid, b.ext,
													function() {}),
												a.folder.ext = b.ext,
												a.folder.icon = b.path
										},
										f.js_del_folder = function() {
											d.remove_file_and_refresh(c),
												wt.data.file.trash(f.pid, c.fid,
													function() {}),
												b.close()
										},
										f.js_move = function() {
											return _.isEmpty(a.data.selected_move_to_node) ? void b.close() : c.folder_id === a.data.selected_move_to_node.fid ? void b.close() : (m(c, a.data.selected_move_to_node), void b.close())
										}
								}
							],
							resolve: {
								pop_data: function() {
									return {
										scope: a,
										remove_file_and_refresh: n
									}
								}
							}
						}).open() : f.popbox({
							target: b,
							top: e,
							left: g,
							templateUrl: "/tpl/project/file/pop_file_menu.html",
							controller: ["$scope", "popbox", "pop_data",
								function(a, b, e) {
									var f = a.vm = {
										team_id: e.scope.project.team_id,
										pid: e.scope.vm.pid,
										file: c
									};
									a.project = e.scope.project,
										a.popbox = b,
										a.data = {},
										a.data.selected_move_to_node = "",
										wt.data.file.get_folders(a.project.pid,
											function(b) {
												a.folder_structure = {},
													a.folder_structure.name = h.instant("file.rootdir"),
													a.folder_structure.fid = "",
													a.folder_structure.children = b.data
											},
											function() {
												config.msg.error(h.instant("file.read_dir_err"))
											},
											function() {}),
										f.js_step = function(b) {
											a.step = b
										},
										f.js_close = function() {
											b.close()
										},
										f.js_del_file_success_done = function(b) {
											e.remove_file_and_refresh(b),
												a.js_close()
										},
										f.js_files_select = function(b) {
											var e = [];
											_.forEach(b,
													function(a) {
														e.push({
															original: a,
															data: {
																target: "prj",
																type: "file",
																pid: f.file.pid,
																fid: f.file.fid
															}
														})
													}),
												d.addFiles(a.project.pid, e,
													function(a, b) {
														b && b.file && "file" === b.type && c.fid === b.file.formData.fid && (c.icon = b.file.icon, c.path = b.file.path, c.size = b.file.size, c.update_date = b.file.update_date, c.update_user = b.file.update_user, c.dt = (new Date).getTime())
													}),
												a.js_close()
										},
										f.js_toggle_watch = function(a, b, c) {
											wt.bus.watch.set_watcher_toggle(f.pid, c, config.constant.xtype.file, c.fid, b)
										},
										f.js_watch_all = function(a, c, d) {
											wt.bus.watch.watch_all(f.pid, d, config.constant.xtype.file, d.fid, c, null, null,
													function() {}),
												b.close()
										},
										f.js_move = function() {
											return _.isEmpty(a.data.selected_move_to_node) ? void b.close() : c.folder_id === a.data.selected_move_to_node.fid ? void b.close() : (m(c, a.data.selected_move_to_node), void b.close())
										}
								}
							],
							resolve: {
								pop_data: function() {
									return {
										scope: a,
										remove_file_and_refresh: n
									}
								}
							}
						}).open()
				},
				j.set_view_type = function(a) {
					g.set_view_type(a)
				},
				j.set_sort = function(a) {
					g.set_sort(a),
						e.$execute("setFilesSortTypeEvent", null)
				},
				a.file_draggable_options = {
					accept: ".js-dragdropable",
					hoverClass: "file-state-on-draggable",
					containment: ".centerpanel",
					helper: "clone",
					opacity: .85,
					zIndex: 2e3,
					delay: 300,
					start: function(a, b) {
						b.helper.addClass("file-state-on-draggable")
					},
					stop: function(a, b) {},
					drag: function(a, b) {}
				},
				a.folder_droppable_options = {
					accept: ".js-dragdropable",
					over: function(a, b) {
						var c = $(a.target).attr("file-type");
						"1" !== c || $(a.target).hasClass("folder-state-file-over") || $(a.target).addClass("folder-state-file-over")
					},
					out: function(a, b) {
						$(a.target).removeClass("folder-state-file-over")
					},
					drop: function(b, c) {
						var d = $(b.target).attr("file-type");
						c.draggable.attr("file-type"),
							$(b.target).attr("file-id"),
							c.draggable.attr("file-id");
						if("0" !== d) {
							var e = $(b.target).attr("file-id"),
								f = c.helper.attr("file-id");
							_.isEmpty(e) || _.isEmpty(f) || (a.$apply(function() {
								var a = _.find(j.files, {
										fid: f
									}),
									b = _.find(j.files, {
										fid: e
									});
								m(a, b)
							}), $(b.target).removeClass("folder-state-file-over"))
						}
					}
				},
				a.$on(config.constant.event_names.on_pastefile_to_folder,
					function(a, b) {
						j.js_files_select(b)
					}),
				a.$on(config.constant.event_names.on_file_trash,
					function(a, b) {
						b && (j.files = _.reject(j.files,
							function(a) {
								return a.fid === b.fid
							}))
					}),
				a.$on(config.constant.event_names.on_file_move,
					function(a, b) {
						b && (j.files = _.reject(j.files,
							function(a) {
								return a.fid === b.fid
							}))
					}),
				a.$on(config.constant.event_names.on_file_update,
					function(a, b) {
						if(b) {
							var c = _.find(j.files, {
								fid: b.fid
							});
							c.name = b.name,
								c.desc = b.desc
						}
					}),
				a.$on(config.constant.event_names.on_right_menu,
					function(b, d) {
						var e = config.helper.mouse_position(d),
							f = null,
							g = "file-item-mark";
						if($(d.target).hasClass(g)) f = $(d.target).attr("file-id");
						else {
							if(!($(d.target).parents("." + g).length > 0)) return;
							f = $(d.target).parents("." + g).attr("file-id")
						}
						if(f) {
							var h = _.find(j.files, {
								fid: f
							});
							h && (h.type === config.constant.file_type.file && c.global.prj_module.watch & a.project.permission ? j.js_show_menu(d, h, e.y, e.x) : c.global.prj_module.crud & a.project.permission && j.js_show_menu(d, h, e.y, e.x))
						}
					}),
				a.$on(config.constant.event_names.on_uploadfile_add,
					function(a, b) {
						j.files.push(b.file)
					})
		
	}])
	;
});