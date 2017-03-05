angular.module('doroad.controllers', [])


.controller('LoginCtrl', function($scope) {
  $scope.login = function(data) {
    
  }
})


.controller('SignUpCtrl', function($scope) {
  $scope.signup = function(data) {
    
  }
})

.controller('MainCtrl', function($scope,$cordovaGeolocation,$http) {
  $cordovaGeolocation
    .getCurrentPosition({
      timeout: 10000, 
      enableHighAccuracy: false
    })
    .then(function (position) {
      $scope.lat  = position.coords.latitude //latitude
      $scope.long = position.coords.longitude //longitude
      $http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng='+$scope.lat+','+$scope.long+'&sensor=true')
      .then(function(data){      
        $scope.CurrentLocation=data.data.results[0].formatted_address; 
        }, function(err) {
          // error
        });
    }, function(err) {
      // error
    });
});


