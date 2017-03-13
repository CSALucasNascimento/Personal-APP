// Categories service used to communicate Categories REST endpoints
(function () {
  'use strict';

  angular
    .module('categories.admin.services')
    .factory('CategoriesRootService', CategoriesRootService);

  CategoriesRootService.$inject = ['$resource'];

  function CategoriesRootService($resource) {
    return $resource('api/categories/root');
  }
}());
