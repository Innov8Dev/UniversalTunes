angular.module("AmaCouponApp")
    .factory(
        "EnumService", [
            "$http", "$rootScope", "DeviceInformation",
            function($http, $rootScope, DeviceInformation) {

                var _statusType = [];

                var _enumsLoadedEvent = "enums-loaded";
                var _allEnumsLoaded = false;

                var checkAllEnumsLoaded = function() {
                    if (_statusType.length > 0
                        && _securityType.length > 0) {
                        _allEnumsLoaded = true;
                        $rootScope.$emit(_enumsLoadedEvent, _allEnumsLoaded);
                    }
                };

                var _getAllEnumsLoaded = function() {
                    return _allEnumsLoaded;
                };

                //_statusType -Start
                var loadStatusType = function() {
                    return $http.get(DeviceInformation.serverLocation + "api/Enums/StatusTypeEnum").then(function(result) {
                        _statusType = result.data;
                        checkAllEnumsLoaded();
                    });
                };
                var getStatusTypes = function() {
                    return _statusType;
                };
                loadStatusType();
                //_statusType -End

                //_securityType -Start
                var _securityType = [];
                var loadSecurityType = function() {
                    return $http.get(DeviceInformation.serverLocation + "api/Enums/SecurityEnum").then(function(result) {
                        _securityType = result.data;
                        checkAllEnumsLoaded();
                    });
                };
                var getSecurityTypes = function() {
                    return _securityType;
                };
                loadSecurityType();
                //_securityType -End

                return {
                    statusTypes: getStatusTypes,
                    securityTypes: getSecurityTypes,
                    enumsLoadedEvent: _enumsLoadedEvent,
                    enumsLoaded: _getAllEnumsLoaded
                };
            }
        ]);