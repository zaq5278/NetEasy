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