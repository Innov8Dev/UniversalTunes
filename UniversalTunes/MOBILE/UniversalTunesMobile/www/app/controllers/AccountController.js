angular.module('app.Account', [])
.controller('AccountController', AccountController);

AccountController.$inject = ['$ionicPopup', 'AccountService', '$location'];

function AccountController($ionicPopup, AccountService, $location) {

    //class variables.
    var vm = this;

    vm.logout = logout;

    function logout() {

        var confirmPopup = $ionicPopup.confirm({
            title: "Logout",
            template: "You are about to logout. Click 'OK' to continue"
        });
        confirmPopup.then(function (res) {
            if (res) {
                AccountService.logout();
                $location.path("/security/login");
            }
        });
    };
}