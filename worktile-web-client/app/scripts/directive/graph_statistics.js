/**
 * @ngdoc function
 * @name jtWorkApp.directive:graph
 * @description
 * # graph
 */
define(['app'], function (app) {
	'use strict';
	app.directive('wtGraphGauge', 
		[function() {
			return {
				restrict: "E",
				scope: {
					title: "@",
					size: "@",
					number: "=",
					color: "@",
					bgcolor: "@"
				},
				template: "<div></div>",
				link: function(a, b, c) {
					var d = parseInt(a.number, 10),
						e = a.bgcolor ? a.bgcolor : "#EEE";
					_.isNaN(d) && (d = 0),
						$(b).children().eq(0).highcharts(Highcharts.merge(f, g, {
							chart: {
								height: a.size,
								style: {
									fontFamily: '"Helvetica Neue",helvetica, "lucida grande", "lucida sans unicode", lucida, "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif'
								}
							},
							pane: {
								background: {
									backgroundColor: e
								}
							},
							series: [{
								data: [{
									color: a.color,
									y: d
								}],
								dataLabels: {
									format: '<div style="text-align:center"><span style="font-size:16px;color:' + a.color + '">{y}<small>%</small></span>'
								}
							}]
						})),
						a.$watch("number",
							function(a, c) {
								var d, e = $(b.children()[0]).highcharts();
								e && (d = e.series[0].points[0], d && (_.isNaN(a) && (a = 0), a = ~~a, d.update(a)))
							})
				}
			}
	}])
	.directive('wtGraphColumn',
		[function() {
			
			return {
				restrict: "E",
				scope: {
					config: "="
				},
				template: "<div></div>",
				link: function(a, b, c) {
					var d = "#e1e1e1",
						e = "#fbfbfb",
						g = {
							chart: {
								animation: !1,
								type: "column",
								style: {
									fontFamily: '"Helvetica Neue",helvetica, "lucida grande", "lucida sans unicode", lucida, "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif'
								},
								backgroundColor: "#ffffff"
							},
							legend: {
								align: "right",
								verticalAlign: "bottom"
							},
							title: {
								text: ""
							},
							colors: [kzi.constant.graph_color.todo, kzi.constant.graph_color.done],
							xAxis: {
								title: {
									text: ""
								},
								tickInterval: 1,
								lineColor: d,
								tickColor: d,
								tickWidth: 0
							},
							yAxis: {
								title: {
									text: ""
								},
								lineWidth: 1,
								minTickInterval: 1,
								lineColor: d,
								gridLineColor: e,
								gridLineWidth: 0,
								minRange: 4,
								min: 0,
								floor: 0
							}
						};
					g = Highcharts.merge(f, g, a.config),
						$(b).children().eq(0).highcharts(g)
				}
			}
		
	}])
	.directive('wtGraphPie',
		[function() {
			
			return {
				restrict: "E",
				scope: {
					name: "@",
					height: "@",
					data: "="
				},
				template: "<div></div>",
				link: function(a, b, c) {
					var d = a.height ? parseInt(a.height, 10) : 240,
						e = Highcharts.merge(f, h, {
							chart: {
								height: d,
								style: {
									fontFamily: '"Helvetica Neue",helvetica, "lucida grande", "lucida sans unicode", lucida, "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif'
								}
							},
							plotOptions: {
								pie: {
									showInLegend: !0,
									innerSize: "60%",
									dataLabels: {
										distance: -25,
										style: {
											color: "#ffffff",
											textShadow: "0 0 0 none"
										},
										formatter: function() {
											return ~~this.percentage + "%"
										}
									}
								}
							},
							series: [{
								name: a.name,
								data: a.data
							}]
						});
					$(b).children().eq(0).highcharts(e)
				}
			}
		
	}])
	;
});