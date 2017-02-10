/**
 * @ngdoc function
 * @name jtWorkApp.directive:wtAvatar
 * @description
 * # wtAvatar 左侧控制栏的个人信息按钮
 * left menu directive
 */
define(['app'], function (app) {
    'use strict';

    app.directive('wtAvatar', ['$rootScope','$state','$popbox','config',
        function($rootScope,$state,$popbox,config) {
            return {
                restrict: "E",
                replace: !0,
                templateUrl: config.templateUrls.left_menu_avatar,
                compile: function(scope, element, attr) {
                    return {
                        pre: function(scope, element, attr) {
                            function excute(){
                                if (!_.isUndefined(attr.member)) {
                                    var b = scope.$eval(attr.member);
                                    if (_.isUndefined(b) || _.isNull(b)) return;
                                    setView(b);
                                }
                                var m_info = scope.$eval(attr.member);

                            }
                            function setView(info){
                                //console.log(info);
                                var h = ['<span class="avatar-face {{avatarFaceClass}}">{{avatarFaceInner}}{{avatarStatus}}</span>', "{{avatarBr}}", "{{avatarName}}", "{{avatarAtname}}", "{{avatarAppend}}"].join(""),
                                i = 40;
                                if (angular.isDefined(attr.size) && (i = parseInt(attr.size, 10)), 
                                                                    element.addClass("avatar-" + i), 
                                                                    i < 45 && (i = 40), i >= 45 && (i = 80), 
                                                                    i >= 100 && (i = 180), 
                                                                    element.attr("title", info.display_name), 
                                                                    element.attr("member-id", info.uid), 
                                                                    h = angular.isDefined(attr.faceclass) ? h.replace("{{avatarFaceClass}}", attr.faceclass) 
                                                                                                        : h.replace("{{avatarFaceClass}}", ""), 
                                                                    "default_avatar.png" === info.avatar || _.isEmpty(info.avatar)) {
                                    var j = /[u4e00-u9fa5]/;
                                    if (j.test(info.display_name)) 
                                        var k = info.display_name.substring(0, 2).toLocaleUpperCase();
                                    else 
                                        var k = info.display_name.substring(info.display_name.length - 2, info.display_name.length).toLocaleUpperCase();
                                    h = h.replace("{{avatarFaceInner}}", '<span class="avatar-text">' + k + "</span>")
                                } else {
                                    var l = kzi.config.default_avatar;
                                    if (info.avatar) {
                                        var m = i;
                                        c.isRetina && (m = 40 == i ? 80 : 180),
                                        l = kzi.config.wtavatar_url + m + "/" + info.avatar,
                                        0 !== info.avatar.indexOf("https://") && 0 !== info.avatar.indexOf("http://") || (l = 0 === info.avatar.indexOf("http://i01.lw.aliimg.com/") || 0 === info.avatar.indexOf("https://i01.lw.aliimg.com/") ? info.avatar.replace("http://i01.lw.aliimg.com/", "https://i01.lw.aliimg.com/") : 0 === info.avatar.indexOf("http://q.qlogo.cn/") || 0 === info.avatar.indexOf("https://q.qlogo.cn/") ? info.avatar.replace("http://q.qlogo.cn/", "https://q.qlogo.cn/") : kzi.config.default_avatar)
                                    }
                                    h = h.replace("{{avatarFaceInner}}", '<img src="' + l + '" alt="' + info.display_name + '"/>')
                                }
                                if (angular.isDefined(attr.status) || angular.isDefined(attr.role)) {
                                    var n = info.role ? info.role: 2,
                                    o = "",
                                    p = "",
                                    q = attr.isTeam ? d.instant("common.txt_admin") : d.instant("common.txt_manager");
                                    if (1 == n || 3 == n) {
                                        var r = "";
                                        1 == n ? (p = q, r = "member-admin") : 2 == n ? (p = d.instant("common.txt_member"), r = "member-user") : 3 == n && (p = d.instant("common.txt_visitor"), r = "member-guest")
                                    }
                                    info.online == kzi.constant.state.online && (o = "online", p += "(" + d.instant("directive_avatar.online") + ")"),
                                    info.online == kzi.constant.state.leave && (o = "leave", p += "(" + d.instant("directive_avatar.leave") + ")"),
                                    info.online == kzi.constant.state.offline && (o = "offline", p += "(" + d.instant("directive_avatar.offline") + ")"),
                                    h = 1 == n ? h.replace("{{avatarStatus}}", '<i class="fa fa-user ' + o + " " + r + '" title="' + p + '"></i>') : h.replace("{{avatarStatus}}", '<i class="status-point ' + o + '" title="' + p + '"></i>')
                                } else h = h.replace("{{avatarStatus}}", "");
                                if (angular.isDefined(attr.href) && 
                                        "" !== attr.href ? element.attr("href", attr.href) :
                                                           element.attr("href", "javascript:;"), 
                                        h = angular.isDefined(attr.namebr) ? h.replace("{{avatarBr}}", "<br/>") : 
                                                           h.replace("{{avatarBr}}", ""), angular.isDefined(attr.name)) {
                                    var s = info.display_name;
                                    "true" !== attr.name && (s = scope.$eval(attr.name)),
                                    h = h.replace("{{avatarName}}", '<span class="avatar-name {{avatarNameclass}}">' + b(s) + "</span>"),
                                    h = angular.isDefined(attr.nameclass) ? h.replace("{{avatarNameclass}}", attr.nameclass) : 
                                                                            h.replace("{{avatarNameclass}}", "")
                                } 
                                else 
                                    h = h.replace("{{avatarName}}", "");
                                if (h = angular.isDefined(attr.atname) ? h.replace("{{avatarAtname}}", '<span class="avatar-atname">(' + info.name + ")</span>") : 
                                                                        h.replace("{{avatarAtname}}", ""), 
                                    h = angular.isDefined(attr.append) ? h.replace("{{avatarAppend}}", '<span class="avatar-append">' + attr.append + "</span>") : 
                                                                        h.replace("{{avatarAppend}}", ""), $(element).html(h), element.unbind("dragstart.wt-avatar"), angular.isDefined(attr.drag)) {
                                    var t = scope.$eval(attr.drag);
                                    _.isEmpty(t) ? element.bind("dragstart.wt-avatar",
                                                                function(a) {
                                                                    return a.preventDefault(),
                                                                    !1
                                                                }) : 
                                                    element.draggable(t)
                                } else 
                                    element.bind("dragstart.wt-avatar",
                                                function(a) {
                                                    return a.preventDefault(),
                                                    !1
                                                });
                            }
                            scope.$watch(attr.member,
                                function(_new, _old) {
                                    _.isUndefined(_new) || _.isNull(_new) || _.isEqual(_new, _old) || setView(_new)
                                },
                                !0),
                            excute();
                            //pre: function(a, e, f) {
                            // function g() {
                            //     if (!_.isUndefined(f.member)) {
                            //         var b = a.$eval(f.member);
                            //         if (_.isUndefined(b) || _.isNull(b)) return;
                            //         h(b)
                            //     }
                            // }
                            // function h(g) {
                            //     var h = ['<span class="avatar-face {{avatarFaceClass}}">{{avatarFaceInner}}{{avatarStatus}}</span>', "{{avatarBr}}", "{{avatarName}}", "{{avatarAtname}}", "{{avatarAppend}}"].join(""),
                            //     i = 40;
                            //     if (angular.isDefined(f.size) && (i = parseInt(f.size, 10)), e.addClass("avatar-" + i), i < 45 && (i = 40), i >= 45 && (i = 80), i >= 100 && (i = 180), e.attr("title", g.display_name), e.attr("member-id", g.uid), h = angular.isDefined(f.faceclass) ? h.replace("{{avatarFaceClass}}", f.faceclass) : h.replace("{{avatarFaceClass}}", ""), "default_avatar.png" === g.avatar || _.isEmpty(g.avatar)) {
                            //         var j = /[u4e00-u9fa5]/;
                            //         if (j.test(g.display_name)) var k = g.display_name.substring(0, 2).toLocaleUpperCase();
                            //         else var k = g.display_name.substring(g.display_name.length - 2, g.display_name.length).toLocaleUpperCase();
                            //         h = h.replace("{{avatarFaceInner}}", '<span class="avatar-text">' + k + "</span>")
                            //     } else {
                            //         var l = kzi.config.default_avatar;
                            //         if (g.avatar) {
                            //             var m = i;
                            //             c.isRetina && (m = 40 == i ? 80 : 180),
                            //             l = kzi.config.wtavatar_url + m + "/" + g.avatar,
                            //             0 !== g.avatar.indexOf("https://") && 0 !== g.avatar.indexOf("http://") || (l = 0 === g.avatar.indexOf("http://i01.lw.aliimg.com/") || 0 === g.avatar.indexOf("https://i01.lw.aliimg.com/") ? g.avatar.replace("http://i01.lw.aliimg.com/", "https://i01.lw.aliimg.com/") : 0 === g.avatar.indexOf("http://q.qlogo.cn/") || 0 === g.avatar.indexOf("https://q.qlogo.cn/") ? g.avatar.replace("http://q.qlogo.cn/", "https://q.qlogo.cn/") : kzi.config.default_avatar)
                            //         }
                            //         h = h.replace("{{avatarFaceInner}}", '<img src="' + l + '" alt="' + g.display_name + '"/>')
                            //     }
                            //     if (angular.isDefined(f.status) || angular.isDefined(f.role)) {
                            //         var n = g.role ? g.role: 2,
                            //         o = "",
                            //         p = "",
                            //         q = f.isTeam ? d.instant("common.txt_admin") : d.instant("common.txt_manager");
                            //         if (1 == n || 3 == n) {
                            //             var r = "";
                            //             1 == n ? (p = q, r = "member-admin") : 2 == n ? (p = d.instant("common.txt_member"), r = "member-user") : 3 == n && (p = d.instant("common.txt_visitor"), r = "member-guest")
                            //         }
                            //         g.online == kzi.constant.state.online && (o = "online", p += "(" + d.instant("directive_avatar.online") + ")"),
                            //         g.online == kzi.constant.state.leave && (o = "leave", p += "(" + d.instant("directive_avatar.leave") + ")"),
                            //         g.online == kzi.constant.state.offline && (o = "offline", p += "(" + d.instant("directive_avatar.offline") + ")"),
                            //         h = 1 == n ? h.replace("{{avatarStatus}}", '<i class="fa fa-user ' + o + " " + r + '" title="' + p + '"></i>') : h.replace("{{avatarStatus}}", '<i class="status-point ' + o + '" title="' + p + '"></i>')
                            //     } else h = h.replace("{{avatarStatus}}", "");
                            //     if (angular.isDefined(f.href) && "" !== f.href ? e.attr("href", f.href) : e.attr("href", "javascript:;"), h = angular.isDefined(f.namebr) ? h.replace("{{avatarBr}}", "<br/>") : h.replace("{{avatarBr}}", ""), angular.isDefined(f.name)) {
                            //         var s = g.display_name;
                            //         "true" !== f.name && (s = a.$eval(f.name)),
                            //         h = h.replace("{{avatarName}}", '<span class="avatar-name {{avatarNameclass}}">' + b(s) + "</span>"),
                            //         h = angular.isDefined(f.nameclass) ? h.replace("{{avatarNameclass}}", f.nameclass) : h.replace("{{avatarNameclass}}", "")
                            //     } else h = h.replace("{{avatarName}}", "");
                            //     if (h = angular.isDefined(f.atname) ? h.replace("{{avatarAtname}}", '<span class="avatar-atname">(' + g.name + ")</span>") : h.replace("{{avatarAtname}}", ""), h = angular.isDefined(f.append) ? h.replace("{{avatarAppend}}", '<span class="avatar-append">' + f.append + "</span>") : h.replace("{{avatarAppend}}", ""), $(e).html(h), e.unbind("dragstart.wt-avatar"), angular.isDefined(f.drag)) {
                            //         var t = a.$eval(f.drag);
                            //         _.isEmpty(t) ? e.bind("dragstart.wt-avatar",
                            //         function(a) {
                            //             return a.preventDefault(),
                            //             !1
                            //         }) : e.draggable(t)
                            //     } else 
                            //         e.bind("dragstart.wt-avatar",
                            //     function(a) {
                            //         return a.preventDefault(),
                            //         !1
                            //     })
                            // }
                            // a.$watch(f.member,
                            //     function(a, b) {
                            //         _.isUndefined(a) || _.isNull(a) || _.isEqual(a, b) || h(a)
                            //     },
                            //     !0),
                            // g()
                        },
                        post: function(a, b, c) {

                        }
                    }
                }
            }
        }
    ])
});