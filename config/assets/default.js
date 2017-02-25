'use strict';

/* eslint comma-dangle:[0, "only-multiline"] */

module.exports = {
  client: {
    lib: {
      css: [
        // bower:css
        '//fonts.googleapis.com/icon?family=Material+Icons',
        '//fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic',
        'public/lib/bootstrap/dist/css/bootstrap.css',
        'public/lib/bootstrap/dist/css/bootstrap-theme.css',
        'public/lib/angular-ui-notification/dist/angular-ui-notification.css',
        'public/lib/angular-material/angular-material.css',
        'public/lib/mdPickers/dist/mdPickers.css',
        'public/lib/perfect-scrollbar/css/perfect-scrollbar.css',
        // endbower
      ],
      js: [
        // bower:js
        'public/lib/angular/angular.js',
        'public/lib/angular-animate/angular-animate.js',
        'public/lib/angular-aria/angular-aria.js',
        'public/lib/angular-material/angular-material.js',
        'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
        'public/lib/ng-file-upload/ng-file-upload.js',
        'public/lib/angular-messages/angular-messages.js',
        'public/lib/angular-mocks/angular-mocks.js',
        'public/lib/angular-resource/angular-resource.js',
        'public/lib/angular-ui-notification/dist/angular-ui-notification.js',
        'public/lib/angular-ui-router/release/angular-ui-router.js',
        'public/lib/owasp-password-strength-test/owasp-password-strength-test.js',
        'public/lib/moment/moment.js',
        'public/lib/mdPickers/dist/mdPickers.js',
        '//maps.googleapis.com/maps/api/js?key=AIzaSyA3egQrxpITfJ27ZdOxxNvyZcMkGh9XjTQ',
        'public/lib/perfect-scrollbar/js/perfect-scrollbar.js',
        'public/lib/mobile-detect/mobile-detect.js'
        // endbower
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
      'modules/*/client/common/less/*.less'
    ],
    lessAdmin: [
      'modules/*/client/admin/less/*.less'
    ],
    lessSite: [
      'modules/*/client/site/less/*.less'
    ],
    sassCommon: [
      'modules/*/client/common/scss/*.scss',
      'modules/*/client/common/scss/**/*.scss'
    ],
    sassAdmin: [
      'modules/*/client/admin/scss/*.scss'
    ],
    sassSite: [
      'modules/*/client/site/scss/*.scss'
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
