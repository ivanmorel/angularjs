'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngMessages',
  'ngRoute',
  'ngAnimate',
    'ngCookies',
    'myApp.clicker',
    'myApp.speed',
    'myApp.react',
    'myApp.follow',
    'myApp.stats',
  'myApp.version',
    'myApp.form'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('');
  $routeProvider.otherwise({redirectTo: '/clicker'});
}]).controller('AppCtrl', ['$scope','highscore','$location','$http', function($scope, highscore, $location, $http) {
    $scope.userx = highscore.getUser();
    $scope.username = "";
    $scope.showtog = false;
    $scope.modalshow = false;
    var cont = true;
    var founduser = false;
    $scope.wrongusername = false;
    $scope.wrongpassword = false;
    $scope.chUser = function(){
        $http.get("http://10.100.27.14:3000/users/json").then(function(response){
            $scope.useraux = response.data;
            $scope.wrongusername=true;
            $scope.useraux.forEach(function(v,k){
                if(cont){
                    if(v.username==$scope.username.toLowerCase()){
                        if(v.password==$scope.password){
                            $scope.userx = v.ingame;
                            highscore.changeUser($scope.userx);
                            $scope.username="";
                            $scope.password="";
                            $scope.modal();
                        }else{
                            $scope.wrongpassword=true;
                        }
                        cont = false;
                        $scope.wrongusername=false;
                    }
                }
            });
            cont=true;
        });
    };
    $scope.clearwrong = function(){
        $scope.wrongusername=false;
        $scope.wrongpassword=false;
    };
    $scope.seen=[false,false,false,false,false];
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
        case '/form':
            $scope.seen[5]= true;
            break;
    }

    $scope.maintab = function(ind){
        $scope.showtog=false;
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
    .service('highscore', function($cookies){
        var highscore = [];
        if($cookies.get('user')){
            var user = $cookies.get('user');
        }else{
            var user = 'guest'
        }
        if($cookies.get('stat')){
            var currentstat = $cookies.get('stat');
        }else{
            var currentstat = 0;
        }

        this.pushValue = function(value){
          highscore.push(value);
        };
        this.getHighscore = function (){
          return highscore;
        };
        this.changeUser = function (value){
                $cookies.put('user', value);
                user = $cookies.get('user');
        };
        this.getUser = function(){
            return user;
        };
        this.changeStat= function(value){
            $cookies.put('stat', value);
            currentstat = $cookies.get('stat');
        };
        this.getStat = function(){
            return currentstat;
        }
    });