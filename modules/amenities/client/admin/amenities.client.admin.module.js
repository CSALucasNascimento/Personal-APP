(function (app) {
  'use strict';
  app.registerModule('amenities.admin.services');
  app.registerModule('amenities.admin.config');
  app.registerModule('amenities.admin.config.routes', ['core.admin.config.routes', 'amenities.admin.services']);
  app.registerModule('amenities.admin.controllers', ['datatables']);
}(ApplicationConfiguration));
