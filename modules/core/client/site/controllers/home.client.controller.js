(function () {
  'use strict';

  angular
    .module('core.site.controllers')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope', '$document'];

  function HomeController($scope, $document) {
    var vm = this;
    vm.initMap = initMap;
    vm.handleLocationError = handleLocationError;

    function initMap() {

      var map = new google.maps.Map($document[0].querySelector('#map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 6
      });
      var infoWindow = new google.maps.InfoWindow({ map: map });

      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent('Location found.');
          map.setCenter(pos);
        }, function() {
          handleLocationError(true, infoWindow, map.getCenter());
        });
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }
    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    }

  }
}());
