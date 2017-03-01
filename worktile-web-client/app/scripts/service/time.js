/**
 * @ngdoc function
 * @name jtWorkApp.service:yTrack
 * @description
 */
define(['app'], function (app) {
    'use strict';

    app.service('timingtaskService',["$uibModal",
        function(a){

            this.showAddEdit = function(b, c, d) {
                var e = a.open({
                    windowClass: "dialog-w680",
                    templateUrl: "/app/js/service/timingtask/dialog_timingtask_add.html",
                    controller: ["$scope", "$rootScope", "$location",
                        function(a, f, g) {
                            function h() {}
                            var i = a.vm = {
                                timingtask: b,
                                task: c,
                                entries: d
                            };
                            h(),
                                i.js_close = function() {
                                    e.close()
                                },
                                e.result.then(null,
                                    function() {})
                        }
                    ]
                })
            }
        
        
    }]);
})