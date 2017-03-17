(function () {
    'use strict';

    angular
        .module('sputnikApp')
        .factory('notWorkingDays', notWorkingDays);

    notWorkingDays.$inject = ['$resource'];

    function notWorkingDays ($resource) {
        return $resource('api/notWorkingDays',{'query': {method: 'GET', isArray: true}});
    }
})();
