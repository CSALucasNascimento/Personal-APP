(function () {
  'use strict';

  angular
    .module('users.admin.controllers')
    .controller('UserController', UserController);

  UserController.$inject = ['$scope', '$state', '$window', 'Authentication', 'userResolve'];  // , 'Notification'

  function UserController($scope, $state, $window, Authentication, user) {  // , Notification
    var vm = this;

    vm.authentication = Authentication;
    vm.user = user;
    // vm.remove = remove;
    // vm.update = update;
    // vm.isContextUserSelf = isContextUserSelf;

    vm.saveUser = saveUser;
    vm.isFormValid = isFormValid;
    vm.toggle = toggle;
    vm.exists = exists;
    vm.roles = ['admin', 'user'];

    /**
     * Save product
     */
    function saveUser() {
      vm.user.createOrUpdate()
        .then(function (res) {
          console.log(res);
        })
        .catch(function (res) {
          console.log(res);
        });
    }

    /**
     * Checks if the given form valid
     *
     * @param formName
     */
    function isFormValid(formName) {
      if ($scope[formName] && $scope[formName].$valid) {
        return $scope[formName].$valid;
      }
    }

    /**
     * Toggle function select checkbok
     */
    function toggle(item, list) {
      var idx = list.indexOf(item);
      if (idx > -1) {
        list.splice(idx, 1);
      } else {
        list.push(item);
      }
    }

    function exists(item, list) {
      return list.indexOf(item) > -1;
    }


    // function remove(user) {
    //   if ($window.confirm('Are you sure you want to delete this user?')) {
    //     if (user) {
    //       user.$remove();

    //       vm.users.splice(vm.users.indexOf(user), 1);
    //       Notification.success('User deleted successfully!');
    //     } else {
    //       vm.user.$remove(function () {
    //         $state.go('admin.users');
    //         Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> User deleted successfully!' });
    //       });
    //     }
    //   }
    // }

    // function update(isValid) {
    //   if (!isValid) {
    //     $scope.$broadcast('show-errors-check-validity', 'vm.userForm');

    //     return false;
    //   }

    //   var user = vm.user;

    //   user.$update(function () {
    //     $state.go('admin.user', {
    //       userId: user._id
    //     });
    //     Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> User saved successfully!' });
    //   }, function (errorResponse) {
    //     Notification.error({ message: errorResponse.data.message, title: '<i class="glyphicon glyphicon-remove"></i> User update error!' });
    //   });
    // }

    // function isContextUserSelf() {
    //   return vm.user.username === vm.authentication.user.username;
    // }
  }
}());
