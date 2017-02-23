/**
 * Created by Billel Boudjit on 22/02/2017.
 */
(function() {
    'use strict';
    angular
        .module('sputnikApp')
        .controller('EmailController', EmailController);

    EmailController.$inject = ['$scope','Email','$state'];

    function EmailController ($scope, Email,$state) {
        var vm = this;
        $scope.emailInput = "";
        vm.invalid = false;
        vm.checkEmail = function () {
            Email.getAllEmails(function (emails) {
                if(emails.indexOf($scope.emailInput) > -1){
                    $state.go('home');
                }
                else{
                    vm.invalid = true;
                }
            })
        }
    }
})();
