(function () {
  'use strict';

  angular
    .module('amenities.admin.config.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.amenities', {
        abstract: true,
        url: '/amenities'
      })
      .state('admin.amenities.list', {
        url: '/list',
        views: {
          'content@admin': {
            templateUrl: '/modules/amenities/client/admin/views/list-amenities.client.admin.view.html',
            controller: 'AmenitiesAdminListController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          amenityListResolve: getAmenityList
        }
      })
      .state('admin.amenities.create', {
        url: '/create',
        views: {
          'content@admin': {
            templateUrl: '/modules/amenities/client/admin/views/form-amenity.client.admin.view.html',
            controller: 'AmenitiesAdminController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          amenityResolve: newAmenity
        }
      })
      .state('admin.amenities.edit', {
        url: '/:amenityId/edit',
        views: {
          'content@admin': {
            templateUrl: '/modules/amenities/client/admin/views/form-amenity.client.admin.view.html',
            controller: 'AmenitiesAdminController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          amenityResolve: getAmenity
        }
      });
  }

  getAmenity.$inject = ['$stateParams', 'AmenitiesService'];

  function getAmenity($stateParams, AmenitiesService) {
    return AmenitiesService.get({
      amenityId: $stateParams.amenityId
    }).$promise;
  }

  newAmenity.$inject = ['AmenitiesService'];

  function newAmenity(AmenitiesService) {
    return new AmenitiesService();
  }

  getAmenityList.$inject = ['AmenitiesService'];

  function getAmenityList(AmenitiesService) {
    return AmenitiesService.query().$promise;
  }
}());
