(function (app) {
  'use strict';
  app.registerModule('tags.admin.services');
  app.registerModule('tags.admin.config');
  app.registerModule('tags.admin.config.routes', ['core.admin.config.routes', 'tags.admin.services']);
  app.registerModule('tags.admin.controllers');
}(ApplicationConfiguration));
