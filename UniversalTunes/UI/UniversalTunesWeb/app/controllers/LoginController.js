angular.module('app.Login', [])
.controller('LoginController', LoginController);

LoginController.$inject = ['SecurityService','AccountService', '$modal', '$location']

function LoginController(SecurityService, AccountService, $modal, $location) {

    var vm = this;
    vm.login = {};
    vm.user = {};
    vm.successMessage = 'Login successful';

    vm.submitForm = submitForm;
    vm.forgotPassword = forgotPassword;
    vm.resetForm = resetForm;

    function submitForm() {
        //$rootScope.$broadcast('show-errors-check-validity');

        if (vm.loginForm.$valid) {
            AccountService.login(vm.login)
                .then(function (result) {
                    SecurityService.login(result.Id,result.UserName,result.Name+' ' + result.LastName,result.UserType,result.TypeOfUser.Name);
                    vm.user = result;

                    if (vm.user.UserType === 2 ) {
                        $location.path('/home');
                    }
                }, function (error) {
                    vm.hasError = true;
                    vm.errorMessage = 'Not an admim user';
                });
        }
    }

    function forgotPassword() {
        vm.modalInstance = $modal.open({
            animation: false,
            templateUrl: 'app/views/account/forgotPasswordView.htm',
            controller: 'ForgotPasswordController'
        });
        vm.modalInstance.result
            .then(function () {
                $log.info('Ok');
            }, function () {
                $log.info('cancel');
            });
    }

    function resetForm() {
        vm.$broadcast('show-errors-reset');
    }

}