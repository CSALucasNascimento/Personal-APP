'use strict';

/**
 * Module dependencies
 */
var _ = require('lodash'),
  path = require('path'),
  mongoose = require('mongoose'),
  util = require('util'),
  Listing = mongoose.model('Listing'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  config = require(path.resolve('./config/config'));

/**
 * Create an listing
 */
exports.create = function (req, res) {
  var listing = new Listing(req.body);
  listing.user = req.user;

  var geo = new Array();
  geo[0] = req.body.address.geo[0];
  geo[1] = req.body.address.geo[1];
  listing.address.geo = geo;

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
 * Show the current Listing
 */
exports.read = function(req, res) {
  // stats increase VIEWs per day
  req.listing.save();

  // convert mongoose document to JSON
  var listing = req.listing ? req.listing.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  listing.isCurrentUserOwner = req.user && listing.user && listing.user._id.toString() === req.user._id.toString();

  res.jsonp(listing);
};

/**
 * Update a Listing
 */
exports.update = function(req, res) {
  var listing = req.listing;

  listing = _.extend(listing, req.body);

  listing.save(req, function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(listing);
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
    .populate({
      path: 'user',
      select: 'displayName'
    })
    .populate({
      path: 'category',
      select: 'name'
    })
    .populate({
      path: 'images',
      select: 'thumbnail'
    })
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
 * List of Draft Listings
 */
exports.draft = function (req, res) {
  Listing.find({ status: { $ne: 'deleted' } })
    .where('status').equals('draft')
    .populate({
      path: 'user',
      select: 'displayName'
    })
    .populate({
      path: 'category',
      select: 'name'
    })
    .populate({
      path: 'images',
      select: 'thumbnail'
    })
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
 * List of Pending Listings
 */
exports.pending = function (req, res) {
  Listing.find({ status: { $ne: 'deleted' } })
    .where('status').equals('pending approval')
    .populate({
      path: 'user',
      select: 'displayName'
    })
    .populate({
      path: 'category',
      select: 'name'
    })
    .populate({
      path: 'images',
      select: 'thumbnail'
    })
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
 * List of Featured Listings
 */
exports.featured = function (req, res) {
  Listing.find({ status: { $ne: 'deleted' } })
    .where('featured').equals(true)
    .populate({
      path: 'user',
      select: 'displayName'
    })
    .populate({
      path: 'category',
      select: 'name'
    })
    .populate({
      path: 'images',
      select: 'thumbnail medium'
    })
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

exports.listingByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Listing is invalid'
    });
  }

  Listing.findById(id)
    .populate({
      path: 'user',
      select: 'displayName'
    })
    .populate({
      path: 'images',
      select: 'thumbnail double_extra_small extra_small small medium large'
    })
    .exec(function (err, listing) {
      if (err) {
        return next(err);
      } else if (!listing) {
        return res.status(404).send({
          message: 'No Listing with that identifier has been found'
        });
      }

      listing.address.geo.lat = listing.address.geo[0];
      listing.address.geo.lng = listing.address.geo[1];
      req.listing = listing;
      req.oldListing = JSON.parse(JSON.stringify(listing));
      next();
    });
};
