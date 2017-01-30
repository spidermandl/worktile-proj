/**
* ui bootstrap popbox 插件
*/
define(['app'],
function(app) {
    "use strict";
    app.provider("$popbox", [function() {
        var a = {
            placement: "top",
            align: null,
            animation: !0,
            popupDelay: 0,
            arrow: !1,
            popboxClass: "popbox",
            transitionClass: "fade",
            triggerClass: "in",
            popboxOpenClass: "popbox-open",
            resolve: {},
            backdropFade: !1,
            popboxFade: !1,
            keyboard: !0,
            backdropClick: !0,
            autoAdapt: !1
        },
        b = {},
        c = 2,
        d = 0;
        this.options = function(a) {
            b = a;
        },
        this.$get = ["$http", "$document", "$compile", "$rootScope", "$controller", "$templateCache", "$q", "$injector", "$uibPosition", "$timeout",
        function(e, f, g, h, i, j, k, l, m, n) {
            function o(a) {
                var b = angular.element("<div>");
                return b.addClass(a),
                	b;
            }

            function p(c) {
                var d = this,
                e = this.options = angular.extend({},
                a, b, c);
                this._open = !1,
                this._target = $(d.options.target.target),
                $(this._target).hasClass("js-popbox") || $(this._target).parents(".js-popbox").length > 0 && (this._target = $(this._target).parents(".js-popbox").eq(0)),
                this.modalEl = o(e.popboxClass),
                e.popboxFade && (this.modalEl.addClass(e.transitionClass), this.modalEl.removeClass(e.triggerClass)),
                this.handledEscapeKey = function(a) {
                    if (27 === a.which) {
                        var b = d.modalEl.find(".ui-select-dropdown:visible");
                        if (b.length > 0) return b.scope().$select.open = !1,
                        void d.$scope.$apply();
                        d.close(),
                        a.preventDefault(),
                        a.stopPropagation(),
                        d.$scope.$apply();
                    }
                },
                this.handledSortable = function(a) {
                    d.close(),
                    d.$scope.$apply();
                },
                this.handleBackDropClick = function(b) {
                    for (var c = b.target,
                    e = !0; c;) {
                        if ($(c).hasClass("popbox") || $(c).hasClass("popbox-step-li") || $(c).hasClass("openpop") || $(c).hasClass("ui-select-container") || 0 != $(c).parents(".ui-select-container").length) {
                            e = !1;
                            break;
                        }
                        c = c.parentNode;
                    }
                    0 === $(b.target).parents("body").length && (e = !1),
                    e && q.hasClass(a.popboxOpenClass) && (d.close(), b.preventDefault(), d.$scope.$apply())
                },
                this.handleLocationChange = function() {
                    d.close()
                }
            }
            var q = f.find("body");
            return p.prototype.isOpen = function() {
                return this._open
            },
            p.prototype.open = function(b, e) {
                var f = this,
                j = this.options,
                l = f.options.popboxClass,
                o = $("." + l.replace(" ", "."));
                if (q.hasClass(a.popboxOpenClass) && o.length > 0) {
                    if (this._target[0] === o.scope().popbox._target[0]) return void o.each(function() {
                        0 === $(this).parents("body").length ? $(".popbox").remove() : $(this).scope().popbox.close()
                    });
                    $(".popbox").each(function() {
                        $(this).scope().popbox.close()
                    })
                }
                if (b && (j.templateUrl = b), e && (j.controller = e), !j.template && !j.templateUrl) throw new Error("Popbox.open expected template or templateUrl, neither found. Use options or open method to specify them.");
                return this._loadResolves().then(function(a) {
                    var b = a.$scope = f.$scope = a.$scope ? a.$scope: h.$new();
                    if (f.modalEl.html(a.$template), f.options.controller) {
                        var e = i(f.options.controller, a);
                        f.modalEl.children().data("ngControllerController", e)
                    }
                    f._addElementsToDom(),
                    g(f.modalEl)(b),
                    n(function() {
                        f.options.popboxFade && f.modalEl.addClass(f.options.triggerClass)
                    });
                    var
                    // j = kzi.util.docWidth(),
                    // k = kzi.util.docHeight(),
                    // l = kzi.util.docOuterWidth(),
                    // o = (kzi.util.docOuterHeight(), null),
                    j = window.jQuery(document).width(),
                    k = window.jQuery(document).height(),
                    l = window.jQuery(document).outerWidth(),
                    o = (window.jQuery(document).outerHeight(), null),
                    p = function() {
                        var a, b = {};
                        a = m.position(f._target),
                        a.top = f.options.top || $(f._target).offset().top,
                        a.left = f.options.left || $(f._target).offset().left,
                        f.modalEl.css({
                            display: "block"
                        });
                        var e = $(f.modalEl).outerWidth(!0),
                        g = $(f.modalEl).outerHeight(!0);
                        f.options.top && (a.height = 0),
                        f.options.left && (a.width = 0);
                        var h = $(f._target).data("placement");
                        h || (h = f.options.placement);
                        var i = $(f._target).data("align");
                        i || (i = f.options.align);
                        var n = $(f._target).data("offset");
                        n = null == n ? c: parseInt(n, 10);
                        var p = {
                            set_box_placement_auto_lf: function() {
                                null !== h && "auto" !== h || (h = a.left < j / 2 ? "right": "left")
                            },
                            set_box_align_auto_tb: function() {
                                "auto" === i && (i = a.top < k / 2 ? "top": "bottom")
                            },
                            set_top_position: function() {
                                "top" === i ? b.top = ~~a.top: "bottom" === i ? b.bottom = k - a.top - a.height: a.top > k / 2 ? b.bottom = ~~ (k - a.top - a.height / 2 - g / 2) : b.top = ~~ (a.top + a.height / 2 - g / 2),
                                void 0 !== b.top && null !== b.top && (b.top + g > k ? b.top = k - g - c: b.top < d && (b.top = d + c)),
                                void 0 !== b.bottom && null !== b.bottom && (b.bottom < 0 ? b.bottom = c: b.bottom + g + d > k && (b.bottom = k - g - d))
                            },
                            set_left_position: function() {
                                "right" === i ? b.right = j - a.left - a.width: "left" === i ? b.left = a.left: b.left = a.left + a.width / 2 - e / 2,
                                void 0 !== b.left && null !== b.left && (b.left <= 0 ? b.left = c: b.left + e > j && (b.left = "auto", b.right = c)),
                                void 0 !== b.right && null !== b.right && (b.right < 0 ? b.right = c: b.right + e > j && (b.right = "auto", b.left = c))
                            }
                        };
                        switch (p.set_box_placement_auto_lf(), h) {
                        case "right":
                            p.set_top_position(),
                            b.left = ~~ (a.left + a.width + c),
                            b.left + e > l && (b.left = "auto", b.right = ~~ (l - a.left + c));
                            break;
                        case "left":
                            p.set_top_position(),
                            b.right = ~~ (j - a.left + c),
                            b.right + e > l && (b.right = "auto", b.left = ~~ (a.left + a.width + c));
                            break;
                        case "top":
                            p.set_left_position(),
                            b.bottom = ~~ (k - a.top + c),
                            b.bottom + g > k - d && (b.bottom = void 0, b.top = ~~ (a.top + a.height + c), b.top + g > k - d && (b.bottom = c, b.top = void 0)),
                            void 0 === b.bottom && b.top + g > k && (b.top = a.top - ~~ (g / 2), b.top < d && (b.top = d));
                            break;
                        case "bottom":
                            p.set_left_position(),
                            b.top = ~~ (a.top + a.height + n),
                            b.top + g > k && (b.top = void 0, b.bottom = ~~ (k - a.top + c), b.bottom + g > k - d && (b.top = ~~ (k - d - g), b.bottom = void 0));
                            break;
                        default:
                            b = {
                                top: ~~ (a.top + a.height) + 2 + "px",
                                left: ~~ (a.left - a.width / 2) + "px"
                            },
                            f.options.placement = "bottom"
                        }
                        o = b,
                        b = angular.extend({
                            left: "auto",
                            right: "auto"
                        },
                        b),
                        f.modalEl.css(b),
                        q.addClass(f.options.popboxOpenClass)
                    },
                    r = $(f._target).data("auto-adapt");
                    r ? f.$watcher = b.$watch(function() {
                        return $(f.modalEl).outerWidth(!0) + "," + $(f.modalEl).outerHeight(!0)
                    },
                    function() {
                        n(function() {
                            p()
                        },
                        100)
                    }) : n(function() {
                        p()
                    },
                    100),
                    f._bindEvents()
                }),
                this.deferred = k.defer(),
                this.deferred.promise
            },
            p.prototype.close = function(a, b) {
                var c = this;
                this._getFadingElements();
                jQuery.isFunction(c.$watcher) && c.$watcher(),
                q.removeClass(c.options.popboxOpenClass),
                this._onCloseComplete(a, b)
            },
            p.prototype._getFadingElements = function() {
                var a = [];
                return this.options.popboxFade && a.push(this.modalEl),
                a
            },
            p.prototype._bindEvents = function() {
                this.options.keyboard && q.bind("keydown.popbox", this.handledEscapeKey),
                this.options.backdropClick && (q.bind("mousedown.popbox", this.handleBackDropClick), q.bind("sortstart.popbox", this.handledSortable)),
                this.modalEl.bind("click.popbox mousedown.popbox",
                function(a) {
                    a.target.href && "javascript:;" !== a.target.href || a.stopPropagation()
                }),
                this.$scope.$on("$locationChangeSuccess", this.handleLocationChange)
            },
            p.prototype._unbindEvents = function() {
                this.options.keyboard && q.unbind("keydown.popbox", this.handledEscapeKey),
                this.options.backdropClick && q.unbind("mousedown.popbox", this.handleBackDropClick),
                q.unbind("sortstart.popbox", this.handledSortable)
            },
            p.prototype._onCloseComplete = function(a, b) {
                this._removeElementsFromDom(),
                b || (this._unbindEvents(), null != this.$scope && this.$scope.$broadcast("$destroy")),
                this.deferred.resolve(a),
                angular.isFunction(this.options.onCloseComplete) && this.options.onCloseComplete()
            },
            p.prototype._addElementsToDom = function() {
                $(this._target).addClass("openpop"),
                q.append(this.modalEl),
                this._open = !0
            },
            p.prototype._removeElementsFromDom = function() {
                this._target.removeClass("openpop"),
                this.modalEl.remove(),
                this._open = !1
            },
            p.prototype._loadResolves = function() {
                var a, b = [],
                c = [],
                d = this;
                return this.options.template ? a = k.when(this.options.template) : this.options.templateUrl && (a = e.get(this.options.templateUrl, {
                    cache: j
                }).then(function(a) {
                    return a.data
                })),
                angular.forEach(this.options.resolve || [],
                function(a, d) {
                    c.push(d),
                    b.push(angular.isString(a) ? l.get(a) : l.invoke(a))
                }),
                c.push("$template"),
                b.push(a),
                k.all(b).then(function(a) {
                    var b = {};
                    return angular.forEach(a,
                    function(a, d) {
                        b[c[d]] = a
                    }),
                    b.popbox = d,
                    d.options.$scope && (b.$scope = d.options.$scope),
                    b
                })
            },
            {
                popbox: function(a) {
                    return new p(a)
                }
            }
        }]
    }]);
});