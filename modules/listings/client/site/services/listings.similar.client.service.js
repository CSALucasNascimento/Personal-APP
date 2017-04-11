// Listings service used to communicate Listings REST endpoints
(function () {
  'use strict';

  angular
    .module('listings.site.services')
    .factory('ListingsSimilarService', ListingsSimilarService);

  ListingsSimilarService.$inject = ['$resource'];

  function ListingsSimilarService($resource) {
    var ListingsSearch = $resource('api/listings/similar/:listingId', {
      listingId: '@listingId'
    }, {
      get: { method: 'GET', isArray: true }
    });

    return ListingsSearch;
  }
}());
