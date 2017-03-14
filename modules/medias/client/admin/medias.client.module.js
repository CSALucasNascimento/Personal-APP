(function (app) {
  'use strict';
  app.registerModule('medias.admin.services');
  app.registerModule('medias.admin.config');
  app.registerModule('medias.admin.config.routes', ['medias.admin.services']);
  app.registerModule('medias.admin.controllers');
}(ApplicationConfiguration));
