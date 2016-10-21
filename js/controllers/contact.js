var volaires = angular.module('Girgy')



volaires.controller('Contact', ['$scope', '$mdTheming', '$http', function($scope, $mdTheming, $http) {


  $mdTheming.generateTheme('green');

  $scope.user = {}
  $scope.message = "";
  $scope.send = function() {
    $http({
      method: 'POST',
      url: "/contacto",
      data: {
        to: "servicios@girgysolar.com",
        subject: "Formulario de Contacto - Girgy Solar",
        text: "Nombre: " + $scope.user.name + "\nE-mail: " + $scope.user.email + "\nTeléfono: " + $scope.user.telefono + "\nCiudad: " + $scope.user.ciudad + "\n\nMensaje:\n" + $scope.user.text,
        from: '"' + $scope.user.name + '" <' + $scope.user.email + '>',
      }
    }).then(function(res) {
      console.log("correo enviado: " + res);
      $scope.reset($scope.userForm);
      $scope.message = "El formulario ha sido enviado exitósamente"
    }, function(error) {
      console.log("error: " + error);
      $scope.message = "Hubo un problema al enviar el formulario, intentelo más tarde."
    })
  }

  $scope.reset = function(form) {
    $scope.user = {}
    if (form) {
      form.$setPristine();
      form.$setUntouched();
    }
  }

  $scope.userForm;

  $scope.reset($scope.userForm);

}]);