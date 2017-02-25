(function () {
  'use strict';

  angular
    .module('core.admin.controllers')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope', '$document'];

  function HomeController($scope, $document) {
    var vm = this;
  }
}());
