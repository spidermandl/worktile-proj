/**
 * @ngdoc function
 * @name jtWorkApp.service:
 * @description
 */
define(['app'], function (app) {
 	'use strict';

	app.factory('feed', ['config',
		function (config) {
			
			var a = config.feed_url(),
				b = null,
				c = null,
				d = null,
				e = null;
			return {
				onMessage: function(a) {
					e = a
				},
				onPresence: function(a) {
					d = a
				},
				getStatus: function() {
					return c
				},
				connect: function(c, f) {
					b = io.connect(a, {
							transports: ["websocket"]
						}),
						b && (b.on("connect",
							function() {
								console.log("Connect feed successfully."),
									d(c, config.constant.state.online)
							}), b.on("feed_message", e), b.on("error",
							function(a) {
								console.log("error:", a),
									console.log("login failed"),
									d(c, config.constant.state.offline)
							}), b.on("connect_error",
							function(a) {
								console.log("connect error:", a),
									d(c, config.constant.state.offline)
							}))
				},
				getConnection: function() {
					return b
				},
				getMyJid: function() {},
				online: function() {
					b && b.emit("status", config.constant.state.online)
				},
				leave: function() {
					b && b.emit("status", config.constant.state.leave)
				},
				close: function() {
					b.disconnect()
				}
			}

		}
	]);
});