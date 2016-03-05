var myApp = angular.module('myApp', []);

addImageToRelayObjects = function(relayObjects) {
	for (var i=0; i < relayObjects.length; i++) {
  		relay = relayObjects[i];
		if (relay.state == 'on') {
			relay.image = 'on_button.gif';
		}
		else {
			relay.image = 'off_button.gif';		
		}
  	}	

	return relayObjects;
}

myApp.controller('RelaysController', ['$scope', '$http', function($scope, $http) {

  $scope.header = 'Relay status';
  
  getRelayInfo = function() {
    var promise = $http.get("http://localhost:80/WebRelay/api/relays");

    promise.then(function(response) {
      var relays = response.data.relays;
      addImageToRelayObjects(relays)
      $scope.relays = relays;
    });
  };
  
  getRelayInfo();
  
}]);


myApp.controller('RelaysControllerMock', ['$scope', '$http', function($scope, $http) {

  $scope.header = 'Relay status';
  
  var relay1 = {
  	'id' : '1',
  	'name' : 'Relay1',
  	'state' : 'off',
  }

    var relay2 = {
  	'id' : '2',
  	'name' : 'Relay2',
  	'state' : 'on',
  }

  var relays = [
  	relay1,
  	relay2
  ]

  addImageToRelayObjects(relays);

  $scope.toggleRelay = function(relayid) {
	for (var i=0; i < $scope.relays.length; i++) {
  		relay = $scope.relays[i];
  		if (relay.id == relayid) {
			if (relay.state == 'on') {
				relay.state = 'off';
				relay.image = 'off_button.gif';
			}
			else {
				relay.state = 'on'
				relay.image = 'on_button.gif';		
			}  			
			break;
  		}
  	}	
  }
  $scope.relays = relays;
  
  
}]);