(function () {
  'use strict';

  // Configuring the Listings Admin module
  angular
    .module('listings.admin.config')
    .config(menuConfig);

  menuConfig.$inject = ['msNavigationServiceProvider'];

  function menuConfig(msNavigationServiceProvider) {

    msNavigationServiceProvider.saveItem('admin.listings', {
      title: 'Listings',
      icon: 'icon-linux',
      weight: 2
    });

    msNavigationServiceProvider.saveItem('admin.listings.list', {
      title: 'Listings List',
      state: 'admin.listings.list',
      weight: 1
    });

    msNavigationServiceProvider.saveItem('admin.listings.create', {
      title: 'Create New Listing',
      state: 'admin.listings.create',
      weight: 2
    });
  }
}());
