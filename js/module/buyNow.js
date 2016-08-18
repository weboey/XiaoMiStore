/**
 * 立即购买页面路由模块
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
                                $scope.userSelectArr = [];//存放用户选择的产品信息
                                $scope.buyProduct = util.queryItemById(productsResolve.products, $stateParams.productId);//用户购买的产品对象
                                $scope.buyProductVersions = util.queryArrByField(productsResolve.versions_info, $stateParams.productId, "p_id"); //产品对象的版本信息
                                $scope.buyProductColors = productsResolve.color_base;//产品对象的版本信息
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

                                //下一步
                                $scope.buyNextStep = function(buyProduct){
                                    if($rootScope.user==null){
                                        alert("请先登录再购买!");
                                        return;
                                    }
                                    //获取我的购物车对象
                                    if($scope.myCart==null)
                                    {
                                        $scope.myCart =cartService.getInstance();
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
                            }
                        }
                    }
                })
        }
    ])

