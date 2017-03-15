/**
 * Created by Billel Boudjit on 22/02/2017.
 */
(function () {
    'use strict';
    angular
        .module('sputnikApp')
        .controller('EmailController', EmailController);

    EmailController.$inject = ['$scope', 'Email', '$state', '$localStorage', 'Principal'];

    function EmailController($scope, Email, $state, $localStorage, Principal) {
        var vm = this;
        vm.isAuthenticated = Principal.isAuthenticated;
        vm.account = null;
        vm.invalid = false;
        vm.getAccount = getAccount();

        function getAccount() {
            if (vm.isAuthenticated()) {
                Principal.identity().then(function (account) {
                    vm.account = account;
                    vm.email = vm.account.email;
                });
            }
        }

        $scope.$on('authenticationSuccess', function () {
            getAccount();
        });

        vm.checkEmail = function () {
            Email.getAllEmails(function (emails) {
                if (emails.indexOf(vm.email) > -1) {
                    $localStorage.email = vm.email;
                    $localStorage.firstName = "";
                    $localStorage.lasttName = "";
                    $state.go('home');
                }
                else {
                    vm.invalid = true;
                }
            })
        }
    }
})();
