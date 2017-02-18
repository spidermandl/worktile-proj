/**
* 程序入口
*/
(function () {
    requirejs.config({
        // baseUrl: './app/js/',
        // paths: {
        //     assets: '../../assets/',
        //     css: '../../assets/lib/requirejs/css',
        //     text: '../../assets/lib/requirejs/text',
        //     views: '../views',
        //     config: 'config/global',
        //     'angular-resource': '../../assets/lib/angularjs/1.3.9/angular-resource'
        // },
        // shim: {},
        // urlArgs: 'v=201502100127&r='+Math.random()
        paths: {
            app : 'app',//app.js
        	configuration : 'constant/config',
            error : 'constant/error',
            //service
            util : 'service/util',
            global : 'service/global',
            account : 'service/account',
            work : 'service/work',
            api: 'service/api',
            team: 'service/team',
            //controller
			identity : 'controllers/identity',//身份进入
			dashboard : 'controllers/dashboard',
            search : 'controllers/search',
            team_ctrl: 'controllers/team_ctrl',
			//指令
			left_nemu : 'directive/left_menu',
            left_menu_project : 'directive/left_menu_project',
            left_menu_avatar : 'directive/left_menu_avatar',
            toolkit : 'directive/toolkit',
            team_logo : "directive/team_logo",
            //filter
            //translate : 'filter/translate',
            filters : 'filter/filters',
            //provider
            popbox : 'provider/popbox',
　　　　 },
	    shim: {
            configuration: {
                deps: ['error'],//deps 载入依赖模块
            },
            app: {
                deps: ['configuration','util'],
            },
            global:{
                deps: ['api','toolkit'],
            },
            identity: {
                deps: ['account'],
            },
			dashboard: {
		        deps: ['left_nemu'],
			},
            search: {
                deps: ['left_nemu'],
            },
            team_ctrl: {
                deps: [],
            },
            left_nemu: {
                deps: ['filters','popbox','left_menu_project','left_menu_avatar','work','team'],
            },
            team: {
                deps: ['team_logo'],
            },
	    },
    });

    //init main
    require([
            'app',
            'global',
            'identity',
            'dashboard',
            'search',
            'team_ctrl',
        ],
        function (app) {
            app.init();
        }
    );
})();