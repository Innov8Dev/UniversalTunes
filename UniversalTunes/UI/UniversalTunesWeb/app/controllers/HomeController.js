angular.module('app.Home', ['angularUtils.directives.dirPagination', 'angular-toArrayFilter'])
.controller('HomeController', HomeController);

HomeController.$inject = ['$rootScope', 'SecurityService', 'EnumsService'];

function HomeController($rootScope, SecurityService,EnumsService) {
    
    var vm = this;

    vm.applicationReady = EnumService.getAllEnumsLoaded();

    vm.navbarProperties = {
        isCollapsed:true
    };

    vm.currentUser = SecurityService.currentUser;

    $rootScope.$on(SecurityService.scopeUpdateEvent, function (event, currentUser) {
        vm.currentUser = SecurityService.currentUser;
        vm.userLoggedIn = true;

    });
}