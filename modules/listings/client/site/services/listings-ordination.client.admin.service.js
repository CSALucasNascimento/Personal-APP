(function () {
  'use strict';

  angular
    .module('listings.ordination.site.services')
    .factory('ListingsOrdinationService', ListingsOrdinationService);

  ListingsOrdinationService.$inject = ['$resource'];

  function ListingsOrdinationService($resource) {
    var Listing = $resource('/api/listings/ordination', {}, {
      get: { method: 'GET', isArray: true }
    });
    return Listing;
  }
}());
