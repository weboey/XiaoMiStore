/**
 * Ajax 服务，调用后台的api接口，完成模型数据的呈现
 */

angular.module("httpMd",[])
    .factory("httpService",function($http,$q){
        return{
            get:function(_urlPath){
                var defer=$q.defer();
                $http({method:'GET',url:_urlPath})
                    .success(function(data,status,headers,config){
                        defer.resolve(data); //声明执行成功
                    })
                    .error(function(data,status,headers,config){
                        defer.reject(); //声明执行失败，此处可以处理请求失败后的提示或其它业务逻辑
                    });
                return defer.promise; //返回承诺，返回获取数据的API
            }
        }
        var urlPath = "json/products.json"
        var factory = {
            data:$http(	{
                method:'get',
                url:urlPath,
                headers:{ 'Content-Type': 'application/x-www-form-urlencoded; charset=gbk'}}
            ).success(function(data,state,config,headers){
                return data;
            })
        };
    })