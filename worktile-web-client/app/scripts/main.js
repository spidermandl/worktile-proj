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
            constant: 'constant/constant',
            //service
            global : 'service/global',
            util : 'service/util',
            center: 'service/center',
            account : 'service/account',
            api: 'service/api',
            team: 'service/team',
            track: 'service/track',
            project: 'service/project',
            upload: 'service/upload',
            markdown: 'service/markdown',
            scroll: 'service/scroll',
            locator: 'service/locator',
            feed: 'service/feed',
            shortcut: 'service/shortcut',
            quickswitch: 'service/quickswitch',
            task: 'service/task',
            event: 'service/event',
            file: 'service/file',
            post: 'service/post',
            page: 'service/page',
            feedback: 'service/feedback',
            time: 'service/time',
            //controller
			identity : 'controllers/identity',//身份进入
			dashboard : 'controllers/dashboard',
            search : 'controllers/search',
            team_ctrl: 'controllers/team_ctrl',
            team_admin_ctrl: 'controllers/team_admin_ctrl',
            project_ctrl: 'controllers/project_ctrl',
            project_task_ctrl: 'controllers/project_task_ctrl',
            project_event_ctrl: 'controllers/project_event_ctrl',
            project_file_ctrl: 'controllers/project_file_ctrl',
            project_post_ctrl: 'controllers/project_post_ctrl',
            project_page_ctrl: 'controllers/project_page_ctrl',
            project_graph_ctrl: 'controllers/project_graph_ctrl',
            notice: 'controllers/notice',
            entity_ctrl: 'controllers/entity_ctrl',
			//指令
			left_nemu : 'directive/left_menu',
            left_menu_project : 'directive/left_menu_project',
            left_menu_avatar : 'directive/left_menu_avatar',
            left_menu_notice: 'directive/left_menu_notice',
            toolkit : 'directive/toolkit',
            team_logo : 'directive/team_logo',
            project_item : 'directive/project_item',
            task_directive: 'directive/task_directive',
            slide: 'directive/slide',
            graph_statistics: 'directive/graph_statistics',
            new_editor: 'directive/new_editor',
            entity_comment: 'directive/entity_comment',
            //filter
            filters : 'filter/filters',
            //provider
            popbox : 'provider/popbox',
            notify: 'provider/notify',
　　　　 },
	    shim: {
            configuration: {
                deps: ['error','constant'],//deps 载入依赖模块
            },
            app: {
                deps: ['configuration'],
            },
            global:{
                deps: ['util','api','toolkit'],
            },
            center:{
                deps: ['feed','notify'],
            },
            identity: {
                deps: ['account'],
            },
			dashboard: {
		        deps: ['left_nemu','slide'],
			},
            search: {
                deps: ['left_nemu'],
            },
            team_ctrl: {
                deps: ['scroll','task_directive','project_item','team_admin_ctrl','markdown'],
            },
            project_ctrl:{
                deps: ['time','locator','entity_ctrl','project_event_ctrl',
                    'project_task_ctrl','project_file_ctrl','project_post_ctrl',
                    'project_page_ctrl','project_graph_ctrl','slide'],
            },
            entity_ctrl:{
                deps: ['new_editor','entity_comment'],
            },
            project_graph_ctrl:{
                deps: ['graph_statistics'],
            },
            left_nemu: {
                deps: ['center','shortcut','quickswitch','task','event','file','post','page','feedback','filters',
                    'popbox','notice','left_menu_project','left_menu_avatar','left_menu_notice','team'],
            },
            team: {
                deps: ['track','team_logo','project','upload'],
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
            'project_ctrl',
        ],
        function (app) {
            app.init();
        }
    );
})();