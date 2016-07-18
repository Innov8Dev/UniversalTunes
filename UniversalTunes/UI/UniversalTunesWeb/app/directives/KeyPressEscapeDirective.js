angular.module('app').directive("keypressEscape", function () {

    var keypressEscape = function (scope, element, attrs) {

        element.bind("keydown keypress", function (event) {
            if (event.which === 27) {
                scope.$apply(function () {
                    scope.$eval(attrs.keypressEscape);
                });
                event.preventDefault();
            }
        });
        // console.log(element);
    }

    return {
        restrict: 'A',
        link: keypressEscape
    };

});