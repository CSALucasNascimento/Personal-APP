(function () {
  'use strict';

  angular
    .module('amenities.admin.controllers')
    .config(['$mdIconProvider', function($mdIconProvider) {
      $mdIconProvider.icon('md-close', 'modules/core/client/common/assets/angular-material-assets/img/icons/ic_close_24px.svg', 24);
    }])
    .controller('AmenitiesAdminController', AmenitiesAdminController);

  AmenitiesAdminController.$inject = ['$scope', '$state', '$window', 'amenityResolve', 'Authentication'];

  function AmenitiesAdminController($scope, $state, $window, amenity, Authentication) {
    var vm = this;

    vm.amenity = amenity;
    vm.amenity.tags = [];
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Article
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.amenity.$remove(function() {
          $state.go('admin.amenities.list');
        });
      }
    }

    // Save Amenity
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', '$scope.basicAmenityForm');
        return false;
      }

      // Create a new amenity, or update the current instance
      vm.amenity.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.amenities.list'); // should we send the User to the list or the updated Article's view?
      }

      function errorCallback(res) {
        res.data.message;
      }
    }
  }
}());
