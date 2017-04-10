(function () {
  'use strict';

  angular
    .module('listings.admin.controllers')
    .controller('ListingsAdminOrdinationController', ListingsAdminOrdinationController);

  ListingsAdminOrdinationController.$inject = ['$state', 'listingOrdinationResolve'];

  function ListingsAdminOrdinationController($state, listingOrdinationResolve) {
    var vm = this;

    vm.listings = listingOrdinationResolve;

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
              if (data === '10') {
                return '<div class="layout-align-start-start layout-row"><i class="icon-star s16" style="color: #4CAF50"></i><span>Featured</span></div>';
              }

              if (data === '20') {
                return '<div class="layout-align-start-start layout-row"><i class="icon-star s16" style="color: #FFC107"></i><span>Level 2</span></div>';
              }

              if (data === '30') {
                return '<div class="layout-align-start-start layout-row"><i class="icon-star s16" style="color: #2196f3"></i><span>Level 3</span></div>';
              }

              if (data === '40') {
                return '<div class="layout-align-start-start layout-row"><i class="icon-star s16" style="color: #F44336"></i><span>Level 4</span></div>';
              }

              return '<div class="layout-align-start-start layout-row"><i class="icon-star s16" style="color: #F4F4F4"></i><span>Standard</span></div>';
            }

            if (type === 'filter') {
              if (data === '10') {
                return '10';
              }

              if (data === '20') {
                return '20';
              }

              if (data === '30') {
                return '30';
              }

              if (data === '40') {
                return '40';
              }

              return '100';
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
