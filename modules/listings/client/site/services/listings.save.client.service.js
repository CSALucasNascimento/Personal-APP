// Listings service used to communicate Listings REST endpoints
(function () {
  'use strict';

  angular
    .module('listings.site.services')
    .factory('ListingsSaveService', ListingsSaveService);

  ListingsSaveService.$inject = ['$resource'];

  function ListingsSaveService($resource) {
    var ListingsSave = $resource('api/listings/saveFavorite/:listingId', {
      listingId: '@_id'
    }, {
      updateSave: {
        method: 'PUT'
      }
    });

    angular.extend(ListingsSave.prototype, {
      updateSave: function () {
        var listing = this;
        return updateSave(listing);
      }
    });

    return ListingsSave;

    function updateSave(listing) {

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
