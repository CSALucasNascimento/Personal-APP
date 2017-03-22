(function (app) {
  'use strict';
  app.registerModule('core.admin.config');
  app.registerModule('core.admin.config.menus');
  app.registerModule('core.admin.config.routes');
  app.registerModule('core.admin.config.route-filter');
  app.registerModule('core.admin.controllers');
  app.registerModule('core.admin.services.interceptors');
  // *************************
  // * Navigation Controller *
  // *************************
  app.registerModule('core.admin.controllers.navigation');
  app.registerModule('core.admin.controllers.toolbar');
  app.registerModule('core.admin.directives');
}(ApplicationConfiguration));
