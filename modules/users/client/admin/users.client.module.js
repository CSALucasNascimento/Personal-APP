(function (app) {
  'use strict';
  app.registerModule('users.admin.config', ['ui.router', 'core.admin.config']);
  app.registerModule('users.admin.controllers');
  app.registerModule('users.admin.controllers.settings');
  app.registerModule('users.admin.directives');
  app.registerModule('users.admin.services');
}(ApplicationConfiguration));
