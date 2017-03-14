(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('articles.admin.config')
    .config(menuConfig);

  menuConfig.$inject = ['msNavigationServiceProvider'];

  function menuConfig(msNavigationServiceProvider) {

    msNavigationServiceProvider.saveItem('admin.articles', {
      title: 'Articles',
      icon: 'icon-file-document',
      weight: 2
    });

    msNavigationServiceProvider.saveItem('admin.articles.list', {
      title: 'Articles List',
      state: 'admin.articles.list',
      weight: 1
    });

    msNavigationServiceProvider.saveItem('admin.articles.create', {
      title: 'Create New Article',
      state: 'admin.articles.create',
      weight: 2
    });
  }
}());
