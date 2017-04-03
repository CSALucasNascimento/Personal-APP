(function () {
  'use strict';

  // Home Website Controller
  angular
    .module('core.site.controllers')
    .controller('HomeHeaderController', HomeHeaderController);

  HomeHeaderController.$inject = ['$scope', '$rootScope', 'Authentication', 'menuService', 'CategoriesService', '$window'];

  function HomeHeaderController($scope, $rootScope, Authentication, menuService, CategoriesService, $window) {
    var hhc = this;
    hhc.animationsEnabled = true;
    hhc.accountMenu = menuService.getMenu('account').items[0];
    hhc.authentication = Authentication;
    hhc.categories = CategoriesService.query();
    hhc.animationsEnabled = true;
    hhc.qLocation = '';

    $rootScope.clickToClose = clickToClose;

    function clickToClose (qtd) {
      if (qtd === undefined) {
        qtd = -1;
      }
      $window.history.go(qtd);
    }
  }
}());
