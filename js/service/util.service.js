/**
 * 工具类服务：返回一些公共的工具方法
 */

angular.module("utilMd", [])
    .factory("util", function () {
        //extend Array [+swap] 一个swap函数的实现
        Array.prototype.swap = Array.prototype.swap || function (new_index, old_index) {
                if (new_index >= this.length) {
                    var k = new_index - this.length;
                    while ((k--) + 1) {
                        this.push(undefined);
                    }
                }
                this.splice(new_index, 0, this.splice(old_index, 1)[0]);
                return this;
            };
        Array.prototype.pushObj = Array.prototype.pushObj || function (obj) {
                if (obj == null)
                    return this;
                if (contains(this, obj) != -1) {
                    return this;
                } else {
                    this.push(obj);
                }
                return this;
            };

        return {
            //通过ID查询某个产品
            queryItemById: function (arr, id) {
                var obj = null;
                angular.forEach(arr, function (item) {
                    if (item.productId == id) {
                        obj = item;
                        return;
                    }
                })
                return obj;
            },
            //通过参数查询某个产品,id为查询的key，field为查询的表字段名称
            queryItemByField: function (arr, id, field) {
                var obj = null;
                angular.forEach(arr, function (item, index) {
                    if (item[field].indexOf(id) != -1) {
                        obj = item;
                    }
                })
                return obj;
            },
            //通过参数字段查询某个产品集合,id为查询的key，field为查询的表字段名称
            queryArrByField: function (arr, id, field) {
                var tmpArr = [];
                angular.forEach(arr, function (item, index) {
                    if (item[field].indexOf(id) != -1) {
                        tmpArr.push(item);
                    }
                })
                return tmpArr;
            },
            //判断一个对象是否存在一个数组里
            contains: function (array, obj) {
                var i = array.length;
                while (i--) {
                    if (array[i].name === obj.name) {
                        return i;
                    }
                }
                return -1;
            }
        }
    })