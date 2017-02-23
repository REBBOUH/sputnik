(function() {
    'use strict';

    angular
        .module('sputnikApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('checkemail', {
            parent: 'app',
            url: '/',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'app/components/email/email.html',
                    controller: 'EmailController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
