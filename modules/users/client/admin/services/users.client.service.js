(function () {
  'use strict';

  // Users service used for communicating with the users REST endpoint
  angular
    .module('users.admin.services')
    .factory('UsersService', UsersService);

  UsersService.$inject = ['$resource'];

  function UsersService($resource) {
    var Users = $resource('/api/users', {}, {
      update: {
        method: 'PUT'
      },
      updatePassword: {
        method: 'POST',
        url: '/api/users/password'
      },
      deleteProvider: {
        method: 'DELETE',
        url: '/api/users/accounts',
        params: {
          provider: '@provider'
        }
      },
      sendPasswordResetToken: {
        method: 'POST',
        url: '/api/auth/forgot'
      },
      resetPasswordWithToken: {
        method: 'POST',
        url: '/api/auth/reset/:token'
      },
      signup: {
        method: 'POST',
        url: '/api/auth/signup'
      },
      signin: {
        method: 'POST',
        url: '/api/auth/signin'
      },
      adminUpdate: {
        method: 'PUT',
        url: '/api/adminUsers',
        params: {
          provider: '@userId'
        }
      }
    });

    angular.extend(Users, {
      adminUpdate: function (userId) {
        return this.adminUpdate(userId).$promise;
      },
      changePassword: function (passwordDetails) {
        return this.updatePassword(passwordDetails).$promise;
      },
      removeSocialAccount: function (provider) {
        return this.deleteProvider({
          provider: provider // api expects provider as a querystring parameter
        }).$promise;
      },
      requestPasswordReset: function (credentials) {
        return this.sendPasswordResetToken(credentials).$promise;
      },
      resetPassword: function (token, passwordDetails) {
        return this.resetPasswordWithToken({
          token: token // api expects token as a parameter (i.e. /:token)
        }, passwordDetails).$promise;
      },
      userSignup: function (credentials) {
        return this.signup(credentials).$promise;
      },
      userSignin: function (credentials) {
        return this.signin(credentials).$promise;
      }
    });

    return Users;
  }


  // TODO this should be Users service
  angular
    .module('users.admin.services')
    .factory('AdminService', AdminService);

  AdminService.$inject = ['$resource', '$log'];

  function AdminService($resource) {
    var User = $resource('/api/users/:userId', {
      userId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(User.prototype, {
      createOrUpdate: function () {
        var user = this;
        return createOrUpdate(user);
      },
      createOrUpdateAdmin: function () {
        var user = this;
        return createOrUpdateAdmin(user);
      }
    });

    return User;

    function createOrUpdate(user) {
      if (user._id) {
        return user.$update(onSuccess, onError);
      } else {
        return user.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(listing) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function createOrUpdateAdmin(user) {
      if (user._id) {
        return user.adminUpdate(user._id);
      } else {
        return user.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(listing) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      $log.error(error);
    }


  }

}());
