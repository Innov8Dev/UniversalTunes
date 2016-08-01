angular
.module('app.SecurityService', [])
.service('SecurityService', SecurityService);

SecurityService.$inject = ['$rootScope', 'EnumService'];

function SecurityService($rootScope, EnumService) {
    //variables
    var vm = this;
    vm.scopeUpdateEvent = 'current-user-updated';
    vm.currentUser = {
        loggedIn: false,
        id: 0,
        userName: '',
        displayName: '',
        allowedPrivileges: 0,
        userType: ''
    };

    //Methods
    vm.login = login;
    vm.logout = logout;
    vm.userHasPrivileges = userHasPrivileges;
    vm.isAllowed = isAllowed;

    function login(id, userName, displayName, allowedPrivileges, userType) {
        vm.currentUser.id = id;
        vm.currentUser.userName = userName;
        vm.currentUser.displayName = displayName;
        vm.currentUser.allowedPrivileges = allowedPrivileges;
        vm.currentUser.userType = userType;
        vm.currentUser.loggedIn = true;

        $rootScope.$emit(vm.scopeUpdateEvent, vm.currentUser);

    };

    function logout() {
        vm.currentUser.id = 0;
        vm.currentUser.userName = '';
        vm.currentUser.displayName = '';
        vm.constructor.isLoggedIn = false;


    };

    $rootScope.$emit(vm.scopeUpdateEvent, vm.currentUser);

    function userHasPrivileges() {
        if (!vm.currentUser || vm.currentUser.userType == null || vm.currentUser.userType == "")
            return false;

        if (vm.currentUser.allowedPrivileges !== 2)
            return false;

        return true;
    }

    function isAllowed(role) {
        if (!userHasPrivileges())
            return false;

        vm.allValues = EnumService.securityType;
        var myEnum = -1;
        for (x = 0; x < vm.allValues.length; x++) {
            if (vm.allValues[x].Name == role) {
                myEnum = vm.allValues[x].ordinalValue;
                break;
            }
        }

        if (myEnum < 0)
            return false;

        var result = vm.currentUser.userType;//.indexOf(myEnum) > -1;
        return result;
    }
}