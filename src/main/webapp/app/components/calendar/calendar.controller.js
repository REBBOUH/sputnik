(function() {
    'use strict';

    angular
        .module('sputnikApp')
        .component('cal', {
            templateUrl: "app/components/calendar/calendar.html",
            controller: calController,
        });

    calController.$inject = ['$scope'];

    function calController($scope) {
        var vm = this;
        $scope.uiConfig = {
            calendar:{
                height: 450,
                header:{
                    center: 'title',
                    right: 'today prev,next'
                },
                eventClick: $scope.alertEvent,
                eventDrop: $scope.alertEvent,
                eventResize: $scope.alertEvent
            }
        };
        $scope.alertEvent = function (event) {
            alert(event);
        }
    }
})();






/*.controller('CalendarController', function () {
 var vm = this;
 vm.uiConfig = {
 calendar:{
 height: 450,
 editable: true,
 header:{
 left: 'month basicWeek basicDay agendaWeek agendaDay',
 center: 'title',
 right: 'today prev,next'
 },

 eventClick: $scope.alertEvent,
 eventDrop: $scope.alertEvent,
 eventResize: $scope.alertEvent
 }
 };
 vm.alertEvent = function (event) {
 alert(event);
 }
 });*/
