/// <reference path="Views/login.html" />
/// <reference path="Views/login.html" />
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module("app",
    ['ionic', 'validation.match', 'ngStorage', 'ngRoute', 'app.Index', 'app.Account', 'app.AccountService', 'app.SecurityService'
    ]
).run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleLightContent();
        }
    });
}).config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider
        .state("main", {
            url: "/",
            templateUrl: "app/views/index.htm",
            controller: "IndexController"
        })
        .state("security", {
            url: "/security",
            abstract: true,
            templateUrl: "app/views/security.htm"
        })
        //.state("security.login", {
        //    url: "/login",
        //    views: {
        //        'security-login': {
        //            templateUrl: "app/Views/login.html",
        //            controller: "LoginController"
        //        }
        //    }
        //})
        //.state("security.register", {
        //    url: "/register",
        //    views: {
        //        'security-register': {
        //            templateUrl: "app/Views/register.html",
        //            controller: "LoginController"
        //        }
        //    }
        //})
        .state("tab.account", {
            url: "/account",
            views: {
                'tab-account': {
                    templateUrl: "app/views/Tabs/tab-account.htm",
                    controller: "AccountController"
                }
            }
        });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise("/");

    $httpProvider.interceptors.push("errorInterceptorService");

    //initialize get if not there
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }

    $httpProvider.defaults.headers.get["If-Modified-Since"] = "Mon, 26 Jul 1997 05:00:00 GMT";
    $httpProvider.defaults.headers.get["Cache-Control"] = "no-cache";
    $httpProvider.defaults.headers.get["Pragma"] = "no-cache";

});