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
        var absences = {
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
            } else {
                $localStorage.notWorkingDays = JSON.stringify(notWorkingDays);
            }

            if (angular.isDefined($localStorage.absences)) {
                absences = JSON.parse($localStorage.absences);
            } else {
                $localStorage.absences = JSON.stringify(absences);
            }

            if (angular.isDefined($localStorage.workingDays)) {
                workingDays = JSON.parse($localStorage.workingDays);
            } else {
                $localStorage.workingDays = JSON.stringify(workingDays);
            }

            if (angular.isDefined($localStorage.selectedDate)) {
                selectedDate = JSON.parse($localStorage.selectedDate);
            } else {
                $localStorage.selectedDate = JSON.stringify(selectedDate);
            }
        }

        function syncToLocalStorage() {
            $localStorage.selectedMonth = JSON.stringify(getSelectedMonth(selectedMonth));
            $localStorage.notWorkingDays = JSON.stringify(notWorkingDays);
            $localStorage.workingDays = JSON.stringify(workingDays);
            $localStorage.selectedDate = JSON.stringify(selectedDate);
            $localStorage.absences = JSON.stringify(absences);
        }

        function addAbsence(day, demiJournee) {
            var absencesByMonth = absences[day.format("MM")];
            var annee = day.format("YYYY");
            var mois = day.format("MM");
            var jour = day.date();
            var absence = {year: annee, month: mois, day: jour, demiJournee: demiJournee}
            if (!existAbsence(day, demiJournee)) {
                absencesByMonth.push(absence);
            }
            syncToLocalStorage();
        }

        function removeAbsence(day) {
            var absencesByMonth = absences[day.format("MM")];
            var annee = day.format("YYYY");
            var mois = day.format("MM");
            var jour = day.date();
            var index = absencesByMonth.findIndex(function (x) {
                return (x.month == mois) && (x.day == jour) && (x.year == annee)
            });
            if (index != -1) {
                absencesByMonth.splice(index, 1);
            }
            syncToLocalStorage();
        }

        function existAbsence(day, demiJournee) {
            var exist = false;
            var absencesByMonth = absences[day.format("MM")];
            absencesByMonth.forEach(function (absence) {
                if ((day.format("YYYY") == absence.year) && (day.format("MM") == absence.month) && (day.date() == absence.day)) {
                    exist = true;
                    if (absence.demiJournee != demiJournee) {
                        absence.demiJournee = demiJournee;
                    }
                }
            });
            return exist;
        }

        function isDemiJournee(day) {
            var exist = false;
            var absencesByMonth = absences[day.format("MM")];
            absencesByMonth.forEach(function (absence) {
                if ((day.format("YYYY") == absence.year) && (day.format("MM") == absence.month) && (day.date() == absence.day) && (absence.demiJournee)) {
                    exist = true;
                }
            });
            return exist;
        }

        function getNbAbsences(day) {
            var absencesByMonth = absences[day.format("MM")];
            var nbAbsences = 0;
            absencesByMonth.forEach(function (absence) {
                if (absence.demiJournee) {
                    nbAbsences = nbAbsences + 0.5;
                }
                else {
                    nbAbsences = nbAbsences + 1;
                }
            });
            return nbAbsences;
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
            getNbAbsences: getNbAbsences,
            existNotWorkingDay: existNotWorkingDay,
            existAbsence: existAbsence,
            removeAbsence: removeAbsence,
            isDemiJournee: isDemiJournee,
            addNotWorkingDay: addNotWorkingDay,
            addAbsence: addAbsence,
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


