(function functionName() {
'use strict';

angular.module('FoodChecker', [])

.controller('FoodCheckerController', function ($scope){

  $scope.food = '';
  $scope.totalFood = 0;
  $scope.result = '';

  $scope.displayResult = function () {
    var numFood = calculateFood($scope.food);
    $scope.totalFood = numFood;
    if ($scope.totalFood > 3) {
      $scope.result = 'Too much!';
    }
    else if (1 <= $scope.totalFood <= 3) {
      $scope.result = 'Enjoy!';
    }
    if ($scope.food == ""){
      $scope.result = "Please enter data first";
    }
  };

  function calculateFood(string) {                    
    var totalFood = 1;
    for (var i = 0; i < string.length; i++) {
      if (string.charAt(i) == ',') {
        totalFood += 1;
      }
    }
    return totalFood;
  };

});


})();
