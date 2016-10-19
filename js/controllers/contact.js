var volaires = angular.module('Girgy')



volaires.controller('Contact', ['$scope', '$mdTheming', '$http', function($scope, $mdTheming, $http) {


    $mdTheming.generateTheme('green');

    $scope.user = {
        "name": "Sergio",
        "email": "sergiogutzb@hotmail.com",
        "telefono": 3138315841,
        "ciudad": "Bogotá",
        "text": "Hola este mensaje es de prueba We will use this Object to send e-mail. Our app design is when user click on ‘Send email’ Button then only e-mail should be sent, and we have did that part in “app.get(‘/send’)” router. So in that block only paste the code shown below."
    }
    $scope.message = "";
    $scope.send = function() {
        $http({
            method: 'POST',
            url: "/contacto",
            data: {
                to: "sergut18@gmail.com",
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