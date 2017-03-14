(function () {
  'use strict';

  angular
    .module('medias.admin.config.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.medias', {
        url: '/medias',
        views: {
          'content@admin': {
            templateUrl: '/modules/medias/client/admin/views/list-medias.client.view.html'
            // controller: 'MediasAdminListController',
            // controllerAs: 'vm'
          }
        }
      })
      .state('admin.medias.list', {
        url: '/list',
        views: {
          'content@admin': {
            templateUrl: '/modules/medias/client/admin/views/list-medias.client.view.html',
            controller: 'MediasAdminListController',
            controllerAs: 'vm'
          }
        }
      })
      .state('admin.medias.create', {
        url: '/create',
        views: {
          'content@admin': {
            templateUrl: '/modules/medias/client/admin/views/form-media.client.view.html',
            controller: 'MediasAdminController',
            controllerAs: 'vm',
            data: {
              roles: ['admin']
            },
            resolve: {
              mediaResolve: newMedia
            }
          }
        }
      })
      .state('admin.medias.edit', {
        url: '/:mediaId/edit',
        templateUrl: '/modules/medias/client/views/admin/form-media.client.view.html',
        controller: 'MediasAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          mediaResolve: getMedia
        }
      });
  }

  getMedia.$inject = ['$stateParams', 'MediasService'];

  function getMedia($stateParams, MediasService) {
    return MediasService.get({
      mediaId: $stateParams.mediaId
    }).$promise;
  }

  newMedia.$inject = ['MediasService'];

  function newMedia(MediasService) {
    return new MediasService();
  }
}());
