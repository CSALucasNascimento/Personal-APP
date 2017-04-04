(function () {
  'use strict';

  // Home Website Controller
  angular
    .module('core.site.controllers')
    .controller('HomeFooterController', HomeFooterController);

  HomeFooterController.$inject = ['$rootScope', '$scope', '$location'];

  function HomeFooterController($rootScope, $scope, $location) {
    var hfc = this;
  }
}());
