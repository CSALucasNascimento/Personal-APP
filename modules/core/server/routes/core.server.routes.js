'use strict';

module.exports = function (app) {
  // Root routing
  var core = require('../controllers/core.server.controller.js');

  // Define error pages
  app.route('/server-error').get(core.renderServerError);

  // Return a 404 for all undefined api, module or lib routes
  app.route('/:url(api|modules|lib)/*').get(core.renderNotFound);

  // Define application route
  app.route('/admin').get(core.renderAdminIndex);
  app.route('/admin/*').get(core.renderAdminIndex);

  // Define application route
  // Define application route
  app.route('/').get(core.renderSiteIndex);
  app.route(/^((?!\/admin\/).)*$/).get(core.renderSiteIndex);
};
