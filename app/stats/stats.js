'use strict';
angular.module('myApp.stats', ['ngRoute', 'myApp'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/stats', {
            templateUrl: 'stats/stats.html',
            controller: 'statsCtrl'
        });
    }])
    .controller('statsCtrl', ['$scope', 'highscore', function($scope, highscore) {
        $scope.highscore = highscore.getHighscore();
        $scope.medals= ["https://image.flaticon.com/icons/svg/522/522422.svg", "https://image.flaticon.com/icons/svg/522/522423.svg","https://image.flaticon.com/icons/svg/522/522424.svg"]
    }]);