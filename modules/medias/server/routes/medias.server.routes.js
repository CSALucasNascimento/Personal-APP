'use strict';

/**
 * Module dependencies
 */
var mediasPolicy = require('../policies/medias.server.policy.js'),
  medias = require('../controllers/medias.server.controller.js');

module.exports = function (app) {
  // Medias collection routes
  app.route('/api/medias').all(mediasPolicy.isAllowed)
    .get(medias.list)
    .post(medias.create);

  // Single media routes
  app.route('/api/medias/:mediaId').all(mediasPolicy.isAllowed)
    .get(medias.read)
    .put(medias.update)
    .delete(medias.delete);

  // Finish by binding the media middleware
  app.param('mediaId', medias.mediaByID);
};
