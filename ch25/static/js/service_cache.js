var app = angular.module("InjectorInitialization", []);
app.controller("CatchFactoryController", ['$scope', '$cacheFactory', function ($scope, $cacheFactory) {
  $scope.key = "";
  $scope.value = "";
  $scope.currentValue = "";
  $scope.keys = [];
  $scope.cache = $cacheFactory('testCache');

  $scope.addItems = function () {
    $scope.keys.push($scope.key);
    $scope.cache.put($scope.key, $scope.value);
  };

  $scope.getItem = function () {
    $scope.currentValue = $scope.cache.get($scope.key);
  };

  $scope.removeItem = function () {
    $scope.keys = $scope.keys.filter(function (key) {
      return (key !== $scope.key);
    });
    $scope.cache.remove($scope.key);
  };

}]);