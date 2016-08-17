/**
 * home page
 */

angular.module('home', ['ui.router'])
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state("home", {
                    url: '/home',
                    abstract:true,
                    templateUrl: 'view/home.html',
                    resolve: {
                        productsResolve: function (httpService) {
                            return httpService.get('json/products.json');
                        },
                        productObj: function (httpService, util,$state) {
                            return httpService.get('json/products.json')
                                .then(function (data) {
                                    return util.queryItemById(data.products, 1);
                                });
                        },
                        //函数:返回$http返回的promise,最终得到的就是后台返回值.
                        promiseObj2: function ($http) {
                            return $http({method: 'GET', url: 'json/products.json'});
                        },
                        //函数:返回$http返回的promise返回的promise,最终得到的是.then里面return的内容
                        promiseObj3: function ($http, util) {
                            return $http({method: 'GET', url: 'json/products.json'})
                                .then(function (data) {
                                    //promise.then返回的promise对象,会被.then()函数里的返回值解析.这适用于对返回值做一些处理后再返回.
                                    return util.queryItemById(data.data.products, 1);
                                });
                        }
                    }
                })
                .state("home.main",{
                    url:'',
                    views: {
                        "":{
                            templateUrl: 'view/page/home.main.html',
                            controller:function(){}
                        },
                        "loginUser":{
                            templateUrl: 'view/page/home.userLogin.html',
                            controller:function($scope,loginService,$rootScope){}
                        }
                    },
                    ncyBreadcrumb:{
                        label:"首页"
                    }
                })
                .state("home.products",{ //产品信息
                    //home.products({productId:childrenItem.id})
                    url:'/product/:productId',
                    //abstract:true,
                    templateUrl: 'view/page/home.product.html',
                    resolve: {
                        productObj:function (httpService, util,$state,$stateParams) {
                            //state 获取不到参数??????????????
                            /*         console.log($state.$current.params.productId);
                             console.log($state.current.params.productId);
                             console.log($state.params.productId);
                             console.log($state);*/
                            return httpService.get('json/products.json')
                                .then(function (data) {
                                    return util.queryItemById(data.products, $stateParams.productId);
                                });
                        }
                    },
                    controller:function($scope,productObj,$window,$state,$stateParams,productsResolve){
                        $scope.product =productObj;
                        $scope.product.details = productsResolve.detail_info;
                        $scope.isFlag = false;
                        //监听滚动条，滚动到一定位置时显示头部bar导航条
                        $window.onscroll = function () {
                            var offsetY = document.documentElement.scrollTop || document.body.scrollTop;
                            $scope.$apply(function(){
                                if(offsetY>=140){
                                    $scope.isFlag  = true;
                                }else{
                                    $scope.isFlag = false;
                                }
                            });
                        }
                        //$state.go('.detail',{detailType:"监听"}); 报错
                        //Could not resolve '.detail' from state 'home.products.detail'
                        $state.go('home.products.detail',{detailType:$scope.product.details[0].name});
                    }

                })
                .state("home.products.detail",{ //产品详情信息
                    url:'/{detailType}',
                    templateUrl: 'view/page/home.product.detail.html',
                    controller:function($scope,$stateParams,util){
                        $scope.product.detail =util.queryItemByField($scope.product.details,$stateParams.detailType,"name");
                    }
                })

                .state("home.search",{ //搜索产品信息
                    url:'/search/:searchKey',
                    templateUrl: 'view/page/home.search.html',
                    controller:function($scope,$stateParams,productsResolve,util){
                        //TODO:搜索功能没有实现，暂时返回所有的产品
                        //$scope.searchResultList=util.queryArrByField(productsResolve.products,$stateParams.searchKey,"name");
                        $scope.searchResultList = productsResolve.products;
                    },
                    ncyBreadcrumb:{
                        label:"全部结果",
                        parent:"home.main",
                        param:"searchKey"
                    }
                })
                .state("error404",{
                    url:'/error404',
                    templateUrl: 'view/404.html',
                    controller:function($scope,$stateParams){
                    }
                })
        }
    ])