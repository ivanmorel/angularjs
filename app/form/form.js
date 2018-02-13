'use strict';
angular.module('myApp.form', ['ngRoute', 'ngAnimate', 'myApp'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/form', {
            templateUrl: 'form/form.html',
            controller: 'formCtrl'
        });
    }])
    .controller('formCtrl', ['$scope', '$timeout', 'highscore', '$http', '$filter', function($scope, $timeout, highscore, $http, $filter) {
        $http.get("http://127.0.0.1:3000/users/json").then(function(response){
            $scope.users = response.data;
        });
        $scope.found = false;
        $scope.founduser = false;
        var cont = true;
        $scope.testx = "";
        $scope.isIngameAvailable = function(user){
            $scope.register= false;
            $scope.users.forEach(function(v,k){
                if(cont){
                    if(v.ingame==user){
                        $scope.found = true;
                        cont = false;
                    }else{
                        $scope.found = false;
                    }
                }
            });
            cont = true;
        };

        $scope.isUserAvailable = function(user){
            $scope.register= false;
            $scope.users.forEach(function(v,k){
                if(cont){
                    if(v.username==user){
                        $scope.founduser = true;
                        cont = false;
                    }else{
                        $scope.founduser = false;
                    }
                }
            });
            cont = true;
        };

        $scope.clear = function(){
            $http.get("http://127.0.0.1:3000/users/json").then(function(response){
                $scope.users = response.data;
                $scope.user = {'ingame': "", 'username': "", 'password': "", 'email': ""};
                $scope.rpassword = "";
                $scope.register= true;
            });
        }
    }]);