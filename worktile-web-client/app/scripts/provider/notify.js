/**
 * @ngdoc function
 * @name jtWorkApp.service:
 * @description
 */
define(['app'], function (app) {
 	'use strict';

	app.provider('$wtNotify', ['config',
		function (config) {
			
			
			var a = {
					title: "Hey, 我在这里!",
					body: "",
					icon: "",
					tag: "",
					lang: "en",
					timeout: 2,
					notifyShow: function() {},
					notifyClose: function() {},
					notifyClick: function() {},
					notifyError: function() {}
				},
				b = {};
			this.config = function(a) {
					b = a
				},
			this.$get = [function() {
				function c(c) {
					var d = this.options = angular.extend({},
							a, b, c),
						e = new Notify(d.title, d);
					Notify.needsPermission ? Notify.requestPermission(function() {
						e.show()
					}) : e.show()
				}
				var d;
				return d = {
					notify: function(a) {
						return new c(a)
					},
					notSetPermission: "default" == Notify.permissionLevel,
					checkPermission: function(a, b, c) {
						var a = a ||
							function() {},
							b = b ||
							function() {},
							c = c ||
							function() {};
						Notify.needsPermission ? Notify.requestPermission(function() {
									d.permissionLevel = "granted",
										d.needsPermission = !1,
										a()
								},
								function() {
									d.permissionLevel = "denied",
										d.needsPermission = !0,
										b()
								}) : (d.permissionLevel = "granted", a()),
							d.notSetPermission = !1,
							c()
					},
					needsPermission: Notify.needsPermission,
					requestPermission: Notify.requestPermission,
					isSupported: Notify.isSupported,
					permissionLevel: Notify.permissionLevel
				}
			}]
		

		}
	]);
});