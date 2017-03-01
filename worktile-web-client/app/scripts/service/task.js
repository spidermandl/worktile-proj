/**
 * @ngdoc function
 * @name jtWorkApp.service:yTrack
 * @description
 */
define(['app'], function (app) {
    'use strict';

    app.service('taskService',["$uibModal", "globalDataContext", "$state", "$popbox", 
            "$translate", "ycTrack",'config',
        function(a, b, c, d, e, f,config){

            this.showAdd = function(g, h, i) {
                return a.open({
                    windowClass: "dialog-w680",
                    templateUrl: config.templateUrls.task_dialog_create,//"/app/js/service/entity/dialog_task_create.html",
                    controller: ["$scope", "$uibModalInstance", "$rootScope",
                        function(a, j, k) {
                            function l() {
                                a.projects = b.getPacketProjects();
                                var d = a.projects[0];
                                c.params.pid && "project_not_found" !== c.current.name && (d = _.find(a.projects, {
                                        pid: c.params.pid
                                    })),
                                    m.new_task.team_id = d.team_id,
                                    m.new_task.pid = d.pid,
                                    m.new_task.permission = d.permission,
                                    n(),
                                    h && (m.new_task.expire_date = moment(moment().format("YYYY-MM-DD") + " 23:59").valueOf()),
                                    i && m.new_task.members.push(k.global.me)
                            }
                            f.track("add_task", "visit");
                            var m = a.vm = {
                                    show_date: h === !0,
                                    follow_self: i === !0,
                                    new_task: {
                                        members: [],
                                        expire_date: 0,
                                        is_locked: 0
                                    }
                                },
                                n = function() {
                                    return m.new_task.pid ? 
                                        void wt.data.entry.get_list(m.new_task.pid, !0,
                                        function(a) {
                                            m.entries = a.data.entries,
                                                _.isEmpty(m.entries) || (m.new_task.entry_id = m.entries[0].entry_id)
                                        },
                                        null, null, "entity-task-set_entries") : void(m.entries = [])
                                };
                            m.js_toggle_member = function(a, b, c) {
                                    b.assigned ? (b.assigned = !1, c.members = _.reject(c.members, {
                                        uid: b.uid
                                    })) : (b.assigned = !0, c.members.push(b))
                                },
                                m.change_task_project = function() {
                                    m.new_task.entry_id = "",
                                        m.new_task.members = [],
                                        n()
                                },
                                m.create_task = function(a) {
                                    if(!a.$valid) return a.doValidate();
                                    if(!m.saving) {
                                        m.saving = !0;
                                        var d = kzi.helper.split_line(m.new_task.name),
                                            h = _.map(m.new_task.members, "uid");
                                        wt.data.task.batch_add(m.new_task.pid, m.new_task.entry_id, "bottom", d, h, [], m.new_task.expire_date, m.new_task.is_locked,
                                            function(a) {
                                                f.track("add_task", "done", "添加任务弹窗"),
                                                    b.cache.task.batch_add(a.data);
                                                var d = a.data[a.data.length - 1];
                                                j.close(),
                                                    k.$broadcast(kzi.constant.event_names.on_task_add, {
                                                        task: a.data[0]
                                                    }),
                                                    g && c.go("project.task.detail", {
                                                        pid: d.pid,
                                                        tid: d.tid
                                                    })
                                            },
                                            function(a) {
                                                7045 === a.code && kzi.msg.error(e.instant("task.name_too_large"))
                                            },
                                            function() {
                                                m.saving = !1
                                            })
                                    }
                                },
                                m.close = function() {
                                    j.close()
                                },
                                m.js_show_datepicker = function(a, b) {
                                    d.popbox({
                                        target: a,
                                        templateUrl: "/ycjs/directive/datepicker/pop_task_datepicker.html",
                                        controller: ["$scope", "popbox",
                                            function(a, c) {
                                                a.popbox = c,
                                                    b.expire_date ? b.expire_date_temp = moment(b.expire_date).format("YYYY-MM-DD HH:mm") : b.expire_date_temp = moment().format("YYYY-MM-DD") + " 23:59",
                                                    a.task = b,
                                                    a.js_close = function() {
                                                        c.close()
                                                    },
                                                    a.js_today = function() {
                                                        var b = moment().format("YYYY-MM-DD");
                                                        a.set_expire(b)
                                                    },
                                                    a.js_tomorrow = function() {
                                                        var b = moment().add(1, "days").format("YYYY-MM-DD");
                                                        a.set_expire(b)
                                                    },
                                                    a.js_week = function() {
                                                        var b = moment().endOf("week").format("YYYY-MM-DD");
                                                        a.set_expire(b)
                                                    },
                                                    a.js_next_week = function() {
                                                        var b = moment().add(7, "days").endOf("week").format("YYYY-MM-DD");
                                                        a.set_expire(b)
                                                    },
                                                    a.js_month = function() {
                                                        var b = moment().endOf("month").format("YYYY-MM-DD");
                                                        a.set_expire(b)
                                                    },
                                                    a.js_set_expire = function(d) {
                                                        var e = c.modalEl.find(".datepicker-timer");
                                                        if("23:59" === moment(b.expire_date).format("HH:mm") && e.find("select").length > 0) {
                                                            var f = e.find("select.hour"),
                                                                g = e.find("select.minute");
                                                            d = moment(d).format("YYYY-MM-DD") + " " + f.find('option[value="' + f.val() + '"]').attr("label") + ":" + g.find('option[value="' + g.val() + '"]').attr("label")
                                                        } else d = moment(d).format("YYYY-MM-DD") + " 23:59";
                                                        a.set_expire(d)
                                                    },
                                                    a.js_cancel_expire = function() {
                                                        task.expire_date = 0,
                                                            task.badges.expire_date = 0,
                                                            c.close()
                                                    },
                                                    a.set_expire = function(a) {
                                                        "00:00" === moment(a).format("HH:mm") ? m.new_task.expire_date = moment(a).endOf("day").valueOf() : m.new_task.expire_date = moment(a).valueOf(),
                                                            c.close()
                                                    }
                                            }
                                        ]
                                    }).open()
                                },
                                m.js_toggle_lock = function(a) {
                                    a.is_locked = 0 === a.is_locked ? 1 : 0
                                },
                                l()
                        }
                    ]
                })
            }
        
    }]);
})