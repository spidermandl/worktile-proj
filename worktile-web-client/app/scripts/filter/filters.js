/**
 * @ngdoc function
 * @name jtWorkApp.controller:translate filter
 * @description
 * # translate filter
 * Controller of the jtWorkApp
 */
define(['app'], function (app) {
	'use strict';

    var a = function(a, b) {
        if (void 0 !== a && null !== a) {
            _.isString(a) ? a = moment(parseFloat(a)) : _.isObject(a) ? angular.noop() : a = moment(a);
            var c = "MM-DD";
            return b && (c += " HH:mm"),
            moment().isSame(a, "year") ? moment(a).format(c) : moment(a).format("YYYY-" + c)
        }
    };

	app.filter("role", ["$translate",
    function(a) {
        return function(b) {
            switch (b) {
            case kzi.constant.role.admin:
                return a.instant("common.txt_admin");
            case kzi.constant.role.member:
                return a.instant("common.txt_member");
            case kzi.constant.role.guest:
                return a.instant("common.txt_visitor");
            default:
                return b
            }
        }
    }]).filter("is_admin", [function() {
        return function(a) {
            return a === kzi.constant.role.admin
        }
    }]).filter("is_member", [function() {
        return function(a) {
            return a === kzi.constant.role.member
        }
    }]).filter("is_guest", [function() {
        return function(a) {
            return a === kzi.constant.role.guest
        }
    }]).filter("is_pending", [function() {
        return function(a) {
            return a === kzi.constant.status.pending
        }
    }]).filter("sanitize", ["sanitize",
    function(a) {
        return function(b) {
            if (_.isString(b)) return a(b);
        }
    }]).filter("firstText", [function() {
        return function(a) {
            return a ? a.substring(0, 1).toLocaleUpperCase() : ""
        }
    }]).filter("number2K", [function() {
        return function(a) {
            return _.isNumber(a) && !_.isNaN(a) ? a > 999 ? (a / 1e3).toFixed(0) + "K": a: 0
        }
    }]).filter("cutstr", [function() {
    	/**
		 *剪切string
    	 **/
        return function(name_with_max_len) {
            if (_.isArray(name_with_max_len)) {
                var name = name_with_max_len[0],
                max_length = name_with_max_len[1];
                if (_.isEmpty(name)) return "";
                if (2 * name.length <= max_length) return name;
                for (var meta_l = 0,display_str = "",i = 0; i < name.length; i++) 
                	if (display_str += name.charAt(i), name.charCodeAt(i) > 128) {
                    	if (meta_l += 2, meta_l > max_length) 
                    		return display_str.substring(0, ~~ (max_length / 2)) + "…"
                	} 
                	else if (meta_l += 1, meta_l > max_length) 
                		return display_str.substring(0, display_str.length) + "…";
                return display_str;
            }
        }
    }]).filter("arrReverse", [function() {
        return function(a) {
            return _.isArray(a) ? a.slice().reverse() : null
        }
    }]).filter("fromNow", ["$filter", "$translate",
    function(a, b) {
        return function(a) {
            if (void 0 !== a && null !== a) {
                var c = new moment,
                d = moment(a);
                return c.isSame(d, "day") ? b.instant("common.today") + " " + d.format("HH:mm") : c.add(1, "days").isSame(d, "day") ? b.instant("common.tomorrow") + " " + d.format("HH:mm") : c.add( - 1, "day").isSame(d, "day") ? b.instant("common.yesterday") + " " + d.format("HH:mm") : c.isSame(d, "year") ? d.format("MM-DD HH:mm") : d.format("YYYY-MM-DD HH:mm")
            }
        }
    }]).filter("momentFormat", ["$filter",
    function(a) {
        return function(a) {
            return moment(a[0]).format(a[1])
        }
    }]).filter("dateFormat", ["$filter",
    function(a) {
        return function(a) {
            if (void 0 !== a && null !== a) return moment(a).format("YYYY-MM-DD")
        }
    }]).filter("timeFormat", ["$filter",
    function(a) {
        return function(a) {
            if (void 0 !== a && null !== a) return moment(a).format("HH:mm")
        }
    }]).filter("timeFullFormat", ["$filter",
    function(a) {
        return function(a) {
            return moment(a).format("YYYY-MM-DD HH:mm");
        }
    }]).filter("dateAutoFormat", [function() {
        return function(b) {
            return a(b, !1)
        }
    }]).filter("datetimeAutoFormat", [function() {
        return function(b) {
            return a(b, !0)
        }
    }]).filter("taskDatetimeFormat", [function() {
        return function(b) {
            return "23:59" === moment(b).format("HH:mm") ? a(b, !1) : a(b, !0)
        }
    }]).filter("taskAgingLevel", [function() {
        return function(a) {
            var b = moment(Date.now()).diff(a, "days");
            return b >= 7 && b < 14 ? "task-aging-1": b >= 14 && b < 28 ? "task-aging-2": b >= 28 ? "task-aging-3": ""
        }
    }]).filter("dateFormatZHCN", ["$filter",
    function(a) {
        return function(a) {
            if (void 0 !== a && null !== a) return _.isObject(a) ? a.format("YYYY-MM-DD") : _.isString(a) ? moment(parseFloat(a)).format("YYYY-MM-DD") : moment(a).format("YYYY-MM-DD")
        }
    }]).filter("timeFormatZHCN", ["$filter",
    function(a) {
        return function(a) {
            if (void 0 !== a && null !== a) return moment(a).format("YYYY-MM-DD HH:mm")
        }
    }]).filter("timeFullFormatZHCN", [function() {
        return function(a) {
            if (void 0 !== a && null !== a) return moment(a).format("YYYY-MM-DD HH:mm")
        }
    }]).filter("smartDatetimeFormat", ["$filter",
    function(a) {
        return function(a) {
            if (void 0 !== a && null !== a) {
                var b = new moment,
                c = moment(a);
                return b.isSame(c, "year") ? moment(a).format("MM-DD HH:mm") : moment(a).format("YYYY-MM-DD HH:mm")
            }
        }
    }]).filter("smartTimeFormat", ["$filter",
    function(a) {
        return function(a) {
            if (void 0 !== a && null !== a) {
                var b = new moment,
                c = moment(a);
                return b.isSame(c, "year") ? moment(a).format("MMM Do") : moment(a).format("YYYY-MM-DD")
            }
        }
    }]).filter("smartDateFormat", ["$filter",
    function(a) {
        return function(a) {
            if (void 0 !== a && null !== a) return new Date(a).getFullYear() !== (new Date).getFullYear() ? moment(a).format("YYYY-MM-DD") : moment(a).format("MM-DD")
        }
    }]).filter("isNotUndefined", ["$filter",
    function(a) {
        return function(a) {
            return ! _.isUndefined(a)
        }
    }]).filter("isNullOrEmpty", ["$filter",
    function(a) {
        return function(a) {
            return ! (!angular.isUndefined(a) && null !== a && "" !== a && "" !== $.trim(a))
        }
    }]).filter("isNotNullOrEmpty", ["$filter",
    function(a) {
        return function(a) {
            return ! angular.isUndefined(a) && null !== a && "" !== a && "" !== $.trim(a)
        }
    }]).filter("indexOf", ["$filter",
    function(a) {
        return function(a) {
            if (angular.isArray(a)) return _.indexOf(a[0], a[1]) !== -1
        }
    }]).filter("activityIcon", ["$filter",
    function(a) {
        return function(a) {
            var b = a;
            return _.isUndefined(kzi.activity_icon[a]) || (b = kzi.activity_icon[a]),
            b
        }
    }]).filter("fullPath", ["$filter",
    function(a) {
        return function(a) {
            if (a) return 0 === a.indexOf("/img") ? a: 0 === a.indexOf("http://wt-avatars") ? a: 0 === a.indexOf("http://wt-prj") ? a: kzi.config.box_url + a
        }
    }]).filter("wtBox", ["$filter",
    function(a) {
        return function(a) {
            return a ? kzi.config.wtbox_url + a: kzi.config.default_box
        }
    }]).filter("wtBoxDownload", ["$filter",
    function(a) {
        return function(a) {
            if (_.isEmpty(a)) return kzi.config.default_box;
            var b = kzi.get_cookie("sid"),
            c = a.pid,
            d = a.version ? a.version: "";
            return kzi.config.box_url() + "download/" + a.fid + "?pid=" + c + "&token=" + b + "&vid=" + d
        }
    }]).filter("wtExtensionIcon", ["$filter",
    function(a) {
        return function(a) {
            return a ? kzi.config.cdnpath + "images/extensions/extension_" + a + ".png": kzi.config.cdnpath + "images/extensions/extension_normal.png"
        }
    }]).filter("inertPicFromBox", ["$filter",
    function(a) {
        return function(a) {
            if (_.isEmpty(a)) return kzi.config.default_box;
            if (kzi.constant.image_exts.indexOf(a.ext) > -1) {
                var b = (kzi.get_cookie("sid"), a.pid);
                return kzi.config.box_url() + "view/" + a.fid + "?pid=" + b
            }
            return _.isUndefined(a.icon) ? void 0 : kzi.config.wtbox_url + a.icon
        }
    }]).filter("wtBoxView", ["$filter",
    function(a) {
        return function(a) {
            if (_.isEmpty(a)) return kzi.config.default_box;
            if (kzi.constant.image_exts.indexOf(a.ext) > -1) {
                var b = kzi.get_cookie("sid"),
                c = a.pid;
                return kzi.config.box_url() + "view/" + a.fid + "?pid=" + c + "&token=" + b + "&dt=" + (a.dt || "")
            }
            return _.isUndefined(a.icon) ? void 0 : kzi.config.wtbox_url + a.icon
        }
    }]).filter("propsFilter",
    function() {
        return function(a, b) {
            var c = [];
            return angular.isArray(a) ? a.forEach(function(a) {
                for (var d = !1,
                e = Object.keys(b), f = 0; f < e.length; f++) {
                    var g = e[f],
                    h = b[g].toLowerCase();
                    if (a[g].toString().toLowerCase().indexOf(h) !== -1) {
                        d = !0;
                        break
                    }
                }
                d && c.push(a)
            }) : c = a,
            c
        }
    }).filter("getFileIcon", [function() {
        return function(a) {
            return _.isEmpty(a) ? "": kzi.helper.build_file_icon(a)
        }
    }]).filter("fileThumbSrcByExt", [function() {
        return function(a) {
            var a = a.toLowerCase();
            return ["doc", "docx"].indexOf(a) >= 0 ? "/img/icons/doc.png": ["ppt", "pptx"].indexOf(a) >= 0 ? "/img/icons/ppt.png": ["xls", "xlsx"].indexOf(a) >= 0 ? "/img/icons/xls.png": "pdf" === a ? "/img/icons/pdf.png": "txt" === a ? "/img/icons/txt.png": "apk" === a ? "/img/icons/apk.png": "bak" === a ? "/img/icons/bak.png": "cs" === a ? "/img/icons/cs.png": "csv" === a ? "/img/icons/csv.png": "exe" === a ? "/img/icons/exe.png": "fla" === a ? "/img/icons/fla.png": "html" === a ? "/img/icons/html.png": "ipa" === a ? "/img/icons/ipa.png": "java" === a ? "/img/icons/java.png": "js" === a ? "/img/icons/js.png": "mp3" === a ? "/img/icons/mp3.png": "mp4" === a ? "/img/icons/mp4.png": "php" === a ? "/img/icons/php.png": "rar" === a ? "/img/icons/rar.png": "swf" === a ? "/img/icons/swf.png": "ttf" === a ? "/img/icons/ttf.png": "txt" === a ? "/img/icons/txt.png": "vss" === a ? "/img/icons/vss.png": "xsd" === a ? "/img/icons/xsd.png": "zip" === a ? "/img/icons/zip.png": "/img/icons/default.png"
        }
    }]).filter("filterMembers", ["$filter",
    function(a) {
        return function(a, b) {
            if (_.isEmpty(b)) return a;
            var c = b.toLowerCase().trim();
            return _.filter(a,
            function(a) {
                return a.name.toLowerCase().indexOf(c) > -1 || a.display_name.toLowerCase().indexOf(c) > -1 || null != a.name_pinyin && a.name_pinyin.toLowerCase().indexOf(c) > -1
            })
        }
    }]).filter("filterMembersInfo", ["$filter",
    function(a) {
        return function(a, b) {
            if (_.isEmpty(b)) return a;
            var c = b.toLowerCase().trim();
            return _.filter(a,
            function(a) {
                return a.name.toLowerCase().indexOf(c) > -1 || a.display_name.toLowerCase().indexOf(c) > -1 || null != a.email && a.email.toLowerCase().indexOf(c) > -1 || null != a.phone && a.phone.toLowerCase().indexOf(c) > -1 || null != a.name_pinyin && a.name_pinyin.toLowerCase().indexOf(c) > -1
            })
        }
    }]).filter("filterProjects", ["$filter",
    function(a) {
        return function(a, b) {
            if (_.isEmpty(b)) return a;
            var c = b.toLowerCase().trim();
            return _.filter(a,
            function(a) {
                return a.name.toLowerCase().indexOf(c) > -1 || null != a.name_pinyin && a.name_pinyin.indexOf(c) > -1
            })
        }
    }]).filter("uploadFileExt", ["$translate",
    function(a) {
        return function(b) {
            return b.original.name.indexOf(".") !== -1 ? b.original.name.substring(b.original.name.lastIndexOf(".") + 1) : a.instant("common.txt_unknow")
        }
    }]).filter("fileExt", ["$translate",
    function(a) {
        return function(b) {
            if (b.type === kzi.constant.file_type.file) {
                if (kzi.constant.img_exts.indexOf(b.ext) > -1) return a.instant("common.txt_pic");
                var c = _.findKey(kzi.constant.exts,
                function(a, c) {
                    return a === b.ext
                });
                return c ? c: a.instant("common.txt_unknow")
            }
            return ""
        }
    }]).filter("fileSize", [function() {
        return function(a) {
            if (!_.isUndefined(a) && _.isNumber(parseInt(a, 10))) {
                var b = "K",
                c = a / 1024;
                return c > 1024 && (b = "M", c /= 1024),
                c.toFixed(2) + b
            }
            return ""
        }
    }]).filter("isFile", [function() {
        return function(a) {
            return a === kzi.constant.file_type.file
        }
    }]).filter("isFolder", [function() {
        return function(a) {
            return a === kzi.constant.file_type.folder
        }
    }]).filter("isImageFile", [function() {
        return function(a) {
            return ! _.isEmpty(a) && "-1" === kzi.constant.get_file_icon(a)
        }
    }]).filter("isPreviewFile", [function() {
        return function(a) {
            return _.isEmpty(a) ? null: a.type && a.type === kzi.constant.file_type.folder ? 1 : _.contains(kzi.constant.img_exts, a.ext) ? 0 : _.contains(kzi.constant.text_exts, a.ext) || _.contains(kzi.constant.preview_exts, a.ext) ? 2 : null
        }
    }]).filter("teamIndustries", ["$translate",
    function(a) {
        return function(b) {
            return config.constant.team_industries[b] ? a.instant(config.constant.team_industries[b]) : a.instant("common.txt_unknow")
        }
    }]).filter("memberStatus", ["$translate",
    function(a) {
        return function(b) {
            switch (b) {
            case kzi.constant.status.pending:
                return a.instant("filter.member_status_pending");
            case kzi.constant.status.ok:
                return a.instant("filter.member_status_ok")
            }
        }
    }]).filter("projectStatus", ["$translate",
    function(a) {
        return function(b) {
            switch (b) {
            case kzi.constant.archived.yes:
                return a.instant("filter.project_status_archive");
            case kzi.constant.archived.no:
                return a.instant("filter.project_status_normal")
            }
        }
    }]).filter("fileuploadErrorInfo", ["$translate",
    function(a) {
        return function(b) {
            switch (b) {
            case "error":
                return a.instant("filter.err_fileupload");
            default:
                return b
            }
        }
    }]).filter("ifImgExtSetClass", [function() {
        return function(a) {
            var b = a[0],
            c = a[1];
            return kzi.constant.image_exts.indexOf(b) > -1 ? c: ""
        }
    }]).filter("getExtIcon", [function() {
        return function(a) {
            var b = {
                type: 2,
                ext: kzi.constant.get_ext(a.substring(a.lastIndexOf(".") + 1))
            };
            return kzi.config.wtbox_url + kzi.constant.get_file_icon(b)
        }
    }]).filter("getTemplateBg", ['config',function(config) {
        return function(a) {
            var b = "";
            return b = 1 === a.type ? "url(" + config.cdnpath + "images/dialog_project_create/team-templates/" + a.image + ")": "url(" + config.cdnpath + "images/dialog_project_create/project-templates/" + a.image + ")"
        }
    }]).filter("appClientName", ["$translate",
    function(a) {
        return function(b) {
            switch (b.client_id) {
            case kzi.constant.client.android:
                return a.instant("filter.app_client_name_android");
            case kzi.constant.client.iphone:
                return a.instant("filter.app_client_name_iphone");
            case kzi.constant.client.openapp:
                return b.name;
            default:
                return ""
            }
        }
    }]).filter("GetClientEdition", ["$translate",
    function(a) {
        return function(b) {
            switch (b.client_id) {
            case kzi.constant.client.openapp:
                return a.instant("filter.client_edition_openapp");
            default:
                return a.instant("filter.client_edition_officail")
            }
        }
    }]).filter("projectVisibility", ["$translate",
    function(a) {
        return function(b) {
            switch (b) {
            case config.constant.prj_visibility.private:
                return a.instant("filter.project_visibility_private");
            case config.constant.prj_visibility.protected:
                return a.instant("filter.project_visibility_protected");
            case config.constant.prj_visibility.public:
                return a.instant("filter.project_visibility_public");
            default:
                return ""
            }
        }
    }]).filter("taskLockPermission", [function() {
        return function(a, b) {
            return ! _.includes(_.union([a.uid], _.map(a.members, "uid"), _.map(a.watchers, "uid")), b.uid)
        }
    }]).filter("permission", [function() {
        return function(a, b) {
            // console.log(a);
            // console.log(b);
            return ! (!a || !b) && a & b
        }
    }]).filter("teamVisibility", ["$translate","config",
    function(translate,config) {
        return function(visibility) {
            switch (visibility) {
                case config.constant.team_visibility.private:
                    return translate.instant("filter.team_visibility_private");
                case config.constant.team_visibility.public:
                    return translate.instant("filter.team_visibility_public");
                default:
                    return ""
            }
        }
    }]).filter("clientName", ["$translate",
    function(a) {
        return function(b) {
            switch (b) {
            case kzi.constant.client.web:
                return a.instant("filter.client_name_web");
            case kzi.constant.client.iphone:
                return a.instant("filter.client_name_iphone");
            case kzi.constant.client.android:
                return a.instant("filter.client_name_android");
            default:
                return a.instant("common.unknow")
            }
        }
    }]).filter("weekName", ["$translate",
    function(a) {
        return function(b) {
            if (_.isArray(b)) {
                var c = [];
                return _.each(b,
                function(b) {
                    switch (b) {
                    case 1:
                        c.push(a.instant("common.week_ss1"));
                        break;
                    case 2:
                        c.push(a.instant("common.week_ss2"));
                        break;
                    case 3:
                        c.push(a.instant("common.week_ss3"));
                        break;
                    case 4:
                        c.push(a.instant("common.week_ss4"));
                        break;
                    case 5:
                        c.push(a.instant("common.week_ss5"));
                        break;
                    case 6:
                        c.push(a.instant("common.week_ss6"));
                        break;
                    case 0:
                        c.push(a.instant("common.week_ss7"))
                    }
                }),
                c.join("、")
            }
            return a.instant("common.unknow")
        }
    }]).filter("encodeURIComponent", [function() {
        return function(a) {
            return encodeURIComponent(a)
        }
    }]).filter("escapeRegExp", [function() {
        return function(a) {
            return a.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
        }
    }]).filter("reHighlight",
    function() {
        return function(a, b, c) {
            return b || angular.isNumber(b) ? (a = a.toString(), b = b.toString(), c ? a.split(b).join('<span class="ui-match">' + b + "</span>") : a.replace(new RegExp(b, "gi"), '<span class="ui-match">$&</span>')) : a
        }
    })


});