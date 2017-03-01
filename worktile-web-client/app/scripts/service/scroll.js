/**
 * @ngdoc function
 * @name jtWorkApp.service:wtScrollService
 * @description
 * 登录前相关api service
 * Controller of the jtWorkApp
 */
define(['app'], function (app) {
    'use strict';

    app.service('wtScrollService',function(){
    	
			this.scrollTo = function(a, b) {
				if(angular.isElement(a)) {
					var c = a.jquery ? a : $(a),
						d = c.offset(),
						e = c.data("wtScroll"),
						f = typeof b;
					switch(f) {
						case "object":
							if(b.jquery || angular.isElement(b)) {
								var g = b.jquery ? b : $(b);
								"y" === e.dir ? c.scrollTop(c.scrollTop() + g.offset().top - d.top) : c.scrollLeft(c.scrollLeft() + g.offset().left - d.left)
							}
							_.isNumber(b.x) && c.scrollLeft(c.scrollLeft() + b.x - d.left),
								_.isNumber(b.y) && c.scrollTop(c.scrollTop() + b.y - d.top);
							break;
						case "string":
							if("top" === b) {
								c.scrollTop(0);
								break
							}
							if("bottom" === b) {
								c.scrollTop(999999);
								break
							}
							if("left" === b) {
								c.scrollLeft(0);
								break
							}
							if("right" === b) {
								c.scrollLeft(999999);
								break
							}
							if(0 === b.indexOf("+=")) {
								"y" === e.dir ? c.scrollTop(c.scrollTop() + parseInt(b.substr(2, b.length), 10)) : c.scrollLeft(c.scrollLeft() + parseInt(b.substr(2, b.length), 10));
								break
							}
							if(0 === b.indexOf("-=")) {
								"y" === e.dir ? c.scrollTop(c.scrollTop() - parseInt(b.substr(2, b.length), 10)) : c.scrollLeft(c.scrollLeft() - parseInt(b.substr(2, b.length), 10));
								break
							}
							$(b).length && ("y" === e.dir ? c.scrollTop(c.scrollTop() + $(b).offset().top - d.top) : c.scrollLeft(c.scrollLeft() + $(b).offset().left - d.left))
					}
				}
			}
		
    })
})