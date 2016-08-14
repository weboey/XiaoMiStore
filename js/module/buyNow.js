/**
 * Created by Administrator on 16-6-13.
 */

angular.module('buyNow', ['ui.router','cartMd'])
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state('buyNow', {
                    url: '/buyNow/:productId',
                    //url: '/buyNow?productId',
                    //params: {
                    // productId: ""
                    //},
                    resolve: {
                        productsResolve: function (httpService) {
                            return httpService.get('json/products.json');
                        }
                    },
                    views: {
                        "": {
                            templateUrl: 'view/buyNow.html',
                            controller: function ($scope, $stateParams, productsResolve, util, $window,$location,$anchorScroll,cartService,$state,$rootScope) {
                                $scope.userSelectArr = [];
                                $scope.buyProduct = util.queryItemById(productsResolve.products, $stateParams.productId);
                                $scope.buyProductVersions = util.queryArrByField(productsResolve.versions_info, $stateParams.productId, "p_id");
                                $scope.buyProductColors = productsResolve.color_base;
                                //第一步选择版本
                                $scope.pushUserSelectVersion = function (userSelect) {

                                    $scope.userSelectVersion = [userSelect];
                                    //$scope.userSelectArr.pushObj(userSelect);
                                    //util.sava("userSelect", $scope.userSelectArr);
                                    $scope.userSelectArr = $scope.userSelectVersion;

                                    $scope.userSelectColor = [];

                                    $scope.buyProduct.price = userSelect.price;
                                    $scope.buyProductColors = util.queryArrByField(productsResolve.color_info, userSelect.versionId, "b_id");
                                };
                                //第二步选择颜色
                                $scope.pushUserSelectColor = function (userSelect) {
                                    //如果没有进行第一步则直接返回
                                    if (!$scope.userSelectArr.length) {
                                        return;
                                    }
                                    $scope.userSelectColor = [userSelect];
                                    $scope.userSelectArr = $scope.userSelectVersion.concat($scope.userSelectColor);
                                    curUserColor = userSelect;
                                };

                                $scope.setClassActive = function (item, userSelectIndex) {
                                    return $scope.userSelectArr[--userSelectIndex] === item;
                                };

                                //获取我的购物车对象
                                $scope.myCart = cartService.myCart;
                                //下一步
                                $scope.buyNextStep = function(buyProduct){
                                    if($rootScope.user==null){
                                        alert("请先登录再购买!");
                                        return;
                                    }
                                    //如果没有选择版本和颜色则直接返回
                                    if (!($scope.userSelectArr.length && $scope.userSelectArr.length==2)) {
                                          return;
                                    }
                                    //拼接用户选择的产品版本，颜色
                                    angular.forEach($scope.userSelectArr,function(userSelectItem){
                                        buyProduct.name+=" "+userSelectItem.name;
                                    })
                                    //购买的产品加入到我的购物车
                                    $scope.myCart.addProductInCart(buyProduct);
                                    $state.go('cart');
                                }

                                $scope.goToDivId = function (id) {
                                    $location.hash(id);
                                    $anchorScroll();
                                }

                                //$scope.isShowHeaderBar = false;
                                //监听滚动条，滚动到一定位置时显示头部bar导航条
                                $window.onscroll = function () {
                                    $scope.$apply(function(){
                                        $scope.offsetY = document.documentElement.scrollTop || document.body.scrollTop;
                                    });
                                    /*      if (offsetY >= 800) {
                                     $scope.$apply(function () {
                                     $scope.isShowHeaderBar = true;
                                     });
                                     } else {
                                     $scope.$apply(function () {
                                     $scope.isShowHeaderBar = false;
                                     });
                                     }*/
                                }
                                /*                                什么时候用$apply()
                                 还是那个问题，那我们到底什么时候需要去调用$apply()方法呢？情况非常少，
                                 实际上几乎我们所有的代码都包在$scope.$apply()里面，
                                 像ng-click，controller的初始化，
                                 $http的毁掉函数等。在这些情况下，
                                 我们不需要自己调用，实际上我们也不能自己调用，
                                 否则在$apply()方法里面再调用$apply()方法会抛出错误。
                                 如果我们需要在一个新的执行序列中运行代码时才真正需要用到它，
                                 而且当且仅当这个新的执行序列不是被angular JS的库的方法创建的，
                                 这个时候我们需要将代码用$scope.$apply()包起来。下面用一个例子解释：*/


                            }
                        }
                    }
                })
        }
    ])


/*
 controller: function ($scope, $stateParams, productsResolve, util) {
 $scope.buyProductObj = {
 product:'',
 userSelectArr :[],
 versions:'',
 color:'',
 price:'',
 }
 $scope.buyProductObj.product = util.queryItemById(productsResolve.products, $stateParams.productId);
 $scope.buyProductObj.versions = productsResolve.versions_info;
 $scope.buyProductObj.colors = productsResolve.color_info;
 //第一步选择版本
 $scope.pushUserSelectVersion = function (userSelect) {
 $scope.buyProductObj.versions = [userSelect];
 //$scope.userSelectArr.pushObj(userSelect);
 //util.sava("userSelect", $scope.userSelectArr);
 $scope.buyProductObj.userSelectArr = $scope.buyProductObj.versions;
 //每次重选版本时重置选择的颜色
 $scope.buyProductObj.color = [];
 $scope.buyProductObj.product.price = userSelect.price;
 $scope.buyProductColors = util.queryArrByField(productsResolve.color_info2, userSelect.id, "b_id");
 };
 //第二步选择颜色
 $scope.pushUserSelectColor = function (userSelect) {
 if (!$scope.userSelectArr.length) {
 return;
 }
 $scope.userSelectColor = [userSelect];
 $scope.userSelectArr = $scope.userSelectVersion.concat($scope.userSelectColor);
 curUserColor = userSelect;
 };
 //设置用户选择的产品信息样式
 $scope.setClassActive = function (item, userSelectIndex) {
 return $scope.userSelectArr[--userSelectIndex] === item;
 };
 }*/
