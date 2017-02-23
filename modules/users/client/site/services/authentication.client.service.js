(function () {
  'use strict';

  // Authentication service for user variables

  angular
    .module('users.site.services')
    .factory('Authentication', Authentication);

  Authentication.$inject = ['$window'];

  function Authentication($window) {
    var auth = {
      user: $window.user
    };

    return auth;
  }
}());
