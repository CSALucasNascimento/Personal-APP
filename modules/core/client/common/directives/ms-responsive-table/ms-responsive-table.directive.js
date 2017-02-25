(function () {
  'use strict';

  angular
    .module('core.common.directives')
    .directive('msResponsiveTable', msResponsiveTableDirective);

  /** @ngInject */
  function msResponsiveTableDirective() {
    return {
      restrict: 'A',
      link: function (scope, iElement) {
        // Wrap the table
        var wrapper = angular.element('<div class="ms-responsive-table-wrapper"></div>');
        iElement.after(wrapper);
        wrapper.append(iElement);

        // // // // //
      }
    };
  }
}());
