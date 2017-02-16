/**
 * @ngdoc function
 * @name jtWorkApp.directive:wtTeamLogo
 * @description
 * # wtTeamLogo
 * left menu team log directive
 */
define(['app'], function (app) {
    'use strict';
    app.directive('wtTeamLogo', ['config',
        function(config) {
            return {
                templateUrl: config.templateUrls.team_logo,
                restrict: "E",
                replace: !0,
                scope: {
                    team: "="
                },
                link: function(a, b, c) {
                    var d = a.vm = {
                        logo_url: "",
                        size: null == c.size ? "40": c.size
                    },
                    e = 40;
                    angular.isDefined(c.size) && (e = parseInt(c.size, 10)),
                    e < 45 && (e = 40),e >= 45 && (e = 80),e >= 85 && (e = 180),
                    a.$watch("team",
                        function(a) {
                            null != a && 
                            ("default_logo.png" === a.pic || 
                                _.isEmpty(a.pic) ? 
                                    d.logo_url = kzi.config.cdnpath + "images/team/" + e + "/default_logo.png": 
                                    d.logo_url = kzi.config.wtteamlogo_url + e + "/" + a.pic);
                        }
                    );
                }
            };  
    }]);
});
