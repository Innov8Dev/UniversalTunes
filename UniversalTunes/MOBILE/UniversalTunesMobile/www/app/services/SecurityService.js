angular.module('app.SecurityService')
    .servvice('SecurityService', SecurityService);

SecurityService.$inject = ["$localStorage", "$rootScope"];

function SecurityService($localStorage, $rootScope) {

    var vm = this;

    vm.scopeUpdateEvent = "current-user-updated";

    vm.currentUser = {
        loggedIn: false,
        accessToken: "",
        userName: "",
        displayName: "",
        allowedPrivileges: null
    };

    vm.login = login;
    vm.setCurrentUserDetails = setCurrentUserDetails;
    vm.getCurrentUserDetails = getCurrentUserDetails;
    vm.logout = logout;
    vm.init = init;

    function login(accessToken, username) {
        vm.currentUser.userName = username;
        vm.currentUser.accessToken = accessToken;
        vm.currentUser.loggedIn = true;
        $rootScope.isLoggedIn = true;

        $localStorage.authData = { token: accessToken, userName: username };
    };

    function setCurrentUserDetails(displayName, allowedPrivileges, username) {
        vm.currentUser.displayName = displayName;
        vm.currentUser.allowedPrivileges = allowedPrivileges;
        vm.currentUser.userName = username;
    };

    function getCurrentUserDetails() {
        return vm.currentUser;
    };

    function logout() {
        vm.currentUser.id = 0;
        vm.currentUser.userName = "";
        vm.currentUser.displayName = "";
        vm.currentUser.isLoggedIn = false;
        vm.currentUser.accessToken = "";
        vm.currentUser.allowedPrivileges = [];
        $rootScope.isLoggedIn = false;

        $localStorage.authData = null;
    };

    function init() {
        vm.currentUser.loggedIn = false;

        vm.currentUser.userName = "";
        vm.currentUser.accessToken = "";
        vm.currentUser.displayName = "";
        vm.currentUser.allowedPrivileges = [];

        var authData = $localStorage.authData;

        if (authData) {
            vm.currentUser.loggedIn = true;
            vm.currentUser.userName = authData.userName;
            vm.currentUser.accessToken = authData.token;
        }

        $rootScope.$emit(_scopeUpdateEvent, vm.currentUser);
        return vm.currentUser.loggedIn;
    };
};