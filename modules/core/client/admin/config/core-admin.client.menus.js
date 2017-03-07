(function () {
  'use strict';

  angular
    .module('core.admin.config')
    .config(menuConfig);

  menuConfig.$inject = ['msNavigationServiceProvider'];

  function menuConfig(msNavigationServiceProvider) {

    msNavigationServiceProvider.saveItem('admin', {
      title: 'Dashboard',
      group: true,
      weight: 1
    });

    msNavigationServiceProvider.saveItem('admin.settings', {
      title: 'Dashboard',
      icon: 'icon-tile-four',
      state: 'admin.settings',
      weight: 1
    });

    /*
     menuService.addMenu('account', {
     roles: ['admin']
     });

     menuService.addMenuItem('account', {
     title: '',
     state: 'settings',
     type: 'dropdown',
     roles: ['admin']
     });

     menuService.addSubMenuItem('account', 'settings', {
     title: 'Edit Profile',
     state: 'settings.profile'
     });

     menuService.addSubMenuItem('account', 'settings', {
     title: 'Edit Profile Picture',
     state: 'settings.picture'
     });

     menuService.addSubMenuItem('account', 'settings', {
     title: 'Change Password',
     state: 'settings.password'
     });

     menuService.addSubMenuItem('account', 'settings', {
     title: 'Manage Social Accounts',
     state: 'settings.accounts'
     });
     */
  }
}());
