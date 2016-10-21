var app = angular.module('Girgy', [
  'ngMaterial',
  'ngRoute',
  'Colombia',
  'nvd3',
  'ngFileUpload',
]);

var volaires = angular.module('Girgy');

volaires.config(function($mdThemingProvider) {
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
    .warnPalette('orange');

  $mdThemingProvider.theme('amber')
    .primaryPalette('amber')
    .accentPalette('orange')
    .warnPalette('red');
})