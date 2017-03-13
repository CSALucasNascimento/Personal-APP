(function (app) {
  'use strict';

  // Setting HTML5 Location Mode
  angular
    .module('core.admin.config')
    .config(config);

  config.$inject = ['$mdThemingProvider', 'adminPalettes', 'adminThemes'];

  function config($mdThemingProvider, adminPalettes, adminThemes) {

    $mdThemingProvider.alwaysWatchTheme(true);

    // Define custom palettes
    angular.forEach(adminPalettes, function (palette) {
      $mdThemingProvider.definePalette(palette.name, palette.options);
    });

    // Register custom themes
    angular.forEach(adminThemes, function (theme) {
      $mdThemingProvider.theme('default')
        .primaryPalette(theme.primary.name, theme.primary.hues)
        .accentPalette(theme.accent.name, theme.accent.hues)
        .warnPalette(theme.warn.name, theme.warn.hues)
        .backgroundPalette(theme.background.name, theme.background.hues);
    });
  }
}());
