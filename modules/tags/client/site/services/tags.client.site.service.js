(function () {
  'use strict';

  angular
    .module('tags.site.services')
    .factory('TagsService', TagsService);

  TagsService.$inject = ['$resource', '$log'];

  function TagsService($resource, $log) {
    var Tag = $resource('/api/tags/:tagId', {
      tagId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Tag.prototype, {
      createOrUpdate: function () {
        var tag = this;
        return createOrUpdate(tag);
      }
    });

    return Tag;

    function createOrUpdate(tag) {
      if (tag._id) {
        return tag.$update(onSuccess, onError);
      } else {
        return tag.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(tag) {
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
