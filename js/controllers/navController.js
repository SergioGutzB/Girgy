var girgy = angular.module('Girgy')

girgy.controller('NavController', ['$anchorScroll', '$location', '$scope', '$mdTheming', '$q', '$timeout', function($anchorScroll, $location, $scope, $mdTheming, $q, $timeout) {

  $scope.currentNavItem = 'page1';
  $mdTheming.generateTheme('green');

  $scope.show = function() {
    var target = '#initial-container';
    var $target = $(target);
    var va = $target.offset().top;
    $('html, body').stop().animate({
      'scrollTop': va
    }, 500, 'swing');
    $(".navigation").toggleClass("responsive");
  }

}]);