const app = angular.module('myApp', []);

app.controller('HomeController', function($scope) {
  $scope.message = 'Hello from HomeController';
  $scope.error = '';
  $scope.months = {};
  $scope.warnings = [];

  window.markLoggedIn = function() {
  	console.log('we are in!');
  	getMishmarotHours()
  	.then(hours => {
  		// calculateHours(hours);
  		$scope.months = formatData(hours);
  		console.log($scope.months);
  		$scope.$apply();
  	})
  }

  window.setErrorPage = function (error) {
  	$scope.error = error;
  	$scope.$apply();
  }

  window.warn = function(warning) {
  	$scope.warnings.push(warning);
  	$scope.$apply();
  }
});
