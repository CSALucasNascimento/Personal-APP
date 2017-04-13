'use strict';

/**
 * Module dependencies
 */
var _ = require('lodash'),
  path = require('path'),
  mongoose = require('mongoose'),
  util = require('util'),
  Listing = mongoose.model('Listing'),
  Category = mongoose.model('Category'),
  // emails = require(path.resolve('./modules/emails/server/controllers/emails.server.controller')),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  http = require('http'),
  https = require('https'),
  async = require('async'),
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
      return res.status(422).send({
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
exports.ordination = function (req, res) {
  Listing.find({ status: { $ne: 'deleted' } })
    .where('ordination').equals(10)
    .populate({
      path: 'user',
      populate: { path: 'profileImage', select: 'url' },
      select: 'displayName email profileImageURL profileImage'
    })
    .populate({
      path: 'category',
      select: 'name'
    })
    .populate({
      path: 'images',
      select: 'thumbnail extra_small medium'
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
 * List of listings by Advanced search category and location
 */
exports.advancedSearch = function(req, res) {
  var qLocation = req.params.qLocation;
  var qCategory = req.params.qCategory;
  var categoryId;

  var getCategoryId = function(callback) {
    Category.find({ 'name': qCategory }).exec(function(err, categories) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        // findByCategoryId(categories);
        callback(null, categories);
      }
    });
  };

  var getGeoLocation = function(callback) {
    // get lat long for the location
    // https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY
    var mapsUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
    var addressUrl = '?address=' + qLocation;
    var keyUrl = '&key=AIzaSyAq_CqCdUptAgsfsQWFYcPEAV8MH0Fi81Y';
    var reqUrl = encodeURI(mapsUrl + addressUrl + keyUrl);
    https.get(reqUrl, function(res) {
      var body = '';

      res.on('data', function(chunk) {
        body += chunk;
      });

      res.on('end', function() {
        var mapsResponse = JSON.parse(body);
        console.log('\naddress: ' + reqUrl);
        var geo = new Array();
        geo[0] = mapsResponse.results[0].geometry.location.lat;
        geo[1] = mapsResponse.results[0].geometry.location.lng;
        // findByGeo(geo);
        var dist = distance(
          mapsResponse.results[0].geometry.bounds.northeast.lat,
          mapsResponse.results[0].geometry.bounds.northeast.lng,
          mapsResponse.results[0].geometry.bounds.southwest.lat,
          mapsResponse.results[0].geometry.bounds.southwest.lng);

        var ret = {};
        ret.geo = geo;
        ret.dist = dist / 2;

        // findByGeo(geo, dist / 2);
        callback(null, ret);

      });
    }).on('error', function(e) {
      console.log('Got an error: ', e);
    });
  };

  // Here the magician happen
  async.parallel([
    getGeoLocation,
    getCategoryId
  ], function(err, results) {
    findByCategoryAndLocation(results[0], results[1]);
  });

  function findByCategoryAndLocation(locat, categories) {

    var geo = locat.geo;
    categoryId = categories[0]._id;

    var maxDistance = locat.dist / 111;  // transformed to degrees   - 0.0015696123
    Listing.find({
      'address.geo': {
        $near: geo,
        $maxDistance: maxDistance
      },
      category: { $in: [categoryId] },
      status: 'active'
    }, { category: 1, title: 1, period: 1, price: 1, user: 1, address: 1, featuredImage: 1 })
      .sort({ featured: -1, created: -1 })
      .populate({
        path: 'category',
        select: 'name'
      })
      .populate({
        path: 'user',
        populate: { path: 'profileImage', select: 'url' },
        select: 'displayName email profileImageURL profileImage'
      })
      .exec(function(err, listings) {
        if (err) {
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        } else {
          res.jsonp(listings);
        }
      });

  }

};

exports.advancedSearchCategory = function(req, res) {

  var qCategory = req.params.qCategory;
  var origRes = res;
  var categoryId;

  var getCategoryId = function() {
    Category.find({ 'name': qCategory }).exec(function(err, categories) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        // findByCategoryId(categories);
        findByCategoryId(categories);
      }
    });
  };


  function findByCategoryId(categories) {
    categoryId = categories[0]._id;

    Listing.find({
      category: { $in: [categoryId] }
    })
      .where('status').equals('active')
      .sort({ featured: -1, created: -1 })
      .populate({
        path: 'category',
        select: 'name'
      })
      .populate({
        path: 'user',
        populate: { path: 'profileImage', select: 'url' },
        select: 'displayName email profileImageURL profileImage'
      })
      .exec(function(err, listings) {
        if (err) {
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        } else {
          origRes.jsonp(listings);
        }
      });
  }

  getCategoryId();

};

exports.advancedSearchLocation = function(req, res) {
  var qLocation = req.params.qLocation;
  var origRes = res;

  var getGeoLocation = function() {
    var mapsUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
    var addressUrl = '?address=' + qLocation;
    var keyUrl = '&key=AIzaSyAq_CqCdUptAgsfsQWFYcPEAV8MH0Fi81Y';
    var reqUrl = encodeURI(mapsUrl + addressUrl + keyUrl);
    https.get(reqUrl, function(res) {
      var body = '';

      res.on('data', function(chunk) {
        body += chunk;
      });

      res.on('end', function() {
        var mapsResponse = JSON.parse(body);
        console.log('\naddress: ' + reqUrl);
        var geo = new Array();
        geo[0] = mapsResponse.results[0].geometry.location.lat;
        geo[1] = mapsResponse.results[0].geometry.location.lng;

        var dist = distance(
          mapsResponse.results[0].geometry.bounds.northeast.lat,
          mapsResponse.results[0].geometry.bounds.northeast.lng,
          mapsResponse.results[0].geometry.bounds.southwest.lat,
          mapsResponse.results[0].geometry.bounds.southwest.lng);

        findByGeo(geo, dist / 2);

      });
    }).on('error', function(e) {
      console.log('Got an error: ', e);
    });
  };

  function findByGeo(geo, kmDistance) {

    var maxDistance = kmDistance / 111;  // kms transformed to degrees   - 0.0015696123
    Listing.find({
      'address.geo': {
        $near: geo,
        $maxDistance: maxDistance
      },
      status: 'active'
    })
      .where('status').equals('active')
      .sort({ featured: -1, created: -1 })
      .populate({
        path: 'category',
        select: 'name'
      })
      .populate({
        path: 'user',
        populate: { path: 'profileImage', select: 'url' },
        select: 'displayName email profileImageURL profileImage'
      })
      .exec(function(err, listings) {
        if (err) {
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        } else {
          // stats increase listing impression
          // for (var x = 0; x < listings.length; x ++) {
          //   listings[x].incImpressionsPerDay(new Date());
          //   listings[x].save();
          // }
          origRes.jsonp(listings);
        }
      });
  }

  getGeoLocation();
};

exports.searchAll = function(req, res) {
  Listing.find({ status: 'active' }).sort({ featured: -1, created: -1 })
    .populate({
      path: 'category',
      select: 'name'
    })
    .populate({
      path: 'images',
      select: 'thumbnail extra_small thumbnail'
    })
    .populate({
      path: 'user',
      populate: { path: 'profileImage', select: 'url' },
      select: 'displayName email profileImageURL profileImage'
    })
    .exec(function(err, listings) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.jsonp(listings);
      }
    });
};

