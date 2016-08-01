angular.module('app.Index', [])
.controller('IndexController', IndexController);

IndexController.$inject = ['$rootScope', '$location', 'SecurityService', 'AccountService', 'EnumService', 'DerviceInformation'];

function IndexController($rootScope, $location, SecurityService, AccountService, EnumService, DeviceInformation) {

    var vm = this;

    $rootScope.currentUser = SecurityService.currentUser;
    $rootScope.isLoggedIn = false;
    $rootScope.DeviceSystem = DeviceInformation.deviceInformation;
    $rootScope.ServerLocation = DeviceInformation.serverLocation;

    vm.applicationReady = false;
    vm.navbarProperties = {
        isCollapsed: true
    };

    vm.currentUser = SecurityService.currentUser;
    vm.initHome = initHome;
    vm.logout = logout;
    vm.isAllowed = isAllowed;
    vm.userHasPrivileges = userHasPrivileges;

    //Login state
    function initHome() {
        AccountService.init().then(function (r) {
            $rootScope.isLoggedIn = true;
            $location.path("/tab/myCoupons");
        },
            function (e) {
                $rootScope.isLoggedIn = false;
                $location.path("/security/login");
            });

    };

    function logout() {
        AccountService.logout();
        vm.currentUser.loggedIn = false;
        $rootScope.isLoggedIn = false;
        $location.path("/login");
    };

    $rootScope.$on(SecurityService.scopeUpdateEvent, function (event, currentUser) {
        vm.currentUser = SecurityService.currentUser;
    });

    $rootScope.$on(EnumService.enumsLoadedEvent, function (event) {
        vm.applicationReady = true;
    });

    function isAllowed(privilegeType) {
        return SecurityService.isAllowed(privilegeType);
    };

    function userHasPrivileges() {
        return SecurityService.userHasPrivileges();
    };
};