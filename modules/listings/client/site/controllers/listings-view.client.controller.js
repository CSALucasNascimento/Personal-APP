(function () {
  'use strict';

  // Listings controller
  angular
    .module('listings.site.controllers')
    .controller('ListingsViewController', ListingsViewController);

  ListingsViewController.$inject = ['$scope', '$state', '$window', 'Authentication', 'listingResolve', 'listingSimilarResolve', 'listingSaveResolve', 'listingUnsaveResolve', 'categoryListResolve', 'amenityListResolve', '$meta'];

  function ListingsViewController ($scope, $state, $window, Authentication, listingResolve, listingSimilarResolve, listingSaveResolve, listingUnsaveResolve, categoryListResolve, amenityListResolve, $meta) {
    var vm = this;

    vm.authentication = Authentication;
    vm.listing = listingResolve;
    vm.listingsToPOAMAP = ['58a3e6ec225916527f1db87a', '58a3d4b47b24d7be6e81f461', '58a3c6d382090b726f46e2f1', '58a3bfa782090b726f46e2ea', '58b4bbd3f6457f575701b98a', '58b4ccf1f6457f575701b9ac', '58b4cc4cf6457f575701b9a6', '58b4c14af6457f575701b993'];
    vm.listingSimilar = listingSimilarResolve;
    vm.listingsSave = listingSaveResolve;
    vm.listingsUnsave = listingUnsaveResolve;
    vm.categoriesList = categoryListResolve;
    vm.amenitiesList = amenityListResolve;
    vm.isSave = false;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.setSave = setSave;
    vm.setUnsave = setUnsave;
    // vm.account = accountResolve.get({ userId: vm.listing.user._id });

    var latLon;
    var map;
    var places;
    var infoWindow;
    var markers = [];
    var hostnameRegexp = new RegExp('^https?://.+?/');

    vm.searchType = searchType;
    vm.clearMarkers = clearMarkers;
    vm.dropMarker = dropMarker;
    vm.showInfoWindow = showInfoWindow;
    vm.buildIWContent = buildIWContent;

    var siteurl = 'http://www.spacenow.com.au/';

    // Remove existing Listing
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.listing.$remove($state.go('listings.list'));
      }
    }

    // Save Listing
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.listingForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.listing._id) {
        vm.listing.$update(successCallback, errorCallback);
      } else {
        vm.listing.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('listings.view', {
          listingId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }

    function setSave() {
      vm.isSave = vm.listingsSave.updateSave(vm.listing);
    }

    function setUnsave() {
      vm.isSave = !vm.listingsUnsave.updateUnsave(vm.listing);
    }

    vm.listing.$promise.then(function(result) {

      $meta.setTitle(result.seo.title || result.title);
      $meta.setDescription(result.seo.description.substring(0, 157) + '...' || result.description.substring(0, 157) + '...');
      $meta.setSiteName(result.title);
      $meta.setImage(siteurl + result.images[0].small);

      latLon = { lat: result.address.geo[0], lng: result.address.geo[1] };
      map = new google.maps.Map(document.getElementById('map'), {
        center: latLon,
        scrollwheel: false,
        mapTypeControl: false,
        panControl: false,
        zoom: 16,
        streetViewControl: false
      });

      infoWindow = new google.maps.InfoWindow({
        content: document.getElementById('info-content')
      });

      places = new google.maps.places.PlacesService(map);

      var mainMarker = new google.maps.Marker({
        icon: 'modules/listings/client/img/spacenow-pin-full.png',
        position: latLon,
        map: map,
        title: result.title
      });

      var featuredImage = typeof result.featuredImage !== 'undefined' ? result.images[0].small : 'modules/core/client/img/brand/space-now-logo-white.png';

      var infowindow = new google.maps.InfoWindow({
        content: '<div><img src="' + featuredImage + '" width="50"><strong class="margin-left-10">' + result.title + '</strong></div>'
      });

      google.maps.event.addListener(mainMarker, 'click', function() {
        infowindow.open(map, this);
      });

      vm.searchType('cafe');
    });

    vm.listingSimilar.$promise.then(function(result) {
      result.forEach(function (res) {
        latLon = { lat: res.address.geo[0], lng: res.address.geo[1] };

        infoWindow = new google.maps.InfoWindow({
          content: document.getElementById('info-content')
        });
        var similarMarker = new google.maps.Marker({
          icon: 'modules/listings/client/img/spacenow-pin-half-full.png',
          position: latLon,
          map: map,
          title: res.title
        });
        var featuredImage = typeof res.featuredImage !== 'undefined' ? result.images[0].small : 'modules/core/client/img/brand/space-now-logo-white.png';
        var listingId = res._id;
        var infowindow = new google.maps.InfoWindow();


        similarMarker.contentString = '<div class="container" style="width: 490px; max-width: 490px; min-width: 490px">' +
          '<a data-ui-sref="listings.view({ listingId: ' + listingId + ' })" href="/listings/' + listingId + '">' +
          '<div class="row margin-top-15">' +
          '<div class="col-md-3">' +
          '<img class="pull-left" src="' + featuredImage + '" width="100" height="80">' +
          '</div>' +
          '<div class="col-md-9">' +
          '<div class="row"><div class="col-md-12"><p class="margin-left-5 no-margin-bottom">' + res.title + '</p>' +
          '</div></div>' +
          '<div class="row"><div class="col-md-12"><p class="margin-left-5 no-margin-bottom">' + res.address.unit + '/' + res.address.streetNumber + ' ' + res.address.streetName + '</p>' +
          '</div></div>' +
          '<div class="row"><div class="col-md-12"><p class="margin-left-5 no-margin-bottom">' + res.address.suburb + ', ' + res.address.state + ', ' + res.address.postCode + '</p>' +
          '</div></div>' +
          '<div class="row"><div class="col-md-12"><p class="margin-left-5 no-margin-bottom">AUD $' + res.price + ' per ' + res.period + '</p>' +
          '</div></div>' +
          '<div class="row"><div class="col-md-12"><p class="margin-left-5 no-margin-bottom">' + res.category.name + '</p>' +
          '</div></div>' +
          '</div>' +
          '</div>' +
          '</a>' +
          '</div>';

        google.maps.event.addListener(similarMarker, 'click', function() {
          infowindow.setContent(this.contentString);
          infowindow.open(this.getMap(), this);
        });
      });
    });

    function searchType(selectedNearByType) {
      var search = {
        bounds: map.getBounds(),
        types: [selectedNearByType],
        location: latLon,
        radius: 500
      };

      places.nearbySearch(search, function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          vm.clearMarkers();
          // Create a marker for each hotel found, and
          // assign a letter of the alphabetic to each marker icon.

          for (var i = 0; i < results.length; i++) {
            var image = {
              url: results[i].icon,
              size: new google.maps.Size(40, 40),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(0, 0),
              scaledSize: new google.maps.Size(25, 25)
            };
            markers[i] = new google.maps.Marker({
              position: results[i].geometry.location,
              animation: google.maps.Animation.DROP,
              map: map,
              icon: image,
              title: results[i].name
            });
            // If the user clicks a hotel marker, show the details of that hotel
            // in an info window.
            markers[i].placeResult = results[i];
            google.maps.event.addListener(markers[i], 'click', vm.showInfoWindow);
            setTimeout(vm.dropMarker(i), i * 100);
          }
        }
      });
    }

    function clearMarkers() {
      for (var i = 0; i < markers.length; i++) {
        if (markers[i]) {
          markers[i].setMap(null);
        }
      }
      markers = [];
    }

    function dropMarker(i) {
      return function() {
        markers[i].setMap(map);
      };
    }

    function showInfoWindow() {
      var marker = this;
      places.getDetails({ placeId: marker.placeResult.place_id },
        function(place, status) {
          if (status !== google.maps.places.PlacesServiceStatus.OK) {
            return;
          }
          infoWindow.open(map, marker);
          vm.buildIWContent(place);
        });
    }

    function buildIWContent(place) {
      var imageUrl = 'modules/core/client/img/brand/space-now-logo-white.png';
      if (typeof place.photos !== 'undefined')
        imageUrl = place.photos[0].getUrl({ 'maxWidth': 100, 'maxHeight': 70 });

      document.getElementById('iw-icon').innerHTML = '<img class="thumbnail img-fluid" ' +
        'src="' + imageUrl + '" width="80" height="50"/>';
      document.getElementById('iw-url').innerHTML = '<b><a href="' + place.url +
        '">' + place.name + '</a></b>';
      document.getElementById('iw-address').textContent = place.vicinity;

      if (place.formatted_phone_number) {
        document.getElementById('iw-phone-row').style.display = '';
        document.getElementById('iw-phone').textContent =
          place.formatted_phone_number;
      } else {
        document.getElementById('iw-phone-row').style.display = 'none';
      }

      // Assign a five-star rating to the hotel, using a black star ('&#10029;')
      // to indicate the rating the hotel has earned, and a white star ('&#10025;')
      // for the rating points not achieved.
      if (place.rating) {
        var ratingHtml = '';
        for (var i = 0; i < 5; i++) {
          if (place.rating < (i + 0.5)) {
            ratingHtml += '&#10025;';
          } else {
            ratingHtml += '&#10029;';
          }
          document.getElementById('iw-rating-row').style.display = '';
          document.getElementById('iw-rating').innerHTML = ratingHtml;
        }
      } else {
        document.getElementById('iw-rating-row').style.display = 'none';
      }

      // The regexp isolates the first part of the URL (domain plus subdomain)
      // to give a short URL for displaying in the info window.
      if (place.website) {
        var fullUrl = place.website;
        var website = hostnameRegexp.exec(place.website);
        if (website === null) {
          website = 'http://' + place.website + '/';
          fullUrl = website;
        }
        document.getElementById('iw-website-row').style.display = '';
        document.getElementById('iw-website').textContent = website;
      } else {
        document.getElementById('iw-website-row').style.display = 'none';
      }
    }
  }
}());
