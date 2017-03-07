/**
 * @ngdoc function
 * @name jtWorkApp.service:page
 * @description
 */
define(['app'], function (app) {
    'use strict';

    app.service('linkentityService', ["$popbox", "$location", "$uibModal", "ycTrack", "globalDataContext", 
                    "isFolderFilter", "$timeout", "wtScrollService","config","api",
        function (a, b, c, d, e, f, g, h,config,api) {

            this.showSearch = function(a, i, j) {
                return c.open({
                    windowClass: "dialog-w800",
                    templateUrl: "/app/js/service/entity/dialog_linkentity.html",
                    controller: ["$scope", "$uibModalInstance", "$rootScope",
                        function(a, c, k) {
                            function l() {
                                m.teams = _.map(e.teams,
                                        function(a) {
                                            var b = _.clone(a);
                                            return b.show_projects = _.clone(a.projects),
                                                b
                                        }),
                                    null == m.selected_pid ? m.selected_pid = m.teams[0].show_projects[0].pid : g(function() {
                                        h.scrollTo($(".dialog-linkentity-prjs").eq(0), ".dialog-linkentity-prj_" + m.selected_pid)
                                    }),
                                    o()
                            }
                            d.track("add_linkentity", "visit");
                            var m = a.vm = {
                                teams: [],
                                types: ["task", "file", "event", "page", "post"],
                                filter_keyword: "",
                                has_search: !1,
                                selected_pid: i,
                                selected_type: "task",
                                selected_xids: [],
                                part_loading_done: !1,
                                file_since_id: 0,
                                post_since_id: 0,
                                part_loading_more_done: !0,
                                part_has_more: !1,
                                selected_folder_id: "",
                                files_page: 1,
                                files_folders_breadcrumb: [],
                                events_by_month: moment().format("YYYY-MM"),
                                result: []
                            };
                            m.close = function() {
                                c.close()
                            };
                            var n = void 0;
                            m.js_search_linkentity = function(a, b) {
                                    if("" !== b && null != b) {
                                        m.part_loading_done = !1,
                                            m.selected_pid = "",
                                            m.has_search = !0,
                                            m.selected_xids = [],
                                            m.result = [];
                                        var c = _.filter(e.projects,
                                            function(a) {
                                                return a.name.toLowerCase().indexOf(b.toLowerCase()) > -1
                                            });
                                        c.length > 0 ? (m.project_result = [], _.each(c,
                                                function(a) {
                                                    m.project_result.push({
                                                        __type: "project",
                                                        pid: a.pid,
                                                        name: a.name
                                                    })
                                                })) : m.project_result = [],
                                            void 0 !== n && n.canceler.resolve(),
                                            n = wt.data.search.lname(b),
                                            n.promise.then(function(a) {
                                                m.part_loading_done = !0,
                                                    m.project_result.length > 0 ? m.result = m.project_result.concat(a.data.data) : m.result = a.data.data,
                                                    m.result.length > m.maxlength && (m.result = m.result.slice(0, m.maxlength))
                                            })
                                    }
                                },
                                m.js_event_prev = function(a) {
                                    m.events_by_month = moment(a, "YYYY-MM").add(-1, "months").format("YYYY-MM"),
                                        o(!1)
                                },
                                m.js_event_next = function(a) {
                                    m.events_by_month = moment(a, "YYYY-MM").add(1, "months").format("YYYY-MM"),
                                        o(!1)
                                },
                                m.js_add_selected = function(a) {
                                    var b = m.has_search ? a.__type : m.selected_type;
                                    switch(a.selected = !a.selected, b) {
                                        case "project":
                                            a.selected ? m.selected_xids.push({
                                                type: "project",
                                                pid: a.pid,
                                                name: a.name,
                                                xid: a.pid
                                            }) : m.selected_xids = _.reject(m.selected_xids,
                                                function(b) {
                                                    return b.xid == a.pid
                                                });
                                            break;
                                        case "task":
                                            a.selected ? m.selected_xids.push({
                                                type: "task",
                                                pid: a.pid,
                                                name: a.name,
                                                xid: a.tid
                                            }) : m.selected_xids = _.reject(m.selected_xids,
                                                function(b) {
                                                    return b.xid == a.tid
                                                });
                                            break;
                                        case "file":
                                            if(m.has_search === !1 && f(a.type)) return a.selected = !a.selected,
                                                m.selected_folder_id = a.fid,
                                                void o(!1);
                                            a.selected ? m.selected_xids.push({
                                                type: "file",
                                                pid: a.pid,
                                                name: a.name,
                                                xid: a.fid
                                            }) : m.selected_xids = _.reject(m.selected_xids,
                                                function(b) {
                                                    return b.xid == a.fid
                                                });
                                            break;
                                        case "event":
                                            a.selected ? m.has_search === !0 ? m.selected_xids.push({
                                                type: "event",
                                                pid: a.pid,
                                                name: a.name,
                                                xid: a.event_id
                                            }) : m.selected_xids.push({
                                                type: "event",
                                                pid: a.extend.pid,
                                                name: a.title,
                                                xid: a.id
                                            }) : m.selected_xids = _.reject(m.selected_xids,
                                                function(b) {
                                                    return b.xid == a.id
                                                });
                                            break;
                                        case "page":
                                            a.selected ? m.selected_xids.push({
                                                type: "page",
                                                pid: a.pid,
                                                name: a.name,
                                                xid: a.page_id
                                            }) : m.selected_xids = _.reject(m.selected_xids,
                                                function(b) {
                                                    return b.xid == a.page_id
                                                });
                                            break;
                                        case "post":
                                            a.selected ? m.selected_xids.push({
                                                type: "post",
                                                pid: a.pid,
                                                name: a.name,
                                                xid: a.post_id
                                            }) : m.selected_xids = _.reject(m.selected_xids,
                                                function(b) {
                                                    return b.xid == a.post_id
                                                })
                                    }
                                },
                                m.js_change_pid = function(a) {
                                    m.has_search = !1,
                                        m.filter_keyword = "",
                                        m.part_loading_done = !1,
                                        m.selected_pid = a.pid,
                                        m.selected_xids = [],
                                        o(!1)
                                },
                                m.js_change_type = function(a) {
                                    m.filter_keyword = "",
                                        m.selected_type = a,
                                        m.selected_xids = [],
                                        m.events_by_month = moment().format("YYYY-MM"),
                                        m.selected_folder_id = "",
                                        m.files_page = 1,
                                        m.files_folders_breadcrumb = [],
                                        o(!1)
                                },
                                m.js_go_folder = function(a) {
                                    m.selected_folder_id = a,
                                        o(!1)
                                },
                                m.js_load_more = function() {
                                    switch(m.selected_type) {
                                        case "file":
                                            break;
                                        case "post":
                                            o(!0)
                                    }
                                };
                            var o = function(a) {
                                switch(a || (m.result = [], m.part_loading_done = !1), m.selected_type) {
                                    case "task":
                                        e.loadEntriesAndTasks(m.selected_pid,
                                            function(a) {
                                                m.part_loading_done = !0,
                                                    0 !== a.tasks.length && (_.each(a.entries,
                                                        function(b) {
                                                            b.tasks = _.where(a.tasks, {
                                                                entry_id: b.entry_id
                                                            })
                                                        }), m.result = a.entries)
                                            });
                                        break;
                                    case "file":
                                        a ? m.part_loading_more_done = !1 : m.file_since_id = 0,
                                            wt.data.file.get_list(m.selected_pid, m.selected_folder_id, m.files_page, 0, 0,
                                                function(a) {
                                                    m.files_folders_breadcrumb = a.data.folders,
                                                        _.each(a.data.files,
                                                            function(a) {
                                                                a.icon = kzi.helper.build_file_icon(a)
                                                            }),
                                                        m.part_has_more = !1,
                                                        a.data.files.length >= kzi.config.default_count && (m.has_more = !0),
                                                        _.isEmpty(m.files) ? m.result = a.data.files : m.result = m.files.concat(a.data.files),
                                                        m.part_loading_done = !0
                                                });
                                        break;
                                    case "event":
                                        var b = moment(m.events_by_month, "YYYY-MM").valueOf(),
                                            c = moment(m.events_by_month, "YYYY-MM").endOf("month").valueOf();
                                        e.loadCalEvents(m.selected_pid, b, c,
                                            function(a) {
                                                m.part_loading_done = !0,
                                                    a.length > 0 && (a = _.sortBy(a, "start")),
                                                    m.result = a
                                            });
                                        break;
                                    case "page":
                                        wt.data.page.get_all(m.selected_pid,
                                            function(a) {
                                                m.part_loading_done = !0,
                                                    m.result = a.data
                                            });
                                        break;
                                    case "post":
                                        a ? m.part_loading_more_done = !1 : m.post_since_id = 0,
                                            wt.data.post.get_list(m.selected_pid, m.post_since_id, kzi.config.default_count, "last_reply_date", 1, 0,
                                                function(b) {
                                                    m.part_loading_done = !0,
                                                        a && (m.part_loading_more_done = !0),
                                                        b.data.length > 0 && (m.post_since_id = b.data[b.data.length - 1].last_reply_date, a ? m.result = m.result.concat(b.data) : m.result = b.data),
                                                        b.data.length === kzi.config.default_count ? m.part_has_more = !0 : m.part_has_more = !1
                                                })
                                }
                            };
                            m.js_insert_linkentity = function() {
                                    var a = b.protocol() + "://" + b.host() + (80 === b.port() || 443 === b.port() ? "" : ":" + b.port()),
                                        c = [];
                                    _.each(m.selected_xids,
                                            function(b) {
                                                var d = "";
                                                switch(b.type) {
                                                    case "project":
                                                        d = a + "/project/" + b.pid;
                                                        break;
                                                    case "task":
                                                        d = a + "/project/" + b.pid + "/task/" + b.xid;
                                                        break;
                                                    case "file":
                                                        d = a + "/project/" + b.pid + "/file/" + b.xid;
                                                        break;
                                                    case "folder":
                                                        d = a + "/project/" + b.pid + "/folder/" + b.xid;
                                                        break;
                                                    case "page":
                                                        var e = _.find(m.result, {
                                                            page_id: b.xid
                                                        });
                                                        d = e.join_type == kzi.constant.page_extend.shimo ? a + "/project/" + b.pid + "/page_shimo/" + b.xid : a + "/project/" + b.pid + "/page/" + b.xid;
                                                        break;
                                                    case "event":
                                                        d = a + "/project/" + b.pid + "/event/" + b.xid;
                                                        break;
                                                    case "post":
                                                        d = a + "/project/" + b.pid + "/post/" + b.xid
                                                }
                                                c.push(" [" + b.name + "](" + d + ") ")
                                            }),
                                        j(c.join("\n")),
                                        m.close()
                                },
                                l()
                        }
                    ]
                })
            };
            var i = ["^", "(http|https)://", "(" + b.$$host + "|localhost|127.0.0.1|worktile.com|.*.worktile.com)", "(:[0-9]{0,4}|)"].join(""),
                j = i + "/project/([0-9a-z]{32}|[0-9a-z]{14})$",
                k = i + "/project/([0-9a-z]{32}|[0-9a-z]{14})/(task|file|folder|page|page_shimo|post|event)/([0-9a-z]{32}|[0-9a-z]{14})$";
            this.regexProject = new RegExp(j),
                this.regexEntity = new RegExp(k),
                this.parseProjectLink = function(a) {
                    var b = this.regexProject.exec(a);
                    return {
                        type: "project",
                        pid: b[4]
                    }
                },
                this.parseEntityLink = function(a) {
                    var b = this.regexEntity.exec(a);
                    return {
                        type: b[5],
                        pid: b[4],
                        tid: b[6]
                    }
                }
        
        
    }])

    ;
})







