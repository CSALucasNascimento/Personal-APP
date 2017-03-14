'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Amenity Schema
 */
var AmenitySchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Amenity name',
    trim: true
  },
  slug: {
    type: String,
    default: '',
    trim: true
  },
  icon: {
    // type: Schema.ObjectId,
    // ref: 'Media'
    type: String,
    default: '',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

AmenitySchema.index({
  name: 'text',
  slug: 'text'
});

mongoose.model('Amenity', AmenitySchema);
