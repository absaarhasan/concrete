(function() {

        'use strict';

        angular.module('con.main', ['ui.router'])
            .factory('mainService', mainService)
            .controller('MainCtrl',  MainCtrl)
            .config(function($stateProvider) {
                $stateProvider

                    .state('main', {
                        url: "/",
                        templateUrl: "views/main/main.html",
                        controller: 'MainCtrl',
                        controllerAs: 'vm'
                    })

            });

        MainCtrl.$inject = ['mainService'];

        function MainCtrl( mainService) {

            /* jshint validthis: true */
            var vm = this;

            vm.showErrors = mainService.showErrors;
            vm.errorMsg =  mainService.errorMsg;
            vm.showRepos = mainService.showRepos;
            vm.showStars = mainService.showStars;
            vm.userCount = mainService.userCount;
            vm.starMsg =  mainService.starMsg;
            vm.starResults =  mainService.starResults;
            vm.repoResults =  mainService.repoResults;
            vm.init =  mainService.init;


        }


})();

