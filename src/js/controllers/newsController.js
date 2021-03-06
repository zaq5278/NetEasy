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
        $scope.show();
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
            result = result[Object.keys(result)[0]];
            $scope.hide();
            if (!result){
                alert("没有更多数据!");
                return;
            }
            //注意一定要用新的数组接收 不能直接使用$scope.news.adsArray数据 否则不停触发传播和脏值检查
            var img_title_Array = [];
            if (!$scope.news.adsArray.length){
                if(result[0].ads){
                    // //由于网易新闻有时候除了第一次之外没有头条用个数组存着
                    // $scope.news.adsArray = result[0].ads;
                    if (result[0].ads.length){
                        for (var k = 0;k < result[0].ads.length;k++){
                            var obj = {
                                title:result[0].ads[k].title,
                                imgsrc:result[0].ads[k].imgsrc
                            };
                            img_title_Array.push(obj);

                        }
                        $scope.news.adsArray = img_title_Array;
                    }
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

        },function () {
            $scope.hide();
        });
    };
    $scope.doRefresh = function (str) {


    }
}]);