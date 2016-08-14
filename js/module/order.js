/**
 * Created by Administrator on 16-8-5.
 */


angular.module('order.router', ['ui.router'])
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state("order", {
                    url: '/order',
                    templateUrl: 'view/order.html',
                    controller: function($scope,cartService){
                        $scope.cart = cartService.myCart;
                    },
                    ncyBreadcrumb:{
                        label:"ÎÒµÄ¶©µ¥",
                        parent:"home.main"
                    }
                })
        }
    ])