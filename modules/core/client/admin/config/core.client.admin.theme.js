(function (app) {
  'use strict';

  // Setting HTML5 Location Mode
  angular
    .module('core.admin.config')
    .config(config);

  // Setting Text Angular
  angular
    .module('core.admin.config')
    .config(textAngularConfig);

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

  textAngularConfig.$inject = ['$provide'];

  function textAngularConfig($provide) {
    // Text Angular options
    $provide.decorator('taOptions', [
      '$delegate', function (taOptions) {
        taOptions.toolbar = [
          ['bold', 'italics', 'underline', 'ul', 'ol', 'quote']
        ];

        taOptions.classes = {
          focussed: 'focussed',
          toolbar: 'ta-toolbar',
          toolbarGroup: 'ta-group',
          toolbarButton: 'md-button',
          toolbarButtonActive: 'active',
          disabled: '',
          textEditor: 'form-control',
          htmlEditor: 'form-control'
        };

        return taOptions;
      }
    ]);

    // Text Angular tools
    $provide.decorator('taTools', [
      '$delegate', function (taTools) {
        taTools.quote.iconclass = 'icon-format-quote';
        taTools.bold.iconclass = 'icon-format-bold';
        taTools.italics.iconclass = 'icon-format-italic';
        taTools.underline.iconclass = 'icon-format-underline';
        taTools.strikeThrough.iconclass = 'icon-format-strikethrough';
        taTools.ul.iconclass = 'icon-format-list-bulleted';
        taTools.ol.iconclass = 'icon-format-list-numbers';
        taTools.redo.iconclass = 'icon-redo';
        taTools.undo.iconclass = 'icon-undo';
        taTools.clear.iconclass = 'icon-close-circle-outline';
        taTools.justifyLeft.iconclass = 'icon-format-align-left';
        taTools.justifyCenter.iconclass = 'icon-format-align-center';
        taTools.justifyRight.iconclass = 'icon-format-align-right';
        taTools.justifyFull.iconclass = 'icon-format-align-justify';
        taTools.indent.iconclass = 'icon-format-indent-increase';
        taTools.outdent.iconclass = 'icon-format-indent-decrease';
        taTools.html.iconclass = 'icon-code-tags';
        taTools.insertImage.iconclass = 'icon-file-image-box';
        taTools.insertLink.iconclass = 'icon-link';
        taTools.insertVideo.iconclass = 'icon-filmstrip';

        return taTools;
      }
    ]);
  }

}());
