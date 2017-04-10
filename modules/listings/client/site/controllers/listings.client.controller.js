(function () {
  'use strict';

  // Listings controller
  angular
    .module('listings.site.controllers')
    .controller('ListingsController', ListingsController);

  ListingsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'listingResolve', 'categoryListResolve', 'amenityListResolve', '$timeout', 'Upload'];

  function ListingsController ($scope, $state, $window, Authentication, listingResolve, categoryListResolve, amenityListResolve, $timeout, $upload) {
    var vm = this;

    vm.authentication = Authentication;
    vm.listing = listingResolve;
    vm.listingToUploadImage = {};
    vm.categoriesList = categoryListResolve;
    vm.amenitiesList = amenityListResolve;
    vm.isSave = false;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.removeListingImage = removeListingImage;
    vm.save = save;
    vm.upload = upload;
    vm.increaseParkingFunction = increaseParkingFunction;
    vm.decreaseParkingFunction = decreaseParkingFunction;
    vm.increaseBoardRoomsFunction = increaseBoardRoomsFunction;
    vm.decreaseBoardRoomsFunction = decreaseBoardRoomsFunction;
    vm.increaseDesksFunction = increaseDesksFunction;
    vm.decreaseDesksFunction = decreaseDesksFunction;
    vm.setFeaturedImage = setFeaturedImage;
    vm.listing.parking = vm.listing.parking || 0;
    vm.listing.boardrooms = vm.listing.boardrooms || 0;
    vm.listing.desks = vm.listing.desks || 0;
    vm.progress = 0;

    function increaseParkingFunction(val) {
      vm.listing.parking = parseFloat(val) + 1;
    }
    function decreaseParkingFunction(val) {
      vm.listing.parking = parseFloat(val) - 1;
    }

    function increaseBoardRoomsFunction(val) {
      vm.listing.boardrooms = parseFloat(val) + 1;
    }
    function decreaseBoardRoomsFunction(val) {
      vm.listing.boardrooms = parseFloat(val) - 1;
    }

    function increaseDesksFunction(val) {
      vm.listing.desks = parseFloat(val) + 1;
    }
    function decreaseDesksFunction(val) {
      vm.listing.desks = parseFloat(val) - 1;
    }

    function upload (files) {
      vm.success = vm.error = null;
      vm.listingToUploadImage.streetNumber = vm.listing.address.streetNumber;
      vm.listingToUploadImage.streetName = vm.listing.address.streetName;
      vm.listingToUploadImage.category = vm.listing.category[0] ? vm.listing.category[0].name : vm.listing.category.name;
      vm.listingToUploadImage.suburb = vm.listing.address.suburb;
      if (files && files.length) {
        for (var i = 0; i < files.length; i++) {
          $upload.upload({
            url: 'api/media/upload/',
            data: {
              listing: vm.listingToUploadImage,
              url: files[i]
            }
          }).then(function (resp) {
            $timeout(function () {
              onSuccessItem(resp.data);
            });
          }, function (resp) {
            console.log('Error status: ' + resp.status);
          }, function (evt) {
            vm.progress = parseInt(100.0 * evt.loaded / evt.total, 10);
          });
        }
      }
    }

    function onSuccessItem(resp) {
      if (typeof vm.listing.galleryImage === 'undefined') {
        var galleryImage = [];
        vm.listing.galleryImage = galleryImage;
      }
      if (typeof vm.listing.featuredImage === 'undefined')
        vm.listing.featuredImage = resp._id;
      vm.listing.galleryImage.push(resp);
      $scope.infoValidatedImages = vm.listing.galleryImage !== 'undefined' ? vm.listing.galleryImage.length > 2 : false;
    }

    // Remove Listing's image
    function setFeaturedImage(pic) {
      vm.listing.featuredImage = pic._id;
      console.log(pic._id);
    }

    // Remove Listing's image
    function removeListingImage(pic) {
      var index = vm.listing.galleryImage.indexOf(pic);
      vm.listing.galleryImage.splice(index, 1);
      $scope.infoValidatedImages = vm.listing.galleryImage !== 'undefined' ? vm.listing.galleryImage.length > 2 : false;
    }

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
        // vm.listing;
      }

      function successCallback(res) {
        $state.go('profileFromListing');
        // $state.go('listings.create.user.profile', {
          // listingId: res._id
        // });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }

    $scope.$watchGroup(['vm.listing.fulladdress', 'vm.listing.address.streetNumber', 'vm.listing.address.suburb', 'vm.listing.address.state', 'vm.listing.address.postCode'], function (newVal) {
      $scope.infoValidatedAddress = validateInfo(newVal);
    });

    $scope.$watchGroup(['vm.listing.desks'], function (newVal) {
      $scope.infoValidatedHowMany = validateInfo(newVal);
    });

    $scope.$watchGroup(['vm.listing.category', 'vm.listing.price', 'vm.listing.period'], function (newVal) {
      $scope.infoValidatedAboutSpace = validateInfo(newVal);
    });

    $scope.$watchGroup(['vm.listing.title', 'vm.listing.description'], function (newVal) {
      $scope.infoValidatedDescription = validateInfo(newVal);
    });

    var validateInfo = function (newVal) {
      if (newVal.length > 0) {
        for (var i = 0, l = newVal.length; i < l; i++) {
          if (newVal[i] === undefined || newVal[i] === 0 || newVal[i] === '') {
            return false;
          }
        }
        return true;
      }
      return false;
    };

  }
}());
