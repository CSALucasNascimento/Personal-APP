(function () {
  'use strict';

  // Configuring the Medias Admin module
  angular
    .module('medias.admin.config')
    .config(menuConfig);

  menuConfig.$inject = ['msNavigationServiceProvider'];

  function menuConfig(msNavigationServiceProvider) {

    msNavigationServiceProvider.saveItem('admin.medias', {
      title: 'Medias',
      icon: 'icon-file-document',
      weight: 5
    });

    msNavigationServiceProvider.saveItem('admin.medias.list', {
      title: 'Medias List',
      state: 'admin.medias.list',
      weight: 1
    });

    msNavigationServiceProvider.saveItem('admin.medias.create', {
      title: 'Create New Media',
      state: 'admin.medias.create',
      weight: 2
    });
  }
}());
