'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Category Schema
 */
var CategorySchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Category name',
    trim: true
  },
  slug: {
    type: String,
    default: '',
    required: 'Please fill Category slug',
    trim: true
  },
  parentCategory: {
    type: Schema.ObjectId,
    ref: 'Category'
  },
  description: {
    type: String
  },
  image: {
    type: Schema.ObjectId,
    ref: 'Media'
  },
  icon: {
    type: Schema.ObjectId,
    ref: 'Media'
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

CategorySchema.index({
  name: 'text',
  slug: 'text',
  description: 'text'
});

mongoose.model('Category', CategorySchema);
