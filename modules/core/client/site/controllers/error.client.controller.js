(function () {
  'use strict';

  angular
    .module('core.site.controllers')
    .controller('ErrorController', ErrorController);

  ErrorController.$inject = ['$stateParams'];

  function ErrorController($stateParams) {
    var vm = this;
    vm.errorMessage = null;

    // Display custom message if it was set
    if ($stateParams.message) vm.errorMessage = $stateParams.message;
  }
}());

