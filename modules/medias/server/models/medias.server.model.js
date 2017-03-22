'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Media Schema
 */
var MediaSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  url: {
    type: String
  },
  featuredImage: {
    type: Boolean,
    default: false
  },
  publish: {
    type: Boolean,
    default: false
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Media', MediaSchema);
