(function() {
    'use strict';
    angular
        .module('sputnikApp')
        .controller('calendarDemo',  function($scope) {
            $scope.day = moment();

        });

    angular
        .module('sputnikApp')
        .directive("calendar", function() {
        return {
            restrict: "E",
            templateUrl: "app/home/calendar.html",
            scope: {
                selected: "=",
            },
            link: function(scope) {

                    scope.workingDays = [];

                scope.selected = _removeTime(scope.selected || moment());
                scope.month = scope.selected.clone();

                var start = scope.selected.clone();
                start.date(1);
                _removeTime(start.day(0));

                _buildMonth(scope, start, scope.month);

                scope.select = function(day) {
                    scope.selected = day.date;
                    var i = scope.workingDays.indexOf( scope.selected.format('DD/MM/YYYY'));
                    console.log(i);
                    if(i != -1) {
                        day.selectedDay = false;
                        scope.workingDays.splice(i, 1);}
                    else{
                        day.selectedDay = true;
                        scope.workingDays.push(day.date.format('DD/MM/YYYY'));
                    }

                    console.log(scope.workingDays);
                    console.log('Number of Working days = '+scope.workingDays.length);
                   // day.active = false;

                    //console.log(scope.selected.isSame('2017-02-20'));
                };

                scope.next = function() {
                    var next = scope.month.clone();
                    _removeTime(next.month(next.month()+1).date(1));
                    scope.month.month(scope.month.month()+1);
                    _buildMonth(scope, next, scope.month);
                };

                scope.previous = function() {
                    var previous = scope.month.clone();
                    _removeTime(previous.month(previous.month()-1).date(1));
                    scope.month.month(scope.month.month()-1);
                    _buildMonth(scope, previous, scope.month);
                };
            }
        };

        function _removeTime(date) {
            return date.day(1).hour(0).minute(0).second(0).millisecond(0);
        }

        function _buildMonth(scope, start, month) {
            scope.weeks = [];
            var done = false, date = start.clone(), monthIndex = date.month(), count = 0;
            while (!done) {
                scope.weeks.push({ days: _buildWeek(date.clone(), month) });
                date.add(1, "w");
                done = count++ > 2 && monthIndex !== date.month();
                monthIndex = date.month();
            }
        }

        function _buildWeek(date, month) {
            var days = [];
            var holiday = ["01/01/2017","01/02/2017","25/05/2017","28/02/2017","14/07/2017","15/08/2017","01/11/2017","11/11/2017","25/12/2017"]

            for (var i = 0; i < 7; i++) {
                days.push({
                    selectedDay: false,

                    name: date.format("dd").substring(0, 1),
                    number: date.date(),
                    isCurrentMonth: date.month() === month.month(),
                    isToday: date.isSame(new Date(), "day"),
                    date: date,
                    active: (i != 5 && i != 6 &&(holiday.indexOf(date.format('DD/MM/YYYY'))== -1))
                });
                date = date.clone();
                date.add(1, "d");
            }
            return days;
        }
    });
})();






