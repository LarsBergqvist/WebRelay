var myApp = angular.module('myApp', [])
    .config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('[[').endSymbol(']]');
    });


addImageToRelayObjects = function(relayObjects) {
	for (var i=0; i < relayObjects.length; i++) {
  		relay = relayObjects[i];
		if (relay.state == 'on') {
			relay.image = '../static/on_button.gif';
		}
		else {
			relay.image = '../static/off_button.gif';		
		}
  	}	

	return relayObjects;
}

myApp.controller('RelaysController', ['$scope', '$http', function($scope, $http) {

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

  $scope.toggleRelay = function(relay) {
	for (var i=0; i < $scope.relays.length; i++) {
  		if (relay.id == $scope.relays[i]) {
			if ($scope.relays[i].state == 'on') {
				$scope.relays[i].state = 'off';
				$scope.relays[i].image = '../static/off_button.gif';
			}
			else {
				$scope.relays[i].state = 'on'
				$scope.relays[i].image = '../static/on_button.gif';		
			}  			
			break;
  		}
  	}	
  }
  $scope.relays = relays;
  
  
}]);
