(function() {
    'use strict';

    angular
        .module('sputnikApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('absence', {
            parent: 'app',
            url: '/absence',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'app/components/absence/absence.html',
                    controller: 'AbsenceController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
