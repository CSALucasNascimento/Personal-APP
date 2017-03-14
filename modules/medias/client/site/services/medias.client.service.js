(function () {
  'use strict';

  angular
    .module('medias.site.services')
    .factory('MediasService', MediasService);

  MediasService.$inject = ['$resource', '$log'];

  function MediasService($resource, $log) {
    var Media = $resource('/api/medias/:mediaId', {
      mediaId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Media.prototype, {
      createOrUpdate: function () {
        var media = this;
        return createOrUpdate(media);
      }
    });

    return Media;

    function createOrUpdate(media) {
      if (media._id) {
        return media.$update(onSuccess, onError);
      } else {
        return media.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(media) {
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
