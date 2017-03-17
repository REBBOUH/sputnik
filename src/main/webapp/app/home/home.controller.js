(function () {
    'use strict';

    angular
        .module('sputnikApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'Principal', 'LoginService', '$state', 'shareService', '$localStorage', 'notWorkingDays', '$mdDialog'];

    function HomeController($scope, Principal, LoginService, $state, shareService, $localStorage, notWorkingDays, $mdDialog) {
        var vm = this;
        vm.firstName = $localStorage.firstName;
        vm.lastName = $localStorage.lasttName;
        vm.email = $localStorage.email;
        vm.sharedValues = shareService.sharedValues;
        vm.account = null;
        vm.isAuthenticated = null;
        vm.login = LoginService.open;
        vm.register = register;
        vm.showDetails = showDetails;
        vm.showHistory = showHistory;
        vm.history = false;
        vm.printDocument = printDocument;
        vm.getSelectedMonth = shareService.getSelectedMonth;
        vm.getWorkingDays = shareService.getWorkingDays;
        vm.getNbNotWorkingDays = getNbNotWorkingDays;
        vm.isAuthenticated = Principal.isAuthenticated;
        vm.notWorkingDays = "";


        function getNbNotWorkingDays() {
            return shareService.getNbNotWorkingDays(shareService.getSelectedDate());
        }

        function printDocument() {

            if (vm.isAuthenticated()) {
                var pdf = new jsPDF('p', 'pt', 'a4');
                pdf.addHTML(document.getElementsByClassName("print"), 1, 30, function () {
                    pdf.save('rapport.pdf');
                });
                var notWorkingDays = JSON.parse($localStorage.notWorkingDays);
                var i;
                for (i = 1; i <= 12; i++) {
                    var month = "";
                    var days = "";
                    var data = {};
                    if (i < 10) {
                        month = "0" + i;
                    } else {
                        month = i.toString();
                    }
                    days = JSON.stringify(notWorkingDays[month]);
                    data = {"month": month, "days": days};
                    createNotWorkingDays({"month": month, "days": days}, function () {
                        console.log("success");
                    });
                }
            }else{
                $state.go('register');
            }
        }

        function showDetails() {
            $localStorage.firstName = vm.firstName;
            $localStorage.lasttName = vm.lastName;
            shareService.sharedValues.showDetail = true;
        }

        function showHistory() {
            if (vm.history == true) {
                vm.history = false;
            } else {
                if (vm.isAuthenticated()) {
                    getNotWorkingDays(function (result) {
                        vm.notWorkingDays = result;
                    });
                }else{
                    $state.go('register');
                }
                vm.history = true;
            }
        }

        function createNotWorkingDays(data, callback) {
            var cb = callback || angular.noop;
            return notWorkingDays.save(data,
                function () {
                    return cb(data);
                },
                function (err) {
                    return cb(err);
                }).$promise;
        };

        function getNotWorkingDays(callback) {
            var cb = callback || angular.noop;

            return notWorkingDays.query(
                function (response) {
                    return cb(response);
                },
                function (err) {
                    return cb(err);
                }).$promise;
        }


        $scope.$on('authenticationSuccess', function () {
            getAccount();
        });

        $scope.$on('logout', function () {
            vm.firstName = "";
            vm.lastName = "";
            vm.email = "";
        });

        getAccount();

        function getAccount() {
            Principal.identity().then(function (account) {
                vm.account = account;
                if (vm.isAuthenticated()) {
                    vm.firstName = account.firstName;
                    vm.lastName = account.lastName;
                    vm.email = account.email;
                }
            });
        }

        function register() {
            $state.go('register');
        }
    }
})();
