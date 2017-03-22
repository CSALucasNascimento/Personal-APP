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
  multer = require('multer'),
  config = require(path.resolve('./config/config'));

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

/**
 * Update listing picture
 */
exports.uploadImage = function (listing) {
  var existingImageUrl;

  // Filtering to upload only images
  var multerConfig = config.uploads.listing.image;
  multerConfig.fileFilter = require(path.resolve('./config/lib/multer')).imageFileFilter;
  var upload = multer(multerConfig).single('newProfilePicture');

  if (user) {
    existingImageUrl = user.profileImageURL;
    uploadImage()
      .then(updateUser)
      .then(deleteOldImage)
      .then(function () {
        res.json(user);
      })
      .catch(function (err) {
        res.status(422).send(err);
      });
  } else {
    res.status(401).send({
      message: 'User is not signed in'
    });
  }

  function uploadImage () {
    return new Promise(function (resolve, reject) {
      upload(req, res, function (uploadError) {
        if (uploadError) {
          reject(errorHandler.getErrorMessage(uploadError));
        } else {
          resolve();
        }
      });
    });
  }

  function updateUser () {
    return new Promise(function (resolve, reject) {
      user.profileImageURL = config.uploads.profile.image.dest + req.file.filename;
      user.save(function (err, theuser) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  function deleteOldImage () {
    return new Promise(function (resolve, reject) {
      if (existingImageUrl !== User.schema.path('profileImageURL').defaultValue) {
        fs.unlink(existingImageUrl, function (unlinkError) {
          if (unlinkError) {
            console.log(unlinkError);
            reject({
              message: 'Error occurred while deleting old profile picture'
            });
          } else {
            resolve();
          }
        });
      } else {
        resolve();
      }
    });
  }

};
