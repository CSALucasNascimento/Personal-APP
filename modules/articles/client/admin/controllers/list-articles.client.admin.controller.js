(function () {
  'use strict';

  angular
    .module('articles.admin.controllers')
    .controller('ArticlesAdminListController', ArticlesAdminListController);

  ArticlesAdminListController.$inject = ['ArticlesService'];

  function ArticlesAdminListController(ArticlesService) {
    var vm = this;

    vm.articles = ArticlesService.query();
  }
}());
