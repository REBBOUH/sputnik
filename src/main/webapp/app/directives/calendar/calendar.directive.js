(function() {
    'use strict';
    angular
        .module('sputnikApp')
        .controller('calendarDemo',calendarDemo);
    calendarDemo.$inject = ['$scope', 'shareService'];
    function calendarDemo ($scope,shareService ) {
        var vm = this;
        $scope.day = moment();
        vm.sharedValues = shareService.sharedValues;
        };

    angular
        .module('sputnikApp')
        .directive("calendar",['shareService', function(shareService) {
            var holiday = {"2017":[
                "01/01/2017",
                "01/02/2017",
                "04/02/2017",
                "28/02/2017",
                "14/07/2017",
                "15/08/2017",
                "01/11/2017",
                "11/11/2017",
                "25/12/2017"
            ]};
            var selected = new moment();
            var notWorkingDays = [];
            var curentYear = holiday["2017"];
            var numOfMonthDays = moment(selected).daysInMonth();
            var numWeekends =  _getNumOfDays(selected,6)+_getNumOfDays(selected,7);
            var numOfWorkingDay = numOfMonthDays-(numWeekends+_getNumHoliday()+notWorkingDays.length);




            return {
            restrict: "E",
            templateUrl: "app/directives/calendar/calendar.html",
            scope: {
                selected: "=",
            },
            link: function($scope) {
                //var test =moment("2017-09-25");
                 console.log('number of day'+numOfMonthDays);
                console.log(' Number of Weekends days '+ numWeekends);
                console.log(' Number of holydays '+ _getNumHoliday());
                $scope.sharedValues = shareService.sharedValues ;
                $scope.sharedValues.workingDays=numOfWorkingDay;
                $scope.month = selected.clone();
                var start = selected.clone();
                start.date(1);
                _removeTime(start.day(0));
                _buildMonth($scope, start, $scope.month);

                $scope.select = function(day) {
                    selected = day.date;
                    var i = notWorkingDays.indexOf( selected.format('DD/MM/YYYY'));
                    if(i != -1) {
                        day.selectedDay = false;
                        notWorkingDays.splice(i, 1);}
                    else{
                        day.selectedDay = true;
                        notWorkingDays.push(day.date.format('DD/MM/YYYY'));
                    }
                    console.log('Number of NonWorking days = '+notWorkingDays.length);
                    numOfWorkingDay = numOfMonthDays-(numWeekends+_getNumHoliday()+notWorkingDays.length);
                    console.log(' Number of WorkingDays '+ numOfWorkingDay);
                    shareService.sharedValues.workingDays = numOfWorkingDay;
                    shareService.sharedValues.notWorkingDays= notWorkingDays;
                    console.log(notWorkingDays);

                };

                $scope.next = function() {
                    var next = $scope.month.clone();
                    _removeTime(next.month(next.month()+1).date(1));
                    $scope.month.month($scope.month.month()+1);
                    _buildMonth($scope, next, $scope.month);
                    _calWorkingDays($scope.month);
                    console.log('numOfMonthDays :'+numOfMonthDays+ ' numWeekends :  ' + numWeekends+' numOfWorkingDay : ' +numOfWorkingDay);
                };

                $scope.previous = function() {
                    var previous = $scope.month.clone();
                    _removeTime(previous.month(previous.month()-1).date(1));
                    $scope.month.month($scope.month.month()-1);
                    _buildMonth($scope, previous, $scope.month);
                    _calWorkingDays($scope.month);
                    console.log('numOfMonthDays :'+numOfMonthDays+ ' numWeekends :  ' + numWeekends+' numOfWorkingDay : ' +numOfWorkingDay);
                };
            }
        };

        function _calWorkingDays(selectedDate) {
            selected=selectedDate;
            numOfMonthDays = moment(selectedDate).daysInMonth();
            numWeekends =  _getNumOfDays(selectedDate,6)+_getNumOfDays(selectedDate,7);
            numOfWorkingDay = numOfMonthDays-(numWeekends+_getNumHoliday()+notWorkingDays.length);
            shareService.sharedValues.workingDays = numOfWorkingDay;
            shareService.sharedValues.notWorkingDays= notWorkingDays;
        }

        function _getNumOfDays(date, weekday) {
            date.date(1);
            var dif = (7 + (weekday - date.weekday())) % 7 + 1;
            return Math.floor((date.daysInMonth() - dif) / 7) + 1;
        }

        function _getNumHoliday() {
            var num = 0;
            for (var i = 0; i < curentYear.length; i++) {
                var date = moment(curentYear[i],"DD/MM/YYYY");
                if(date.isSame(selected, 'month') && date.weekday()!=6 && date.weekday()!=7){
                    num++;
                }
            }
            return num;
        }

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
            for (var i = 0; i < 7; i++) {
                days.push({
                    selectedDay: (notWorkingDays.indexOf(date.format('DD/MM/YYYY'))!= -1),
                    name: date.format("dd").substring(0, 1),
                    number: date.date(),
                    isCurrentMonth: date.month() === month.month(),
                    isToday: date.isSame(new Date(), "day"),
                    date: date,
                    active: (i != 5 && i != 6 &&(curentYear.indexOf(date.format('DD/MM/YYYY'))== -1))
                });
                date = date.clone();
                date.add(1, "d");
            }
            return days;
        }
    }]);
})();






