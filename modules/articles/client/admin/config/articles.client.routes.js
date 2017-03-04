﻿(function () {
  'use strict';

  angular
    .module('articles.admin.config')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.articles', {
        url: '/articles',
        views: {
          'content@admin': {
            templateUrl: '/modules/articles/client/admin/views/list-articles.client.view.html'
            // controller: 'ArticlesAdminListController',
            // controllerAs: 'vm'
          }
        }
      })
      .state('admin.articles.list', {
        url: 'articles/list',
        views: {
          'content@admin': {
            templateUrl: '/modules/articles/client/views/admin/list-articles.client.view.html',
            controller: 'ArticlesAdminListController',
            controllerAs: 'vm'
          }
        }
      })
      .state('admin.articles.create', {
        url: '/create',
        templateUrl: '/modules/articles/client/views/admin/form-article.client.view.html',
        controller: 'ArticlesAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          articleResolve: newArticle
        }
      })
      .state('admin.articles.edit', {
        url: '/:articleId/edit',
        templateUrl: '/modules/articles/client/views/admin/form-article.client.view.html',
        controller: 'ArticlesAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          articleResolve: getArticle
        }
      });
  }

  getArticle.$inject = ['$stateParams', 'ArticlesService'];

  function getArticle($stateParams, ArticlesService) {
    return ArticlesService.get({
      articleId: $stateParams.articleId
    }).$promise;
  }

  newArticle.$inject = ['ArticlesService'];

  function newArticle(ArticlesService) {
    return new ArticlesService();
  }
}());
