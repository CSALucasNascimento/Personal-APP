(function () {
  'use strict';

  angular
    .module('amenities.admin.controllers')
    .controller('AmenitiesAdminListController', AmenitiesAdminListController);

  AmenitiesAdminListController.$inject = ['$state', 'AmenitiesService'];

  function AmenitiesAdminListController($state, AmenitiesService) {
    var vm = this;

    vm.amenities = AmenitiesService.query();

    vm.dtOptions = {
      dom: 'rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
      pagingType: 'simple',
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
