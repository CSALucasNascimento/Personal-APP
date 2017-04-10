(function () {
  'use strict';

  // Listings controller
  angular
    .module('listings.site.controllers')
    .controller('RedirectListingsViewController', RedirectListingsViewController);

  RedirectListingsViewController.$inject = ['$state', 'Authentication', 'listingResolve', '$rootScope'];

  function RedirectListingsViewController ($state, Authentication, listingResolve, $rootScope) {
    var vm = this;

    vm.authentication = Authentication;
    vm.listing = listingResolve;

    $state.go('listings.view', { listingId: vm.listing._id, streetName: $rootScope.slugify(vm.listing.address.streetName), category: $rootScope.slugify(vm.listing.category[0].name), suburb: $rootScope.slugify(vm.listing.address.suburb) });

  }
}());
