/**
 * @ngdoc function
 * @name jtWorkApp.directive:wtLeftmenu
 * @description
 * # wtLeftmenu 左侧控制栏
 * left menu directive
 */
define(['app'], function (app) {
	'use strict';

	app.directive("wtFocus", ["$timeout", "$parse", function(a, b) {
		return {
			restrict: "A",
			link: function(c, d, e, f) {
				e.wtFocus ? (c.$watch(e.wtFocus, function(b) {
					angular.isDefined(b) && b === !0 && a(function() {
						d[0].focus()
					}, 450)
				}, !0), d.bind("blur", function() {
					angular.isDefined(e.wtFocus) && a(function() {
						_.isUndefined(b(e.wtFocus).assign) || b(e.wtFocus).assign(c, !1)
					}, 200)
				})) : a(function() {
					d[0].focus()
				}, 200)
			}
		}
	}]).directive("wtClickSelect", [function() {
		return {
			restrict: "A",
			link: function(a, b, c, d) {
				b.bind("click", function() {
					b.select()
				})
			}
		}
	}]).directive("wtAutoClickSelect", ["$timeout", function(a) {
		return {
			restrict: "A",
			link: function(b, c, d, e) {
				c.bind("click", function() {
					c.select()
				}), a(function() {
					c.trigger("click")
				}, 200)
			}
		}
	}]).directive("wtShowEdit", ["$timeout", "$parse", function(a, b) {
		return {
			restrict: "A",
			link: function(c, d, e, f) {
				c.$watch(e.wtShowEdit, function(f, g) {
					if(!_.isUndefined(f))
						if(f === !0) {
							a(function() {
								$(d).find(":text,textarea").eq(0).focus()
							}, 50);
							var h = b(e.wtShowEdit);
							h.assign;
							d.bind("mousedown.wtShowEdit", function(a) {
								a.stopPropagation()
							}), a(function() {
								$(document).bind("mousedown.wtShowEdit", function(a) {
									b(e.wtShowEdit).assign(c, !1), c.$$phase || c.$apply()
								})
							}, 50)
						} else f === !1 && (d.unbind("click.wtShowEdit"), $(document).unbind("click.wtShowEdit"))
				})
			}
		}
	}]).directive("wtRepeatPassword", [function() {
		return {
			restrict: "A",
			require: "ngModel",
			link: function(a, b, c, d) {
				var e = b.inheritedData("$formController")[c.wtRepeatPassword];
				d.$parsers.push(function(a) {
					return a === e.$viewValue ? (d.$setValidity("repeat", !0), a) : void d.$setValidity("repeat", !1)
				}), e.$parsers.push(function(a) {
					return d.$setValidity("repeat", a === d.$viewValue), a
				})
			}
		}
	}]).directive("wtMultipleEmail", [function() {
		return {
			restrict: "A",
			require: "ngModel",
			link: function(a, b, c, d) {
				d.$parsers.push(function(a) {
					var b = /^([a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*;?)+$/i.test(a);
					return d.$setValidity("multipleEmail", b), a
				})
			}
		}
	}]).directive("wtRegex", [function() {
		return {
			restrict: "A",
			require: "ngModel",
			link: function(a, b, c, d) {
				var e = new RegExp(c.wtRegex);
				d.$parsers.push(function(a) {
					return d.$setValidity("regex", e.test(a)), a
				})
			}
		}
	}]).directive("wtRemoteUniqueCheck", ["$timeout", "$http", "w5cValidator", function(a, b, c) {
		return {
			require: "ngModel",
			link: function(a, d, e, f) {
				var g = d.parents("form")[0].name,
					h = function() {
						var h = a.$eval(e.wtRemoteUniqueCheck),
							i = h.url,
							j = h.isExists;
						b.get(i).success(function(b) {
							var e = j === !1 ? 1 == b.data : !(1 == b.data);
							if(f.$setValidity("w5cuniquecheck", e), a[g] && !e) {
								var h = c.getErrorMessage("w5cuniquecheck", d[0]);
								c.showError(d[0], h), a[g].$errors ? a[g].$errors.unshift(h) : a[g].$errors = [h]
							} else if(a[g] && e) {
								var h = c.getErrorMessage("w5cuniquecheck", d[0]);
								if(c.removeError(d[0]), a[g].$errors) {
									var i = function() {
										var b = a[g].$errors.indexOf(h);
										b >= 0 && (a[g].$errors.splice(b, 1), i())
									};
									i()
								}
							}
						})
					};
				f.$viewChangeListeners.push(function() {
					a[g].$errors = [], f.$setValidity("w5cuniquecheck", !0), f.$invalid && !f.$error.w5cuniquecheck || f.$dirty && h()
				});
				var i = a.$eval(e.ngModel);
				if(i) {
					if(f.$invalid && !f.$error.w5cuniquecheck) return;
					h()
				}
			}
		}
	}]).directive("wtInclude", ["$compile", "$http", "$templateCache", "$translate", function(a, b, c, d) {
		return {
			restrict: "ECA",
			compile: function(e, f) {
				var g = f.ngInclude || f.src,
					h = f.onload || "";
				f.autoscroll;
				return function(e, f) {
					var i, j = 0,
						k = function() {
							i && (i.$destroy(), i = null), f.html("")
						};
					e.$watch(g, function(g) {
						if($("#" + g).length <= 0) return void f.html(['<span class="tpl_none">', d.instant("directive_directive.unknown_template", {
							src: g
						}), "</span>"].join(""));
						var l = ++j;
						g ? b.get(g, {
							cache: c
						}).success(function(b) {
							l === j && (i && i.$destroy(), i = e.$new(), f.html(b), a(f.contents())(i), i.$emit("$includeContentLoaded"), e.$eval(h))
						}).error(function() {
							l === j && k()
						}) : k()
					})
				}
			}
		}
	}]).directive("draggable", [function() {
		return {
			restrict: "A",
			priority: -2e3,
			link: function(a, b, c) {
				a.$watch(c.draggable, function(a) {
					_.isEmpty(a) || b.draggable(a)
				})
			}
		}
	}]).directive("droppable", [function() {
		return {
			restrict: "A",
			priority: -2e3,
			link: function(a, b, c) {
				a.$watch(c.droppable, function(a, c) {
					_.isEmpty(a) || b.droppable(a)
				})
			}
		}
	}]).directive("sortable", [function() {
		return {
			priority: -2e3,
			restrict: "A",
			link: function(a, b, c) {
				a.$watch(c.sortable, function(a, c) {
					null == a ? b.sortable({
						disabled: !0
					}) : b.sortable(a)
				})
			}
		}
	}]).directive("wtLoadingDone", [function() {
		return {
			restrict: "A",
			link: function(a, b, c) {
				a.$watch(c.wtLoadingDone, function(a) {
					a === !0 ? b.css("display", "none") : b.css("display", "block")
				})
			}
		}
	}]).directive("wtTitle", [function() {
		return {
			link: function(a, b, c) {
				var d = a.$eval(c.wtTitle);
				b.attr("title", d)
			}
		}
	}]).directive("wtEnter", ["$parse", function(a) {
		return {
			restrict: "A",
			link: function(b, c, d) {
				var e = a(d.wtEnter);
				c.bind("keypress", function(a) {
					var c = a.which || a.keyCode;
					void 0 !== d.wtEnterNotShift && a.shiftKey || 13 === c && (b.$apply(function() {
						e(b, {
							$event: a
						})
					}), a.preventDefault())
				})
			}
		}
	}]).directive("wtUpDownEnter", ["$parse", function(a) {
		return {
			restrict: "A",
			link: function(b, c, d) {
				var e = a(d.wtUpDownEnter);
				c.bind("keydown", function(a) {
					var c = a.which || a.keyCode;
					38 !== c && 40 !== c || (b.$apply(function() {
						e(b, {
							$event: a,
							keyCode: c
						})
					}), a.preventDefault())
				}), c.bind("keypress", function(a) {
					var c = a.which || a.keyCode;
					13 === c && (b.$apply(function() {
						e(b, {
							$event: a,
							keyCode: c
						})
					}), a.preventDefault())
				})
			}
		}
	}]).directive("wtCtrlEnter", ["$parse", function(a) {
		return {
			restrict: "A",
			link: function(b, c, d) {
				var e = a(d.wtCtrlEnter);
				c.bind("keydown keypress", function(a) {
					var c = a.which || a.keyCode;
					(a.ctrlKey || a.metaKey) && 13 === c && (b.$apply(function() {
						e(b, {
							$event: a
						})
					}), a.preventDefault())
				})
			}
		}
	}]).directive("wtShiftCutover", ["$parse", function(a) {
		return {
			restrict: "A",
			link: function(b, c, d) {
				var e = a(d.wtShiftCutover);
				c.bind("keydown keypress", function(a) {
					var c = a.which || a.keyCode,
						d = a.target || a.srcElement;
					(null === d || "INPUT" !== d.nodeName && "TEXTAREA" !== d.nodeName) && !a.ctrlKey && !a.altKey && !a.metaKey && a.shiftKey && $.inArray(c, kzi.constant.shift_cutover_keys) > -1 && b.$apply(function() {
						e(b, {
							$event: a,
							$keyCode: c
						})
					})
				})
			}
		}
	}]).directive("wtClick", ["$parse", function(a) {
		return {
			restrict: "A",
			link: function(b, c, d) {
				var e = a(d.wtClick);
				c.bind("click", function(a) {
					b.$$phase ? e(b, {
						$event: a
					}) : b.$apply(function() {
						e(b, {
							$event: a
						})
					})
				})
			}
		}
	}]).directive("wtLoadingStatus", ["$timeout", function(a) {
		return {
			restrict: "A",
			link: function(b, c, d) {
				b.$watch(d.wtLoadingStatus, function(b, d) {
					b === !0 ? c.button("loading") : b === !1 && a(function() {
						c.button("reset")
					})
				})
			}
		}
	}]).directive("wtDisableDrag", [function() {
		return {
			restrict: "A",
			link: function(a, b, c) {
				c.wtDisableDrag ? a.$watch(c.wtDisableDrag, function(a, c) {
					a ? b.on("dragstart.js_disable dragover.js_disable mousedown.js_disable", function(a) {
						return a.preventDefault(), !1
					}) : b.unbind("dragstart.js_disable dragover.js_disable mousedown.js_disable")
				}) : b.on("dragstart.js_disable mousedown.sortable", function(a) {
					return a.preventDefault(), a.stopPropagation(), !1
				})
			}
		}
	}]).directive("wtSidebarToggle", ["$timeout", "$parse", "$window", "$rootScope", function(a, b, c, d) {
		return {
			restrict: "A",
			link: function(a, b, c) {
				var e = a.dm = {
						$sidebar: $(".layout_right_sidebar"),
						$center: $(".layout_content_main"),
						$sidebarWidth: 253,
						duration: 150,
						sidebarFoldWidth: 85,
						skipWatchFirstInit: !0,
						init_status: a.$eval(c.wtSidebarToggle),
						width: a.$eval(c.width)
					},
					f = function(a, b) {
						return a ? void("members" === a ? e.skipWatchFirstInit ? (e.$sidebar.width(e.sidebarFoldWidth), e.$center.css("marginRight", e.sidebarFoldWidth + 1), d.$broadcast("sidebarToggleSuccess")) : (e.$sidebar.animate({
							width: e.sidebarFoldWidth
						}, e.duration), e.$center.animate({
							"margin-right": e.sidebarFoldWidth
						}, e.duration, null, function() {
							d.$broadcast("sidebarToggleSuccess"), $("#calendar").fullCalendar("render")
						})) : (e.$sidebar.animate({
							width: e.width ? e.width : e.$sidebarWidth
						}, e.duration), e.$center.animate({
							"margin-right": e.width ? e.width : e.$sidebarWidth
						}, e.duration, null, function() {
							$("#calendar").fullCalendar("render"), d.$broadcast("sidebarToggleSuccess", {
								collapse: !1
							})
						}))) : (e.$sidebar.width(0), e.$center.css("marginRight", 0), void d.$broadcast("sidebarToggleSuccess"))
					};
				f(e.init_status), a.$watch(c.argHideSidebar, function(a, b) {
					if(a) return e.$sidebar.width(0), e.$center.css("marginRight", 0), void d.$broadcast("sidebarToggleSuccess")
				}), a.$watch(c.wtSidebarToggle, function(a, b) {
					return e.skipWatchFirstInit ? void(e.skipWatchFirstInit = !1) : void f(a, b)
				})
			}
		}
	}]).directive("wtStopPropagation", [function() {
		return {
			restrict: "A",
			link: function(a, b, c) {
				var d = c.wtStopPropagation;
				_.isEmpty(d) && (d = "mousedown"), b.bind(d, function(a) {
					a.stopPropagation()
				})
			}
		}
	}]).directive("wtFocusEvent", ["$timeout", "$parse", function(a, b) {
		return {
			restrict: "A",
			link: function(a, c, d, e) {
				var f = b(d.wtFocusEvent);
				c.bind("focus", function(b) {
					a.$$phase ? f(a, {
						$event: b
					}) : a.$apply(function() {
						f(a, {
							$event: b
						})
					})
				})
			}
		}
	}]).directive("wtPagination", ["$translate", function(a) {
		return {
			restrict: "A",
			link: function(b, c, d) {
				b.$watch(d.wtPagination, function(d) {
					_.isEmpty(d) || c.pagination(d.totalCount, {
						current_page: 0,
						items_per_page: kzi.config.default_count,
						num_display_entries: 10,
						callback: function(a) {
							b.$apply(function() {
								d.opts.callback(a)
							})
						},
						load_first_page: !1,
						prev_text: a.instant("directive_directive.prev_page"),
						next_text: a.instant("directive_directive.next_page")
					})
				})
			}
		}
	}]).directive("ngBindHtmlUnsafe", ["$sce", "sanitize", function(a, b) {
		return {
			restrict: "A",
			scope: {
				ngBindHtmlUnsafe: "="
			},
			template: '<span ng-bind-html="trustedHtml"></span>',
			link: function(c, d, e, f) {
				c.updateView = function() {
					if(!_.isUndefined(c.ngBindHtmlUnsafe)) {
						var d = b(c.ngBindHtmlUnsafe);
						c.trustedHtml = a.trustAsHtml(d)
					}
				}, c.$watch("ngBindHtmlUnsafe", function(a, b) {
					c.updateView(a)
				})
			}
		}
	}]).directive("wtAutofocus", ["$timeout", function(a) {
		return {
			restrict: "A",
			link: function(b, c, d, e) {
				var f = d || {},
					g = 200;
				f.wtAutofocusTime && (g = f.wtAutofocusTime), f.wtAutofocusEnable && b.$eval(f.wtAutofocusEnable) !== !0 || a(function() {
					c[0].focus()
				}, g)
			}
		}
	}]).directive("wtRepeatDone", ["$timeout", function(a) {
		return {
			restrict: "A",
			priority: -1e3,
			link: function(b, c, d) {
				b.$last && a(function() {
					b.$eval(d.wtRepeatDone)
				}, 0)
			}
		}
	}]).directive("wtValidatorName", [function() {
		return {
			restrict: "A",
			require: "ngModel",
			link: function(a, b, c, d) {
				d.$name = a.$eval(c.wtValidatorName), b.attr("name", a.$eval(c.wtValidatorName));
				var e = b.controller("form") || {
					$addControl: angular.noop
				};
				e.$addControl(d)
			}
		}
	}])
})