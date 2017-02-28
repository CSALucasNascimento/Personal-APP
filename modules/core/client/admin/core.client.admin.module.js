(function (app) {
  'use strict';
  app.registerModule('core.admin.services');
  app.registerModule('core.admin.services.interceptors');
  app.registerModule('core.admin.config', ['core.admin.services', 'core.admin.services.interceptors']);
  app.registerModule('core.admin.controllers');
  // *************************
  // * Navigation Controller *
  // *************************
  app.registerModule('core.admin.controllers.navigation');
  app.registerModule('core.admin.directives');
}(ApplicationConfiguration));
