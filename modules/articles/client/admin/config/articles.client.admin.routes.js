(function () {
  'use strict';

  angular
    .module('articles.admin.config.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.articles', {
        url: '/articles'
      })
      .state('admin.articles.list', {
        url: '/list',
        views: {
          'content@admin': {
            templateUrl: '/modules/articles/client/admin/views/list-articles.client.admin.view.html',
            controller: 'ArticlesAdminListController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          articleListResolve: getArticleList
        }
      })
      .state('admin.articles.create', {
        url: '/create',
        views: {
          'content@admin': {
            templateUrl: '/modules/articles/client/admin/views/form-article.client.admin.view.html',
            controller: 'ArticlesAdminController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          articleResolve: newArticle,
          tagResolve: getTagList
        }
      })
      .state('admin.articles.edit', {
        url: '/:articleId/edit',
        views: {
          'content@admin': {
            templateUrl: '/modules/articles/client/admin/views/form-article.client.admin.view.html',
            controller: 'ArticlesAdminController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          articleResolve: getArticle,
          tagResolve: getTagList
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

  getTagList.$inject = ['TagsService'];

  function getTagList(TagsService) {
    return TagsService.query().$promise;
  }

  getArticleList.$inject = ['ArticlesService'];

  function getArticleList(ArticlesService) {
    return ArticlesService.query().$promise;
  }

}());