/**
 * Save as a favorite
 */
exports.saveFavorite = function(req, res) {
  var listing = req.listing;
  var userId = mongoose.Types.ObjectId(req.user._id);
  var isUserExist = false;
  listing.listUserLikes.map(function(user) {
    if (user.id === userId.id)
      isUserExist = true;
    return user;
  });

  if (isUserExist) {
    return res.status(208).send({
      message: 'Already Favorited',
      isSave: true
    });
  } else {
    listing.listUserLikes.push(userId);
    listing.stats.clicks += 1;
    listing.save(req, function(err) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err),
          isSave: false
        });
      } else {
        return res.status(200).send({
          message: 'Listing is favorited',
          isSave: true
        });
      }
    });
  }

};

/**
 * Update favorite count
 */
exports.unsaveFavorite = function(req, res) {

  var listing = req.listing;
  var userId = mongoose.Types.ObjectId(req.user._id);
  var isUserExist = false;
  var i = 0;
  var userIndex = -1;
  listing.listUserLikes.map(function(user) {
    if (user.id === userId.id) {
      isUserExist = true;
      userIndex = i;
    }
    i++;
    return user;
  });

  if (isUserExist) {
    listing.listUserLikes.splice(userIndex, 1);
    listing.stats.clicks -= 1;
    listing.save(req, function(err) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err),
          isSave: true
        });
      } else {
        return res.status(200).send({
          message: 'Listing is removed from favorites',
          isSave: false
        });
      }
    });
  } else {
    return res.status(208).send({
      message: 'Already removed from favorites',
      isSave: false
    });
  }

};

/**
 * List of Favorites
 */
exports.listFavorites = function(req, res) {
  Listing.find({ 'stats.clicks': { $gt: 1 } })
    .sort('-created')
    .populate({
      path: 'category',
      select: 'name'
    })
    .populate('user', 'displayName')
    .exec(function(err, listings) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.jsonp(listings);
      }
    });
};

/**
 * Similar listings
 */
exports.listSimilar = function(req, res) {
  var categoryId = req.listing.category._id;
  var listingId = req.listing._id;
  var location = req.listing.address.geo;
  var maxDistance = 15 / 111.12;  // transformed to radians   - 0.0015696123
  Listing.find({
    'address.geo': {
      $near: location,
      $maxDistance: maxDistance
    },
    category: { $in: [categoryId] },
    status: 'active',
    '_id': { $ne: listingId }
  })
    .limit(3)
    .populate({
      path: 'category',
      select: 'name'
    })
    .populate({
      path: 'images',
      select: 'thumbnail extra_small thumbnail'
    })
    .populate({
      path: 'user',
      populate: { path: 'profileImage', select: 'url' },
      select: 'displayName email profileImageURL profileImage'
    })
    .exec(function(err, listings) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.jsonp(listings);
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
      path: 'category',
      select: 'name'
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
