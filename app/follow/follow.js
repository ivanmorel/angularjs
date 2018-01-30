'use strict';
angular.module('myApp.follow', ['ngRoute', 'ngAnimate', 'myApp'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/follow', {
            templateUrl: 'follow/follow.html',
            controller: 'followCtrl'
        });
    }])
    .controller('followCtrl', ['$scope', '$timeout', 'highscore', '$http', '$filter', function($scope, $timeout, highscore, $http, $filter) {
        $scope.follow = 0;
        $scope.disseconds = true;
        $scope.lastfollow = "";
        $scope.disable = true;
        $scope.stage0 = false;
        $scope.stage1 = true;
        $scope.stage2 = true;
        $scope.stage3 = true;
        $scope.highscore  = [];
        $scope.seconds = 5;
        $scope.shrink = false;
        $scope.medals= ["https://image.flaticon.com/icons/svg/522/522422.svg", "https://image.flaticon.com/icons/svg/522/522423.svg","https://image.flaticon.com/icons/svg/522/522424.svg"]
        $scope.signal = "";
        $scope.hidearrow = true;
        $scope.value = 0;
        $scope.randir = Math.floor((Math.random()*3));
        $scope.dir = ["up", "down", "right", "left"];
        $scope.arrow = ["https://image.flaticon.com/icons/svg/109/109583.svg","https://image.flaticon.com/icons/svg/109/109611.svg","https://image.flaticon.com/icons/svg/109/109617.svg","https://image.flaticon.com/icons/svg/109/109618.svg"]
        $scope.follows = function(value){
            if(!$scope.disable){
                if( value==$scope.randir){
                    $scope.follow++;
                    $scope.increase = true;
                    $timeout(function(){
                        $scope.increase= false;
                    },100);
                    $scope.randir = Math.floor((Math.random()*4));
                }
            }
        };

        $scope.chseconds = function(seconds){
            $scope.seconds = seconds;
            $scope.disseconds = true;
            $scope.stage1=true;
            $scope.follow = 0;
            $timeout(function(){
                $scope.stage2 = false;
            },500);
            $timeout(function(){
                $scope.disable = false;
                $scope.hidearrow = false;
                $scope.increase = true;
                $timeout(function(){
                    $scope.increase= false;
                },100);
            },3500);
            $scope.chsignal(3,500,true);
            $scope.chsignal(2,1500,true);
            $scope.chsignal(1,2500,true);
            $scope.chsignal("FOLLOW!",3500,false);

            $timeout(function(){
                    $scope.lastfollow = $scope.follow;
                    $scope.entry = 0;
                    $scope.disable = true;
                    $scope.signal = "DONE!";
                    $scope.data = {highscore: {username: highscore.getUser(), game: "Follow", mode: "5 Seconds", action: $scope.lastfollow, aps: $scope.lastfollow/$scope.seconds}};
                    $http.post("http://127.0.0.1:3000/highscores", $scope.data).then(function(){
                        $scope.httpstatus = "Success";
                        $http.get("http://127.0.0.1:3000/highscores/json").then(function(response){
                            $scope.httpstatus = "Success";
                            $scope.highscore = response.data;
                            $scope.map = $filter('filter')($scope.highscore,{game: 'Follow'});
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
            $scope.hidearrow = true;
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
        }

    }]);