angular.module('app.Index', ['angularUtils.directives.dirPagination', 'angular-toArrayFilter'])
.controller('IndexController', IndexController);

IndexController.$inject = ['$rootScope', 'SecurityService', 'EnumService', '$location', 'AccountService'];

function IndexController($rootScope, SecurityService, EnumService, $location, AccountService) {

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
    vm.initHome = initHome;
    vm.isAllowed = isAllowed;
    vm.userHasPrivileges = userHasPrivileges;

    function goHome() {
        vm.user = SecurityService.currentUser;

        if (vm.user.userType === 2) {
            $location.path = ('/userdashboard');
        } else {
            $location.path('/home');
        }
    }

    function initHome(loggedIn, currentUser) {
        if (loggedIn) {
            AccountService.currentUser().then(
             function (result) {
                 SecurityService.login(result.data.id, result.data.userName, result.data.displayName, result.data.allowedPrivileges, result.data.userTypeString);

                 vm.userTypes = EnumService.userTypes();

                 if (result.data.userTypeString == 'Consumer')
                     $location.path('/userdashboard');
                 else
                     $location.path('/home');
             },

             function (error) {
                 vm.hasError = true;
                 vm.errorMessage = error.data.message;
                 SecurityService.logout();
             });
        }
    }

    function logout() {
        AccountService.singOut().then(function (data) {
            vm.currentUser.loggedIn = false;

            SecurityService.logout();
            $location.path('/login');

        }, function (error) {
            vm.currentUser.loggedIn = false;
            vm.$apply();

            SecurityService.logout();
            $location.path('/login');
        });
    }

    $rootScope.$on(SecurityService.scopeUpdateEvent, function (event, currentUser) {
        vm.currentUser = SecurityService.currentUser;
    });


    $rootScope.$on(EnumService.enumsLoadedEvent, function (event) {
        vm.applicationReady = true;

    });

    function isAllowed(privilegeType) {
        return SecurityService.isAllowed(privilegeType);
    }

    function userHasPrivileges() {
        return SecurityService.userHasPrivileges();
    }

}