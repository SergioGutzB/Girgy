var app = angular.module('Girgy', [
  'ngMaterial',
]);

var volaires = angular.module('Girgy');

volaires.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('altTheme')
    .primaryPalette('light-green')
    .accentPalette('green')
    .warnPalette('cyan')
    .backgroundPalette('light-green')
  })