/**
 * @ngdoc function
 * @name jtWorkApp.service:page
 * @description
 */
define(['app'], function (app) {
    'use strict';

    app.service('shimoService', ["$uibModal", "$rootScope", "ycTrack","config","api",
        function (a,b,c,config,api) {
            
            this.showAdd = function() {
                var b = a.open({
                    windowClass: "dialog-w680 dialog-h300",
                    templateUrl: "/app/js/service/other/shimo/dialog_shimo.html",
                    controller: ["$scope", "$rootScope", "$location", "globalDataContext", "$translate",
                        function(a, d, e, f, g) {
                            function h() {
                                i.part_loading_done = !1,
                                    i.parentFolders = [],
                                    i.selectFile = [],
                                    wt.data.page.get_shimos_folder(i.pid, "",
                                        function(a) {
                                            i.shimoFolderList = _.sortBy(a.data,
                                                    function(a) {
                                                        return "folder" !== a.type
                                                    }),
                                                _.each(i.shimoFolderList,
                                                    function(a) {
                                                        _.find(i.selectFile, {
                                                            guid: a.guid
                                                        }) ? a.checked = 1 : a.checked = 0
                                                    }),
                                                i.part_loading_done = !0
                                        },
                                        function(a) {
                                            10015 === a.code && (i.js_close(), window.location = config.constant.authorization.shimo.auth_url + "&state=" + i.pid)
                                        })
                            }
                            var i = a.vm = {
                                part_loading_done: !1,
                                pid: f.project.pid,
                                shimoFolderList: [],
                                parentFolders: [],
                                selectFile: []
                            };
                            h(),
                                i.js_click_item = function(a, b) {
                                    "folder" === b.type ? (i.selectFile = [], i.part_loading_done = !1, wt.data.page.get_shimos_folder(i.pid, b.guid,
                                        function(a) {
                                            i.shimoFolderList = _.sortBy(a.data,
                                                    function(a) {
                                                        return "folder" !== a.type
                                                    }),
                                                i.part_loading_done = !0;
                                            var c = _.findIndex(i.parentFolders, {
                                                guid: b.guid
                                            });
                                            c < 0 ? i.parentFolders.push(b) : i.parentFolders = i.parentFolders.slice(0, c + 1)
                                        })) : i.selectFile = [{
                                        name: b.name,
                                        guid: b.guid,
                                        type: b.type
                                    }]
                                },
                                i.js_back_top = function() {
                                    h()
                                },
                                i.js_back_folder = function(a) {
                                    i.js_click_item(null, a)
                                },
                                i.js_close = function() {
                                    b.close()
                                },
                                i.js_add_shimo = function() {
                                    wt.data.page.add_shimo_files(i.pid, i.selectFile,
                                        function(a) {
                                            c.track("add_page_shimo", "done", "添加石墨文档弹窗"),
                                                _.each(a.data,
                                                    function(a) {
                                                        d.$broadcast(config.constant.event_names.on_page_add, a)
                                                    }),
                                                config.msg.success(g.instant("shimo.add_success")),
                                                i.js_close()
                                        })
                                }
                        }
                    ]
                })
            }
        
    }])
    .service('pagesFilterData', ["config",
        function (config) {
            
            var a = this;
            this.view_type = "",
                this.sort = "",
                this.filter_type = 0,
                this.set_view_type = function(a) {
                    this.view_type = a,
                        config.localData.set("pages_view_type", a)
                },
                this.set_sort = function(a) {
                    this.sort !== a && (this.sort = a, config.localData.set("pages_sort_type", a))
                },
                this.init = function() {
                    this.filter_type = 0;
                    var b = config.localData.get("pages_view_type");
                    b ? a.view_type = b : a.view_type = "tree";
                    var c = config.localData.get("pages_sort_type");
                    c ? a.sort = c : a.sort = "default"
                }
        
        }])
    ;
})







