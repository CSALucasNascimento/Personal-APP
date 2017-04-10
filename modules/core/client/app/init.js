(function (app) {
  'use strict';

  // Start by defining the main module and adding the module dependencies
  angular
    .module(app.applicationModuleName, app.applicationModuleVendorDependencies);

  // Setting HTML5 Location Mode
  angular
    .module(app.applicationModuleName)
    .config(bootstrapConfig);

  angular
    .module(app.applicationModuleName)
    .run(hideFooter);

  angular
    .module(app.applicationModuleName)
    .run(addSlugifyToRootScope);

  angular
    .module(app.applicationModuleName)
    .run(runBlock);

  bootstrapConfig.$inject = ['$compileProvider', '$locationProvider', '$httpProvider', '$logProvider'];

  function bootstrapConfig($compileProvider, $locationProvider, $httpProvider, $logProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    }).hashPrefix('!');

    $httpProvider.interceptors.push('authInterceptor');

    // Disable debug data for production environment
    // @link https://docs.angularjs.org/guide/production
    $compileProvider.debugInfoEnabled(app.applicationEnvironment !== 'production');
    $logProvider.debugEnabled(app.applicationEnvironment !== 'production');
  }

  // Then define the init function for starting up the application
  angular.element(document).ready(init);

  function init() {
    // Fixing facebook bug with redirect
    if (window.location.hash && window.location.hash === '#_=_') {
      if (window.history && history.pushState) {
        window.history.pushState('', document.title, window.location.pathname);
      } else {
        // Prevent scrolling by storing the page's current scroll offset
        var scroll = {
          top: document.body.scrollTop,
          left: document.body.scrollLeft
        };
        window.location.hash = '';
        // Restore the scroll offset, should be flicker free
        document.body.scrollTop = scroll.top;
        document.body.scrollLeft = scroll.left;
      }
    }

    // Then init the app
    angular.bootstrap(document, [app.applicationModuleName]);
  }

  var statesToShowOnFooter = ['home', 'articles.view', 'listings.view', 'accounts.view'];

  hideFooter.$inject = ['$rootScope', '$state'];

  function hideFooter($rootScope, $state) {
    $rootScope.$on('$stateChangeSuccess', function (event) {
      $rootScope.showFooter = statesToShowOnFooter.indexOf($state.current.name) > -1;
    });
  }

  addSlugifyToRootScope.$inject = ['$rootScope'];

  function addSlugifyToRootScope($rootScope) {
    $rootScope.slugify = function (text) {
      return (text === 'undefined') ? '' : text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
    };
  }

  runBlock.$inject = ['$rootScope', '$timeout'];

  function runBlock($rootScope, $timeout) {
    // Activate loading indicator
    var stateChangeStartEvent = $rootScope.$on('$stateChangeStart', function () {
      $rootScope.loadingProgress = true;
    });

    // De-activate loading indicator
    var stateChangeSuccessEvent = $rootScope.$on('$stateChangeSuccess', function () {
      $timeout(function () {
        $rootScope.loadingProgress = false;
      });
    });

    // Cleanup
    $rootScope.$on('$destroy', function () {
      stateChangeStartEvent();
      stateChangeSuccessEvent();
    });
  }

}(ApplicationConfiguration));
