'use strict';

/**
 * Module dependencies
 */
var listingsPolicy = require('../policies/listings.server.policy'),
  listings = require('../controllers/listings.server.controller');

module.exports = function (app) {
  // Listings collection routes
  app.route('/api/listings').all(listingsPolicy.isAllowed)
    .get(listings.list)
    .post(listings.create);

  // Listings DRAFT collection routes
  app.route('/api/listings/draft').all(listingsPolicy.isAllowed)
    .get(listings.draft);

  // Listings PENDING collection routes
  app.route('/api/listings/pending').all(listingsPolicy.isAllowed)
    .get(listings.pending);

  // Listings PENDING collection routes
  app.route('/api/listings/ordination').all(listingsPolicy.isAllowed)
    .get(listings.ordination);

  // Single listing routes
  app.route('/api/listings/:listingId').all(listingsPolicy.isAllowed)
    .get(listings.read)
    .put(listings.update)
    .delete(listings.delete);

  app.route('/api/listings/favorites').all(listingsPolicy.isAllowed)
    .get(listings.listFavorites);

  app.route('/api/listings/similar/:listingId').all(listingsPolicy.isAllowed)
    .get(listings.listSimilar);

  app.route('/api/listings/saveFavorite/:listingId')
    .put(listings.saveFavorite);

  app.route('/api/listings/unsaveFavorite/:listingId')
    .put(listings.unsaveFavorite);

  /**
   * ADVANCED SEARCH
   */
  app.route('/api/listings/advancedSearch/:qLocation/location/:qCategory/category').all(listingsPolicy.isAllowed)
    .get(listings.advancedSearch);
  app.route('/api/listings/advancedSearch/location/:qCategory/category').all(listingsPolicy.isAllowed)
    .get(listings.advancedSearchCategory);
  app.route('/api/listings/advancedSearch/:qLocation/location/category').all(listingsPolicy.isAllowed)
    .get(listings.advancedSearchLocation);
  app.route('/api/listings/advancedSearch/location/category').all(listingsPolicy.isAllowed)
    .get(listings.searchAll);


  // Finish by binding the listing middleware
  app.param('listingId', listings.listingByID);
};
