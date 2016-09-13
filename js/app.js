$(document).ready(function(){
  $('a[href^="#"]').on('click',function (e) {
      e.preventDefault();

      var target = this.hash;
      var $target = $(target);

      $('html, body').stop().animate({
          'scrollTop': $target.offset().top
      }, 900, 'swing', function () {
          window.location.hash = target;
      });
  });
});
var app = angular.module('Girgy', [
  'ngMaterial',
  'ngRoute',
]);

var volaires = angular.module('Girgy');

volaires.config(function($mdThemingProvider) {

	$mdThemingProvider.generateThemesOnDemand(true);

  $mdThemingProvider.theme('altTheme')
    .primaryPalette('light-green')
    .accentPalette('green')
    .warnPalette('cyan')
    .backgroundPalette('light-green');


  $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('light-green')
      .backgroundPalette('green');

  $mdThemingProvider.theme('green')
      .primaryPalette('green')
      .accentPalette('light-green')
      .warnPalette('green');
      


  })

