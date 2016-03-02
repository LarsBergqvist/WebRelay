var myApp = angular.module('myApp', []);

myApp.controller('RelaysController', ['$scope', '$http', function($scope, $http) {

  $scope.header = 'Relay status';
  
  getRelayInfo = function() {
    var promise = $http.get("http://localhost:80/WebRelay/api/relays");

    promise.then(function(response) {
      var relays = response.data.relays;
      $scope.relays = relays;
    });
  };
  
  getRelayInfo();
  
}]);