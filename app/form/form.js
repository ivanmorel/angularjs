'use strict';
angular.module('myApp.form', ['ngRoute', 'ngAnimate', 'myApp'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/form', {
            templateUrl: 'form/form.html',
            controller: 'formCtrl'
        });
    }])
    .controller('formCtrl', ['$scope', '$timeout', 'highscore', '$http', '$filter', function($scope, $timeout, highscore, $http, $filter) {
    }]);