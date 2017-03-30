(function () {
  'use strict';

  angular
    .module('listings.admin.controllers')
    .controller('ListingsAdminPendingController', ListingsAdminPendingController);

  ListingsAdminPendingController.$inject = ['$state', 'listingPendingResolve'];

  function ListingsAdminPendingController($state, listingPendingResolve) {
    var vm = this;

    vm.listings = listingPendingResolve;

    vm.dtInstance = {};
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
          // Target the price column
          targets: 3,
          render: function (data, type) {
            if (type === 'display') {
              return '<div class="layout-align-start-start layout-row">' + '<i class="s16 icon-currency-usd"></i>' + '<span>' + data + '</span>' + '</div>';
            }

            return data;
          }
        },
        {
          // Target the status column
          targets: 4,
          filterable: false,
          render: function (data, type) {
            if (type === 'display') {
              if (data === 'active') {
                return '<i class="icon-checkbox-marked-circle green-500-fg"></i>';
              } else if (data === 'pending approval') {
                return '<i class="icon-minus-circle yellow-500-fg"></i>';
              }

              return '<i class="icon-cancel red-500-fg"></i>';
            }

            return data;
          }
        },
        {
          // Target the status column
          targets: 5,
          filterable: false,
          render: function (data, type) {
            if (type === 'display') {
              if (data === 'true') {
                return '<i class="icon-star amber-600-fg s24"></i>';
              }

              return '<i class="icon-star-outline s24"></i>';
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
          targets: 6,
          responsivePriority: 1,
          filterable: false,
          sortable: false
        }
      ],
      initComplete: function () {
        var api = this.api(),
          searchBox = angular.element('body').find('#listings-search');

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
    vm.gotoAddListing = gotoAddListing;
    vm.gotoListingDetail = gotoListingDetail;

    /**
     * Go to add product
     */
    function gotoAddListing() {
      $state.go('admin.listings.create');
    }

    /**
     * Go to product detail
     *
     * @param id
     */
    function gotoListingDetail(id) {
      $state.go('admin.listings.edit', { listingId: id });
    }

  }
}());
