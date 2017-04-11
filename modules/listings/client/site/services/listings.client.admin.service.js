(function () {
  'use strict';

  angular
    .module('listings.site.services')
    .factory('ListingsService', ListingsService);

  ListingsService.$inject = ['$resource'];

  function ListingsService($resource) {
    var Listing = $resource('/api/listings', {}, {
      get: { method: 'GET', isArray: true }
    });
    return Listing;
  }
}());
