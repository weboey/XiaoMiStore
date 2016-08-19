/**
 * 我的购物车页面路由模块
 */

angular.module('cart', ['ui.router','cartMd'])
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state("cart", {
                    url: '/cart',
                    templateUrl: 'view/cart.html',
                    controller:function($scope,cartService,$rootScope){
                        //调用服务获取我的购物车对象
                        if($rootScope.user!=null){
                            $scope.cart = cartService.myCart;
                        }
                    },
                    ncyBreadcrumb:{
                        label:"我的购物车",
                        parent:"home.main"
                    }
                })
        }
    ])