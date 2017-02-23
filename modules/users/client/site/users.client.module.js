(function (app) {
  'use strict';

  app.registerModule('users.site.config', ['ui.router', 'core.site.config']);
  app.registerModule('users.site.services');
}(ApplicationConfiguration));
