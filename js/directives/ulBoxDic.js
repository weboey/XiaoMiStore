/**
 * Created by Administrator on 16-6-21.
 */
angular.module("ulBoxMd", ["filterMd"])

    .directive('ulBox', function factory() {
        var directiveDefinitionObject = {
            restrict:"AE",
            replace:true,
            templateUrl:"js/directives/template/ulBoxTpl.html",
            scope:{
                ulItems:'=',
                childrenContent:'=',
                childrenDivClass: '@'
            },
            link: function (scope, element, attrs) {
                if (attrs.ulType == 'nav') {
                    scope.typeSeq = 1
                } else if (attrs.ulType == 'heshe') {
                    scope.typeSeq = 0
                }
            }
        };
        return directiveDefinitionObject;
    })

    .directive('ulBoxChildContent', function factory() {
        var directiveDefinitionObject = {
            restrict:"AE",
            replace:true,
            templateUrl:"js/directives/template/ulBoxContentTplMult.html",
            require: '^?',
            scope:{
                parentItem:'=',
                childrenContent:'=',
                childrenDivClass: '@'
            },

            link: function (scope, element, attrs) {
                scope.ContentArray = [];
                scope.pageList = [];
                var pageSize = 6;
                angular.forEach(scope.childrenContent, function (ContentItem) {
                    if (scope.parentItem.id == ContentItem.fl_id || scope.parentItem.id.indexOf('$'+ContentItem.fl_id+'$') != -1) {
                        scope.ContentArray.push(ContentItem)
                    }
                })
                scope.page = Math.ceil(scope.ContentArray.length / pageSize);
                for(var i=0;i<scope.page;i++)
                {
                    scope.pageList.push(i+1);
                }
                scope.setClass = function()
                {
                    return 'class-col-' + scope.page;
                }

                scope.flag = false;
                scope.showContent = function () {
                    scope.flag = true;
                }
                scope.closeContent = function () {
                    scope.flag = false;
                }
            }
        };
        return directiveDefinitionObject;
    })


/*
if(scope.childrenItems.length && scope.item.id!==null){
    scope.array = [];
    scope.pageList =[];
    angular.forEach(scope.childrenItems,function(obj){
        if(scope.item.id.indexOf(obj.fl_id)!=-1){
            scope.array.push(obj);
        }
    });
    scope.pages = Math.ceil(scope.array.length / 6); //分页数
//分页要repeat的数组
    for (var i = 0; i < scope.pages; i++) {
        scope.pageList.push(i + 1);
    }
    scope.setClass= function(){
        return 'class-col-'+scope.pageList.length;
    }
//scope.childrenItems2 = scope.array.slice((scope.pageSize * (scope.selPage - 1)), (scope.selPage * scope.pageSize));
}
.filter('myFilter2', function ($filter) {
    return function(input,page){
        return input.slice((6 * (page - 1)), (page * 6));
    }
})*/
