(function () {
  'use strict';

  angular
    .module('listings.site.controllers')
    .controller('ListingsListController', ListingsListController);

  ListingsListController.$inject = ['$rootScope', '$compile', '$filter', '$scope', 'listingSearchResolve', 'categoryListResolve', 'CategoriesService', '$stateParams'];

  function ListingsListController($rootScope, $compile, $filter, $scope, listingSearchResolve, categoryListResolve, CategoriesService, $stateParams) {
    var vm = this;
    vm.listingsToPOAMAP = ['58a3e6ec225916527f1db87a',
      '58a3d4b47b24d7be6e81f461', '58a3c6d382090b726f46e2f1', '58a3bfa782090b726f46e2ea', '58b4bbd3f6457f575701b98a',
      '58b4ccf1f6457f575701b9ac', '58b4cc4cf6457f575701b9a6', '58b4c14af6457f575701b993', '58bcea28d86fd507066b2840',
      '58bce662d86fd507066b25cb', '58bceba4d86fd507066b2b25', '58bcead8d86fd507066b2976', '58bcecaad86fd507066b2c8e',
      '58bcf13ed86fd507066b31a3', '58bd0c0b04f0f4bd49dd2509', '58bce910d86fd507066b2785'];
    vm.listings = listingSearchResolve;
    vm.categoriesList = categoryListResolve;
    vm.selectedCategory = '';
    vm.itemsPerPage = 16;
    vm.clickedCategory = false;
    vm.setCategory = setCategory;
    vm.setClicked = setClicked;
    vm.cleanMarkers = cleanMarkers;
    vm.categories = CategoriesService.query();
    vm.qLocation = '';
    vm.qCategory = '';
    vm.clicked = false;
    $scope.beginPrevous = 0;
    $scope.endPrevious = 0;

    if ($stateParams.qLocation) {
      vm.qLocation = $stateParams.qLocation;
    }

    if ($stateParams.qCategory) {
      vm.qCategory = $stateParams.qCategory;
    }

    function setCategory(category) {
      vm.qCategory = category.name;
    }

    function setClicked() {
      vm.clicked = !vm.clicked;
    }

    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.mapChanged = mapChanged;
    vm.pageChanged = pageChanged;

    function buildPager() {
      vm.pagedItems = [];
      vm.currentPage = 1;
      vm.previousPage = 0;
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.listListings);
      vm.filterLength = vm.filteredItems.length;
      var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
      var end = begin + vm.itemsPerPage;
      if (end > vm.filterLength)
        end = vm.filterLength;
      vm.pagedItems = vm.filteredItems.slice(begin, end);
      vm.cleanMarkers();
      vm.mapChanged(begin);
      $scope.beginPrevious = begin;
      $scope.endPrevious = end;
    }

    function pageChanged() {
      vm.figureOutItemsToDisplay();
    }

    function mapChanged(begin) {
      vm.marker = [];
      var bounds = new google.maps.LatLngBounds();
      vm.pagedItems.forEach(function (listing) {
        var latLng = new google.maps.LatLng(parseFloat(listing.address.geo[0]), parseFloat(listing.address.geo[1]));
        var markerLabel = returnPrice(listing);
        var imageIcon = 'modules/listings/client/site/assets/img/background_icon_map.png';
        vm.marker[begin] = new MarkerWithLabel({
          map: map,
          position: latLng,
          icon: imageIcon,
          labelContent: markerLabel,
          labelAnchor: new google.maps.Point(40, 25),
          labelClass: "customLabelForPrice"
        });
        bounds.extend(vm.marker[begin].position);
        vm.marker[begin].listing = listing;
        attachMarkerInfoWindow(vm.marker[begin]);
        begin++;
      });
      map.fitBounds(bounds);
    }

    $scope.hideDropdown = function () {
      if (vm.clicked)
        vm.clicked = !vm.clicked;
    };

    var map;

    function attachMarkerInfoWindow(marker) {
      var id = marker.listing._id;
      var title = marker.listing.title;
      var category = marker.listing.category.name;
      var streetName = marker.listing.address.streetName;
      var suburb = marker.listing.address.suburb;
      var state = marker.listing.address.state;
      var image = marker.listing.images[0].thumbnail;
      var iwContent = '<div flex layout="column" style="cursor: pointer" ui-sref="listings.view({ listingId:\'' + id + '\', streetName:\'' + streetName + '\', category:\'' + $rootScope.slugify(category) + '\', suburb:\'' + $rootScope.slugify(suburb) + '\'})">' +
        '<md-card>' +
        '<div style="background: url(\'' + image + '\') center center; background-size: cover; width: 100%; height: 150px; box-shadow: inset 0 0 0 5px #fff;" class="md-card-image img-fluid" alt="' + title + '"></div>' +
        '<md-card-content>' +
        '<p class="no-margin no-padding text-bolder">' + returnPrice(marker.listing) + '</p>' +
        '<p class="no-margin no-padding">' + streetName + '</p>' +
        '<p class="no-margin no-padding">' + suburb + ', ' + state + '</p>' +
        '</md-card-content>' +
        '</md-card>' +
        '</div>';
      var compiledIWContent = $compile(iwContent)($scope);
      var infoWindow = new google.maps.InfoWindow({
        content: compiledIWContent[0]
      });
      marker.addListener('click', function() {
        typeof $scope.infoWindowOpened !== 'undefined' ? $scope.infoWindowOpened.close() : $scope.infoWindowOpened = infoWindow;
        typeof $scope.activeMarker !== 'undefined' ? $scope.activeMarker.set('labelClass', 'customLabelForPrice customLabelVisited') : $scope.activeMarker = marker;
        infoWindow.open(marker.get('map'), marker);
        marker.set('labelClass', 'd-none');
        $scope.infoWindowOpened = infoWindow;
        $scope.activeMarker = marker;
      });

      map.addListener('click', function() {
        if (typeof $scope.activeMarker !== 'undefined')
          $scope.activeMarker.set('labelClass', 'customLabelForPrice customLabelVisited');
        $scope.infoWindowOpened.close();
      });
    }

    function cleanMarkers() {
      for (var i = $scope.beginPrevious; i < $scope.endPrevious; i++) {
        vm.marker[i].setMap(null);
      }
    }

    vm.listings.$promise.then(function (result) {
      vm.listListings = result;
      map = new google.maps.Map(document.getElementById('mapSearch'), {
        center: { lat: -28.024, lng: 140.887 },
        scrollwheel: false,
        mapTypeControl: false,
        panControl: false,
        zoom: 4,
        streetViewControl: false
      });
      vm.buildPager();
    });

    function returnPrice(listing) {
      var method = listing.price.method;
      var details = listing.price.details;
      var poa = listing.poa;
      var displayPrice = '';

      switch (method) {
        case 'hourly':
          displayPrice = '$ ' + details.hourly.perhour + ' AUD ';
          break;
        case 'daily':
          displayPrice = '$ ' + details.daily.perday + ' AUD ';
          break;
        case 'monthly':
          displayPrice = '$ ' + details.monthly.permonth + ' AUD ';
          break;
      }

      if (poa) {
        displayPrice = 'POA';
      }

      return displayPrice;

    }

  }
}());
