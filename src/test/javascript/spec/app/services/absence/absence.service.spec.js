'use strict';

describe('Service Tests', function () {
    beforeEach(mockApiAccountCall);
    beforeEach(mockScriptsCalls);

    describe('absence', function () {
        var $httpBackend;
        beforeEach(inject(function ($injector) {
            $httpBackend = $injector.get('$httpBackend');
            $httpBackend
                .expectGET(/api\/absence\?cacheBuster=\d+/)
                .respond(200, [{
                    "id": "58d245a0c7c6bf00446b2782",
                    "year": 2017,
                    "month": 3,
                    "day": 22,
                    "demiJournee": false
                }, {
                    "id": "58d245a0c7c6bf00446b2783",
                    "year": 2017,
                    "month": 3,
                    "day": 24,
                    "demiJournee": false
                }, {"id": "58d245a0c7c6bf00446b2784", "year": 2017, "month": 4, "day": 24, "demiJournee": false}]);
        }));

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should get data from /api/absence)', inject(function ($http) {
            var $scope = {};
            /* Code Under Test */
            $http.get('/api/absence')
                .success(function (data) {
                    $scope.valid = true;
                    $scope.response = data;
                }).error(function (data) {
                $scope.valid = false;
            });

            expect($httpBackend.flush).not.toThrow();
        }));
    });
});

