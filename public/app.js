(function() {

    'use strict';

    angular.module('con', ['ui.router','con.main'])

        .config(function( $urlRouterProvider) {

            $urlRouterProvider.otherwise("/");

        })

})();


