angular.module('app').service('LibService', LibService);

LibService.$inject = ['$http'];

function LibService($http) {
    var vm = this;

    vm.interceptorForHandlingErrors = interceptorForHandlingErrors;
    vm.removeArrayItem = removeArrayItem
    vm.findIndexOfItemInArray = findIndexOfItemInArray;

    function interceptorForHandlingErrors($http, response) {
        console.log(response);
        $http.post('/api/Errors/error', response);
    }

    function removeArrayItem(array, itemToRemove) {
        var removeCounter = 0;
        for (var index = 0; index < array.length; index++) {
            if (array[index] === itemToRemove) {
                array.splice(index, 1);
                removeCounter++;
                index--;
            }
        }
        return removeCounter;
    }


    function findIndexOfItemInArray(array, item) {
        return array.indexOf(item);
    }

}