(function () {
  'use strict';

  angular
    .module('listings.admin.config.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.listings', {
        url: '/listings'
      })
      .state('admin.listings.list', {
        url: '/list',
        views: {
          'content@admin': {
            templateUrl: '/modules/listings/client/admin/views/list-listings.client.admin.view.html',
            controller: 'ListingsAdminListController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          listingListResolve: getListingList
        }
      })
      .state('admin.listings.draft', {
        url: '/draft',
        views: {
          'content@admin': {
            templateUrl: '/modules/listings/client/admin/views/draft-listings.client.admin.view.html',
            controller: 'ListingsAdminDraftController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          listingDraftResolve: getListingDraft
        }
      })
      .state('admin.listings.pending', {
        url: '/pending',
        views: {
          'content@admin': {
            templateUrl: '/modules/listings/client/admin/views/pending-listings.client.admin.view.html',
            controller: 'ListingsAdminPendingController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          listingPendingResolve: getListingPending
        }
      })
      .state('admin.listings.ordination', {
        url: '/ordination',
        views: {
          'content@admin': {
            templateUrl: '/modules/listings/client/admin/views/ordination-listings.client.admin.view.html',
            controller: 'ListingsAdminOrdinationController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          listingOrdinationResolve: getListingOrdination
        }
      })
      .state('admin.listings.create', {
        url: '/create',
        views: {
          'content@admin': {
            templateUrl: '/modules/listings/client/admin/views/form-listing.client.admin.view.html',
            controller: 'ListingsAdminController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          listingResolve: newListing,
          categoryResolve: getCategoryList,
          amenityResolve: getAmenityList
        }
      })
      .state('admin.listings.edit', {
        url: '/:listingId/edit',
        views: {
          'content@admin': {
            templateUrl: '/modules/listings/client/admin/views/form-listing.client.admin.view.html',
            controller: 'ListingsAdminController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          listingResolve: getListing,
          categoryResolve: getCategoryList,
          amenityResolve: getAmenityList
        }
      });
  }

  getListing.$inject = ['$stateParams', 'ListingsService'];

  function getListing($stateParams, ListingsService) {
    return ListingsService.get({
      listingId: $stateParams.listingId
    }).$promise;
  }

  newListing.$inject = ['ListingsService'];

  function newListing(ListingsService) {
    return new ListingsService();
  }

  getCategoryList.$inject = ['CategoriesService'];

  function getCategoryList(CategoriesService) {
    return CategoriesService.query().$promise;
  }

  getAmenityList.$inject = ['AmenitiesService'];

  function getAmenityList(AmenitiesService) {
    return AmenitiesService.query().$promise;
  }

  getListingList.$inject = ['ListingsService'];

  function getListingList(ListingsService) {
    return ListingsService.query().$promise;
  }

  getListingDraft.$inject = ['ListingsDraftService'];

  function getListingDraft(ListingsDraftService) {
    return ListingsDraftService.query().$promise;
  }

  getListingPending.$inject = ['ListingsPendingService'];

  function getListingPending(ListingsPendingService) {
    return ListingsPendingService.query().$promise;
  }

  getListingOrdination.$inject = ['ListingsOrdinationService'];

  function getListingOrdination(ListingsOrdinationService) {
    return ListingsOrdinationService.query().$promise;
  }

}());
