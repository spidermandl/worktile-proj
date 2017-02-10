/**
 * @ngdoc overview
 * @name jtWorkApp
 * @description
 * # jtWorkApp
 *
 * Main module of the application.
 */
 define(['configuration','util'],function (configuration,util,require) {
    'use strict';

    var app = angular
      .module('jtWorkApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ui.router',//路由插件
        'w5c.validator',//本地submit信息验证
        'ui.bootstrap',//Bootstrap工具插件
        'LocalStorageModule',//本地存储
        'underscore',//underscore 方法库
      ]);

    app.init = function () {
        angular.bootstrap(document, ['jtWorkApp']);
    };

    app.constant('config',configuration);
    app.constant('util',util);
    //,'$urlRouterProvider','$stateProvider'
    app.config(['$routeProvider','$urlRouterProvider','$stateProvider',"w5cValidatorProvider",
                "$locationProvider",'$httpProvider','config','localStorageServiceProvider',
        function ($routeProvider,$urlRouterProvider,$stateProvider,w5cValidatorProvider,
                  $locationProvider,$httpProvider,config,localStorageServiceProvider) {
          /**路由配置
           ********************************************************
           */
          $urlRouterProvider//.when('','dashboard')
            .otherwise('/home');
          $stateProvider
            .state('home', {
                url: '/home',
                views:{
                    'proxy':{
                        template: '',
                        controller: 
                            function($rootScope,$state,$http,localStorageService) {
                                //返回未登录前的页面
                                var goOuterPage = function(){
                                    localStorageService.set('token',null);
                                    $rootScope.frame = 'guest';
                                    $state.go("signin");
                                };
                                
                                var token = localStorageService.get('token');
                                if( token == null){//没有授权token
                                    goOuterPage();
                                    return;
                                }
                                //$http.defaults.headers.common['authorization']= "Bearer "+token;
                                $http({
                                        method: 'GET', 
                                        url: 'http://localhost:8080/api/me/profile',
                                        //withCredentials: true, 
                                        headers: {
                                            'Authorization': "Bearer "+token, 
                                            'Content-Type' :"application/json;charset=utf-8",
                                        },  
                                    })
                                    .then(function(response) {
                                        return response.data;
                                    })
                                    .then(
                                        function(data) {
                                            if (data.error_code !=null) {
                                                goOuterPage();
                                                return;
                                            }
                                            $rootScope.frame = 'work';
                                            $state.go("dashboard");
                                        },
                                        function(error){
                                            goOuterPage();
                                        }
                                    );
                            },
                            
                        //css: ['css/base_outer.css','css/base_inner.css'],
                    },
                },
            })
            .state("root", {
                url: "",
                template: "<ui-view></ui-view>",//留给子state渲染
                controller: function($rootScope, global) {
                    console.log(global);
                    //设置全局变量
                    $rootScope.global = global;
                },
                resolve: {
                    global: ["globalDataContext",
                    function(context) {
                        return context.loadAll();
                    }]
                },
            })
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: config.templateUrls.dashboard_task,
                controller: 'DashboardTaskCtrl',
                parent: 'root',
                //css: 'css/base_inner.css',
            })
            .state("calendar", {
                url: "/calendar",
                templateUrl: config.templateUrls.dashboard_calendar,
                controller: "DashboardCalendarCtrl",
                header_menu: "dashboard",
                //parent: "home",
                //need_load: "true"
            })
            .state("calendar_subscribe", {
                url: "/calendar/subscribe",
                templateUrl: config.templateUrls.calendar_subscribe,
                controller: "CalendarSubscribeCtrl",
                header_menu: "dashboard",
                //parent: "home",
                need_load: !0
            }).state("feed", {
                url: "/feed",
                templateUrl: config.templateUrls.dashboard_activity_feed,
                controller: "DashboardActivityFeedCtrl",
                header_menu: "dashboard",
                //parent: "home",
                need_load: "true"
            }).state("email", {
                url: "/email",
                templateUrl: config.templateUrls.dashboard_email,
                controller: "DashboardEmailCtrl",
                header_menu: "dashboard",
                //parent: "home",
                need_load: "true"
            })
            .state("search", {
                url: "/search?{keywords:string}&{team_id:string}&{qpattern:string}&{noquery:string}",
                templateUrl: config.templateUrls.search,
                controller: "SearchPanelCtrl",
                header_menu: "search",
                //parent: "home",
                need_load: !1
            })
            .state('signin',{//登录页面
                url: '/signin',
                parent: "root",
                templateUrl: config.templateUrls.login,
                controller: 'LoginCtrl',
                //css: 'css/base_outer.css',
            })
            .state('/signup',{//注册页面
                url: '/signup',
                templateUrl: config.templateUrls.signup,
                controller: 'RegisterCtrl',
            })
            .state('/forgot',{//忘记密码
                url: '/forgot',
                templateUrl: config.templateUrls.forgot,
                controller: 'ForgotCtrl',
            }).state("dashboard.default", {
                url: "",
                templateUrl: config.templateUrls['dashboard.default'],
                controller: "DashboardTaskCtrl",
                // header_menu: "dashboard",
                // need_load: !1,
                // parent: 'home',
            });

          /*
           ===========================================================
           */
          // 用户名验证配置
          // 全局配置
          w5cValidatorProvider.config({
              blurTrig   : false,
              showError  : false,
              removeError: true

          });
          // 设置验证提示信息
          w5cValidatorProvider.setRules(config.VALIDATE_ERROR);
          // use the HTML5 History API
          $locationProvider.html5Mode(true);

          //本地存储
          localStorageServiceProvider.setDefaultToCookie(false);
          // //http设置
          //$httpProvider.defaults.useXDomain = true;
          // //$httpProvider.defaults.withCredentials = true;  
          //$httpProvider.defaults.headers.common = { 'Access-Control-Allow-Origin' : '*'};
          //$httpProvider.defaults.headers.common['Authorization'] = 'Bearer ' ;
          //delete $httpProvider.defaults.headers.common['X-Requested-With'];             
      }]);

    return app;
});


