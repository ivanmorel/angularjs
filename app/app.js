'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngMessages',
  'ngRoute',
  'ngAnimate',
    'myApp.clicker',
    'myApp.speed',
    'myApp.react',
    'myApp.follow',
    'myApp.stats',
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider ) {
  $locationProvider.hashPrefix('');
  $routeProvider.otherwise({redirectTo: '/clicker'});
}]).controller('AppCtrl', ['$scope','highscore','$location', function($scope, highscore, $location) {
    $scope.user = highscore.getUser();
    $scope.username = "";
    $scope.showtog = false;
    $scope.modalshow = false;
    $scope.chUser = function(){
        $scope.user.name = $scope.username;
        $scope.username= "";
        highscore.changeUser($scope.user);
        $scope.modal();
    };
    $scope.seen=[false,false,false,false,false];
    console.log($location.url());
    switch($location.url()){
        case '/clicker':
            $scope.seen[0]= true;
            break;
        case '/speed':
            $scope.seen[1]= true;
            break;
        case '/react':
            $scope.seen[2]= true;
            break;
        case '/follow':
            $scope.seen[3]= true;
            break;
        case '/stats':
            $scope.seen[4]= true;
            break;
    }

    $scope.maintab = function(ind){
        $scope.seen.forEach(function (value, index) { $scope.seen[index] = false });
        $scope.seen[ind]=true;
    };
    $scope.show = function(){
        $scope.showtog = !$scope.showtog;
    };

    $scope.modal = function(){
        $scope.modalshow = !$scope.modalshow;
        $scope.showtog=false;
    };
}])
    .service('highscore', function(){
        var highscore = [];
        var user = {name: "guest"};
        var currentstat = 0;
        this.pushValue = function(value){
          highscore.push(value);
        };
        this.getHighscore = function (){
          return highscore;
        };
        this.changeUser = function (value){
            user = value;
        };
        this.getUser = function(){
            return user;
        };
        this.changeStat= function(value){
            currentstat = value;
        };
        this.getStat = function(){
            return currentstat;
        }
    });