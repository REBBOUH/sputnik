/**
 * Created by Billel Boudjit on 27/02/2017.
 */

(function () {
    'use strict';

    angular
        .module('sputnikApp')
        .factory('shareService', shareService);

    function shareService () {
        var shared = { workingDays: 0, email: '',notWorkingDays:[] };
        return {
            sharedValues: shared,
        };
    }
})();


