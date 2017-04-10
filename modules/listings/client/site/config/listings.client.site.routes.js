(function () {
  'use strict';

  angular
    .module('listings.site.config.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('listings', {
        abstract: true,
        url: '/listings',
        views: {
          'app': {
            template: '<ui-view/>'
          }
        },
        sticky: true,
        dsr: true
      })
      .state('listings.map', {
        url: '/map',
        templateUrl: 'modules/listings/client/site/view/list-listings-map.client.view.html',
        controller: 'ListingsListController',
        controllerAs: 'vm',
        resolve: {
          categoryListResolve: getListCategory
        },
        data: {
          pageTitle: 'Listings List'
        }
      })
      .state('listings.search', {
        url: '/:searchQuery/search',
        templateUrl: 'modules/listings/client/site/view/list-listings-map.client.view.html',
        controller: 'ListingsListController',
        controllerAs: 'vm',
        resolve: {
          categoryListResolve: getListCategory,
          listingSearchResolve: getListingSearch
        },
        data: {
          pageTitle: 'Listings List'
        }
      })
      .state('listings.advancedSearch', {
        url: '/:qLocation/location/:qCategory/category',
        templateUrl: 'modules/listings/client/site/view/list-listings-map.client.view.html',
        controller: 'ListingsListController',
        controllerAs: 'vm',
        resolve: {
          categoryListResolve: getListCategory,
          listingSearchResolve: getListingAdvancedSearch
        },
        data: {
          pageTitle: 'Listings List'
        }
      })
      .state('listings.peruser', {
        url: '/:userId/user',
        templateUrl: 'modules/listings/client/site/view/list-listings-map.client.view.html',
        controller: 'ListingsListController',
        controllerAs: 'vm',
        resolve: {
          categoryListResolve: getListCategory,
          listingSearchResolve: getListingPerUser
        },
        data: {
          pageTitle: 'Listings List'
        }
      })
      .state('listings.peraccount', {
        url: '/:accountId/account',
        templateUrl: 'modules/listings/client/site/view/list-listings-map.client.view.html',
        controller: 'ListingsListController',
        controllerAs: 'vm',
        resolve: {
          categoryListResolve: getListCategory,
          listingSearchResolve: getListingPerAccount
        },
        data: {
          pageTitle: 'Listings List'
        }
      })
      .state('listingReport', {
        url: '/listingreport/:listingId',
        views: {
          'modal': {
            templateUrl: 'modules/listings/client/views/listingreport.client.view.html',
            controller: 'ListingReportController',
            controllerAs: 'vm'
          }
        }
      })
      .state('listingReportSent', {
        url: '/listingreportsent',
        views: {
          'modal': {
            templateUrl: 'modules/listings/client/views/listingreportsent.client.view.html'
          }
        }
      })
      .state('listings.view', {
        url: '/:streetName/:category-:suburb/:listingId',
        templateUrl: 'modules/listings/client/views/view-listing.client.view.html',
        controller: 'ListingsViewController',
        controllerAs: 'vm',
        resolve: {
          listingResolve: getListing,
          listingSimilarResolve: getSimilarListing,
          listingSaveResolve: getListingSave,
          listingUnsaveResolve: getListingUnsave,
          categoryListResolve: getListCategory,
          amenityListResolve: getListAmenity,
          accountResolve: getAccountByUser
        },
        data: {
          pageTitle: 'Listing {{ listingResolve.title }}'
        }
      })
      .state('listings.redirectview', {
        url: '/:listingId',
        templateUrl: 'modules/listings/client/views/redirectview-listing.client.view.html',
        controller: 'RedirectListingsViewController',
        controllerAs: 'vm',
        resolve: {
          listingResolve: getListing
        },
        data: {
          pageTitle: 'Listing {{ listingResolve.title }}'
        }
      });
  }

  getListing.$inject = ['$stateParams', 'ListingsService'];

  function getListing($stateParams, ListingsService) {
    return ListingsService.get({
      listingId: $stateParams.listingId
    }).$promise;
  }

  getListingSearch.$inject = ['$stateParams', 'ListingsSearchService', 'ListingsService'];

  function getListingSearch($stateParams, ListingsSearchService, ListingsService) {
    if ($stateParams.searchQuery.length > 0)
      return ListingsSearchService.get({
        searchQuery: $stateParams.searchQuery,
        isArray: true
      }).$promise;
    else
      return ListingsService.query();
  }

  getListingAdvancedSearch.$inject = ['$stateParams', 'ListingsAdvancedSearchService'];

  function getListingAdvancedSearch($stateParams, ListingsAdvancedSearchService) {
    if ($stateParams.qLocation.length > 0 && $stateParams.qCategory.length > 0)
      return ListingsAdvancedSearchService.get({
        qLocation: $stateParams.qLocation,
        qCategory: $stateParams.qCategory
      }).$promise;
    else if ($stateParams.qLocation.length > 0 && $stateParams.qCategory.length === 0)
      return ListingsAdvancedSearchService.get({
        qLocation: $stateParams.qLocation
      }).$promise;
    else if ($stateParams.qLocation.length === 0 && $stateParams.qCategory.length > 0)
      return ListingsAdvancedSearchService.get({
        qCategory: $stateParams.qCategory
      }).$promise;
    else
      return ListingsAdvancedSearchService.get().$promise;
  }

  getListingPerUser.$inject = ['$stateParams', 'ListingsPerUserService', 'ListingsService'];

  function getListingPerUser($stateParams, ListingsPerUserService, ListingsService) {

    if ($stateParams.userId.length > 0)
      return ListingsPerUserService.get({
        userId: $stateParams.userId,
        isArray: true
      }).$promise;
    else
      return ListingsService.query();
  }

  getListingPerAccount.$inject = ['$stateParams', 'ListingsPerAccountService', 'ListingsService'];

  function getListingPerAccount($stateParams, ListingsPerAccountService, ListingsService) {

    if ($stateParams.accountId.length > 0)
      return ListingsPerAccountService.get({
        accountId: $stateParams.accountId,
        isArray: true
      }).$promise;
    else
      return ListingsService.query();
  }

  getSimilarListing.$inject = ['$stateParams', 'ListingsSimilarService'];

  function getSimilarListing($stateParams, ListingsSimilarService) {
    return ListingsSimilarService.get({
      listingId: $stateParams.listingId
    }).$promise;
  }

  getListingSave.$inject = ['ListingsSaveService'];

  function getListingSave(ListingsSaveService) {
    return ListingsSaveService;
  }

  getListingUnsave.$inject = ['ListingsUnsaveService'];

  function getListingUnsave(ListingsUnsaveService) {
    return ListingsUnsaveService;
  }

  getListCategory.$inject = ['CategoriesService'];

  function getListCategory(CategoriesService) {
    return CategoriesService.query();
  }

  getListAmenity.$inject = ['AmenitiesService'];

  function getListAmenity(AmenitiesService) {
    return AmenitiesService.query();
  }

  getAccountByUser.$inject = ['AccountsByUserService'];

  function getAccountByUser(AccountsByUserService) {
    return AccountsByUserService;
  }

  newListing.$inject = ['ListingsService'];

  function newListing(ListingsService) {
    return new ListingsService();
  }

}());
