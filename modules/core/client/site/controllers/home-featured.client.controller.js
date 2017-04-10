(function () {
  'use strict';

  // Home Website Controller
  angular
    .module('core.site.controllers')
    .controller('HomeFeaturedController', HomeFeaturedController);

  HomeFeaturedController.$inject = ['$scope', 'ListingsOrdinationService'];

  function HomeFeaturedController($scope, ListingsOrdinationService) {
    var hfc = this;

    hfc.featuredlistings = ListingsOrdinationService.query();

  }
}());
