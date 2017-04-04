(function () {
  'use strict';

  // Setting up route
  angular
    .module('users.site.config')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    // Users state routing
    $stateProvider
      .state('settings', {
        url: '/settings',
        abstract: true,
        views: {
          'app': {
            templateUrl: 'modules/users/client/site/views/settings/settings.client.view.html',
            controller: 'SettingsController',
            controllerAs: 'vm',
            resolve: {
              listingsOwnedResolve: getListingsOwned
            }
          }
        },
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('settings.profile', {
        url: '/profile',
        templateUrl: 'modules/users/client/views/settings/edit-profile.client.view.html',
        controller: 'EditProfileController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Settings'
        }
      })
      .state('settings.password', {
        url: '/password',
        templateUrl: 'modules/users/client/views/settings/change-password.client.view.html',
        controller: 'ChangePasswordController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Settings password'
        }
      })
      .state('settings.accounts', {
        url: '/accounts',
        templateUrl: 'modules/users/client/views/settings/manage-social-accounts.client.view.html',
        controller: 'SocialAccountsController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Settings accounts'
        }
      })
      .state('settings.picture', {
        url: '/picture',
        templateUrl: 'modules/users/client/views/settings/change-profile-picture.client.view.html',
        controller: 'ChangeProfilePictureController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Settings picture'
        }
      })
      .state('settings.favorites', {
        url: '/favorites',
        templateUrl: 'modules/users/client/views/settings/manage-favorites.client.view.html',
        controller: 'FavoritesController',
        controllerAs: 'vm',
        resolve: {
          listingsByUserResolve: getListingsByUser,
          listingUnsaveResolve: getListingUnsave
        },
        data: {
          pageTitle: 'Managing Favorites'
        }
      })
      .state('settings.myspaces', {
        url: '/myspaces',
        templateUrl: 'modules/users/client/views/settings/manage-my-spaces.client.view.html',
        controller: 'MySpacesController',
        controllerAs: 'mms',
        resolve: {
          listingsOwnedResolve: getListingsOwned
        },
        data: {
          pageTitle: 'Managing My Spaces'
        }
      })
      .state('settings.stats', {
        url: '/:listingId/stats',
        templateUrl: 'modules/users/client/views/settings/stats.client.view.html',
        controller: 'StatsController',
        controllerAs: 'stt',
        resolve: {
          listingResolve: getListing
        },
        data: {
          pageTitle: 'Statistics'
        }
      })
      .state('emailVerification', {
        url: '/verify/:randomId/user/:userId',
        views: {
          'app': {
            templateUrl: 'modules/users/client/views/authentication/verify.client.view.html',
            controller: 'EmailVerification',
            controllerAs: 'vm',
            resolve: {
              verificationResolve: putVerification
            }
          }
        },
        data: {
          pageTitle: 'Email verification'
        }
      })
      .state('profileFromListing', {
        url: '/profilefromlisting',
        views: {
          'app': {
            templateUrl: 'modules/users/client/views/settings/edit-profile-listing.client.view.html',
            controller: 'EditProfileController',
            controllerAs: 'vm'
          }
        },
        data: {
          pageTitle: 'Profile Update'
        }
      })
      .state('authentication', {
        abstract: true,
        url: '/authentication',
        views: {
          'modal': {
            templateUrl: 'modules/users/client/site/views/authentication/authentication.client.view.html',
            controller: 'AuthenticationController',
            controllerAs: 'vm'
          }
        }
      })
      .state('authentication.signup', {
        url: '/signup',
        templateUrl: 'modules/users/client/site/views/authentication/signup.client.view.html',
        controller: 'AuthenticationController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Signup'
        }
      })
      .state('authentication.signin', {
        url: '/signin?err',
        templateUrl: 'modules/users/client/site/views/authentication/signin.client.view.html',
        controller: 'AuthenticationController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Signin'
        }
      })
      .state('password', {
        abstract: true,
        url: '/password',
        views: {
          'modal': {
            templateUrl: 'modules/core/client/views/website/modal/modal.html'
          }
        }
      })
      .state('password.forgot', {
        url: '/forgot',
        templateUrl: 'modules/users/client/views/password/forgot-password.client.view.html',
        controller: 'PasswordController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Password forgot'
        }
      })
      .state('password.reset', {
        abstract: true,
        url: '/reset',
        template: '<ui-view/>'
      })
      .state('password.reset.invalid', {
        url: '/invalid',
        templateUrl: 'modules/users/client/views/password/reset-password-invalid.client.view.html',
        data: {
          pageTitle: 'Password reset invalid'
        }
      })
      .state('password.reset.success', {
        url: '/success',
        templateUrl: 'modules/users/client/views/password/reset-password-success.client.view.html',
        data: {
          pageTitle: 'Password reset success'
        }
      })
      .state('password.reset.form', {
        url: '/:token',
        templateUrl: 'modules/users/client/views/password/reset-password.client.view.html',
        controller: 'PasswordController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Password reset form'
        }
      });
  }

  getListing.$inject = ['$stateParams', 'ListingsService'];

  function getListing($stateParams, ListingsService) {
    return ListingsService.get({
      listingId: $stateParams.listingId
    }).$promise;
  }

  getListingsByUser.$inject = ['ListingsByUserService'];

  function getListingsByUser(ListingsByUserService) {
    return ListingsByUserService.query().$promise;
  }

  getListingUnsave.$inject = ['ListingsUnsaveService'];

  function getListingUnsave(ListingsUnsaveService) {
    return ListingsUnsaveService;
  }

  putVerification.$inject = ['UserVerifyService'];

  function putVerification(UserVerifyService) {
    return UserVerifyService;
  }

  getListingsOwned.$inject = ['ListingsOwnedService'];

  function getListingsOwned(ListingsOwnedService) {
    return ListingsOwnedService.query().$promise;
  }

}());
