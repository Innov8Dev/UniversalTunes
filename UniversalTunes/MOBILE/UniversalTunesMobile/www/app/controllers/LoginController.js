angular.module('app.Index', [])
.controller('LoginController', LoginController);

LoginController.$inject = ['$rootScope', '$location', '$ionicPopup', '$timeout', 'AccountService'];

function LoginController($rootScope, $location, $ionicPopup, $timeout, AccountService) {

    var vm = this;
    vm.login = {
        username: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        surname: '',
        email: ''
    };

    vm.hasError = hasError;
    vm.closeError = closeError;
    vm.showAlert = showAlert;
    vm.submitLoginForm = submitLoginForm;
    vm.submitRegisterForm = submitRegisterForm;

    function hasError(error) {
        vm.hasErrors = true;
        vm.errorMessage = error;
    }

    function closeError() {
        vm.hasErrors = false;
    }

    function showAlert(title, template) {
        vm.alertPopup = $ionicPopup.alert({
            title: title,
            template: template
        });
        vm.alertPopup
            .then(function (result) {

            });
    }

    function submitLoginForm() {
        vm.$broadcast('show-errors-check-validity');
        if (vm.loginForm.$valid) {
            AccountService.login(vm.login)
                .then(function (result) {
                    $rootScope.isLoggin = true;
                    $location.path = ('tabs/topdownloads');
                }, function (error) {
                    vm.hasErrors = true;
                    vm.errorMessage = error;
                    AccountService.logout();
                });
        } else {
            vm.showAlert('Failed', 'Please fill in all the text boxes');
            hasError('Failed: Please fill in all the text boxes');
        }
    }

    function submitRegisterForm() {
        vm.$broadcast("show-errors-check-validity");
        if (vm.registerForm.$valid) {
            AccountService.register($scope.viewModel)
                .then(function (result) {
                    AccountService.login($scope.viewModel)
                        .then(
                        function (result) {
                            $rootScope.isLoggedIn = true;
                            $location.path("tab/topdownloads");
                        },
                        function (error) {
                            $scope.hasError = true;
                            $scope.errorMessage = error;
                            AccountService.logout();
                        }
                    );
                }, function (error) {
                    $scope.hasError = true;
                    $scope.errorMessage = error;
                    AccountService.logout();
                });
        } else {
            vm.showAlert("Failed", "Please fill in all the text boxes");
            hasError("Failed: Please fill in all the text boxes");

        }

    }

}