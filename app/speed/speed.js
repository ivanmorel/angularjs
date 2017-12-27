'use strict';
angular.module('myApp.speed', ['ngRoute', 'ngAnimate', 'myApp'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/speed', {
            templateUrl: 'speed/speed.html',
            controller: 'speedCtrl'
        });
    }])
    .controller('speedCtrl', ['$scope', '$timeout', 'highscore','$http','$filter', function($scope, $timeout, highscore, $http, $filter) {
        $scope.entry= 0;
        $scope.disseconds = true;
        $scope.lastentry = "";
        $scope.disable = true;
        $scope.stage0 = false;
        $scope.stage1 = true;
        $scope.stage2 = true;
        $scope.stage3 = true;
        $scope.highscore  = [];
        $scope.seconds = 5;
        $scope.shrink = false;
        $scope.medals= ["https://image.flaticon.com/icons/svg/522/522422.svg", "https://image.flaticon.com/icons/svg/522/522423.svg","https://image.flaticon.com/icons/svg/522/522424.svg"];
        $scope.signal = "";
        $scope.move = function(){
            if(!$scope.disable){
                $scope.entry++;
            }
        };

        $scope.chseconds = function(seconds){
            $scope.seconds = seconds;
            $scope.disseconds = true;

            $scope.stage1=true;
            $timeout(function(){
                $scope.stage2 = false;
            },500);
            $timeout(function(){
                $scope.disable = false;
            },3500);
            $scope.chsignal(3,500,true);
            $scope.chsignal(2,1500,true);
            $scope.chsignal(1,2500,true);
            $scope.chsignal("MOVE!",3500,false);

            $timeout(function(){
                $scope.lastentry = $scope.entry;
                $scope.entry = 0;
                $scope.disable = true;
                $scope.signal = "DONE!";

                $scope.data = {highscore: {username: highscore.getUser(), game: "Speed", mode: "5 Seconds", action: $scope.lastentry, aps: $scope.lastentry/$scope.seconds}};
                $http.post("http://10.34.203.56:3000/highscores", $scope.data).then(function(){
                    $scope.httpstatus = "Success";
                    $http.get("http://10.34.203.56:3000/highscores/json").then(function(response){
                        $scope.httpstatus = "Success";
                        $scope.highscore = response.data;
                        $scope.map = $filter('filter')($scope.highscore,{game: 'Speed'});
                        $scope.map = $filter('orderBy')($scope.map, '-aps');

                        var tmp = $scope.map.map(function (x) {
                            return new Date(x.date);
                        });
                        var max = new Date(Math.max.apply(null,tmp));
                        var collection = tmp,max,idx;
                        var ind = collection.map(Number).indexOf(+max);
                        $scope.current = [];
                        $scope.current[ind] = true;
                    });
                    $timeout(function(){
                        $scope.stage2 = true
                    },500);
                    $timeout(function(){
                        $scope.stage3 = false
                    },1000)
                }, function(){
                    $scope.httpstatus = "Error";
                });

            },$scope.seconds*1000+3500)
        };

        $scope.chsignal = function(signal,timeout,change){
            $timeout(function(){
                $scope.signal = signal;
                if(change){
                    $scope.shrink = true;
                }
            }, timeout);
            $timeout(function(){
                $scope.shrink = false;
            }, timeout+1000)
        };

        $scope.replay = function(){
            $scope.stage3 = true;
            $timeout(function(){
                $scope.disseconds = false;
                $scope.stage1 = false
            },500);
        };

        $scope.continue0 = function(){
            $scope.stage0=true;
            $timeout(function(){
                $scope.disseconds = false;
                $scope.stage1 = false;
            },500)
        };

    }]);