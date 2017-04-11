/**
 * Created by lucasnascimento on 18/10/16.
 */

(function () {
  angular.module('listings.site.directives')
    .directive('lazyScroll', function() {
      return {
        link: function (scope, element, attribute) {
          var raw = element[0];

          element.bind('scroll', function() {
            if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
              scope.$apply(attribute.lazyScroll);
            }
          });
        }
      };
    });
}());
