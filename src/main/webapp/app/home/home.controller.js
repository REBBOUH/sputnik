(function () {
    'use strict';

    angular
        .module('sputnikApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'Principal', 'LoginService', '$state', 'shareService', '$localStorage'];

    function HomeController($scope, Principal, LoginService, $state, shareService, $localStorage) {
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
        vm.printDocument = printDocument;
        vm.getSelectedMonth = shareService.getSelectedMonth;
        vm.getWorkingDays = shareService.getWorkingDays;
        vm.getNbNotWorkingDays = getNbNotWorkingDays;

        function getNbNotWorkingDays() {
            return shareService.getNbNotWorkingDays(shareService.getSelectedDate());
        }

        function printDocument() {
            var pdf = new jsPDF('p', 'pt', 'a4');
            pdf.addHTML(document.getElementsByClassName("print"), 1, 30, function () {
                pdf.save('rapport.pdf');
            });
        }

        function showDetails() {
            $localStorage.firstName = vm.firstName;
            $localStorage.lasttName = vm.lastName;
            shareService.sharedValues.showDetail = true;
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
                vm.isAuthenticated = Principal.isAuthenticated;
                if (vm.isAuthenticated()) {
                    $scope.firstName = account.firstName;
                    $scope.lastName = account.lastName;
                    vm.email = account.email;
                }
            });
        }

        function register() {
            $state.go('register');
        }
    }
})();
