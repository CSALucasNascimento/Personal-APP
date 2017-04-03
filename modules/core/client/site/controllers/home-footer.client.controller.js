(function () {
  'use strict';

  // Home Website Controller
  angular
    .module('core.site.controllers')
    .controller('HomeFooterController', HomeFooterController);

  HomeFooterController.$inject = ['$rootScope', '$scope', 'LinksService', '$location'];

  function HomeFooterController($rootScope, $scope, LinksService, $location) {
    var hfc = this;

    hfc.links = LinksService.query();

  }
}());
