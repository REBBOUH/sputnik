(function() {
    'use strict';

    angular
        .module('sputnikApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'Principal', 'LoginService', '$state','shareService'];

    function HomeController ($scope, Principal, LoginService, $state, shareService) {
        var vm = this;
        vm.sharedValues = shareService.sharedValues;
        vm.account = null;
        vm.isAuthenticated = null;
        vm.login = LoginService.open;
        vm.register = register;
        vm.showDetails =showDetails;

        vm.printDocument = printDocument;
        function printDocument(){
            var pdf = new jsPDF('p', 'pt', 'a4');
            pdf.addHTML(document.getElementsByClassName("well"), function() {
                pdf.save('rapport.pdf');
            });
        }

        function showDetails() {
            shareService.sharedValues.showDetail = true;
        }

        $scope.$on('authenticationSuccess', function() {
            getAccount();
        });

        getAccount();

        function getAccount() {
            Principal.identity().then(function(account) {
                vm.account = account;
                vm.isAuthenticated = Principal.isAuthenticated;
            });
        }
        function register () {
            $state.go('register');
        }
    }
})();
