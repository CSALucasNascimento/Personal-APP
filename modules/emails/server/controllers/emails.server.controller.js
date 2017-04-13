'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
  path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  mongoose = require('mongoose'),
  config = require(path.resolve('./config/config')),
  nodemailer = require('nodemailer'),
  async = require('async'),
  sesTransport = require('nodemailer-ses-transport'),
  EmailTemplates = require('swig-email-templates'),
  inlineBase64 = require('nodemailer-plugin-inline-base64');


var transporter = nodemailer.createTransport(sesTransport(config.mailer.sesOptions));
transporter.use('compile', inlineBase64);

var emailTo = config.mailer.defaultContact;

// create template renderer
var templates = new EmailTemplates({
  root: './modules/emails/server/views/templates'
});

/**
* Enquiry send email
*/
exports.sendEnquiry = function(req, res) {
  var contact = req.contact ? req.contact.toJSON() : {};

  emailTo = config.mailer.defaultContact;
  // check user email
  if (req.listing.user.email) {
    emailTo = req.listing.user.email;
    contact.listing = req.listing;
  }

  if (config.mailer.enableTestEmails) {
    contact.emailto = emailTo;
    emailTo = config.mailer.defaultContact;
  }

  var featuredimagearray = contact.listing.featuredImage.url.split('/');
  contact.featuredcidimage = featuredimagearray[featuredimagearray.length - 1];

  var httpTransport = 'http://';
  if (config.secure && config.secure.ssl === true) {
    httpTransport = 'https://';
  }
  var baseUrl = req.app.get('domain') || httpTransport + req.headers.host;
  contact.spacelink = baseUrl + '/listings/' + req.listing._id;

  templates.render('enquiry.html', contact, function(err, html, text, subject) {
  // templates.render('enquiry_message.html', contact, function(err, html, text, subject) {

    // Send email
    transporter.sendMail({
      from: config.mailer.from,
      to: emailTo,
      bcc: config.mailer.bcc,
      subject: 'New enquiry from your listing on Spacenow',
      html: html,
      text: text
      // ,
      // attachments: allimages
    });

    return res.status(200).send({
      success: 'Email sent sucessfully',
      contact: contact
    });

  });

  // res.jsonp(contact);
};


exports.sendFavorite = function(req, res) {

  // YOUR CODE HERE

};

/**
* MESSAGE sent email
*/
exports.sendMessage = function(message, req) {

  emailTo = config.mailer.defaultContact;
  // check user email
  if (message.listing.user.email) {
    emailTo = message.listing.user.email;
    // message.listing = req.listing;
  }

  if (config.mailer.enableTestEmails) {
    message.emailto = emailTo;
    emailTo = config.mailer.defaultContact;
  }

  var featuredimagearray = message.listing.featuredImage.url.split('/');
  message.featuredcidimage = featuredimagearray[featuredimagearray.length - 1];

  var httpTransport = 'http://';
  if (config.secure && config.secure.ssl === true) {
    httpTransport = 'https://';
  }
  var baseUrl = req.app.get('domain') || httpTransport + req.headers.host;
  message.spacelink = baseUrl + '/listings/' + message.listing._id;

  if (req.body.newEnquiry) {
    console.log('Send Enquiry');

    templates.render('enquiry.html', message, function(err, html, text, subject) {

      // Send email
      transporter.sendMail({
        from: config.mailer.from,
        to: emailTo,
        bcc: config.mailer.bcc,
        subject: 'New enquiry from your listing on Spacenow',
        html: html,
        text: text
      });
      return true;
    });

  } else {      // it is a message
    console.log('Send Message');

    templates.render('message.html', message, function(err, html, text, subject) {

      // Send email
      transporter.sendMail({
        from: config.mailer.from,
        to: emailTo,
        bcc: config.mailer.bcc,
        subject: 'Hey you\'ve got a new message',
        html: html,
        text: text
      });
      return true;
    });
  }

};


/**
* Listing Approved email
*/
exports.sendListingActive = function(req, listing) {
  // var listing = req.listing ? req.listing.toJSON() : {};

  emailTo = config.mailer.defaultContact;
  if (listing.user.email) {
    emailTo = listing.user.email;
  }

  if (config.mailer.enableTestEmails) {
    listing.emailto = emailTo;
    emailTo = config.mailer.defaultContact;
  }

  var featuredimagearray = listing.featuredImage.url.split('/');
  listing.featuredcidimage = featuredimagearray[featuredimagearray.length - 1];

  var httpTransport = 'http://';
  if (config.secure && config.secure.ssl === true) {
    httpTransport = 'https://';
  }
  var baseUrl = req.app.get('domain') || httpTransport + req.headers.host;
  listing.spacelink = baseUrl + '/listings/' + listing._id;
  listing.shortDescription = listing.description.substring(0, 150);
  templates.render('listingActive.html', listing, function(err, html, text, subject) {

    // Send email
    transporter.sendMail({
      from: config.mailer.from,
      to: emailTo,
      bcc: config.mailer.bcc,
      subject: 'SpaceNow: your space is now live.',
      html: html,
      text: text
    });

  });

};

