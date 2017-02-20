/**
 * @ngdoc function
 * @name jtWorkApp.service:IdentityService
 * @description
 * 登录前相关api service
 * Controller of the jtWorkApp
 */
define(['app'], function (app) {
    'use strict';

    app.service('ycTrack',function(){
        this.identify = function(a) {
            window.sa && sa.identify(a, !0);
        };
        this.track = function(a, b, c, d) {
            var e = "ng-err" === a;
            a = "wt_std_" + a;
            var f = a + "_" + b;
            if (window.sa && !e) {
                var g = {};
                c && (g.from = c),
                c && (g.from = c),
                d && (g.type = d),
                sa.track(f, g)
            }
            window._hmt ? window._hmt.push(["_trackEvent", a, b, c, d]) : console.info(["CATEGORY:" + a, ", ACTION:" + b, c ? ", from " + c: "", d ? ", type " + d: ""].join(""))
        };
        return this;
    });
})