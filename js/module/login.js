/**
 * Created by Administrator on 16-6-13.
 */

angular.module('login', ['ui.router'])
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state("login", {
                    url: '/login',
                    templateUrl: 'view/login.html',
                    controller: function($scope,loginService,$rootScope,$state){
                        $scope.user = {
                            name:"",
                            pwd:""
                        }
                        $scope.loginState = true;
                        $scope.smEnter = function(){
                            $scope.loginState = false;
                        }
                        $scope.smOuter = function(){
                            $scope.loginState = true;
                        }

                        $scope.subLogin = function(){
                            $rootScope.user = loginService.login($scope.user);
                            if($rootScope.user!=null)
                            {
                                $state.go('home.main');
                            }
                        }
                    },
                    ncyBreadcrumb:{
                        label:"µÇÂ¼",
                        parent:"home.main"
                    }

                })
        }
    ])