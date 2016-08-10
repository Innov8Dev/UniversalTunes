angular.module("app.AccountService")
    .service('AccountService', AccountService);

AccountService.$inject = ["$http", "$q", "SecurityService", "DeviceInformation"];

function AccountService($http, $q, SecurityService, DeviceInformation) {

    var vm = this;

    vm.getCurrentUser = getCurrentUser;
    vm.register = register;
    vm.logout = logout;
    vm.login = login;
    vm.init = init;

    function getCurrentUser() {
        var deferred = $q.defer();
        $http.get(DeviceInformation.serverLocation + "/api/Account/GetCurrentUser")
            .then(function (result) {
                SecurityService.setCurrentUserDetails(result.data.displayName,
                    result.data.allowedPrivileges, result.data.userName);
                deferred.resolve(result.data);
            },
            function (error) {
                deferred.reject(error.data.message);
            });

        return deferred.promise;
    };

    function register(viewModel) {
        var deferred = $q.defer();
        $http.post(DeviceInformation.serverLocation + "/api/Account/Register", viewModel)
            .then(function (result) {
                deferred.resolve(result.data);
            }, function (error) {
                deferred.reject(error.data.message);
            });
        return deferred.promise;
    };

    function logout() {
        SecurityService.logout();
    };

    function login(viewModel) {
        var data = "grant_type=password&username=" + viewModel.username + "&password=" + viewModel.password;
        var deferred = $q.defer();
        $http.post(DeviceInformation.serverLocation + "/token", data, {
            headers:
            { 'Content-Type': "application/x-www-form-urlencoded" }
        }).success(function (response) {
            SecurityService.login(response.access_token, viewModel.userName);
            vm.getCurrentUser().then(
                function (result) {
                    deferred.resolve(response);
                }, function (err) {
                    deferred.reject(err);
                });
        }).error(function (err, status) {
            logout();
            deferred.reject(err.error_description);
        });
        return deferred.promise;
    };

    function init() {
        var deferred = $q.defer();

        if (SecurityService.init()) {

            vm.getCurrentUser().then(
                function (result) {
                    deferred.resolve(result);
                },function (err) {
                    deferred.reject(err);
                });
        } else {
            logout();
            deferred.reject("Not logged in!");
        }
        return deferred.promise;
    };
};