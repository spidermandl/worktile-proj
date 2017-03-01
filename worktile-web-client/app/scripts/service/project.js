/**
 * @ngdoc function
 * @name jtWorkApp.service:ProjectService
 * @description
 * project 相关api service
 * project of the jtWorkApp
 */
define(['app'], function (app) {
    'use strict';
    app.service('ProjectService', 
    	["$uibModal","globalDataContext","$state","$translate","$location",
    	"ycTrack","$UploadFile","config",'api',"Util",
        function(a, globalDataContext, c,$translate,e,f,g,config,api,util) {
        	//["$uibModal", "globalDataContext", "$state", "$translate", "$location", "ycTrack", "$wtUploadFile"]
        	//       a                b              c           d             e           f             g
			var h = this;
			this.showAdd = function(e, g) {
					a.open({
						windowClass: "dialog-w680",
						templateUrl: config.templateUrls.project_dialog_create,
						controller: ["$scope", "$uibModalInstance", "$rootScope",
							function(h, i, j) {
								function k() {
									l.teams = util.team.get_add_prj_teams(globalDataContext.teams);
									api.get_template_list(function(a) {
										l.system_templates = a.data,
											_.each(l.system_templates,
												function(a) {
													_.each(a.projects,
														function(a) {
															a.type = 2;
														});
												})
									});
									n();
									e && l.change_project_team();
								}
								var l = h.vm = {
										new_project: {
											name: "",
											template_id: "",
											desc: "",
											team_id: e
										},
										current_template: {
											type: null,
											id: "",
											name: ""
										},
										teams: [],
										filter_templates_category: null,
										system_templates: [],
										step_index: 0
									},
									m = function() {
										l.system_templates = _.reject(l.system_templates, {
											category: $translate.instant("dialog_project_create.filter_title_team_template")
										})
									},
									n = function() {
										l.current_template = {
												type: null,
												id: ""
											};
										$translate.use(j.global.me.locale).then(function() {
											l.current_template.name = $translate.instant("dialog_project_create.current_template_empty");
										});
									},
									o = function(a) {
										var d = a.data;
										f.track("create_project", "done", "创建项目弹窗", d.team_id === -1 ? "个人项目" : "团队项目"),
											globalDataContext.cache.project.add(d),
											d.member_count = 1,
											i.close(),
											g ? g(a.data) : c.go("project", {
												pid: d.pid
											})
									},
									//创建项目第一个弹窗
									p = function() {
										return l.new_project.team_id ? 
											(l.new_project.team_id && "-1" !== l.new_project.team_id ? 
												api.get_project_templates(l.new_project.team_id).then(function(a) {
														var b = a.data;
														_.each(b,
																function(a, b) {
																	b + 1 <= 5 ? a.image = b + 1 + ".jpg" : a.image = b % 5 + 1 + ".jpg",
																		a.type = 1,
																		a.id = a.template_id
																}),
															m(),
															l.system_templates.unshift({
																category: $translate.instant("dialog_project_create.filter_title_team_template"),
																projects: b
															});
														var c = _.find(l.teams, {
															team_id: l.new_project.team_id
														});
														if(null != c.template_id && "" !== c.template_id && 0 !== c.template_id) {
															var e = _.find(l.system_templates[0].projects, {
																template_id: c.template_id
															});
															l.current_template = {
																type: 1,
																id: e.id,
																name: e.name
															}
														} else 1 === l.current_template.type && n()
												}) 
												: (m(), 1 === l.current_template.type && n()),
													l.visibilities = util.project.get_visibilities(l.new_project.team_id), 
													void(l.new_project.visibility || (l.new_project.visibility = config.constant.prj_visibility.private))
											) 
											: 
											void(l.visibilities = []);
									};
								l.js_filter_templates_category = function(a) {
										l.filter_templates_category = a
									},
									l.js_select_template = function(a) {
										l.current_template.id === a.id ? n() : (l.current_template.type = a.type, l.current_template.id = a.id, l.current_template.name = a.name)
									},
									l.js_select_template_ok = function() {
										l.step_index = 0
									},
									l.js_cancel_select_template = function() {
										l.step_index = 0
									},
									l.js_goto_template_list = function() {
										l.filter_templates_category = null,
											l.step_index = 1
									},
									l.js_preview_template = function(b, c) {
										b.stopPropagation(),
											a.open({
												windowClass: "dialog-w1000",
												templateUrl: config.templateUrls.dialog_project_create_preview_template,
												controller: ["$scope", "$uibModalInstance",
													function(a, b) {
														function d() {
															2 == c.type && wt.data.templates.get(c.id,
																function(a) {
																	e.template.entries = a.data.entries
																})
														}
														var e = a.vm = {
															template: c
														};
														d(),
															e.close = function() {
																b.close()
															}
													}
												]
											})
									},
									//创建项目
									l.js_project_add = function(a) {
										l.saving || 
											(l.saving = !0, 
												"-1" === l.new_project.team_id || l.new_project.team_id === -1 ? 
												api.add_project({
														team_id:0,
														name: l.new_project.name, 
														desc: l.new_project.desc, 
														visibility: l.new_project.visibility, 
														template_type: l.current_template.type, 
														template_id: l.current_template.id===""?1:l.current_template.id, 
													},
													o, null,
													function() {
														l.saving = !1
													})
												: 
												api.add_project({
														team_id: l.new_project.team_id===""? 0:l.new_project.team_id, 
														name: l.new_project.name, 
														desc: l.new_project.desc, 
														visibility: l.new_project.visibility, 
														template_type: l.current_template.type, 
														template_id: l.current_template.id===""?1:l.current_template.id, 
													},
													o, null, null), 
												a.preventDefault())
									},
									l.change_project_team = function() {
										l.new_project.visibility = 
											config.constant.prj_visibility.private;
										p();
									},
									l.close = function() {
										i.close()
									},
									k()
							}
						]
					})
				},
				this.showAddMember = function(c) {
					var e = a.open({
						windowClass: "dialog-w680",
						templateUrl: config.templateUrls.project_sidebar_add_member,
						controller: ["$scope", "$rootScope", "$location", "Util", "$window",
							function(a, g, h, i, j) {
								function k() {
									if(l.project.link_join_code) {
										l.invite_link_open = !0,
											l.invite_link = window.location.origin + "/project/link/join?code=" + l.project.link_join_code;
										var a = [g.global.config.weixin_url(), "/member/join?join_code=", l.project.link_join_code].join("");
										wt.data.utils.get_qrcode(a, 6, null,
											function(a) {
												l.invite_qrcode = a
											})
									}
									return "-1" === l.project.team_id || l.project.team_id === -1 ? 
										void(l.part_loading_done = !0) 
										: 
										void globalDataContext.loadTeamMembers(l.project.team_id).then(function(a) {
											var b = _.map(l.project.members, "uid");
											a = _.reject(a, {
													status: config.constant.status.pending
												}),
												a = _.reject(a, {
													uid: g.global.me.uid
												}),
												_.each(a,
													function(a) {
														b.indexOf(a.uid) < 0 ? a.role === config.role.guest ? l.unassigned_team_visitors.push(a) : l.unassigned_team_members.push(a) : l.contact_members_exist.push(a);
													}),
												_.each(l.project.members,
													function(a) {
														!_.find(l.contact_members_exist), {
															uid: a.uid
														} && l.contact_members_exist.push(a)
													}),
												l.part_loading_done = !0
										})
								}
								var l = a.vm = {
									part_loading_done: !1,
									prj_id: c.pid,
									project: c,
									step_index: 1,
									filter_contacts_input: void 0,
									search_user_input: void 0,
									visitors_fold: !0,
									unassigned_team_members: [],
									unassigned_team_visitors: [],
									contact_members_exist: [],
									contact_members_selected: [],
									contact_members_invited: [],
									is_searching: !1,
									search_member: [],
									error_show_not_support_phone: !1,
									invite_message: $translate.instant("project_service.invite_message"),
									invite_email_batch: [],
									invite_email_batch_error: "",
									invite_link_open: !1,
									invite_link: "",
									invite_qrcode: ""
								};
								k(),
									l.js_close = function() {
										e.close()
									},
									l.js_step = function(a) {
										l.step_index = a
									},
									l.change_keyword = function() {
										l.search_member = [],
											l.error_show_not_support_phone = !1,
											l.is_searching = !1
									},
									l.js_search_member = function(a) {
										g.global.constant.regex.phone_email.test(l.search_user_input) ? (l.is_searching = !0, wt.data.user.search_accurate_user(l.search_user_input,
											function(a) {
												if(null == a.data) {
													if(g.global.constant.regex.mobile.test(l.search_user_input)) l.error_show_not_support_phone = !0;
													else if(g.global.constant.regex.email.test(l.search_user_input)) {
														var b = 1;
														(_.find(l.contact_members_exist, {
															email: l.search_user_input
														}) || _.find(l.contact_members_invited, {
															email: l.search_user_input
														})) && (b = 4);
														var c = l.search_user_input.substring(0, l.search_user_input.indexOf("@"));
														l.search_member = [{
															name: c,
															email: l.search_user_input,
															display_name: l.search_user_input,
															avatar: "default_avatar.png",
															status: b
														}]
													}
												} else _.find(l.contact_members_exist, {
														uid: a.data.uid
													}) ? a.data.status = 3 : a.data.status = 1,
													l.search_member = [a.data]
											})) : ($('input[name="search_user_input"]').addClass("error"), kzi.msg.warn($translate.instant("project_service.warn_phone_email_valid")))
									},
									l.js_contact_add_all = function() {
										var a = [],
											b = _.map(l.unassigned_team_members, "uid");
										_.each(b,
												function(b) {
													a.push({
														uid: b,
														role: kzi.constant.role.member
													})
												}),
											wt.data.project.add_members(l.prj_id, a,
												function(a) {
													kzi.msg.success($translate.instant("project_service.full_add_members_success")),
														_.each(l.unassigned_team_members,
															function(a) {
																_.findIndex(l.contact_members_selected, {
																		uid: a.uid
																	}) === -1 && l.contact_members_selected.push(a),
																	g.$broadcast(config.constant.event_names.project_add_member, {
																		pid: l.prj_id,
																		member: a
																	})
															}),
														l.unassigned_team_members = []
												},
												function() {
													kzi.msg.error($translate.instant("project_service.full_add_members_fail"))
												})
									},
									l.js_contact_add = function(a) {
										var b = {};
										if(_.isEmpty(a.uid)) {
											var e = l.search_user_input.substring(0, l.search_user_input.indexOf("@"));
											b = {
													email: a.email,
													phone: a.phone,
													name: a.email,
													display_name: e,
													role: 2
												},
												wt.data.project.invite_members(l.prj_id, [b],
													function(e) {
														kzi.msg.success($translate.instant("project_service.invite_members_success")),
															l.search_user_input = "",
															l.search_member = [],
															_.find(l.contact_members_invited, {
																email: a.email
															}) || l.contact_members_invited.push(b),
															_.find(c.members, {
																email: a.email
															}) || (c.members.push(e.data[0]), f.track("project_invite", "done", "邀请项目成员", "邮箱地址")),
															$('input[name="search_user_input"]').focus()
													},
													function(a) {
														kzi.msg.error($translate.instant("project_service.invite_members_fail"))
													})
										} else wt.data.project.add_member(l.prj_id, a.uid, kzi.constant.role.member,
											function(b) {
												kzi.msg.success($translate.instant("project_service.add_member_success")),
													l.project.members.push(b.data),
													l.contact_members_exist.push(b.data),
													l.contact_members_selected.push(b.data),
													l.search_member = [],
													l.is_searching = !1,
													_.findIndex(l.contact_members_selected, {
														uid: a.uid
													}) === -1 && (f.track("project_invite", "done", "邀请项目成员", "联系人"), l.contact_members_selected.push(a)),
													l.unassigned_team_members = _.reject(l.unassigned_team_members,
														function(b) {
															return b.uid === a.uid
														}),
													l.unassigned_team_visitors = _.reject(l.unassigned_team_visitors,
														function(b) {
															return b.uid === a.uid
														}),
													g.$broadcast(config.constant.event_names.project_add_member, {
														pid: l.prj_id,
														member: a
													})
											},
											function() {
												kzi.msg.error($translate.instant("project_service.add_member_fail"))
											})
									},
									l.js_invite_link_open = function() {
										wt.data.project.join_link_open(l.prj_id,
											function(a) {
												l.project.link_join_code = a.data,
													l.invite_link_open = !0,
													l.invite_link = j.location.origin + "/project/link/join?code=" + l.project.link_join_code;
												var b = [g.global.config.weixin_url(), "/member/join?join_code=", l.project.link_join_code].join("");
												wt.data.utils.get_qrcode(b, 6, null,
													function(a) {
														l.invite_qrcode = a
													})
											},
											function() {
												kzi.msg.error($translate.instant("project_service.join_link_open_fail"))
											})
									},
									l.js_toggle_visitors_fold = function() {
										l.visitors_fold = !l.visitors_fold
									},
									l.js_invite_link_close = function() {
										wt.data.project.join_link_close(l.prj_id,
											function() {
												l.invite_link_open = !1,
													l.project.link_join_code = ""
											},
											function() {
												kzi.msg.error($translate.instant("project_service.join_link_close_fail"))
											})
									}
							}
						]
					})
				},
				this.showSetting = function(c) {
					var e = a.open({
						windowClass: "dialog-w680",
						templateUrl: "/app/js/service/project/dialog_project_setting.html",
						controller: ["$scope", "$rootScope", "$location", "bus", "$window",
							function(a, f, i, j, k) {
								function l() {}

								function l() {
									d.use(f.global.me.locale).then(function() {
											_.each(m.apps_all,
												function(a) {
													a.name = $translate.instant(a.name),
														a.desc = $translate.instant(a.desc)
												})
										}),
										a.temp_prj = _.clone(m.project),
										a.visibilities = wt.bus.project.get_visibilities(m.project.team_id)
								}
								var m = a.vm = {
									part_loading_done: !1,
									prj_id: c.pid,
									project: c,
									step_index: 1,
									filter_contacts_input: void 0,
									search_user_input: void 0,
									visitors_fold: !0,
									unassigned_team_members: [],
									unassigned_team_visitors: [],
									contact_members_exist: [],
									contact_members_selected: [],
									contact_members_invited: [],
									is_searching: !1,
									search_member: [],
									error_show_not_support_phone: !1,
									pid: c.pid,
									backgorundfile_model: null,
									background_image_uploading: !1
								};
								m.js_toggle_star = function() {
										b.cache.project.set_star(m.project.pid)
									},
									m.js_prj_update = function(c) {
										a.temp_prj.name === m.project.name && a.temp_prj.bg === m.project.bg && a.temp_prj.pic === m.project.pic && a.temp_prj.desc === m.project.desc && a.temp_prj.visibility === m.project.visibility || (a.is_prj_saveing = !0, _.isEmpty(m.project.desc) && (m.project.desc = ""), wt.data.project.update(m.project.pid, a.temp_prj.name, a.temp_prj.bg, a.temp_prj.pic, a.temp_prj.desc, a.temp_prj.visibility,
											function() {
												b.cache.project.update(m.project.pid, a.temp_prj.name, a.temp_prj.bg, a.temp_prj.pic, a.temp_prj.desc, a.temp_prj.visibility),
													kzi.msg.success($translate.instant("project_service.update_project_success"))
											},
											function() {
												kzi.msg.error($translate.instant("project_service.update_project_fail"))
											},
											function() {
												a.is_prj_saveing = !1
											}))
									},
									m.js_open_project_move = function() {
										h.showMove(m.project),
											m.js_close()
									},
									m.js_open_project_archive = function() {
										h.showArchive(m.project),
											m.js_close()
									},
									m.js_open_project_del = function() {
										h.showDel(m.project),
											m.js_close()
									},
									m.js_open_project_webhook = function() {
										h.showWebhook(m.project),
											m.js_close()
									},
									m.js_open_project_createbymail = function() {
										h.showCreateByMail(m.project),
											m.js_close()
									},
									m.js_toggle_show_background_image = function() {
										m.project.show_background = 1 === parseInt(m.project.show_background, 10) ? "0" : "1",
											wt.data.project.set_prefs(m.project.pid, "show_background", m.project.show_background,
												function(a) {
													kzi.msg.success($translate.instant("account.toggle_show_background_success"))
												})
									},
									m.set_background = function(a) {
										m.project.background !== a && wt.data.project.set_background(m.project.pid, a,
											function() {
												m.project.background = a,
													kzi.msg.success($translate.instant("account.set_background_success"))
											},
											function() {
												kzi.msg.error($translate.instant("account.set_background_fail"))
											})
									},
									m.background_file_select = function(a, b) {
										if(null != m.backgorundfile_model)
											if(b.select_file_btn.$valid && !m.backgorundfile_model.$error) {
												if(!a || 0 === a.length) return;
												m.background_image_uploading = !0,
													g.uploadBackgroundImage({
															original: a[0],
															data: {
																target: "special",
																type: "background"
															}
														},
														function(a, b) {
															!a && b ? wt.data.project.set_bg_image(m.project.pid, b.url,
																function() {
																	m.project.bg_image = b.url
																},
																function() {
																	kzi.msg.error($translate.instant("account.save_background_fail"))
																},
																function() {
																	m.background_image_uploading = !1
																}) : (m.background_image_uploading = !1, kzi.msg.error($translate.instant("account.upload_background_fail")))
														})
											} else "pattern" === m.backgorundfile_model.$error && kzi.msg.error($translate.instant("account.upload_background_format_err")),
												"maxSize" === m.backgorundfile_model.$error && kzi.msg.error($translate.instant("account.upload_background_too_large"))
									},
									m.toggle_email_notify = function() {
										var a = m.project.is_notify ? 0 : 1;
										wt.data.project.set_prefs(m.project.pid, "is_notify", a,
											function(b) {
												1 === a ? kzi.msg.success($translate.instant("project_service.email_notify_opened")) : kzi.msg.success($translate.instant("project_service.email_notify_closed")),
													m.project.is_notify = a
											},
											function() {})
									},
									l(),
									m.js_close = function() {
										e.close()
									},
									m.js_step = function(a) {
										m.step_index = a
									},
									l()
							}
						]
					})
				},
				this.showLabels = function(b) {
					var c = a.open({
						windowClass: "dialog-w680",
						templateUrl: "/app/js/service/project/dialog_project_labels.html",
						controller: ["$scope", "$rootScope", "$location", "bus", "$window",
							function(a, d, e, f, g) {
								function h() {}
								var i = a.vm = {
									part_loading_done: !1,
									prj_id: b.pid,
									project: b
								};
								h(),
									i.js_close = function() {
										c.close()
									}
							}
						]
					})
				},
				this.showTimingtasks = function(c) {
					var e = a.open({
						windowClass: "dialog-w680",
						templateUrl: "/app/js/service/project/dialog_project_timingtasks.html",
						controller: ["$scope", "$rootScope", "$location", "bus", "$window", "timingtaskService", "$popbox",
							function(a, f, g, h, i, j, k) {
								function l() {
									wt.data.timingtask.get_timingtasks(n.project.pid,
										function(a) {
											n.prj_timingtasks = a.data
										},
										null,
										function() {
											n.part_loading_done = !0
										})
								}

								function m() {
									b.loadEntries(n.project.pid,
										function(a) {
											n.entries = a
										})
								}
								var n = a.vm = {
									part_loading_done: !1,
									prj_id: c.pid,
									project: c,
									entries: [],
									prj_timingtasks: []
								};
								l(),
									m(),
									a.$on(config.constant.event_names.show_project_setting_timingtask,
										function() {
											l()
										}),
									n.to_edit_mode = function(a) {
										j.showAddEdit(a, null, n.entries)
									},
									n.js_timingtask_del = function(a, b) {
										k.popbox({
											target: a,
											templateUrl: "/tpl/common/pop_delete_confirm.html",
											controller: ["$rootScope", "$scope", "popbox",
												function(a, c, e) {
													c.popbox = e,
														c.js_close = function() {
															e.close()
														},
														c.delete_message = $translate.instant("service_timingtask.del_desc"),
														c.delete_title = $translate.instant("service_timingtask.del_title"),
														c.delete_button = $translate.instant("service_timingtask.btn_del"),
														c.js_sure_delete = function() {
															c.is_deleting = !0,
																wt.data.timingtask.del_timingtask(b.pid, b.ttid,
																	function(b) {
																		200 == b.code && (kzi.msg.info($translate.instant("service_timingtask.success_del")), a.$broadcast(config.constant.event_names.show_project_setting_timingtask), c.js_close())
																	},
																	null,
																	function() {
																		c.is_deleting = !1
																	})
														}
												}
											]
										}).open()
									},
									n.js_close = function() {
										e.close()
									},
									n.js_step = function(a) {
										n.step_index = a
									}
							}
						]
					})
				},
				this.showCopy = function(c) {
					var e = a.open({
						windowClass: "dialog-w680",
						templateUrl: "/app/js/service/project/dialog_project_copy.html",
						controller: ["$scope", "$rootScope", "$location", "bus", "$window",
							function(a, f, g, h, i) {
								function j() {}
								var k = a.vm = {
									part_loading_done: !1,
									prj_id: c.pid,
									project: c,
									is_prj_copying: !1,
									visibility_options: [{
										id: config.constant.prj_visibility.private,
										name: $translate.instant("project_service.visibility_options_private")
									}, {
										id: config.constant.prj_visibility.protected,
										name: $translate.instant("project_service.visibility_options_protected")
									}, {
										id: config.constant.prj_visibility.public,
										name: $translate.instant("project_service.visibility_options_public")
									}],
									visibility_options2: [{
										id: config.constant.prj_visibility.private,
										name: $translate.instant("project_service.visibility_options_private")
									}, {
										id: config.constant.prj_visibility.public,
										name: $translate.instant("project_service.visibility_options_public")
									}]
								};
								a.prj_copy = {
										name: "",
										teams: b.getTeamsInCharge(),
										dest_team: null,
										keepTasks: !0,
										keepFiles: !0,
										keepPosts: !0,
										keepPages: !0,
										visibility_options: k.visibility_options,
										selected_visibility: null
									},
									a.is_prj_copying = !1,
									a.js_prj_copy = function() {
										var c = "";
										a.vm.is_prj_copying = !0,
											wt.data.project.copy_project(k.project.pid, a.prj_copy.dest_team.team_id, a.prj_copy.name, a.prj_copy.keepTasks, a.prj_copy.keepFiles, a.prj_copy.keepPosts, a.prj_copy.keepPages, a.prj_copy.selected_visibility.id,
												function(a) {
													c = a.data.pid,
														b.cache.project.add(a.data),
														kzi.msg.success($translate.instant("project_service.copy_project_success"))
												},
												function(a) {
													kzi.msg.error($translate.instant("project_service.copy_project_fail"))
												},
												function() {
													a.vm.is_prj_copying = !1,
														g.path("/project/" + c),
														k.js_close()
												})
									},
									k.js_target_team_change = function(b) {
										b.team_id === -1 ? a.prj_copy.visibility_options = k.visibility_options2 : a.prj_copy.visibility_options = k.visibility_options
									},
									j(),
									k.js_close = function() {
										e.close()
									},
									k.js_step = function(a) {
										k.step_index = a
									}
							}
						]
					})
				},
				this.showMove = function(c) {
					var e = a.open({
						windowClass: "dialog-w680",
						templateUrl: "/app/js/service/project/dialog_project_move.html",
						controller: ["$scope", "$rootScope", "$location", "bus", "$window",
							function(a, f, g, h, i) {
								function j() {}
								var k = a.vm = {
									part_loading_done: !1,
									prj_id: c.pid,
									project: c
								};
								a.teams = wt.bus.team.get_add_prj_teams(b.teams),
									a.to_team_id = k.project.team_id,
									k.set_transfer_to = function(b) {
										a.to_team_id = b
									},
									k.transfer = function() {
										_.isEmpty(a.to_team_id) || (a.is_transfering = !0, wt.data.project.transfer(k.project.pid, a.to_team_id,
											function() {
												b.cache.project.shift(k.project.pid, a.to_team_id),
													kzi.msg.success($translate.instant("project_service.move_project_success")),
													k.js_close()
											},
											function() {
												kzi.msg.error($translate.instant("project_service.move_project_fail"))
											},
											function() {
												a.is_transfering = !1
											}))
									},
									j(),
									k.js_close = function() {
										e.close()
									},
									k.js_step = function(a) {
										k.step_index = a
									}
							}
						]
					})
				},
				this.showExport = function(b) {
					var c = a.open({
						windowClass: "dialog-w680",
						templateUrl: "/app/js/service/project/dialog_project_export.html",
						controller: ["$scope", "$rootScope", "$location", "bus", "$window",
							function(a, d, e, f, g) {
								function h() {}
								var i = a.vm = {
									part_loading_done: !1,
									prj_id: b.pid,
									project: b,
									export_type: "json"
								};
								h(),
									i.js_close = function() {
										c.close()
									},
									i.js_step = function(a) {
										i.step_index = a
									}
							}
						]
					})
				},
				this.showWebhook = function(b) {
					var c = a.open({
						windowClass: "dialog-w680",
						templateUrl: "/app/js/service/project/dialog_project_webhook.html",
						controller: ["$scope", "$rootScope", "$location", "bus", "$window", "$popbox",
							function(a, e, f, g, h, i) {
								function j() {
									k.part_loading_done = !1,
										a.prj_webhooks = [],
										wt.data.webhook.get_webhooks(k.project.pid,
											function(b) {
												var c = _.map(b.data,
													function(b) {
														if(1 === b.is_every) return b;
														var c = (b.actions.join(","), b.actions);
														b.actions = _.map(a.webhook_action,
															function(a) {
																return b.actions.indexOf(a.action) > -1 ? a.action : ""
															});
														var d = _.map(c,
															function(b) {
																var c = _.find(a.webhook_action, {
																	action: b
																});
																return c ? c.desc : ""
															});
														return b.actionsStr = "(" + d.join(",") + ")",
															b
													});
												a.prj_webhooks = c
											},
											null,
											function() {
												k.part_loading_done = !0
											})
								}
								var k = a.vm = {
									part_loading_done: !1,
									prj_id: b.pid,
									project: b,
									is_add: !1,
									pid: b.pid
								};
								a.webhook_action = kzi.constant.actions,
									_.each(a.webhook_action,
										function(a) {
											a.desc = $translate.instant(a.desc)
										}),
									a.to_edit_webhook = function(b) {
										k.is_add = !0,
											a.edit_webhook = _.clone(b)
									},
									a.to_add_webhook = function() {
										k.is_add = !0,
											a.edit_webhook = {
												actions: []
											},
											a.edit_webhook.is_every = 1
									},
									a.cancel_edit = function() {
										k.is_add = !1
									},
									a.js_webhook_add_edit = function() {
										if(a.edit_webhook.is_every = parseInt(a.edit_webhook.is_every), 1 !== a.edit_webhook.is_every) {
											if(a.edit_webhook.actions = _.without(a.edit_webhook.actions, void 0, ""), 0 === a.edit_webhook.actions.length) return void kzi.msg.warn($translate.instant("project_service.warn_add_webhook_action_require"));
											a.edit_webhook.actions = _.uniq(a.edit_webhook.actions)
										} else a.edit_webhook.actions = [];
										a.edit_webhook.wid ? wt.data.webhook.change_webhook(k.pid, a.edit_webhook,
											function(a) {
												kzi.msg.info($translate.instant("project_service.edit_webhook_success")),
													k.is_add = !1,
													j()
											}) : wt.data.webhook.add_webhook(k.pid, a.edit_webhook,
											function(a) {
												kzi.msg.info($translate.instant("project_service.add_webhook_success")),
													k.is_add = !1,
													j()
											})
									},
									a.js_webhook_del = function(b, c) {
										i.popbox({
											target: b,
											templateUrl: "/tpl/common/pop_delete_confirm.html",
											controller: ["$rootScope", "$scope", "popbox", "pop_data",
												function(a, b, e, f) {
													b.popbox = e,
														b.js_close = function() {
															e.close()
														},
														b.delete_message = $translate.instant("project_service.del_webhook_info"),
														b.delete_title = $translate.instant("project_service.del_webhook_title"),
														b.delete_button = $translate.instant("project_service.del_webhook_btn"),
														b.js_sure_delete = function() {
															b.is_deleting = !0,
																wt.data.webhook.del_webhook(k.pid, c.wid,
																	function(a) {
																		200 === a.code && (kzi.msg.info($translate.instant("project_service.del_webhook_success")), f.scope.vm.is_add = !1, k.is_add = !1, j(), b.js_close())
																	},
																	null,
																	function() {
																		b.is_deleting = !1
																	})
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
									j(),
									k.js_close = function() {
										c.close()
									},
									k.js_step = function(a) {
										k.step_index = a
									}
							}
						]
					})
				},
				this.showCreateByMail = function(b) {
					var c = a.open({
						windowClass: "dialog-w680",
						templateUrl: "/app/js/service/project/dialog_project_createbymail.html",
						controller: ["$scope", "$rootScope", "$location", "bus", "$window",
							function(a, d, e, f, g) {
								function h() {}
								var i = a.vm = {
									part_loading_done: !1,
									prj_id: b.pid,
									project: b,
									mail_domain: kzi.constant.mail.domain
								};
								h(),
									i.js_close = function() {
										c.close()
									},
									i.js_step = function(a) {
										i.step_index = a
									}
							}
						]
					})
				},
				this.showQuit = function(c) {
					var e = a.open({
						windowClass: "dialog-w680",
						templateUrl: "/app/js/service/project/dialog_project_quit.html",
						controller: ["$scope", "$rootScope", "$location", "bus", "$window",
							function(a, f, g, h, i) {
								function j() {}
								var k = a.vm = {
										part_loading_done: !1,
										prj_id: c.pid,
										project: c
									},
									l = _.filter(k.project.members,
										function(a) {
											return a.uid !== f.global.me.uid && a.role === kzi.constant.role.admin
										});
								a.has_other_admin = l.length > 0,
									a.js_prj_quit = function(c) {
										c === k.project.name ? (a.is_quiting = !0, wt.data.project.member_leave(k.project.pid,
											function() {
												b.cache.project.remove(k.project.pid),
													g.path("/dashboard"),
													kzi.msg.info($translate.instant("project_service.quit_project_success", {
														project_name: k.project.name
													})),
													k.js_close()
											},
											null,
											function() {
												a.is_quiting = !1
											})) : kzi.msg.warn($translate.instant("project_service.warn_name_valid_confirm_quit"))
									},
									j(),
									k.js_close = function() {
										e.close()
									},
									k.js_step = function(a) {
										k.step_index = a
									}
							}
						]
					})
				},
				this.showArchive = function(c) {
					var e = a.open({
						windowClass: "dialog-w680",
						templateUrl: "/app/js/service/project/dialog_project_archive.html",
						controller: ["$scope", "$rootScope", "$location", "bus", "$window",
							function(a, f, g, h, i) {
								function j() {}
								var k = a.vm = {
									part_loading_done: !1,
									pid: c.pid,
									project: c,
									is_archiving: !1
								};
								k.js_prj_archive = function() {
										k.is_archiving = !0,
											wt.data.project.archive(k.pid,
												function() {
													k.project.archived = 1,
														k.project.permission = kzi.constant.prj_module.view,
														b.cache.project.remove(k.pid),
														kzi.msg.success($translate.instant("project_service.archive_success")),
														k.js_close()
												},
												null,
												function() {
													k.is_archiving = !1
												})
									},
									j(),
									k.js_close = function() {
										e.close()
									},
									k.js_step = function(a) {
										k.step_index = a
									}
							}
						]
					})
				},
				this.showActive = function(b) {
					var c = a.open({
						windowClass: "dialog-w680",
						templateUrl: "/app/js/service/project/dialog_project_active.html",
						controller: ["$scope", "globalDataContext",
							function(a, e) {
								function f() {}
								var g = a.vm = {
									part_loading_done: !1,
									pid: b.pid,
									project: b,
									is_unarchiving: !1
								};
								g.js_prj_unarchive = function() {
										g.is_unarchiving = !0,
											wt.data.project.unarchive(g.pid,
												function() {
													g.project.archived = 0,
														kzi.msg.success($translate.instant("project_service.unarchive_success")),
														e.reloadProjects(function(a) {
															var b = _.find(a, {
																pid: g.pid
															});
															b && (g.project.permission = b.permission)
														}),
														g.js_close()
												},
												null,
												function() {
													g.is_unarchiving = !1
												})
									},
									f(),
									g.js_close = function() {
										c.close()
									},
									g.js_step = function(a) {
										g.step_index = a
									}
							}
						]
					})
				},
				this.showDel = function(c) {
					var e = a.open({
						windowClass: "dialog-w680",
						templateUrl: "/app/js/service/project/dialog_project_del.html",
						controller: ["$scope", "$rootScope", "$location", "bus", "$window",
							function(a, f, g, h, i) {
								function j() {}
								var k = a.vm = {
									part_loading_done: !1,
									pid: c.pid,
									project: c,
									is_deleting: !1
								};
								k.js_prj_del = function(a) {
										a === k.project.name ? (k.is_deleting = !0, wt.data.project.del(k.pid,
											function() {
												b.cache.project.remove(k.pid),
													g.path("/dashboard"),
													k.js_close()
											},
											null,
											function() {
												k.is_deleting = !1
											})) : kzi.msg.warn($translate.instant("project_service.warn_project_name_valid"))
									},
									j(),
									k.js_close = function() {
										e.close()
									},
									k.js_step = function(a) {
										k.step_index = a
									}
							}
						]
					})
				},
				this.showExtension = function(e) {
					var f = a.open({
						windowClass: "dialog-w680",
						templateUrl: "/app/js/service/project/dialog_project_extension.html",
						controller: ["$scope", "$rootScope", "$location", "bus", "$window",
							function(a, g, h, i, j) {
								function k() {
									wt.bus.project.get_extensions(l.project.extensions,
										function(a) {
											var b = _.groupBy(a,
												function(a) {
													return a.type
												});
											_.each(b[1],
													function() {}),
												l.extensions = {
													apps: b[1],
													systems: b[2],
													third_parties: b[3]
												}
										})
								}
								var l = a.vm = {
									part_loading_done: !1,
									pid: e.pid,
									project: e,
									extensions: null,
									order_apps_status: !1
								};
								l.js_toggle_extension = function(a) {
										if(1 === a.pro && l.project.members.length <= 5) return void kzi.msg.error($translate.instant("dialog_project_extension.warn_enable_vip"));
										var e = 0 == a.enable ? 1 : 0;
										wt.data.project.set_extension(l.project.pid, a, e,
											function(d) {
												if(a.enable = e, 0 === e && (l.project.extensions = _.reject(l.project.extensions, {
														eid: a.eid
													})), 1 === e) {
													l.project.extensions = _.sortBy(l.project.extensions, "pos");
													var f = _.last(l.project.extensions);
													l.project.extensions.push({
														eid: a.eid,
														type: 1,
														join_date: moment().valueOf(),
														pos: 2 * f.pos
													})
												}
												if(b.cache.project.change_extensions(l.pid, a, e, l.project.extensions), 1 === a.type && g.global.project_iconmenu === a.key) {
													var h = "project." + _.map(l.project.navigations, "key")[0];
													"project.page" === h && (h = "project.page.list"),
														c.go(h)
												}
											})
									},
									l.nav_sortable_options = {
										containment: ".extensions-type-list-apps",
										placeholder: "prj-nav-placeholder",
										revert: 10,
										dropOnEmpty: !0,
										tolerance: "pointer",
										distance: 8,
										delay: 0,
										handle: ".wtf-projectmove",
										items: "li:not(.ui-state-disabled)",
										connectWith: ".js-sortable-extensions",
										start: function(a, b) {
											b.item.addClass("picked-up"),
												$(".prj-nav-placeholder").css({
													height: b.item.css("height"),
													width: b.item.width()
												})
										},
										stop: function(a, c) {
											c.item.removeClass("picked-up");
											var d = _.find(l.extensions.apps, {
													eid: c.item.data("eid")
												}),
												e = null;
											1 === c.item.next().scope().extension.enable && (e = c.item.next().data("eid")),
												d && b.cache.project.extension_change_pos(l.pid, d, e,
													function(a) {
														d.pos = a.data
													})
										}
									},
									l.js_toggle_order_apps = function() {
										l.order_apps_status = !l.order_apps_status,
											l.order_apps_status ? $(".extensions-list").sortable("option", "disabled", !1) : $(".extensions-list").sortable("option", "disabled", !0)
									},
									k(),
									l.js_close = function() {
										f.close()
									},
									l.js_step = function(a) {
										l.step_index = a
									},
									g.$on(config.constant.event_names.project_extensions_change,
										function(a, b) {
											k()
										})
							}
						]
					})
				}
		

    }])
})



