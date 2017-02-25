/**
 * @ngdoc function
 * @name constant
 * @description
 * constant of the jtWorkApp
 */
 define(function (require) {
 	'use strict';
 	
	!function(){

			var a = {},
				b = {
					mobile_area: "^[0-9]{1,4}$",
					mobile_probable: "^[0-9]{6,15}$",
					mobile: ["^(\\+?0?86\\-?)?1[345789]\\d{9}$|", "^(\\+?27|0)\\d{9}$|", "^(\\+?61|0)4\\d{8}|", "^(\\+?33|0)[67]\\d{8}$|", "^(\\+351)?9[1236]\\d{7}$"].join(""),
					email: "^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
				};
			a.locales_name = [{
					value: "en-us",
					name: "English"
				}, {
					value: "zh-cn",
					name: "简体中文"
				}],
			a.locales = ["en-us", "zh-cn"],
			a.role = {
				deleted: -1,
				admin: 1,
				member: 2,
				guest: 3,
				visitor: 4
			},
			a.state = {
				offline: 0,
				online: 1,
				busy: 2,
				leave: 3
			},
			a.scopes = {
				all: 0,
				team_member: 1,
				team_admin: 2,
				project_member: 3,
				project_admin: 4,
				single_user: 5
			},
			a.broadcast_args = {
				notice_unread: "notice_unread",
				notice_new: "notice_new",
				project_list: "project_list",
				project_single: "project_single",
				project_members: "project_members",
				project_member_remove: "project_member_remove",
				member_single: "member_single",
				entry_list: "entry_list",
				entry_add: "entry_add",
				entry_list_position: "entry_list_position",
				entry_rename: "entry_rename",
				entry_is_archive: "entry_is_archive",
				entry_is_trash: "entry_is_trash",
				task_single: "task_single",
				task_batch: "task_batch",
				task_complete: "task_complete",
				task_delete: "task_delete",
				task_archive: "task_archive",
				tasks_batch_archive: "tasks_batch_archive",
				team_single: "team_single",
				team_list: "team_list",
				team_member_role: "team_member_role",
				project_member_role: "project_member_role",
				comment_new: "comment_new",
				notice_read: "notice_read",
				weixin_bind: "weixin_bind",
				task_lock: "task_lock"
			},
			a.status = {
				ok: 1,
				pending: 2,
				removed: 3
			},
			a.user_status = {
				ok: 1,
				pending: 2,
				inactived: 3
			},
			a.user_source_type = {
				weixin: 1,
				dingtalk: 2,
				qq: 3
			},
			a.team = {
				edition: {
					free: 1,
					business: 2,
					nonprofit: 3
				},
				status: {
					normal: 1,
					stop: 2,
					expired: 3
				},
				quota_free: 10,
				quota_nonprofit: 50
			},
			a.subscription = {
				status: {
					normal: 1,
					arrears: 2,
					trial: 3,
					expired: 4
				},
				step: {
					pay_online: 1,
					already_fee: 2,
					next_fee: 3,
					already_fee_and_next_new: 4
				},
				price: 10,
				dividing_day: 20
			},
			a.billing = {
				type: {
					scheme: 1,
					spread: 2
				},
				purchased: {
					business: "business"
				},
				method: {
					auto_fee: 1
				}
			},
			a.payment = {
				status: {
					unpaid: 1,
					successed: 2,
					failed: 3,
					cancel: 4
				},
				method: {
					unknown: 0,
					online: 1,
					manual: 2,
					remit: 3,
					transfer: 4,
					recharge: 5
				},
				type: {
					unknown: 0,
					alipay: 1,
					bank: 2,
					paypal: 3,
					credit: 4,
					cash: 5,
					coupon: 6
				},
				direction: {
					payment: 1,
					refund: 2
				},
				scheme: {
					one_month: 1,
					one_quarter: 3,
					half_year: 6,
					one_year: 12,
					two_year: 24
				}
			},
			a.coupon = {
				status: {
					normal: 1,
					delivered: 2,
					used: 3
				}
			},
			a.trash = {
				no: 0,
				yes: 1
			},
			a.archived = {
				yes: 1,
				no: 0
			},
			a.star = {
				yes: 1,
				no: 0
			},
			a.favorite = {
				yes: 1,
				no: 0
			},
			a.completed = {
				yes: 1,
				no: 0
			},
			a.show_completed = {
				yes: 1,
				no: 0
			},
			a.checked = {
				yes: 1,
				no: 0
			},
			a.notify = {
				yes: 1,
				no: 0
			},
			a.selected = {
				yes: 1,
				no: 0
			},
			a.owner = {
				yes: 1,
				no: 0
			},
			a.locked = {
				yes: 1,
				no: 0
			},
			a.twofactor = {
				enabled: {
					yes: 1,
					no: 0
				},
				recoveries: 10
			},
			a.log_action = {
				signin: 1,
				changepwd: 2,
				changemail: 3,
				changphone: 4
			},
			a.chat = {
				type: {
					group: 1,
					member: 2
				},
				msg_type: {
					text: 1,
					task: 2,
					file: 3,
					post: 4,
					page: 5,
					event: 6
				}
			},
			a.guide = {
				status: {
					draft: 0,
					published: 1
				},
				category: {
					article: 1
				}
			},
			a.xtype = {
				task: "tasks",
				file: "files",
				post: "posts",
				page: "pages",
				event: "events",
				email: "emails",
				entry: "entries",
				project: "projects"
			},
			a.exts = {
				none: 0,
				txt: 1,
				png: 2,
				jpeg: 3,
				jpg: 4,
				gif: 5,
				doc: 6,
				xls: 7,
				ppt: 8,
				pdf: 9,
				zip: 10,
				rar: 11,
				xml: 12,
				html: 13,
				docx: 14,
				xlsx: 15,
				pptx: 16,
				mail: 17,
				pages: 18,
				key: 19,
				numbers: 20,
				ipa: 21,
				apk: 22,
				xap: 23,
				cs: 24,
				java: 25,
				rb: 26,
				py: 27,
				css: 28,
				js: 29,
				cpp: 30,
				c: 31,
				h: 32,
				php: 33,
				cc: 34,
				hh: 35,
				vb: 36,
				mp3: 37,
				avi: 38,
				chm: 39,
				vsd: 40,
				rp: 41,
				wmv: 42,
				bmp: 43,
				psd: 44,
				cvs: 45,
				ai: 46,
				json: 47,
				"7z": 48,
				z7: 48,
				tar: 49,
				swf: 50,
				wim: 51,
				bat: 52,
				sh: 53,
				wab: 54,
				vba: 55,
				ost: 56,
				msi: 57,
				log: 58,
				svg: 59,
				less: 60,
				md: 61,
				bin: 62,
				obj: 63,
				edx: 64,
				mmap: 65,
				thmx: 66,
				dump: 67,
				one: 68,
				pst: 69,
				vcf: 70,
				ini: 71,
				csv: 72,
				wps: 73,
				et: 74,
				dps: 75,
				pfx: 76
			},
			a.text_exts = [a.exts.txt, a.exts.xml, a.exts.html, a.exts.cs, a.exts.java, a.exts.rb, a.exts.py, a.exts.css, a.exts.js, a.exts.cpp, a.exts.c, a.exts.h, a.exts.php, a.exts.cc, a.exts.hh, a.exts.vb, a.exts.cvs, a.exts.json, a.exts.log, a.exts.less, a.exts.md, a.exts.csv],
			a.file_type = {
				file: 0,
				folder: 1
			},
			a.folder_ext = {
				normal: 0,
				image: 1,
				mail: 2,
				task: 3,
				event: 4,
				post: 5,
				page: 6,
				chat: 7,
				default: 8
			},
			a.labels = {
				green: "green",
				yellow: "yellow",
				orange: "orange",
				red: "red",
				purple: "purple",
				blue: "blue"
			},
			a.types = {
				team: "team",
				project: "project",
				entry: "entry",
				task: "task",
				post: "post",
				page: "page",
				event: "event",
				file: "file",
				folder: "folder",
				comment: "comment",
				todo: "todo",
				vote: "vote",
				user: "user"
			},
			a.prefix = {
				task: "任务",
				file: "文件",
				post: "话题",
				page: "文档",
				event: "事件",
				reply: ["Re", "RE", "回复", "re"],
				forward: ["Fw", "FW", "转发", "fw"]
			},
			a.client = {
				unknown: 0,
				web: 1,
				mail: 2,
				iphone: 3,
				ipad: 4,
				android: 5,
				androidHD: 6,
				winphone: 7,
				win8: 8,
				wap: 9,
				weinxin: 10,
				openapp: 11
			},
			a.prefs = {
				notice_by_email: {
					key: "notice_by_email",
					values: {
						yes: 1,
						no: 0
					},
					default: 1
				},
				notice_for_smart: {
					key: "notice_for_smart",
					values: {
						yes: 1,
						no: 0
					},
					default: 1
				},
				notice_for_express: {
					key: "notice_for_express",
					values: {
						yes: 1,
						no: 0
					},
					default: 1
				},
				notice_for_desktop: {
					key: "notice_for_desktop",
					values: {
						yes: 1,
						no: 0
					},
					default: 1
				},
				notice_for_daily_mail: {
					key: "notice_for_daily_mail",
					values: {
						yes: 1,
						no: 0
					},
					default: 1
				},
				notice_for_weekly_mail: {
					key: "notice_for_weekly_mail",
					values: {
						yes: 1,
						no: 0
					},
					default: 1
				},
				notice_for_weixin: {
					key: "notice_for_weixin",
					values: {
						yes: 1,
						no: 0
					},
					default: 1
				},
				notice_for_client: {
					key: "notice_for_client",
					values: {
						yes: 1,
						no: 0
					},
					default: 1
				},
				rubbish_email: {
					key: "rubbish_email",
					values: {
						yes: 1,
						no: 0
					}
				},
				invalid_email: {
					key: "invalid_email",
					values: {
						yes: 1,
						no: 0
					}
				},
				comment_auto_watch: {
					key: "comment_auto_watch",
					values: {
						yes: 1,
						no: 0
					},
					default: 1
				},
				show_background_image: {
					key: "show_background_image",
					values: {
						yes: 1,
						no: 0
					},
					default: 0
				},
				update_name_status: {
					key: "update_name_status",
					values: {
						yes: 1,
						no: 0
					},
					default: 0
				},
				is_lock_left: {
					key: "is_lock_left",
					values: {
						yes: 1,
						no: 0
					},
					default: 0
				},
				time_zone: {
					key: "time_zone",
					default: "Asia/Shanghai"
				},
				create_task_assign_me: {
					key: "create_task_assign_me",
					values: {
						yes: 1,
						no: 0
					},
					default: 0
				}
			},
			a.prj_prefs = {
				auto_archived: {
					key: "auto_archived",
					values: {
						yes: 1,
						no: 0
					},
					default: 0
				},
				show_entry_number: {
					key: "show_entry_number",
					values: {
						yes: 1,
						no: 0
					},
					default: 0
				},
				show_task_aging: {
					key: "show_task_aging",
					values: {
						yes: 1,
						no: 0
					},
					default: 0
				},
				show_background: {
					key: "show_background",
					values: {
						yes: 1,
						no: 0
					},
					default: 0
				}
			},
			a.accredit_keys = {
				app_key: "app_key",
				app_secret: "app_secret",
				access_token: "access_token",
				access_secret: "access_secret",
				client_version: "client_version",
				device_id: "device_id",
				store_from: "store_from",
				timestamp: "timestamp",
				version: "version",
				signature: "signature"
			},
			a.prj_visibility = {
				private: 1,
				protected: 2,
				public: 3
			},
			a.prj_visibilities = [1, 2, 3],
			a.prj_permission = {
				admin: 31,
				member: 15,
				guest: 7,
				viewer: 5,
				deny: 0
			},
			a.prj_module = {
				setting: 16,
				crud: 8,
				comment: 4,
				watch: 2,
				view: 1
			},
			a.team_visibility = {
				private: 1,
				public: 2
			},
			a.team_permission = {
				owner: 31,
				admin: 15,
				member: 3,
				guest: 1,
				deny: 0
			},
			a.team_module = {
				setting: 16,
				add_project: 8,
				add_member: 4,
				view: 2,
				view_base: 1
			},
			a.invite_type = {
				team: 0,
				project: 1
			},
			a.event_recurrence = {
				no_repeat: 0,
				day: 1,
				week: 2,
				month: 3,
				year: 4
			},
			a.event_trash_type = {
				one: 1,
				follow_up: 2,
				all: 3
			},
			a.event_update_type = {
				one: 1,
				follow_up: 2
			},
			a.prj_menues = {
				task: 1,
				event: 2,
				file: 3,
				post: 4,
				page: 5,
				graph: 6
			},
			a.file_sort = {
				default: 0,
				name: 1,
				create_date: 2,
				update_date: 3
			},
			a.file_filter = {
				all: 0,
				owner: 1,
				watch: 2
			},
			a.reminder_task = {
				recurrence: {
					daily: 0,
					weekly: 1,
					monthly: 2,
					two_weekly: 3,
					yearly: 4
				},
				weekdays: {
					sunday: 0,
					monday: 1,
					tuesday: 2,
					wednesday: 3,
					thursday: 4,
					friday: 5,
					saturday: 6
				}
			},
			a.authorization = {
				shimo: {
					type: 1,
					name: "CONS.authorization.shimo",
					desc: "CONS.authorization.shimo_desc",
					logo: "/img/thirdparty/shimo.png",
					auth_url: "https://api.shimo.im/oauth/authorization?client_id=7B97DDCCAFBC9E5C71C53923BD34C&response_type=code&redirect_uri=https://worktile.com/auth/shimo/callback&scope=read write"
				}
			},
			a.third_page = {
				shimo: 1
			},
			a.actions = [{
				action: "create_task",
				desc: "CONS.webhook_actions.create_task"
			}, {
				action: "complete_task",
				desc: "CONS.webhook_actions.complete_task"
			}, {
				action: "expire_task",
				desc: "CONS.webhook_actions.expire_task"
			}, {
				action: "assign_task",
				desc: "CONS.webhook_actions.assign_task"
			}, {
				action: "create_event",
				desc: "CONS.webhook_actions.create_event"
			}, {
				action: "pick_post",
				desc: "CONS.webhook_actions.pick_post"
			}, {
				action: "create_page",
				desc: "CONS.webhook_actions.create_page"
			}, {
				action: "page_version",
				desc: "CONS.webhook_actions.page_version"
			}, {
				action: "pick_comment",
				desc: "CONS.webhook_actions.pick_comment"
			}],
			a.extensions = {
				apps: [{
					eid: "478f3a4c51824ad23cb50c1c60670c0f",
					key: "task",
					name: "CONS.extensions.apps.task",
					desc: "CONS.extensions.apps.task_desc",
					type: 1,
					is_setting: 0,
					url: "//worktile.com/guide/task/overview",
					pro: 0
				}, {
					eid: "a0e7b2a565119c0a7ec3126a16016113",
					key: "event",
					name: "CONS.extensions.apps.event",
					desc: "CONS.extensions.apps.event_desc",
					type: 1,
					is_setting: 0,
					url: "//worktile.com/guide/practices/use-event-for-a-lot",
					pro: 0
				}, {
					eid: "8c7dd922ad47494fc02c388e12c00eac",
					key: "file",
					name: "CONS.extensions.apps.file",
					desc: "CONS.extensions.apps.file_desc",
					type: 1,
					is_setting: 0,
					url: "//worktile.com/guide/file/overview",
					pro: 0
				}, {
					eid: "42b90196b487c54069097a68fe98ab6f",
					key: "post",
					name: "CONS.extensions.apps.post",
					desc: "CONS.extensions.apps.post_desc",
					type: 1,
					is_setting: 0,
					url: "//worktile.com/guide/post/overview",
					pro: 0
				}, {
					eid: "71860c77c6745379b0d44304d66b6a13",
					key: "page",
					name: "CONS.extensions.apps.page",
					desc: "CONS.extensions.apps.page_desc",
					type: 1,
					is_setting: 0,
					url: "//worktile.com/guide/page/overview",
					pro: 0
				}, {
					eid: "f8b0b924ebd7046dbfa85a856e4682c8",
					key: "graph",
					name: "CONS.extensions.apps.graph",
					desc: "CONS.extensions.apps.graph_desc",
					type: 1,
					is_setting: 0,
					url: "//worktile.com/guide/project/graph",
					pro: 0
				}],
				systems: [{
					eid: "de70ff6da777e4c47bafbdf735cc3985",
					key: "task_aging",
					name: "CONS.extensions.systems.task_aging",
					desc: "CONS.extensions.systems.task_aging_desc",
					type: 2,
					is_setting: 0,
					url: "//worktile.com/guide/project/extension#task-aging",
					pro: 0
				}, {
					eid: "25b639c37bf37cf2d13350d08e70ffd1",
					key: "task_auto_arvhive",
					name: "CONS.extensions.systems.task_auto_arvhive",
					desc: "CONS.extensions.systems.task_auto_arvhive_desc",
					type: 2,
					is_setting: 0,
					url: "//worktile.com/guide/project/extension#automatic-archiving",
					pro: 0
				}, {
					eid: "c6c45e4495a68b6d99b5ae9afd78ad03",
					key: "show_task_number",
					name: "CONS.extensions.systems.entry_show_task_number",
					desc: "CONS.extensions.systems.entry_show_task_number_desc",
					type: 2,
					is_setting: 0,
					url: "//worktile.com/guide/project/extension#number-of-tasks",
					pro: 0
				}, {
					eid: "0c85466e9909ea5bcea29203c8f21447",
					key: "show_task_completed",
					name: "CONS.extensions.systems.show_task_completed",
					desc: "CONS.extensions.systems.show_task_completed_desc",
					type: 2,
					is_setting: 0,
					url: "//worktile.com/guide/project/extension#completed-task",
					pro: 0
				}],
				third_parties: [{
					eid: "292dd670b2cddc156713b1878237dc5e",
					key: "shimo",
					name: "CONS.extensions.third_parties.shimo",
					desc: "CONS.extensions.third_parties.shimo_desc",
					type: 3,
					is_setting: 0,
					url: "//worktile.com/blog/features/worktile-with-shimo",
					pro: 0
				}, {
					eid: "1d9e0c7f416168ad1b1d297816b48341",
					key: "presenter",
					name: "CONS.extensions.third_parties.presenter",
					desc: "CONS.extensions.third_parties.presenter_desc",
					type: 3,
					is_setting: 0,
					url: "//worktile.com/blog/features/worktile-presenter",
					pro: 0
				}]
			},
			a.search_types = {
				assign_me: 1,
				my_created: 2,
				my_watched: 3
			},
			a.stats_type = {
				task_overview: 1,
				task_entry: 2,
				task_member: 3,
				task_5day: 4
			},
			a.securityCodeType = {
				signup: 1,
				forgotPassword: 2,
				setMobile: 3,
				unbindMobile: 4
			},
			a.permission = {
				holder: 0,
				ok: 1,
				project_archived: 4,
				entity_not_found: 8,
				entity_deleted: 16,
				entity_archived: 32,
				team_not_found: 64,
				team_stop_service: 128
			},
			a.entity_type = {
				task: "task",
				file: "file",
				post: "post",
				page: "page",
				event: "event",
				mail: "mail"
			},
			a.notice_type_icon = {
				task: {
					name: "task",
					icon: "fa-check-square-o"
				},
				file: {
					name: "file",
					icon: "fa-file"
				},
				post: {
					name: "post",
					icon: "fa-list-alt"
				},
				page: {
					name: "page",
					icon: "fa-file-text-o"
				},
				event: {
					name: "event",
					icon: "fa-calendar"
				},
				project: {
					name: "project",
					icon: "fa-inbox"
				},
				comment: {
					name: null,
					icon: "fa-comment-o"
				},
				team: {
					name: "team",
					icon: "fa-sitemap"
				}
			},
			a.feed_type_icon = {
				project: {
					name: "project",
					icon: "fa-inbox"
				},
				task: {
					name: "task",
					icon: "fa-check-square-o"
				},
				event: {
					name: "event",
					icon: "fa-calendar"
				},
				file: {
					name: "file",
					icon: "fa-file"
				},
				post: {
					name: "post",
					icon: "fa-list-alt"
				},
				page: {
					name: "page",
					icon: "fa-file-text-o"
				},
				completed: {
					name: "task",
					icon: "fa-check-square-o"
				},
				comment: {
					name: null,
					icon: "fa-comment-o"
				}
			},
			a.notice_types = {
				all: "all",
				assign: "assign",
				complete: "complete",
				metion: "metion",
				watch: "watch",
				comment: "comment",
				other: "other"
			},
			a.stats_type_list = [{
				name: "task_overview",
				desc: "CONS.stats_type.task_overview",
				icon: "wtf-pie",
				value: 1
			}, {
				name: "task_entry",
				desc: "CONS.stats_type.task_entry",
				icon: "wtf-colum",
				value: 2
			}, {
				name: "task_member",
				desc: "CONS.stats_type.task_member",
				icon: "wtf-bar",
				value: 3
			}, {
				name: "task_5day",
				desc: "CONS.stats_type.task_5day",
				icon: "wtf-line",
				value: 4
			}],
			a.labels_list = [{
				name: "blue",
				desc: "",
				color: "#59b2e0"
			}, {
				name: "green",
				desc: "",
				color: "#5eac82"
			}, {
				name: "orange",
				desc: "",
				color: "#ef5e1b"
			}, {
				name: "purple",
				desc: "",
				color: "#76428d"
			}, {
				name: "red",
				desc: "",
				color: "#cb1a44"
			}, {
				name: "yellow",
				desc: "",
				color: "#ffb11b"
			}, {
				name: "shallow_green",
				desc: "",
				color: "#33a6b8"
			}, {
				name: "young_blue",
				desc: "",
				color: "#278785"
			}, {
				name: "willow",
				desc: "",
				color: "#91ad70"
			}, {
				name: "violet",
				desc: "",
				color: "#9c90c2"
			}, {
				name: "red_in",
				desc: "",
				color: "#da4d6d"
			}, {
				name: "peony",
				desc: "",
				color: "#c1328e"
			}, {
				name: "lead",
				desc: "",
				color: "#787878"
			}, {
				name: "gardenia",
				desc: "",
				color: "#f7c557"
			}, {
				name: "peach",
				desc: "",
				color: "#f596aa"
			}, {
				name: "walnut",
				desc: "",
				color: "#947a6d"
			}],
			a.image_exts = [2, 3, 4, 5, 43],
			a.get_folder_icons = [{
				ext: 1,
				path: "res/icon/icon-folder-green.png"
			}, {
				ext: 2,
				path: "res/icon/icon-folder-orange.png"
			}, {
				ext: 3,
				path: "res/icon/icon-folder-purple.png"
			}, {
				ext: 4,
				path: "res/icon/icon-folder-red.png"
			}, {
				ext: 8,
				path: "res/icon/icon-folder-blue.png"
			}, {
				ext: 0,
				path: "res/icon/icon-folder-yellow.png"
			}],
			a.verbs = {
				create: "create",
				update: "update",
				add: "add",
				remove: "remove"
			},
			a.atypes = {
				project: "project",
				entry: "entry",
				task: "task",
				post: "post",
				page: "page",
				file: "file",
				folder: "folder",
				todo: "todo",
				vote: "vote"
			},
			a.img_exts = [a.exts.jpg, a.exts.jpeg, a.exts.gif, a.exts.png, a.exts.bmp],
			a.preview_exts = [a.exts.doc, a.exts.docx, a.exts.ppt, a.exts.pptx, a.exts.xls, a.exts.xlsx, a.exts.pdf],
			a.prj_colors = ["#6b0516", "#ac050f", "#d61818", "#dc428e", "#9c2867", "#765c9d", "#6f6eb4", "#4761b5", "#286391", "#3c8cad", "#38a8aa", "#94ccc3", "#6ea182", "#15945f", "#5d8d0b", "#47634c", "#c19c01", "#ecba05", "#dc8310", "#aa6517", "#ac8671", "#805f4c", "#70736c", "#444444"],
			a.prj_icons = ["icon-apple", "icon-android", "icon-html5", "icon-desktop", "icon-mobile-phone", "icon-tablet", "icon-github", "icon-dribbble", "icon-linux", "icon-windows", "icon-qrcode", "icon-bug", "icon-suitcase", "icon-beaker", "icon-plane", "icon-truck", "icon-money", "icon-book", "icon-music", "icon-facetime-video", "icon-picture", "icon-cloud", "icon-gift", "icon-coffee", "icon-heart", "icon-flag", "icon-bar-chart", "icon-lock", "icon-gears", "icon-fire"],
			a.event_repeat_intervals = [{
				key: 0,
				desc: "CONS.event_repeat_intervals.none"
			}, {
				key: 1,
				desc: "CONS.event_repeat_intervals.day"
			}, {
				key: 2,
				desc: "CONS.event_repeat_intervals.week"
			}, {
				key: 3,
				desc: "CONS.event_repeat_intervals.month"
			}, {
				key: 4,
				desc: "CONS.event_repeat_intervals.year"
			}],
			a.prj_navigations = [{
				id: 1,
				name: "task",
				title: "CONS.prj_navigations.task",
				icon: "check-square-o",
				shortcuts: "(Shift+T)",
				desc: "CONS.prj_navigations.task_desc"
			}, {
				id: 2,
				name: "event",
				title: "CONS.prj_navigations.event",
				icon: "fa-calendar",
				shortcuts: "(Shift+E)",
				desc: "CONS.prj_navigations.event_desc"
			}, {
				id: 3,
				name: "file",
				title: "CONS.prj_navigations.file",
				icon: "fa-file",
				shortcuts: "(Shift+F)",
				desc: "CONS.prj_navigations.file_desc"
			}, {
				id: 4,
				name: "post",
				title: "CONS.prj_navigations.post",
				icon: "fa-list-alt",
				shortcuts: "(Shift+C)",
				desc: "CONS.prj_navigations.post_desc"
			}, {
				id: 5,
				name: "page",
				title: "CONS.prj_navigations.page",
				icon: "fa-file-text-o",
				shortcuts: "(Shift+D)",
				desc: "CONS.prj_navigations.page_desc"
			}, {
				id: 6,
				name: "graph",
				title: "CONS.prj_navigations.graph",
				icon: "icon-bar-chart",
				shortcuts: "(Shift+G)",
				desc: "CONS.prj_navigations.graph_desc"
			}],
			a.search = {
				max_history: 20
			},
			a.team_industries = {
				0: "",
				1: "CONS.team_industries.www",
				2: "CONS.team_industries.b2b",
				3: "CONS.team_industries.education",
				4: "CONS.team_industries.game",
				5: "CONS.team_industries.industry",
				6: "CONS.team_industries.finance",
				7: "CONS.team_industries.consulting",
				8: "CONS.team_industries.estate",
				9: "CONS.team_industries.ngo",
				13: "CONS.team_industries.other"
			},
			a.graph_color = {
				done: "#5eac82",
				todo: "#ffb11b",
				addnew: "#59b2e0"
			},
			a.page_extend = {
				shimo: 1
			},
			a.event_names = {
				emit_filter_activity_by_type: "emit_filter_activities_by_type",
				filter_activity_by_type: "filter_activities_by_type",
				filter_activity_by_prj: "filter_activities_by_prj",
				reload_item_activities: "reload_item_activities",
				clear_item_activities: "clear_item_activities",
				clear_comment_activity: "clear_comment_activity",
				emit_filter_watch_by_type: "emit_filter_watch_by_type",
				filter_watch_by_type: "filter_watch_by_type",
				filter_posts_by_sort: "filter_posts_by_sort",
				post_comment_add: "post_comment_add",
				shortcut_key_to_edit: "shortcut_key_to_edit",
				shortcut_key_to_cancel: "shortcut_key_to_cancel",
				shortcut_key_to_task: "shortcut_key_to_task",
				shortcut_key_select_prjs: "shortcut_key_select_prjs",
				shortcut_key_left_menu: "shortcut_key_left_menu",
				load_entity_task: "load_entity_task",
				load_entity_event: "load_entity_event",
				load_entity_post: "load_entity_post",
				load_entity_file: "load_entity_file",
				load_entity_page: "load_entity_page",
				load_entity_mail: "load_entity_mail",
				load_comments: "load_comments",
				clear_comments: "clear_comments",
				select_comment_tab: "select_comment_tab",
				select_activity_tab: "select_activity_tab",
				load_teams_projects_sucess: "load_teams_projects_sucess",
				notice_new: "notice_new",
				load_prj_feed: "load_prj_feed",
				show_project_sidebar: "show_project_sidebar",
				on_project_tasks_filter: "on_project_tasks_filter",
				show_project_tasks_filter: "show_project_tasks_filter",
				show_project_setting: "show_project_setting",
				show_project_setting_step0: "show_project_setting_step0",
				show_project_setting_label: "show_project_setting_label",
				show_project_setting_prjcopy: "show_project_setting_prjcopy",
				show_project_setting_exportdata: "show_project_setting_exportdata",
				show_project_setting_createbymail: "show_project_setting_createbymail",
				show_project_setting_baseinfo: "show_project_setting_baseinfo",
				show_project_setting_timingtask: "show_project_setting_timingtask",
				project_add_member: "project_add_member",
				project_clear_task_filter: "project_clear_task_filter",
				project_sort_change: "project_sort_change",
				project_star_change: "project_star_change",
				project_extensions_change: "project_extensions_change",
				on_file_add: "on_file_add",
				on_weixin_bind: "on_weixin_bind",
				on_pastefile_to_task: "on_pastefile_to_task",
				on_pastefile_to_event: "on_pastefile_to_event",
				on_pastefile_to_file: "on_pastefile_to_file",
				on_pastefile_to_post: "on_pastefile_to_post",
				on_pastefile_to_folder: "on_pastefile_to_folder",
				on_uploadfile_add: "on_uploadfile_add",
				on_uploadfile_add_to_post: "on_uploadfile_add_to_post",
				on_uploadfile_del_to_post: "on_uploadfile_del_to_post",
				on_task_add: "on_task_add",
				on_task_trash: "on_task_trash",
				on_task_archive: "on_task_archive",
				on_task_complete: "on_task_complete",
				on_task_lock: "on_task_lock",
				on_task_move: "on_task_move",
				on_task_update: "on_task_update",
				on_task_comment: "on_task_comment",
				on_task_expire_date: "on_task_expire_date",
				on_task_badges_file: "on_task_badges_file",
				on_task_unarchived: "on_task_unarchived",
				on_task_badges_check: "on_task_badges_check",
				on_task_assign: "on_task_assign",
				on_event_add: "on_event_add",
				on_event_update: "on_event_update",
				on_event_update_date: "on_event_update_date",
				on_event_trash: "on_event_trash",
				on_file_trash: "on_file_trash",
				on_file_move: "on_file_move",
				on_file_update: "on_file_update",
				on_post_trash: "on_post_trash",
				on_post_toggle_top: "on_post_toggle_top",
				on_post_comment: "on_post_comment",
				on_post_update: "on_post_update",
				on_page_add: "on_page_add",
				on_page_del: "on_page_del",
				on_page_update: "on_page_update",
				on_page_trash: "on_page_trash",
				on_slide_hide: "on_slide_hide",
				on_mail_trash: "on_mail_trash",
				on_right_menu: "on_right_menu",
				member_state_change: "member_state_change",
				team_member_role_change: "team_member_role_change",
				project_member_role_change: "project_member_role_change",
				project_permission_change: "project_permission_change",
				on_comment_new: "on_comment_new",
				scroll_up: "scroll_up",
				scroll_down: "scroll_down",
				scroll_page_up: "scroll_page_up",
				scroll_page_down: "scroll_page_down",
				page_go_full_screen: "page_go_full_screen",
				header_hide: "header_hide",
				header_show: "header_show",
				post_updated_by_editor: "post_updated_by_editor",
				post_created_by_editor: "post_created_by_editor",
				page_updated_by_editor: "page_saved_by_editor",
				page_created_by_editor: "page_created_by_editor",
				team_add_stats: "team_add_stats",
				team_remove_stats: "team_remove_stats",
				autosave_cancel: "autosave_cancel",
				broadcast_show: "broadcast_show"
			},
			a.markdown_link = [{
				key: "project",
				previewClass: "markdown-link markdown-link-prj"
			}, {
				key: "task",
				previewClass: "markdown-link markdown-link-task"
			}, {
				key: "page",
				previewClass: "markdown-link markdown-link-page"
			}, {
				key: "folder",
				previewClass: "markdown-link markdown-link-folder"
			}, {
				key: "file",
				previewClass: "markdown-link markdown-link-file"
			}, {
				key: "event",
				previewClass: "markdown-link markdown-link-event"
			}, {
				key: "post",
				previewClass: "markdown-link markdown-link-post"
			}],
			a.phone_prefixs = [{
				name: "CONS.phone_prefixs.china",
				val: 86
			}, {
				name: "CONS.phone_prefixs.hk",
				val: 852
			}, {
				name: "CONS.phone_prefixs.tw",
				val: 886
			}, {
				name: "CONS.phone_prefixs.jp",
				val: 81
			}, {
				name: "CONS.phone_prefixs.usa",
				val: 1
			}, {
				name: "CONS.phone_prefixs.other",
				val: null
			}],
			a.regex = {
				username: /^[A-Za-z]{1}[0-9A-Za-z_]{2,29}$/,
				display_name: /^([\u4e00-\u9fa5]|[0-9a-zA-Z!@#$%^&*()_\-\+=\s]){1,100}$/,
				user_title: /^([\u4e00-\u9fa5]|[0-9a-zA-Z!@#$%^&*()_\-\+=\s]){1,300}$/,
				user_department: /^([\u4e00-\u9fa5]|[0-9a-zA-Z!@#$%^&*()_\-\+=\s]){1,300}$/,
				mobile_area: new RegExp(b.mobile_area),
				mobile_probable: new RegExp(b.mobile_probable),
				mobile: new RegExp(b.mobile),
				email: new RegExp(b.email, "i"),
				phone_email: new RegExp("(" + b.email + ")|(" + b.mobile + ")", "i"),
				exclude_url: /^((?!http[?s]{0,1}\:\/\/).)*$/,
				url: /^(https?|s):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i
			},
			a.default_bg_colors = ["#82817e", "#84a5d1", "#98a4b4", "#9bb0a5", "#b69fa9", "#f4c771", "#33343c"],
			a.default_bg_images = ["event-midautumn-flower-lamp.png", "event-midautumn-miss.png", "event-midautumn-ink.png", "wt-bg-fruits.png", "wt-bg-2016-monkey.png", "wt-bg-2016-yj.jpg", "wt-bg-2016-hhs.jpg"],
			a.ctrl_cutover_keys = [75],
			a.shift_cutover_keys = [81, 84, 67, 70, 68, 65, 69, 82, 71],
			a.global_shortcut_keys = [63, 69, 27, 47, 96, 85, 71, 83, 78, 80, 84, 70],
			a.entry_shortcut_keys = [37, 38, 39, 40, 13, 67, 27, 68, 76, 77, 32, 87, 60, 62, 74, 75, 73, 69, 65],
			a.keyASCIIs = {
				C: 67,
				D: 68,
				A: 65,
				B: 66,
				E: 69,
				F: 70,
				G: 71,
				P: 80,
				Q: 81,
				R: 82,
				S: 83,
				T: 84,
				U: 85,
				L: 76,
				M: 77,
				N: 78,
				W: 87,
				At: 64,
				ESC: 27,
				Slash: 47,
				I: 73,
				J: 74,
				K: 75,
				Key96: 96,
				QuestionMark: 63,
				VK_LEFT: 37,
				VK_UP: 38,
				VK_RIGHT: 39,
				VK_DOWN: 40,
				VK_RETURN: 13,
				VK_SPACE: 32,
				VK_LessThan: 60,
				VK_GreaterThan: 62,
				ENTER: 13,
				VK_PAGEUP: 33,
				VK_PAGEDOWN: 34
			},
			a.all_hour_sections = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"],
			a.all_minute_sections = ["00", "10", "20", "30", "40", "50"],
			a.mail = {
				domain: "@mail.worktile.com"
			},
			a.scale = [{
				value: 1,
				text: "CONS.scale.1-10"
			}, {
				value: 2,
				text: "CONS.scale.11-20"
			}, {
				value: 3,
				text: "CONS.scale.21-50"
			}, {
				value: 4,
				text: "CONS.scale.51-100"
			}, {
				value: 5,
				text: "CONS.scale.101-200"
			}, {
				value: 6,
				text: "CONS.scale.201-500"
			}, {
				value: 7,
				text: "CONS.scale.500+"
			}],
			a.get_ext = function(b) {
				return a.exts[b.toLowerCase()] ? a.exts[b.toLowerCase()] : 0
			},
			a.get_file_icon = function(a) {
				if(1 === a.type) switch(a.ext) {
					case 1:
						return "res/icon/icon-folder-green.png";
					case 2:
						return "res/icon/icon-folder-orange.png";
					case 3:
						return "res/icon/icon-folder-purple.png";
					case 4:
						return "res/icon/icon-folder-red.png";
					case 8:
						return "res/icon/icon-folder-blue.png";
					default:
						return "res/icon/icon-folder-yellow.png"
				} else switch(a.ext) {
					case 1:
						return "res/icon/icon-txt.png";
					case 2:
						return "-1";
					case 3:
						return "-1";
					case 4:
						return "-1";
					case 5:
						return "-1";
					case 6:
						return "res/icon/icon-word.png";
					case 7:
						return "res/icon/icon-excel.png";
					case 8:
						return "res/icon/icon-ppt.png";
					case 9:
						return "res/icon/icon-pdf.png";
					case 10:
						return "res/icon/icon-zip.png";
					case 11:
						return "res/icon/icon-rar.png";
					case 12:
						return "res/icon/icon-xml.png";
					case 13:
						return "res/icon/icon-html.png";
					case 14:
						return "res/icon/icon-word.png";
					case 15:
						return "res/icon/icon-excel.png";
					case 16:
						return "res/icon/icon-ppt.png";
					case 17:
						return "res/icon/icon-mail.png";
					case 18:
						return "res/icon/icon-pages.png";
					case 19:
						return "res/icon/icon-keynote.png";
					case 20:
						return "res/icon/icon-numbers.png";
					case 21:
						return "res/icon/icon-ipa.png";
					case 22:
						return "res/icon/icon-apk.png";
					case 23:
						return "res/icon/icon-xap.png";
					case 24:
						return "res/icon/icon-csharp.png";
					case 25:
						return "res/icon/icon-java.png";
					case 26:
						return "res/icon/icon-ruby.png";
					case 27:
						return "res/icon/icon-python.png";
					case 28:
						return "res/icon/icon-css.png";
					case 29:
						return "res/icon/icon-js.png";
					case 30:
						return "res/icon/icon-cpp.png";
					case 31:
						return "res/icon/icon-c.png";
					case 32:
						return "res/icon/icon-h.png";
					case 33:
						return "res/icon/icon-php.png";
					case 34:
						return "res/icon/icon-c.png";
					case 35:
						return "res/icon/icon-h.png";
					case 36:
						return "res/icon/icon-vb.png";
					case 37:
						return "res/icon/icon-mp3.png";
					case 38:
						return "res/icon/icon-avi.png";
					case 39:
						return "res/icon/icon-chm.png";
					case 40:
						return "res/icon/icon-visio.png";
					case 41:
						return "res/icon/icon-rp.png";
					case 42:
						return "res/icon/icon-wmv.png";
					case 43:
						return "-1";
					case 44:
						return "res/icon/icon-psd.png";
					case 45:
						return "res/icon/icon-cvs.png";
					case 46:
						return "res/icon/icon-ai.png";
					case 47:
						return "res/icon/icon-json.png";
					case 48:
						return "res/icon/icon-7z.png";
					case 49:
						return "res/icon/icon-tar.png";
					case 50:
						return "res/icon/icon-swf.png";
					case 51:
						return "res/icon/icon-wim.png";
					case 52:
						return "res/icon/icon-bat.png";
					case 53:
						return "res/icon/icon-sh.png";
					case 54:
						return "res/icon/icon-wab.png";
					case 55:
						return "res/icon/icon-vba.png";
					case 56:
						return "res/icon/icon-ost.png";
					case 57:
						return "res/icon/icon-msi.png";
					case 58:
						return "res/icon/icon-log.png";
					case 59:
						return "res/icon/icon-svg.png";
					case 60:
						return "res/icon/icon-less.png";
					case 61:
						return "res/icon/icon-md.png";
					case 62:
						return "res/icon/icon-bin.png";
					case 63:
						return "res/icon/icon-obj.png";
					case 64:
						return "res/icon/icon-edx.png";
					case 65:
						return "res/icon/icon-mmap.png";
					case 66:
						return "res/icon/icon-thmx.png";
					case 67:
						return "res/icon/icon-dump.png";
					case 68:
						return "res/icon/icon-one.png";
					case 69:
						return "res/icon/icon-pst.png";
					case 70:
						return "res/icon/icon-vcf.png";
					case 71:
						return "res/icon/icon-ini.png";
					case 72:
						return "res/icon/icon-csv.png";
					case 73:
						return "res/icon/icon-wps.png";
					case 74:
						return "res/icon/icon-et.png";
					case 75:
						return "res/icon/icon-dps.png";
					case 76:
						return "res/icon/icon-pfx.png";
					default:
						return "res/icon/icon-file-default.png"
				}
			},
			"object" == typeof module ? module.exports = a : (kzi.constant = a, angular.module("app.constant", []).constant("constant", a))
		
	}
})