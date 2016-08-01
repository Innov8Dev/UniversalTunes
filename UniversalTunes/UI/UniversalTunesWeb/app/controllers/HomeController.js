angular.module('app.Home', ['angularUtils.directives.dirPagination', 'angular-toArrayFilter'])
.controller('HomeController', HomeController);

HomeController.$inject = ['$rootScope', 'SecurityService', 'EnumService'];

function HomeController($rootScope, SecurityService,EnumService) {
    
    var vm = this;

    vm.applicationReady = EnumService.getAllEnumsLoaded();

    vm.navbarProperties = {
        isCollapsed:true
    };

    vm.currentUser = SecurityService.currentUser;

    vm.userLoggedIn = false;

    $rootScope.$on(SecurityService.scopeUpdateEvent, function (event, currentUser) {
        vm.currentUser = SecurityService.currentUser;
        vm.userLoggedIn = true;

    });

    $rootScope.$on(EnumService.enumsLoadedEvent, function (event) {
        vm.applicationReady = true;
        vm.$apply();
    });
}