(function () {
  'use strict';

  angular
    .module('listings.ordination.admin.services')
    .factory('ListingsOrdinationService', ListingsOrdinationService);

  ListingsOrdinationService.$inject = ['$resource'];

  function ListingsOrdinationService($resource) {
    var Listing = $resource('/api/listings/ordination');
    return Listing;
  }
}());
