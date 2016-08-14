/**
 * Created by Administrator on 16-6-27.
 */

angular.module("utilMd", [])
    .factory("util", function () {
        //extend Array [+swap]
        Array.prototype.swap = function (new_index, old_index) {
            if (new_index >= this.length) {
                var k = new_index - this.length;
                while ((k--) + 1) {
                    this.push(undefined);
                }
            }
            this.splice(new_index, 0, this.splice(old_index, 1)[0]);
            return this; // for testing purposes
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
        function contains(array, obj) {
            var i = array.length;
            while (i--) {
                if (array[i].name === obj.name) {
                    return i;
                }
            }
            return -1;
        };
        return {
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
            queryItemByField: function (arr, id, field) {
                var obj = null;
                angular.forEach(arr, function (item, index) {
                    if (item[field].indexOf(id) != -1) {
                        obj = item;
                    }
                })
                return obj;
            },
            queryArrByField: function (arr, id, field) {
                var tmpArr = [];
                angular.forEach(arr, function (item, index) {
                    if (item[field].indexOf(id) != -1) {
                        tmpArr.push(item);
                    }
                })
                return tmpArr;
            },
            contains: contains
        }
    })