(function () {
  'use strict';

  angular
    .module('amenities.admin.controllers')
    .controller('AmenitiesAdminListController', AmenitiesAdminListController);

  AmenitiesAdminListController.$inject = ['$state', 'amenityListResolve'];

  function AmenitiesAdminListController($state, amenityListResolve) {
    var vm = this;

    vm.amenities = amenityListResolve;

    vm.dtInstance = {};
    vm.dtOptions = {
      dom: 'rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
      columnDefs: [
        {
          // Target the id column
          targets: 0,
          width: '72px'
        },
        {
          // Target the image column
          targets: 1,
          filterable: false,
          sortable: false,
          width: '80px'
        },
        {
          // Target the status column
          targets: 3,
          filterable: false,
          render: function (data, type) {
            if (type === 'display') {
              if (data === 'true') {
                return '<i class="icon-checkbox-marked-circle green-500-fg"></i>';
              }

              return '<i class="icon-cancel red-500-fg"></i>';
            }

            if (type === 'filter') {
              if (data) {
                return '1';
              }

              return '0';
            }

            return data;
          }
        },
        {
          // Target the actions column
          targets: 4,
          responsivePriority: 1,
          filterable: false,
          sortable: false
        }
      ],
      initComplete: function () {
        var api = this.api(),
          searchBox = angular.element('body').find('#amenities-search');

        // Bind an external input as a table wide search box
        if (searchBox.length > 0) {
          searchBox.on('keyup', function (event) {
            api.search(event.target.value).draw();
          });
        }
      },
      pagingType: 'simple',
      lengthMenu: [10, 20, 30, 50, 100],
      pageLength: 10,
      scrollY: 'auto',
      responsive: true
    };

    // Methods
    vm.gotoAddAmenity = gotoAddAmenity;
    vm.gotoAmenityDetail = gotoAmenityDetail;

    /**
     * Go to add product
     */
    function gotoAddAmenity() {
      $state.go('admin.amenities.create');
    }

    /**
     * Go to product detail
     *
     * @param id
     */
    function gotoAmenityDetail(id) {
      $state.go('admin.amenities.edit', { amenityId: id });
    }

  }
}());
