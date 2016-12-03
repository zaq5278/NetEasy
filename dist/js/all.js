/**
 * Created by qingyun on 16/11/30.
 */
//js程序入口
angular.module('cftApp',['ionic','cftApp.httpFactory','cftApp.slideBox','cftApp.tabs','cftApp.news','cftApp.live','cftApp.topic','cftApp.personal']).config(['$stateProvider','$urlRouterProvider','$ionicConfigProvider',function ($stateProvider,$urlRouterProvider,$ionicConfigProvider) {
    $ionicConfigProvider.views.transition('ios');
    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.navBar.alignTitle('center');
    $ionicConfigProvider.tabs.style('standard');
    $stateProvider.state("tabs",{
        url:"/tabs",
        abstract:true,
        templateUrl:"tabs.html",
        controller:'tabsController'
    });
    //意外跳转
    $urlRouterProvider.otherwise('tabs/news');
}]);
/**
 * Created by qingyun on 16/11/30.
 */
angular.module('cftApp.live',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.live',{
        url:'/live',
        views:{
            'tabs-live':{
                templateUrl:'live.html',
                controller:'liveController'
            }
        }
    });
}]).controller('liveController',['$scope',function ($scope) {

}]);
/**
 * Created by qingyun on 16/11/30.
 */
angular.module('cftApp.news',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.news',{
        url:'/news',
        views:{
            'tabs-news':{
                templateUrl:'news.html',
                controller:'newsController'
            }
        }
    });
}]).controller('newsController',['$scope','HttpFactory',function ($scope,HttpFactory) {
    $scope.news = {
        newsArray:''
    };
    var url = "http://c.3g.163.com/recommend/getSubDocPic?tid=T1348647909107&from=toutiao&offset=0&size=10";
    HttpFactory.getData(url).then(function (result) {
        $scope.news.newsArray = result;
        // console.log($scope.news.newsArray[0]);
    });
}]);
/**
 * Created by qingyun on 16/11/30.
 */
angular.module('cftApp.personal',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.personal',{
        url:'/personal',
        views:{
            'tabs-personal':{
                templateUrl:'personal.html',
                controller:'personalController'
            }
        }
    });
}]).controller('personalController',['$scope',function ($scope) {

}]);
/**
 * Created by qingyun on 16/11/30.
 */
angular.module('cftApp.tabs',[]).controller('tabsController',['$scope',function ($scope) {
    $scope.$on('$stateChangeSuccess',function (evt,current,previous) {
        var update_wx_title = function(title) {
            var body = document.getElementsByTagName('body')[0];
            document.title = title;
            var iframe = document.createElement("iframe");
            iframe.setAttribute("src", "../empty.png");
            iframe.addEventListener('load', function() {
                setTimeout(function() {
                    // iframe.removeEventListener('load');
                    document.body.removeChild(iframe);
                });
            });
            document.body.appendChild(iframe);
        };
        switch (current.url){
            case '/news':
                update_wx_title("新闻");
                break;
            case '/live':
                update_wx_title("直播");
                break;
            case '/topic':
                update_wx_title("话题");
                break;
            case '/personal':
                update_wx_title("我的");
                break;

        }


    });
}]);
/**
 * Created by qingyun on 16/11/30.
 */
angular.module('cftApp.topic',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.topic',{
        url:'/topic',
        views:{
            'tabs-topic':{
                templateUrl:'topic.html',
                controller:'topicController'
            }
        }
    });
}]).controller('topicController',['$scope',function ($scope) {

}]);
/**
 * Created by qingyun on 16/12/2.
 */
angular.module('cftApp.httpFactory',[]).factory('HttpFactory',['$http','$q',function ($http,$q) {
    return {
        getData:function (url,type) {
            if (url){
                var promise = $q.defer();
                url = "http://localhost:3000/?myUrl=" + encodeURIComponent(url);
                type = type ? type:"GET";
                $http({
                    url:url,
                    method:type,
                    timeout:20000
                }).then(function (reslut) {
                    reslut =reslut.data;
                    reslut = reslut[Object.keys(reslut)[0]];
                    promise.resolve(reslut);
                },function (err) {
                    promise.reject(err);
                });
                return promise.promise;
            }
        }
    };
}]);
/**
 * Created by qingyun on 16/12/2.
 */
angular.module('cftApp.slideBox',[]).directive('mgSlideBox',[function () {
    return{
        restrict:"E",
        scope:{sourceArray:'@'},
        templateUrl:'slideBox.html',
        replace:true,
        link:function (scope,tElement,tAtts) {
            scope.newArray = [1,2,3,4,5];
            var lastSpan = tElement[0].lastChild;
            scope.$watch('sourceArray',function (newVal,oldVal) {
                if (newVal){
                    newVal = JSON.parse(newVal);
                    scope.newArray = newVal.ads;
                    lastSpan.innerText = scope.newArray[0].title;
                }
            });

            scope.slideHasChanged = function (index) {
                lastSpan.innerText = scope.newArray[index].title;
            }
        }
    };
}]);