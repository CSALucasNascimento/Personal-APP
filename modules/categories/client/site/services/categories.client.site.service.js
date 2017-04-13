// Categories service used to communicate Categories REST endpoints
(function () {
  'use strict';

  angular
    .module('categories.site.services')
    .factory('CategoriesService', CategoriesService);

  CategoriesService.$inject = ['$resource'];

  function CategoriesService($resource) {
    return $resource('api/categories', {}, {
      query: { method: 'GET', isArray: true }
    });
  }
}());
