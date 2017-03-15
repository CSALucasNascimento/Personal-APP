(function (app) {
  'use strict';

  // Start by defining the main module and adding the module dependencies
  angular
    .module(app.applicationModuleName, app.applicationModuleVendorDependencies);

  // Setting HTML5 Location Mode
  angular
    .module(app.applicationModuleName)
    .config(bootstrapConfig);

  // Setting Text Angular
  angular
    .module(app.applicationModuleName)
    .config(textAngularConfig);

  // Setting HTML5 Location Mode
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

  textAngularConfig.$inject = ['$provide'];

  function textAngularConfig($provide) {
    // Text Angular options
    $provide.decorator('taOptions', [
      '$delegate', function (taOptions) {
        taOptions.toolbar = [
          ['bold', 'italics', 'underline', 'ul', 'ol', 'quote']
        ];

        taOptions.classes = {
          focussed: 'focussed',
          toolbar: 'ta-toolbar',
          toolbarGroup: 'ta-group',
          toolbarButton: 'md-button',
          toolbarButtonActive: 'active',
          disabled: '',
          textEditor: 'form-control',
          htmlEditor: 'form-control'
        };

        return taOptions;
      }
    ]);

    // Text Angular tools
    $provide.decorator('taTools', [
      '$delegate', function (taTools) {
        taTools.quote.iconclass = 'icon-format-quote';
        taTools.bold.iconclass = 'icon-format-bold';
        taTools.italics.iconclass = 'icon-format-italic';
        taTools.underline.iconclass = 'icon-format-underline';
        taTools.strikeThrough.iconclass = 'icon-format-strikethrough';
        taTools.ul.iconclass = 'icon-format-list-bulleted';
        taTools.ol.iconclass = 'icon-format-list-numbers';
        taTools.redo.iconclass = 'icon-redo';
        taTools.undo.iconclass = 'icon-undo';
        taTools.clear.iconclass = 'icon-close-circle-outline';
        taTools.justifyLeft.iconclass = 'icon-format-align-left';
        taTools.justifyCenter.iconclass = 'icon-format-align-center';
        taTools.justifyRight.iconclass = 'icon-format-align-right';
        taTools.justifyFull.iconclass = 'icon-format-align-justify';
        taTools.indent.iconclass = 'icon-format-indent-increase';
        taTools.outdent.iconclass = 'icon-format-indent-decrease';
        taTools.html.iconclass = 'icon-code-tags';
        taTools.insertImage.iconclass = 'icon-file-image-box';
        taTools.insertLink.iconclass = 'icon-link';
        taTools.insertVideo.iconclass = 'icon-filmstrip';

        return taTools;
      }
    ]);
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
