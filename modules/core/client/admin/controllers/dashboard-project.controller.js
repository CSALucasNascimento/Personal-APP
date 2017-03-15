(function () {
  'use strict';

  angular
    .module('core.admin.controllers')
    .controller('DashboardProjectController', DashboardProjectController);

  /** @ngInject */
  function DashboardProjectController($scope, $interval, $mdSidenav) {
    var vm = this;

    // Data
    vm.projects = [{ 'name': 'Space Now' }];

    // Widget 1
    vm.widget1 = {
      'ranges': {
        'DY': 'Yesterday',
        'DT': 'Today',
        'DTM': 'Tomorrow'
      },
      'currentRange': 'DT',
      'data': {
        'label': 'DUE TASKS',
        'count': {
          'DY': 21,
          'DT': 25,
          'DTM': 19
        },
        'extra': {
          'label': 'Completed',
          'count': {
            'DY': 6,
            'DT': 7,
            'DTM': '-'
          }
        }
      },
      'detail': 'You can show some detailed information about this widget in here.'
    };
  }

}());
