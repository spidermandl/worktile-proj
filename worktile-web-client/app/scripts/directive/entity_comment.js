/**
 * @ngdoc function
 * @name jtWorkApp.directive:wtTeamLogo
 * @description
 * # wtTeamLogo
 * left menu team log directive
 */
define(['app'], function (app) {
    'use strict';
    app.directive('commentList', ['config',
        function(config) {

            return {
                restrict: "E",
                scope: {
                    argType: "=",
                    argProject: "=",
                    argEntity: "=",
                    argEntityExt: "="
                },
                controller: "commentListCtrl",
                templateUrl: config.templateUrls.entity_comment_list,
            }
        
    }])
    .directive('wtItemCommentActivity', ["$timeout", "locator",'config',
        function(a,b,config) {
            return {
                scope: {
                    argType: "&",
                    argProject: "=",
                    argEntity: "=",
                    argEntityExt: "="
                },
                restrict: "E",
                templateUrl: config.templateUrls.entity_item_comment_activity,
                link: function(c, d, e) {
                    c.tab_active = {};
                    var f = null;
                    c.select_tab_comment = function() {
                        c.tab_active.activity = !1,
                        c.tab_active.comment = !0,
                        c.$broadcast(config.constant.event_names.clear_item_activities)
                    },
                    c.select_tab_activity = function() {
                        c.tab_active.activity = !0,
                        c.tab_active.comment = !1,
                        c.$broadcast(config.constant.event_names.reload_item_activities, f || b)
                    },
                    c.$on(config.constant.event_names.select_comment_tab,
                        function(d, e) {
                            c.select_tab_comment(),
                            f = e,
                            a(function() {
                                c.$broadcast(config.constant.event_names.load_comments, f || b)
                            })
                    }),
                    c.$on(config.constant.event_names.clear_comment_activity,
                        function(a, b) {
                            c.$broadcast(config.constant.event_names.clear_item_activities),
                            c.$broadcast(config.constant.event_names.clear_comments)
                    })
                }
            }
            ;  
    }])
    ;


});
