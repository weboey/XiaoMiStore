/**
 * Created by Administrator on 16-6-20.
 */

angular.module("focusImgMd", [])
    .directive('focusImg', function factory() {
        return {
            restrict: 'AE',
            replace: true,
            /*   templateUrl: function (a, b) {
             return 'js/directives/page/' + b.temp + '.html'
             },*/
            templateUrl: function (element, attrs) {
                if (attrs.template == "multiple") {
                    return 'js/directives/template/focusImgMultTpl.html'
                } else {
                    return 'js/directives/template/focusImgTpl.html'
                }
            },
            scope: {imgItems: '=', title: "@?"},
            link: function (scope, element, attrs) {
                console.log(scope.imgItems);

                scope.imgIndex = 0;
                var bannerWidth = element[0].querySelector('#focusImg').parentNode.clientWidth;
                var focusImgWidth = element[0].querySelector('#focusImg').clientWidth;
                var imgIndexNumber = Math.round(focusImgWidth / bannerWidth);

                var imgMargin = 0;
                if(attrs.template == "multiple")
                {
                    imgMargin = 15;
                }
                function animation(index) {
                    var offset = -index * (element[0].querySelector('#focusImg').parentNode.clientWidth+imgMargin);
                    element[0].querySelector('#focusImg').style.left = offset+ "px";
                }

                scope.changeImg = function (number) {
                    scope.imgIndex += number;
                    if (scope.imgIndex < 0) {
                        scope.imgIndex = imgIndexNumber - 1;
                    } else if (scope.imgIndex >= imgIndexNumber) {
                        scope.imgIndex = 0;
                    }
                    animation(scope.imgIndex);
                }
                scope.btnClk = function (index) {
                    scope.imgIndex = index;
                    animation(index);
                }

                var imgSize = 5;
                scope.imgTotalPage = scope.imgItems.length/imgSize-1;
                console.log(scope.imgTotalPage);
            }
        }
    }
)

// var imgWidth = tElement[0].getElementsByTagName("img")[0].width;
//获取不到ng-repeat里的元素
//console.log(element[0].querySelector('#focusImg').getElementsByTagName("img"));
//解决方法1
//$timeout(function(){// console.log(element.find('.listClass'));// console.log(element[0].querySelector('#focusImg').getElementsByTagName('img'));
//},1000);
//解决方法2 在compile函数中获取
//解决方法3 子组件可以依赖父组件，父组件不要依赖子组件，宁愿依赖数据，不要依赖DOM，宁愿依赖结构，不要依赖内容
