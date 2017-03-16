/**
 * Created by Billel Boudjit on 27/02/2017.
 */

(function () {
    'use strict';

    angular
        .module('sputnikApp')
        .factory('shareService', ['$localStorage', shareService]);

    function shareService($localStorage) {
        var shared = {workingDays: 0, showDetail: false};
        var selectedMonth = '';
        var workingDays = 0;
        var selectedDate;
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
        syncFromLocalStorage();

        function syncFromLocalStorage() {
            if (angular.isDefined($localStorage.notWorkingDays)) {
                notWorkingDays = JSON.parse($localStorage.notWorkingDays);
                workingDays = JSON.parse($localStorage.workingDays);
                selectedDate = JSON.parse($localStorage.selectedDate);
            }
        }

        function syncToLocalStorage() {
            $localStorage.selectedMonth = JSON.stringify(getSelectedMonth(selectedMonth));
            $localStorage.notWorkingDays = JSON.stringify(notWorkingDays);
            $localStorage.workingDays = JSON.stringify(workingDays);
            $localStorage.selectedDate = JSON.stringify(selectedDate);
        }


        function getNbNotWorkingDays(day) {
            return notWorkingDays[day.format("MM")].length;
        }

        function existNotWorkingDay(day) {
            var monthNotWorkingDays = notWorkingDays[day.format("MM")];
            return monthNotWorkingDays.includes(day.date());

        }

        function addNotWorkingDay(day) {
            var monthNotWorkingDays = notWorkingDays[day.format("MM")];
            if (!existNotWorkingDay(day)) {
                monthNotWorkingDays.push(day.date());
            }
            syncToLocalStorage();
        }

        function removeNotWorkingDay(day) {
            var monthNotWorkingDays = notWorkingDays[day.format("MM")];
            var index = monthNotWorkingDays.indexOf(day.date());
            if (index != -1) {
                monthNotWorkingDays.splice(index, 1);
            }
            syncToLocalStorage();
        }

        function getSelectedMonth() {
            return selectedMonth;
        }

        function getSelectedDate() {
            return selectedDate;
        }

        function setSelectedMonthAndDate(date) {
            selectedMonth = date.format("MMMM");
            selectedDate = date;
            syncToLocalStorage();
        }

        function getWorkingDays() {
            return workingDays;
        }

        function setWorkingDays(WorkingDays) {
            workingDays = WorkingDays;
            syncToLocalStorage();
        }

        return {
            getNbNotWorkingDays: getNbNotWorkingDays,
            existNotWorkingDay: existNotWorkingDay,
            addNotWorkingDay: addNotWorkingDay,
            removeNotWorkingDay: removeNotWorkingDay,
            syncFromLocalStorage: syncFromLocalStorage,
            syncToLocalStorage: syncToLocalStorage,
            getSelectedMonth: getSelectedMonth,
            setSelectedMonthAndDate: setSelectedMonthAndDate,
            setWorkingDays: setWorkingDays,
            getSelectedDate: getSelectedDate,
            getWorkingDays: getWorkingDays,
            sharedValues: shared
        };
    }
})();


