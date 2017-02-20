/**
 * @ngdoc function
 * @name jtWorkApp.service:ProjectService
 * @description
 * project 相关api service
 * project of the jtWorkApp
 */
define(['app'], function (app) {
    'use strict';

    app.factory("$UploadFile",["$rootScope", "Upload", "$translate",
    	function($rootScope, Upload, $translate){
    		//["$rootScope", "Upload", "$translate"
    		//       a            b          c
			function d() {
				this.uploadQueueFiles = [],
					this.uploadQueueFilesByPid = {},
					this.uploadQueueFilesByXid = {},
					this.removeQueueFile = function(a) {
						switch(this.uploadQueueFiles = _.reject(this.uploadQueueFiles,
							function(b) {
								return b === a;
							}), this.uploadQueueFilesByPid[a.data.pid] && (this.uploadQueueFilesByPid[a.data.pid] = _.reject(this.uploadQueueFilesByPid[a.data.pid],
							function(b) {
								return b === a;
							}), null != this.uploadQueueFilesByPid[a.data.pid] && 0 !== this.uploadQueueFilesByPid[a.data.pid].length || delete this.uploadQueueFilesByPid[a.data.pid]), a.data.type) {
							case "task":
								this.uploadQueueFilesByXid[a.data.tid] && delete this.uploadQueueFilesByXid[a.data.tid];
								break;
							case "post":
								this.uploadQueueFilesByXid[a.data.post_id] && delete this.uploadQueueFilesByXid[a.data.post_id];
								break;
							case "file":
								this.uploadQueueFilesByXid[a.data.fid] && delete this.uploadQueueFilesByXid[a.data.fid];
								break;
							case "event":
								this.uploadQueueFilesByXid[a.data.event_id] && delete this.uploadQueueFilesByXid[a.data.event_id]
						}
					}
			}
			return d.prototype.addFileToDb = function(a, b, d) {
					var e = this,
						f = {};
					switch(f.target = b.formData.target, f.type = b.formData.type || "project", f.file = {
							pid: b.formData.pid,
							name: b.fname,
							ext: kzi.constant.get_ext(b.ext),
							size: b.size,
							path: b.url
						},
						b.formData.type) {
						case "task":
							f.ext = {
								tid: b.formData.tid
							};
							break;
						case "post":
							f.ext = {
								post_id: b.formData.post_id
							};
							break;
						case "file":
							f.ext = {
								fid: b.formData.fid
							};
							break;
						case "event":
							f.ext = {
								event_id: b.formData.event_id,
								folder_id: ""
							};
							break;
						default:
							f.ext = {
								folder_id: b.formData.folder_id
							}
					}
					wt.data.file.new_upload(b.formData.pid, f,
						function(c) {
							f.file = _.extend(f.file, b, c.data),
								f.file.icon = kzi.helper.build_file_icon(f.file),
								_.isFunction(d) && d(null, f, a),
								e.removeQueueFile(a)
						},
						function(b) {
							_.isFunction(d) && d(c.instant("uploadfile.err_upload") + b.code, null, a)
						})
				},
				d.prototype.startUpload = function(a, d, e) {
					var f = this;
					d.percent = 0,
						d.upload = b.upload({
							url: a,
							method: "POST",
							fields: d.data,
							file: d.original
						}).progress(function(a) {
							d.percent = parseInt(100 * a.loaded / a.total)
						}).success(function(a) {
							if(200 === a.code) {
								var b = a.files[0];
								"avatar" === b.formData.target || "team" === b.formData.target || "special" === b.formData.target ? _.isFunction(e) && e(null, b, d) : f.addFileToDb(d, b, e)
							} else 8100 === a.code ? d.error = c.instant("uploadfile.err_too_large") : d.error = c.instant("uploadfile.fail_upload"),
								d.percent = 100,
								e && e(d.error, null, d)
						}).error(function(a) {
							d.percent = 100,
								d.error = c.instant("uploadfile.fail_upload"),
								e && e(a, null, d)
						}),
						d.cancel = function() {
							var a = f.uploadQueueFiles.indexOf(this);
							f.uploadQueueFiles.splice(a, 1),
								this && this.upload && this.upload.abort()
						}
				},
				d.prototype.addFiles = function(a, c, d) {
					var e = this,
						f = kzi.config.box_url() + "?pid=" + a + "&token=" + kzi.get_cookie("sid");
					_.forEach(c,
						function(c) {
							switch(/image\/.*/.test(c.original.type) && (c.isImage = !0, b.dataUrl(c.original).then(function(a) {
								c.Blob = a
							})), c.data.size = c.original.size, e.uploadQueueFiles.push(c), e.uploadQueueFilesByPid[a] ? e.uploadQueueFilesByPid[a].push(c) : e.uploadQueueFilesByPid[a] = [c], c.data.type) {
								case "task":
									var g = c.data.tid;
									e.uploadQueueFilesByXid[g] ? e.uploadQueueFilesByXid[g].push(c) : e.uploadQueueFilesByXid[g] = [c];
									break;
								case "post":
									var g = c.data.post_id;
									e.uploadQueueFilesByXid[g] ? e.uploadQueueFilesByXid[g].push(c) : e.uploadQueueFilesByXid[g] = [c];
									break;
								case "file":
									var g = c.data.fid;
									e.uploadQueueFilesByXid[g] ? e.uploadQueueFilesByXid[g].push(c) : e.uploadQueueFilesByXid[g] = [c];
									break;
								case "event":
									var g = c.data.event_id;
									e.uploadQueueFilesByXid[g] ? e.uploadQueueFilesByXid[g].push(c) : e.uploadQueueFilesByXid[g] = [c]
							}
							e.startUpload(f, c, d)
						})
				},
				d.prototype.uploadAvatar = function(a, b) {
					var c = kzi.config.box_url() + "?pid=avatar&token=" + kzi.get_cookie("sid");
					a.data.size = a.original.size,
						this.startUpload(c, a, b)
				},
				d.prototype.uploadBackgroundImage = function(a, b) {
					var c = kzi.config.box_url() + "?pid=special&token=" + kzi.get_cookie("sid");
					a.data.size = a.original.size,
						this.startUpload(c, a, b)
				},
				d.prototype.uploadTeamLogo = function(a, b) {
					var c = kzi.config.box_url() + "?pid=team&token=" + kzi.get_cookie("sid");
					a.data.size = a.original.size,
						this.startUpload(c, a, b)
				},
				new d
		
	}]);
})