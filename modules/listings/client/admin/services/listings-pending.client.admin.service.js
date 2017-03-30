(function () {
  'use strict';

  angular
    .module('listings.pending.admin.services')
    .factory('ListingsPendingService', ListingsPendingService);

  ListingsPendingService.$inject = ['$resource'];

  function ListingsPendingService($resource) {
    var Listing = $resource('/api/listings/pending');
    return Listing;
  }
}());
