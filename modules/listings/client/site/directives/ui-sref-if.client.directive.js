/**
 * Created by lucasnascimento on 18/10/16.
 */

(function () {
  angular.module('listings.site.directives')
    .directive('uiSrefIf', function($compile) {
      return {
        scope: {
          val: '@uiSrefVal',
          if: '=uiSrefIf'
        },
        link: function($scope, $element, $attrs) {
          $element.removeAttr('ui-sref-if');
          $compile($element)($scope);

          $scope.$watch('if', function(bool) {
            if (bool) {
              $element.attr('ui-sref', $scope.val);
            } else {
              $element.removeAttr('ui-sref');
              $element.removeAttr('href');
            }
            $compile($element)($scope);
          });
        }
      };
    });
}());
