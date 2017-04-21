'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  emails = require(path.resolve('./modules/emails/server/controllers/emails.server.controller')),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Show the current user
 */
exports.read = function (req, res) {
  res.json(req.model);
};

/**
 * Update a User
 */
exports.update = function (req, res) {
  var user = req.model;

  var geo = new Array();
  geo[0] = req.body.address.geo[0];
  geo[1] = req.body.address.geo[1];
  user.address.geo = geo;

  // For security purposes only merge these parameters
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.displayName = user.firstName + ' ' + user.lastName;
  user.phone = req.body.phone;
  user.email = req.body.email;
  user.username = req.body.username;
  user.gender = req.body.gender;
  user.profileImage = req.body.profileImage;
  user.password = req.body.password;
  user.verified = req.body.verified;
  // Address
  user.address.unit = req.body.address.unit;
  user.address.streetNumber = req.body.address.streetNumber;
  user.address.streetName = req.body.address.streetName;
  user.address.suburb = req.body.address.suburb;
  user.address.state = req.body.address.state;
  user.address.postCode = req.body.address.postCode;
  user.fullAddress = req.body.fullAddress;
  user.dob = req.body.dob;
  user.about = req.body.about;

  if (!user.verified) {
    // user.emailHash = Math.floor((Math.random() * 100) + 54);
    user.emailHash = ((Math.random() * 1000) + 54).toString(36);
    user.verificationlink = 'http://' + req.get('host') + '/verify/' + user.emailHash + '/user/' + user._id;
    // send notification and verification email
    emails.sendUserNew(req, user);
  }

  user.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    user.password = undefined;
    res.json(user);
  });
};

/**
 * Update a User
 */
exports.updateAsAdmin = function (req, res) {
  var user = req.model;

  var geo = new Array();
  geo[0] = req.body.address.geo[0];
  geo[1] = req.body.address.geo[1];
  user.address.geo = geo;

  // For security purposes only merge these parameters
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.displayName = user.firstName + ' ' + user.lastName;
  user.phone = req.body.phone;
  user.email = req.body.email;
  user.username = req.body.username;
  user.gender = req.body.gender;
  user.profileImage = req.body.profileImage;
  user.password = req.body.password;
  user.roles = req.body.roles;
  // Address
  user.address.unit = req.body.address.unit;
  user.address.streetNumber = req.body.address.streetNumber;
  user.address.streetName = req.body.address.streetName;
  user.address.suburb = req.body.address.suburb;
  user.address.state = req.body.address.state;
  user.address.postCode = req.body.address.postCode;
  user.fullAddress = req.body.fullAddress;
  user.dob = req.body.dob;
  user.about = req.body.about;

  user.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    user.password = undefined;
    res.json(user);
  });
};

/**
 * Delete a user
 */
exports.delete = function (req, res) {
  var user = req.model;

  user.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(user);
  });
};

/**
 * List of Users
 */
exports.list = function (req, res) {
  User.find({}, '-salt -password -providerData').sort('-created').populate('profileImage', 'thumbnail').populate('user', 'displayName').exec(function (err, users) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(users);
  });
};

/**
 * User middleware
 */
exports.userByID = function (req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'User is invalid'
    });
  }

  User.findById(id, '-salt -password -providerData')
    .populate('profileImage', 'thumbnail')
    .exec(function (err, user) {
      if (err) {
        return next(err);
      } else if (!user) {
        return next(new Error('Failed to load user ' + id));
      }

      req.model = user;
      next();
    });
};
