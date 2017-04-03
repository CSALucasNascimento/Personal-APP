(function () {
  'use strict';

  angular
    .module('core.site.config.menus')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenu('account', {
      roles: ['user']
    });

    menuService.addMenuItem('account', {
      title: '',
      state: 'settings',
      type: 'dropdown',
      roles: ['user']
    });

    // menuService.addSubMenuItem('account', 'settings', {
    //   title: 'My Space',
    //   state: 'settings.myspaces'
    // });

    menuService.addSubMenuItem('account', 'settings', {
      title: 'Profile',
      state: 'settings.profile'
    });

    menuService.addSubMenuItem('account', 'settings', {
      title: 'Favorites',
      state: 'settings.favorites'
    });

  }
}());
