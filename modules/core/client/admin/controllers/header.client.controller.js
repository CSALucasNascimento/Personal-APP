(function () {
  'use strict';

  angular
    .module('core.admin.controllers')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$scope', '$state', 'Authentication', 'menuService', '$mdSidenav'];

  function HeaderController($scope, $state, Authentication, menuService, $mdSidenav) {
    var vm = this;

    vm.accountMenu = menuService.getMenu('account').items[0];
    vm.authentication = Authentication;
    vm.isCollapsed = false;
    vm.menu = menuService.getMenu('topbar');

    $scope.$on('$stateChangeSuccess', stateChangeSuccess);

    function stateChangeSuccess() {
      // Collapsing the menu after navigation
      vm.isCollapsed = false;
    }

    vm.showSidebar = showSidebar('left');
    function showSidebar(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      };
    }

  }
}());
