(function () {
  'use strict';

  angular
    .module('medias.admin.controllers')
    .config(['$mdIconProvider', function($mdIconProvider) {
      $mdIconProvider.icon('md-close', 'modules/core/client/common/assets/angular-material-assets/img/icons/ic_close_24px.svg', 24);
    }])
    .controller('MediasAdminController', MediasAdminController);

  MediasAdminController.$inject = ['$scope', '$state', '$window', 'mediaResolve', 'Authentication'];

  function MediasAdminController($scope, $state, $window, media, Authentication) {
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
      }

      function errorCallback(res) {
        console.log(res.data.message);
      }
    }
  }
}());
