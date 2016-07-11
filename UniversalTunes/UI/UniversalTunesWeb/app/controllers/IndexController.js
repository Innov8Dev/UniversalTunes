angular.module('app.Index', ['angularUtils.directives.dirPagination', 'angular-toArrayFilter'])
.controller('IndexController', IndexController);

IndexController.$inject = ['$http','SecurityService'];

function IndexController($http, SecurityService) {

    //class variables.
    var vm = this;
    vm.currentUser = SecurityService.currentUser;
    vm.search = '';
    vm.perPage = "10";
    vm.applicationReady = false;
    vm.navbarProperties = {
        isCollapsed: true
    };

    //class methods
    vm.goHome = goHome;

    function goHome() {
        vm.user = SecurityService.currentUser;

        if (vm.user.userType === 'Consumer') {
            $location.path=('/')
        }
    }
}