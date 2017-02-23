(function () {
  'use strict';

  angular
    .module('core.site.controllers')
    .controller('SidebarController', SidebarController);

  SidebarController.$inject = ['$scope', '$mdSidenav', 'Authentication'];

  function SidebarController($scope, $mdSidenav, Authentication) {
    var vm = this;
    vm.showSidebar = showSidebar('left');
    vm.authentication = Authentication;

    function showSidebar(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      };
    }

  }
}());
