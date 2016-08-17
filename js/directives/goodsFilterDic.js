/**
 * 产品搜索页面的过滤选择项指令
 */

angular.module("goodsFilterMd", [])
    .directive('goodsFilter', function factory() {
        var directiveDefinitionObject = {
            restrict: "AE",
            replace: true,
            template: "<div><dl class='filter_list_item' ng-repeat='filterItem in filterTypes'>" +
            "<dt >{{filterItem.name}}：</dt>" +
            "<dd ng-click='userFilter(" + '"全部"' + ")'>全部</dd>" +
            "<dd ng-repeat='itemContent in filterContents|filter:{typeId:filterItem.typeId}' ng-click='userFilter(itemContent.text)'>{{itemContent.text}}</dd>" +
            "</dl></div>",
            scope: {
                filterTypes: "=",
                filterContents: "="
            },
            link: function (scope, element, attrs) {
                var filter = {
                    arr: []
                }
                scope.userFilter = function (itemContent) {
                    filter.arr.push(itemContent);
                };
            }
        };
        return directiveDefinitionObject;
    })