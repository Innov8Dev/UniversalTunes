angular.module("app.EnumService")
    .service("EnumService", EnumService);

EnumService.$inject = ['$http','$q','$rootScope','SecurityService','DeviceInformation'];

function EnumService($http, $q, $rootScope, SecurityService, DeviceInformation) {

    // Models/Variables----------------------------------------------M-
    var vm = this;

    //vm.userType = [];
    vm.securityType = [];
    vm.priceType = [];

    vm.enumsLoadedEvent = 'enums-loaded';
    vm.allEnumsLoaded = false;

    // Functions ----------------------------------------------------F-
    //vm.loadUserType = loadUserType;
    vm.loadSecurityType = loadSecurityType;
    vm.priceType = priceType;
    vm.checkAllEnumsLoaded = checkAllEnumsLoaded;
    vm.getAllEnumsLoaded = getAllEnumsLoaded;

    //function loadUserType() {
    //    var defered = $q.defer();
    //    $http.get("/api/Enums/UserTypeEnum")
    //        .then(function (result) {
    //            vm.userType = result.data;
    //            checkAllEnumsLoaded();
    //        }, function (error) {
    //            defered.reject(error);
    //        });
    //    return defered.promise;
    //};

    function loadSecurityType() {
        var defered = $q.defer();
        return $http.get(DeviceInformation.serverLocation + "/api/AspNetRoles/roles")
            .then(function (result) {
                vm.securityType = result.data;
                checkAllEnumsLoaded();
            }, function (error) {
                defered.reject(error);
            });
        return defered.promise;
    };

    function priceType() {
        var defered = $q.defer();
        return $http.get(DeviceInformation.serverLocation + "/api/Enums/PriceType")
            .then(function (result) {
                vm.priceType = result.data;
                checkAllEnumsLoaded();
            }, function (error) {
                defered.reject(error);
            });
        return defered.promise;
    };

    function checkAllEnumsLoaded() {
        if (vm.securityType.length > 0 && vm.priceType.length > 0) {
            vm.allEnumsLoaded = true;
            $rootScope.$emit(vm.enumsLoadedEvent, vm.allEnumsLoaded);
        }
    };

    function getAllEnumsLoaded() {
        return vm.allEnumsLoaded;
    }

    loadUserType();
    loadSecurityType();
    priceType();
}