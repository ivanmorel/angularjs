'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', function($scope) {
  $scope.name = "Ivan";
  $scope.foodaux = "";
  $scope.rand = 0;
  $scope.randaux = 0;
  $scope.required  = "";
  $scope.types = ['Chinese', 'Italian', 'Mexican', 'Dominican'];
    $scope.food = $scope.types[0];
  $scope.add = function(){
    if($scope.foodaux != ""&& $scope.myForm.foodaux.$error.required){
      $scope.types.push($scope.foodaux);
      $scope.food = $scope.foodaux;
      $scope.foodaux = "";
    }
    else{
      $scope.required = "Please type a value"
    }
  }
  $scope.surpriseme = function(){
    while($scope.randaux==$scope.rand){
      $scope.randaux = Math.floor((Math.random()*$scope.types.length));
    }
    $scope.rand = $scope.randaux;
    $scope.food = $scope.types[$scope.rand];
  }
    var _name = 'Brian';
    $scope.user = {
        name: function(newName) {
            // Note that newName can be undefined for two reasons:
            // 1. Because it is called as a getter and thus called with no arguments
            // 2. Because the property should actually be set to undefined. This happens e.g. if the
            //    input is invalid
            return arguments.length ? (_name = newName) : _name;
        }
    };
}]);