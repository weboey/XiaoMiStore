/**
 * Created by Administrator on 16-6-3.
 */
var xmStoreApp = angular.module('xmStoreApp',
    [
        'home',
        'login',
        'register',
        'cart',
        'buyNow',
        'search',
        'ui.router',
        'order.router',
        'focusImgMd',
        'ulBoxMd',
        'httpMd',
        'utilMd',
        'goodsFilterMd',
        'loginMd',
        'cartMd',
        'checkboxMd',
        'xmIncludeMd',
        'breadcrumbsMd'
    ]
);
xmStoreApp
    .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider
                // 错误的路由重定向
                .when('/c?id', '/contacts/:id')
                .when('/user/:id', '/contacts/:id')
                .otherwise('/home');
        }
    ])
    .run(function($rootScope,httpService,$state,loginService){

        //用户登录信息绑定在跟作用域下，因为各个状态路由可能都需要涉及登录信息
        $rootScope.user = loginService.isLogin();
        $rootScope.outLogin = function(){
            loginService.outLogin();
            $rootScope.user =null;
        }

        $rootScope.imgItems = [
            {src:"resource/img/1.jpg",productId:12},
            {src:"resource/img/2.jpg",productId:1},
            {src:"resource/img/3.jpg",productId:5},
            {src:"resource/img/4.jpg",productId:2},
            {src:"resource/img/5.jpg",productId:10}
        ];
        $rootScope.userUnLogin = false;
        httpService.get('json/fenlei.json').then(function(data){
            $rootScope.ulItems=data.fenlei;
        });
        httpService.get('json/products.json').then(function(data){
            $rootScope.ulItemsContent=data.products;
        });


        $rootScope.mxdp = [
            {imgName:1,productId:1},
            {imgName:2,productId:1},
            {imgName:3,productId:1},
            {imgName:4,productId:1},
            {imgName:5,productId:1},
            {imgName:6,productId:1},
            {imgName:7,productId:1},
            {imgName:8,productId:1},
            {imgName:9,productId:1},
            {imgName:10,productId:1},
        ];

        $rootScope.wntj = [
            {imgName:'w1'}, {imgName:'w2'}, {imgName:'w3'}, {imgName:'w4'}, {imgName:'w5'},
            {imgName:'w6'}, {imgName:'w7'}, {imgName:'w8'}, {imgName:'w9'}, {imgName:'w10'},
            {imgName:'w11'}, {imgName:'w12'}, {imgName:'w13'}, {imgName:'w14'}, {imgName:'w15'},
            {imgName:'w16'}, {imgName:'w17'}, {imgName:'w18'}, {imgName:'w19'}, {imgName:'w20'},
        ];

        $rootScope.filterTypes = [
            {typeId:1,name:'分类'},
            {typeId:2,name:'机型'},
            {typeId:3,name:'品牌'}
        ];
        $rootScope.filterContents = [
            {id:1,text:'线材',typeId:1},
            {id:2,text:'保护套/保护壳',typeId:1},
            {id:3,text:'贴膜',typeId:1},
            {id:4,text:'小米手机5',typeId:2},
            {id:5,text:'小米手机4S',typeId:2},
            {id:6,text:'小米平板2',typeId:2},
            {id:7,text:'小米手机4c',typeId:2},
            {id:8,text:'小米',typeId:3},
            {id:9,text:'第三方品牌',typeId:3}
        ];

        httpService.get('json/fenlei.json').then(function (data) {
            var arr = [];
            var arr2 = [];
            for (var i = 0; i < data.fenleiheshe.length; i++) {
                var ulListTmp = [];
                angular.forEach(data.fenlei, function (obj, index) {
                    if (data.fenleiheshe[i].text.indexOf(obj.text) != -1) {
                        ulListTmp.push(obj);
                    }
                })
                arr.push(ulListTmp);
            }
            angular.forEach(arr, function (item, index) {
                var objTmp = {id: '', text: ''};
                var idArr = [];
                var textArr = [];
                angular.forEach(item, function (obj, index) {
                    idArr.push(obj.id);
                    textArr.push(obj.text);
                })
                objTmp.id = '$'+idArr.join('$')+'$';
                objTmp.text = textArr.join(" ");
                arr2.push(objTmp);
            })
            $rootScope.ulItemsHeShe=arr2;

            $rootScope.$on('$stateChangeStart', function (event,toState,toParams,fromState,fromParams) {

               // if (toState.name=='cart'&& !toState.data.loginCheck) {
                //    event.preventDefault();//如果去掉此行则不会跳转到login页面 :最佳解决方案,使用event.preventDefault()可以阻止状态发生改变.
                //    $rootScope.$state.go("login");
                //}

            });
            $rootScope.$on('$viewContentLoading',function(event,viewConfig){});
            $rootScope.$on('$viewContentLoaded',function(event){})
            $rootScope.$on('$stateChangeSuccess', function (event,toState,toParams,fromState,fromParams) {
                console.log('$stateChangeSuccess');
                /*  angular.forEach($state.get(),function(state){
                 console.log(state.name);
                 })*/
                /*if (toState.name=='cart'&& !toState.data.loginCheck) {
                 console.error('not login!');
                 //可以跳转到login页面，到点击浏览器返回时又回到了cart状态，然后又进入login页面(导致无法返回)
                 $rootScope.$state.go("login");
                 }*/
                // to be used for back button //won't work when page is reloaded.
                $rootScope.previousState_name = fromState.name;
                $rootScope.previousState_params = fromParams;
            });


            //back button function called from back button's ng-click="back()"
            $rootScope.back = function() {//实现返回的函数
                $state.go($rootScope.previousState_name,$rootScope.previousState_params);
            };
        });
    })




