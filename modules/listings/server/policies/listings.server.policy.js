'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Listings Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/listings/:status',
      permissions: '*'
    }, {
      resources: '/api/listings/ordination',
      permissions: '*'
    }, {
      resources: '/api/listings/draft',
      permissions: '*'
    }, {
      resources: '/api/listings/pending',
      permissions: '*'
    }, {
      resources: '/api/listings/:listingId',
      permissions: '*'
    }, {
      resources: '/api/listings/advancedSearch/:qLocation/location/:qCategory/category',
      permissions: '*'
    }, {
      resources: '/api/listings/advancedSearch/location/:qCategory/category',
      permissions: '*'
    }, {
      resources: '/api/listings/advancedSearch/:qLocation/location/category',
      permissions: '*'
    }, {
      resources: '/api/listings/advancedSearch/location/category',
      permissions: '*'
    }, {
      resources: '/api/listings/similar/:listingId',
      permissions: '*'
    }, {
      resources: '/api/listings/owned',
      permissions: '*'
    }, {
      resources: '/api/listings/favorites',
      permissions: '*'
    }, {
      resources: '/api/listings/favoritesByUser',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/listings',
      permissions: ['get', 'post']
    }, {
      resources: '/api/listings/ordination',
      permissions: ['get']
    }, {
      resources: '/api/listings/draft',
      permissions: ['get']
    }, {
      resources: '/api/listings/pending',
      permissions: ['get']
    }, {
      resources: '/api/listings/:listingId',
      permissions: ['get', 'post']
    }, {
      resources: '/api/listings/advancedSearch/:qLocation/location/:qCategory/category',
      permissions: ['get']
    }, {
      resources: '/api/listings/advancedSearch/location/:qCategory/category',
      permissions: ['get']
    }, {
      resources: '/api/listings/advancedSearch/:qLocation/location/category',
      permissions: ['get']
    }, {
      resources: '/api/listings/advancedSearch/location/category',
      permissions: ['get']
    }, {
      resources: '/api/listings/similar/:listingId',
      permissions: ['get']
    }, {
      resources: '/api/listings/owned',
      permissions: ['get']
    }, {
      resources: '/api/listings/favorites',
      permissions: ['get', 'post']
    }, {
      resources: '/api/listings/favoritesByUser',
      permissions: ['get', 'post']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/listings',
      permissions: ['get']
    }, {
      resources: '/api/listings/ordination',
      permissions: ['get']
    }, {
      resources: '/api/listings/draft',
      permissions: ['get']
    }, {
      resources: '/api/listings/pending',
      permissions: ['get']
    }, {
      resources: '/api/listings/:listingId',
      permissions: ['get']
    }, {
      resources: '/api/listings/advancedSearch/:qLocation/location/:qCategory/category',
      permissions: ['get']
    }, {
      resources: '/api/listings/advancedSearch/location/:qCategory/category',
      permissions: ['get']
    }, {
      resources: '/api/listings/advancedSearch/:qLocation/location/category',
      permissions: ['get']
    }, {
      resources: '/api/listings/advancedSearch/location/category',
      permissions: ['get']
    }, {
      resources: '/api/listings/similar/:listingId',
      permissions: ['get']
    }, {
      resources: '/api/listings/owned',
      permissions: ['get']
    }, {
      resources: '/api/listings/favorites',
      permissions: ['get']
    }, {
      resources: '/api/listings/favoritesByUser',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Listings Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an listing is being processed and the current user created it then allow any manipulation
  if (req.listing && req.user && req.listing.user && req.listing.user.id === req.user.id) {
    return next();
  }

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};
