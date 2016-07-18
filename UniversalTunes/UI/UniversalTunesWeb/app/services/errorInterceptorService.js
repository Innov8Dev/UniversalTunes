angular
    .module('app.errorInterceptorService', [])
    .factory('errorInterceptorService', errorInterceptorService);

errorInterceptorService.$inject = ['$log', '$q', '$injector'];
function errorInterceptorService($log, $q, $injector) {

    return {
            'response': function (response) {
                //Will only be called for HTTP up to 300
                return response;
            },
            'responseError': function (rejection) {
                var config = rejection.config || {};
                
                if (rejection.statusText) {
                    console.log("Get the status text here!");
                    console.log(rejection.data);
                }
                else {
                    console.log("The error!");
                }

                if (rejection.status >= 401 || rejection.status <= 400) {

                    var $http = $injector.get('$http');

                    var libService = new LibService();
                    libService.interceptorForHandlingErrors($http, rejection.data);
                }

                return $q.reject(rejection);
            }
        };
}