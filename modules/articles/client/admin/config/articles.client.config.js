(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('articles.admin.config')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Articles',
      state: 'admin.articles.list'
    });
  }
}());
