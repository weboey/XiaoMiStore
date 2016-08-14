/**
 * angular-swx-local-storage - $localStorage service for use in your AngularJS applications.
 * @author Paul Massey, paul.massey@scriptwerx.io
 * @version v1.0.2
 * @build 35 - Mon Feb 29 2016 12:06:30 GMT+0000 (GMT)
 * @link http://www.scriptwerx.io
 * @license MIT
 */
(function(angular) {

    'use strict';

    /**
     * @ngdoc service
     * @name $localStorage
     *
     * @requires $window
     * @requires $location
     * @requires $cacheFactory
     *
     * @description Provides a key-value (string-object) storage, that is backed by localStorage with support for expiry (in days).
     * Objects put or retrieved from this storage are automatically serialized or deserialized by angular's toJson/fromJson.
     *
     * @param {service} $window The $window service.
     * @param {service} $location The $location service.
     * @param {service} $cacheFactory The $cacheFactory service.
     *
     * @example
     * ```js
     * myApp.$inject = ['$localStorage'];
     * function myApp($localStorage) {
   *   // Your app code...
   * }
     *
     * angular
     *   .module('myApp', ['swxLocalStorage']);
     * ```
     *
     * @ngInject
     */
    $localStorage.$inject = ['$window', '$location', '$cacheFactory'];
    function $localStorage($window, $location, $cacheFactory) {

        /**
         * @private
         * @description
         * Create a prefix to be used by $window.localStorage
         */
        var prefix = $location.host().substring(0, $location.host().indexOf('.')) + '_',
            webStorage,
            oneDay = 24 * 60 * 60 * 1000,
            cache = $cacheFactory(prefix + 'cache'),
            service = this,
            isLocalStorageAvailable = true;

        /**
         * @ngdoc method
         * @name $localStorage.prefix
         * @methodOf $localStorage
         *
         * @description
         * Overrides the default domain prefix.
         *
         * <strong>N.B. Destroys the existing cache.</strong>
         *
         * @param {string} val The string to add to the persistent data prefix.
         *
         * @example
         * ```js
         * $localStorage.prefix('myPrefix');
         * ```
         */
        service.prefix = function(val) {
            prefix = val + '_';
            cache.destroy();
            cache = $cacheFactory(prefix + 'cache');
        };

        /**
         * @ngdoc method
         * @name $localStorage.put
         * @methodOf $localStorage
         *
         * @description Add data to storage
         *
         * @param {string} key The key to store the data with.
         * @param {*} value The data to store.
         * [@param {number} expires] (expiry in days)
         *
         * @example
         * ```js
         * $localStorage.put('myKey', { data: 'my_data' });
         * ```
         */
        service.put = function(key, value) {

            var dataToStore = { data: value };

            if (arguments.length > 2 && angular.isNumber(arguments[2])) {
                dataToStore.expires = new Date().getTime() + (arguments[2] * oneDay);
            }

            cache.put(key, dataToStore);

            if (isLocalStorageAvailable) {
                webStorage.setItem(prefix + key, angular.toJson(dataToStore, false));
            }

            return value;
        };

        /**
         * @ngdoc method
         * @name $localStorage.get
         * @methodOf $localStorage
         *
         * @description Get data from localStorage, will return from session cache if possible for greater performance.
         *
         * @param {String} key The key of the stored data to retrieve.
         * @returns {*} The value of the stored data or undefined.
         *
         * @example
         * ```js
         * $localStorage.get('myKey');
         * ```
         */
        service.get = function(key) {

            var item;

            if (cache.get(key)) {
                item = cache.get(key);
            }
            else if (isLocalStorageAvailable) {
                item = angular.fromJson(webStorage.getItem(prefix + key));
            }

            if (!item) {
                return void 0;
            }

            if (item.expires && item.expires < new Date().getTime()) {
                service.remove(key);
                return void 0;
            }

            cache.put(key, item);

            return item.data;
        };

        /**
         * @ngdoc method
         * @name $localStorage.remove
         * @methodOf $localStorage
         *
         * @descriotion Remove data from storage.
         *
         * @param {String} key The key of the stored data to remove.
         *
         * @example
         * ```js
         * $localStorage.remove('myKey');
         * ```
         */
        service.remove = function(key) {
            service.put(key, void 0);
            if (isLocalStorageAvailable) {
                webStorage.removeItem(prefix + key);
            }
            cache.remove(key);
        };

        /**
         * @ngdoc method
         * @name $localStorage.empty
         * @methodOf $localStorage
         *
         * @description Delete all data from session storage and localStorage.
         *
         * @example
         * ```js
         * $localStorage.empty();
         * ```
         */
        service.empty = function() {
            if (isLocalStorageAvailable) {
                webStorage.clear();
            }
            cache.removeAll();
        };

        /**
         * @private
         * @description
         * Check for $window.localStorage availability and functionality
         */
        (function() {

            // Some browsers will return true when in private browsing mode so test to make sure it's functional.
            try {
                webStorage = $window.localStorage;
                var key = 'swxTest_' + Math.round(Math.random() * 1e7);
                webStorage.setItem(key, 'test');
                webStorage.removeItem(key);
            }
            catch (e) {
                isLocalStorageAvailable = false;
            }

        })();
    }

    /**
     * @ngdoc overview
     * @name swxLocalStorage
     * @description
     * $localStorage service for use in your AngularJS applications.
     *
     * Provides a key-value (string-object) storage, that is backed by localStorage with support for expiry (in days).
     * Objects put or retrieved from this storage are automatically serialized or deserialized by angular's toJson/fromJson.
     */
    angular
        .module('swxLocalStorage', [])
        .service('$localStorage', $localStorage);

})(window.angular);