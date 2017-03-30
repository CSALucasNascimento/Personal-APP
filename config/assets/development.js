'use strict';

/* eslint comma-dangle:[0, "only-multiline"] */

module.exports = {
  client: {
    lib: {
      css: [
        // bower:css
        'public/lib/bootstrap/dist/css/bootstrap.css',
        'public/lib/ng-img-crop/compile/minified/ng-img-crop.css',
        'public/lib/bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.css',
        'public/lib/angular-bootstrap-toggle-switch/style/bootstrap3/angular-toggle-switch-bootstrap-3.css',
        'public/lib/bootstrap/dist/css/bootstrap-theme.css',
        'public/lib/font-awesome/css/font-awesome.css',
        // 'public/lib/ng-img-crop/compile/unminified/ng-img-crop.css',
        'public/lib/ng-tags-input/ng-tags-input.bootstrap.css',
        'public/lib/ng-tags-input/ng-tags-input.css',
        'public/lib/textAngular/dist/textAngular.css',
        'public/lib/angular-dialog-service/dist/dialogs.css',
        'public/lib/bootstrap-calendar/css/calendar.css',
        'public/lib/angular-bootstrap-calendar/dist/css/angular-bootstrap-calendar.css',
        'public/lib/owl.carousel/dist/assets/owl.carousel.css',

        'public/lib/owl.carousel/dist/assets/owl.theme.default.min.css',
        'public/lib/ng-img-crop-full-extended/compile/unminified/ng-img-crop.css',
        'public/lib/leaflet/dist/leaflet.css',
        'public/lib/angular-material/angular-material.css',
        'https://fonts.googleapis.com/icon?family=Material+Icons',
        'public/lib/bootstrap-social/bootstrap-social.css'

        // endbower
      ],
      js: [
        // bower:js
        'public/lib/angular/angular.js',

        'public/lib/jquery/dist/jquery.js',
        'public/lib/tether/dist/js/tether.js',
        'public/lib/bootstrap/dist/js/bootstrap.js',

        'public/lib/angular-animate/angular-animate.js',
        'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
        'public/lib/angular-messages/angular-messages.js',
        'public/lib/angular-mocks/angular-mocks.js',
        'public/lib/angular-resource/angular-resource.js',
        'public/lib/angular-material/angular-material.js',
        'public/lib/angular-ui-router/release/angular-ui-router.js',
        'public/lib/tether/dist/js/tether.js',
        'public/lib/ng-file-upload/ng-file-upload.js',
        'public/lib/ng-img-crop/compile/minified/ng-img-crop.js',
        'public/lib/owasp-password-strength-test/owasp-password-strength-test.js',
        'public/lib/bootstrap-switch/dist/js/bootstrap-switch.js',
        'public/lib/angular-bootstrap-switch/dist/angular-bootstrap-switch.js',
        'public/lib/angular-bootstrap-toggle-switch/angular-toggle-switch.js',
        'public/lib/ng-tags-input/ng-tags-input.js',
        'public/lib/rangy/rangy-core.js',
        'public/lib/rangy/rangy-classapplier.js',
        'public/lib/rangy/rangy-highlighter.js',
        'public/lib/rangy/rangy-selectionsaverestore.js',
        'public/lib/rangy/rangy-serializer.js',
        'public/lib/rangy/rangy-textrange.js',
        'public/lib/textAngular/dist/textAngular.js',
        'public/lib/textAngular/dist/textAngular-sanitize.js',
        'public/lib/textAngular/dist/textAngularSetup.js',
        // 'public/lib/angular-sanitize/angular-sanitize.js',
        'public/lib/angular-translate/angular-translate.js',
        'public/lib/angular-dialog-service/dist/dialogs.js',
        'public/lib/angular-dialog-service/dist/dialogs-default-translations.js',
        'public/lib/underscore/underscore.js',
        'public/lib/moment/moment.js',
        'public/lib/bootstrap-calendar/js/calendar.js',
        'public/lib/angular-bootstrap-calendar/dist/js/angular-bootstrap-calendar-tpls.js',

        'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js',
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyDgxlpA4sdSzSFFC1iitqzJ_wRe0hdsdDg&libraries=places',

        'public/lib/vsGoogleAutocomplete/dist/vs-google-autocomplete.js',
        'public/lib/vsGoogleAutocomplete/dist/vs-autocomplete-validator.js',
        'public/lib/ngmap/build/scripts/ng-map.js',
        'public/lib/checklist-model/checklist-model.js',
        'public/lib/angular-socialshare/dist/angular-socialshare.min.js',
        'public/lib/owl.carousel/dist/owl.carousel.js',
        'public/lib/bootstrap-sass/assets/javascripts/bootstrap.js',
        'public/lib/angular-filter/dist/angular-filter.js',
        'public/lib/ng-img-crop-full-extended/compile/minified/ng-img-crop.js',
        'public/lib/angucomplete-alt/angucomplete-alt.js',
        'public/lib/chart.js/dist/Chart.js',
        'public/lib/angular-chart.js/dist/angular-chart.js',
        'public/lib/angular-credit-cards/release/angular-credit-cards.js',
        'public/lib/angular-scroll-glue/src/scrollglue.js',
        'public/lib/angular-click-outside/clickoutside.directive.js',
        'public/lib/braintree-web/index.js',
        'public/lib/angular-aria/angular-aria.js',

        'public/lib/ng-material-floating-button/src/mfb-directive.js',
        'public/lib/easy-markerwithlabel/src/markerwithlabel.js',
        'public/lib/angular-spinner/dist/angular-spinner.js',
        'public/lib/angular-addthis/dist/angular-addthis.js',

        // endbower
        'public/custom/customized.js',
        'public/lib/chart.js/dist/Chart.js',
        'public/lib/angular-chart.js/dist/angular-chart.js',
        'public/lib/ui-router-extras/release/ct-ui-router-extras.js',
      ],
      tests: ['public/lib/angular-mocks/angular-mocks.js']
    },
    css: [
      'modules/*/client/css/*.css'
    ],
    less: [
      'modules/*/client/less/*.less'
    ],
    sass: [
      'modules/*/client/scss/*.scss'
    ],
    js: [
      'modules/core/client/app/config.js',
      'modules/core/client/app/init.js',
      'modules/*/client/*.js',
      'modules/*/client/**/*.js'
    ],
    img: [
      'modules/**/*/img/**/*.jpg',
      'modules/**/*/img/**/*.png',
      'modules/**/*/img/**/*.gif',
      'modules/**/*/img/**/*.svg'
    ],
    views: ['modules/*/client/views/**/*.html'],
    templates: ['build/templates.js']
  },
  server: {
    gruntConfig: ['gruntfile.js'],
    gulpConfig: ['gulpfile.js'],
    allJS: ['server.js', 'config/**/*.js', 'modules/*/server/**/*.js'],
    models: 'modules/*/server/models/**/*.js',
    routes: ['modules/!(core)/server/routes/**/*.js', 'modules/core/server/routes/**/*.js'],
    sockets: 'modules/*/server/sockets/**/*.js',
    config: ['modules/*/server/config/*.js'],
    policies: 'modules/*/server/policies/*.js',
    views: ['modules/*/server/views/*.html']
  }
};




'use strict';

module.exports = {
  // Development assets
};
