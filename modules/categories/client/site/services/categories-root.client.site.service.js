// Categories service used to communicate Categories REST endpoints
(function () {
  'use strict';

  angular
    .module('amenities.site.services')
    .factory('AmenitiesRootService', AmenitiesRootService);

  AmenitiesRootService.$inject = ['$resource'];

  function AmenitiesRootService($resource) {
    return $resource('api/amenities/root');
  }
}());
