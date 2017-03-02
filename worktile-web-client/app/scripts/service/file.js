/**
 * @ngdoc function
 * @name jtWorkApp.service:file
 * @description
 */
define(['app'], function (app) {
    'use strict';

    app.service('fileService',["$uibModal", "globalDataContext", "$state", "$timeout", "$filter", 
                    "$translate", "ycTrack",'config',
        function(a, b, c, d, e, f, g,config){

            this.showAdd = function() {
                a.open({
                    windowClass: "dialog-w680",
                    templateUrl: config.templateUrls.file_dialog_create,
                    controller: ["$rootScope", "$scope", "$uibModalInstance", "$UploadFile",
                        function(a, h, i, j) {
                            var k = h.vm = {
                                new_file: {
                                    pid: "",
                                    folder_id: ""
                                }
                            };
                            h.projects = b.getPacketProjects(),
                                c.params.pid ? k.new_file.pid = c.params.pid : k.new_file.pid = h.projects[0].pid,
                                c.params.folder_id && (k.new_file.folder_id = c.params.folder_id),
                                k.file_select = function(a) {
                                    if(!(a.length <= 0))
                                        if(k.new_file.original = a[0], k.new_file.original.type.indexOf("image") >= 0) {
                                            var b = new FileReader;
                                            b.onload = function(a) {
                                                    d(function() {
                                                        k.new_file.src = a.target.result
                                                    })
                                                },
                                                b.readAsDataURL(k.new_file.original)
                                        } else {
                                            var c = k.new_file.original.name,
                                                f = c.substr(c.lastIndexOf(".") + 1);
                                            k.new_file.src = e("fileThumbSrcByExt")(f)
                                        }
                                },
                                k.js_upload_file = function() {
                                    if(k.new_file.original) {
                                        if(!k.new_file.pid) return void config.msg.info(f.instant("dialog_file_create.err_project_require"));
                                        k.saving = !0,
                                            j.addFiles(k.new_file.pid, [{
                                                    original: k.new_file.original,
                                                    data: {
                                                        target: "prj",
                                                        type: "project",
                                                        pid: k.new_file.pid,
                                                        folder_id: k.new_file.folder_id
                                                    }
                                                }],
                                                function(b, d) {
                                                    g.track("add_file", "done"),
                                                        k.close(),
                                                        d && d.file && d.file.fid && ("" === k.new_file.folder_id ? c.go("project.file.detail", {
                                                            pid: k.new_file.pid,
                                                            fid: d.file.fid
                                                        }) : c.go("project.folder.fileDetail", {
                                                            pid: k.new_file.pid,
                                                            folder_id: k.new_file.folder_id,
                                                            fid: d.file.fid
                                                        })),
                                                        a.$broadcast(config.constant.event_names.on_uploadfile_add, d)
                                                })
                                    }
                                },
                                k.close = function() {
                                    i.close()
                                }
                        }
                    ]
                })
            }
        

    }]);
})