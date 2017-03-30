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

    msNavigationServiceProvider.saveItem('admin.listings.dashboard', {
      title: 'Dashboard',
      state: 'admin.listings.dashboard',
      weight: 1
    });

    msNavigationServiceProvider.saveItem('admin.listings.list', {
      title: 'All Listings',
      state: 'admin.listings.list',
      weight: 2
    });

    msNavigationServiceProvider.saveItem('admin.listings.draft', {
      title: 'Draft',
      state: 'admin.listings.draft',
      weight: 3
    });

    msNavigationServiceProvider.saveItem('admin.listings.pending', {
      title: 'Pending',
      state: 'admin.listings.pending',
      weight: 4
    });

    msNavigationServiceProvider.saveItem('admin.listings.featured', {
      title: 'Featured',
      state: 'admin.listings.featured',
      weight: 5
    });

    msNavigationServiceProvider.saveItem('admin.listings.create', {
      title: 'Create New Listing',
      state: 'admin.listings.create',
      weight: 6
    });
  }
}());
