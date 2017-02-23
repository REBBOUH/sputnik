/**
 * Created by Billel Boudjit on 21/02/2017.
 */
(function () {
    'use strict';

    angular
        .module('sputnikApp')
        .factory('Email', Email);



    Email.$inject = ['$resource'];

    function Email ($resource) {
        var service= $resource('/emails', {}, {
            'query': {method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
        });
        return {
            "getAllEmails" : function( callback){
                service.query().$promise.then(function (result ) {
                    callback(result);
                });
            },
        }
    }
})();
