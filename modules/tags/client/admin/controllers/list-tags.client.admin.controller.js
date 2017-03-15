(function () {
  'use strict';

  angular
    .module('tags.admin.controllers')
    .controller('TagsAdminListController', TagsAdminListController);

  TagsAdminListController.$inject = ['TagsService'];

  function TagsAdminListController(TagsService) {
    var vm = this;

    vm.tags = TagsService.query();
  }
}());
