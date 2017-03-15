(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('tags.admin.config')
    .config(menuConfig);

  menuConfig.$inject = ['msNavigationServiceProvider'];

  function menuConfig(msNavigationServiceProvider) {

    msNavigationServiceProvider.saveItem('admin.tags', {
      title: 'Tags',
      icon: 'icon-tag',
      weight: 5
    });

    msNavigationServiceProvider.saveItem('admin.tags.list', {
      title: 'Tags List',
      state: 'admin.tags.list',
      weight: 1
    });

    msNavigationServiceProvider.saveItem('admin.tags.create', {
      title: 'Create New Tag',
      state: 'admin.tags.create',
      weight: 2
    });
  }
}());
