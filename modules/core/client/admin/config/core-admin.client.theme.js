(function (app) {
  'use strict';
  
  // Setting HTML5 Location Mode
  angular
    .module('core.admin.config')
    .config(themMaterial);
  
  themMaterial.$inject = ['$mdThemingProvider'];

  function themMaterial($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('deep-orange')
      .accentPalette('grey');
  }
}());
