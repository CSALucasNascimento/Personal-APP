(function (app) {
  'use strict';
  app.registerModule('articles.admin.services', ['tags.admin.services']);
  app.registerModule('articles.admin.config');
  app.registerModule('articles.admin.config.routes', ['core.admin.config.routes', 'articles.admin.services']);
  app.registerModule('articles.admin.controllers');
}(ApplicationConfiguration));
