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
        return this.identify = function(a) {
            window.sa && sa.identify(a, !0)
        },
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
        },
        this
    });


    app.service('TeamService', ["$uibModal", "globalDataContext","$translate", "ycTrack","config",
        function(a, b, c,d,config) {
            this.showAdd = function() {
                var e = a.open({
                    windowClass: "dialog-w680",
                    templateUrl: config.templateUrls.left_menu_dialog_team_create,
                    //"/app/js/service/team/dialog_team_create.html",
                    controller: ["$scope", "$rootScope", "$location",
                    function(a, f, g) {
                        function h() {
                            j.is_first_landing || (j.team_invite_email = [{
                                email: ""
                            }]),
                            j.all_industries = _.toArray(config.team_industries),//kzi.constant.team_industries),
                            j.all_industries.splice(0, 1),
                            _.each(j.all_industries,
                                function(a, b) {
                                    j.all_industries[b] = c.instant(a)
                                }),
                            j.team_scales = f.global.constant.scale,
                            _.each(j.team_scales,
                                function(a, b) {
                                    j.team_scales[b].text = c.instant(a.text)
                                })
                            //     ,
                            // wt.data.account.get_contacts(function(a) {
                            //         j.contact_members = a.data;
                            //     },
                            //     null, null)
                        }
                        function i() {
                            j.is_first_landing = !1,
                            wt.me.is_new = "0",
                            f.global.is_first_landing = !1
                        }
                        d.track("create_team", "visit");
                        var j = a.vm = {
                            step_index: 1,
                            step_max: 3,
                            team_name: "",
                            team_phone: "",
                            team_is_support: 0,
                            team_desc: "",
                            team_industry: null,
                            team_industry_text: null,
                            all_industries: [],
                            show_more_options: !1,
                            team_scales: [],
                            team_scale: "",
                            provinces: window.provinceCity,
                            team_invite_email: [{
                                email: ""
                            },
                            {
                                email: ""
                            }],
                            contact_members: [],
                            contact_members_selected: [],
                            is_first_landing: true,//"1" === wt.me.is_new
                        };
                        h(),
                        j.js_close = function() {
                            e.close(),
                            i()
                        },
                        j.js_next_step = function(a, b) {
                            if (! (j.step_index > j.step_max)) {
                                switch (j.step_index) {
                                case 2:
                                    b ? (j.team_invite_email = _.filter(j.team_invite_email,
                                    function(a) {
                                        return "" != a.email
                                    }), j.contact_members_selected = _.filter(j.contact_members,
                                    function(a) {
                                        return a.selected === !0
                                    })) : j.is_first_landing ? j.team_invite_email = [{
                                        email: ""
                                    },
                                    {
                                        phone: "",
                                        email: ""
                                    }] : j.team_invite_email = [{
                                        email: ""
                                    }],
                                    j.contact_members_selected.unshift(f.global.me)
                                }
                                return j.step_index++,
                                a.preventDefault(),
                                !1
                            }
                        },
                        j.js_team_industy_change = function() {
                            _.each(kzi.constant.team_industries,
                            function(a, b) {
                                c.instant(a) == j.team_industry_text && (j.team_industry = b)
                            })
                        },
                        j.js_contact_selected_toggle = function(a) {
                            _.each(j.contact_members,
                            function(b) {
                                b.uid == a && (b.selected === !0 ? b.selected = !1 : b.selected = !0)
                            })
                        },
                        j.js_add_invite_member_input = function() {
                            j.team_invite_email.push({
                                email: ""
                            })
                        },
                        j.js_remove_email_textbox = function(a) {
                            j.team_invite_email.splice(a, 1)
                        },
                        j.js_team_add = function() {
                            j.saving = !0,
                            j.contact_members.length > 0 && (_.each(j.contact_members,
                            function(a) {
                                a.selected === !0 && j.team_invite_email.push(a)
                            }), j.team_invite_email = _.filter(j.team_invite_email,
                            function(a) {
                                return "" != a.email
                            }));
                            var a = null,
                            e = {
                                province: j.province && j.province.n || "",
                                city: j.city && j.city.n || "",
                                district: j.district && j.district.n || ""
                            };
                            wt.data.team.add(j.team_name, j.team_phone, j.team_is_support, j.team_desc, j.team_industry, j.team_scale, e,
                            function(e) {
                                if (d.track("create_team", "done", "创建团队弹窗"), a = e.data, 0 == j.team_invite_email.length && 0 == j.contact_members_selected.length) return a.member_count = 1,
                                b.teams.push(a),
                                void g.path("/teams/" + a.team_id);
                                var f = j.team_invite_email.concat(j.contact_members_selected);
                                wt.data.team.invite_member(a.team_id, f, "", [],
                                function(b) {
                                    d.track("team_invite", "done", "创建团队弹窗"),
                                    a.member_count = 1 * b.data.length + 1
                                },
                                function() {
                                    kzi.msg.error(c.instant("team_service.err_invite_member"))
                                },
                                function() {
                                    b.teams.push(a),
                                    g.path("/teams/" + a.team_id)
                                })
                            },
                            function(a) {
                                kzi.msg.error(c.instant("team_service.err_team_add"))
                            },
                            function() {
                                j.saving = !1,
                                j.js_close()
                            })
                        },
                        e.result.then(null,
                        function() {
                            i()
                        })
                    }]
                })
            },
            this.showAddMember = function(b, e) {
                var f = a.open({
                    windowClass: "dialog-w680",
                    templateUrl: "/app/js/service/team/dialog_team_add_member.html",
                    controller: ["$scope", "$rootScope", "$location", "bus", "$window",
                    function(a, e, g, h, i) {
                        function j() {
                            wt.data.account.get_contacts(function(a) {
                                if (b.members.length > 1) {
                                    var c = _.map(b.members, "uid");
                                    _.each(a.data,
                                    function(a) {
                                        _.includes(c, a.uid) ? k.contact_members_exist.push(a) : k.contact_members.push(a)
                                    })
                                } else k.contact_members = a.data
                            },
                            null,
                            function() {
                                k.part_loading_done = !0
                            }),
                            wt.data.team.get_full(k.team_id,
                            function(a) {
                                var b = a.data.info.link_join_code;
                                if ("" === b) k.invite_link_open = !1;
                                else {
                                    k.invite_link_open = !0,
                                    k.invite_link = i.location.origin + "/team/link/join?code=" + b;
                                    var c = [e.global.config.weixin_url(), "/member/join?join_code=", b].join("");
                                    wt.data.utils.get_qrcode(c, 6, null,
                                    function(a) {
                                        k.invite_qrcode = a
                                    })
                                }
                            })
                        }
                        d.track("team_invite", "visit");
                        var k = a.vm = {
                            part_loading_done: !1,
                            team_id: b.team_id,
                            team: b,
                            step_index: 1,
                            search_user_input: void 0,
                            contact_members: [],
                            contact_members_exist: [],
                            contact_members_selected: [],
                            contact_members_invited: [],
                            filter_contacts_input: void 0,
                            is_searching: !1,
                            search_member: [],
                            error_show_not_support_phone: !1,
                            invite_message: c.instant("team_service.invite_message"),
                            is_sending: !1,
                            invite_email_batch: [],
                            invite_email_batch_error: "",
                            invite_link_open: !1,
                            invite_link: "",
                            invite_qrcode: ""
                        };
                        j(),
                        k.js_close = function() {
                            f.close()
                        },
                        k.js_step = function(a) {
                            k.step_index = a
                        },
                        k.change_keyword = function() {
                            k.search_member = [],
                            k.error_show_not_support_phone = !1,
                            k.is_searching = !1
                        },
                        k.js_search_member = function(a) {
                            e.global.constant.regex.phone_email.test(k.search_user_input) ? (k.is_searching = !0, wt.data.user.search_accurate_user(k.search_user_input,
                            function(a) {
                                if (null == a.data) {
                                    if (e.global.constant.regex.mobile.test(k.search_user_input)) k.error_show_not_support_phone = !0;
                                    else if (e.global.constant.regex.email.test(k.search_user_input)) {
                                        var b = 1;
                                        _.find(k.contact_members_exist, {
                                            email: k.search_user_input
                                        }) && (b = 4);
                                        var c = k.search_user_input.substring(0, k.search_user_input.indexOf("@"));
                                        k.search_member = [{
                                            name: c,
                                            email: k.search_user_input,
                                            display_name: k.search_user_input,
                                            avatar: "default_avatar.png",
                                            status: b
                                        }]
                                    }
                                } else _.find(k.contact_members_exist, {
                                    uid: a.data.uid
                                }) || a.data.uid === e.global.me.uid ? a.data.status = 3 : a.data.status = 2,
                                k.search_member = [a.data]
                            })) : ($('input[name="search_user_input"]').addClass("error"), kzi.msg.warn(c.instant("team_service.warn_phone_email_valid")))
                        },
                        k.js_contact_add = function(a) {
                            var e = {};
                            if (_.isEmpty(a.uid)) {
                                var f = k.search_user_input.substring(0, k.search_user_input.indexOf("@"));
                                e = {
                                    email: a.email,
                                    phone: a.phone,
                                    name: f,
                                    display_name: f.toUpperCase(),
                                    role: 2
                                }
                            } else e = {
                                uid: a.uid,
                                email: a.email,
                                phone: a.phone,
                                name: a.name,
                                display_name: a.display_name,
                                role: 2
                            };
                            wt.data.team.invite_member(k.team_id, [e], k.invite_message, [],
                            function(f) {
                                _.isEmpty(a.uid) ? (kzi.msg.success(c.instant("team_service.invite_members_success_wait_email")), k.search_user_input = void 0, k.search_member = [], k.contact_members_invited.push(e), d.track("team_invite", "done", "邀请团队成员弹窗", "邮箱地址"), $('input[name="search_user_input"]').focus()) : (_.findIndex(k.contact_members_selected, {
                                    uid: a.uid
                                }) === -1 ? (kzi.msg.success(c.instant("team_service.invite_members_success")), k.contact_members_selected.push(a), d.track("team_invite", "done", "邀请团队成员弹窗", "联系人")) : kzi.msg.success(c.instant("team_service.invite_members_success")), k.search_member.length > 0 ? (k.search_user_input = void 0, k.search_member = [], $('input[name="search_user_input"]').focus()) : k.contact_members = _.filter(k.contact_members,
                                function(a) {
                                    return a.uid !== e.uid
                                })),
                                _.find(b.members,
                                function(b) {
                                    return ! _.isEmpty(a.uid) && b.uid === a.uid || !_.isEmpty(b.email) && b.email === a.email || !_.isEmpty(b.phone) && b.phone === a.phone
                                }) || b.members.push(a)
                            },
                            function(a) {
                                kzi.msg.error(c.instant("team_service.invite_members_fail"))
                            })
                        },
                        k.js_invite_email_batch = function() {
                            if (k.invite_email_batch_error = "", 0 === k.invite_email_batch.length) return void(k.invite_email_batch_error = c.instant("team_service.err_email_require"));
                            var a = k.invite_email_batch.split("\n"),
                            e = [];
                            _.each(a,
                            function(a) {
                                return kzi.validator.isEmail(a) ? void e.push({
                                    email: a,
                                    role: 2
                                }) : void(k.invite_email_batch_error = c.instant("team_service.err_email_valid"))
                            }),
                            "" === k.invite_email_batch_error && wt.data.team.invite_member(k.team_id, e, k.invite_message, [],
                            function(a) {
                                kzi.msg.success(c.instant("team_service.invite_members_success")),
                                d.track("team_invite", "done", "邀请团队成员弹窗", "批量邮箱地址邀请"),
                                k.invite_email_batch = "",
                                _.each(a.data,
                                function(a) {
                                    a.status !== kzi.constant.status.pending ? _.find(k.contact_members_selected, {
                                        uid: a.uid
                                    }) || k.contact_members_selected.push(a) : _.find(k.contact_members_invited, {
                                        uid: a.uid
                                    }) || k.contact_members_invited.push(a),
                                    _.find(b.members, {
                                        email: a.email
                                    }) || b.members.push(a)
                                })
                            },
                            function(a) {
                                kzi.msg.error(c.instant("team_service.invite_members_fail"))
                            },
                            function() {
                                k.is_sending = !1
                            })
                        },
                        k.js_invite_link_open = function() {
                            wt.data.team.join_link_open(k.team_id,
                            function(a) {
                                k.invite_link_open = !0,
                                k.invite_link = window.location.origin + "/team/link/join?code=" + a.data;
                                var b = [e.global.config.weixin_url(), "/member/join?join_code=", a.data].join("");
                                wt.data.utils.get_qrcode(b, 6, null,
                                function(a) {
                                    k.invite_qrcode = a
                                })
                            },
                            function() {
                                kzi.msg.error(c.instant("team_service.join_link_open_fail"))
                            })
                        },
                        k.js_invite_link_close = function() {
                            wt.data.team.join_link_close(k.team_id,
                            function() {
                                k.invite_link_open = !1
                            },
                            function() {
                                kzi.msg.error(c.instant("team_service.join_link_close_fail"))
                            })
                        }
                    }]
                });
                f.result.then(function() {
                    _.isFunction(e) && e(),
                    f = void 0
                },
                function() {
                    _.isFunction(e) && e(),
                    f = void 0
                })
            }
        }
    ])
})