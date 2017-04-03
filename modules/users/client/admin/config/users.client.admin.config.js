(function () {
  'use strict';

  // Configuring the Users Admin module
  angular
    .module('users.admin.config')
    .config(menuConfig);

  menuConfig.$inject = ['msNavigationServiceProvider'];

  function menuConfig(msNavigationServiceProvider) {

    msNavigationServiceProvider.saveItem('admin.users', {
      title: 'Users',
      icon: 'icon-linux',
      weight: 5
    });

    msNavigationServiceProvider.saveItem('admin.users.list', {
      title: 'All Users',
      state: 'admin.users.list',
      weight: 1
    });

  }
}());
