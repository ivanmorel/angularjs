'use strict';
angular.module('myApp.stats', ['ngRoute', 'myApp'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/stats', {
            templateUrl: 'stats/stats.html',
            controller: 'statsCtrl'
        });
    }])
    .controller('statsCtrl', ['$scope', 'highscore','$http', function($scope, highscore, $http) {
        $http.get("http://127.0.0.1:3000/highscores/json").then(function(response){
            $scope.httpstatus = "Success";
            $scope.highscore = response.data;
        });

        $scope.seen = [false, false, false, false];
        $scope.seen[highscore.getStat()] = true;

        $scope.show = function(ind){
          $scope.seen.forEach(function (value, key) {
              $scope.seen[key]=false;
          });
          highscore.changeStat(ind);
          $scope.seen[ind]=true;
        };
        $scope.medals= ["https://image.flaticon.com/icons/svg/522/522422.svg", "https://image.flaticon.com/icons/svg/522/522423.svg","https://image.flaticon.com/icons/svg/522/522424.svg"]
    }]);