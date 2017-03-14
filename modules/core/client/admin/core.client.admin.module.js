(function (app) {
  'use strict';
  app.registerModule('core.admin.services.interceptors');
  app.registerModule('core.admin.config');
  app.registerModule('core.admin.config.menus');
  app.registerModule('core.admin.config.routes', ['ui.router']);
  app.registerModule('core.admin.controllers');
  // *************************
  // * Navigation Controller *
  // *************************
  app.registerModule('core.admin.controllers.navigation');
  app.registerModule('core.admin.controllers.toolbar');
  app.registerModule('core.admin.directives');
}(ApplicationConfiguration));
