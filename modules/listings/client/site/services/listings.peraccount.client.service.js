// Listings service used to communicate Listings REST endpoints
(function () {
  'use strict';

  angular
    .module('listings.site.services')
    .factory('ListingsPerAccountService', ListingsPerAccountService);

  ListingsPerAccountService.$inject = ['$resource'];

  function ListingsPerAccountService($resource) {
    var ListingsSearch = $resource('api/listings/account/:accountId', {
      accountId: '@accountId'
    }, {
      get: { method: 'GET', isArray: true }
    });

    return ListingsSearch;
  }
}());
