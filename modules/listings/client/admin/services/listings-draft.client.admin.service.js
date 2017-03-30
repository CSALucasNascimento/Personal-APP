(function () {
  'use strict';

  angular
    .module('listings.draft.admin.services')
    .factory('ListingsDraftService', ListingsDraftService);

  ListingsDraftService.$inject = ['$resource'];

  function ListingsDraftService($resource) {
    var Listing = $resource('/api/listings/draft');
    return Listing;
  }
}());
