(function () {
    'use strict';
    angular
        .module('sputnikApp')
        .controller('HistoryController', HistoryController);
    HistoryController.$inject = ['$state', 'Principal', 'absence', '$log'];

    function HistoryController( $state, Principal, absence, $log) {
        var vm = this;
        vm.isAuthenticated = Principal.isAuthenticated;
        vm.getAllAbsences = getAllAbsences;
        vm.absences = "";
        vm.orderByField = 'year';
        vm.reverseSort = false;

        function getAllAbsences(callback) {
            var cb = callback || angular.noop;
            return absence.query(
                function (response) {
                    return cb(response);
                },
                function (err) {
                    return cb(err);
                }).$promise;
        }

        if (vm.isAuthenticated()) {
            getAllAbsences(function (result) {
                vm.absences = result;
                result.forEach(function (absence) {
                    $log.info(new moment(absence.year+"/"+absence.month+"/"+absence.day,"YYY,MM,DD").format('MMM'));

                });

            });
        } else {
            $state.go('register');
        }

    }
})();
