
var volaires = angular.module('Girgy')
volaires.controller('Cotizador', ['$scope', 'colombia', '$mdTheming', function($scope, $colombia, $mdTheming){

  $mdTheming.generateTheme('amber');

  var coljson = $colombia.getData()
  .success(function(response){
    var data = response;
    $scope.departamentos = data.map(function(departamento){
      return {dpto: departamento.departamento}
    });
  })

  $scope.factura = "Si";
  $scope.factura_txt = "";
  $scope.cotizador = {
    nombre: "Alberto",
    correo: "",
    departamento: "",
    ciudad: "",
    direccion: "",
    tipo_muebles: "",
    cmkwh: 193,
    cpmkwh: 175,
    pas: 1.0,
    vfactura: 101663,
  }

  $scope.inmuebles = ["Casa", "Apartamento", "Oficina", "Local"];
  $scope.tipo_muebles = {
    mueble: "Casa", 
    mueble: "Apartamento", 
    mueble: "Oficina", 
    mueble: "Local"
  };

  
  $scope.ciudades;

  $scope.loadCiudades = function(){
    console.log("cargardo ciudades del depto: " + $scope.cotizador.departamento);
    var depto = [];
    if ($scope.cotizador.departamento != undefined) {
      var deptos = $colombia.getData()
      .success(function(response){
        depto = response.filter(function (element) {
          return element.departamento === $scope.cotizador.departamento;
        });
        console.log(depto)
        console.log(depto.ciudades)
        $scope.ciudades = depto[0].ciudades.map(function(ciudad){
          return {city: ciudad}
        });
      })   
    } 
  };

  $scope.$watch('cotizador.departamento', function() {
    $scope.loadCiudades();
  });

  $scope.$watch('factura', function() {
    change();
  });

  

  function change (){
    if ($scope.factura == "Si"){
      $scope.factura_txt = "Calcula el costo promedio de tu sistema fotovoltaico de forma clara e inmediata en instalaciones con factura mensual. Proveemos todas las herramientas para que sepas cómo determinar el consumo promedio anual y tengas una idea del beneficio que podrás obtener.";
      $('#con-factura').slideToggle("slow", function(){
        $(".form-factura").attr("required")
      });

    }else {
      $scope.factura_txt = "Si quieres calcular el costo promedio de tu sistema fotovoltaico en proyectos futuros, deja tus datos y nuestro personal se pondrá en contacto contigo.";
      $('#con-factura').slideToggle("slow",  function(){
        $(".form-factura").removeAttr("required")
      });
    }
  }

  // cmkwh: "", //B5
  // cpmkwh: "", //B6
  // pas: "", B9
  // vfactura: "" //B11
  $scope.calcular = function (){
    if ($scope.factura == "Si"){
      var whpm         = $scope.cotizador.cpmkwh*1000; //B7
      var whpd         = whpm/30;//B8
      var total        = whpd*$scope.cotizador.pas;//B10
      var cosumo_anual = $scope.cotizador.cpmkwh*12;//B12
      
      var wh_ET        = total; //E9
      var wh_R         = 1-0.10-0.2; //F9
      var wh_E         = wh_ET/wh_R; //G9
      
      var wp           = 260.0;//potencia máxima del panel  numero de panels
      var horas        = 7; //horas pico solares
      var fs           = 1.25; //factor seguridad
      var wh_NP        = wh_E/(0.9*wp*horas)*fs; //H9
      console.log("wh_NP " + wh_NP)
      var wh_NP_round  = Math.ceil(wh_NP); //H10
      var area         = wh_NP*2.2; //I9
      var area_total   = wh_NP_round*2.4; //I10
      
      var hce          = 900*$scope.cotizador.cpmkwh; //huella carbono electricidad B15
      var hcs          = 100*$scope.cotizador.cpmkwh; //huella carbono solar B16
      var hcd          = hce-hcs; //huella carbono diferencia B17

      // ################### INFORME ##################

      $scope.n_ps    = wh_NP_round; //numero paneles solares;
      $scope.area_RS = area_total; //área requerida para el sistema
      $scope.ha      = Math.round(($scope.area_RS/1000)* 1000)/1000; //área requerida para el sistema ha
      $scope.gCO2     = hcd; //mensualmente dejas de emitir
      
      $scope.eac = cosumo_anual; //energía anual consumida;
      $scope.carc = Math.ceil( ($scope.cotizador.vfactura*12)/$scope.cotizador.cmkwh*$scope.cotizador.cpmkwh ); //costo anual con red convencional
      
      $scope.eas     = cosumo_anual*$scope.cotizador.pas; //energía anual suministrada
      


      // ################### POSBILE ECO 2 ##################

      var valorPanel         = 2645*wp;
      var valorInversores    = 2500000;
      var cantInversores     = 1; 
      var valorSoportes      = 300000;    
      var costosDirectos     = (valorPanel*$scope.n_ps+cantInversores*valorInversores+valorSoportes*$scope.n_ps)*1.05;
      console.log("costosDirectos: " + costosDirectos);
      var costosLogistica    = 0;
      
      var ingElectricos      = (costosLogistica+costosDirectos)*0.15;
      var costoPersonal      = ingElectricos*1.05;
      console.log("costoPersonal: " + costoPersonal);
      
      var subtotalAntesAIU   = costosDirectos+costosLogistica+costoPersonal; //J39
      console.log("subtotalAntesAIU: " + subtotalAntesAIU);
      
      var administracion     = subtotalAntesAIU*0.1; //(10%)      
      var impuestos          = subtotalAntesAIU*0.06; //(6%)      
      var imprevistos        = subtotalAntesAIU*0.05; //(5%)      
      var utilidad           = subtotalAntesAIU*0.1; //(10%)      
      var subtotalsinIVA     =  subtotalAntesAIU+administracion+impuestos+imprevistos+utilidad;
      console.log("subtotalsinIVA: " + subtotalsinIVA);
      var iVASobreUtilidades = subtotalsinIVA*0.16;
      console.log(iVASobreUtilidades);
      var total_g             = subtotalsinIVA+iVASobreUtilidades;


      // ################### SISTEMA FOTOVOLTAICO ##################

      $scope.cass    = Math.ceil(total_g/25); //costo anual sistema solar;

      $('#informe').slideToggle("slow", function(){
        var target = '#informe';
        var $target = $(target);
        var va = $target.offset().top - 70;
        $('html, body').stop().animate({
          'scrollTop': va
        }, 500, 'swing');
      });
    }else{
      console.log("no se calculo nada")
    }
  }
}]);