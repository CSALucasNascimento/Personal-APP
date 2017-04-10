// Listings service used to communicate Listings REST endpoints
(function () {
  'use strict';

  angular
    .module('listings.site.services')
    .factory('ListingsAdvancedSearchService', ListingsAdvancedSearchService);

  ListingsAdvancedSearchService.$inject = ['$resource'];

  function ListingsAdvancedSearchService($resource) {
    var ListingsAdvancedSearch = $resource('api/listings/advancedSearch/:qLocation/location/:qCategory/category', {
      qLocation: '@qLocation',
      qCategory: '@qCategory'
    }, {
      get: { method: 'GET', isArray: true }
    });

    return ListingsAdvancedSearch;
  }
}());
