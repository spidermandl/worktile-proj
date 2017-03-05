/**
 * @ngdoc function
 * @name jtWorkApp.service:event
 * @description
 */
define(['app'], function (app) {
    'use strict';

    app.service('feedbackService',["$uibModal", "$rootScope", "$translate",'config',
        function(a, b, c, config){
        
            this.show = function() {
                var b = a.open({
                    windowClass: "dialog-w680",
                    templateUrl: "/ycjs/directive/feedback/feedback_form.html",
                    controller: ["$scope", "$rootScope", "$location", "$sce", "Upload",
                        function(a, d, e, f, g) {
                            var h = a.vm = {
                                action_url: d.global.config.box_url() + "?pid=feedback&token=" + config.get_cookie("sid"),
                                client: "v3",
                                feedback_desc: "",
                                status: {
                                    message: "",
                                    code: 0
                                },
                                isSubmit: !1,
                                help_keywords: "",
                                help_links_init: [{
                                    title: c.instant("feedback.help_how_star"),
                                    url: "https://worktile.com/videos/two-minute-intro"
                                }, {
                                    title: c.instant("feedback.help_guidlinke"),
                                    url: "https://worktile.com/club/tutorial/15ac563d7447f6"
                                }, {
                                    title: c.instant("feedback.help_video"),
                                    url: "https://worktile.com/videos/"
                                }, {
                                    title: c.instant("feedback.help_dingtalk"),
                                    url: "https://worktile.com/guide/dingtalk/dingtalk"
                                }, {
                                    title: c.instant("feedback.help_create_project"),
                                    url: "https://worktile.com/guide/project/create"
                                }, {
                                    title: c.instant("feedback.help_get_project_template"),
                                    url: "https://worktile.com/template"
                                }, {
                                    title: c.instant("feedback.help_how_improve_worktile"),
                                    url: "https://worktile.com/blog/skills/ten-ways-to--use-worktile-better"
                                }, {
                                    title: c.instant("feedback.help_why_pro"),
                                    url: "https://worktile.com/upgrade?utm_source=feedback"
                                }],
                                help_links: [],
                                feedback_type: null,
                                feedback_types: [{
                                    value: 1,
                                    name: c.instant("feedback.type_get_support")
                                }, {
                                    value: 2,
                                    name: c.instant("feedback.type_find_bug")
                                }, {
                                    value: 3,
                                    name: c.instant("feedback.type_advice")
                                }, {
                                    value: 4,
                                    name: c.instant("feedback.type_how_much")
                                }, {
                                    value: 5,
                                    name: c.instant("feedback.type_emergency")
                                }, {
                                    value: 6,
                                    name: c.instant("feedback.type_want_talk")
                                }, {
                                    value: 7,
                                    name: c.instant("feedback.type_awesome")
                                }],
                                category: 0,
                                pagesType: ["apk", "bak", "cs", "css", "csv", "doc", "exe", "fla", "html", "ipa", "java", "js", "mp3", "mp4", "page", "pdf", "php", "ppt", "rar", "snippet", "swf", "ttf", "txt", "vss", "xls", "xsd", "zip"],
                                file_path: "",
                                file_size: "",
                                file_ext: "default",
                                on_upload: !1,
                                progressPercentage: 0
                            };
                            f.trustAsUrl(h.action_url);
                            var i;
                            a.$watch("vm.help_keywords", _.debounce(function(a) {
                                    "" !== a && null != a && (void 0 !== i && i.canceler.resolve(), i = wt.data.utils.get_help_related(a), i.promise.success(function(a) {
                                        null != a.data && (a.data.length > 5 ? h.help_links = a.data.slice(0, 5) : h.help_links = a.data)
                                    }))
                                }), 500),
                                _.isEmpty(d.global.me) || (a.name = d.global.me.display_name, a.email = d.global.me.email),
                                h.on_upload = !1,
                                a.upload_message = c.instant("feedback.select_attachment"),
                                a.isImage = !1,
                                a.imageType = ["jpg", "png", "gif"],
                                h.js_file_select = function(b) {
                                    b && g.upload({
                                        url: h.action_url,
                                        fields: {
                                            size: b.size,
                                            target: "all"
                                        },
                                        file: b
                                    }).progress(function(a) {
                                        h.on_upload = !0,
                                            h.progressPercentage = parseInt(100 * a.loaded / a.total)
                                    }).success(function(b, c, d, e) {
                                        h.on_upload = !1,
                                            h.file_path = config.config.wtall_url + b.files[0].url,
                                            h.file_name = e.file.name,
                                            h.file_size = parseInt(b.files[0].size / 1e3),
                                            a.upload_message = b.files[0].fname;
                                        var f = b.files[0].ext,
                                            g = _.indexOf(a.imageType, f);
                                        if(g !== -1) a.isImage = !0;
                                        else {
                                            a.isImage = !1;
                                            var i = _.indexOf(h.pagesType, f);
                                            i !== -1 ? h.file_ext = h.pagesType[i] : h.file_ext = "default"
                                        }
                                    }).error(function(a, b, c, d) {
                                        h.on_upload = !1
                                    })
                                },
                                h.js_feedback_submit = function(a) {
                                    return h.on_upload ? void config.msg.warn(c.instant("feedback.uploading")) : (h.isSubmit = !0, void wt.data.feedback.add(d.global.me.display_name, d.global.me.email, h.category, h.feedback_desc, h.file_path, h.feedback_type.value - 1, h.client,
                                        function(a) {
                                            h.isSubmit = !1,
                                                h.status = {
                                                    code: 2,
                                                    message: c.instant("feedback.info_success")
                                                }
                                        },
                                        function(a) {
                                            config.msg.warn(c.instant("feedback.err_feedback_fail"))
                                        },
                                        function() {
                                            h.isSubmit = !1
                                        }))
                                },
                                h.js_feedback_begin = function() {
                                    h.status = {
                                        code: 1,
                                        message: ""
                                    }
                                },
                                h.js_feedback_again = function() {
                                    h.status = {
                                        code: 0,
                                        message: ""
                                    }
                                },
                                h.js_close = function() {
                                    b.close()
                                }
                        }
                    ]
                })
            }
        

    }]);
})