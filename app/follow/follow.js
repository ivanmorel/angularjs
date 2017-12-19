'use strict';
angular.module('myApp.follow', ['ngRoute', 'ngAnimate', 'myApp'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/follow', {
            templateUrl: 'follow/follow.html',
            controller: 'followCtrl'
        });
    }])
    .controller('followCtrl', ['$scope', '$timeout', 'highscore', function($scope, $timeout, highscore) {
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

        $scope.test = function($event){
            $scope.x = $event.x;
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
                    highscore.pushValue({username: highscore.getUser().name, game: 'Follow', mode: $scope.seconds +" Seconds", follow: $scope.lastfollow, fps: $scope.lastfollow/$scope.seconds, date: new Date()});
                    $scope.highscore = highscore.getHighscore();
                    $timeout(function(){
                        $scope.stage2 = true
                    },500);
                    $timeout(function(){
                        $scope.stage3 = false
                    },1000)
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