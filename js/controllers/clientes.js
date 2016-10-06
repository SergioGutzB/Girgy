
var volaires = angular.module('Girgy')

volaires.controller('Clientes', ['$scope', '$mdDialog', function($scope, $mdDialog){

  $scope.showAdvanced = function(ev) {
    console.log(ev)
    $mdDialog.show({
      controller: DialogController,
      contentElement: '#myDialog',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  };

  function DialogController($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }

  $scope.cliente = {
    nombre: "EcoAnálisis",
    descripcion: "Empresa dedicada al monitoreo ambiental de Aguas, Aire y Suelos que permita prevenir, controlar y mitigar riesgos que sus actividades puedan generar, promoviendo la salud, la seguridad y el cumplimientos de las normas ambientales.",
    fecha: "Fecha: Octubre 2016",
    ubicacion: "Ubicación: Villa Garzón, Putumayo",
    imagen: "./images/ecoanalisis.png"
  };
}]);