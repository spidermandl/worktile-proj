'use strict';

/**
 * @ngdoc overview
 * @name jtWorkApp
 * @description
 * # jtWorkApp
 *
 * Main module of the application.
 */
angular
  .module('jtWorkApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'w5c.validator',
  ])
  .config(['$routeProvider',"w5cValidatorProvider",function ($routeProvider,w5cValidatorProvider) {
      //路由配置
      $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/login',{     //登录页面
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .otherwise({
        redirectTo: '/'
      });
      // 用户名验证配置
      // 全局配置
      w5cValidatorProvider.config({
          blurTrig   : false,
          showError  : true,
          removeError: true

      });
      w5cValidatorProvider.setRules({
          email : {
              required: "输入的邮箱地址不能为空",
              email   : "输入邮箱地址格式不正确"
          },
      });

  }]);
