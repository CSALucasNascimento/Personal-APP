'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  moment = require('moment'),
  path = require('path'),
  Schema = mongoose.Schema;

/**
 * AvailabilitySchema Schema
 * Storing hours in minutes
 **/
var AvailabilitySchema = new Schema({
  mon: { open: { type: Number, default: 540 }, close: { type: Number, default: 1020 }, description: { type: String, default: 'Open' } },
  tue: { open: { type: Number, default: 540 }, close: { type: Number, default: 1020 }, description: { type: String, default: 'Open' } },
  wed: { open: { type: Number, default: 540 }, close: { type: Number, default: 1020 }, description: { type: String, default: 'Open' } },
  thu: { open: { type: Number, default: 540 }, close: { type: Number, default: 1020 }, description: { type: String, default: 'Open' } },
  fri: { open: { type: Number, default: 540 }, close: { type: Number, default: 1020 }, description: { type: String, default: 'Open' } },
  sat: { open: { type: Number, default: 0 }, close: { type: Number, default: 0 }, description: { type: String, default: 'Close' } },
  sun: { open: { type: Number, default: 0 }, close: { type: Number, default: 0 }, description: { type: String, default: 'Close' } }
});

/**
 * ExceptionSchema Schema
 * Storing hours in minutes
 **/
var ExceptionSchema = new Schema({
  to: { type: Date },
  from: { type: Date },
  open: { type: Number, default: 0 },
  close: { type: Number, default: 0 },
  description: { type: String, default: 'Close' }
});

/**
 * Listing Schema
 */
var ListingSchema = new Schema({
  images: [{
    type: Schema.ObjectId,
    ref: 'Media'
  }],
  category: {
    type: Schema.ObjectId,
    ref: 'Category'
  },
  title: {
    type: String,
    default: '',
    required: 'Please fill Listing title',
    trim: true
  },
  fulladdress: {
    type: String,
    default: '',
    trim: true
  },
  address: {
    unit: {
      type: String,
      trim: true
    },
    streetNumber: {
      type: String,
      default: '',
      required: 'Please fill address street number',
      trim: true
    },
    streetName: {
      type: String,
      default: '',
      required: 'Please fill address street name',
      trim: true
    },
    suburb: {
      type: String,
      default: '',
      required: 'Please fill address suburb',
      trim: true
    },
    state: {
      type: String,
      default: '',
      // required: 'Please fill address state',
      trim: true
    },
    postCode: {
      type: Number,
      required: 'Please fill address post code'
    },
    geo: {
      type: [Number],  // [<latitude>, <longitude>]
      index: '2d'      // create the geospatial index
    }
  },
  price: {
    method: {
      type: String,
      enum: ['hourly', 'daily', 'monthly']
    },
    details: {}
  },
  poa: {
    type: Boolean,
    default: false
  },
  bookingSystem: {
    type: Boolean,
    default: false
  },
  availability: {
    type: AvailabilitySchema
  },
  exception: {
    type: [ExceptionSchema]
  },
  description: {
    type: String,
    default: '',
    required: 'Please fill Listing description',
    trim: true
  },
  amenity: [{
    type: Schema.ObjectId,
    ref: 'Amenity'
  }],
  parking: {
    type: Number,
    default: 0,
    required: 'Please fill the number of Parking Spaces'
  },
  capacity: {
    type: Number,
    default: 1,
    required: 'Please fill the number of Desks'
  },
  boardroom: {
    type: Number,
    default: 0,
    required: 'Please fill the number of Board Rooms'
  },
  ordination: {
    type: Number,
    default: 100
  },
  stats: {
    clicks: {
      type: Number,
      default: 0
    },
    datePublished: {
      type: Date,
      default: Date.now
    },
    impressionsPerDay: [{
      date: {
        type: Date,
        default: Date.now
      },
      impressions: {
        type: Number,
        default: 0
      }
    }],
    viewsPerDay: [{
      date: {
        type: Date,
        default: Date.now
      },
      views: {
        type: Number,
        default: 0
      }
    }]
  },
  reports: {
    notCM: {
      type: Number,
      default: 0
    },
    content: {
      type: Number,
      default: 0
    },
    photo: {
      type: Number,
      default: 0
    }
  },
  status: {
    type: String,
    enum: {
      values: 'draft, pending approval, pending payment, active, expired, deleted'.split(', '),
      message: 'Invalid Status'   // if you need to change values here, remember to change on listings-admin.client.controller.js too
    },
    default: 'pending approval'
  },
  listUserLikes: [{
    type: Schema.ObjectId,
    ref: 'User'
  }],
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
}, { versionKey: false });

ListingSchema.index({ title: 1, category: 1, price: 1, status: 1 });

mongoose.model('Listing', ListingSchema);
