/**
 * @ngdoc function
 * @name jtWorkApp.service:event
 * @description
 */
define(['app'], function (app) {
    'use strict';

    app.service('eventService',["$uibModal", "globalDataContext", "$state", "$translate", "ycTrack",'config',
        function(a, b, c, d, e,config){

            this.showAdd = function(f) {
                a.open({
                    windowClass: "dialog-w680",
                    templateUrl: "/app/js/service/entity/dialog_event_create.html",
                    controller: ["$rootScope", "$scope", "$uibModalInstance",
                        function(a, g, h) {
                            var i = g.vm = {
                                saving: !1,
                                new_event: {
                                    attendees: [_.clone(a.global.me)]
                                }
                            };
                            g.projects = b.getPacketProjects(),
                                g.repeat_intervals = config.constant.event_repeat_intervals,
                                _.each(g.repeat_intervals,
                                    function(a) {
                                        a.desc = d.instant(a.desc)
                                    }),
                                i.new_event.repeat_interval = g.repeat_intervals[0];
                            var j = g.projects[0];
                            c.params.pid && (j = _.find(g.projects, {
                                    pid: c.params.pid
                                })),
                                i.new_event.team_id = j.team_id,
                                i.new_event.pid = j.pid,
                                i.new_event.permission = j.permission,
                                i.change_event_project = function() {
                                    i.new_event.attendees = [_.clone(a.global.me)]
                                },
                                i.js_toggle_member = function(a, b, c) {
                                    b.setting_toggle_member !== !0 && (b.setting_toggle_member = !0, wt.bus.member.set_event_attendees_toggle(i.new_event.pid, i.new_event, b,
                                        function() {},
                                        null,
                                        function() {
                                            b.setting_toggle_member = !1
                                        }))
                                },
                                i.js_remove_attendee = function(a, b) {
                                    i.new_event.attendees = _.reject(i.new_event.attendees,
                                        function(a) {
                                            return a.uid === b.uid
                                        })
                                },
                                i.js_attendee_all = function(a, b, c, d) {
                                    wt.bus.member.event_attend_all(i.new_event.pid, i.new_event, b, null, null, d)
                                },
                                i.submit_create_event = function(b) {
                                    i.saving = !0;
                                    var g = _.map(i.new_event.attendees, "uid");
                                    wt.data.event.add(i.new_event.pid, i.new_event.name, i.new_event.location, g, i.new_event.start_date, i.new_event.start_time, i.new_event.end_date, i.new_event.end_time, i.new_event.repeat_interval.key,
                                        function(b) {
                                            e.track("add_event", "done", "新建日程弹窗"),
                                                i.close(),
                                                a.$broadcast(config.constant.event_names.on_event_add, b.data),
                                                f && c.go("project.event.detail", {
                                                    pid: i.new_event.pid,
                                                    event_id: b.data[0].event_id
                                                }, {
                                                    reload: !0
                                                })
                                        },
                                        function(a) {
                                            13012 === a.code && config.msg.error(d.instant("event.name_too_large"))
                                        },
                                        function() {
                                            i.saving = !1
                                        })
                                },
                                i.close = function() {
                                    h.close()
                                }
                        }
                    ]
                })
            }
        

    }]);
})