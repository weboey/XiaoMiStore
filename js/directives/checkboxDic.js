//复选框指令：实现购物车表格头一列勾选当前行数据的作用
angular.module("checkboxMd", [])
    .factory("checkBoxService", function () {
        return{
            groups:[],
            selectAllCheckBox:function(selectAll){//全选函数
                angular.forEach(this.groups,function(scope){
                    scope.isChecked = selectAll;
                    scope.bindData.isChecked = selectAll;
                })
            }
        }
    })
    .directive('checkBox', function factory(checkBoxService) {
        var directiveDefinitionObject = {
            restrict:"AE",
            replace:true,
            template:"<div><i class='radio-icon' ng-class='{checked:isChecked}' ng-click='changeChecked()'></i> 全选</div>",
            scope:{},
            controllerAs:'checkBoxContrller',
            //利用控制器进行指令间的通信适合在作用域链上的DOM节点元素，此处应该利用服务的单例模式特性进行通信
            //服务(service)提供了一种能在应用的整个生命周期内保持数据的方式，能够在控制器之间进行通信，且能保证数据的一致性。
            //一般我们都会封装server来为应用提供访问数据的接口，或者跟远程进行数据交互。
            controller:function(){
                this.groups = [];
                // 注意this不是指scope对象，仅仅是当前函数对象,所以下面绑定在this的函数在视图中无效
                // console.log(this);
                //this.selectAllCheckBox = function(){
                //    angular.forEach(this.groups,function(){
                //    })
               // }
                this.changeChecked = function(){
                    checkBoxService.selectAllCheckBox();
                }
            },
            compile: function compile(tElement, tAttrs, transclude) {
                return function (scope, element, attrs) {
                    scope.isChecked = false;
                    scope.changeChecked = function(){
                        scope.isChecked = !scope.isChecked;
                        checkBoxService.selectAllCheckBox(scope.isChecked);
                    }
                }
            }
        };
        return directiveDefinitionObject;
    })

    .directive('checkBoxItem', function factory(checkBoxService) {
        var directiveDefinitionObject = {
            restrict:"AE",
            replace:true,
            template:"<div><i class='radio-icon' ng-class='{checked:bindData.isChecked}' ng-click='changeChecked()'></i></div>",
            scope:{
                bindData:"=?"
            },
            //require:'^checkBox',
            compile: function compile(tElement, tAttrs, transclude) {
                return function (scope, element, attrs) {
                    scope.changeChecked = function(){
                        scope.bindData.isChecked = !scope.bindData.isChecked;
                    }
                    checkBoxService.groups.push(scope);
                }
            }
        };
        return directiveDefinitionObject;
    })