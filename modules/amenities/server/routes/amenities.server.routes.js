'use strict';

/**
 * Module dependencies
 */
var amenitiesPolicy = require('../policies/amenities.server.policy'),
  amenities = require('../controllers/amenities.server.controller');

module.exports = function(app) {
  // Amenities Routes
  app.route('/api/amenities').all(amenitiesPolicy.isAllowed)
    .get(amenities.list)
    .post(amenities.create);

  app.route('/api/amenities/:amenityId').all(amenitiesPolicy.isAllowed)
    .get(amenities.read)
    .put(amenities.update)
    .delete(amenities.delete);

  // Finish by binding the Amenity middleware
  app.param('amenityId', amenities.amenityByID);
};
