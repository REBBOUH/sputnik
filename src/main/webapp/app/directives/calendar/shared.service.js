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
            }
        }

        function syncToLocalStorage() {
            $localStorage.selectedMonth = JSON.stringify(getSelectedMonth(selectedMonth));
            $localStorage.notWorkingDays = JSON.stringify(notWorkingDays);
            $localStorage.workingDays = JSON.stringify(workingDays);
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

        function setSelectedMonth(month) {
            selectedMonth = month;
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
            setSelectedMonth: setSelectedMonth,
            setWorkingDays:setWorkingDays,
            notWorkingDays: notWorkingDays,
            getWorkingDays:getWorkingDays,
            sharedValues: shared
        };
    }
})();


