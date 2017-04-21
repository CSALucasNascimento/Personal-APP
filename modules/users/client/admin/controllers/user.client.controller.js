(function () {
  'use strict';

  angular
    .module('users.admin.controllers')
    .controller('UserController', UserController);

  UserController.$inject = ['$scope', '$state', '$window', 'Authentication', 'userResolve'];  // , 'Notification'

  function UserController($scope, $state, $window, Authentication, user) {  // , Notification
    var vm = this;

    greenidJQuery('document').ready(function () {
      greenidUI.setup({
        environment: "test",
        formId: "userForm",
        frameId: "greenid-div",
        country: "usethiscountry",
        registerCallback: onRegister,
        errorCallback: onError,
        sessionCompleteCallback: onSessionComplete,
        sourceAttemptCallback: onSourceAttempt,
        sessionCancelledCallback: onSessionCancel,
        preSubmitValidationCallback: myValidator
      });
    });

    vm.authentication = Authentication;
    vm.user = user;
    // vm.remove = remove;
    // vm.update = update;
    // vm.isContextUserSelf = isContextUserSelf;

    vm.saveUser = saveUser;
    vm.isFormValid = isFormValid;
    vm.toggle = toggle;
    vm.exists = exists;
    vm.uploadComplete = uploadComplete;
    vm.fileSuccess = fileSuccess;
    vm.getProfileImage = getProfileImage;
    vm.beforeEmail = vm.user.email;

    vm.ngFlowOptions = {
      // You can configure the ngFlow from here
      target: '/api/medias',
      chunkSize: 15 * 1024 * 1024,
      maxChunkRetries: 1,
      singleFile: true,
      testChunks: false,
      progressCallbacksInterval: 100
    };
    vm.ngFlow = {
      // ng-flow will be injected into here through its directive
      flow: {}
    };
    vm.dropping = false;

    vm.ourgreenidsetup = ourgreenidsetup;

    $scope.$on('$viewContentLoaded', function() {
      vm.ourgreenidsetup();
    });

    function ourgreenidsetup() {
      greenidUI.setup({
        environment: 'test',
        formId: 'greenid-form',
        frameId: 'greenid-div',
        country: 'usethiscountry',
        registerCallback: saveUser,
        errorCallback: onError,
        sessionCompleteCallback: onSessionComplete,
        sourceAttemptCallback: onSourceAttempt,
        sessionCancelledCallback: onSessionCancel,
        preSubmitValidationCallback: myValidator
      });
    }


    /**
     * ON REGISTERING
     */
    function onRegister() {
      console.log('registered');
    }

    /**
     * ON REGISTERING
     */
    function onError() {
      console.log('error');
    }

    /**
     * ON REGISTERING
     */
    function onSessionComplete() {
      console.log('Session Complete');
    }

    /**
     * ON REGISTERING
     */
    function onSourceAttempt() {
      console.log('Source Attempt');
    }

    /**
     * ON REGISTERING
     */
    function onSessionCancel() {
      console.log('Session Cancel');
    }

    /**
     * ON REGISTERING
     */
    function myValidator() {
      console.log('validator');
    }

    /**
     * Save user
     */
    function saveUser() {
      if (vm.beforeEmail !== vm.user.email) {
        vm.user.verified = false;
      }
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


    function getProfileImage() {
      if (vm.user.profileImage !== null && vm.user.profileImage !== undefined) {
        if (vm.user.profileImage.thumbnail.startsWith('module')) {
          return '/' + vm.user.profileImage.thumbnail;
        } else {
          return vm.user.profileImage.thumbnail;
        }
      } else {
        var imgurl = vm.user.profileImageURL.replace('client/img', 'client/site/img');
        if (imgurl.startsWith('module')) {
          return '/' + imgurl;
        } else {
          return imgurl;
        }
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


    /**
     * File upload success callback
     * Triggers when single upload completed
     *
     * @param file
     * @param message
     */
    function fileSuccess(file, message) {
      var response = angular.fromJson(message);
      vm.user.profileImage = response;
      console.log('file success');
      console.log(vm.user.profileImage);
      // console.log(file);
    }

    /**
     *
     * Triggers when single upload completed
     *
     * @param message
     */
    function uploadComplete(file, message) {
    }
  }
}());
