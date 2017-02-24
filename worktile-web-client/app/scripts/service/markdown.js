/**
 * @ngdoc function
 * @name jtWorkApp.service:IdentityService
 * @description
 * 登录前相关api service
 * Controller of the jtWorkApp
 */
define(['app'], function (app) {
 	'use strict';

	app.factory('sanitize', ['config',
		function (config) {

			function Sanitize() {
				var a, b;
				for(b = arguments[0] || {},
					this.config = {},
					this.config.elements = b.elements ? b.elements : [], this.config.attributes = b.attributes ? b.attributes : {},
					this.config.attributes[Sanitize.ALL] = this.config.attributes[Sanitize.ALL] ? this.config.attributes[Sanitize.ALL] : [], this.config.allow_comments = !!b.allow_comments && b.allow_comments, this.allowed_elements = {},
					this.config.protocols = b.protocols ? b.protocols : {},
					this.config.add_attributes = b.add_attributes ? b.add_attributes : {},
					this.dom = b.dom ? b.dom : document, a = 0; a < this.config.elements.length; a++) this.allowed_elements[this.config.elements[a]] = !0;
				if(this.config.remove_element_contents = {},
					this.config.remove_all_contents = !1, b.remove_contents)
					if(b.remove_contents instanceof Array)
						for(a = 0; a < b.remove_contents.length; a++) this.config.remove_element_contents[b.remove_contents[a]] = !0;
					else this.config.remove_all_contents = !0;
				this.transformers = b.transformers ? b.transformers : []
			};
			Sanitize.Config = {};
			Sanitize.Config.BASIC = {
				elements: ["a", "b", "blockquote", "br", "cite", "code", "dd", "dl", "dt", "em", "i", "li", "ol", "p", "pre", "q", "small", "strike", "strong", "sub", "sup", "u", "ul"],
				attributes: {
					a: ["href"],
					blockquote: ["cite"],
					q: ["cite"]
				},
				add_attributes: {
					a: {
						rel: "nofollow"
					}
				},
				protocols: {
					a: {
						href: ["ftp", "http", "https", "mailto", Sanitize.RELATIVE]
					},
					blockquote: {
						cite: ["http", "https", Sanitize.RELATIVE]
					},
					q: {
						cite: ["http", "https", Sanitize.RELATIVE]
					}
				}
			};
			Sanitize.Config.RELAXED = {
				elements: ["a", "b", "blockquote", "br", "caption", "cite", "code", "col", "colgroup", "dd", "dl", "dt", "em", "hr", "h1", "h2", "h3", "h4", "h5", "h6", "i", "img", "li", "ol", "p", "pre", "q", "small", "strike", "strong", "del", "sub", "sup", "table", "tbody", "td", "tfoot", "th", "thead", "tr", "u", "ul", "div", "span"],
				attributes: {
					a: ["href", "title"],
					blockquote: ["cite"],
					col: ["span", "width"],
					colgroup: ["span", "width"],
					img: ["align", "alt", "height", "src", "title", "width", "class"],
					ol: ["start", "type"],
					q: ["cite"],
					table: ["summary", "width"],
					td: ["abbr", "axis", "colspan", "rowspan", "width", "align"],
					th: ["abbr", "axis", "colspan", "rowspan", "scope", "width", "align"],
					ul: ["type"],
					div: ["class"],
					span: ["class"],
					hr: [""]
				},
				protocols: {
					a: {
						href: ["ftp", "http", "https", "mailto", Sanitize.RELATIVE]
					},
					blockquote: {
						cite: ["http", "https", Sanitize.RELATIVE]
					},
					img: {
						src: ["http", "https", Sanitize.RELATIVE]
					},
					q: {
						cite: ["http", "https", Sanitize.RELATIVE]
					}
				}
			};
			Sanitize.Config.RESTRICTED = {
				elements: ["b", "em", "i", "strong", "u"]
			};

			var b = new Sanitize({}),
				c = new Sanitize(Sanitize.Config.RESTRICTED),
				d = new Sanitize(Sanitize.Config.BASIC),
				e = new Sanitize(Sanitize.Config.RELAXED);
			return function(f, g) {
				var h = e;
				switch(g) {
					case 0:
						h = b;
						break;
					case 1:
						h = c;
						break;
					case 2:
						h = d;
						break;
					case 3:
						h = e;
						break;
					default:
						h = e
				}
				var i = document.createElement("div"),
					j = document.createElement("div");
				return i.innerHTML = filterXSS(f, config.whiteList),
					j.appendChild(h.clean_node(i)),
					j.innerHTML
			}
		}])
})