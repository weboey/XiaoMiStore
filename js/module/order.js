/**
 * 我的订单模块页面
 */

angular.module('order.router', ['ui.router'])
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state("order", {
                    url: '/order',
                    templateUrl: 'view/order.html',
                    controller: function($scope,cartService){
                        //调用服务获取我的购物车对象
                        $scope.cart = cartService.myCart;
                    },
                    ncyBreadcrumb:{
                        label:"我的订单",
                        parent:"home.main"
                    }
                })
        }
    ])