(function () {
  'use strict';

  angular
    .module('core.admin.controllers')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $rootScope) {
    // Remove the splash screen
    $scope.$on('$viewContentAnimationEnded', function (event) {
      if (event.targetScope.$id === $scope.$id) {
        $rootScope.$broadcast('msSplashScreen::remove');
      }
    });
  }
}());
