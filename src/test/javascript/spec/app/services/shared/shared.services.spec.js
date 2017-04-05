'use strict';

describe('Shared Service Tests', function () {

    describe('absence', function () {
        var shareService;
        beforeEach(inject(function ($injector) {
            shareService = $injector.get('shareService');
        }));
        it('should return exist', function () {
            expect(shareService.existAbsence(new moment("01/03/2017", "DD/MM/YYYY"), true)).toBe(false);
        });
    });
});
