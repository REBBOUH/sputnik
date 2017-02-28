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
        vm.showResult = false;
        vm.showDetails =showDetails;

        function showDetails() {
            vm.showResult=true;
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
