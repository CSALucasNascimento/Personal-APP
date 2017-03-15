(function () {
  'use strict';

  angular
    .module('tags.admin.controllers')
    .config(['$mdIconProvider', function($mdIconProvider) {
      $mdIconProvider.icon('md-close', 'modules/core/client/common/assets/angular-material-assets/img/icons/ic_close_24px.svg', 24);
    }])
    .controller('TagsAdminController', TagsAdminController);

  TagsAdminController.$inject = ['$scope', '$state', '$window', 'tagResolve', 'Authentication'];

  function TagsAdminController($scope, $state, $window, tag, Authentication) {
    var vm = this;

    vm.tag = tag;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Tag
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.tag.$remove(function() {
          $state.go('admin.tags.list');
        });
      }
    }

    // Save Tag
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', '$scope.basicTagForm');
        return false;
      }

      // Create a new tag, or update the current instance
      vm.tag.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.tags.list'); // should we send the User to the list or the updated Tag's view?
      }

      function errorCallback(res) {
        res.data.message;
      }
    }
  }
}());
