angular.module('app.Dashboard')
    .controller("DashboardController", DashboardController);

DashboardController.$inject = ['SecurityService'];

function DashboardController(SecurityService) {

    var vm = this;

    vm.currentUser = SecurityService.currentUser;
    vm.isLoggedIn = true;

}