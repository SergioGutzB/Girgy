angular
.module('Colombia', [])
.factory('colombia', ['$http',function ($http) {
  return {
    getData: function(){
      global = $http({
        method: 'get',
        url: 'json/colombia.json',
      })
      return global;
    }
  };
}])
