'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  util = require('util'),
  Listing = mongoose.model('Listing'),
  util = require('util'),
  util = require('util'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');;

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
  var files = req.files;

  listing = _.extend(listing, req.body);
  
  var chunkNumber = listing['flowChunkNumber'];
  var chunkSize = listing['flowChunkSize'];
  var totalSize = listing['flowTotalSize'];
  var identifier = cleanIdentifier(listing['flowIdentifier']);
  var filename = listing['flowFilename'];

  if (!files[$.fileParameterName] || !files[$.fileParameterName].size) {
    callback('invalid_flow_request', null, null, null);
    return;
  }

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

exports.listingByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Listing is invalid'
    });
  }

  Listing.findById(id)
    .populate({
      path: 'user',
      populate: { path: 'profileImage', select: 'url' },
      select: 'displayName email profileImageURL profileImage'
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

function cleanIdentifier(identifier) {
  return identifier.replace(/[^0-9A-Za-z_-]/g, '');
}
