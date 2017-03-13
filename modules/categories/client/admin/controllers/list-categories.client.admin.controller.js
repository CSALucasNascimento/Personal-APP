(function () {
  'use strict';

  angular
    .module('categories.admin.controllers')
    .controller('CategoriesListController', CategoriesListController);

  CategoriesListController.$inject = ['CategoriesService'];

  function CategoriesListController(CategoriesService) {
    var vm = this;

    vm.categories = CategoriesService.query();
  }
}());
