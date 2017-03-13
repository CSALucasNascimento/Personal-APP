(function (app) {
  'use strict';
  app.registerModule('articles.site.services');
  app.registerModule('articles.site.config', ['ui.router', 'core.site.config', 'articles.site.services']);
  app.registerModule('articles.site.controllers');
}(ApplicationConfiguration));
