'use strict';

/* eslint comma-dangle:[0, "only-multiline"] */

module.exports = {
  client: {
    lib: {
      css: [
        // bower:css
      ],
      js: [
        'public/lib/jquery/dist/jquery.js',
        'public/lib/angular/angular.js',
        'public/lib/angular-bootstrap/ui-bootstrap.js',
        'public/lib/angular-animate/angular-animate.js',
        'public/lib/angular-aria/angular-aria.js',
        'public/lib/angular-cookies/angular-cookies.js',
        'public/lib/angular-messages/angular-messages.js',
        'public/lib/angular-material/angular-material.js',
        'public/lib/angular-resource/angular-resource.js',
        'public/lib/angular-sanitize/angular-sanitize.js',
        'public/lib/angular-ui-router/release/angular-ui-router.js'
      ],
      cssAdmin: [
        'public/lib/chartist/dist/chartist.min.css',
        'public/lib/angular-datatables/dist/css/angular-datatables.css',
        'public/lib/angular-datatables/dist/plugins/bootstrap/datatables.bootstrap.min.css',
        'public/lib/angular-gantt/assets/angular-gantt.css',
        'public/lib/angular-gantt/assets/angular-gantt-plugins.css',
        'public/lib/nvd3/build/nv.d3.css',
        'public/lib/fullcalendar/dist/fullcalendar.css',
        'public/lib/angular-ui-tree/dist/angular-ui-tree.css',
        'public/lib/angular-xeditable/dist/css/xeditable.css',
        'public/lib/c3/c3.css',
        'public/lib/datatables/media/css/jquery.dataTables.css',
        'public/lib/highlightjs/styles/default.css',
        'public/lib/moment-picker/dist/angular-moment-picker.min.css',
        'public/lib/perfect-scrollbar/css/perfect-scrollbar.css',
        'public/lib/textAngular/dist/textAngular.css',
        'public/lib/wip-image-zoom/dist/wip-image-zoom.css',
        '//fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300italic,400italic,500,500italic,700italic,700,900,900italic',
      ],
      jsAdmin: [
        'public/lib/chart.js/dist/Chart.js',
        'public/lib/angular-chart.js/dist/angular-chart.js',
        'public/lib/chartist/dist/chartist.min.js',
        'public/lib/angular-chartist.js/dist/angular-chartist.js',
        'public/lib/angular-cookies/angular-cookies.js',
        'public/lib/datatables.net/js/jquery.dataTables.js',
        'public/lib/angular-datatables/dist/angular-datatables.js',
        'public/lib/angular-datatables/dist/plugins/bootstrap/angular-datatables.bootstrap.js',
        'public/lib/angular-datatables/dist/plugins/colreorder/angular-datatables.colreorder.js',
        'public/lib/angular-datatables/dist/plugins/columnfilter/angular-datatables.columnfilter.js',
        'public/lib/angular-datatables/dist/plugins/light-columnfilter/angular-datatables.light-columnfilter.js',
        'public/lib/angular-datatables/dist/plugins/colvis/angular-datatables.colvis.js',
        'public/lib/angular-datatables/dist/plugins/fixedcolumns/angular-datatables.fixedcolumns.js',
        'public/lib/angular-datatables/dist/plugins/fixedheader/angular-datatables.fixedheader.js',
        'public/lib/angular-datatables/dist/plugins/scroller/angular-datatables.scroller.js',
        'public/lib/angular-datatables/dist/plugins/tabletools/angular-datatables.tabletools.js',
        'public/lib/angular-datatables/dist/plugins/buttons/angular-datatables.buttons.js',
        'public/lib/angular-datatables/dist/plugins/select/angular-datatables.select.js',
        'public/lib/angular-native-dragdrop/draganddrop.js',
        'public/lib/jsPlumb/dist/js/jsPlumb-2.0.5.js',
        'public/lib/moment/moment.js',
        'public/lib/angular-moment/angular-moment.js',
        'public/lib/angular-gantt/assets/angular-gantt.js',
        'public/lib/angular-gantt/assets/angular-gantt-plugins.js',
        'public/lib/angular-simple-logger/dist/angular-simple-logger.js',
        'public/lib/lodash/lodash.js',
        'public/lib/angular-google-maps/dist/angular-google-maps.js',
        'public/lib/angular-messages/angular-messages.js',
        'public/lib/angular-material/angular-material.js',
        'public/lib/d3/d3.js',
        'public/lib/nvd3/build/nv.d3.js',
        'public/lib/angular-nvd3/dist/angular-nvd3.js',
        'public/lib/angular-resource/angular-resource.js',
        'public/lib/angular-sanitize/angular-sanitize.js',
        'public/lib/humanize-duration/humanize-duration.js',
        'public/lib/angular-timer/dist/angular-timer.js',
        'public/lib/angular-translate/angular-translate.js',
        'public/lib/angular-translate-loader-partial/angular-translate-loader-partial.js',
        'public/lib/fullcalendar/dist/fullcalendar.js',
        'public/lib/angular-ui-calendar/src/calendar.js',
        'public/lib/angular-ui-router/release/angular-ui-router.js',
        'public/lib/jquery-ui/jquery-ui.js',
        'public/lib/angular-ui-sortable/sortable.js',
        'public/lib/angular-ui-tree/dist/angular-ui-tree.js',
        'public/lib/angular-xeditable/dist/js/xeditable.js',
        'public/lib/c3/c3.js',
        'public/lib/c3-angular/c3-angular.min.js',
        'public/lib/css-element-queries/src/ElementQueries.js',
        'public/lib/css-element-queries/src/ResizeSensor.js',
        'public/lib/datatables/media/js/jquery.dataTables.js',
        'public/lib/datatables-responsive/js/dataTables.responsive.js',
        'public/lib/highlightjs/highlight.pack.js',
        'public/lib/ev-emitter/ev-emitter.js',
        'public/lib/imagesloaded/imagesloaded.js',
        'public/lib/jqueryui-touch-punch/jquery.ui.touch-punch.min.js',
        'public/lib/mobile-detect/mobile-detect.js',
        'public/lib/moment-picker/dist/angular-moment-picker.min.js',
        'public/lib/moment-range/dist/moment-range.js',
        'public/lib/flow.js/dist/flow.js',
        'public/lib/ng-flow/dist/ng-flow.js',
        'public/lib/perfect-scrollbar/js/perfect-scrollbar.js',
        'public/lib/Sortable/Sortable.js',
        'public/lib/Sortable/ng-sortable.js',
        'public/lib/rangy/rangy-core.js',
        'public/lib/rangy/rangy-classapplier.js',
        'public/lib/rangy/rangy-highlighter.js',
        'public/lib/rangy/rangy-selectionsaverestore.js',
        'public/lib/rangy/rangy-serializer.js',
        'public/lib/rangy/rangy-textrange.js',
        'public/lib/textAngular/dist/textAngular.js',
        'public/lib/textAngular/dist/textAngular-sanitize.js',
        'public/lib/textAngular/dist/textAngularSetup.js',
        'public/lib/angular-touch/angular-touch.js',
        'public/lib/wip-image-zoom/dist/wip-image-zoom.js',
        '//maps.googleapis.com/maps/api/js?key=AIzaSyDgxlpA4sdSzSFFC1iitqzJ_wRe0hdsdDg&libraries=places',
        'public/lib/vsGoogleAutocomplete/dist/vs-google-autocomplete.js'
      ],
      cssSite: [
        'public/lib/bootstrap/dist/css/bootstrap.css',
        'public/lib/font-awesome/css/font-awesome.css',
      ],
      jsSite: [
        'public/lib/bootstrap/dist/js/bootstrap.js',
        'public/lib/angular-spinner/dist/angular-spinner.js',
        'public/lib/angular-addthis/dist/angular-addthis.js',
        '//developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js',
        '//maps.googleapis.com/maps/api/js?key=AIzaSyDgxlpA4sdSzSFFC1iitqzJ_wRe0hdsdDg&libraries=places',
        'public/lib/easy-markerwithlabel/src/markerwithlabel.js',
      ],
      tests: ['public/lib/angular-mocks/angular-mocks.js']
    },
    cssCommon: [
      'modules/*/client/common/{css,less,scss}/*.css',
      'modules/*/client/common/{css,less,scss}/**/*.css'
    ],
    cssAdmin: [
      'modules/*/client/admin/{css,less,scss}/*.css',
      'modules/*/client/admin/{css,less,scss}/**/*.css'
    ],
    cssSite: [
      'modules/*/client/site/{css,less,scss}/*.css',
      'modules/*/client/site/{css,less,scss}/**/*.css'
    ],
    lessCommon: [
      'modules/*/client/common/less/*.less',
      'modules/*/client/common/less/**/*.less'
    ],
    lessAdmin: [
      'modules/*/client/admin/less/*.less',
      'modules/*/client/admin/less/**/*.less'
    ],
    lessSite: [
      'modules/*/client/site/less/*.less',
      'modules/*/client/site/less/**/*.less'
    ],
    sassCommon: [
      'modules/*/client/common/scss/*.scss',
      'modules/*/client/common/scss/**/*.scss'
    ],
    sassAdmin: [
      'modules/*/client/admin/scss/*.scss'
    ],
    sassSite: [
      'modules/*/client/site/scss/*.scss',
      'modules/*/client/site/scss/**/*.scss'
    ],
    js: [
      'modules/core/client/app/*.js'
    ],
    jsCommon: [
      'modules/*/client/common/*.js',
      'modules/*/client/common/**/*.js'
    ],
    jsAdmin: [
      'modules/*/client/admin/*.js',
      'modules/*/client/admin/**/*.js'
    ],
    jsSite: [
      'modules/*/client/site/*.js',
      'modules/*/client/site/**/*.js'
    ],
    imgCommon: [
      'modules/*/common/img/**/*.jpg',
      'modules/*/common/img/**/*.png',
      'modules/*/common/img/**/*.gif',
      'modules/*/common/img/**/*.svg'
    ],
    imgAdmin: [
      'modules/*/admin/img/**/*.jpg',
      'modules/*/admin/img/**/*.png',
      'modules/*/admin/img/**/*.gif',
      'modules/*/admin/img/**/*.svg'
    ],
    imgSite: [
      'modules/*/site/img/**/*.jpg',
      'modules/*/site/img/**/*.png',
      'modules/*/site/img/**/*.gif',
      'modules/*/site/img/**/*.svg'
    ],
    viewsCommon: ['modules/*/client/common/views/**/*.html'],
    viewsAdmin: ['modules/*/client/admin/views/**/*.html'],
    viewsSite: ['modules/*/client/site/views/**/*.html'],
    templates: ['build/templates.js']
  },
  server: {
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
