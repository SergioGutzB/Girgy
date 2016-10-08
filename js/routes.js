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

    .when('/servicios', {
      templateUrl: '/sections/servicios.html',
      controller: 'Index'
    })

    .when('/nosotros', {
      templateUrl: '/sections/nosotros.html',
      controller: 'Index'
    })

    .when('/contacto', {
      templateUrl: '/sections/contacto.html',
      controller: 'Contact'
    })

    .when('/clientes', {
      templateUrl: '/sections/clientes.html',
      controller: 'Clientes'
    })

    .when('/cotizador', {
      templateUrl: '/pages/cotizador.html',
      controller: 'Cotizador'
    })

    .otherwise({
      redirectTo: '/'
    });

    $routeProvider.otherwise( { redirectTo: '/'} );

  // $locationProvider.html5Mode({
  //   enabled: true,
  //   requireBase: false
  // });

  
  // $locationProvider.html5Mode(true);


}]);
