angular
.module('app.AccountService', [])
.service('AccountService', AccountService);

AccountService.$inject = ['$http', '$q'];

function AccountService($http, $q) {
    var vm = this;

    vm.user = {};
    vm.login = {};
    vm.register = register;
    vm.login = login;
    vm.currentUser = currentUser;
    vm.singOut = singOut;
    vm.ResetPassword = ResetPassword;
    vm.SendPassword = SendPassword;

    function register(user) {
        var defered = $q.defer();
        $http.post('/api/Accounts/Register', user)
            .then(function (result) {
                vm.user = result.data;
            }, function (error) {
                defered.reject(error);
            });
        return defered.promise;
    };

    function login(login) {
        var defered = $q.defer();
        vm.login = {
            Email : login.userName,
            Password:login.password,
            RememberMe: login.rememberMe
        };
        $http.post('/api/Accounts/Login/', vm.login)
            .then(function (result) {
                defered.resolve(result.data);
                //vm.user = result.data;
            }, function (error) {
                defered.reject(error);
            });
        return defered.promise;
    };

    function currentUser() {
        var defered = $q.defer();
        $http.get('/api/Accounts/GetCurrentUser')
            .then(function (result) {
                defered.resolve(result.data);
                //vm.user = result.data;
            }, function (error) {
                defered.reject(error);
            });
        return defered.promise;
    }

    function singOut() {
        var defered = $q.defer();
        $http.post('/api/Accounts/LogOff/')
            .then(function (result) {
                vm.user = result.data;
            }, function (error) {
                defered.reject(error);
            });
        return defered.promise;
    }

    function ResetPassword(newpassword) {
        var defered = $q.defer();
        $http.post("/api/Accounts/ResetPassword", newpassword)
           .then(function (result) {
               vm.user = result.data;
           }, function (error) {
               defered.reject(error);
           });
        return defered.promise;
    };

    function SendPassword(newpassword) {
        var defered = $q.defer();
        $http.post("/api/Accounts/SendPassword", viewModel)
            .then(function (result) {
                vm.user = result.data;
            }, function (error) {
                defered.reject(error);
            });
        return defered.promise;
    };
}