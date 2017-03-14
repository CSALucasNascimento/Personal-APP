(function () {
  'use strict';

  // Configuring the Amenities Admin module
  angular
    .module('amenities.admin.config')
    .config(menuConfig);

  menuConfig.$inject = ['msNavigationServiceProvider'];

  function menuConfig(msNavigationServiceProvider) {

    msNavigationServiceProvider.saveItem('admin.amenities', {
      title: 'Amenities',
      icon: 'icon-file-document',
      weight: 3
    });

    msNavigationServiceProvider.saveItem('admin.amenities.list', {
      title: 'Amenities List',
      state: 'admin.amenities.list',
      weight: 1
    });

    msNavigationServiceProvider.saveItem('admin.amenities.create', {
      title: 'Create New Amenity',
      state: 'admin.amenities.create',
      weight: 2
    });
  }
}());
