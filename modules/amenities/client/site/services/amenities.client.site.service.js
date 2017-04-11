// Amenities service used to communicate Amenities REST endpoints
(function () {
  'use strict';

  angular
    .module('amenities.site.services')
    .factory('AmenitiesService', AmenitiesService);

  AmenitiesService.$inject = ['$resource'];

  function AmenitiesService($resource) {
    return $resource('api/amenities/:amenityId', {
      amenityId: '@_id'
    }, {
      get: { method: 'GET', isArray: true }
    });
  }
}());
