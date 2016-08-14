/**
 * Created by Administrator on 16-6-20.
 */

angular.module("httpMd",[])
    .factory("httpService",function($http,$q){
        return{
            get:function(_urlPath){
                var defer=$q.defer(); //声明延后执行
                $http({method:'GET',url:_urlPath})
                    .success(function(data,status,headers,config){
                        defer.resolve(data); //声明执行成功
                    })
                    .error(function(data,status,headers,config){
                        defer.reject(); //声明执行失败
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