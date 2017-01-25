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
			identity : 'controllers/identity',
			work : 'controllers/work',
　　　　}
    });

    //init main
    require([
        'configuration',
        'app',
        'identity',
        'work',
        ],
        function (configuration,app) {
            app.init();
        }
    );
})();