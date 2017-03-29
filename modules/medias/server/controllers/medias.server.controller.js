'use strict';

/**
 * Module dependencies
 */
var _ = require('lodash'),
  path = require('path'),
  util = require('util'),
  mongoose = require('mongoose'),
  Media = mongoose.model('Media'),
  multer = require('multer'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  config = require(path.resolve('./config/config')),
  Jimp = require('jimp');

/**
 * Create an media
 */
exports.create = function (req, res) {

  var media = new Media(req.body);

  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, config.uploads.listing.image.full);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });

  var upload = multer({ storage: storage }).single('file');
  var imageUploadFileFilter = require(path.resolve('./config/lib/multer')).imageFileFilter;

  // Filtering to upload only images
  upload.fileFilter = imageUploadFileFilter;

  if (media) {
    uploadImage()
      .then(resizeImages)
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

  function resizeImages() {
    // Full Image
    var full = config.uploads.listing.image.full + req.file.filename;

    // Large Image
    Jimp.read(full, function (err, largeImage) {
      if (err) throw err;
      largeImage
        .cover(1200, 800, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE)
        .quality(100)
        .write(config.uploads.listing.image.large + req.file.filename);
    });

    // Medium Image
    Jimp.read(full, function (err, medium_Image) {
      if (err) throw err;
      medium_Image
        .cover(990, 660, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE)
        .quality(100)
        .write(config.uploads.listing.image.medium + req.file.filename);
    });

    // Small Image
    Jimp.read(full, function (err, small_Image) {
      if (err) throw err;
      small_Image
        .cover(768, 512, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE)
        .quality(100)
        .write(config.uploads.listing.image.small + req.file.filename);
    });

    // Extra Small Image
    Jimp.read(full, function (err, extra_small_Image) {
      if (err) throw err;
      extra_small_Image
        .cover(576, 384, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE)
        .quality(100)
        .write(config.uploads.listing.image.extra_small + req.file.filename);
    });

    // Double Extra Small Image
    Jimp.read(full, function (err, double_extra_small_Image) {
      if (err) throw err;
      double_extra_small_Image
        .cover(414, 276, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE)
        .quality(100)
        .write(config.uploads.listing.image.double_extra_small + req.file.filename);
    });

    // Thumbnail Image
    Jimp.read(full, function (err, thumbnail_Image) {
      if (err) throw err;
      thumbnail_Image
        .cover(200, 200, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE)
        .quality(100)
        .write(config.uploads.listing.image.thumbnail + req.file.filename);
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

  function updateMedia () {
    return new Promise(function (resolve, reject) {
      media.thumbnail = config.uploads.listing.image.thumbnail + req.file.filename;
      media.medium = config.uploads.listing.image.medium + req.file.filename;
      media.extra_small = config.uploads.listing.image.extra_small + req.file.filename;
      media.double_extra_small = config.uploads.listing.image.double_extra_small + req.file.filename;
      media.small = config.uploads.listing.image.small + req.file.filename;
      media.large = config.uploads.listing.image.large + req.file.filename;
      media.full = config.uploads.listing.image.full + req.file.filename;
      media.save(function (err, themedia) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

};

/**
 * Show the current media
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var media = req.media ? req.media.toJSON() : {};

  // Add a custom field to the Media, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Media model.
  media.isCurrentUserOwner = !!(req.user && media.user && media.user._id.toString() === req.user._id.toString());

  res.json(media);
};

/**
 * Update an media
 */
exports.update = function (req, res) {
  var media = req.media;

  media.title = req.body.title;
  media.content = req.body.content;

  media.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(media);
    }
  });
};

/**
 * Delete an media
 */
exports.delete = function (req, res) {
  var media = req.media;

  media.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(media);
    }
  });
};

/**
 * List of Medias
 */
exports.list = function (req, res) {
  Media.find().sort('-created').populate('user', 'displayName').exec(function (err, medias) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(medias);
    }
  });
};

/**
 * Media middleware
 */
exports.mediaByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Media is invalid'
    });
  }

  Media.findById(id).populate('user', 'displayName').exec(function (err, media) {
    if (err) {
      return next(err);
    } else if (!media) {
      return res.status(404).send({
        message: 'No media with that identifier has been found'
      });
    }
    req.media = media;
    next();
  });
};
