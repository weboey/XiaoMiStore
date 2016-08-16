/*过滤器模块*/
angular.module("filterMd", [])
    //返回某一分类下的所有产品
    .filter('myFilter', function ($filter) {
        return function (input, itemId) {
            var array = [];
            angular.forEach(input, function (obj) {
                if (itemId == obj.fl_id ||itemId.indexOf('$'+obj.fl_id+'$') != -1) {
                    array.push(obj)
                }
            })
            return array;
            // return $filter("filter")(input,{fl_id:itemId})$filter("filter")(input,{fl_id:2});
            //return $filter("limitTo")(input,3);
        }
    })
    //分页过滤
    .filter('myFilter2', function () {
        return function (input, page) {
            return input.slice((6 * (page - 1)), (page * 6));
        }
    })
/*
 .filter("myFilter",function($filter,$parse){
 return function(input,item,fields){
 if(fields.indexOf("")!=-1)
 {
 //var aa = $parse(fields);
 var tempArr = fields.split("");
 return $filter(tempArr[1].trim())(item[tempArr[0].trim()]);
 }
 return input;
 }
 })*/