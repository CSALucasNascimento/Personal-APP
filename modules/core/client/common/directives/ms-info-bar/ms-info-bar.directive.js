(function () {
  'use strict';

  angular
    .module('core.common.directives')
    .directive('msInfoBar', msInfoBarDirective);

  /** @ngInject */
  function msInfoBarDirective($document) {
    return {
      restrict: 'E',
      scope: {},
      transclude: true,
      templateUrl: './modules/core/client/common/directives/ms-info-bar/ms-info-bar.html',
      link: function (scope, iElement) {
        var body = $document.find('body'),
          bodyClass = 'ms-info-bar-active';

        // Add body class
        body.addClass(bodyClass);

        /**
         * Remove the info bar
         */
        function removeInfoBar() {
          body.removeClass(bodyClass);
          iElement.remove();
          scope.$destroy();
        }

        // Expose functions
        scope.removeInfoBar = removeInfoBar;
      }
    };
  }
}());
