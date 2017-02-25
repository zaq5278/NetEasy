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
}]).controller('liveController',['$scope','HttpFactory',function ($scope,HttpFactory) {
    $scope.live = {
        slideSource:[]
    };
    var url = "http://data.live.126.net/livechannel/previewlist.json";
    HttpFactory.getData(url).then(function (result) {
        var img_title_Array = [];
        if (result.top.length){
            for (var i = 0;i < result.top.length;i++){
                var obj = {
                    title:result.top[i].roomName,
                    imgsrc:result.top[i].image
                };
                img_title_Array.push(obj);

            }
            console.log(img_title_Array);
            $scope.live.slideSource = img_title_Array;
        }
    })
}]);