(function (app) {
  'use strict';
  app.registerModule('tags.site.services');
  app.registerModule('tags.site.config', ['ui.router', 'core.site.config', 'tags.site.services']);
  app.registerModule('tags.site.controllers');
}(ApplicationConfiguration));
