(function (app) {
  'use strict';
  app.registerModule('listings.admin.services', ['categories.admin.services']);
  app.registerModule('listings.admin.config');
  app.registerModule('listings.admin.config.routes', ['core.admin.config.routes', 'listings.admin.services']);
  app.registerModule('listings.admin.controllers', ['textAngular', 'datatables', 'ngFileUpload', 'vsGoogleAutocomplete']);
}(ApplicationConfiguration));
