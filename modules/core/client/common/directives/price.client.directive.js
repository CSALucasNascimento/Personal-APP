/**
 * Created by lucasnascimento on 04/04/17.
 */

(function () {
  'use strict';

  angular.module('core.common.directives')
    .directive('price', showPrice);

  function showPrice() {
    return {
      restrict: 'E',
      template: "{{displayPrice}}{{displayMethod}}",
      scope: {
        method: '=',
        details: '=',
        showPeriod: '=',
        poa: '='
      },
      link: function (scope, el, attrs) {
        var method = scope.method;
        var details = scope.details;
        var poa = scope.poa;
        var showPeriod = scope.showPeriod || true;

        switch (method) {
          case 'hourly':
            scope.displayMethod = ' hour';
            scope.displayPrice = '$ ' + details.hourly.perhour + ' AUD ';
            break;
          case 'daily':
            scope.displayMethod = ' day';
            scope.displayPrice = '$ ' + details.daily.perday + ' AUD ';
            break;
          case 'monthly':
            scope.displayMethod = ' month';
            scope.displayPrice = '$ ' + details.monthly.permonth + ' AUD ';
            break;
        }

        if (!showPeriod)
          scope.displayMethod = '';

        if (poa) {
          scope.displayMethod = 'POA';
          scope.displayPrice = '';
        }

      }
    };
  }
}());
