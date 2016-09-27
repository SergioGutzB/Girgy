
var volaires = angular.module('Girgy')

volaires.controller('Index', ['$scope', function($scope){
  $scope.custom = true;
  $scope.toggleCustom = function() {
    if ($scope.custom == true){
      $('.infografia').slideToggle("slow", function(){
        $("#btn-show").removeClass("fa-angle-down");
        $("#btn-show").addClass("fa-angle-up");
        var target = '#infografia';
        var $target = $(target);
        var va = $target.offset().top - 70;
        $('html, body').stop().animate({
          'scrollTop': va
        }, 500, 'swing');
      });
      $scope.custom = false;
    }else {
      $('.infografia').slideToggle("slow",  function(){
        $("#btn-show").addClass("fa-angle-down");
        $("#btn-show").removeClass("fa-angle-up");

      });
      $scope.custom = true;
    }
  };



}]);