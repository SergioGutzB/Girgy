
var volaires = angular.module('Girgy')



volaires.controller('Contact', ['$scope', '$mdTheming', '$http', function($scope, $mdTheming, $http){


  $mdTheming.generateTheme('green');

  $scope.user = {
    "name": "Sergio",
    "email": "sergiogutzb@hotmail.com",
    "telefono": 3138315841,
    "ciudad": "Bogotá",
    "text": "Hola este mensaje es de prueba We will use this Object to send e-mail. Our app design is when user click on ‘Send email’ Button then only e-mail should be sent, and we have did that part in “app.get(‘/send’)” router. So in that block only paste the code shown below."
  }

  $scope.send = function(){
    $http({
      method: 'POST',
      url: "/send",
      data: {
        to: "sergut18@gmail.com",
        subject: "prueba email",
        text: $scope.user.text, 
        from: '"'+$scope.user.name + '" <' +$scope.user.email+'>',
      }
    }).then(function(res){
      console.log("correo enviado: " + res);
    }, function (error){
      console.log("error: " + error);
    })
  }

}]);