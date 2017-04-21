(function () {
  'use strict';

  angular
    .module('users.admin.controllers')
    .controller('UserListController', UserListController);

  UserListController.$inject = ['$scope', '$filter', 'userListResolve', '$state'];

  function UserListController($scope, $filter, userListResolve, $state) {
    var vm = this;
    vm.getProfileImage = getProfileImage;

    vm.users = userListResolve;

    vm.dtOptions = {
      dom: 'rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
      columnDefs: [
        {
          // Target the image column
          targets: 0,
          filterable: false,
          sortable: false,
          width: '80px'
        },
        {
          // Target the name column
          targets: 1,
          filterable: true,
          sortable: true
        },
        {
          // Target the username column
          targets: 2,
          filterable: true,
          sortable: true
        },
        {
          // Target the email column
          targets: 3,
          filterable: true,
          sortable: true
        }
      ],
      initComplete: function () {
        var api = this.api(),
          searchBox = angular.element('body').find('#users-search');

        // Bind an external input as a table wide search box
        if (searchBox.length > 0) {
          searchBox.on('keyup', function (event) {
            api.search(event.target.value).draw();
          });
        }
      },
      pagingType: 'simple',
      lengthMenu: [10, 20, 30, 50, 100],
      pageLength: 20,
      scrollY: 'auto',
      responsive: true
    };

    // Methods
    vm.gotoAddUser = gotoAddUser;
    vm.gotoUserDetail = gotoUserDetail;
    vm.gotoUserAdminDetail = gotoUserAdminDetail;
    /**
     * Go to add product
     */
    function gotoAddUser() {
      $state.go('admin.users.create');
    }

    function getProfileImage(user) {
      if (user.profileImage !== null && user.profileImage !== undefined) {
        if (user.profileImage.thumbnail.startsWith('module')) {
          return '/' + user.profileImage.thumbnail;
        } else {
          return user.profileImage.thumbnail;
        }
      } else {
        var imgUrl = user.profileImageURL.replace('client/img', 'client/site/img');
        if (imgUrl.startsWith('module')) {
          return '/' + imgUrl;
        } else {
          return imgUrl;
        }
      }
    }

    /**
     * Go to user detail
     *
     * @param id
     */
    function gotoUserDetail(id) {
      $state.go('admin.user-edit', { userId: id });
    }

    /**
     * Go to user admin detail
     *
     * @param id
     */
    function gotoUserAdminDetail(id) {
      $state.go('admin.userAdmin-edit', { userId: id });
    }
  }
}());
