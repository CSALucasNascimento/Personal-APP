(function () {
  'use strict';

  angular
    .module('tags.admin.config.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.tags', {
        url: '/tags'
      })
      .state('admin.tags.list', {
        url: '/list',
        views: {
          'content@admin': {
            templateUrl: '/modules/tags/client/admin/views/list-tags.client.admin.view.html',
            controller: 'TagsAdminListController',
            controllerAs: 'vm'
          }
        }
      })
      .state('admin.tags.create', {
        url: '/create',
        views: {
          'content@admin': {
            templateUrl: '/modules/tags/client/admin/views/form-tag.client.admin.view.html',
            controller: 'TagsAdminController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          tagResolve: newTag
        }
      })
      .state('admin.tags.edit', {
        url: '/:tagId/edit',
        views: {
          'content@admin': {
            templateUrl: '/modules/tags/client/admin/views/form-tag.client.admin.view.html',
            controller: 'TagsAdminController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          tagResolve: getTag
        }
      });
  }

  getTag.$inject = ['$stateParams', 'TagsService'];

  function getTag($stateParams, TagsService) {
    return TagsService.get({
      tagId: $stateParams.tagId
    }).$promise;
  }

  newTag.$inject = ['TagsService'];

  function newTag(TagsService) {
    return new TagsService();
  }
}());
