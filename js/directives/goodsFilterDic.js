/**
 * Created by Administrator on 16-6-26.
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
                console.log(scope.filterTypes);
                console.log(scope.filterContents);
                var filter = {
                    arr: []
                }
                scope.userFilter = function (itemContent) {
                    console.log(itemContent);
                    filter.arr.push(itemContent);
                };
            }
        };
        return directiveDefinitionObject;
    })