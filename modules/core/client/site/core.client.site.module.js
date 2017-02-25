(function (app) {
  'use strict';
  app.registerModule('core.site.services');
  app.registerModule('core.site.services.interceptors');
  app.registerModule('core.site.config', ['core.site.services', 'core.site.services.interceptors']);
  app.registerModule('core.site.controllers');
  app.registerModule('core.site.directives');
}(ApplicationConfiguration));
