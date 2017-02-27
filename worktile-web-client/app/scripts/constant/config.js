/**
 * @ngdoc function
 * @name constant
 * @description
 * constant of the jtWorkApp
 */
 define(['error','constant'],function (error,constant,require) {
 	'use strict';
	return {
		baseUrl: 'views/',
		//路由对应html 模板路径
		templateUrls : {
			login: 'views/gate/signin.html',
			signup: 'views/gate/signup.html',
			forgot: 'views/gate/forgot.html',
			dashboard: 'views/work/base_work.html',
			dashboard_task: 'views/work/dashboard/dashboard_task.html',
			dashboard_calendar: 'views/work/dashboard/dashboard_calendar.html',
			dashboard_activity_feed: 'views/work/dashboard/dashboard_activity_feed.html',
			dashboard_email: 'views/work/dashboard/dashboard_email.html',
			calendar_subscribe: 'views/work/dashboard/calendar_subscribe.html',
			search: 'views/work/search/search_panel.html',
			left_menu: 'views/work/left_menu.html',//左引导栏
			left_menu_team: 'views/work/toolbar/pop_my_teams.html',
			left_menu_project: 'views/work/toolbar/left_menu_project.html',
			left_menu_shortcut_create: 'views/work/toolbar/pop_shortcut_create.html',
			left_menu_avatar: 'views/work/toolbar/avatar.html',
			left_menu_avatar_setting: 'views/work/toolbar/pop_avatar_self.html',
			left_menu_dialog_team_create: 'views/work/toolbar/dialog_team_create.html',
			team_logo: 'views/work/toolbar/team/team_logo.html',
			team_main: 'views/work/team/team.html',
			team_calender: 'views/work/team/team_calender.html',
			team_calendar_sidebar: 'views/work/team/team_calender.html',
			team_graphs: 'views/work/team/team_graphs.html',
			team_members: 'views/work/team/team_members.html',
			team_projects: 'views/work/team/team_projects.html',
			team_tasks: 'views/work/team/team_tasks.html',
			team_admin: 'views/work/team/admin/team_admin.html',
			team_admin_basic: 'views/work/team/admin/team_admin_basic.html',
			team_admin_custom: 'views/work/team/admin/team_admin_custom.html',
			team_admin_members: 'views/work/team/admin/team_admin_members.html',
			team_admin_projects: 'views/work/team/admin/team_admin_projects.html',
			team_admin_security: 'views/work/team/admin/team_admin_security.html',
			project_dialog_create: 'views/work/project/dialog_project_create.html',
			project_dialog_create_preview_template: 'views/work/project/project_dialog_create_preview_template.html',
			project_dialog_add_member: 'views/work/project/dialog_project_add_member.html',
			project_grid_item: 'views/work/project/project_grid_item.html',
			project_main: 'views/work/project/project.html',
			project_task: 'views/work/project/task/task.html',
			project_toolbar: 'views/work/project/task/toolbar.html',
			'dashboard.default': 'views/work/dashboard/dashboard_task.html',
			calendar_event_create: 'views/work/dashboard/dialog_event_create.html',//创建日历event
			calendar_pop_event_create: 'views/work/dashboard/calendar/pop_add_event.html',
			about: 'views/about.html',
		},
		//电话前缀
		phone_prefixs:[
				{ name : '中国', val: 86,},
				{ name : '香港', val: 852,},
				{ name : '台湾', val: 886,},
				{ name : '日本', val: 81,},
				{ name : '美国', val: 1,},
				{ name : '其他', val: null,},
			],

		//输入验证错误提示信息
		VALIDATE_ERROR : {
			login_name : {
				required : "用户名或者邮箱不能为空",
			},
			login_password : {
				required : "登录密码不能为空",
			},
			signup_phone : {
				required : "手机号码不能为空",
				pattern : "手机号码格式不对",
			},
			phone_code : {
				required : "注册验证码不能为空",
			},
			signup_display_name :{
				required : "用户名不能为空",
				maxlength: "密码长度不能大于{maxlength}",
			},
			signup_email: {
				required : "邮箱不能为空",
				pattern : "邮箱格式不对",
			},
			signup_password: {
				required : "注册密码不能为空",
			},
			// password : {
			// 	required: "密码不能为空",
			// 	minlength: "密码长度不能小于{minlength}",
			// 	maxlength: "密码长度不能大于{maxlength}",
			// },
     	},
     	errors : error,//错误提示信息
     	constant : constant,//常量信息
     	whiteList: {
			a: ["target", "href", "title"],
			abbr: ["title"],
			address: [],
			area: ["shape", "coords", "href", "alt"],
			article: [],
			aside: [],
			audio: ["autoplay", "controls", "loop", "preload", "src"],
			b: [],
			bdi: ["dir"],
			bdo: ["dir"],
			big: [],
			blockquote: ["cite"],
			br: [],
			caption: [],
			center: [],
			cite: [],
			code: [],
			col: ["align", "valign", "span", "width"],
			colgroup: ["align", "valign", "span", "width"],
			dd: [],
			del: ["datetime"],
			details: ["open"],
			div: [],
			dl: [],
			dt: [],
			em: [],
			font: ["color", "size", "face"],
			footer: [],
			h1: [],
			h2: [],
			h3: [],
			h4: [],
			h5: [],
			h6: [],
			header: [],
			hr: [],
			i: [],
			img: ["class", "src", "alt", "title", "width", "height"],
			ins: ["datetime"],
			li: [],
			mark: [],
			nav: [],
			ol: [],
			p: [],
			pre: [],
			s: [],
			section: [],
			small: [],
			span: ["class"],
			sub: [],
			sup: [],
			strong: [],
			table: ["width", "border", "align", "valign"],
			tbody: ["align", "valign"],
			td: ["width", "colspan", "align", "valign"],
			tfoot: ["align", "valign"],
			th: ["width", "colspan", "align", "valign"],
			thead: ["align", "valign"],
			tr: ["rowspan", "align", "valign"],
			tt: [],
			u: [],
			ul: [],
			video: ["autoplay", "controls", "loop", "preload", "src", "height", "width"]
		},
     	/*************************************************************************************
     	 *constant
     	 * a:window;  b: window.jQuery || null,
     	 *************************************************************************************/
		feed_turn_on: !0,
		debug: function() {
			return "dev" === wt.env && !c.util.isIE() && "object" == typeof a.console
		},
		prefixed: "wt",
		lang: "zh-cn",
		default_pos: 65535,
		default_count: 20,
		weixin_url: function() {
			return wt.appConfig.wtconnect.weixin;
		},
		box_url: function() {
			return wt.appConfig.box.base_url;
		},
		feed_url: function() {
			return wt.appConfig.feed_host;
		},
		box_url_regex: function() {
			return new RegExp(wt.appConfig.box.box_url_regex);
		},
		default_team_pic: "/img/logo.png",
		default_avatar: "/img/default_avatar.png",
		default_box: "",
		default_project_bg: "",
		default_nopic: "/img/bg/nopic.png",
		wtbox_url: "https://wt-thumb.oss.aliyuncs.com/",
		wtlogo_url: "https://wt-team.oss.aliyuncs.com/",
		wtavatar_url: "https://wt-avatars.oss.aliyuncs.com/",
		wtteamlogo_url: "https://wt-team.oss.aliyuncs.com/",
		wtbackgorund_url: "https://wt-bg.oss.aliyuncs.com/",
		wtall_url: "https://wt-all.oss.aliyuncs.com/",
		wtprj_url: "https://wt-prj.oss.aliyuncs.com/",
		desk_notify_key: "my_desk_notice",
		root_url: "https://worktile.com",
		cdnpath: "",////cdn.worktile.com/",
		colors: {
			completed: "#88b244",
			uncompleted: "#f7af49",
			expired: "#f47a55",
			archived: "#9fc6e7",
			created: "#9fe1e7"
		},

		emojis : [	"bowtie", "smile", "laughing", "blush", "smiley", "relaxed", "smirk", "heart_eyes", 
					"kissing_heart", "kissing_closed_eyes", "flushed", "relieved", "satisfied", "grin", "wink", 
					"stuck_out_tongue_winking_eye", "stuck_out_tongue_closed_eyes", "sleeping", "worried", 
					"frowning", "anguished", "open_mouth", "grimacing", "confused", "hushed", "expressionless", 
					"unamused", "sweat_smile", "sweat", "weary", "pensive", "disappointed", "confounded", "fearful", 
					"cold_sweat", "persevere", "joy", "astonished", "scream", "neckbeard", "tired_face", "angry", 
					"rage", "triumph", "sleepy", "yum", "mask","sunglasses", "dizzy_face", "imp", "smiling_imp", 
					"neutral_face", "no_mouth", "innocent", "alien", "yellow_heart", "blue_heart", "purple_heart", 
					"heart", "green_heart", "broken_heart", "heartbeat","heartpulse", "two_hearts", "revolving_hearts", 
					"cupid", "sparkling_heart", "sparkles", "star", "star2", "dizzy", "boom", "collision", "anger", 
					"exclamation", "question", "grey_exclamation", "grey_question","zzz", "dash", "sweat_drops", "notes", 
					"musical_note", "fire", "hankey", "poop", "shit", "+1", "thumbsup", "-1", "thumbsdown", 
					"ok_hand", "punch", "facepunch", "fist", "v", "wave", "hand", "raised_hand", "open_hands", 
					"point_up", "point_down", "point_left","point_right", "raised_hands", "pray", "point_up_2", 
					"clap", "muscle", "metal", "walking", "runner", "running","couple", "family", "two_men_holding_hands", 
					"two_women_holding_hands", "ok_woman", "no_good", "information_desk_person", "bride_with_veil", 
					"person_with_pouting_face", "person_frowning", "bow", "couplekiss", "couple_with_heart", "massage", 
					"haircut", "nail_care", "boy", "girl", "woman", "man", "baby", "older_woman", "older_man", "person_with_blond_hair", 
					"man_with_gua_pi_mao", "man_with_turban", "construction_worker", "cop", "angel", "princess", "smiley_cat", 
					"smile_cat", "heart_eyes_cat", "kissing_cat", "smirk_cat", "scream_cat", "crying_cat_face", "joy_cat", 
					"pouting_cat", "japanese_ogre", "japanese_goblin", "see_no_evil", "hear_no_evil", "speak_no_evil", "guardsman", 
					"skull", "feet", "lips", "kiss", "droplet", "ear", "eyes", "nose", "tongue", "love_letter", "bust_in_silhouette", 
					"busts_in_silhouette", "speech_balloon", "thought_balloon", "feelsgood", "finnadie", "goberserk", "godmode", 
					"hurtrealbad", "rage1", "rage2", "rage3", "rage4", "suspect", "trollface", "sunny", "umbrella", "cloud", 
					"snowflake", "snowman", "zap", "cyclone", "foggy", "ocean", "cat", "dog", "mouse", "hamster", "rabbit", 
					"wolf", "frog", "tiger", "koala", "bear", "pig", "pig_nose", "cow", "boar", "monkey_face", "monkey", "horse", 
					"racehorse", "camel", "sheep", "elephant", "panda_face", "snake", "bird", "baby_chick", "hatched_chick", "hatching_chick",
					"chicken", "penguin", "turtle", "bug", "honeybee", "ant", "beetle", "snail", "octopus", "tropical_fish", "fish", 
					"whale", "whale2", "dolphin", "cow2", "ram", "rat", "water_buffalo", "tiger2", "rabbit2", "dragon", "goat", "rooster", 
					"dog2", "pig2", "mouse2", "ox", "dragon_face", "blowfish", "crocodile", "dromedary_camel", "leopard", "cat2", 
					"poodle", "paw_prints", "bouquet", "cherry_blossom", "tulip", "four_leaf_clover", "rose", "sunflower", "hibiscus", 
					"maple_leaf", "leaves", "fallen_leaf", "herb", "mushroom", "cactus", "palm_tree", "evergreen_tree", "deciduous_tree", 
					"chestnut", "seedling", "blossom", "ear_of_rice", "shell", "globe_with_meridians", "sun_with_face", "full_moon_with_face", 
					"new_moon_with_face", "new_moon", "waxing_crescent_moon", "first_quarter_moon", "waxing_gibbous_moon", "full_moon", 
					"waning_gibbous_moon", "last_quarter_moon", "waning_crescent_moon", "last_quarter_moon_with_face", "first_quarter_moon_with_face", 
					"moon", "earth_africa", "earth_americas", "earth_asia", "volcano", "milky_way", "partly_sunny", "octocat", 
					"squirrel", "bamboo", "gift_heart", "dolls", "school_satchel", "mortar_board", "flags", "fireworks", "sparkler", 
					"wind_chime", "rice_scene", "jack_o_lantern", "ghost", "santa", "christmas_tree", "gift", "bell", "no_bell", 
					"tanabata_tree", "tada", "confetti_ball", "balloon", "crystal_ball", "cd", "dvd", "floppy_disk", "camera", 
					"video_camera", "movie_camera", "computer", "tv", "iphone", "phone", "telephone", "telephone_receiver", "pager", 
					"fax", "minidisc", "vhs", "sound", "speaker", "mute", "loudspeaker", "mega", "hourglass", "hourglass_flowing_sand", 
					"alarm_clock", "watch", "radio", "satellite", "loop", "mag", "mag_right", "unlock", "lock", "lock_with_ink_pen", 
					"closed_lock_with_key", "key", "bulb", "flashlight", "high_brightness", "low_brightness", "electric_plug", 
					"battery", "calling", "email", "mailbox", "postbox", "bath", "bathtub", "shower", "toilet", "wrench", 
					"nut_and_bolt", "hammer", "seat", "moneybag", "yen", "dollar", "pound", "euro", "credit_card", "money_with_wings", 
					"e-mail", "inbox_tray", "outbox_tray", "envelope", "incoming_envelope", "postal_horn", "mailbox_closed", 
					"mailbox_with_mail", "mailbox_with_no_mail", "door", "smoking", "bomb", "gun", "hocho", "pill", "syringe", 
					"page_facing_up", "page_with_curl", "bookmark_tabs", "bar_chart", "chart_with_upwards_trend", 
					"chart_with_downwards_trend", "scroll", "clipboard", "calendar", "date", "card_index", "file_folder", 
					"open_file_folder", "scissors", "pushpin", "paperclip", "black_nib", "pencil2", "straight_ruler", 
					"triangular_ruler", "closed_book", "green_book", "blue_book", "orange_book", "notebook", 
					"notebook_with_decorative_cover", "ledger", "books", "bookmark", "name_badge", "microscope", "telescope", 
					"newspaper", "football", "basketball", "soccer", "baseball", "tennis", "8ball", "rugby_football", "bowling", 
					"golf", "mountain_bicyclist", "bicyclist", "horse_racing", "snowboarder", "swimmer", "surfer", "ski", "spades", 
					"hearts", "clubs", "diamonds", "gem", "ring", "trophy", "musical_score", "musical_keyboard", "violin", 
					"space_invader", "video_game", "black_joker", "flower_playing_cards", "game_die", "dart", "mahjong", "clapper", 
					"memo", "pencil", "book", "art", "microphone", "headphones", "trumpet", "saxophone", "guitar", "shoe", "sandal", 
					"high_heel", "lipstick", "boot", "shirt", "tshirt", "necktie", "womans_clothes", "dress", "running_shirt_with_sash", 
					"jeans", "kimono", "bikini", "ribbon", "tophat", "crown", "womans_hat", "mans_shoe", "closed_umbrella", 
					"briefcase", "handbag", "pouch", "purse", "eyeglasses", "fishing_pole_and_fish", "coffee", "tea", "sake", 
					"baby_bottle", "beer", "beers", "cocktail", "tropical_drink", "wine_glass", "fork_and_knife", "pizza", 
					"hamburger", "fries", "poultry_leg", "meat_on_bone", "spaghetti", "curry", "fried_shrimp", "bento", "sushi", 
					"fish_cake", "rice_ball", "rice_cracker", "rice", "ramen", "stew", "oden", "dango", "egg", "bread", "doughnut", 
					"custard", "icecream", "ice_cream", "shaved_ice", "birthday", "cake", "cookie", "chocolate_bar", "candy", 
					"lollipop", "honey_pot", "apple", "green_apple", "tangerine", "lemon", "cherries", "grapes", "watermelon", 
					"strawberry", "peach", "melon", "banana", "pear", "pineapple", "sweet_potato", "eggplant", "tomato", "corn", 
					"house", "house_with_garden", "school", "office", "post_office", "hospital", "bank", "convenience_store", 
					"love_hotel", "hotel", "wedding", "church", "department_store", "european_post_office", "city_sunrise", 
					"city_sunset", "japanese_castle", "european_castle", "tent", "factory", "tokyo_tower", "japan", "mount_fuji", 
					"sunrise_over_mountains", "sunrise", "stars", "statue_of_liberty", "bridge_at_night", "carousel_horse", 
					"rainbow", "ferris_wheel", "fountain", "roller_coaster", "ship", "speedboat", "boat", "sailboat", "rowboat", 
					"anchor", "rocket", "airplane", "helicopter", "steam_locomotive", "tram", "mountain_railway", "bike", 
					"aerial_tramway", "suspension_railway", "mountain_cableway", "tractor", "blue_car", "oncoming_automobile", 
					"car", "red_car", "taxi", "oncoming_taxi", "articulated_lorry", "bus", "oncoming_bus", "rotating_light", 
					"police_car", "oncoming_police_car", "fire_engine", "ambulance", "minibus", "truck", "train", "station", "train2", 
					"bullettrain_front", "bullettrain_side", "light_rail", "monorail", "railway_car", "trolleybus", "ticket", 
					"fuelpump", "vertical_traffic_light", "traffic_light", "warning", "construction", "beginner", "atm", 
					"slot_machine", "busstop", "barber", "hotsprings", "checkered_flag", "crossed_flags", "izakaya_lantern", 
					"moyai", "circus_tent", "performing_arts", "round_pushpin", "triangular_flag_on_post", "jp", "kr", "cn", "us", 
					"fr", "es", "it", "ru", "gb", "uk", "de", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", 
					"keycap_ten", "1234", "zero", "hash", "symbols", "arrow_backward", "arrow_down", "arrow_forward", "arrow_left", 
					"capital_abcd", "abcd", "abc", "arrow_lower_left", "arrow_lower_right", "arrow_right", "arrow_up", 
					"arrow_upper_left", "arrow_upper_right", "arrow_double_down", "arrow_double_up", "arrow_down_small", 
					"arrow_heading_down", "arrow_heading_up", "leftwards_arrow_with_hook", "arrow_right_hook", "left_right_arrow", 
					"arrow_up_down", "arrow_up_small", "arrows_clockwise", "arrows_counterclockwise", "rewind", "fast_forward", 
					"information_source", "ok", "twisted_rightwards_arrows", "repeat", "repeat_one", "new", "top", "up", "cool", 
					"free", "ng", "cinema", "koko", "signal_strength", "u5272", "u5408", "u55b6", "u6307", "u6708", "u6709", "u6e80", 
					"u7121", "u7533", "u7a7a", "u7981", "sa", "restroom", "mens", "womens", "baby_symbol", "no_smoking", "parking", 
					"wheelchair", "metro", "baggage_claim", "accept", "wc", "potable_water", "put_litter_in_its_place", "secret", 
					"congratulations", "m", "passport_control", "left_luggage", "customs", "ideograph_advantage", "cl", "sos", "id", 
					"no_entry_sign", "underage", "no_mobile_phones", "do_not_litter", "non-potable_water", "no_bicycles", 
					"no_pedestrians", "children_crossing", "no_entry", "eight_spoked_asterisk", "eight_pointed_black_star", 
					"heart_decoration", "vs", "vibration_mode", "mobile_phone_off", "chart", "currency_exchange", "aries", 
					"taurus", "gemini", "cancer", "leo", "virgo", "libra", "scorpius", "sagittarius", "capricorn", "aquarius", 
					"pisces", "ophiuchus", "six_pointed_star", "negative_squared_cross_mark", "a", "b", "ab", "o2", 
					"diamond_shape_with_a_dot_inside", "recycle", "end", "on", "soon", "clock1", "clock130", "clock10", "clock1030", 
					"clock11", "clock1130", "clock12", "clock1230", "clock2", "clock230", "clock3", "clock330", "clock4", "clock430", 
					"clock5", "clock530", "clock6", "clock630", "clock7", "clock730", "clock8", "clock830", "clock9", "clock930", 
					"heavy_dollar_sign", "copyright", "registered", "tm", "x", "heavy_exclamation_mark", "bangbang", "interrobang", 
					"o", "heavy_multiplication_x", "heavy_plus_sign", "heavy_minus_sign", "heavy_division_sign", "white_flower", 
					"100", "heavy_check_mark", "ballot_box_with_check", "radio_button", "link", "curly_loop", "wavy_dash", 
					"part_alternation_mark", "trident", "black_square", "white_square", "white_check_mark", "black_square_button", 
					"white_square_button", "black_circle", "white_circle", "red_circle", "large_blue_circle", "large_blue_diamond", 
					"large_orange_diamond", "small_blue_diamond", "small_orange_diamond", "small_red_triangle", "small_red_triangle_down", "shipit"],
			// Date.prototype.format : function(a) {
			// 	var b = {
			// 		"y+": this.getFullYear(),
			// 		"M+": this.getMonth() + 1,
			// 		"d+": this.getDate(),
			// 		"h+": this.getHours(),
			// 		"m+": this.getMinutes(),
			// 		"s+": this.getSeconds(),
			// 		"q+": Math.floor((this.getMonth() + 3) / 3),
			// 		S: this.getMilliseconds()
			// 	};
			// 	/(y+)/.test(a) && (a = a.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)));
			// 	for(var c in b) new RegExp("(" + c + ")").test(a) && (a = a.replace(RegExp.$1, 1 === RegExp.$1.length ? b[c] : ("00" + b[c]).substr(("" + b[c]).length)));
			// 	return a;
			// },
			util : {
				isIE: function() {
					return !!a.ActiveXObject;
				},
				isIE6: function() {
					return c.util.isIE() && !a.XMLHttpRequest
				},
				isIE7: function() {
					return c.util.isIE() && !c.util.isIE6() && !c.util.isIE8()
				},
				isIE8: function() {
					return c.util.isIE() && !!document.documentMode
				},
				winHeight: function() {
					return window.jQuery(window).height()
				},
				docWidth: function() {
					return b(document).width()
				},
				docHeight: function() {
					return b(document).height()
				},
				docOuterWidth: function() {
					return b(document).outerWidth()
				},
				docOuterHeight: function() {
					return b(document).outerHeight()
				},
				headerNavHeight: function() {
					return b("#header").outerHeight(!0)
				},
				modNavHeight: function() {
					return b(".mod-navbar").outerHeight(!0)
				},
				heightNoHeader: function() {
					return c.util.winHeight() - c.util.headerNavHeight()
				},
				heightNoNav: function() {
					return c.util.winHeight() - c.util.headerNavHeight() - c.util.modNavHeight()
				},
				dateToTimestamp: function(a) {
					return isNaN(a) ? Date.parse(a) : a
				},
				isDate: function(a) {
					return "object" == typeof a && a.constructor == Date
				},
				getBrowserLanguage: function() {
					var a = (navigator.language || navigator.userLanguage).toLowerCase();
					return "zh-cn" === a || "zh-tw" === a ? a : a.match(/^en/g) ? "en-us" : "zh-cn"
				}
			},
			helper : {
				build_file_icon: function(a) {
					var b = kzi.constant.get_file_icon(a);
					return "-1" === b && (b = a.path),
						b
				},
				get_query: function(b) {
					var c = String(a.document.location.href),
						d = new RegExp("(^|)" + b + "=([^&]*)(&|$)", "gi").exec(c);
					return d && d.length > 2 ? d[2] : ""
				},
				substr: function(a, b) {
					return a ? a.length <= b ? a : a.substring(0, b - 1) + "…" : ""
				},
				mouse_position: function(a) {
					return a.pageX || a.pageY ? {
						x: a.pageX,
						y: a.pageY
					} : {
						x: a.clientX + document.body.scrollLeft - document.body.clientLeft,
						y: a.clientY + document.body.scrollTop - document.body.clientTop
					}
				},
				split_line: function(a) {
					var b = [];
					return _.isString(a) ? b = _.compact(a.split(/\n/)) : b
				},
				check_platform: function() {
					var a = navigator.userAgent.toLowerCase(),
						b = /ipad|iphone|ipod|android/gi.test(a),
						c = /ipad|iphone|ipod/gi.test(a),
						d = /ipad/gi.test(a),
						e = /iphone|ipod/gi.test(a),
						f = /android/gi.test(a),
						g = /micromessenger/gi.test(a);
					return {
						is_mobile: b,
						is_ios: c,
						is_ipad: d,
						is_iphone: e,
						is_android: f,
						is_weixin: g
					};
				}
			},
			validator : {
				isEmail: function(a) {
					var b = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
					return b.test(a)
				},
				isUrl: function(a) {
					var b = /^(https?|s?ftp):\/\/(((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-fA-F]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-fA-F]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-fA-F]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-fA-F]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-fA-F]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/;
					return b.test(a)
				}
			},
			get_cookie : function(a) {
				for(var b = a + "=",
						c = document.cookie.split(";"), d = 0; d < c.length; d++) {
					for(var e = c[d];
						" " == e.charAt(0);) e = e.substring(1, e.length);
					if(0 == e.indexOf(b)) return e.substring(b.length, e.length)
				}
				return null
			},
			console : {
				log: function(a) {
					c.config.debug() && console.log(a)
				},
				time: function(a) {
					c.config.debug() && console.time(a)
				},
				timeEnd: function(a) {
					c.config.debug() && console.timeEnd(a)
				},
				group: function(a) {
					c.config.debug() && console.groupCollapsed(a)
				},
				groupEnd: function(a) {
					c.config.debug() && console.groupEnd(a)
				},
				profile: function(a) {
					c.config.debug() && console.profile(a)
				},
				profileEnd: function(a) {
					c.config.debug() && console.profile(a)
				}
			},
			d : function(a, c, d) {
				b(".notifications").notify({
					type: a,
					message: {
						text: c
					},
					onClosed: d
				}).show()
			},
			msg : {
				info: function(a, b) {
					d("info", a, b)
				},
				error: function(a, b) {
					d("danger", a, b);
				},
				success: function(a, b) {
					d("success", a, b)
				},
				warn: function(a, b) {
					d("warning", a, b)
				}
			},
			localData : {
				hname: location.hostname ? location.hostname : "localStatus",
				isLocalStorage: !!window.localStorage,
				dataDom: null,
				initDom: function() {
					if(!this.dataDom) try {
						this.dataDom = document.createElement("input"),
							this.dataDom.type = "hidden",
							this.dataDom.style.display = "none",
							this.dataDom.addBehavior("#default#userData"),
							document.body.appendChild(this.dataDom);
						var a = new Date;
						a = a.getDate() + 30,
							this.dataDom.expires = a.toUTCString()
					} catch(a) {
						return !1
					}
					return !0
				},
				set: function(b, c) {
					this.isLocalStorage ? 
						window.localStorage.setItem(b, c) : 
						this.initDom() && (this.dataDom.load(this.hname), this.dataDom.setAttribute(b, c), this.dataDom.save(this.hname))
				},
				get: function(b) {
					return this.isLocalStorage ? 
						window.localStorage.getItem(b) : 
						this.initDom() ? 
							(this.dataDom.load(this.hname), this.dataDom.getAttribute(b)) : 
							void 0
				},
				setObject: function(b, c) {
					return this.isLocalStorage ? a.localStorage.setItem(b, JSON.stringify(c)) : null
				},
				getObject: function(b) {
					if(!this.isLocalStorage) return null;
					try {
						return JSON.parse(a.localStorage.getItem(b))
					} catch(a) {
						return null
					}
				},
				remove: function(a) {
					this.isLocalStorage ? localStorage.removeItem(a) : this.initDom() && (this.dataDom.load(this.hname), this.dataDom.removeAttribute(a), this.dataDom.save(this.hname))
				},
				clear: function() {
					this.isLocalStorage ? localStorage.clear() : this.initDom() && document.body.removeChild(this.dataDom)
				}
			},
			activity_icon : {
				project_create: "ai-blue fa-folder",
				project_update: "ai-yellow fa-folder",
				project_archive: "ai-dark-blue fa-archive",
				project_unarchive: "ai-red fa-archive",
				project_delete: "ai-red fa-trash-o",
				member_add: "ai-green fa-user",
				member_remove: "ai-red fa-user",
				member_join: "ai-orange fa-user",
				entry_create: "ai-blue fa-columns",
				entry_update: "ai-yellow fa-columns",
				entry_archive: "ai-dark-blue fa-archive",
				entry_unarchive: "ai-red fa-archive",
				entry_delete: "ai-red fa-trash-o",
				entry_restore: "ai-yellow fa-reply-all",
				entry_move: "ai-orange fa-share-square-o",
				task_create: "ai-blue fa fa-square-o",
				task_update: "ai-yellow fa fa-square-o",
				task_like: "ai-red fa fa-heart",
				task_cancel_like: "ai-blue fa fa-heart-o",
				task_delete: "ai-red fa fa-trash-o",
				task_lock: "ai-green fa fa-lock",
				task_cancel_lock: "ai-green fa fa-unlock-alt",
				task_restore: "ai-yellow fa-reply-all",
				task_move: "ai-orange fa-share-square-o",
				task_expire_set: "ai-yellow fa fa-clock-o",
				task_expire_reset: "ai-yellow fa fa-clock-o",
				task_complete: "ai-green fa fa-check-square",
				task_uncomplete: "ai-red fa fa-square-o",
				task_archive: "ai-dark-blue fa-archive",
				task_unarchive: "ai-red fa-archive",
				todo_add: "ai-blue fa-th-list",
				todo_remove: "ai-red fa-th-list",
				todo_check: "ai-green fa fa-check-square",
				todo_uncheck: "ai-red fa fa-square-o",
				todo_update: "ai-yellow fa-th-list",
				labels_add: "ai-green fa-tag",
				labels_remove: "ai-red fa-tag",
				folder_add: "ai-blue fa-folder-open-o",
				folder_update: "ai-yellow fa-folder-open-o",
				folder_del: "ai-red fa-folder-open-o",
				file_move: "ai-orange fa-share-square-o",
				file_attach: "ai-blue fa-paperclip",
				file_detach: "ai-red fa-paperclip",
				file_upload: "ai-blue fa-file",
				file_update: "ai-yellow fa-file",
				file_new_version: "ai-blue fa-upload",
				file_delete: "ai-red fa-trash-o",
				file_restore: "ai-yellow fa-reply-all",
				comment_add: "ai-blue fa-comment",
				comment_remove: "ai-red fa-comment",
				watch_add: "ai-purple fa-eye",
				watch_remove: "ai-red fa-eye",
				post_create: "ai-blue fa-comments-o",
				post_update: "ai-yellow fa-comments-o",
				post_delete: "ai-red fa-trash-o",
				post_restore: "ai-yellow fa-reply-all",
				page_create: "ai-blue fa-file-text-o",
				page_update: "ai-yellow fa-file-text-o",
				page_new_version: "ai-blue fa-file-text-o",
				page_delete: "ai-red fa-trash-o",
				page_restore: "ai-yellow fa-reply-all",
				event_create: "ai-blue fa-calendar",
				event_update: "ai-yellow fa-calendar",
				event_delete: "ai-red fa-trash-o",
				attendee_add: "ai-green fa-user",
				attendee_remove: "ai-red fa-user"
			},
			init_fancybox : function() {
				var a = {
					padding: 0,
					scrolling: "auto",
					maxWidth: "95%",
					wrapCSS: "fancybox-scroll",
					openEffect: "elastic",
					closeEffect: "elastic",
					closeBtn: !1,
					beforeLoad: function() {
						_.isString(this.title) && (this.title = filterXSS(this.title), this.title = this.title.replace(/\n/g, "<br>"))
					},
					afterShow: function() {
						c.init_fancybox_plugin_rotateR.fancyState.rad = 0,
							c.init_fancybox_plugin_rotateR.init(),
							c.init_fancybox_plugin_rotateR.bind()
					},
					onUpdate: function() {
						c.init_fancybox_plugin_rotateR.init(),
							c.init_fancybox_plugin_rotateR._fancybox_resize()
					},
					beforeClose: function() {
						c.init_fancybox_plugin_rotateR.fancyState.rad = -90,
							c.init_fancybox_plugin_rotateR._fancybox_rotate(1)
					},
					afterClose: function() {
						c.init_fancybox_plugin_rotateR.unbind()
					},
					helpers: {
						title: {
							type: "outside",
							position: "top"
						},
						buttons: {
							tpl: ['<div id="fancybox-buttons"><ul>', '<li><a class="btnPrev" href="javascript:;"></a></li>', '<li><a class="btnPlay" href="javascript:;"></a></li>', '<li><a class="btnNext" href="javascript:;"></a></li>', '<li><a class="btnToggle" href="javascript:;"></a></li>', '<li><a class="btnRotateR" href="javascript:;"></a></li>', '<li><a class="btnClose" href="javascript:;"></a></li>', "</ul></div>"].join("")
						},
						thumbs: {
							width: 50,
							height: 50
						},
						media: {}
					},
					tpl: {
						wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
						image: '<img class="fancybox-image" src="{href}" alt="" />',
						iframe: ['<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" ', " webkitAllowFullScreen mozallowfullscreen allowFullScreen", c.util.isIE() ? ' allowtransparency="true"' : "", "></iframe>"].join(""),
						closeBtn: '<a class="fancybox-item fancybox-close" href="javascript:;"></a>',
						next: '<a class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
						prev: '<a class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
					}
				};
				b(".fancybox-file").fancybox(a)
			},
			init_fancybox_plugin_rotateR : {
				fancyState: {
					rad: 0,
					width: 0,
					height: 0,
					left: 0,
					top: 0
				},
				init: function() {
					var a = c.init_fancybox_plugin_rotateR.fancyState,
						d = b(".fancybox-inner"),
						e = b(".fancybox-wrap");
					a.left = parseInt(e.css("left")),
						a.top = parseInt(e.css("top")),
						a.width = d.width(),
						a.height = d.height()
				},
				bind: function() {
					_.findIndex(b._data(document.body, "events").click, {
						selector: ".btnRotateR"
					}) === -1 && b("body").on("click", ".btnRotateR",
						function() {
							c.init_fancybox_plugin_rotateR._fancybox_rotate(1)
						})
				},
				unbind: function() {
					c.init_fancybox_plugin_rotateR.fancyState.rad = -90,
						b("body").off("click", ".btnRotateR")
				},
				_fancybox_rotate: function(a) {
					var d = c.init_fancybox_plugin_rotateR.fancyState;
					d.rad = d.rad + 90 * a,
						d.rad == 360 * a && (d.rad = 0),
						_.each(["transform", "-ms-transform", "-webkit-transform", "-o-transform"],
							function(a) {
								b(".fancybox-inner").css(a, "rotate(" + d.rad + "deg)")
							}),
						c.init_fancybox_plugin_rotateR._fancybox_resize()
				},
				_fancybox_resize: function() {
					var a = c.init_fancybox_plugin_rotateR.fancyState,
						d = b(".fancybox-inner"),
						e = b(".fancybox-wrap"),
						f = b(".fancybox-skin"),
						g = b(".fancybox-outer"),
						h = a.left,
						i = a.top,
						j = a.width,
						k = a.height,
						l = document.body.offsetHeight;
					90 == Math.abs(a.rad) || 270 == Math.abs(a.rad) ? (j >= l && (j = l - 150, k *= j / a.width, h += (a.width - j) / 2, i += (a.height - k) / 2), f.width(k).height(j), d.width(j).height(k), d.css("left", (k - j) / 2).css("top", (j - k) / 2), g.height("100%"), h += (j - k) / 2, i += (k - j) / 2) : (f.width(a.width).height(a.height), d.width("100%").height(a.height), d.css("left", "0").css("top", "0")),
						e.css("left", h + "px").css("top", i + "px")
				}
			},
			e : function() {
				b(document).ready(function() {
						c.init_fancybox()
					}),
					a.location.origin || (a.location.origin = a.location.protocol + "//" + a.location.host)
			},

 			// e(),

	};
});








