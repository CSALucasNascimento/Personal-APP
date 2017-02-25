(function (app) {
  'use strict';
  app.registerModule('core.admin.services');
  app.registerModule('core.admin.services.interceptors');
  app.registerModule('core.admin.config', ['core.admin.services', 'core.admin.services.interceptors']);
  app.registerModule('core.admin.controllers');
  app.registerModule('core.admin.directives');
}(ApplicationConfiguration));
