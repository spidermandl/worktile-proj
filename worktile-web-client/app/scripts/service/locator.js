/**
 * @ngdoc function
 * @name jtWorkApp.service:locator
 * @description
 */
define(['app'], function (app) {
    'use strict';

    app.service('locator',["$rootScope", "$state", "$location",
        function(a,b,c){

            var d = null,
                e = null,
                f = this;
            f.isOpened = !1,
            f.pid = "",
            f.xtype = "",
            f.xid = "",
            f.comment_id = "",
            f.onStartOpen = function(a) {
                d = a
            },
            f.onStartClose = function(a) {
                e = a
            },
            f.open = function(a, b, c, e) {
                f.pid = a,
                    f.xtype = b,
                    f.xid = c,
                    f.comment_id = e,
                    d && d(f.isOpened),
                    f.isOpened = !0
            },
            f.openTask = function(a, b, c) {
                f.open(a, config.constant.xtype.task, b, c)
            },
            f.openFile = function(a, b, c) {
                f.open(a, config.constant.xtype.file, b, c)
            },
            f.openPost = function(a, b, c) {
                f.open(a, config.constant.xtype.post, b, c)
            },
            f.openPage = function(a, b, c) {
                f.open(a, config.constant.xtype.page, b, c)
            },
            f.openEvent = function(a, b, c) {
                f.open(a, config.constant.xtype.event, b, c)
            },
            f.openMail = function(a, b) {
                f.open("", config.constant.xtype.email, a, b)
            },
            f.openEntity = function(a, b, c) {
                switch(b.etype) {
                    case config.constant.entity_type.task:
                        f.openTask(a, b.eid, c);
                        break;
                    case config.constant.entity_type.file:
                        f.openFile(a, b.eid, c);
                        break;
                    case config.constant.entity_type.post:
                        f.openPost(a, b.eid, c);
                        break;
                    case config.constant.entity_type.page:
                        f.openPage(a, b.eid, c);
                        break;
                    case config.constant.entity_type.event:
                        f.openEvent(a, b.eid, c);
                        break;
                    case config.constant.entity_type.email:
                        f.openMail(b.eid, c)
                }
            },
            f.toProject = function(a) {
                f.close(),
                    b.go("project", {
                        pid: a
                    }, {
                        reload: !0
                    })
            },
            f.toPath = function(a) {
                f.close(),
                    c.path(a)
            },
            f.close = function() {
                f.pid = "",
                    f.xtype = "",
                    f.xid = "",
                    f.comment_id = "",
                    f.isOpened = !1,
                    e && e(),
                    a.$broadcast(kzi.constant.event_names.on_slide_hide),
                    a.global.is_scroll_comment = !0
            }
        
    }]);
})