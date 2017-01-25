/**
 * @ngdoc overview
 * @name jtWorkApp
 * @description
 * # jtWorkApp
 *
 * Main module of the application.
 */
 define(['configuration'],function (configuration,require) {
    'use strict';

    var app = angular
      .module('jtWorkApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'w5c.validator',
      ]);

    app.init = function () {
        angular.bootstrap(document, ['jtWorkApp']);
    };

    app.constant('config',configuration);
    app.config(['$routeProvider',"w5cValidatorProvider","$locationProvider",'config',
        function ($routeProvider,w5cValidatorProvider,$locationProvider,config) {
          /**路由配置
           ********************************************************
           */
          $routeProvider
          // .when('/', {
          //   templateUrl: 'views/main.html',
          //   controller: 'MainCtrl',
          //   controllerAs: 'main'
          // })
          .when('/',{//登录页面
            templateUrl: config.templateUrls.dashboard,
            controller: 'WorkCtrl',
            controllerAs: 'dashboard'
          })
          .when('/about', {
            templateUrl: config.templateUrls.about,
            controller: 'AboutCtrl',
            controllerAs: 'about'
          })
          .when('/login',{//登录页面
            templateUrl: config.templateUrls.login,
            controller: 'LoginCtrl',
            controllerAs: 'login'
          })
          .when('/signup',{//注册页面
            templateUrl: config.templateUrls.signup,
            controller: 'RegisterCtrl',
            controllerAs: 'signup'
          })
          .when('/forgot',{//忘记密码
            templateUrl: config.templateUrls.forgot,
            controller: 'ForgotCtrl',
            controllerAs: 'forgot'
          })
          .when('/dashboard',{//dashboard页面
            templateUrl: config.templateUrls.dashboard,
            controller: 'WorkCtrl',
            controllerAs: 'dashboard'
          })
          .otherwise({
            redirectTo: '/'
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
      }]);

    return app;
});










