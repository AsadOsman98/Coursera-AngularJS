(function () {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];        //Injection of scope working with minification

function LunchCheckController ($scope){
  $scope.food = '';                               //Text input of food items
  $scope.totalFood = 0;                           //Number of food items
  $scope.result = '';                             //Result to b shown

  $scope.displayResult = function () {            //Function to check which of the 3 conditions are being satisfied to determine result
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

}

function calculateFood(string) {              //Number of food items calculated.
  var totalFood = 1;
  for (var i = 0; i < string.length; i++) {
    if (string.charAt(i) == ',') {
      totalFood += 1;
    }
  }
  return totalFood;
};

})();
