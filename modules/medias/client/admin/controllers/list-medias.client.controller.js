(function () {
  'use strict';

  angular
    .module('medias.admin.controllers')
    .controller('MediasAdminListController', MediasAdminListController);

  MediasAdminListController.$inject = ['MediasService'];

  function MediasAdminListController(MediasService) {
    var vm = this;

    vm.medias = MediasService.query();
  }
}());
