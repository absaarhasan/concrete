(function() {

    'use strict';

    angular.module('con', ['ui.router','con.main'])

        .config(['$urlRouterProvider', function( $urlRouterProvider) {

            $urlRouterProvider.otherwise("/");

        }])

})();


