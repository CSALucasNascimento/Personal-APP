(function () {
  'use strict';

  angular
    .module('categories.admin.controllers')
    .config(['$mdIconProvider', function($mdIconProvider) {
      $mdIconProvider.icon('md-close', 'modules/core/client/common/assets/angular-material-assets/img/icons/ic_close_24px.svg', 24);
    }])
    .controller('CategoriesController', CategoriesController);

  CategoriesController.$inject = ['$scope', '$state', '$window', 'Authentication', '$filter', 'categoryResolve', 'categoryListResolve', 'Notification'];

  function CategoriesController ($scope, $state, $window, Authentication, $filter, category, categoryListResolve, Notification) {
    var vm = this;

    vm.category = category;
    vm.authentication = Authentication;
    vm.categoriesList = $filter('filter')(categoryListResolve, '!' + vm.category.name, true);
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Category
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.category.$remove(function() {
          $state.go('admin.categories.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Category deleted successfully!' });
        });
      }
    }

    // Save Category
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.categoryForm');
        return false;
      }

      // TODO: move create/update logic to service
      vm.category.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.categories.list'); // should we send the User to the list or the updated Article's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Category saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Category save error!' });
      }
    }

  }
}());
