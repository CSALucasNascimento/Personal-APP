(function (app) {
  'use strict';
  app.registerModule('articles.admin.services');
  app.registerModule('articles.admin.config', ['ui.router', 'core.admin.config', 'articles.admin.services']);
  app.registerModule('articles.admin.controllers');
}(ApplicationConfiguration));
