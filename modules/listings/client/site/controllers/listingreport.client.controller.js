(function () {
  'use strict';

  // Listings controller
  angular
    .module('listings.site.controllers')
    .controller('ListingReportController', ListingReportController);

  ListingReportController.$inject = ['$state', '$http'];

  function ListingReportController ($state, $http) {
    var vm = this;

    vm.listingId = $state.params.listingId;

    vm.sendReport = sendReport;

    function sendReport(text) {

      // $http.put(, successCallback, errorCallback);

      $http({
        method: 'PUT',
        url: '/api/listings/sendReport/' + vm.listingId + '/txt/' + text
      }).then(function successCallback(response) {
        $state.go('listingReportSent');
      }, function errorCallback(response) {
        vm.error = res.data.message;
      });


    }


  }
}());
