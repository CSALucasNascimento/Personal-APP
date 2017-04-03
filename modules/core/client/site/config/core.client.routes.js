(function () {
  'use strict';

  angular
    .module('core.site.config.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function routeConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.rule(function ($injector, $location) {
      var path = $location.path();
      var hasTrailingSlash = path.length > 1 && path[path.length - 1] === '/';

      if (hasTrailingSlash) {
        // if last character is a slash, return the same url without the slash
        var newPath = path.substr(0, path.length - 1);
        $location.replace().path(newPath);
      }
    });

    // Redirect to 404 when route not found
    $urlRouterProvider.otherwise(function ($injector, $location) {
      $injector.get('$state').transitionTo('not-found', null, {
        location: false
      });
    });

    $stateProvider
      .state('home', {
        url: '/',
        views: {
          'app': {
            templateUrl: 'modules/core/client/site/views/home.client.view.html'
          }
        },
        sticky: true,
        dsr: true
      })
      .state('not-found', {
        url: '/not-found',
        views: {
          'app': {
            templateUrl: 'modules/core/client/site/views/404.client.view.html'
          }
        },
        sticky: true,
        dsr: true,
        data: {
          ignoreState: true,
          pageTitle: 'Not-Found'
        }
      })
      .state('bad-request', {
        url: '/bad-request',
        views: {
          'app': {
            templateUrl: 'modules/core/client/site/views/400.client.view.html'
          }
        },
        sticky: true,
        dsr: true,
        data: {
          ignoreState: true,
          pageTitle: 'Bad-Request'
        }
      })
      .state('forbidden', {
        url: '/forbidden',
        views: {
          'app': {
            templateUrl: 'modules/core/client/site/views/403.client.view.html'
          }
        },
        sticky: true,
        dsr: true,
        data: {
          ignoreState: true,
          pageTitle: 'Forbidden'
        }
      });
  }

}());
