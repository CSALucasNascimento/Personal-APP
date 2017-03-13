(function (app) {
  'use strict';
  app.registerModule('categories.admin.services');
  app.registerModule('categories.admin.config', ['ui.router', 'core.admin.config', 'categories.admin.services']);
  app.registerModule('categories.admin.controllers', ['categories.admin.services']);
}(ApplicationConfiguration));
