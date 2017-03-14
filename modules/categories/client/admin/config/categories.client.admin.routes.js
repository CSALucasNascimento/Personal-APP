(function () {
  'use strict';

  angular
    .module('categories.admin.config')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.categories', {
        abstract: true,
        url: '/categories'
      })
      .state('admin.categories.list', {
        url: '/list',
        views: {
          'content@admin': {
            templateUrl: '/modules/categories/client/admin/views/list-categories.client.admin.view.html',
            controller: 'CategoriesListController',
            controllerAs: 'vm'
          }
        }
      })
      .state('admin.categories.create', {
        url: '/create',
        views: {
          'content@admin': {
            templateUrl: '/modules/categories/client/admin/views/form-category.client.admin.view.html',
            controller: 'CategoriesController',
            controllerAs: 'vm',
            resolve: {
              categoryResolve: newCategory,
              categoryListResolve: getListCategory
            }
          }
        }
      })
      .state('admin.categories.edit', {
        url: '/:categoryId/edit',
        views: {
          'content@admin': {
            templateUrl: 'modules/categories/client/admin/views/form-category.client.admin.view.html',
            controller: 'CategoriesController',
            controllerAs: 'vm',
            resolve: {
              categoryResolve: newCategory,
              categoryListResolve: getListCategory
            }
          }
        }
      })
      .state('admin.categories.view', {
        url: '/:categoryId',
        views: {
          'content@admin': {
            templateUrl: 'modules/categories/client/admin/views/view-category.client.admin.view.html',
            controller: 'CategoriesController',
            controllerAs: 'vm',
            resolve: {
              categoryResolve: getCategory,
              categoryListResolve: getListCategory
            },
            data: {
              pageTitle: 'Categories'
            }
          }
        }
      });
  }

  getCategory.$inject = ['$stateParams', 'CategoriesService'];

  function getCategory($stateParams, CategoriesService) {
    return CategoriesService.get({
      categoryId: $stateParams.categoryId
    }).$promise;
  }

  getListCategory.$inject = ['CategoriesService'];

  function getListCategory(CategoriesService) {
    return CategoriesService.query();
  }

  newCategory.$inject = ['CategoriesService'];

  function newCategory(CategoriesService) {
    return new CategoriesService();
  }
}());
