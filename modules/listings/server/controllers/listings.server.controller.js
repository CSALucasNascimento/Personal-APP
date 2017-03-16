'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Listing = mongoose.model('Listing'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an listing
 */
exports.create = function (req, res) {
  var listing = new Listing(req.body);
  listing.user = req.user;

  listing.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(listing);
    }
  });
};

/**
 * Show the current listing
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var listing = req.listing ? req.listing.toJSON() : {};

  // Add a custom field to the Listing, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Listing model.
  listing.isCurrentUserOwner = !!(req.user && listing.user && listing.user._id.toString() === req.user._id.toString());

  res.json(listing);
};

/**
 * Update an listing
 */
exports.update = function (req, res) {
  var listing = req.listing;

  listing.title = req.body.title;
  listing.content = req.body.content;

  listing.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(listing);
    }
  });
};

/**
 * Delete an listing
 */
exports.delete = function (req, res) {
  var listing = req.listing;

  listing.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(listing);
    }
  });
};

/**
 * List of Listings
 */
exports.list = function (req, res) {
  Listing.find({ status: { $ne: 'deleted' } })
    .populate('user', 'displayName')
    .exec(function (err, listings) {
      if (err) {
        return res.status(422).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.json(listings);
      }
    });
};

/**
 * Listing middleware
 */
exports.listingByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Listing is invalid'
    });
  }

  Listing.findById(id)
    .populate('user', 'displayName')
    .exec(function (err, listing) {
      if (err) {
        return next(err);
      } else if (!listing) {
        return res.status(404).send({
          message: 'No listing with that identifier has been found'
        });
      }
      req.listing = listing;
      next();
    });
};
