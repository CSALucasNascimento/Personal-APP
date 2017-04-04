(function () {
  'use strict';

  angular
    .module('listings.site.services')
    .factory('ListingsService', ListingsService);

  ListingsService.$inject = ['$resource', '$log'];

  function ListingsService($resource, $log) {
    var Listing = $resource('/api/listings');
    return Listing;
  }
}());
