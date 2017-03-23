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

  var geo = new Array();
  geo[0] = req.body.address.geo[0];
  geo[1] = req.body.address.geo[1];
  listing.address.geo = geo;

  uploadMedia(req, listing);
  
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

  uploadMedia(req, listing);
  
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
function uploadMedia(listing) {

  var imageDestination = config.uploads.listing.image.original;
  
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, imageDestination);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + '_' + Date.now());
    }
  });

  var upload = multer({ storage: storage });
  var imageUploadFileFilter = require(path.resolve('./config/lib/multer')).imageFileFilter;

  // Filtering to upload only images
  upload.fileFilter = imageUploadFileFilter;

  if (listing) {
    uploadImage()
      // .then(resizeImage)
      .then(updateMedia)
      .then(function () {
        res.json(media);
      })
      .catch(function (err) {
        res.status(400).send(err);
      });
  } else {
    res.status(400).send({
      message: 'Media is not exist'
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

  function slugify(text) {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');            // Trim - from end of text
  }

  function resizeImage () {
    return new Promise(function (resolve, reject) {
      media.originalUrl = imageDestination + req.file.filename;

      var filetype = 'png';

      var mmm = require('mmmagic'),
        Magic = mmm.Magic;

      var magic = new Magic(mmm.MAGIC_MIME_TYPE);
      magic.detectFile(media.originalUrl, function(err, result) {
        if (err) {
          reject(err);
        } else {
          if (result === 'image/jpeg') {
            filetype = 'jpg';
          } else if (result === 'image/png') {
            filetype = 'png';
          } else if (result === 'image/gif') {
            filetype = 'gif';
          }

          // obtain an image object:
          lwip.open(media.originalUrl, filetype, function(err, image) {
            var originalSize = {};
            originalSize.width = image.width();
            originalSize.height = image.height();

            var newSize = {};
            newSize.width = originalSize.width * 420 / originalSize.height;   // calculating aspect ratio (automatic width based on height)
            newSize.height = 420;

            // console.log(image);
            if (err) {
              reject(err);
            } else {
              image.resize(newSize.width, newSize.height, function(err, image) {
                if (err) {
                  reject(err);
                } else {
                  image.writeFile(imageDestination + req.file.filename, filetype, {
                    quality: 100
                  }, function (err) {
                    if (err) {
                      reject(err);
                    } else {
                      resolve();
                    }
                  });
                }
              });
            }
          });
        }
      });
    });
  }

  function updateMedia () {
    return new Promise(function () {
      listing.image.thumb.url = imageDestination + req.file.filename;
      listing.image.url = imageDestination + req.file.filename;
    });
  }
  
}
