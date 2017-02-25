(function () {
  'use strict';

  angular
    .module('core.common.directives')
    .directive('msRandomClass', msRandomClassDirective);

  /** @ngInject */
  function msRandomClassDirective() {
    return {
      restrict: 'A',
      scope: {
        msRandomClass: '='
      },
      link: function (scope, iElement) {
        var randomClass = scope.msRandomClass[Math.floor(Math.random() * (scope.msRandomClass.length))];
        iElement.addClass(randomClass);
      }
    };
  }
}());
