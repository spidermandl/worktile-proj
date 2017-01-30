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
        	configuration : 'constant/config',
			app : 'app',
			identity : 'controllers/identity',//身份进入
			work : 'controllers/work',
			dashboard : 'controllers/dashboard',
            search : 'controllers/search',
			//指令
			left_nemu_dir : 'directive/left_menu',
            //filter
            translate : 'filter/translate',
            //provider
            popbox : 'provider/popbox',
　　　　 },
	    shim: {
            app: {
                deps: [],
            },
			work: { 
		        deps: ['translate','left_nemu_dir','dashboard'],//模块work载入需要的其他模块
			},
            search: {
                deps: ['translate','left_nemu_dir'],
            },
            left_nemu_dir: {
                deps: ['popbox'],
            }
	    },
    });

    //init main
    require([
            'configuration',
            'app',
            'identity',
            'work',
            'search',
        ],
        function (configuration,app) {
            app.init();
        }
    );
})();