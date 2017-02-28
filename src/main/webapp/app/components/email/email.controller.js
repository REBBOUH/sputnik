/**
 * Created by Billel Boudjit on 22/02/2017.
 */
(function() {
    'use strict';
    angular
        .module('sputnikApp')
        .controller('EmailController', EmailController);

    EmailController.$inject = ['$scope','Email','$state','shareService'];

    function EmailController ($scope, Email,$state, shareService) {
        var vm = this;
        $scope.emailInput = "";

        vm.sharedValues = shareService.sharedValues;
        vm.invalid = false;
        vm.checkEmail = function () {
            Email.getAllEmails(function (emails) {
                if(emails.indexOf($scope.emailInput) > -1){
                    shareService.sharedValues.email = $scope.emailInput;
                    $state.go('home');
                }
                else{
                    vm.invalid = true;
                }
            })
        }
    }
})();
