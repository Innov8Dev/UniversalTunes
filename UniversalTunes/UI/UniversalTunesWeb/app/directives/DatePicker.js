//angular.module("Hatzolah.CRM.DatePicker", [])
//.directive("daterange", function () {
//    var Linker = function (element, attrs) {
//        element.datepicker({
//            singleDatePicker: true,
//            showDropdowns: true,
//            navigationAsDateFormat: true,
//            format: 'mm/dd/yyyy',
//            startDate: '-3d'
//        });
//    }
//    return {
//        restrict: 'A',
//        link: Linker
//    };

//});

angular
.module('app.uibDatepickerPopup',[])
.directive('uibDatepickerPopup', function (dateFilter, uibDateParser, uibDatepickerPopupConfig) {
    return {
        restrict: 'A',
        priority: 1,
        require: 'ngModel',
        link: function (scope, element, attr, ngModel) {
            var dateFormat = attr.uibDatepickerPopup || uibDatepickerPopupConfig.datepickerPopup;
            ngModel.$validators.date = function(modelValue, viewValue) {
                var value = viewValue || modelValue;

                if (!attr.ngRequired && !value) {
                    return true;
                }

                if (angular.isNumber(value)) {
                    value = new Date(value);
                }
                if (!value) {
                    return true;
                } else if (angular.isDate(value) && !isNaN(value)) {
                    return true;
                } else if (angular.isString(value)) {
                    var date = uibDateParser.parse(value, dateFormat);
                    return !isNaN(date);
                } else {
                    return false;
                }
            };
        }
    };
});