(function () {
  'use strict';

  angular
    .module('amenities.admin.services')
    .factory('AmenitiesService', AmenitiesService);

  AmenitiesService.$inject = ['$resource', '$log'];

  function AmenitiesService($resource, $log) {
    var Amenity = $resource('/api/amenities/:amenityId', {
      amenityId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Amenity.prototype, {
      createOrUpdate: function () {
        var amenity = this;
        return createOrUpdate(amenity);
      }
    });

    return Amenity;

    function createOrUpdate(amenity) {
      if (amenity._id) {
        return amenity.$update(onSuccess, onError);
      } else {
        return amenity.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(amenity) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      $log.error(error);
    }
  }
}());
