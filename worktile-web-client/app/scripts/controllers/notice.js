/**
 * @ngdoc function
 * @name jtWorkApp.controller:notice
 * @description
 * # Search related controllers
 * Controller of the jtWorkApp
 */
define(['app'], function (app) {
	'use strict';

	app.controller('noticeCtrl', ["$scope", "$rootScope", "$timeout", "globalDataContext", "$translate", 
				"ycTrack",'config','api',
		function (a, b, c, d, e, f,config,api) {

			f.track("notice", "visit");
			var g = a.vm = {
					part_loading_done: !1,
					read_notices: [],
					unread_notices: [],
					pending_notices: [],
					tab: "unread",
					accordion_justone: !0,
					accordion_firstopen: !0,
					since_id: 0,
					unReadFilterType: "all",
					readFilterType: "all",
					temp_global_title: b.global.title
				},
				h = function() {
					0 === g.read_notices.length && (g.part_loading_done = !1),
						api.get_notice_list(
							{
								1:g.readFilterType, 
								2:g.since_id, 
								3:config.config.default_count, 
								4:1,
							},
							function(a) {
								_.isEmpty(a.data) || (g.since_id = a.data[a.data.length - 1].published, _.isEmpty(g.read_notices) ? g.read_notices = a.data : g.read_notices = g.read_notices.concat(a.data)),
									a.data.length < config.config.default_count && (g.has_no_more = !0)
							},
							null,
							function() {
								g.part_loading_done = !0;
							})
				},
				i = function(a) {
					g.part_loading_done = !1,
					api.get_notice_list(
						{
							0:"all", 
							1:0, 
							2:"all", 
							3:0,
						},
						function(a) {
							g.unread_notices = a.data;
							var b = 0;
							_.each(_.map(a.data, "count"),
									function(a) {
										b += a
									}),
								d.changeUnreadCount(b)
						},
						null,
						function() {
							g.part_loading_done = !0
						})
				},
				j = function() {
					return _.isEmpty(g.pending_notices) ? (g.part_loading_done = !1, void wt.data.notice.get_pending_list(function(a) {
							g.pending_notices = a.data
						},
						null,
						function() {
							g.part_loading_done = !0
						})) : void(g.pending_notices = _.reject(g.pending_notices,
						function(a) {
							return !a.is_pending
						}))
				};
			g.setReadFilterType = function(a) {
					g.readFilterType = a,
						g.since_id = 0,
						g.read_notices = [],
						h()
				},
				g.setUnReadFilterType = function(a) {
					g.unReadFilterType = a
				},
				g.js_load_more_notice = function() {
					h()
				},
				g.js_switch_tab = function(a) {
					a !== g.tab && (g.tab = a, "unread" === g.tab ? (g.unReadFilterType = "all", _.isEmpty(g.unread_notices) || (g.unread_notices = _.reject(g.unread_notices,
						function(a) {
							return 1 === a.is_read
						}))) : "read" === g.tab ? 0 === g.since_id && h() : "pending" === g.tab && j())
				},
				a.$on("wtInboxTriggerSuccess",
					function(b, d) {
						d ? i() : c(function() {
							g.tab = "",
								g.unread_notices = [],
								g.read_notices = [],
								g.has_no_more = !1,
								g.pending_notices = [],
								g.since_id = 0,
								a.js_switch_tab("unread")
						})
					});
			var k = function() {
				i()
			};
			k(),
				a.$on(config.constant.event_names.notice_new,
					function(a, b) {
						b.is_pending = 0,
							b.is_read = 0,
							g.unread_notices.unshift(b)
					}),
				g.js_show_slide_detail = function(a, b, c) {
					g.js_set_notice_read(null, b)
				},
				g.js_toggle_notice_pending = function(a, b) {
					a.stopPropagation();
					var c = b.is_pending ? 0 : 1;
					wt.data.notice.update_pending(b.nid, c,
						function(a) {
							var e = _.find(g.unread_notices, {
								nid: b.nid
							});
							e && (e.is_pending = c, c || (e.is_read = 1, d.readNotice(1))),
								e = _.find(g.read_notices, {
									nid: b.nid
								}),
								e && (e.is_pending = c),
								e = _.find(g.pending_notices, {
									nid: b.nid
								}),
								e && (e.is_pending = c, c || (e.is_read = 1)),
								c && !_.isEmpty(g.pending_notices) && g.pending_notices.push(b)
						})
				},
				g.js_handle_all_notice = function() {
					g.set_allhandleing || (g.set_allhandleing = !0, wt.data.notice.set_allhandle(function() {
							_.each(g.pending_notices,
									function(a) {
										var b = _.find(g.unread_notices, {
											nid: a.nid
										});
										b && (b.is_pending = 0, b.is_read || (b.is_read = 1, d.readNotice(1))),
											b = _.find(g.read_notices, {
												nid: a.nid
											}),
											b && (b.is_pending = 0)
									}),
								g.pending_notices = []
						},
						null,
						function() {
							g.set_allhandleing = !1
						}))
				},
				g.js_set_notice_read = function(a, b) {
					_.isEmpty(a) || a.stopPropagation(),
						0 === b.is_read && (b.is_read = 1, void 0 === b.count || 1 === b.count ? wt.data.notice.set_read(b.nid,
							function() {
								_.isEmpty(g.read_notices) || _.find(g.read_notices, {
										nid: b.nid
									}) || g.read_notices.unshift(b),
									b.is_read = 1,
									d.readNotice(1)
							},
							function() {
								b.is_read = 0,
									config.msg.error(e.instant("directive_notice.err_set_read_fail"))
							}) : wt.data.notice.set_reads(b.nids,
							function() {
								_.isEmpty(g.read_notices) || _.find(g.read_notices, {
										nid: b.nid
									}) || g.read_notices.unshift(b),
									b.is_read = 1,
									d.readNotice(b.count)
							},
							function() {
								b.is_read = 0,
									config.msg.error(e.instant("directive_notice.err_set_read_fail"))
							}))
				},
				g.js_set_all_notice_read = function() {
					!g.setting_all_notice_read && g.part_loading_done && (g.setting_all_notice_read = !0, wt.data.notice.set_allread("all",
						function() {
							if(!_.isEmpty(g.unread_notices)) {
								var a = 0;
								_.each(g.unread_notices,
										function(b) {
											1 !== b.is_read && (b.is_read = 1, void 0 === b.count || 1 === b.count ? a++ : a += b.count, _.isEmpty(g.read_notices) || _.find(g.read_notices, {
												nid: b.nid
											}) || g.read_notices.unshift(b))
										}),
									g.unread_notices = [],
									d.readNotice(a)
							}
							g.setting_all_notice_read = !1
						},
						function() {
							g.setting_all_notice_read = !1
						}))
				}
		
	}])
	;
});