(function () {
  'use strict';

  angular
    .module('medias.admin.controllers')
    .config(['$mdIconProvider', function($mdIconProvider) {
      $mdIconProvider.icon('md-close', 'modules/core/client/common/assets/angular-material-assets/img/icons/ic_close_24px.svg', 24);
    }])
    .controller('MediasAdminController', MediasAdminController);

  MediasAdminController.$inject = ['$scope', '$state', '$window', 'mediaResolve', 'Authentication', 'Notification'];

  function MediasAdminController($scope, $state, $window, media, Authentication, Notification) {
    var vm = this;

    vm.media = media;
    vm.media.tags = [];
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Media
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.media.$remove(function() {
          $state.go('admin.medias.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Media deleted successfully!' });
        });
      }
    }

    // Save Media
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.mediaForm');
        return false;
      }

      // Create a new media, or update the current instance
      vm.media.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.medias.list'); // should we send the User to the list or the updated Media's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Media saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Media save error!' });
      }
    }
  }
}());
