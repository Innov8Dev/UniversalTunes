angular
    .module('app.errorInterceptorService', [])
    .service('errorInterceptorService', errorInterceptorService);

errorInterceptorService.$inject = ['$log', '$q', '$injector', '$location', '$localStorage'];
function errorInterceptorService($log, $q, $injector, $location, $localStorage) {

    var authInterceptorServiceFactory = {};

    var _request = function (config) {

        config.headers = config.headers || {};
        var token = null;
        if ($localStorage.authData) {
            token = $localStorage.authData.token;
        }
        if (token != null && token != "") {
            config.headers.Authorization = "Bearer " + token;
        }

        return config;
    };
    var _responseError = function (rejection) {
        if (rejection.status === 401) {
            $location.path("/login");
        }
        return $q.reject(rejection);
    };
    authInterceptorServiceFactory.request = _request;
    authInterceptorServiceFactory.responseError = _responseError;

    return authInterceptorServiceFactory;
}