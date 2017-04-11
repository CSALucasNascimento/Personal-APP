// Listings service used to communicate Listings REST endpoints
(function () {
  'use strict';

  angular
    .module('listings.site.services')
    .factory('ListingsService', ListingsService);

  ListingsService.$inject = ['$resource'];

  function ListingsService($resource) {

    var Listing = $resource('api/listings/:listingId', {
      listingId: '@_id'
    }, {
      get: { method: 'GET' }
    });

    return Listing;

  }
}());
