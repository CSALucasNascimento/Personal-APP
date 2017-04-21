'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  emails = require(path.resolve('./modules/emails/server/controllers/emails.server.controller'));

/**
 * Verify email address
 */
exports.verify = function (req, res) {

  User.findOne({
    emailHash: req.params.randomId
  }, function (err, ruser) {
    if (!err) {
      if (!ruser) {
        return res.json({});
      } else {
        ruser.verified = true;
        ruser.save();
        // send welcome email
        emails.sendUserWelcome(req, ruser);
        return res.json(ruser);
      }
    } else {
      return res.json({});
    }
  });
};

/**
 * Resend email verification
 */
exports.resend = function (req, res) {
  var user = req.user;
  if (user.emailHash === undefined) {
    user.emailHash = ((Math.random() * 1000) + 54).toString(36);
    user.save();
  }
  user.verificationlink = 'http://' + req.get('host') + '/verify/' + user.emailHash + '/user/' + user._id;
  // send notification and verification email
  emails.sendUserNew(req, user);
  return res.status(200).send({ message: 'Verification email has been sent to ' + user.email + '.' });

};
