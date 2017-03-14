'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Amenity = mongoose.model('Amenity'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Amenity
 */
exports.create = function(req, res) {
  var amenity = new Amenity(req.body);
  amenity.user = req.user;

  amenity.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(amenity);
    }
  });
};

/**
 * Show the current Amenity
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var amenity = req.amenity ? req.amenity.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  amenity.isCurrentUserOwner = req.user && amenity.user && amenity.user._id.toString() === req.user._id.toString();

  res.jsonp(amenity);
};

/**
 * Update a Amenity
 */
exports.update = function(req, res) {
  var amenity = req.amenity;

  amenity = _.extend(amenity, req.body);

  amenity.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(amenity);
    }
  });
};

/**
 * Delete an Amenity
 */
exports.delete = function(req, res) {
  var amenity = req.amenity;

  amenity.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(amenity);
    }
  });
};

/**
 * List of Amenities
 */
exports.list = function(req, res) {
  Amenity.find().sort('-created')
    .populate('user', 'displayName')
    .populate('icon', 'url')
    .exec(function(err, amenities) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.jsonp(amenities);
      }
    });
};

/**
 * Amenity middleware
 */
exports.amenityByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Amenity is invalid'
    });
  }

  Amenity.findById(id)
    .populate('user', 'displayName')
    .populate('icon', 'url')
    .exec(function (err, amenity) {
      if (err) {
        return next(err);
      } else if (!amenity) {
        return res.status(404).send({
          message: 'No Amenity with that identifier has been found'
        });
      }
      req.amenity = amenity;
      next();
    });
};
