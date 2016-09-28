// $(document).ready(function(){
//   $('a[href^="#contacto"]').on('click',function (e) {
//     console.log("contacto")
//       e.preventDefault();

//       var target = this.hash;
//       var $target = $(target);

//       console.log(target)
//       console.log($target)

//       $('html, body').stop().animate({
//           'scrollTop': $target.offset().top
//       }, 900, 'swing', function () {
//           window.location.hash = target;
//           console.log(window.location.hash)
//       });
//   });
// });

$(document).scroll(function () {
  var scroll = $(this).scrollTop();
  var topDist = $(".container-nav").position();
  if (scroll > topDist.top) {
    $('.navigation').addClass("nav-fixed-top");
  } else {
    $('.navigation').removeClass("nav-fixed-top");
  }
});

var app = angular.module('Girgy', [
  'ngMaterial',
  'ngRoute',
  'Colombia',
  ]);

var volaires = angular.module('Girgy');

volaires.config(function($mdThemingProvider) {

	// $mdThemingProvider.generateThemesOnDemand(true);

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

  $mdThemingProvider.theme('amber')
  .primaryPalette('amber')
  .accentPalette('orange')
  .warnPalette('amber');


})

