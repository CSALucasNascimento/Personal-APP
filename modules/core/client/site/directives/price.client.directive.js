/**
 * Created by lucasnascimento on 04/04/17.
 */

(function () {
  angular.module('core.site.directives')
    .directive('ngPrice', showPrice);

  showPrice.$inject = ['$scope'];

  function showPrice($scope) {

    return {
      restrict: "EA",
      scope: true,
      link: function (scope, elem, attr) {
      }
    };

  }
}());
