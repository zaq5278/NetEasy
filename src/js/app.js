/**
 * Created by qingyun on 16/11/30.
 */
//js程序入口
angular.module('cftApp',['ionic','cftApp.httpFactory','cftApp.slideBox','cftApp.tabs','cftApp.news','cftApp.live','cftApp.topic','cftApp.personal']).config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
    $stateProvider.state("tabs",{
        url:"/tabs",
        abstract:true,
        templateUrl:"tabs.html",
        controller:'tabsController'
    });
    //意外跳转
    $urlRouterProvider.otherwise('tabs/news');
}]);