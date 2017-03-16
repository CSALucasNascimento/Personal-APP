'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  moment = require('moment'),
  path = require('path'),
  Schema = mongoose.Schema;

/**
 * Listing Schema
 */
var ListingSchema = new Schema({
  category: [{
    type: Schema.ObjectId,
    ref: 'Category'
  }],
  title: {
    type: String,
    default: '',
    required: 'Please fill Listing title',
    trim: true
  },
  subtitle: {
    type: String,
    default: '',
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
    type: Number,
    required: 'Please fill Listing price'
  },
  leasePeriodMin: {
    type: String,
    default: '1 Hour'
  },
  leasePeriodMax: {
    type: String,
    default: '12 Months'
  },
  period: {
    type: String,
    enum: {
      values: 'hour day week fortnight month'.split(' '),
      message: 'Choose how frequently the payment will be. It will be per: hour, day, week, fortnight or month?'
    },
    default: 'week'
    // required: 'Please fill Listing period'
  },
  space: {
    type: Number // ,
    // required: 'Please fill Listing space'
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
  desks: {
    type: Number,
    default: 0,
    required: 'Please fill the number of Desks'
  },
  boardrooms: {
    type: Number,
    default: 0,
    required: 'Please fill the number of Board Rooms'
  },
  availability: {
    type: Date,
    default: Date.now
  },
  featured: {
    type: Boolean,
    default: false
  },
  featuredImage: {
    type: Schema.ObjectId,
    ref: 'Media'
  },
  images: [{
    type: String,
    default: '',
    trim: true
  }],
  galleryImage: [{
    type: Schema.ObjectId,
    ref: 'Media'
  }],
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
    shouldntBe: {
      type: Number,
      default: 0
    },
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
  nearbyRecommendations: {
    busStop: {
      type: String,
      trim: true
    },
    trainStation: {
      type: String,
      trim: true
    },
    coffee: {
      type: String,
      trim: true
    },
    lunchSpot: {
      type: String,
      trim: true
    },
    meetClients: {
      type: String,
      trim: true
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