// a.state("home", {
 //            url: "",
 //            template: "<ui-view></ui-view>",
 //            controller: ["$rootScope", "global",
 //            function(a, b) {
 //                a.global.loading_init = !0
 //            }],
 //            resolve: {
 //                global: ["globalDataContext",
 //                function(a) {
 //                    return a.loadAll()
 //                }]
 //            }
 //        }).state("share", {
 //            url: "/share",
 //            templateUrl: "/tpl/single_page/share.html",
 //            controller: "shareCtrl",
 //            header_menu: "",
 //            parent: "home",
 //            need_load: !1
 //        }).state("dashboard", {
 //            url: "/dashboard",
 //            template: "<ui-view></ui-view>",
 //            header_menu: "dashboard",
 //            need_load: !0,
 //            abstract: !0,
 //            parent: "home"
 //        }).state("email", {
 //            url: "/email",
 //            templateUrl: "/tpl/dashboard/dashboardEmail.html",
 //            controller: "dashboardEmailCtrl",
 //            header_menu: "dashboard",
 //            parent: "home",
 //            need_load: "true"
 //        }).state("calendar", {
 //            url: "/calendar",
 //            templateUrl: "/tpl/dashboard/dashboardCalendar.html",
 //            controller: "dashboardCalendarCtrl",
 //            header_menu: "dashboard",
 //            parent: "home",
 //            need_load: "true"
 //        }).state("feed", {
 //            url: "/feed",
 //            templateUrl: "/tpl/dashboard/dashboardActivityFeed.html",
 //            controller: "dashboardActivityFeedCtrl",
 //            header_menu: "dashboard",
 //            parent: "home",
 //            need_load: "true"
 //        }).state("dashboard.default", {
 //            url: "",
 //            templateUrl: "/tpl/dashboard/dashboardTask.html",
 //            controller: "dashboardTaskCtrl",
 //            header_menu: "dashboard",
 //            need_load: "true"
 //        }).state("calendar_subscribe", {
 //            url: "/calendar/subscribe",
 //            templateUrl: "/tpl/calendar/calendar_subscribe.html",
 //            controller: "calendarSubscribeCtrl",
 //            header_menu: "dashboard",
 //            parent: "home",
 //            need_load: !0
 //        }).state("search", {
 //            url: "/search?{keywords:string}&{team_id:string}&{qpattern:string}&{noquery:string}",
 //            templateUrl: "/ycjs/directive/search/search_panel.html",
 //            controller: "wtSearchPanelCtl",
 //            header_menu: "search",
 //            parent: "home",
 //            need_load: !1
 //        }).state("projects", {
 //            url: "/projects",
 //            templateUrl: "/tpl/dashboard/projects.html",
 //            controller: "dashboardProjectsCtrl",
 //            header_menu: "",
 //            parent: "home",
 //            need_load: !0
 //        }).state("project_not_found", {
 //            url: "/project/:pid/notfound",
 //            templateUrl: "/tpl/project/prj_not_found.html",
 //            controller: "projectNotfoundCtrl",
 //            header_menu: "project",
 //            parent: "home",
 //            need_load: !1
 //        }).state("project", {
 //            url: "/project/:pid",
 //            templateUrl: "/tpl/project/project.html",
 //            controller: "projectHomeCtrl",
 //            resolve: {
 //                fastProject: ["$stateParams", "globalDataContext",
 //                function(a, b) {
 //                    return b.getProject(a.pid, !0, !0).then(function(a) {
 //                        return a ? a: null
 //                    })
 //                }]
 //            },
 //            header_menu: "project",
 //            project_iconmenu: "task",
 //            need_load: !0,
 //            parent: "home"
 //        }).state("project.task", {
 //            url: "/task",
 //            header_menu: "project",
 //            project_iconmenu: "task",
 //            need_load: !1,
 //            views: {
 //                "": {
 //                    templateUrl: "/tpl/project/task/tasks.html",
 //                    controller: "projectTasksCtrl"
 //                },
 //                toolbar: {
 //                    templateUrl: "/tpl/project/task/toolbar.html",
 //                    controller: "projectTasksToolbarCtrl"
 //                }
 //            }
 //        }).state("project.task.detail", {
 //            url: "/:tid",
 //            header_menu: "project",
 //            project_iconmenu: "task",
 //            need_load: !1,
 //            template: "",
 //            controller: "projectTaskDetailCtrl"
 //        }).state("project.post", {
 //            url: "/post",
 //            header_menu: "project",
 //            project_iconmenu: "post",
 //            need_load: !1,
 //            views: {
 //                toolbar: {
 //                    templateUrl: "/tpl/project/post/toolbar.html",
 //                    controller: "projectPostsToolbarCtrl"
 //                },
 //                "": {
 //                    templateUrl: "/tpl/project/post/posts.html",
 //                    controller: "projectPostsCtrl"
 //                }
 //            }
 //        }).state("project.post.detail", {
 //            url: "/:post_id",
 //            header_menu: "project",
 //            project_iconmenu: "post",
 //            need_load: !1,
 //            template: "",
 //            controller: "projectPostDetailCtrl"
 //        }).state("project.file", {
 //            url: "/file",
 //            header_menu: "project",
 //            project_iconmenu: "file",
 //            need_load: !1,
 //            views: {
 //                toolbar: {
 //                    templateUrl: "/tpl/project/file/toolbar.html",
 //                    controller: "projectFilesToolbarCtrl"
 //                },
 //                "": {
 //                    templateUrl: "/tpl/project/file/files.html",
 //                    controller: "projectFilesCtrl"
 //                }
 //            }
 //        }).state("project.file.detail", {
 //            url: "/:fid",
 //            header_menu: "project",
 //            project_iconmenu: "file",
 //            need_load: !1,
 //            template: "",
 //            controller: "projectFileDetailCtrl"
 //        }).state("project.folder", {
 //            url: "/folder/:folder_id",
 //            header_menu: "project",
 //            project_iconmenu: "file",
 //            need_load: !1,
 //            views: {
 //                "": {
 //                    templateUrl: "/tpl/project/file/files.html",
 //                    controller: "projectFilesCtrl"
 //                },
 //                toolbar: {
 //                    templateUrl: "/tpl/project/file/toolbar.html",
 //                    controller: "projectFilesToolbarCtrl"
 //                }
 //            }
 //        }).state("project.folder.fileDetail", {
 //            url: "/:fid",
 //            header_menu: "project",
 //            project_iconmenu: "file",
 //            need_load: !1,
 //            template: "",
 //            controller: "projectFileDetailCtrl"
 //        }).state("project.page", {
 //            url: "/page",
 //            header_menu: "project",
 //            project_iconmenu: "page",
 //            views: {
 //                toolbar: {
 //                    template: '<ui-view name="toolbar"></ui-view>'
 //                },
 //                "": {
 //                    template: "<ui-view></ui-view>",
 //                    controller: "projectPagesHomeCtrl"
 //                }
 //            },
 //            need_load: !1,
 //            abstract: !0
 //        }).state("project.page.list", {
 //            url: "",
 //            header_menu: "project",
 //            project_iconmenu: "page",
 //            need_load: !1,
 //            views: {
 //                toolbar: {
 //                    templateUrl: "/tpl/project/page/toolbar.html",
 //                    controller: "projectPagesToolbarCtrl"
 //                },
 //                "": {
 //                    templateUrl: "/tpl/project/page/pages.html",
 //                    controller: "projectPagesCtrl"
 //                }
 //            }
 //        }).state("project.page.add", {
 //            url: "/add",
 //            header_menu: "project",
 //            project_iconmenu: "page",
 //            need_load: !1,
 //            views: {
 //                toolbar: {
 //                    templateUrl: "/tpl/project/page/add_toolbar.html",
 //                    controller: "projectPageAddToolbarCtrl"
 //                },
 //                "": {
 //                    templateUrl: "/tpl/project/page/add_or_edit_page.html",
 //                    controller: "projectPageAddEditCtrl"
 //                }
 //            }
 //        }).state("project.page.children_add", {
 //            url: "/add/:parent_page_id",
 //            header_menu: "project",
 //            project_iconmenu: "page",
 //            need_load: !1,
 //            views: {
 //                toolbar: {
 //                    templateUrl: "/tpl/project/page/add_toolbar.html",
 //                    controller: "projectPageAddToolbarCtrl"
 //                },
 //                "": {
 //                    templateUrl: "/tpl/project/page/add_or_edit_page.html",
 //                    controller: "projectPageAddEditCtrl"
 //                }
 //            }
 //        }).state("project.page.list.detail", {
 //            url: "/:page_id",
 //            header_menu: "project",
 //            project_iconmenu: "page",
 //            need_load: !1,
 //            controller: "pagesDetailCtrl",
 //            template: ""
 //        }).state("project.page.edit", {
 //            url: "/:page_id/edit",
 //            header_menu: "project",
 //            project_iconmenu: "page",
 //            need_load: !0,
 //            views: {
 //                toolbar: {
 //                    templateUrl: "/tpl/project/page/add_toolbar.html",
 //                    controller: "projectPageAddToolbarCtrl"
 //                },
 //                "": {
 //                    templateUrl: "/tpl/project/page/add_or_edit_page.html",
 //                    controller: "projectPageAddEditCtrl"
 //                }
 //            }
 //        }).state("project.page.diff", {
 //            url: "/:page_id/versions",
 //            templateUrl: "/tpl/project/page/version_diff.html",
 //            controller: "projectPageVerDiffCtrl",
 //            header_menu: "project",
 //            project_iconmenu: "page",
 //            need_load: !0
 //        }).state("project.page_shimo_detail", {
 //            url: "/page_shimo/:page_id",
 //            header_menu: "project",
 //            project_iconmenu: "page",
 //            need_load: !1,
 //            template: "",
 //            resolve: {
 //                page: ["$stateParams", "$location", "$window",
 //                function(a, b, c) {
 //                    return wt.data.page.get(a.pid, a.page_id,
 //                    function(a) {
 //                        c.location = a.data.join_url
 //                    },
 //                    function(c) {
 //                        b.path("/project/" + a.pid + "/page")
 //                    }).then(function(a) {
 //                        return a.data
 //                    },
 //                    function(c) {
 //                        return b.path("/project/" + a.pid + "/page"),
 //                        null
 //                    })
 //                }]
 //            }
 //        }).state("project.event", {
 //            url: "/event",
 //            header_menu: "project",
 //            project_iconmenu: "event",
 //            need_load: !1,
 //            views: {
 //                "": {
 //                    templateUrl: "/tpl/project/event/events.html",
 //                    controller: "projectEventsCtrl"
 //                },
 //                toolbar: {
 //                    templateUrl: "/tpl/project/event/toolbar.html",
 //                    controller: "projectEventsToolbarCtrl"
 //                }
 //            }
 //        }).state("project.event.detail", {
 //            url: "/:event_id",
 //            header_menu: "project",
 //            project_iconmenu: "event",
 //            need_load: !1,
 //            template: "",
 //            controller: "eventDetailCtrl"
 //        }).state("project.graph", {
 //            url: "/graph",
 //            header_menu: "project",
 //            project_iconmenu: "graph",
 //            need_load: !1,
 //            views: {
 //                toolbar: {
 //                    templateUrl: "/tpl/project/graph/toolbar.html",
 //                    controller: "projectGraphToolbarCtrl"
 //                },
 //                "": {
 //                    templateUrl: "/tpl/project/graph/graphs.html",
 //                    controller: "projectGraphCtrl"
 //                }
 //            }
 //        }).state("project.activity", {
 //            url: "/activity",
 //            templateUrl: "/tpl/activity/project_activities.html",
 //            controller: "projectActivityCtrl",
 //            header_menu: "project",
 //            project_iconmenu: "activity",
 //            need_load: !0
 //        }).state("project.trash", {
 //            url: "/trash",
 //            templateUrl: "/tpl/project/trash/project_trash.html",
 //            controller: "projectTrashCtrl",
 //            header_menu: "project",
 //            project_iconmenu: "trash",
 //            need_load: !0
 //        }).state("project.archive", {
 //            url: "/archive",
 //            templateUrl: "/tpl/project/task/project_archive_tasks.html",
 //            controller: "projectArchiveTasksCtrl",
 //            header_menu: "project",
 //            project_iconmenu: "task_archive",
 //            need_load: !1
 //        }).state("team", {
 //            url: "/teams/:team_id",
 //            templateUrl: "/tpl/team/team.html",
 //            abstract: !0,
 //            header_menu: "team",
 //            parent: "home",
 //            need_load: !0,
 //            controller: "teamCtrl",
 //            resolve: {
 //                team: ["$stateParams",
 //                function(a) {
 //                    return wt.data.team.get_basic(a.team_id,
 //                    function() {},
 //                    function(a) {}).then(function(a) {
 //                        return a.data.data
 //                    },
 //                    function(a) {
 //                        return null
 //                    })
 //                }]
 //            }
 //        }).state("team.projects", {
 //            url: "",
 //            templateUrl: "/tpl/team/team_projects.html",
 //            controller: "team_projects_ctrl",
 //            header_menu: "team",
 //            need_load: !0
 //        }).state("team.members", {
 //            url: "/members",
 //            templateUrl: "/tpl/team/team_members.html",
 //            controller: "teamMembersCtrl",
 //            header_menu: "team",
 //            need_load: !0
 //        }).state("team.tasks", {
 //            url: "/tasks",
 //            templateUrl: "/tpl/team/team_tasks.html",
 //            controller: "team_tasks_ctrl",
 //            header_menu: "team",
 //            parent: "team",
 //            need_load: !0
 //        }).state("team.graphs", {
 //            url: "/graphs",
 //            templateUrl: "/tpl/team/team_graphs.html",
 //            controller: "team_graphs_ctrl",
 //            header_menu: "team",
 //            parent: "team",
 //            need_load: !0
 //        }).state("team.calendar", {
 //            url: "/calendar",
 //            header_menu: "team",
 //            parent: "team",
 //            need_load: !0,
 //            views: {
 //                "": {
 //                    templateUrl: "/tpl/team/team_calendar.html",
 //                    controller: "teamCalendarCtrl"
 //                },
 //                sidebar: {
 //                    templateUrl: "/tpl/team/team_calendar_sidebar.html",
 //                    controller: "teamCalendarSidebarCtrl"
 //                }
 //            }
 //        }).state("team.quit", {
 //            url: "/quit",
 //            templateUrl: "/tpl/team/team_quit.html",
 //            controller: "teamQuitCtrl",
 //            header_menu: "team",
 //            need_load: !0
 //        }).state("team.admin", {
 //            url: "/admin",
 //            templateUrl: "/tpl/team/team_admin.html",
 //            header_menu: "team",
 //            parent: "team",
 //            need_load: !0,
 //            controller: "teamAdminHomeCtrl"
 //        }).state("team.admin.custom", {
 //            url: "/custom",
 //            templateUrl: "/tpl/team/team_admin_custom.html",
 //            controller: "teamAdminCustomCtrl",
 //            header_menu: "team",
 //            need_load: !0
 //        }).state("team.admin.basic", {
 //            url: "/basic",
 //            templateUrl: "/tpl/team/team_admin_basic.html",
 //            controller: "teamAdminBasicCtrl",
 //            header_menu: "team",
 //            need_load: !0
 //        }).state("team.admin.members", {
 //            url: "/members",
 //            templateUrl: "/tpl/team/team_admin_members.html",
 //            controller: "teamAdminMembersCtrl",
 //            header_menu: "team",
 //            need_load: !0
 //        }).state("team.admin.projects", {
 //            url: "/projects",
 //            templateUrl: "/tpl/team/team_admin_projects.html",
 //            controller: "teamAdminProjectsCtrl",
 //            header_menu: "team",
 //            need_load: !0
 //        }).state("team.admin.security", {
 //            url: "/security",
 //            templateUrl: "/tpl/team/team_admin_security.html",
 //            controller: "teamAdminSecurityCtrl",
 //            header_menu: "team",
 //            need_load: !0
 //        }).state("team.create", {
 //            url: "/security",
 //            templateUrl: "/tpl/team/pop_team_create.html",
 //            controller: "team_create_ctrl",
 //            header_menu: "team",
 //            need_load: !0
 //        }).state("team.join", {
 //            url: "/security",
 //            templateUrl: "/tpl/team/team_join.html",
 //            controller: "team_join_ctrl",
 //            header_menu: "team",
 //            need_load: !0
 //        }).state("account", {
 //            url: "/account",
 //            templateUrl: "/tpl/account/account_settings.html",
 //            controller: "accountSettingsCtrl",
 //            header_menu: "",
 //            parent: "home",
 //            need_load: !1,
 //            resolve: {
 //                account: [function() {
 //                    return wt.data.account.get_basic().then(function(a) {
 //                        return a.data.data
 //                    },
 //                    function() {
 //                        return null
 //                    })
 //                }]
 //            }
 //        }).state("account.settings", {
 //            url: "/settings",
 //            templateUrl: "/tpl/account/account_profile.html",
 //            controller: "accountProfileCtrl",
 //            header_menu: "",
 //            need_load: !1
 //        }).state("account.change_email", {
 //            url: "/change_email",
 //            templateUrl: "/tpl/account/account_profile_change_email.html",
 //            controller: "accountProfileChangeEmailCtrl",
 //            header_menu: "",
 //            header_nav_menu: "account_baseinfo",
 //            need_load: !1
 //        }).state("account.change_phone", {
 //            url: "/change_phone",
 //            templateUrl: "/tpl/account/account_profile_change_phone.html",
 //            controller: "accountProfileChangePhoneCtrl",
 //            header_menu: "",
 //            header_nav_menu: "account_baseinfo",
 //            need_load: !1
 //        }).state("account.individuation", {
 //            url: "/individuation",
 //            templateUrl: "/tpl/account/account_individuation.html",
 //            controller: "accountIndividuationCtrl",
 //            header_menu: "",
 //            need_load: !1
 //        }).state("account.message", {
 //            url: "/message",
 //            templateUrl: "/tpl/account/account_message.html",
 //            controller: "accountMessageCtrl",
 //            header_menu: "",
 //            need_load: !0
 //        }).state("account.security", {
 //            url: "/security",
 //            templateUrl: "/tpl/account/account_security.html",
 //            controller: "accountSecurityCtrl",
 //            header_menu: "",
 //            need_load: !0
 //        }).state("account.apps", {
 //            url: "/apps",
 //            templateUrl: "/tpl/account/account_apps.html",
 //            controller: "accountAppsCtrl",
 //            header_menu: "",
 //            need_load: !0
 //        }).state("account.thirdparty", {
 //            url: "/thirdparty",
 //            templateUrl: "/tpl/account/account_thirdparty.html",
 //            controller: "accountThirdpartyCtrl",
 //            header_menu: "",
 //            need_load: !0
 //        }).state("profile", {
 //            url: "/user/:username",
 //            templateUrl: "/app/js/service/profile/profile.html",
 //            controller: "profileCtrl",
 //            abstract: !0,
 //            header_menu: "",
 //            parent: "home",
 //            need_load: !0,
 //            resolve: {
 //                profile: ["$stateParams", "$state",
 //                function(a, b) {
 //                    return wt.data.profile.get_basic(a.username,
 //                    function() {},
 //                    function() {}).then(function(a) {
 //                        return a.data.data
 //                    },
 //                    function(a) {
 //                        b.go("not_found", {
 //                            type: "profile"
 //                        })
 //                    })
 //                }],
 //                teams: ["profile",
 //                function(a) {
 //                    return wt.data.profile.get_teams(a.uid,
 //                    function() {},
 //                    function() {}).then(function(a) {
 //                        return a.data.data
 //                    },
 //                    function(a) {
 //                        return []
 //                    })
 //                }]
 //            }
 //        }).state("profile.info", {
 //            url: "",
 //            templateUrl: "/app/js/service/profile/profile_info.html",
 //            controller: "profileInfoCtrl",
 //            header_menu: "",
 //            need_load: !1
 //        }).state("profile.tasks", {
 //            url: "/tasks",
 //            templateUrl: "/app/js/service/profile/profile_tasks.html",
 //            controller: "profileTasksCtrl",
 //            header_menu: "",
 //            need_load: !1
 //        }).state("profile.graph", {
 //            url: "/graph",
 //            templateUrl: "/app/js/service/profile/profile_graph.html",
 //            controller: "profileGraphCtrl",
 //            header_menu: "",
 //            need_load: !1
 //        }).state("not_found", {
 //            url: "/not_found/:type",
 //            templateUrl: "/tpl/404.html",
 //            need_load: !1,
 //            header_menu: "index",
 //            controller: "notFoundCtrl",
 //            parent: "home",
 //            is_outter: !0
 //        }),







