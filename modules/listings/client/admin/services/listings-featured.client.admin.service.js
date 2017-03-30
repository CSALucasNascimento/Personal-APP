(function () {
  'use strict';

  angular
    .module('listings.featured.admin.services')
    .factory('ListingsFeaturedService', ListingsFeaturedService);

  ListingsFeaturedService.$inject = ['$resource'];

  function ListingsFeaturedService($resource) {
    var Listing = $resource('/api/listings/featured');
    return Listing;
  }
}());
