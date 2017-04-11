/**
 * Created by lucasnascimento on 18/10/16.
 */
(function () {
  angular.module('listings.site.directives')
    .directive('owlCarousel', function() {
      return {
        restrict: 'E',
        transclude: false,
        link: function (scope) {
          scope.initCarousel = function(element) {
            // provide any default options you want
            var defaultOptions = {
              nav: true,
              navText: ['‹', '›'],
              pagination: true,
              rewindNav: true,
              loop: false,
              autoplay: false,
              lazyLoad: true,
              autoplayTimeout: 8000,
              autoplayHoverPause: true,
              autoplaySpeed: 600,
              dots: false,
              margin: 3,
              autoHeight: false,
              mouseDrag: true,
              responsiveClass: true,
              responsive: {
                0: {
                  items: 1,
                  nav: true
                },
                425: {
                  items: 1,
                  nav: true
                },
                768: {
                  items: 2,
                  nav: true,
                  loop: false
                },
                1024: {
                  items: 2,
                  nav: true,
                  loop: false
                },
                1440: {
                  items: 3,
                  nav: true,
                  loop: false
                }
              }
            };
            var customOptions = scope.$eval($(element).attr('data-options'));
            // combine the two options objects
            for (var key in customOptions) {
              if (key)
                defaultOptions[key] = customOptions[key];
            }
            // init carousel
            $(element).owlCarousel(defaultOptions);
          };
        }
      };
    })
    .directive('owlCarouselItem', [function() {
      return {
        restrict: 'A',
        transclude: false,
        link: function(scope, element) {
          // wait for the last item in the ng-repeat then call init
          if (scope.$last) {
            scope.initCarousel(element.parent());
          }
        }
      };
    }]);
}());
