/**
 * Created by Administrator on 16-7-30.
 */

///*方法3：指令结合使用ng-include指令可以解决共同模版中仍然存在一差异的dom元素*/
angular.module("xmIncludeMd",[])
    .directive('xmInclude', function factory() {
        var directiveDefinitionObject = {
            restrict: "AE",
            replace: "true",
            scope: {
                //可以根据需要设置外部传入的属性,因为在公共的模版中可能存在个别DOM元素不同/**/
                //此时可以在使用指令的地方传入个bool值，根据这个bool值判断模版中差异的DOM元素是否需要渲染/*/
                title: "@?",
                src: "@",
                user:"="
            },
            template: "<div ng-include='src'></div>",
            compile: function compile(tElement, tAttrs, transclude) {
                return function (scope, element, attrs) {
                    //根据不同需要还可以在link函数中处理返回的模版/**/
                   // scope.src = attrs.src;
                   // scope.getContentUrl = function () {
                   //     return "view/common/" + attr.src + ".html"
                   // }
                }
            }
        };
        return directiveDefinitionObject;
    })