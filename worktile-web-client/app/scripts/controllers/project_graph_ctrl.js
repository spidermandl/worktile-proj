/**
 * @ngdoc function
 * @name jtWorkApp.controller:graph 相关
 * @description
 * # graph related controllers
 * Controller of the jtWorkApp
 */
define(['app'], function (app) {
	'use strict';

	/**************************************************************************************************************
	 *
	 **************************************************************************************************************/
	app.controller('projectGraphToolbarCtrl', [
		function () {
		
	}])
	/**************************************************************************************************************
	 *
	 **************************************************************************************************************/
	.controller('projectGraphCtrl', ["$scope", "$stateParams", "$rootScope", "Util", "$timeout", "$translate", 
				"cutstrFilter", "ycTrack",'config','api',
		function (a, b, c, d, e, f, g, h,config,api) {

			function i(a) {
				function b() {
					$(window).trigger("resize")
				}
				var a = a ? a : 50;
				e(b, a)
			}

			function j() {
				c.global.title = [f.instant("graph.title_name"), " | ", a.project.name].join(""),
					c.global.loading_done = !0,
					"-1" !== a.project.team_id ? 
						1 === parseInt(a.project.archived) ? 
							a.permission = config.constant.permission.project_archived 
							: a.permission = config.constant.permission.ok 
						: 1 === parseInt(a.project.archived) ? 
							a.permission = config.constant.permission.project_archived 
							: a.permission = config.constant.permission.ok,
					k.part_loading_done = !1,
					api.get_graph_overview(k.pid,
						function(a) {
							if(200 === a.code) {
								if(k.overview = a.data.overview, 
									k.overview_project_schedule = 
										(k.overview.completed - k.overview.archived) / (k.overview.completed - k.overview.archived + k.overview.uncompleted) * 100, 
										k.overview_delay_rate = k.overview.expired / k.overview.uncompleted * 100, 
										k.overview_completed = k.overview.completed - k.overview.archived, 
										k.overview_all = k.overview.uncompleted + k.overview.completed, 
										k.columnConfig.xAxis.categories = [], 
										k.columnConfig.series[0].data = [], 
										k.columnConfig.series[1].data = [], 
										!_.isEmpty(a.data.entries)) {

									var b = a.data.entries;
									b = _.sortBy(b,
											function(a) {
												return a.completed + a.uncompleted
											}),
										b = Array.prototype.slice.call(b).reverse(),
										b.forEach(function(a, b) {
											k.columnConfig.xAxis.categories.push(a.name),
												k.columnConfig.series[0].data.push(a.uncompleted),
												k.columnConfig.series[1].data.push(a.completed)
										})
								}
								a.data.labels && _.each(a.data.labels,
										function(a) {
											var b = _.find(config.constant.labels_list, {
												name: a.label_name
											});
											void 0 === b ? (a.label_desc = f.instant("graph.unknow_label"), b = "#d9dde4") : b = b.color,
												k.labels.push({
													name: g([a.label_desc || "　", 10]),
													y: a.total,
													color: b
												})
										}),
									k.members = _.sortBy(a.data.members,
										function(a) {
											return a.completed
										}),
									k.members = Array.prototype.slice.call(k.members).reverse(),
									k.members.length < 13 && (k.barConfig.chart.height = 250);
								for(var c = 0; c < k.members.length; c++) k.barConfig.xAxis.categories.push(k.members[c].display_name),
									k.barConfig.series[0].data.push(parseInt(k.members[c].uncompleted)),
									k.barConfig.series[1].data.push(parseInt(k.members[c].completed));
								k.today = a.data.today
							}
						},
						null,
						function() {
							k.part_loading_done = !0,
								a.js_to_pulse()
						})
			}
			h.track("project_graph", "visit");
			var k = a.vm = {
				part_loading_done: !1,
				pid: b.pid,
				overview: null,
				overview_project_schedule: 0,
				overview_delay_rate: 0,
				labels: [],
				today: null,
				columnConfig: {
					chart: {
						height: 250
					},
					xAxis: {
						categories: []
					},
					series: [{
						data: [],
						name: f.instant("graph.uncompleted"),
						stacking: "normal"
					}, {
						data: [],
						name: f.instant("graph.completed"),
						stacking: "normal"
					}]
				},
				barConfig: {
					chart: {},
					xAxis: {
						categories: []
					},
					series: [{
						data: [],
						name: f.instant("graph.uncompleted"),
						stacking: "normal"
					}, {
						data: [],
						name: f.instant("graph.completed"),
						stacking: "normal"
					}]
				},
				pulse_graph_date: "0000.00.00 - 00.00",
				disable_pulse_next: !0
			};
			moment.locale(config.lang);
			var l = function(a) {
					var b = [f.instant("common.week_s7"), f.instant("common.week_s1"), f.instant("common.week_s2"), f.instant("common.week_s3"), f.instant("common.week_s4"), f.instant("common.week_s5"), f.instant("common.week_s6")],
						c = [],
						d = [];
					a.forEach(function(a, b) {
						c.push(a.completed),
							d.push(a.created)
					});
					var e = "#e1e1e1",
						g = "#fbfbfb";
					g = _.max(c) > 0 || _.max(d) > 0 ? "#e1e1e1" : "#fbfbfb";
					var h = {
						chart: {
							renderTo: "pulse_weekly_graph",
							type: "line",
							backgroundColor: "#ffffff",
							height: 250,
							style: {
								fontFamily: '"Helvetica Neue",helvetica, "lucida grande", "lucida sans unicode", lucida, "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif'
							}
						},
						legend: {
							align: "right",
							verticalAlign: "bottom"
						},
						credits: {
							enabled: !1
						},
						title: {
							text: ""
						},
						xAxis: [{
							title: {
								text: ""
							},
							categories: b,
							lineColor: e,
							tickColor: e
						}, {
							title: {
								text: ""
							},
							opposite: !0,
							categories: b,
							lineColor: e,
							tickColor: e
						}],
						plotOptions: {
							line: {
								enabled: !0
							}
						},
						yAxis: [{
							title: {
								text: ""
							},
							lineWidth: 0,
							minTickInterval: 1,
							lineColor: e,
							gridLineColor: g,
							minRange: 4,
							min: 0,
							floor: 0
						}, {
							title: {
								text: ""
							},
							lineWidth: 0,
							minTickInterval: 1,
							opposite: !0,
							lineColor: e,
							gridLineColor: g,
							minRange: 4,
							min: 0,
							floor: 0
						}],
						series: [{
							data: c,
							name: f.instant("graph.pulse_completed"),
							animation: !1
						}, {
							data: d,
							name: f.instant("graph.pulse_newly"),
							animation: !1
						}],
						colors: [config.constant.graph_color.done, config.constant.graph_color.addnew]
					};
					0 != $("#pulse_weekly_graph").length && (new Highcharts.Chart(h), i())
				},
				m = function() {
					a.pulse_end > moment() ? k.disable_pulse_next = !0 : k.disable_pulse_next = !1,
						k.pulse_graph_date = a.pulse_start.format("YYYY.MM.DD") + " - " + a.pulse_end.format("MM.DD"),
						api.get_graph_pulse(
							{
								pid:k.pid, 
								start:a.pulse_start.valueOf(), 
								end:a.pulse_end.valueOf(),
							},
							function(b) {
								a.weekly_overview = b.data.overview,
									l(b.data.weekly)
							})
				};
				a.js_to_pulse = function() {
					a.pulse_start = moment().startOf("week").add(-1, "day"),
						a.pulse_end = moment().endOf("week").add(-1, "day"),
						m()
				},
				k.to_pulse_next_week = function() {
					a.pulse_end > moment() || k.part_loading_done && (a.pulse_start = a.pulse_start.add(7, "days"), a.pulse_end = a.pulse_end.add(7, "days"), m())
				},
				k.to_pulse_prev_week = function() {
					k.part_loading_done && (a.pulse_start = a.pulse_start.add(-7, "days"), a.pulse_end = a.pulse_end.add(-7, "days"), m())
				},
				d.$on("changeGraphTypeEvent",
					function() {
						j()
					},
					a),
				j(),
				a.$on(config.constant.event_names.on_task_update,
					function(a, b) {}),
				a.$on(config.constant.event_names.on_task_trash,
					function(a, b) {}),
				a.$on(config.constant.event_names.on_task_complete,
					function(a, b) {}),
				a.$on(config.constant.event_names.show_project_sidebar,
					function(a) {
						i(200)
					})
		
		
	}])
	;
});