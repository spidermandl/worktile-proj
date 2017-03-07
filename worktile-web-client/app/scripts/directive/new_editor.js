/**
 * @ngdoc function
 * @name jtWorkApp.directive:new editor
 * @description
 * # new editor 任务项，右侧划出详情框
 */
define(['app'], function (app) {
	'use strict';
	app.directive('wtNewEditor', 
		["$timeout", "$rootScope", "$popbox", "linkentityService", "sanitize", "$translate",
			 "inertPicFromBoxFilter",'config',
			 
		  function(a, b, c, d, e, f, g,config) {
		  	return{
				restrict: "E",
				replace: !0,
				scope: {
					title: "=editTitle",
					content: "=editContent",
					pid: "=pid",
					mode: "@mode",
					entity_id: "=entityId",
					entity_type: "@entityType",
					watchers: "=watchers",
					page_message: "=message",
					page_parent_id: "=parentId",
					page_is_notify: "=pageIsNotify"
				},
				transclude: !0,
				templateUrl: "/tpl/directive/wt_new_editor.html",
				link: function(h, i) {
					function j(a) {
						var b, c, d = "1m1m1m1m1m1m",
							f = h.content,
							g = f.substr(0, a.start - 1),
							i = f.substr(a.start, f.length - a.start - 1);
						f = g + "\n\n1. " + d + i,
							b = r.makeHtml(f),
							c = e(b);
						var j = $("<div>" + c + "</div>"),
							k = j.find('li:contains("' + d + '")');
						return 0 === k.length && (k = j.find('p:contains("' + d + '")').closest("li")),
							k.index() + 1
					}

					function k() {
						a(function() {
								if(h.content) {
									var a = r.makeHtml(h.content),
										b = e(a);
									h.html = b
								}
								_.isEmpty(h.content) && (h.html = "")
							}),
							t = void 0
					}

					function l() {
						t ? (clearTimeout(t), t = setTimeout(k, 500)) : t = setTimeout(k, 500)
					}
					var m = h.$parent;
					h.hideMini = !1,
						h.inPreview = !1,
						h.isFullscreen = !1;
					var n = !1,
						o = !1;
					"mini" === h.mode ? h.isMini = !0 : h.isMini = !1,
						i.find(".fullscreen-mk-content-textarea").on("scroll",
							function() {
								if(!o) {
									n = !0;
									var b = i.find(".right-side"),
										c = i.find(".fullscreen-mk-content-textarea"),
										d = c.scrollTop(),
										e = b.prop("scrollHeight") - b.prop("clientHeight"),
										f = c.prop("scrollHeight") - c.prop("clientHeight"),
										g = d / f * e;
									b.scrollTop(g),
										a(function() {
												n = !1
											},
											200)
								}
							}),
						i.find(".right-side").on("scroll",
							function() {
								if(!n) {
									o = !0;
									var b = i.find(".right-side"),
										c = i.find(".fullscreen-mk-content-textarea"),
										d = b.scrollTop(),
										e = b.prop("scrollHeight") - b.prop("clientHeight"),
										f = c.prop("scrollHeight") - c.prop("clientHeight"),
										g = d / e * f;
									c.scrollTop(g),
										a(function() {
												o = !1
											},
											200)
								}
							});
					var p = i.find(".wnd-content-textarea"),
						q = i.find(".fullscreen-mk-content-textarea"),
						r = new Markdown.Converter;
					Markdown.Extra.init(r),
						Markdown.Extra.init(r);
					var s = {
							"cmd-bold": {
								search: /([^\n]+)([\n\s]*)/g,
								replace: "**$1**$2",
								defaultText: f.instant("wt_new_editor2.bold"),
								select: {
									leftOmit: 2,
									rightOmit: 2
								}
							},
							"cmd-italic": {
								search: /([^\n]+)([\n\s]*)/g,
								replace: "_$1_$2",
								defaultText: f.instant("wt_new_editor2.italic"),
								select: {
									leftOmit: 1,
									rightOmit: 1
								}
							},
							"cmd-code": {
								search: /([^\n]+)([\n\s]*)/g,
								replace: "\n```\n$1\n```$2",
								defaultText: f.instant("wt_new_editor2.code"),
								select: {
									leftOmit: 5,
									rightOmit: 4
								}
							},
							"cmd-horizontal-line": {
								append: "\n***\n",
								select: {
									leftOmit: 5,
									rightOmit: 0
								}
							},
							"cmd-unorder-list": {
								search: /(.+)([\n]?)/g,
								replace: "\n* $1",
								defaultText: f.instant("wt_new_editor2.unorder_list"),
								select: {
									leftOmit: 3,
									rightOmit: 0
								}
							},
							"cmd-order-list": {
								search: /(.+)([\n]?)/g,
								replace: "\n1. $1",
								defaultText: f.instant("wt_new_editor2.order_list"),
								select: {
									leftOmit: 4,
									rightOmit: 0
								}
							},
							"cmd-blockquote": {
								search: /(.+)([\n]?)/g,
								replace: "\n> $1\n",
								defaultText: f.instant("wt_new_editor2.quote"),
								select: {
									leftOmit: 3,
									rightOmit: 1
								}
							},
							"cmd-h1": {
								search: /(.+)([\n]?)/g,
								replace: "\n# $1$2",
								defaultText: f.instant("wt_new_editor2.h1"),
								select: {
									leftOmit: 3,
									rightOmit: 0
								}
							},
							"cmd-h2": {
								search: /(.+)([\n]?)/g,
								replace: "\n## $1$2",
								defaultText: f.instant("wt_new_editor2.h2"),
								select: {
									leftOmit: 4,
									rightOmit: 0
								}
							},
							"cmd-h3": {
								search: /(.+)([\n]?)/g,
								replace: "\n### $1$2",
								defaultText: f.instant("wt_new_editor2.h3"),
								select: {
									leftOmit: 5,
									rightOmit: 0
								}
							},
							"cmd-insert-link": {
								exec: function(b, d) {
									c.popbox({
										target: b,
										placement: "bottom",
										templateUrl: "/tpl/common/pop_add_link_2.html",
										controller: ["$scope", "popbox",
											function(b, c) {
												b.popbox = c,
													b.link_address = "http://",
													b.insert = function() {
														var e = d.textrange("get");
														0 === e.length && (e.text = f.instant("wt_new_editor2.link_desc"), e.length = e.text.length);
														var g = "[" + e.text + "](" + b.link_address + ")";
														d.textrange("replace", g);
														var i = e.start + 1,
															j = e.text.length;
														a(function() {
																d.textrange("set", i, j)
															}),
															h.content = d.val(),
															c.close()
													}
											}
										]
									}).open()
								}
							},
							"cmd-insert-image": {
								exec: function(b, d) {
									c.popbox({
										target: b,
										placement: "bottom",
										templateUrl: "/tpl/common/pop_add_image2.html",
										controller: ["$rootScope", "$scope", "$filter", "$stateParams", "popbox", "$sce", "$wtUploadFile",
											function(b, c, e, i, j, k, l) {
												c.popbox = j,
													c.step = 0,
													c.pid = h.pid,
													c.js_step = function(a) {
														c.step = a
													},
													c.js_close = function() {
														j.close()
													},
													c.js_show_images = function() {
														c.step = 1,
															_.isEmpty(c.images) && (c.images_loading_done = !1, c.images = null, wt.data.file.get_image_list(c.pid,
																function(a) {
																	c.images = a.data
																},
																null,
																function() {
																	c.images_loading_done = !0
																}))
													},
													c.js_select_image = function(a) {
														c.step = 0,
															c.image_address = g(a),
															c.js_insert_image()
													},
													c.js_insert_image = function() {
														var b = d.textrange("get"),
															e = f.instant("wt_new_editor2.text");
														d.textrange("replace", "![" + e + "](" + c.image_address + ")"),
															a(function() {
																d.textrange("set", b.start + 2, e.length)
															}),
															h.content = d.val(),
															j.close()
													},
													c.js_upload_image = function(a) {
														if(c.uploading_done !== !0) {
															c.uploading_done = !1,
																c.error_msg = null;
															var b = [];
															_.forEach(a,
																	function(a) {
																		b.push({
																			original: a,
																			data: {
																				target: "prj",
																				pid: c.pid
																			}
																		})
																	}),
																l.addFiles(c.pid, b,
																	function(a, b) {
																		b && b.file && "project" === b.type && (b.file.icon = kzi.helper.build_file_icon(b.file), _.isEmpty(c.images) || c.images.push(b.file), c.image_address = g(b.file), c.js_insert_image(), c.uploading_done = !0)
																	}),
																j.close()
														}
													},
													c.token = kzi.get_cookie("sid"),
													c.action_url = b.global.config.box_url() + "?pid=" + c.pid + "&token=" + c.token,
													k.trustAsUrl(c.action_url)
											}
										]
									}).open()
								}
							},
							"cmd-insert-linkentity": {
								exec: function(a, b) {
									d.showSearch(a, h.pid,
										function(a) {
											b.textrange("replace", a),
												h.content = b.val()
										})
								}
							},
							"cmd-save": {
								exec: function(a, c) {
									switch(h.entity_type) {
										case "vm.post":
											if(_.isEmpty(h.title)) return void kzi.msg.error(f.instant("wt_new_editor2.warn_title"));
											if(_.isEmpty(h.entity_id)) {
												var d = _.map(h.watchers, "uid");
												h.is_saving = !0,
													wt.data.post.add(h.pid, h.title, h.content, d,
														function(a) {
															b.$broadcast(kzi.constant.event_names.post_created_by_editor, a.data),
																h.entity_id = a.data.post_id,
																kzi.msg.success(f.instant("wt_new_editor2.success_add_post")),
																h.cancelFullscreen(),
																_.isFunction(m.vm.js_cancel_edit_post) && m.vm.js_cancel_edit_post()
														},
														function() {
															kzi.msg.error(f.instant("wt_new_editor2.fail_add_post"))
														},
														function() {
															h.is_saving = !1
														})
											} else h.is_saving = !0,
												wt.data.post.update(h.pid, h.entity_id, h.title, h.content,
													function(a) {
														kzi.msg.success(f.instant("wt_new_editor2.success_update_post")),
															h.cancelFullscreen(),
															_.isFunction(m.vm.js_cancel_editor) && m.vm.js_cancel_editor(),
															b.$broadcast(kzi.constant.event_names.post_updated_by_editor, {
																name: h.title,
																content: h.content,
																pid: h.pid,
																post_id: h.entity_id
															})
													},
													function() {
														kzi.msg.error(f.instant("wt_new_editor2.fail_update_post"))
													},
													function() {
														h.is_saving = !1
													});
											break;
										case "vm.page":
											if(_.isEmpty(h.title)) return void kzi.msg.error(f.instant("wt_new_editor2.err_title_require"));
											_.isEmpty(h.entity_id) ? (h.is_saving = !0, wt.data.page.add(h.pid, h.title, h.content, h.page_message, h.page_parent_id, [],
												function(a) {
													kzi.msg.success(f.instant("wt_new_editor2.success_add_page")),
														h.entity_id = a.data.page_id,
														b.$broadcast(kzi.constant.event_names.page_created_by_editor, a.data),
														h.cancelFullscreen(),
														m.vm.js_cancel_edit()
												},
												null,
												function() {
													h.is_saving = !1
												})) : (h.is_saving = !0, wt.data.page.update(h.pid, h.entity_id, h.title, h.content, h.page_message, h.page_parent_id, h.page_is_notify, 0,
												function() {
													kzi.msg.success(f.instant("wt_new_editor2.success_update_page")),
														b.$broadcast(kzi.constant.event_names.page_updated_by_editor, {
															page_id: h.entity_id,
															parent_id: h.page_parent_id,
															name: h.title,
															content: h.content,
															message: h.page_message
														}),
														h.cancelFullscreen(),
														m.vm.js_cancel_edit()
												},
												null,
												function() {
													h.is_saving = !1
												}));
											break;
										default:
											kzi.msg.warn("entity type error")
									}
								}
							},
							"cmd-preview": {}
						},
						t = void 0;
					h.$watch("content",
							function(a, b) {
								a !== b && l()
							}),
						h.execEditorCmd = function(b, c) {
							var d;
							if(d = h.isFullscreen ? q : h.isMini ? i.find(".mini-content-textarea") : p, s[c].search && s[c].replace) {
								var e = d.textrange("get"),
									f = null;
								"cmd-order-list" === c && (f = j(e)),
									0 === e.length && (s[c].defaultText && (e.text = s[c].defaultText), e.length = e.text.length);
								var g = "";
								if(f > 0 && "cmd-order-list" === c) {
									var k = e.text.split("\n");
									_.each(k,
										function(a, b) {
											a.length > 0 && (k[b] = a.replace(s[c].search, "\n" + f++ + ". $1")),
												g = k.join("")
										})
								} else g = e.text.replace(s[c].search, s[c].replace);
								d.textrange("replace", g),
									h.content = d.val(),
									a(function() {
										if(s[c].select) {
											var a = e.start;
											a += s[c].select.leftOmit;
											var b = g.length;
											b = b - s[c].select.rightOmit - s[c].select.leftOmit,
												d.textrange("set", a, b)
										}
									})
							}
							if(s[c].append && (d.textrange("replace", s[c].append), h.content = d.val(), s[c].select)) {
								var l = d.textrange("get"),
									m = l.start;
								m += s[c].select.leftOmit,
									d.textrange("set", m, 0)
							}
							s[c].exec && s[c].exec(b, d)
						},
						h.flipPreview = function() {
							k();
							var a = p.closest(".flip-container");
							if(h.inPreview === !1) {
								var b = a.find(".wnd-content-textarea"),
									c = b.prop("scrollHeight") - b.prop("clientHeight"),
									d = b.scrollTop();
								h.inPreview = !h.inPreview,
									a.addClass("flipped");
								var e = a.find(".wnd-content-html"),
									f = e.prop("scrollHeight") - e.prop("clientHeight"),
									g = d / c * f;
								e.scrollTop(g),
									a.find(".front").css("z-index", 1),
									a.find(".back").css("z-index", 2)
							} else a.removeClass("flipped"),
								h.inPreview = !h.inPreview,
								a.find(".front").css("z-index", 2),
								a.find(".back").css("z-index", 1)
						},
						h.goFullscreen = function() {
							k(),
								h.isFullscreen = !0,
								b.isFullscreen = !0,
								h.isMini === !0 && (h.hideMini = !0);
							var a = i.parents(".slide-content");
							a.data("skipLoadOnce", !0).addClass("none"),
								i.parents(".wt-scroll").addClass("wt-scroll--fixed"),
								h.isMini && i.find(".left-right-container").css("top", "48px")
						},
						h.cancelFullscreen = function() {
							h.isFullscreen = !1,
								b.isFullscreen = !1,
								h.isMini === !0 && (h.hideMini = !1);
							var a = i.parents(".slide-content");
							a.data("skipLoadOnce", !0).removeClass("none"),
								i.parents(".wt-scroll").removeClass("wt-scroll--fixed")
						}
				}
			
		  	}
			
	}]);
});