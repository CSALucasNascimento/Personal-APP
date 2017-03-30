(function () {
  'use strict';

  angular
    .module('listings.admin.controllers')
    .config(['$mdIconProvider', function ($mdIconProvider) {
      $mdIconProvider.icon('md-close', 'modules/core/client/common/assets/angular-material-assets/img/icons/ic_close_24px.svg', 24);
    }])
    .controller('ListingsDashboardAdminController', ListingsDashboardAdminController);

  ListingsDashboardAdminController.$inject = ['$state', 'listingResolve', 'Authentication'];

  function ListingsDashboardAdminController($state, listing, Authentication) {
    var vm = this;

    // Methods
    vm.listing = listing;
    vm.authentication = Authentication;

    vm.gotoListings = gotoListings;

    /**
     * Go to products page
     */
    function gotoListings() {
      $state.go('admin.listings.list');
    }

  }
}());
