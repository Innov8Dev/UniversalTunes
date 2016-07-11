angular.module('app', ['app.core,app.directives', 'app.errorInterceptorService', 'LibService', 'app.Index']);
angular.module('app.directives', ['app.passwordMatchDirective', 'app.uibDatepickerPopup']);
angular.module('app.core', ['ui.bootstrap', 'chieffancypants.loadingBar', 'ngMessages', 'textAngular', 'ngSanitize'
        , 'ui.bootstrap.dateparser', 'textAngular', 'angular-bsModal'])

.config(['$httpProvider', '$provide', '$routeProvider', '$locationProvider', function ($httpProvider, $provide, $routeProvider, $locationProvider) {

    $routeProvider
    .when('/', {
        templateUrl: 'app/views/home/home.htm',
        controller: 'Indexcontroller'
    })
    .when('/home', {
        templateUrl: 'app/views/home/home.htm',
        controller: 'Indexcontroller'
    })
    .when('/login', {
        templateUrl: '~/Views/Account/Login',
        //controller: 'LoginController'
    })
   .when('/register', {
        templateUrl: 'app/Views/Account/Register',
        //controller: 'LoginController'
    })
   .otherwise('/home', {
       redirectTo: '/'
   });

    $locationProvider.html5Mode(true);

    $httpProvider.interceptors.push('errorInterceptorService');

    ////initialize get if not there
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }

    $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';

}]);