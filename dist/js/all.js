/**
 * Created by qingyun on 16/11/30.
 */
//js程序入口
angular.module('cftApp',['ionic','cftApp.urls','cftApp.httpFactory','cftApp.slideBox','cftApp.tabs','cftApp.news','cftApp.live','cftApp.topic','cftApp.personal','cftApp.news1','cftApp.news2']).config(['$stateProvider','$urlRouterProvider','$ionicConfigProvider',function ($stateProvider,$urlRouterProvider,$ionicConfigProvider) {
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
    $stateProvider.state("newsDetail",{
        url:"/newsDetail",
        templateUrl:"newsDetail.html"
    });
    // $stateProvider.state("tabs.newsDetail",{
    //     url:"/newsDetail",
    //     views:{
    //         'tabs-news':{
    //             templateUrl:"newsDetail.html"
    //         }
    //     }
    // });
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
                templateUrl:'news.html'
            }
        }
    });
}]).controller('newsController',['$scope','$ionicPopup','$ionicSlideBoxDelegate','$state','$sce','HttpFactory','UrlArray',function ($scope,$ionicPopup,$ionicSlideBoxDelegate,$state,$sce,HttpFactory,UrlArray) {
    $scope.news = {
        newsArray:[],
        adsArray:[],
        index:0,
        isFirst:true
    };

    $scope.goToDetailView = function () {
        // $state.go('newsDetail');
    };

    $scope.$on('updateNews0',function (evt,msg) {
        $scope.news.adsArray = [];
        $scope.news.newsArray = [];
        $scope.news.index = 0;
        console.log('view0,' + msg);
        if(msg == "清理"){
            return;
        }
        $scope.loadMore(UrlArray[msg]);
    });

    $scope.loadMore = function (str) {
        var url = '';
        if (str){
            url = str;
            url = url.replace('@',$scope.news.index);

        }else {
            url = "http://c.m.163.com/recommend/getSubDocPic?from=toutiao&prog=LMA1&open=&openpath=&fn=1&passport=&devId=%2BnrKMbpU9ZDPUOhb9gvookO3HKJkIOzrIg%2BI9FhrLRStCu%2B7ZneFbZ30i61TL9kY&offset=" + $scope.news.index +"&size=10&version=17.1&spever=false&net=wifi&lat=&lon=&ts=1480666192&sign=yseE2FNVWcJVjhvP48U1nPHyzZCKpBKh%2BaOhOE2d6GR48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=appstore";
        }
        if ($scope.news.index === 0){
            $scope.news.index += 11;
        }else {
            $scope.news.index += 10;
        }

        HttpFactory.getData(url).then(function (result) {
            if (!result){
                alert("没有更多数据!");
                return;
            }
            if (!$scope.news.adsArray.length){
                if(result[0].ads){
                    //由于网易新闻有时候除了第一次之外没有头条用个数组存着
                    $scope.news.adsArray = result[0].ads;
                }
            }
            $scope.news.newsArray = $scope.news.newsArray.concat(result);
            if ($scope.news.index === 0){
                $scope.news.newsArray.splice(0,1);
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');
            if ($scope.news.isFirst){
                for(var i = 3;i < UrlArray.length;i++){
                    HttpFactory.getData(UrlArray[i]);
                }
            }

        });
    };
    $scope.doRefresh = function (str) {
        console.log(11111);
        var url = '';
        if (str){
            url = str;
            url = url.replace('@',$scope.news.index);

        }else {
            url = "http://c.m.163.com/recommend/getSubDocPic?from=toutiao&prog=LMA1&open=&openpath=&fn=1&passport=&devId=%2BnrKMbpU9ZDPUOhb9gvookO3HKJkIOzrIg%2BI9FhrLRStCu%2B7ZneFbZ30i61TL9kY&offset=" + $scope.news.index +"&size=10&version=17.1&spever=false&net=wifi&lat=&lon=&ts=1480666192&sign=yseE2FNVWcJVjhvP48U1nPHyzZCKpBKh%2BaOhOE2d6GR48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=appstore";
        }
        HttpFactory.getData(url).then(function (result) {
            if (!result){
                alert("没有更多数据!");
                return;
            }
            if (!$scope.news.adsArray.length){
                if(result[0].ads){
                    //由于网易新闻有时候除了第一次之外没有头条用个数组存着
                    $scope.news.adsArray = result[0].ads;
                }
            }
            $scope.news.newsArray = result;
            if ($scope.news.index === 0){
                $scope.news.newsArray.splice(0,1);
            }
            $scope.$broadcast('scroll.refreshComplete');

        });
    }
}]);
/**
 * Created by qingyun on 16/12/7.
 */

angular.module('cftApp.news1',[]).controller('newsController1',['$scope','$ionicPopup','$ionicSlideBoxDelegate','$state','HttpFactory','UrlArray',function ($scope,$ionicPopup,$ionicSlideBoxDelegate,$state,HttpFactory,UrlArray) {
    $scope.news = {
        newsArray1:[],
        adsArray1:[],
        index:0
    };
    $scope.$on('updateNews1',function (evt,msg) {
        $scope.news.adsArray1 = [];
        $scope.news.newsArray1 = [];
        $scope.news.index = 0;
        console.log('view1,' + msg);
        if(msg == "清理"){
            return;
        }
        $scope.loadMore1(UrlArray[msg]);
    });
    $scope.loadMore1 = function (str) {
        var url = '';
        if (str){
            url = str;
            url = url.replace('@',$scope.news.index);

        }else {
            url = "http://c.m.163.com/dlist/article/dynamic?from=T1348648517839&offset=" + $scope.news.index + "&size=10&fn=7&passport=&devId=XTl7WnrkEuBfasUNdPC49g%3D%3D&lat=&lon=&version=17.2&net=wifi&ts=1480639275&sign=ENAtFozNgGugOq3e1UL6hWbkeBqF24b8ECZ%2FOg2OGlZ48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=oppo_store2014_news&mac=0qxu7nRwUAReuUxKr3NiFzDz%2FWJ7EEOtyLA2BsvQqp8%3D";
        }
        if ($scope.news.index === 0){
            $scope.news.index += 11;
        }else {
            $scope.news.index += 10;
        }
        HttpFactory.getData(url).then(function (result) {
            if (!result){
                alert("没有更多数据!");
                return;
            }
            if (!$scope.news.adsArray1.length){
                if(result[0].ads){
                    //由于网易新闻有时候除了第一次之外没有头条用个数组存着
                    $scope.news.adsArray1 = result[0].ads;
                }
            }
            $scope.news.newsArray1 = $scope.news.newsArray1.concat(result);
            if ($scope.news.index === 0){
                $scope.news.newsArray1.splice(0,1);
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');

        });
    };


}]);
/**
 * Created by qingyun on 16/12/7.
 */

angular.module('cftApp.news2',[]).controller('newsController2',['$scope','$ionicPopup','$ionicSlideBoxDelegate','$state','HttpFactory','UrlArray',function ($scope,$ionicPopup,$ionicSlideBoxDelegate,$state,HttpFactory,UrlArray) {
    $scope.news = {
        newsArray2:[],
        adsArray2:[],
        index:0
    };
    $scope.$on('updateNews2',function (evt,msg) {
        $scope.news.adsArray2 = [];
        $scope.news.newsArray2 = [];
        $scope.news.index = 0;
        console.log('view2,'+ msg);
        if(msg == "清理"){
            return;
        }
        $scope.loadMore2(UrlArray[msg]);
    });
    $scope.loadMore2 = function (str) {
        var url = '';
        if (str){
            url = str;
            url = url.replace('@',$scope.news.index);

        }else {
            url = "http://c.m.163.com/recommend/getChanListNews?channel=T1456112189138&size=10&offset="+ $scope.news.index +"&fn=2&passport=&devId=XTl7WnrkEuBfasUNdPC49g%3D%3D&lat=&lon=&version=17.2&net=wifi&ts=1480640855&sign=n%2BRpzwR4DEI0MaavyBhQlpZaxlFxQdWjn0Ty7qOYWaB48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=oppo_store2014_news&mac=0qxu7nRwUAReuUxKr3NiFzDz%2FWJ7EEOtyLA2BsvQqp8%3D";
        }
        if ($scope.news.index === 0){
            $scope.news.index += 11;
        }else {
            $scope.news.index += 10;
        }
        HttpFactory.getData(url).then(function (result) {
            if (!result){
                alert("没有更多数据!");
                return;
            }
            if (!$scope.news.adsArray2.length){
                if(result[0].ads){
                    //由于网易新闻有时候除了第一次之外没有头条用个数组存着
                    $scope.news.adsArray2 = result[0].ads;
                }
            }
            $scope.news.newsArray2 = $scope.news.newsArray2.concat(result);
            if ($scope.news.index === 0){
                $scope.news.newsArray2.splice(0,1);
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');

        });
    };


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
angular.module('cftApp.tabs',[]).controller('tabsController',['$scope','$ionicPopup','$ionicSlideBoxDelegate','$timeout',function ($scope,$ionicPopup,$ionicSlideBoxDelegate,$timeout) {
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
    // 确认对话框
    $scope.showConfirm = function() {
        var myPopup = $ionicPopup.show({
            template:'<p style="text-align: center;padding: 20px;color: #555555">确定要删除该商品吗?</p>',
            scope: $scope,
            buttons: [
                { text: '取消',
                    type: 'button-clear button-dark'
                },
                {
                    text: '<b>确定</b>',
                    type: 'button-clear button-assertive',
                    onTap: function(e) {
                        // e.preventDefault();
                        console.log("点击了确定!");
                    }
                }
            ]
        });
    };
    $scope.dragMainSlideOpenSlide = function () {
        //滑动content的时候能滑动页面
        $ionicSlideBoxDelegate.$getByHandle('mainSlideBox').enableSlide(true);
    };
    $scope.isDoesContinue = false;
    var indexNum = 0;
    var changedNum = 0;
    var direction = '';
    var isFirst = false;
    $scope.onMainSlideDragRight = function () {
        direction = "后退";
    };
    $scope.onMainSlideDragLeft = function () {
        direction = "前进";
    };

    $scope.slideChanged = function (index) {



        if (direction == '前进'){
            changedNum++;
        }else {
            changedNum -= 1;
        }
        if (changedNum <= 1){
            console.log("关闭循环轮播");
            $scope.isDoesContinue = false;
            $ionicSlideBoxDelegate.$getByHandle('mainSlideBox').loop(false);
        }else {
            $scope.isDoesContinue = true;
            $ionicSlideBoxDelegate.$getByHandle('mainSlideBox').loop(true);
        }
        $scope.$broadcast('updateNews' + index,changedNum);
        $scope.$broadcast('updateNews' + (index - 1),'清理');
        $scope.$broadcast('updateNews' + (index + 1),'清理');
        //滑动页面完毕关闭底层slideBox的滑动
        $ionicSlideBoxDelegate.$getByHandle('mainSlideBox').enableSlide(false);
        $ionicSlideBoxDelegate.$getByHandle('mainSlideBox').update();
    };
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
                // url = "http://192.168.0.100:3000/?myUrl=" + encodeURIComponent(url);
                // url = "http://localhost:3000/?myUrl=" + encodeURIComponent(url);
                url = "http://192.168.0.73:3000/?myUrl=" + encodeURIComponent(url);
                type = type ? type:"GET";
                $http({
                    url:url,
                    method:type,
                    cache:true,
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
        scope:{sourceArray:'='},
        template:'<div class="topCarousel"><ion-slide-box delegate-handle="topCarouselSlideBox" on-slide-changed="slideHasChanged($index)" auto-play="false" slide-interval="1000" show-pager="true" does-continue="true" ng-if="isShowSlideBox" on-drag="drag($event)"><ion-slide ng-repeat="ads in sourceArray track by $index" ng-click="goToDetailView($index)"><img ng-src="{{ads.imgsrc}}" class="topCarouselImg"></ion-slide></ion-slide-box><div class="slideBottomDiv" ng-show="isShowSlideBox"></div></div>',
        controller:['$scope','$element','$ionicSlideBoxDelegate',function ($scope,$element,$ionicSlideBoxDelegate) {
            $scope.goToDetailView = function (index) {
                console.log('进入详情页' + index);
            };
            var lastSpan = $element[0].lastElementChild;
            // $scope.sourceArray = [1,2,3,4,5];
            $scope.$watch('sourceArray',function (newVal,oldVal) {
                if (newVal && newVal.length){
                    /*
                    * 两种方案解决轮播不能立刻显示或者显示错位的bug 改bug由于ng-repeat和slideBox的特性造成
                    * 完美的解决方案是使用添加ng-if 另一种是用update 和 loop
                    * */
                    $scope.isShowSlideBox = false;
                    setTimeout(function () {
                        $scope.isShowSlideBox = true;
                    });
                    // $ionicSlideBoxDelegate.$getByHandle('topCarouselSlideBox').update();
                    // $ionicSlideBoxDelegate.$getByHandle('topCarouselSlideBox').loop(true);
                    lastSpan.innerText = $scope.sourceArray[0].title;
                }
            });
            $scope.slideHasChanged = function (index) {
                lastSpan.innerText = $scope.sourceArray[index].title;
            };
            //页面刚加载出来的时候禁止滑动
            $ionicSlideBoxDelegate.$getByHandle('mainSlideBox').enableSlide(false);
            //拖拽轮播图的时候也要禁止底层的slideBox滑动
            $scope.drag = function (event) {
                $ionicSlideBoxDelegate.$getByHandle('mainSlideBox').enableSlide(false);
                //阻止事件冒泡
                event.stopPropagation();
            };

        }],
        replace:true,
        link:function (scope,tElement,tAtts) {
        }
    };
}]);
/**
 * Created by qingyun on 16/12/7.
 */
angular.module('cftApp.urls',[]).constant('UrlArray',["http://c.m.163.com/recommend/getSubDocPic?from=toutiao&prog=LMA1&open=&openpath=&fn=1&passport=&devId=%2BnrKMbpU9ZDPUOhb9gvookO3HKJkIOzrIg%2BI9FhrLRStCu%2B7ZneFbZ30i61TL9kY&offset=@&size=10&version=17.1&spever=false&net=wifi&lat=&lon=&ts=1480666192&sign=yseE2FNVWcJVjhvP48U1nPHyzZCKpBKh%2BaOhOE2d6GR48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=appstore","http://c.m.163.com/dlist/article/dynamic?from=T1348648517839&offset=@&size=10&fn=7&passport=&devId=XTl7WnrkEuBfasUNdPC49g%3D%3D&lat=&lon=&version=17.2&net=wifi&ts=1480639275&sign=ENAtFozNgGugOq3e1UL6hWbkeBqF24b8ECZ%2FOg2OGlZ48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=oppo_store2014_news&mac=0qxu7nRwUAReuUxKr3NiFzDz%2FWJ7EEOtyLA2BsvQqp8%3D","http://c.m.163.com/recommend/getChanListNews?channel=T1456112189138&size=10&offset=@&fn=2&passport=&devId=XTl7WnrkEuBfasUNdPC49g%3D%3D&lat=&lon=&version=17.2&net=wifi&ts=1480640855&sign=n%2BRpzwR4DEI0MaavyBhQlpZaxlFxQdWjn0Ty7qOYWaB48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=oppo_store2014_news&mac=0qxu7nRwUAReuUxKr3NiFzDz%2FWJ7EEOtyLA2BsvQqp8%3D","http://c.m.163.com/dlist/article/dynamic?from=T1348649079062&offset=@&size=10&fn=2&passport=&devId=XTl7WnrkEuBfasUNdPC49g%3D%3D&lat=&lon=&version=17.2&net=wifi&ts=1480639446&sign=cZqFpGcYxIM23Mk0zlBq8ziD1sRlb1GqZlwcRLb38aZ48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=oppo_store2014_news&mac=0qxu7nRwUAReuUxKr3NiFzDz%2FWJ7EEOtyLA2BsvQqp8%3D","http://c.m.163.com/recommend/getSubDocPic?from=netease_h&size=10&offset=@&fn=4&passport=&devId=XTl7WnrkEuBfasUNdPC49g%3D%3D&lat=&lon=&version=17.2&net=wifi&ts=1480639599&sign=JIfO0JDD%2Bn9%2BAUDPwiCVNSwML5QPD%2BO1KSZcsmDfw2948ErR02zJ6%2FKXOnxX046I&encryption=1&canal=oppo_store2014_news&mac=0qxu7nRwUAReuUxKr3NiFzDz%2FWJ7EEOtyLA2BsvQqp8%3D","http://c.m.163.com/dlist/article/local/dynamic?from=6YOR5bee&offset=@&size=10&fn=2&passport=&devId=XTl7WnrkEuBfasUNdPC49g%3D%3D&lat=&lon=&version=17.2&net=wifi&ts=1480639679&sign=fibH0nYFS5ZqfhTkz%2Fctkn1b%2B%2B7UaCWuMhwPOm2XAxN48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=oppo_store2014_news&mac=0qxu7nRwUAReuUxKr3NiFzDz%2FWJ7EEOtyLA2BsvQqp8%3D","http://c.m.163.com/recommend/getChanListNews?channel=T1457068979049&size=10&offset=@&fn=2&passport=&devId=XTl7WnrkEuBfasUNdPC49g%3D%3D&lat=&lon=&version=17.2&net=wifi&ts=1480639724&sign=uklrBnfDnFoSS86%2B44xw0tzktOhz8ek4D2b6Uh0bXk148ErR02zJ6%2FKXOnxX046I&encryption=1&canal=oppo_store2014_news&mac=0qxu7nRwUAReuUxKr3NiFzDz%2FWJ7EEOtyLA2BsvQqp8%3D","http://c.m.163.com/dlist/article/dynamic?from=T1348648756099&offset=@&size=10&fn=2&passport=&devId=XTl7WnrkEuBfasUNdPC49g%3D%3D&lat=&lon=&version=17.2&net=wifi&ts=1480639780&sign=PqlXEtC2KZaOX7vOO17uHuo4duhmWIxQqoQ4rBKRsQh48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=oppo_store2014_news&mac=0qxu7nRwUAReuUxKr3NiFzDz%2FWJ7EEOtyLA2BsvQqp8%3D",'http://c.m.163.com/dlist/article/dynamic?from=T1348649580692&offset=@&size=10&fn=2&passport=&devId=XTl7WnrkEuBfasUNdPC49g%3D%3D&lat=&lon=&version=17.2&net=wifi&ts=1480639824&sign=BENvYqDl9cYKiJh2irUV5%2Biue8PV%2FKHdFs3tQWGzBqd48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=oppo_store2014_news&mac=0qxu7nRwUAReuUxKr3NiFzDz%2FWJ7EEOtyLA2BsvQqp8%3D','http://c.m.163.com/dlist/article/dynamic?from=T1348650593803&offset=@&size=10&fn=1&passport=&devId=XTl7WnrkEuBfasUNdPC49g%3D%3D&lat=&lon=&version=17.2&net=wifi&ts=1480639994&sign=L2rYDnEjMRXqgyoBwjDOU9%2FuAlHKEvkGbCcbOw0egKp48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=oppo_store2014_news&mac=0qxu7nRwUAReuUxKr3NiFzDz%2FWJ7EEOtyLA2BsvQqp8%3D','http://c.m.163.com/recommend/getChanListNews?channel=T1419316284722&size=10&offset=@&fn=1&passport=&devId=XTl7WnrkEuBfasUNdPC49g%3D%3D&lat=&lon=&version=17.2&net=wifi&ts=1480640349&sign=kuB1wmMK3BIofo29zp1u%2FCelBxwQVclBPY2jLDS6PfV48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=oppo_store2014_news&mac=0qxu7nRwUAReuUxKr3NiFzDz%2FWJ7EEOtyLA2BsvQqp8%3D','http://c.m.163.com/dlist/article/dynamic?from=T1473054348939&offset=@&size=10&fn=2&passport=&devId=XTl7WnrkEuBfasUNdPC49g%3D%3D&lat=&lon=&version=17.2&net=wifi&ts=1480640251&sign=TxI1npNtFDs5QSgpQr%2FOTwXPVB%2FvuqHD5Vj7E5Ul5t948ErR02zJ6%2FKXOnxX046I&encryption=1&canal=oppo_store2014_news&mac=0qxu7nRwUAReuUxKr3NiFzDz%2FWJ7EEOtyLA2BsvQqp8%3D','http://c.m.163.com/dlist/article/dynamic?from=T1348648141035&offset=@&size=10&fn=1&passport=&devId=XTl7WnrkEuBfasUNdPC49g%3D%3D&lat=&lon=&version=17.2&net=wifi&ts=1480640432&sign=LeTem6ZlcSys0TMWqSD%2FkavFP%2BW7CKnHNX3zs%2B6m3l548ErR02zJ6%2FKXOnxX046I&encryption=1&canal=oppo_store2014_news&mac=0qxu7nRwUAReuUxKr3NiFzDz%2FWJ7EEOtyLA2BsvQqp8%3D','http://c.m.163.com/dlist/article/dynamic?from=T1348654151579&offset=@&size=10&fn=1&passport=&devId=XTl7WnrkEuBfasUNdPC49g%3D%3D&lat=&lon=&version=17.2&net=wifi&ts=1480640614&sign=Ey6%2F0Qyd7pxjaaWUoZLQYriGwqX0xzmATqe6CpZ0C2x48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=oppo_store2014_news&mac=0qxu7nRwUAReuUxKr3NiFzDz%2FWJ7EEOtyLA2BsvQqp8%3D','http://c.m.163.com/dlist/article/dynamic?from=T1414389941036&offset=@&size=10&fn=1&passport=&devId=XTl7WnrkEuBfasUNdPC49g%3D%3D&lat=&lon=&version=17.2&net=wifi&ts=1480640649&sign=DXY4efOR3JOAgU6ePvFftxYD41PHsjGxZdWGM5quV0x48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=oppo_store2014_news&mac=0qxu7nRwUAReuUxKr3NiFzDz%2FWJ7EEOtyLA2BsvQqp8%3D','http://c.m.163.com/dlist/article/dynamic?from=T1348649145984&offset=@&size=10&fn=2&passport=&devId=XTl7WnrkEuBfasUNdPC49g%3D%3D&lat=&lon=&version=17.2&net=wifi&ts=1480641094&sign=m32ovzEGXTpUeq0kQ%2BXNMNXg9B6bGu2D0vfF3xrFwjF48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=oppo_store2014_news&mac=0qxu7nRwUAReuUxKr3NiFzDz%2FWJ7EEOtyLA2BsvQqp8%3D']);