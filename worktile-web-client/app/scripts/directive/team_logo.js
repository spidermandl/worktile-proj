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
                link: function($scope, element, attr) {
                    $scope.vm = {
                        logo_url: "",
                        size: null == attr.size ? "40": attr.size
                    };
                    var size = 40;
                    angular.isDefined(attr.size) && (size = parseInt(attr.size, 10)),
                    size < 45 && (size = 40),size >= 45 && (size = 80),size >= 85 && (size = 180),
                    $scope.$watch("team",
                        function(team) {
                            null != team && 
                            ("default_logo.png" === team.pic || 
                                _.isEmpty(team.pic) ? 
                                    $scope.vm.logo_url = config.cdnpath + "images/team/" + size + "/default_logo.png": 
                                    $scope.vm.logo_url = config.wtteamlogo_url + size + "/" + team.pic);
                        }
                    );
                }
            };  
    }]);
});
