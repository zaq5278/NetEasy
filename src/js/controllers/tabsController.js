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