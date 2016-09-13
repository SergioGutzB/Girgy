
var volaires = angular.module('Girgy')



volaires.controller('NavController', ['$scope', '$mdTheming', function($scope, $mdTheming){

  $scope.currentNavItem = 'page1';
  // $mdTheming.generateTheme('altTheme');
  $mdTheming.generateTheme('green');





}]);
