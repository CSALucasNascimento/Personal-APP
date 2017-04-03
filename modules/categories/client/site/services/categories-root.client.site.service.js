// Categories service used to communicate Categories REST endpoints
(function () {
  'use strict';

  angular
    .module('categories.site.services')
    .factory('CategoriesRootService', CategoriesRootService);

  CategoriesRootService.$inject = ['$resource'];

  function CategoriesRootService($resource) {
    return $resource('api/categories/root');
  }
}());
