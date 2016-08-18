//前端的页面分解与组装:将主页面index.html分解为header.html\container.html\footer.html三部分
///*方法1:使用ui-router
///*方法2:将分解的页面写成directive
///*方法3：指令结合使用ng-include指令可以解决共同模版中仍然存在一差异的dom元素*/
//这三种方法实质上都是利用ajax来加载模板。使用ajax来实现页面分解这样的功能，相比传统的使用后台动态脚本语言的方案，必然会带来额外的开销。
angular.module("xmIncludeMd",[])
    .directive('xmInclude', function factory(loginService,$rootScope) {
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
                    //TODO:独立的作用域原型上没有继承rootScope的属性，导致模板上用户退出登录函数失效，暂时这样解决
                    scope.outLogin =function(){
                        loginService.outLogin();
                        $rootScope.user = null;
                    }
                }
            }
        };
        return directiveDefinitionObject;
    })