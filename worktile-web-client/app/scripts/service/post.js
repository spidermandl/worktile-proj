/**
 * @ngdoc function
 * @name jtWorkApp.service:post
 * @description
 */
define(['app'], function (app) {
    'use strict';

    app.service('postsFilterData', ["config",
        function (config) {
            var a = this;
            this.sort = "",
                this.filter_type = 0,
                this.set_sort = function(a) {
                    this.sort !== a && (this.sort = a, config.localData.set("posts_sort_type", a))
                };
            var b = function() {
                a.filter_type = 0;
                var b = config.localData.get("posts_sort_type");
                b ? a.sort = b : a.sort = "last_reply_date"
            };
            this.init = b
        
            
        
    }])
    ;
})