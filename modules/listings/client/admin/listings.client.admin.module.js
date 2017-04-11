(function (app) {
  'use strict';
  app.registerModule('listings.admin.services', ['categories.admin.services']);
  app.registerModule('listings.draft.admin.services', ['categories.admin.services']);
  app.registerModule('listings.pending.admin.services', ['categories.admin.services']);
  app.registerModule('listings.ordination.admin.services', ['categories.admin.services']);
  app.registerModule('listings.admin.config');
  app.registerModule('listings.admin.config.routes', ['core.admin.config.routes', 'listings.admin.services']);
  app.registerModule('listings.admin.controllers', ['textAngular', 'datatables', 'wipImageZoom', 'vsGoogleAutocomplete', 'flow']);
}(ApplicationConfiguration));
