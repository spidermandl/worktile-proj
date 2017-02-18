/**
 * @ngdoc function
 * @name jtWorkApp.controller:IdentityCtrl
 * @description
 * # IdentityCtrl
 * Controller of the jtWorkApp
 */
 define(['app'], function (app) {
 	'use strict';

  	//父类
	app.controller('BaseCtrl', ['$scope','config','$translate',function ($scope,config,$translate) {
		$scope.action_type = 0;

		$scope.vm = {
			//===========================登录相关===============================
			weixin_unionid : '',
			weixin_login : false,//是否是微信登录 
			//登录模式
			js_change_login_mode : function(type){
				this.weixin_login = type === 'default'?false:true;
			},

			//===========================注册相关===============================
			show_signup : true,
			show_signmode : false,
			signmode : 'phone',
			phone_prefixs:config.phone_prefixs,//国码信息
			phone_prefix:config.phone_prefixs[0],
			js_change_phone_prefix : function(prefix){ //获取国码选择
				this.phone_prefix = prefix;
			},
			js_change_phone : function(event){//实时更新输入电话
				return 'event';
			},
			user:{ //用户输入信息
				phone : null,
				phone_code : null,
				email:null,
				display_name:null,
			},
			signup_phone_text: $translate.instant('outer_signup.signup_phone_text'),//config.STRING.signup_phone_text,
			check_platform : {//客户端平台检测
				is_mobile : false,
			},
			js_show_signmode : function(){
				this.show_signup = true;
			},
			js_change_signup_mode : function(mode){ //改变注册方式
				this.show_signmode = mode;
				this.signmode = mode;
				this.forgotmode = mode;

			},
			signup_success : false,//注册成功标志位

			//==========================忘记密码相关===============================
			forgotmode : 'phone',
			phone_code_text: $translate.instant('outer_forgot.phone_code_text'),//config.STRING.phone_code_text,
			send_success : false,//忘记密码请求发送成功
			//==============================公共方法================================
			//登录邮箱验证
			openemailset : function(){

			},
			//发送手机验证码验证信息
		 	js_forget_password : function(form){

			},
			//获取手机号，发送验证信息至手机
			js_get_phone_code : function(form){
				
			},
			//获取验证码方法
			getcode : function(){
				$scope.signin_user.imgsrc = '';
			},

		};
	}])
	//登录界面
	.controller('LoginCtrl', ['$scope','config','$controller','IdentityService','$state','localStorageService','api','$location','globalDataContext',
		function ($scope,config, $controller,service,$state,localStorageService,api,location,globalDataContext) {
			//$controller('BaseCtrl', {$scope: $scope});
			$scope.vm = {
				weixin_login: !1,
				weixin_login_obj: null,
				weixin_unionid: "",
				//check_platform: kzi.helper.check_platform()
			};
			// a.global.title = e.instant("outer_user.title_login");
			// var g = kzi.helper.get_query("name"),
			// 	i = kzi.helper.get_query("return_url");
			$scope.status = {
				message: "",
				code: 0
			}, 
			$scope.signin_user = {}, 
			$scope.is_login_ing = !1,
			//i && "" !== i ? $scope.return_path = decodeURIComponent(i) : null !== a.global.return_path && (b.return_path = a.global.return_path, a.global.return_path = null), a.global.is_login && h(f.check_platform, b.return_path), g && (b.login_name = g), 
			//获取验证码
			$scope.getcode = function() {
				api.getcode(function(data) {
						$scope.signin_user.imgsrc = data.image, 
						$scope.signin_user.image_md5 = data.image_md5
					}, function(data) {}, function(data) {});
			}, 
			$scope.iscode = !1, 
			$scope.signin = function(d) {
				$scope.signin_user.is_login_ing = !0, 
				$scope.status = {
					message: "",
					code: 0
				}, 
				api.signin($scope.signin_user, 
							function(data) {
								$scope.iscode = !1;
								// data.session.twofactor_enabled ? $scope.status.code = 1 : 
								// 		f.weixin_unionid ? c.location.href = "/login_weixin_success?unionid=" + f.weixin_unionid : h(f.check_platform, i)

	                			localStorageService.set('token',data.token);
	                			globalDataContext.load_profile();
							}, 
							function(data) {
			                    $scope.signin_user.username = '';
                    			$scope.signin_user.password = '';

                    			//错误处理
			                    var errors = config.errors.user_error;
			                    if (data.error_code == errors.not_found.code) {
			                    	console.log(errors.not_found.msg);
			                    }else if(data.error_code == errors.invalid_userinfo.code){
			                    	console.log(errors.invalid_userinfo.msg);
			                    }else if(data.error_code == errors.signin_limit.code){
									
									$scope.iscode = !0;
									$scope.getcode(); 
									var c = _.find(kzi.statuses.user_error, {
										code: data.code
									});
									c ? d.$errors.unshift(c.msg) : d.$errors.unshift(e.instant("outer_user.fail_login_try_again"))
			                    }
							}, 
							function() {
								$scope.signin_user.is_login_ing = !1;
							}), 
				$scope.js_signin_twofactor = function(a) {
					$scope.signin_user.is_signfactoing = !0, 
					wt.data.user.signin_twofactor(
						$scope.signin_user.factor, 
						$scope.signin_user.name, 
						$scope.signin_user.password, 
						function(a) {
							h(f.check_platform, i)
						}, 
						function() {
							a.$errors.unshift(e.instant("outer_user.err_twofactor_code"));
						}, 
						function() {
							$scope.signin_user.is_signfactoing = !1;
						})
				}, 
				$scope.js_signin_recovery = function(a) {
					$scope.signin_user.is_signrecoverying = !0, 
					wt.data.user.signin_recovery(
						$scope.signin_user.recovery_code, 
						$scope.signin_user.name, 
						$scope.signin_user.password, 
						function(a) {
							f.weixin_unionid ? c.location.href = "/login_weixin_success?unionid=" + f.weixin_unionid : h(f.check_platform, i);
						}, 
						function() {
							a.$errors.unshift(e.instant("outer_user.err_recovery_code"))
						}, 
						function() {
							$scope.signin_user.is_signrecoverying = !1;
						})
				}
			}, 
			$scope.vm.js_change_login_mode = function(mode) {
				function get_wechat_page() {
					null == $scope.vm.weixin_login_obj && 
					($scope.vm.weixin_login_obj = new WxLogin({
						id: "weixin_qr_code",
						appid: "wxeb56c6262610fd9d",
						scope: "snsapi_login",
						redirect_uri: encodeURIComponent(location.origin + "/weixin/auth"),
						state: $scope.return_path,
						style: "",
						href: ""
					}))
				}
				switch(mode || "default") {
					case "default":
						$scope.vm.weixin_login = !1;
						break;
					case "weixin":
						$scope.vm.weixin_login = !0, get_wechat_page();
						break;
					case "binding":
						$scope.vm.status.code = 0;
				}
			};
			var j = document.createElement("script");
			j.src = "https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js", $("body").append(j)


			// $scope.action_type = 0;
			// //状态对象
			// $scope.status = {};
			// $scope.status.code = 0;
			// $scope.iscode = false;//登录输入图片验证码
			// //输入信息
			// $scope.signin_user = {
			// 	name : null,
			// 	password : null,
			// 	imgsrc : null,//验证码图片src
			// 	code : null,
			// 	is_login_ing : null,
			// 	factor : null,
			// 	is_signfactoing : null,
			// 	recovery_code : null,
			// 	is_signrecoverying : null,
			// };

			// //登录请求
			// $scope.signin = function(){
			// 	//service.signin(login_form.login_name,login_form.login_password);
			// 	service.signin(this.signin_user,
			// 		function(data) {
	  //                   if (data.token !=null) {
   //              			localStorageService.set('token',data.token);
		 //                    $state.go("dashboard");
		 //                    return;
	  //                   }
	  //                   //错误处理
	  //                   console.log(data);
	  //                   var errors = config.errors.user_error;
	  //                   if (data.error_code == errors.not_found.code) {
	  //                   	console.log(errors.not_found.msg);
	  //                   }else if(data.error_code == errors.invalid_userinfo.code){
	  //                   	console.log(errors.invalid_userinfo.msg);
	  //                   }else if(data.error_code == errors.signin_limit.code){
	  //                   	console.log(errors.signin_limit.msg);
	  //                   }
	  //               },
	  //               function(error){
	  //                   $scope.signin_user.username = '';
	  //                   $scope.signin_user.password = '';
	  //               }
			// 	);
			// };



			//["$rootScope", "$scope", "$window", "$location", "$translate"]
			// var f = b.vm = {
			// 	weixin_login: !1,
			// 	weixin_login_obj: null,
			// 	weixin_unionid: "",
			// 	check_platform: kzi.helper.check_platform()
			// };
			// a.global.title = e.instant("outer_user.title_login");
			// var g = kzi.helper.get_query("name"),
			// 	i = kzi.helper.get_query("return_url");
			// b.status = {
			// 	message: "",
			// 	code: 0
			// }, b.signin_user = {}, b.is_login_ing = !1, i && "" !== i ? b.return_path = decodeURIComponent(i) : null !== a.global.return_path && (b.return_path = a.global.return_path, a.global.return_path = null), a.global.is_login && h(f.check_platform, b.return_path), g && (b.login_name = g), b.getcode = function() {
			// 	a.getcode(function(a) {
			// 		b.signin_user.imgsrc = a.image, b.signin_user.image_md5 = a.image_md5
			// 	}, function(a) {}, function(a) {})
			// }, b.iscode = !1, b.signin = function(d) {
			// 	b.signin_user.is_login_ing = !0, b.status = {
			// 		message: "",
			// 		code: 0
			// 	}, a.login(b.signin_user.name, b.signin_user.password, b.signin_user.code, b.signin_user.image_md5, null, function(a) {
			// 		b.iscode = !1, a.data.session.twofactor_enabled ? b.status.code = 1 : f.weixin_unionid ? c.location.href = "/login_weixin_success?unionid=" + f.weixin_unionid : h(f.check_platform, i)
			// 	}, function(a) {
			// 		var c;
			// 		a && (2034 === a.code && (b.iscode = !0, b.getcode()), c = _.find(kzi.statuses.user_error, {
			// 			code: a.code
			// 		})), c ? d.$errors.unshift(c.msg) : d.$errors.unshift(e.instant("outer_user.fail_login_try_again"))
			// 	}, function() {
			// 		b.signin_user.is_login_ing = !1
			// 	}), b.js_signin_twofactor = function(a) {
			// 		b.signin_user.is_signfactoing = !0, wt.data.user.signin_twofactor(b.signin_user.factor, b.signin_user.name, b.signin_user.password, function(a) {
			// 			h(f.check_platform, i)
			// 		}, function() {
			// 			a.$errors.unshift(e.instant("outer_user.err_twofactor_code"))
			// 		}, function() {
			// 			b.signin_user.is_signfactoing = !1
			// 		})
			// 	}, b.js_signin_recovery = function(a) {
			// 		b.signin_user.is_signrecoverying = !0, wt.data.user.signin_recovery(b.signin_user.recovery_code, b.signin_user.name, b.signin_user.password, function(a) {
			// 			f.weixin_unionid ? c.location.href = "/login_weixin_success?unionid=" + f.weixin_unionid : h(f.check_platform, i);
			// 		}, function() {
			// 			a.$errors.unshift(e.instant("outer_user.err_recovery_code"))
			// 		}, function() {
			// 			b.signin_user.is_signrecoverying = !1
			// 		})
			// 	}
			// }, f.js_change_login_mode = function(a) {
			// 	function c() {
			// 		null == f.weixin_login_obj && (f.weixin_login_obj = new WxLogin({
			// 			id: "weixin_qr_code",
			// 			appid: "wxeb56c6262610fd9d",
			// 			scope: "snsapi_login",
			// 			redirect_uri: encodeURIComponent(location.origin + "/weixin/auth"),
			// 			state: b.return_path,
			// 			style: "",
			// 			href: ""
			// 		}))
			// 	}
			// 	var d = a || "default";
			// 	switch(d) {
			// 		case "default":
			// 			f.weixin_login = !1;
			// 			break;
			// 		case "weixin":
			// 			f.weixin_login = !0, c();
			// 			break;
			// 		case "binding":
			// 			b.status.code = 0
			// 	}
			// };
			// var j = document.createElement("script");
			// j.src = "https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js", $("body").append(j)
	}])
	//注册界面
	.controller('RegisterCtrl', ['$scope', '$controller','config',
		function ($scope, $controller,config) {
			$controller('BaseCtrl', {$scope: $scope});
			$scope.action_type = 1;
			$scope.regist_phone_reminde_msg = null;
			$scope.regist_phone_code_reminde_msg = false;
			$scope.regist_email_reminde_msg = false;
			$scope.regist_password_reminde_msg = false;
			$scope.regist_display_name_reminde_msg = false;

			//提交注册信息
			$scope.signup = function(register_form){

			};

	}])
	//忘记密码界面
	.controller('ForgotCtrl', ['$scope', '$controller',
		function ($scope, $controller) {
	 		$controller('BaseCtrl', {$scope: $scope});		
	 		$scope.action_type = 2;		
 			
 	}])
	;

});






