var myApp = angular.module('myApp', [])
    .config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('[[').endSymbol(']]');
    });

var addImageToRelayObjects = function(relayObjects) {
	for (var i=0; i < relayObjects.length; i++) {
  		var relay = relayObjects[i];
		if (relay.state == 'on') {
			relay.image = '/static/on_button.gif';
		}
		else {
			relay.image = '/static/off_button.gif';		
		}
  	}	
	return relayObjects;
};

myApp.controller('RelaysController', ['$scope', '$http', function($scope, $http) {

  $scope.header = 'Relay status';
  
  var getRelayInfo = function() {
    var promise = $http.get("api/relays");

    promise.then(function(response) {
      var relays = response.data.relays;
      addImageToRelayObjects(relays)
      $scope.relays = relays;
    });
  };
  
  $scope.toggleRelay = function(relay) {
    var newState = 'off';
    if (relay.state == 'off') {
    	newState = 'on';
    }
    
    $http.put("/WebRelay/api/relays/"+relay.id, { state : newState}).then(function(response) {
    	relay = response.data.relay;
        if (relay.state == 'on') {
            relay.image = '/static/on_button.gif';
        }
        else {
            relay.image = '/static/off_button.gif';		
        }
        for (var i=0; i < $scope.relays.length; i++) {
            if ($scope.relays[i].id == relay.id) {
                $scope.relays[i] = relay;
                break;
            }
        }    	
    }, function(error) {
    }
    );
  }
  getRelayInfo();
  
}]);
