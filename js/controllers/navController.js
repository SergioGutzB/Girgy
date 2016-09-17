
var girgy = angular.module('Girgy')

girgy.controller('NavController', ['$anchorScroll', '$location', '$scope', '$mdTheming', '$q', '$timeout',function($anchorScroll, $location, $scope, $mdTheming, $q, $timeout){

  $scope.currentNavItem = 'page1';
  // $mdTheming.generateTheme('altTheme');
  $mdTheming.generateTheme('green');


  $scope.gotoAnchor = function(id) {
    console.log($location.path());

    if ($location.path()  !== "/"){
      $location.path("/");
      $location.hash(id);
      $anchorScroll();
    }else {
      var target = '#'+id;
      var $target = $(target);
      $('html, body').stop().animate({
        'scrollTop': $target.offset().top
      }, 900, 'swing', function () {
        window.location.hash = target;
      });
    }
  };


}]);