(function () {
  'use strict';

  angular
    .module('listings.admin.services')
    .factory('ListingsService', ListingsService);

  ListingsService.$inject = ['$resource', '$log'];

  function ListingsService($resource, $log) {
    var Listing = $resource('/api/listings/:listingId', {
      listingId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Listing.prototype, {
      createOrUpdate: function () {
        var listing = this;
        return createOrUpdate(listing);
      }
    });

    return Listing;

    function createOrUpdate(listing) {
      if (listing._id) {
        return listing.$update(onSuccess, onError);
      } else {
        return listing.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(listing) {
        // Any required internal processing from inside the service, goes here.
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
      $log.error(error);
    }
  }
}());
