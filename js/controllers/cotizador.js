var volaires = angular.module('Girgy')
volaires.controller('Cotizador', ['$scope', 'colombia', '$mdTheming', 'Upload', '$timeout', '$http', function($scope, $colombia, $mdTheming, Upload, $timeout, $http) {

  $mdTheming.generateTheme('amber');
  $mdTheming.generateTheme('green');

  var coljson = $colombia.getData()
    .success(function(response) {
      var data = response;
      $scope.departamentos = data.map(function(departamento) {
        return { dpto: departamento.departamento }
      });
    })
  $scope.activated = false;
  $scope.factura = "Si";
  $scope.foto = false;
  $scope.factura_txt = "";
  $scope.bottom = "CALCULAR";
  $scope.nombre = "";
  $scope.correo = "";
  $scope.departamento = "";
  $scope.ciudad = "";
  $scope.direccion = "";
  $scope.tipo_muebles = "";
  $scope.cmkwh = "";
  $scope.cpmkwh = "";
  $scope.pas = "";
  $scope.vfactura = "";
  $scope.tipo_muebles = "";
  $scope.inmuebles = ["Casa", "Apartamento", "Oficina", "Local"];

  var visibleco = false;

  $scope.loadCiudades = function() {
    var depto = [];
    if ($scope.departamento != undefined) {
      var deptos = $colombia.getData()
        .success(function(response) {
          depto = response.filter(function(element) {
            return element.departamento === $scope.departamento;
          });
          if (depto.length > 0) {
            $scope.ciudades = depto[0].ciudades.map(function(ciudad) {
              return { city: ciudad }
            });
          }
        })
    }
  };

  $scope.$watch('departamento', function() {
    $scope.loadCiudades();
  });

  $scope.$watch('factura', function() {
    change();
  });

  $scope.$watch('pas', function(e) {
    if (e == undefined) {
      $scope.pas = 0.5;
    }
  });


  function change() {
    if (visibleco) {
      $('#informe').slideToggle("slow", function() {
        visibleco = false;
      });
    }
    if ($scope.factura == "Si") {
      $scope.factura_txt = "Calcula el costo promedio de tu sistema fotovoltaico de forma clara e inmediata en instalaciones con factura mensual. Proveemos todas las herramientas para que sepas cómo determinar el consumo promedio anual y tengas una idea del beneficio que podrás obtener.";
      $('#con-factura').slideToggle("slow", function() {
        $("#con-factura").find("input").attr("required");
      });
    } else {
      $scope.factura_txt = "Si quieres calcular el costo promedio de tu sistema fotovoltaico en proyectos futuros, deja tus datos y nuestro personal se pondrá en contacto contigo.";
      $('#con-factura').slideToggle("slow", function() {
        $("#con-factura").find("input").removeAttr("required");
        $scope.bottom = "ENVIAR";
      });
    }
  }

  // cmkwh: "", //B5
  // cpmkwh: "", //B6
  // pas: "", B9
  // vfactura: "" //B11
  $scope.calcular = function() {
    if ($scope.factura == "Si") {
      if ($scope.file == undefined) {
        var whpm = $scope.cpmkwh * 1000; //B7
        var whpd = whpm / 30; //B8
        var total = whpd * $scope.pas; //B10
        var cosumo_anual = $scope.cpmkwh * 12; //B12

        var wh_ET = total; //E9
        var wh_R = 1 - 0.10 - 0.2; //F9
        var wh_E = wh_ET / wh_R; //G9

        var wp = 260.0; //potencia máxima del panel  numero de panels
        var horas = 7; //horas pico solares
        var fs = 1.25; //factor seguridad
        var wh_NP = wh_E / (0.9 * wp * horas) * fs; //H9
        var wh_NP_round = Math.ceil(wh_NP); //H10
        var area = wh_NP * 2.2; //I9
        var area_total = wh_NP_round * 2.4; //I10

        var hce = 900 * $scope.cpmkwh; //huella carbono electricidad B15
        var hcs = 100 * $scope.cpmkwh; //huella carbono solar B16
        var hcd = hce - hcs; //huella carbono diferencia B17

        // ################### INFORME ##################

        $scope.n_ps = wh_NP_round; //numero paneles solares;
        $scope.area_RS = area_total; //área requerida para el sistema
        $scope.ha = Math.round(($scope.area_RS / 1000) * 1000) / 1000; //área requerida para el sistema ha
        $scope.gCO2 = hcd; //mensualmente dejas de emitir

        $scope.eac = cosumo_anual; //energía anual consumida;
        $scope.carc = Math.ceil(($scope.vfactura * 12) / $scope.cmkwh * $scope.cpmkwh); //costo anual con red convencional

        $scope.eas = cosumo_anual * $scope.pas; //energía anual suministrada   

        // ################### POSBILE ECO 2 ##################

        var valorPanel = 2645 * wp;
        var valorInversores = 2500000;
        var cantInversores = 1;
        var valorSoportes = 300000;
        var costosDirectos = (valorPanel * $scope.n_ps + cantInversores * valorInversores + valorSoportes * $scope.n_ps) * 1.05;
        var costosLogistica = 0;

        var ingElectricos = (costosLogistica + costosDirectos) * 0.15;
        var costoPersonal = ingElectricos * 1.05;

        var subtotalAntesAIU = costosDirectos + costosLogistica + costoPersonal; //J39

        var administracion = subtotalAntesAIU * 0.1; //(10%)      
        var impuestos = subtotalAntesAIU * 0.06; //(6%)      
        var imprevistos = subtotalAntesAIU * 0.05; //(5%)      
        var utilidad = subtotalAntesAIU * 0.1; //(10%)      
        var subtotalsinIVA = subtotalAntesAIU + administracion + impuestos + imprevistos + utilidad;
        var iVASobreUtilidades = subtotalsinIVA * 0.16;
        var total_g = subtotalsinIVA + iVASobreUtilidades;

        // ################### SISTEMA FOTOVOLTAICO ##################

        $scope.cass = Math.ceil(total_g / 25); //costo anual sistema solar;

        $scope.vinversion = Math.ceil(total_g);
        $scope.pago25 = Math.ceil($scope.carc * 25 * 1.235);
        $scope.ahorro = Math.ceil($scope.pago25 - total_g);

        $scope.options = {
          chart: {
            type: 'multiBarHorizontalChart',
            height: 300,
            x: function(d) { return d.label; },
            y: function(d) { return d.value; },
            valuePadding: 80,
            groupSpacing: 0.1,
            showControls: false,
            showValues: true,
            duration: 700,
            showXAxis: false,
            yAxis: {
              axisLabel: 'COSTO ENERGÍA ANUAL EN PESOS COLOMBIANOS',
              tickFormat: function(d) {
                return d3.format(',.2f')(d);
              }
            },
            yDomain: [0, $scope.carc + $scope.carc / 3],
          },
          title: {
            enable: true,
            text: "COSTO ENERGÍA ANUAL",
            className: "title-d3"
          }
        };

        $scope.data = [{
            "key": "Sistema Fotovoltaico",
            "color": "#05894d",
            "values": [{
              "label": "Costo anual",
              "value": $scope.cass
            }]
          },
          {
            "key": "Red Convencional",
            "color": "#4D4D4D",
            "values": [{
              "label": "Costo anual",
              "value": $scope.carc
            }]
          }
        ]

        if (!visibleco) {
          $('#informe').slideToggle("slow", function() {
            var target = '#informe';
            var $target = $(target);
            var va = $target.offset().top - 70;
            $('html, body').stop().animate({
              'scrollTop': va
            }, 500, 'swing');
            visibleco = true;
          });
        } else {
          var target = '#informe';
          var $target = $(target);
          var va = $target.offset().top - 70;
          $('html, body').stop().animate({
            'scrollTop': va
          }, 500, 'swing');
        }
        send_cotizacion_factura();
      } else {
        send_cotizacion_factura_foto();
      }
    } else {
      send_email_co();
    }
  }


  //////////////////////////UPLOAD IMAGES /////////////////////////

  $scope.$watch('file', function() {

    if ($scope.file) {
      $scope.upload($scope.file);
      $('#comentario').css("display", "block");
    } else {
      $('#comentario').css("display", "none");
    }
  });


  $scope.upload = function(file, errFiles) {
    $scope.f = file;
    console.log("upload.........")
    console.log(file)
    $scope.errFile = errFiles && errFiles[0];
    if (file) {
      file.upload = Upload.upload({
        url: '/upload',
        data: { file: file }
      });

      file.upload.then(function(response) {
        $timeout(function() {
          file.result = response.data;
        });
      }, function(response) {
        if (response.status > 0)
          $scope.errorMsg = response.status + ': ' + response.data;
      }, function(evt) {
        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
      });
    }
  }

  function send_cotizacion_factura_foto() {
    $('#progress').slideToggle("slow");
    $scope.activated = true;
    $http({
      method: 'POST',
      url: "/send",
      data: {
        to: "servicios@girgysolar.com",
        subject: "Cotización - Foto Factura",
        text: "Nombre: " + $scope.nombre + "\nCorreo: " + $scope.correo + "\nDepartamento: " + $scope.departamento + "\nCiudad: " + $scope.ciudad + "\nTipo inmueble: " + $scope.tipo_muebles + "\n\nComentarios:\n" + $scope.text,
        from: '"' + $scope.name + '" <' + $scope.email + '>',
        file: $scope.file.name
      }
    }).then(function(res) {
      $scope.reset($scope.cotizador);
      $scope.message = "Se ha enviado con éxito la factura.";
      $scope.activated = false;
      $('#progress').slideToggle("slow");

    }, function(error) {
      $scope.message = "Hubo un problema al enviar la factura, intentelo más tarde.";
      $scope.activated = false;
      $('#progress').slideToggle("slow");
    })
  }

  function send_cotizacion_factura() {
    $('#progress').slideToggle("slow");
    $scope.activated = true;
    $http({
      method: 'POST',
      url: "/send", //send
      data: {
        to: "servicios@girgysolar.com",
        subject: "Cotización - Factura",
        text: "Nombre: " + $scope.nombre + "\nCorreo: " + $scope.correo + "\nDepartamento: " + $scope.departamento + "\nCiudad: " + $scope.ciudad + "\nTipo inmueble: " + $scope.tipo_muebles + "\n\n\nDatos de la factura:\nConsumo mes kWh: " + $scope.cmkwh + "\nConsumo promedio mensual: " + $scope.cpmkwh + "\nPorcentaje atendido por el sitema: " + $scope.pas + "\nValor Factura: " + $scope.vfactura,
        from: '"' + $scope.name + '" <' + $scope.email + '>',
      }
    }).then(function(res) {
      $scope.reset($scope.cotizador);
      $scope.message = "Se ha enviado con exito los datos de la cotización.";
      $scope.activated = false;
      $('#progress').slideToggle("slow");

    }, function(error) {
      $scope.message = "Hubo un problema al enviar la factura, intentelo más tarde.";
      $scope.activated = false;
      $('#progress').slideToggle("slow");
    })
  }

  function send_cotizacion_factura() {
    $('#progress').slideToggle("slow");
    $scope.activated = true;
    $http({
      method: 'POST',
      url: "/send", //send
      data: {
        to: "servicios@girgysolar.com",
        subject: "Cotización - Sin Factura",
        text: "Nombre: " + $scope.nombre + "\nCorreo: " + $scope.correo + "\nDepartamento: " + $scope.departamento + "\nCiudad: " + $scope.ciudad + "\nTipo inmueble: " + $scope.tipo_muebles,
        from: '"' + $scope.name + '" <' + $scope.email + '>',
      }
    }).then(function(res) {
      $scope.reset($scope.cotizador);
      $scope.message = "Se ha enviado con éxito la solicitud de cotización.";
      $scope.activated = false;
      $('#progress').slideToggle("slow");

    }, function(error) {
      $scope.message = "Hubo un problema al enviar la solicitud, intentelo más tarde.";
      $scope.activated = false;
      $('#progress').slideToggle("slow");
    })
  }

  $scope.cmkwh = "";
  $scope.cpmkwh = "";
  $scope.pas = "";
  $scope.vfactura = "";

  $scope.reset = function(form) {
    $scope.foto = false;
    $scope.nombre = "";
    $scope.correo = "";
    $scope.departamento = "";
    $scope.ciudad = "";
    $scope.direccion = "";
    $scope.tipo_muebles = "";
    $scope.cmkwh = "";
    $scope.cpmkwh = "";
    $scope.pas = "";
    $scope.vfactura = "";
    $scope.tipo_muebles = "";
    $scope.text = "";
    $scope.file = null;
    if (form) {
      form.$setPristine();
      form.$setUntouched();
    }
  }
  $scope.message = "";
  $scope.cotizador;

  $scope.reset($scope.cotizador);

}]);