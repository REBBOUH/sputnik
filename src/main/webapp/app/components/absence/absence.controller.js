(function () {
    'use strict';
    angular
        .module('sputnikApp')
        .controller('AbsenceController', AbsenceController);
    AbsenceController.$inject = ['$scope', '$state', '$localStorage', 'Principal', 'absence', '$log', '$timeout'];

    function AbsenceController($scope, $state, $localStorage, Principal, absence, $log, $timeout) {
        var vm = this;
        vm.isAuthenticated = Principal.isAuthenticated;
        vm.saveAbsences = saveAbsences;
        vm.messageSuccess = true;

        function saveAbsences() {
            if (vm.isAuthenticated()) {
                var absences = JSON.parse($localStorage.absences);
                var i;
                for (i = 1; i <= 12; i++) {
                    var month = "";
                    if (i < 10) {
                        month = "0" + i;
                    } else {
                        month = i.toString();
                    }
                    var absencesByMonth = absences[month];
                    absencesByMonth.forEach(function (absence) {
                        $log.info(absence);
                        createAbsence(absence, function () {
                            $log.info("Absence added successfully");
                        });
                    });
                }
                vm.messageSuccess = false;
                $timeout(function () {
                    vm.messageSuccess = true;
                }, 3000);
            }
            else {
                $state.go('register');
            }
        }

        function createAbsence(data, callback) {
            var cb = callback || angular.noop;
            return absence.save(data,
                function () {
                    return cb(data);
                },
                function (err) {
                    return cb(err);
                }).$promise;
        };
    }
})();
