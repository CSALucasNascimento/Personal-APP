(function () {
  'use strict';

  // Home Website Controller
  angular
    .module('core.site.controllers')
    .controller('HomeFeaturedController', HomeFeaturedController);

  HomeFeaturedController.$inject = ['$scope', 'ListingsFeaturedService'];

  function HomeFeaturedController($scope, ListingsFeaturedService) {
    var hfc = this;

    hfc.featuredlistings = ListingsFeaturedService.query();

  }
}());
