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
  title: {
    type: String,
    default: '',
    trim: true,
    required: 'Title cannot be blank'
  },
  tags: {
    type: [{}],
    trim: true
  },
  content: {
    type: String,
    default: '',
    trim: true
  },
  featuredImage: {
    type: String,
    default: '',
    trim: true
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
