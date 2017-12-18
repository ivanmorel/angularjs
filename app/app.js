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
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('');
  $routeProvider.otherwise({redirectTo: '/clicker'});
}]).controller('AppCtrl', ['$scope','highscore', function($scope, highscore) {
    $scope.user = highscore.getUser();
    $scope.username = "";
    $scope.chUser = function(){
        $scope.user.name = $scope.username;
        $scope.username= "";
        highscore.changeUser($scope.user);
    }
}])
    .service('highscore', function(){
        var highscore = [];
        var user = {name: "guest"};
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
        }
    });