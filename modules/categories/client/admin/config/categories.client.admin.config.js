(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('categories.admin.config')
    .config(menuConfig);

  menuConfig.$inject = ['msNavigationServiceProvider'];

  function menuConfig(msNavigationServiceProvider) {

    msNavigationServiceProvider.saveItem('admin.categories', {
      title: 'Categories',
      icon: 'icon-format-list-bulleted',
      weight: 1
    });

    msNavigationServiceProvider.saveItem('admin.categories.list', {
      title: 'Categories List',
      state: 'admin.categories.list',
      weight: 1
    });

    msNavigationServiceProvider.saveItem('admin.categories.create', {
      title: 'Create New Category',
      state: 'admin.categories.create',
      weight: 2
    });
  }
}());
