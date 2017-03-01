/**
 * @ngdoc function
 * @name jtWorkApp.service: shortcut
 * @description
 */
define(['app'], function (app) {
    'use strict';

    app.service('quickSwitch',["$uibModal", "$rootScope", "globalDataContext",
    	function(a,b,c){
    		
			function d() {
				b.$on("$stateChangeSuccess",
					function(a, b, d, e, f) {
						if(d.username) {
							var g = _.find(c.contacts, {
								name: d.username
							});
							c.cache.recent_open.add("member", g)
						} else d.pid && c.getProject(d.pid, !1, !1).then(function(a) {
							return null === a ? null : void c.cache.recent_open.add("project", a)
						})
					})
			}
			var e = null,
				f = this;
			d(),
				this.toggle = function() {
					return e ? e.close() : (e = a.open({
							windowClass: "dialog-w530",
							templateUrl: "/app/js/service/quickswitch/quickswitch.html",
							controller: ["$scope", "$uibModalInstance", "globalDataContext", "$state", "filterProjectsFilter", "locator", "wtScrollService", "$timeout", "filterMembersFilter",
								function(a, b, c, d, e, g, h, i, j) {
									var k = a.vm = {
										keytip: window.navigator.userAgent.indexOf("Mac OS") === -1 ? "Ctrl" : "⌘",
										keyword: "",
										recentOpen: c.cache.recent_open.get(),
										projects: c.projects,
										contacts: c.contacts,
										projectsAbstracts: [],
										searchMode: !1,
										searching: !1,
										results: [],
										results_total: 0,
										results_maxlength: 15
									};
									c.loadProjectAbstracts(function(a) {
											k.projectsAbstracts = a
										}),
										k.keySelectionOptions = {
											scrollContainer: ".quickswitch-result",
											itemSelector: ".result-item",
											hoverClass: "current",
											globalKey: !0,
											callbacks: {
												hover: function(a, b) {
													if(b) {
														var c = angular.element(b).scope().item;
														k.js_mouseover_result(c)
													}
												},
												select: function(a, b) {
													if(!b) return void k.js_search(a);
													var c = angular.element(b),
														d = c.scope().item;
													switch(c.attr("rel")) {
														case "project":
															k.js_to_project(d);
															break;
														case "entity":
															k.js_to_entity(d);
															break;
														case "member":
															k.js_to_profile(d)
													}
												}
											}
										},
										k.remove_recentOpen = function(a) {
											var b = a.uid ? "member" : "project",
												d = a.uid ? "uid" : "pid";
											k.recentOpen = c.cache.recent_open.remove(b, a[d])
										},
										k.js_to_project = function(a) {
											d.go("project", {
													pid: a.pid
												}, {
													reload: !0
												}),
												f.toggle()
										},
										k.js_to_profile = function(a) {
											d.go("profile.info", {
													username: a.name
												}, {
													reload: !0
												}),
												f.toggle()
										},
										k.js_to_entity = function(a) {
											switch(a.__type) {
												case "task":
													g.openTask(a.pid, a.tid),
														f.toggle();
													break;
												case "event":
													g.openEvent(a.pid, a.event_id),
														f.toggle();
													break;
												case "file":
													a.type === kzi.constant.file_type.folder ? g.toPath("/project/" + a.pid + "/folder/" + a.fid) : g.openFile(a.pid, a.fid),
														f.toggle();
													break;
												case "post":
													g.openPost(a.pid, a.post_id),
														f.toggle();
													break;
												case "page":
													g.openPage(a.pid, a.page_id),
														f.toggle();
													break;
												case "mail":
													g.openMail(a.mail_id),
														f.toggle()
											}
										},
										k.js_go_more = function() {
											f.toggle()
										},
										k.solve_entity_icon = function(a) {
											var b;
											switch(a.__type) {
												case "task":
													b = a.completed ? "fa fa-check-square" : "fa fa-square-o";
													break;
												case "event":
													b = "fa fa-calendar-o";
													break;
												case "file":
													b = a.type === kzi.constant.file_type.folder ? "fa fa-folder-o" : "fa fa-file-o";
													break;
												case "page":
													b = "fa fa-file-text-o";
													break;
												case "post":
													b = "fa fa-comment-o";
													break;
												case "mail":
													b = "fa fa-envelope-o"
											}
											return b
										},
										k.solve_project = function(a) {
											return _.find(k.projectsAbstracts, {
												pid: a
											})
										},
										k.entity_title = function(b) {
											var c = "";
											switch(b.__type) {
												case "event":
												case "file":
												case "post":
												case "page":
												case "task":
													c = b.name;
													break;
												case "mail":
													c = b.subject
											}
											return a.tmpTitle = c.replace(/</g, "&lt;").replace(/>/g, "&gt;"),
												c = "" !== k.keyword ? a.$eval('tmpTitle|reHighlight:"' + k.keyword + '"') : a.tmpTitle
										},
										k.js_change_keyword = function() {
											_.findIndex(k.recentOpen, {
													is_current: !0
												}) !== -1 && (_.find(k.recentOpen, {
													is_current: !0
												}).is_current = !1),
												_.findIndex(k.projects, {
													is_current: !0
												}) !== -1 && (_.find(k.projects, {
													is_current: !0
												}).is_current = !1),
												k.searchMode && (k.searchMode = !1, k.searching = !1, k.results = [])
										},
										k.js_search = function(a) {
											return "" === k.keyword ? ($(".dialog-quickswitch").find(".search-area input").focus(), a.preventDefault(), !1) : (k.searchMode = !0, k.searching = !0, void wt.data.search.all(k.keyword, 1, {},
												function(a) {
													var b = {
														tasks: "task",
														events: "event",
														files: "file",
														pages: "page",
														posts: "post",
														mails: "mail"
													};
													k.results = a.data.results,
														k.results = _(k.results).map(function(a, c) {
															var d = b[c];
															return k.results_total += k.results[c].total || 0,
																_.each(k.results[c].data,
																	function(a) {
																		a.__type = d
																	}),
																k.results[c].data
														}).flatten().compact().sortByOrder(["__score", "update_date"], ["desc", "desc"]).uniq().value() || [],
														k.results = k.results.slice(0, k.results_maxlength)
												},
												null,
												function() {
													k.searching = !1
												}))
										},
										k.js_esc = function(a) {
											if("" === k.keyword) {
												var b = _.findIndex(k.recentOpen, {
													is_current: !0
												});
												b !== -1 && (k.recentOpen[b].is_current = !1, a.stopPropagation(), a.preventDefault())
											} else if(k.searchMode === !1) {
												var b = _.findIndex(k.projects, {
													is_current: !0
												});
												b !== -1 && (k.projects[b].is_current = !1, a.stopPropagation(), a.preventDefault())
											} else if(k.searchMode === !0) {
												var b = _.findIndex(k.results, {
													is_current: !0
												});
												b !== -1 && (k.results[b].is_current = !1, a.stopPropagation(), a.preventDefault())
											}
										},
										k.js_mouseover_result = function(a) {
											_.each(k.recentOpen,
													function(a) {
														a.is_current = !1
													}),
												_.each(k.projects,
													function(a) {
														a.is_current = !1
													}),
												_.each(k.contacts,
													function(a) {
														a.is_current = !1
													}),
												_.each(k.results,
													function(a) {
														a.is_current = !1
													}),
												a.is_current = !0
										},
										k.js_close = function() {
											b.dismiss("cancel")
										}
								}
							]
						}), e.result.then(function() {
								e = null
							},
							function() {
								e = null
							})),
						e
				}
		

    }])
})