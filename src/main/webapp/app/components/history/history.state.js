(function() {
    'use strict';

    angular
        .module('sputnikApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('history', {
            parent: 'app',
            url: '/history',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'app/components/history/history.html',
                    controller: 'HistoryController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
