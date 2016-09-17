angular
.module('Girgy')
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

 $routeProvider 
    .when('/', {
      templateUrl: '/pages/content.html',
      controller: 'Index'
    })

    .when('/girgy', {
      templateUrl: '/pages/content.html',
      controller: 'Index'
    })

    .when('/sobre-nosotros', {
      templateUrl: '/pages/sobre_nosotros.html',
      controller: 'Index'
    })

    .otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });


}]);
