(function () {
    'use strict';
    angular
        .module('sputnikApp')
        .controller('calendarDemo', calendarDemo);
    calendarDemo.$inject = ['$scope', 'shareService'];
    function calendarDemo($scope, shareService) {
        var vm = this;
        $scope.day = moment();
        vm.sharedValues = shareService.sharedValues;
    };



    angular
        .module('sputnikApp')
        .directive("calendar", ['shareService', function (shareService) {
            var holiday = {
                "2017": [
                    new moment("01/01/2017", "DD/MM/YYYY"),
                    new moment("07/04/2017", "DD/MM/YYYY"),
                    new moment("01/05/2017", "DD/MM/YYYY"),
                    new moment("08/05/2017", "DD/MM/YYYY"),
                    new moment("25/05/2017", "DD/MM/YYYY"),
                    new moment("01/06/2017", "DD/MM/YYYY"),
                    new moment("14/07/2017", "DD/MM/YYYY"),
                    new moment("15/08/2017", "DD/MM/YYYY"),
                    new moment("01/11/2017", "DD/MM/YYYY"),
                    new moment("25/12/2017", "DD/MM/YYYY")
                ]
            };
            var selected = new moment();
            //var monthName = moment.months(selected.month());
            //console.log(monthName);
            var notWorkingDays = {
                "01": [],
                "02": [],
                "03": [],
                "04": [],
                "05": [],
                "06": [],
                "07": [],
                "08": [],
                "09": [],
                "10": [],
                "11": [],
                "12": []
            };

            function getNbNotWorkingDays(day) {
                return notWorkingDays[day.format("MM")].length;
            }

            function existNotWorkingDay(day) {
                var monthNotWorkingDays = notWorkingDays[day.format("MM")];
                return monthNotWorkingDays.includes(day.date());

            }

            function addNotWorkingDay(day) {
                var monthNotWorkingDays = notWorkingDays[day.format("MM")];
                if(!existNotWorkingDay(day)) {
                    monthNotWorkingDays.push(day.date());
                }
            }

            function removeNotWorkingDay(day) {
                var monthNotWorkingDays = notWorkingDays[day.format("MM")];
                var index = monthNotWorkingDays.indexOf(day.date());
                if(index != -1) {
                    monthNotWorkingDays.splice(index, 1);
                }
            }

            var selectedYear = selected.format("YYYY");
            var currentYearHolidays = holiday[selectedYear];
            var numOfMonthDays = selected.daysInMonth();
            var numWeekends = _getNumOfDays(selected, 6) + _getNumOfDays(selected, 7);
            var numOfWorkingDay = numOfMonthDays - (numWeekends + _getNumHoliday() + getNbNotWorkingDays(selected));

            return {
                restrict: "E",
                templateUrl: "app/directives/calendar/calendar.html",
                scope: {
                    selected: "=",
                },
                link: function ($scope) {
                    //var test =moment("2017-09-25");
                    console.log('number of day' + numOfMonthDays);
                    console.log(' Number of Weekends days ' + numWeekends);
                    console.log(' Number of holydays ' + _getNumHoliday());
                    $scope.sharedValues = shareService.sharedValues;
                    $scope.sharedValues.workingDays = numOfWorkingDay;
                    shareService.sharedValues.selectedMonth = selected.format("MMMM");

                    $scope.month = selected.clone();
                    var start = selected.clone();
                    start.date(1);
                    _removeTime(start.day(0));
                    _buildMonth($scope, start, $scope.month);

                    $scope.select = function (day) {
                        shareService.sharedValues.showDetail = false;
                        if (existNotWorkingDay(day.date)) {
                            day.selectedDay = false;
                            removeNotWorkingDay(day.date)
                        }
                        else {
                            day.selectedDay = true;
                            addNotWorkingDay(day.date)
                        }
                        console.log('Number of NonWorking days = ' + getNbNotWorkingDays(day.date));
                        numOfWorkingDay = numOfMonthDays - (numWeekends + _getNumHoliday() + getNbNotWorkingDays(day.date));
                        console.log(' Number of WorkingDays ' + numOfWorkingDay);
                        shareService.sharedValues.workingDays = numOfWorkingDay;
                        shareService.sharedValues.notWorkingDays = notWorkingDays;
                        console.log(notWorkingDays);
                    };

                    $scope.next = function () {
                        var next = $scope.month.clone();
                        _removeTime(next.month(next.month() + 1).date(1));
                        $scope.month.month($scope.month.month() + 1);
                        _buildMonth($scope, next, $scope.month);
                        _calWorkingDays($scope.month);
                        console.log('numOfMonthDays :' + numOfMonthDays + ' numWeekends :  ' + numWeekends + ' numOfWorkingDay : '
                            + numOfWorkingDay + 'monthName : ' + $scope.month.format("MMMM"));
                    };

                    $scope.previous = function () {
                        var previous = $scope.month.clone();
                        _removeTime(previous.month(previous.month() - 1).date(1));
                        $scope.month.month($scope.month.month() - 1);
                        _buildMonth($scope, previous, $scope.month);
                        _calWorkingDays($scope.month);
                        console.log('numOfMonthDays :' + numOfMonthDays + ' numWeekends :  ' + numWeekends + ' numOfWorkingDay : '
                            + numOfWorkingDay + 'monthName : ' + $scope.month.format("MMMM"));
                    };
                }
            };

            function _calWorkingDays(selectedDate) {
                selected = selectedDate;
                numOfMonthDays = moment(selectedDate).daysInMonth();
                numWeekends = _getNumOfDays(selectedDate, 6) + _getNumOfDays(selectedDate, 7);
                numOfWorkingDay = numOfMonthDays - (numWeekends + _getNumHoliday() + getNbNotWorkingDays(selectedDate));
                shareService.sharedValues.workingDays = numOfWorkingDay;
                shareService.sharedValues.notWorkingDays = notWorkingDays;
                shareService.sharedValues.selectedMonth = selectedDate.format("MMMM");
            }

            function _getNumOfDays(date, weekday) {
                date.date(1);
                var dif = (7 + (weekday - date.weekday())) % 7 + 1;
                return Math.floor((date.daysInMonth() - dif) / 7) + 1;
            }

            function _getNumHoliday() {
                var num = 0;
                for (var i = 0; i < currentYearHolidays.length; i++) {
                    var date = moment(currentYearHolidays[i], "DD/MM/YYYY");
                    if (date.isSame(selected, 'month') && date.weekday() != 6 && date.weekday() != 7) {
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
                    scope.weeks.push({days: _buildWeek(date.clone(), month)});
                    date.add(1, "w");
                    done = count++ > 2 && monthIndex !== date.month();
                    monthIndex = date.month();

                }
            }

            function _buildWeek(date, month) {
                var days = [];
                for (var i = 0; i < 7; i++) {
                    days.push({
                        selectedDay: existNotWorkingDay(date),
                        name: date.format("dd").substring(0, 1),
                        number: date.date(),
                        isCurrentMonth: date.month() === month.month(),
                        isToday: date.isSame(new Date(), "day"),
                        date: date,
                        active: (i != 5 && i != 6 && (currentYearHolidays.map(Number).indexOf(+date) == -1))
                    });
                    date = date.clone();
                    date.add(1, "d");
                }
                return days;
            }
        }]);
})();






