angular.module('app').directive("keypressEnter", function () {

    var keypressEnter = function (scope, element, attrs) {

        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.keypressEnter);
                });
                event.preventDefault();
            }
        });
        // console.log(element);
    }

    return {
        restrict: 'A',
        link: keypressEnter
    };

});