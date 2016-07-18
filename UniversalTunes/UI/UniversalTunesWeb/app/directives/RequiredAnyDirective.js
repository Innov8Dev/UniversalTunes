angular.module('app').directive('requiredAny', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function postLink(scope, elem, attrs, ctrl) {
            // If there is no 'ngModel' or no groupName has been specified,
            // then there is nothing we can do
            if (!ctrl || !attrs.requiredAny) { return };

            // If this is the first time we've used this directive in this scope,
            // create a section for it's data. If you need / want to make use of
            // an isolate scope you'll need to make 'var groups' scoped to the directive;
            // but then you may want to look in to clearing out group entries yourself
            if (!scope.__requiredAnyGroups) {
                scope.__requiredAnyGroups = {}
            }
            var groups = scope.__requiredAnyGroups;

            // Create a bucket for this group if one does not yet exist
            if (!groups[attrs.requiredAny]) {
                groups[attrs.requiredAny] = {};
            }
            var group = groups[attrs.requiredAny];

            // Create the entry for this control
            group[attrs.ngModel] = {
                ctrl: ctrl,
                hasValue: false
            };

            ctrl.$validators.requiredAny = function (view, value) {
                var thisCtrl = group[attrs.ngModel],
                        ctrlValue = (typeof value !== 'undefined') && value,
                        oneHasValue = false;

                thisCtrl.hasValue = ctrlValue;

                // First determine if any field in the group has a value
                for (var prop in group) {
                    if (group.hasOwnProperty(prop) && group[prop].hasValue) {
                        oneHasValue = true;
                        break;
                    }
                }

                // Set the validity of all other fields based on whether the group has a value
                for (var prop in group) {
                    if (group.hasOwnProperty(prop) && thisCtrl != group[prop]) {
                        group[prop].ctrl.$setValidity('requiredAny', oneHasValue);
                    }
                }

                // Return the validity of this field
                return oneHasValue;
            };
        }
    };
});