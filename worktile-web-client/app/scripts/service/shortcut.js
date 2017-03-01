/**
 * @ngdoc function
 * @name jtWorkApp.service: shortcut
 * @description
 */
define(['app'], function (app) {
    'use strict';

    app.service('shortcutKey',["$rootScope", "$document", "$stateParams", "$location", 
    	"$uibModal", "quickSwitch", "taskService", "$state",'config',
    	function(a, b, c, d, e, f, g, h,config){
    	//["$rootScope", "$document", "$stateParams", "$location", "$uibModal", "quickSwitch", "taskService", "$state"]
    	
			var i = {
					quickcreate: "quickcreate",
					quickcreate_task: "quickcreate_task",
					quickswitch: "quickswitch",
					shortcutkey: "shortcutkey"
				},
				j = this,
				k = j.current = {
					state: null,
					floatlayer: null
				},
				l = [85, 71, 83, 78, 80, 84, 70],
				m = function(a) {
					a === config.constant.keyASCIIs.K && "keydown" === event.type && (k.floatlayer = f.toggle(), k.floatlayer ? (k.state = i.quickswitch, k.floatlayer.result.then(function() {
							k.state = null,
								k.floatlayer = null
						},
						function() {
							k.state = null,
								k.floatlayer = null
						})) : k.state = null)
				},
				n = function(a) {
					a === config.constant.keyASCIIs.T ? 
						d.path("/project/" + c.pid + "/task") 
						: 
						a === config.constant.keyASCIIs.C ? 
							d.path("/project/" + c.pid + "/post") 
							: 
							a === config.constant.keyASCIIs.F ? 
								d.path("/project/" + c.pid + "/file") 
								: 
								a === config.constant.keyASCIIs.D ? 
									d.path("/project/" + c.pid + "/page") 
									: 
									a === config.constant.keyASCIIs.A ? 
										d.path("/project/" + c.pid + "/activity") 
										: 
										a === config.constant.keyASCIIs.E ? 
											d.path("/project/" + c.pid + "/event") 
											: 
											a === config.constant.keyASCIIs.R ? 
												d.path("/project/" + c.pid + "/trash") 
												: 
												a === config.constant.keyASCIIs.G && d.path("/project/" + c.pid + "/graph")
				},
				o = function(b, c, d, e, f) {
					if(b === config.constant.keyASCIIs.ESC && 
						a.global.leftmenu_current_expand && (a.global.leftmenu_current_expand = ""), 
						d || c.shiftKey || c.ctrlKey || c.altKey || c.metaKey || !(l.indexOf(b) >= 0)) {
						if(a.global.leftmenu_current_expand) {
							var g = [config.constant.keyASCIIs.VK_DOWN, 
									config.constant.keyASCIIs.VK_UP, 
									config.constant.keyASCIIs.ENTER];
							return void(g.indexOf(b) >= 0 && a.$broadcast(config.constant.event_names.shortcut_key_select_prjs, {
								keyCode: b,
								event: c
							}))
						}
					} else a.$broadcast(config.constant.event_names.shortcut_key_left_menu, {
						keyCode: b,
						event: c
					});
					f || (b === config.constant.keyASCIIs.E ? 
						a.$broadcast(config.constant.event_names.shortcut_key_to_edit) 
						: 
						b === config.constant.keyASCIIs.ESC && a.$broadcast(config.constant.event_names.shortcut_key_to_cancel), 
							!c.ctrlKey && !c.altKey && !c.metaKey && $.inArray(b, config.constant.entry_shortcut_keys) > -1 && 
							a.$broadcast(config.constant.event_names.shortcut_key_to_task, b), 
							b !== config.constant.keyASCIIs.VK_DOWN || c.metaKey || 
							a.$broadcast(config.constant.event_names.scroll_down, b), 
							b === config.constant.keyASCIIs.VK_UP && a.$broadcast(config.constant.event_names.scroll_up, b), 
							(b === config.constant.keyASCIIs.VK_PAGEDOWN || c.metaKey === !0 && b === config.constant.keyASCIIs.VK_DOWN) && 
							a.$broadcast(config.constant.event_names.scroll_page_down), 
							(b === config.constant.keyASCIIs.VK_PAGEUP || c.metaKey === !0 && b === config.constant.keyASCIIs.VK_UP) && 
							a.$broadcast(config.constant.event_names.scroll_page_up), b === config.constant.keyASCIIs.L && c.ctrlKey === !0 && 
							a.$broadcast(config.constant.event_names.page_go_full_screen))
				};
			this.showShortcutKeyDialog = function() {
					return k.state === i.shortcutkey ? void(k.floatlayer && k.floatlayer.close()) : (k.state = i.shortcutkey, k.floatlayer = e.open({
						templateUrl: "/app/js/service/shortcutkey/dialog_shortcutkey.html",
						controller: ["$scope", "$uibModalInstance",
							function(a, b) {
								var d = a.vm = {
										keytip: window.navigator.userAgent.indexOf("Mac OS") === -1 ? "Ctrl" : "⌘"
									},
									e = c.pid;
								_.isEmpty(e) ? a.pid = "all" : a.pid = e,
									d.js_close = function() {
										b.dismiss("cancel")
									}
							}
						],
						size: "lg",
						resolve: {}
					}), void k.floatlayer.result.then(function() {
							k.state = null,
								k.floatlayer = null
						},
						function() {
							k.state = null,
								k.floatlayer = null
						}))
				},
				this.init = function() {
					b.bind("keydown keypress",
						function(b) {
							a.$apply(function() {});
							var d = b.which || b.keyCode,
								e = b.target || b.srcElement,
								l = !1;
							if(d !== config.constant.keyASCIIs.VK_SPACE || "keypress" !== b.type) {
								null === e || "INPUT" !== e.nodeName && "TEXTAREA" !== e.nodeName || (l = !0);
								var p = !0;
								if(window.navigator.userAgent.indexOf("Mac OS") !== -1 && (p = !1), p ? 
									b.ctrlKey && !b.metaKey && !b.altKey && 
									!b.shiftKey && $.inArray(d, config.constant.ctrl_cutover_keys) > -1 && m(d) 
									: 
									b.metaKey && !b.ctrlKey && !b.altKey && !b.shiftKey && 
									$.inArray(d, config.constant.ctrl_cutover_keys) > -1 && 
									m(d), !b.ctrlKey && !b.altKey && !b.metaKey && b.shiftKey && 
									$.inArray(d, config.constant.shift_cutover_keys) > -1) {
									if(l || k.state === i.shortcutkey) return;
									if(d === config.constant.keyASCIIs.S && "keypress" === b.type && 
										(k.floatlayer = f.toggle(), k.floatlayer ? 
											(k.state = i.quickswitch, k.floatlayer.result.then(
												function() {
													k.state = null,
														k.floatlayer = null
												},
												function() {
													k.state = null,
														k.floatlayer = null
												})) 
											: 
											k.state = null), d === config.constant.keyASCIIs.Q && "keypress" === b.type && 
											(k.floatlayer = g.showAdd(!0), k.floatlayer ? 
												(k.state = i.quickcreate_task, k.floatlayer.result.then(function() {
														k.state = null,
															k.floatlayer = null
													},
													function() {
														k.state = null,
															k.floatlayer = null
													})) 
												: 
												k.state = null), _.isEmpty(c.pid)) return;
									"project_not_found" !== h.current.name && n(d, b)
								} else if($.inArray(d, config.constant.global_shortcut_keys) > -1 || 
									$.inArray(d, config.constant.entry_shortcut_keys) > -1) {
									if(d !== config.constant.keyASCIIs.ESC && l && !e.getAttributeNode("trigger-keydown")) return;
									if(d === config.constant.keyASCIIs.ESC && b.preventDefault(), 
										d !== config.constant.keyASCIIs.QuestionMark && 
										d !== kzi.constant.keyASCIIs.Slash || j.showShortcutKeyDialog(), 
										k.state === i.shortcutkey) 
										return;
									var q = !1,
										r = [".fancybox-wrap:visible", ".modal:visible"];
									if(_.forEach(r,
											function(a) {
												$(a).length > 0 && (q = !0)
											}), q) return;
									var s = !1,
										t = [".ui-select-dropdown:visible", ".popbox:visible", ".dropdown-menu:visible"];
									_.forEach(t,
											function(a) {
												$(a).length > 0 && (s = !0)
											}),
										o(d, b, l, q, s)
								}
							}
						})
				}
		
    }])
})