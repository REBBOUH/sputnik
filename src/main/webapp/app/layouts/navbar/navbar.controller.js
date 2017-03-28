(function () {
    'use strict';

    angular
        .module('sputnikApp')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$state', 'Auth', 'Principal', 'ProfileService', 'LoginService'];

    function NavbarController($state, Auth, Principal, ProfileService, LoginService) {
        var vm = this;

        vm.isNavbarCollapsed = true;
        vm.isAuthenticated = Principal.isAuthenticated;

        ProfileService.getProfileInfo().then(function (response) {
            vm.inProduction = response.inProduction;
            vm.swaggerEnabled = response.swaggerEnabled;
        });

        vm.login = login;
        vm.logout = logout;
        vm.toggleNavbar = toggleNavbar;
        vm.collapseNavbar = collapseNavbar;
        vm.absence = absence;
        vm.history = history;
        vm.$state = $state;
        vm.isAuthenticated = Principal.isAuthenticated;

        function login() {
            collapseNavbar();
            LoginService.open();
        }

        function logout() {
            collapseNavbar();
            Auth.logout();
            $state.go('home');
        }

        function toggleNavbar() {
            vm.isNavbarCollapsed = !vm.isNavbarCollapsed;
        }

        function collapseNavbar() {
            vm.isNavbarCollapsed = true;
            if (vm.isAuthenticated()) {
                $state.go("home")
            }
        }

        function absence() {
            if (vm.isAuthenticated()) {
                $state.go("absence")
            }
        }

        function history() {
            if (vm.isAuthenticated()) {
                $state.go("history")
            }
        }
    }
})();
