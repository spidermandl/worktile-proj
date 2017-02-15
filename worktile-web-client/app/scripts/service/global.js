/**
 * @ngdoc function
 * @name jtWorkApp.service:globalDataContext
 * @description
 * 全局缓存数据 service
 * Controller of the jtWorkApp
 */
define(['app'], function (app) {
 	'use strict';

	app.service('globalDataContext', ['$http','api','$rootScope','localStorageService','$state','config','$q',
		function ($http,api,$rootScope,localStorageService,$state,config,$q) {
			/**
			 *用户登出
			 */
			$rootScope.logout = function(){
				api.me_logout(
					function(data){
						localStorageService.set('token',null);
						//$rootScope.global = null;
						$state.go('home');
					},
					function(error){
					}
				);
			};
			/**
			 * 用户是否登录
			 */
			$rootScope.isLogin = function(){
				if (localStorageService.get('token')==null || context.me ==null) {
					return false;
				}
				return true;
			};
			/**
			 * 全局上下文数据
			 */
			var context = {
				frame :null, //首页面类型 work or guest

				//加载等待阶段
				loading_init : true,
				i18n_loading_done : true,
				//左控制栏
				header_menu : '',
				leftmenu_current_expand : '',//当前展开的面板
				//loading_done : true,

				me : null,//用户基本信息

				constant : config,//常量

				/**
				 * team相关
				 */
				team : {
						dismiss: function(a) {
							var b = i.getTeam(a);
							i.teams.splice(i.teams.indexOf(b), 1),
							i.projects = _.reject(i.projects,
								function(b) {
									return b.team_id === a
								}),
							i.setTeamProjects()
						},
						sync: function(a, b) {
							var c = i.getTeam(a);
							_.map(b,
								function(a, b) {
									void 0 !== c[b] && (c[b] = a)
								})
						},
						remove_member: function(a, b) {
							var c = _.find(i.teams, {
								team_id: a
							});
							c && (c.member_count = c.member_count - 1);
							var d = _.reject(i.projects,
								function(b) {
									return b.team_id === a
								});
							_.forEach(d,
								function(a) {
									a.member_count = a.member_count - 1,
										a.members && (a.members = _.reject(a.members, {
											uid: b
										})),
										a.pid == i.project.pid && (i.project.info.members = _.reject(i.project.info.members, {
											uid: b
										}), _.forEach(i.project.tasks,
											function(a) {
												a.members = _.reject(a.members, {
													uid: b
												})
											}))
								})
						},
						leave: function(a) {
							i.teams = _.reject(i.teams,
									function(b) {
										return b.team_id === a
									}),
								i.projects = _.reject(i.projects,
									function(b) {
										return b.team_id === a
									})
						},
						update_base: function(a, b, c, d) {
							var e = _.find(i.teams, {
								team_id: a
							});
							e && (e.name = b, e.desc = c, e.url = d)
						},
						set_logo: function(a, b) {
							var c = _.find(i.teams, {
								team_id: a
							});
							c && (c.pic = b)
						},
						update_visibility: function(a, b) {
							var c = _.find(i.teams, {
								team_id: a
							});
							c && (c.visibility = b)
						}
					}
					
			};

			return {
				/**
				 * 加载所有缓存信息
				 **/
				loadAll :function(){
					/**
					* 加载个人信息
					*/
					if ($rootScope.isLogin() == false) {
						api.me_profile(
							function(data){
								context.me = data.data;
							},
							function(error){
								context.me = null;
							}
						);
					}

					return context;

		            // if (!_.isEmpty(i.projects)) {
		            //     var c = a.defer();
		            //     return c.resolve(i),
		            //     c.promise
		            // }
		            // return a.all([wt.data.team.get_list(), wt.data.project.get_all("active"), wt.data.notice.unread_count(), wt.data.account.get_contacts()]).then(function(a) {
		            //     return _.map(a[0].data.data,
		            //     function(a) {
		            //         var b = i.getTeam(a.team_id);
		            //         b ? (delete b.faked, _.extend(b, a)) : i.teams.push(a)
		            //     }),
		            //     i.projects = _.sortBy(a[1].data.data,
		            //     function(a) {
		            //         return a.pos
		            //     }),
		            //     i.star_projects = _.filter(i.projects,
		            //     function(a) {
		            //         return a.is_star
		            //     }),
		            //     b.global.unread_count = a[2].data.data,
		            //     i.contacts = a[3].data.data,
		            //     i.setTeamProjects(),
		            //     i
		            // },
		            // function(a) {
		            //     return i
		            // })
				}
			};
		}
	]);
});