/**
* Send listing to be approved
*/
exports.sendListingNew = function(req, listing) {
  // var listing = req.listing ? req.listing.toJSON() : {};

  emailTo = config.mailer.defaultContact;
  if (config.mailer.enableTestEmails) {
    listing.emailto = emailTo;
    emailTo = config.mailer.defaultContact;
  }

  if (!mongoose.Types.ObjectId.isValid(listing.featuredImage)) {
    return 'It\'s not a valid ID';
  }

  mongoose.model('Media').findById(listing.featuredImage).exec(function (err, media) {
    if (err) {
      return err;
    } else if (!media) {
      return 'It\'s something wrong with the server';
    }

    var featuredimagearray = media.url.split('/');
    listing.featuredcidimage = featuredimagearray[featuredimagearray.length - 1];    // 'co-working-space_south-yarra_img_uarw4tmo8kdvp27v68'
    var httpTransport = 'http://';
    if (config.secure && config.secure.ssl === true) {
      httpTransport = 'https://';
    }
    var baseUrl = req.app.get('domain') || httpTransport + req.headers.host;
    listing.spacelink = baseUrl + '/admin/listings/' + listing._id + '/edit';
    listing.shortDescription = listing.description.substring(0, 150);
    templates.render('listingToApprove.html', listing, function(err, html, text, subject) {
      // Send email
      transporter.sendMail({
        from: config.mailer.from,
        to: emailTo,
        bcc: config.mailer.bcc,
        subject: 'SpaceNow: New space waiting to be approved',
        html: html,
        text: text
      });
    });
  });

};

/**
* Send new user
*/
exports.sendUserNew = function(req, user) {

  // Email to SPACENOW Manager
  templates.render('userNewNotice.html', user, function(err, html, text, subject) {
    // Send email
    transporter.sendMail({
      from: config.mailer.from,
      to: config.mailer.defaultContact,
      bcc: config.mailer.bcc,
      subject: 'SpaceNow: New user signed up',
      html: html,
      text: text
    });
  });

  // Email to Verify user email address
  emailTo = config.mailer.defaultContact;
  if (user.email) {
    emailTo = user.email;
  }
  if (config.mailer.enableTestEmails) {
    user.emailto = emailTo;
    emailTo = config.mailer.defaultContact;
  }

  templates.render('userNewEmailVerification.html', user, function(err, html, text, subject) {
    // Send email
    transporter.sendMail({
      from: config.mailer.from,
      to: emailTo,
      bcc: config.mailer.bcc,
      subject: 'SpaceNow: Please confirm your email address',
      html: html,
      text: text
    });
  });

};

/**
* Send welcome message to verified new user
*/
exports.sendUserWelcome = function(req, user) {

  // Email to Verify user email address
  emailTo = config.mailer.defaultContact;
  if (user.email) {
    emailTo = user.email;
  }
  if (config.mailer.enableTestEmails) {
    user.emailto = emailTo;
    emailTo = config.mailer.defaultContact;
  }

  templates.render('userNewWelcome.html', user, function(err, html, text, subject) {
    // Send email
    transporter.sendMail({
      from: config.mailer.from,
      to: emailTo,
      bcc: config.mailer.bcc,
      subject: 'SpaceNow: Welcome to our community',
      html: html,
      text: text
    });
  });

};
/**
* Send Listing Report
*/
exports.sendReport = function(req, listing) {

  var featuredimagearray = listing.featuredImage.url.split('/');
  listing.featuredcidimage = featuredimagearray[featuredimagearray.length - 1];

  var httpTransport = 'http://';
  if (config.secure && config.secure.ssl === true) {
    httpTransport = 'https://';
  }
  var baseUrl = req.app.get('domain') || httpTransport + req.headers.host;
  listing.spacelink = baseUrl + '/listings/' + listing._id;
  listing.shortDescription = listing.description.substring(0, 150);

  // Email to SPACENOW Manager
  var emailTo = config.mailer.defaultContact;
  templates.render('listingReport.html', listing, function(err, html, text, subject) {
    // Send email
    transporter.sendMail({
      from: config.mailer.from,
      to: emailTo,
      bcc: config.mailer.bcc,
      subject: 'SpaceNow: Listing Reported',
      html: html,
      text: text
    });
  });

};

