(function () {
    'use strict';

    angular
        .module('sputnikApp')
        .factory('absence', absence);

    absence.$inject = ['$resource'];

    function absence ($resource) {
        return $resource('api/absence',{'query': {method: 'GET', isArray: true}});
    }
})();
