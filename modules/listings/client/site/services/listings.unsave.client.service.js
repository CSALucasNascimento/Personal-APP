// Listings service used to communicate Listings REST endpoints
(function () {
  'use strict';

  angular
    .module('listings.site.services')
    .factory('ListingsUnsaveService', ListingsUnsaveService);

  ListingsUnsaveService.$inject = ['$resource'];

  function ListingsUnsaveService($resource) {
    var ListingsUnsave = $resource('api/listings/unsaveFavorite/:listingId', {
      listingId: '@_id'
    }, {
      updateUnsave: {
        method: 'PUT'
      }
    });

    angular.extend(ListingsUnsaveService.prototype, {
      updateUnsave: function () {
        var listing = this;
        return updateUnsave(listing);
      }
    });

    return ListingsUnsave;

    function updateUnsave(listing) {

      if (listing) {
        return listing.$update(onSuccess, onError);
      }
      // Handle successful response
      function onSuccess(res) {
        // Any required internal processing from inside the service, goes here.
        return res;
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      console.log(error);
    }
  }
}());
