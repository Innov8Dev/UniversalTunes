angular.module("app.DeviceInformation")
    .service("DeviceInformation", DeviceInformation);

DeviceInformation.$inject = ["$http","$q","SecurityService"];

function DeviceInformation() {
    ionic.Platform.ready(function () {
        // will execute when device is ready, or immediately if the device is already ready.
    });

    return {
        deviceInformation: {
            _deviceInformation: ionic.Platform.device(),
            _isWebView: ionic.Platform.isWebView(),
            _isIPad: ionic.Platform.isIPad(),
            _isIOS: ionic.Platform.isIOS(),
            _isAndroid: ionic.Platform.isAndroid(),
            _isWindowsPhone: ionic.Platform.isWindowsPhone(),
            _currentPlatform: ionic.Platform.platform(),
            _currentPlatformVersion: ionic.Platform.version()
        },
        serverLocation: "http://localhost:56780/"
        //serverLocation: "https://192.168.2.98/"
        //serverLocation: "https://tcramacoupon.azurewebsites.net/"
    };
}