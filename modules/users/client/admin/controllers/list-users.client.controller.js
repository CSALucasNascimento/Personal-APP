(function () {
  'use strict';

  angular
    .module('users.admin.controllers')
    .controller('UserListController', UserListController);

  UserListController.$inject = ['$scope', '$filter', 'AdminService'];

  function UserListController($scope, $filter, AdminService) {
    var vm = this;
    // vm.buildPager = buildPager;
    // vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    // vm.pageChanged = pageChanged;

    AdminService.query(function (data) {
      vm.users = data;
      // vm.buildPager();
    });

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

    /**
     * Go to add product
     */
    function gotoAddUser() {
      $state.go('admin.users.create');
    }

    /**
     * Go to product detail
     *
     * @param id
     */
    function gotoUserDetail(id) {
      $state.go('admin.users.edit', { userId: id });
    }
    // function buildPager() {
    //   vm.pagedItems = [];
    //   vm.itemsPerPage = 15;
    //   vm.currentPage = 1;
    //   vm.figureOutItemsToDisplay();
    // }

    // function figureOutItemsToDisplay() {
    //   vm.filteredItems = $filter('filter')(vm.users, {
    //     $: vm.search
    //   });
    //   vm.filterLength = vm.filteredItems.length;
    //   var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
    //   var end = begin + vm.itemsPerPage;
    //   vm.pagedItems = vm.filteredItems.slice(begin, end);
    // }

    // function pageChanged() {
    //   vm.figureOutItemsToDisplay();
    // }
  }
}());
