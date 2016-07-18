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
        allowedPrivileges: null,
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

        $rootScope.$emit(_scopeUpdateEvent, vm.currentUser);

    }

    function logout() {
        vm.currentUser.id = 0;
        vm.currentUser.userName = '';
        vm.currentUser.displayName = '';
        vm.constructor.isLoggedIn = false;

        $rootScope.$emit(vm.scopeUpdateEvent, vm.currentUser);

    }

    function userHasPrivileges() {
        if (!vm.currentUser || vm.currentUser.allowedPrivileges == null)
            return false;

        if (!vm.currentUser.allowedPrivileges.length > 0)
            return false;

        return true;
    }

    function isAllowed(privilegeType) {
        if (!userHasPrivileges())
            return false;

        vm.allValues = EnumsService.securityTypes();
        var myEnum = -1;
        for (x = 0; x < allValues.length; x++) {
            if (allValues[x].name == privilegeType) {
                myEnum = allValues[x].ordinalValue;
                break;
            }
        }

        if (myEnum < 0)
            return false;

        var result = vm.currentUser.allowedPrivileges.indexOf(myEnum) > -1;
        return result;
    }
}