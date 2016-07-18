angular
.module('app.AccountService', [])
.service('AccountService', AccountService);

AccountService.$inject = ['$http'];

function AccountService($http) {
    var vm = this;

    vm.register = register;
    vm.login = login;
    vm.currentUser = currentUser;
    vm.singOut = singOut;
    vm.ResetPassword = ResetPassword;
    vm.sendPassword = sendPassword;

    function register(user) {
        return $http.post('api/Account/Register', user);
    };

    function login(user) {
        return $http.post('api/Account/Login', user);
    };

    function currentUser() {
        return $http.get('/api/Account/GetCurrentUser');
    }

    function singOut() {
        return $http.post('/api/Account/LogOff/');
    }

    function ResetPassword(newpassword) {
        return $http.post("/api/Account/ResetPassword", newpassword);
    };

    var sendPassword = function (viewModel) {
        return $http.post("/api/Account/SendPassword", viewModel);
    };

    return {
        register: register,
        login: login,
        currentUser: currentUser,
        singOut: singOut,
        ResetPassword: ResetPassword,
        sendPassword: sendPassword,
    }
}