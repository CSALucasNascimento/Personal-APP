(function () {
  'use strict';

  angular
    .module('listings.admin.controllers')
    .config(['$mdIconProvider', function ($mdIconProvider) {
      $mdIconProvider.icon('md-close', 'modules/core/client/common/assets/angular-material-assets/img/icons/ic_close_24px.svg', 24);
    }])
    .controller('ListingsAdminController', ListingsAdminController);

  ListingsAdminController.$inject = ['$scope', '$state', '$timeout', 'listingResolve', 'categoryResolve', 'amenityResolve', 'Authentication'];

  function ListingsAdminController($scope, $state, $timeout, listing, categories, amenities, Authentication) {
    var vm = this;

    // Methods
    vm.listing = listing;
    vm.categories = categories;
    vm.amenities = amenities;
    vm.authentication = Authentication;

    vm.saveListing = saveListing;
    vm.gotoListings = gotoListings;
    vm.fileAdded = fileAdded;
    vm.upload = upload;
    vm.fileSuccess = fileSuccess;
    vm.uploadComplete = uploadComplete;
    vm.updateImageZoomOptions = updateImageZoomOptions;
    vm.setFeatured = setFeatured;
    vm.isFormValid = isFormValid;
    vm.toggle = toggle;
    vm.exists = exists;
    vm.setListingStatus = setListingStatus;
    vm.setListingFeatured = setListingFeatured;
    vm.setListingFeaturedImage = setListingFeaturedImage;
    vm.setOpeningHours = setOpeningHours;
    vm.listing.amenity = vm.listing.amenity || [];
    vm.listing.images = vm.listing.images || [];
    vm.listing.status = vm.listing.status || 'draft';

    // Data
    vm.taToolbar = [
      ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'quote', 'bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol', 'redo', 'undo', 'clear'],
      ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'indent', 'outdent', 'html', 'insertImage', 'insertLink', 'insertVideo', 'wordcount', 'charcount']
    ];
    vm.categoriesSelectFilter = '';
    vm.ngFlowOptions = {
      // You can configure the ngFlow from here
      target: '/api/medias',
      chunkSize: 15 * 1024 * 1024,
      maxChunkRetries: 1,
      simultaneousUploads: 1,
      testChunks: false,
      progressCallbacksInterval: 100
    };
    vm.ngFlow = {
      // ng-flow will be injected into here through its directive
      flow: {}
    };
    vm.dropping = false;
    vm.imageZoomOptions = {};
    vm.listingStatus = {};
    vm.listingStatusOptions = [
      {
        'title': 'Draft',
        'icon': 'icon-checkbox-blank-circle-outline',
        'color': '#BDBDBD'
      },
      {
        'title': 'Pending Approval',
        'icon': 'icon-clock',
        'color': '#FFC107'
      },
      {
        'title': 'Active',
        'icon': 'icon-checkbox-marked-circle',
        'color': '#4CAF50'
      },
      {
        'title': 'Expired',
        'icon': 'icon-minus-circle',
        'color': '#F44336'
      }
    ];


    /**
     *
     * PRICE
     *
     */
    vm.setOpeningHours = setOpeningHours;
    vm.listing.price = vm.listing.price || {};
    vm.listing.price.details = vm.listing.price.details || {};
    vm.listing.price.method = vm.listing.price.method || 'hourly';
    vm.hourlyPrice = '';
    vm.hourlyPriceHalfDay = '';
    vm.hourlyPriceDay = '';
    vm.dailyPrice = '';
    vm.monthlyPrice = '';
    vm.monthlyPriceTrimester = '';
    vm.monthlyPriceSemester = '';
    vm.monthlyPriceYear = '';
    vm.minimumTermHours = 1;
    vm.minimumTermDays = 1;
    vm.minimumTermMonths = 1;
    vm.minimumTermPerHour = [
      {
        value: 1,
        display: '1 Hour'
      },
      {
        value: 2,
        display: '2 Hours'
      },
      {
        value: 3,
        display: '3 Hours'
      },
      {
        value: 4,
        display: '4 Hours'
      }];
    vm.minimumTermPerDay = [
      {
        value: 1,
        display: '1 Day'
      },
      {
        value: 2,
        display: '2 Days'
      },
      {
        value: 3,
        display: '3 Days'
      },
      {
        value: 4,
        display: '4 Days'
      },
      {
        value: 5,
        display: '5 Days'
      },
      {
        value: 10,
        display: '10 Days'
      },
      {
        value: 15,
        display: '15 Days'
      },
      {
        value: 20,
        display: '20 Days'
      }
    ];
    vm.minimumTermPerMonth = [
      {
        value: 1,
        display: '1 Month'
      },
      {
        value: 3,
        display: '3 Months'
      },
      {
        value: 6,
        display: '6 Months'
      },
      {
        value: 12,
        display: '12 Months'
      }
    ];

    /**
     *
     * HOURS SET
     *
     */
    vm.startTime = new Date();
    vm.startTime.setHours(9, 0, 0, 0);
    vm.endTime = new Date();
    vm.endTime.setHours(17, 0, 0, 0);
    vm.minStartTime = moment({ hour: 0, minute: 0 }).format('H:mm');
    vm.minEndTime = moment({ hour: 1, minute: 0 }).format('H:mm');
    vm.maxStartTime = moment({ hour: 23, minute: 0 }).format('H:mm');
    vm.maxEndTime = moment({ hour: 23, minute: 59 }).format('H:mm');

    /**
     *
     * AVAILABILITY
     *
     */
    vm.weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    vm.statusDay = {};
    vm.statusDay.exception = vm.statusDay.exception === 'Closed' ? 'Open' : 'Closed';
    vm.weekDays.forEach(function(wd) {
      if (wd === 'Sun') {
        vm.startTime[wd] = new Date();
        vm.endTime[wd] = new Date();
        vm.startTime[wd].setHours(0, 0, 0, 0);
        vm.endTime[wd].setHours(0, 0, 0, 0);
        vm.statusDay[wd] = 'Closed';
      } else {
        vm.startTime[wd] = new Date();
        vm.endTime[wd] = new Date();
        vm.startTime[wd].setHours(9, 0, 0, 0);
        vm.endTime[wd].setHours(17, 0, 0, 0);
        vm.statusDay[wd] = 'Open';
      }
    });
    vm.setAvailability = setAvailability;
    vm.blockExceptionDates = blockExceptionDates;

    /**
     *
     * EXCEPTIONS
     *
     */
    vm.listing.exception = vm.listing.exception || [];
    vm.dateException = new Date();
    var exceptionDates = [new Date(2017, 0, 25).toLocaleDateString(), new Date(2017, 1, 9).toLocaleDateString()];
    vm.addException = addException;

    init();

    /**
     * Initialize
     */
    function init() {

      setListingStatus(vm.listing.status);
      if (vm.listing._id)
        if (vm.listing.images.length > 0)
        {
          vm.updateImageZoomOptions(vm.listing.images[0].large);
        }

    }

    /**
     * Toggle function select checkbok
     */
    function toggle(item, list) {
      var idx = list.indexOf(item._id);
      if (idx > -1) {
        list.splice(idx, 1);
      } else {
        list.push(item._id);
      }
    }

    function exists(item, list) {
      return list.indexOf(item._id) > -1;
    }

    /**
     * Sets Listing Status
     * @param status
     */
    function setListingStatus(status) {
      vm.listingStatusOptions.forEach(function(statusOpt) {
        if (statusOpt.title.toLowerCase() === status || statusOpt.title === status.title) {
          vm.listing.status = statusOpt.title.toLowerCase();
          vm.listingStatus = statusOpt;
        }
      });
    }

    /**
     * Sets Listing Featured
     */
    function setListingFeatured() {
      vm.listing.featured = !vm.listing.featured;
    }

    /**
     * Sets Listing Featured Image
     * @param file
     */
    function setListingFeaturedImage(image) {
      var idx = vm.listing.images.indexOf(image);
      var aux;
      if (idx !== 0) {
        aux = vm.listing.images[0];
        vm.listing.images[0] = vm.listing.images[idx];
        vm.listing.images[idx] = aux;
      }
    }

    /**
     *
     * Specifications - Set Up Opening Hours
     *
     */
    function setOpeningHours() {
      resetOpeningHours();
    }

    /**
     *
     * Exception for Days, Weeks and Months
     *
     */
    function addException() {
      vm.exception = {};
      vm.exception.from = vm.dateException;
      vm.exception.to = vm.dateException;
      vm.exception.status = vm.statusDay.exception;
      vm.exception.description = vm.statusDay.description;
      if (vm.statusDay.exception === "Open") {
        vm.exception.open = 0;
        vm.exception.close = 1440;
        vm.exception.description = vm.exception.description || "Open";
      } else {
        vm.exception.open = 0;
        vm.exception.close = 0;
        vm.exception.description = vm.exception.description || "Closed";
      }
      exceptionDates.push(vm.dateException.toLocaleDateString());
      vm.listing.exception.push(vm.exception);
    }

    /**
     *
     * Block Days defined by exception
     *
     */
    function blockExceptionDates(date) {
      return exceptionDates.indexOf(date.toLocaleDateString()) === -1;
    }

    /**
     *
     * Specifications - Set Up Availability
     *
     */
    function setAvailability() {
      vm.listing.availability = vm.listing.availability || {};
      $scope.weekDays.forEach(function(wd) {
        vm.listing.availability[wd.toLowerCase()] = {};
        if (vm.statusDay[wd] === 'Closed') {
          vm.listing.availability[wd.toLowerCase()].open = 0;
          vm.listing.availability[wd.toLowerCase()].close = 0;
        } else {
          vm.listing.availability[wd.toLowerCase()].open = calcTimeMinutes(vm.startTime[wd].toLocaleTimeString([], {hour: "2-digit", minute:"2-digit"}));
          vm.listing.availability[wd.toLowerCase()].close = calcTimeMinutes(vm.endTime[wd].toLocaleTimeString([], {hour: "2-digit", minute:"2-digit"}));
        }
        vm.listing.availability[wd.toLowerCase()].description = vm.statusDay[wd];
      });
    }

    /**
     *
     * Specifications - Reset Opening Hours
     *
     */
    function resetOpeningHours() {
      vm.listing.price.details.hourly = {};
      vm.listing.price.details.daily = {};
      vm.listing.price.details.monthly = {};
    }

    /**
     * Save product
     */
    function saveListing() {
      vm.listing.createOrUpdate()
        .then(function (res) {
          console.log(res);
        })
        .catch(function (res) {
          console.log(res);
        });
    }

    /**
     * Go to products page
     */
    function gotoListings() {
      $state.go('admin.listings.list');
    }

    /**
     * Checks if the given form valid
     *
     * @param formName
     */
    function isFormValid(formName) {
      if ($scope[formName] && $scope[formName].$valid) {
        return $scope[formName].$valid;
      }
    }

    /**
     * File added callback
     * Triggers when files added to the uploader
     *
     * @param file
     */
    function fileAdded(file) {
      // Prepare the temp file data for media list
      var uploadingFile = {
        id: file.uniqueIdentifier,
        file: file,
        type: 'uploading'
      };

      // Append it to the media list
      vm.listing.images.unshift(uploadingFile);
    }

    /**
     * Upload
     * Automatically triggers when files added to the uploader
     */
    function upload() {
      // Set headers
      vm.ngFlow.flow.opts.headers = {
        'X-Requested-With': 'XMLHttpRequest'
        // 'X-XSRF-TOKEN'    : $cookies.get('XSRF-TOKEN')
      };

      vm.ngFlow.flow.upload();
    }

    /**
     * File upload success callback
     * Triggers when single upload completed
     *
     * @param file
     * @param message
     */
    function fileSuccess(file, message) {
      var response = angular.fromJson(message);
      angular.forEach(vm.listing.images, function (media, index) {
        if (media.id === file.uniqueIdentifier) {
          vm.listing.images[index] = response;
          var fileReader = new FileReader();
          fileReader.readAsDataURL(media.file.file);
          fileReader.onload = function (event) {
            media.url = event.target.result;
          };

          // Update the image type so the overlay can go away
          media.type = 'image';
        }
      });
    }

    /**
     *
     * Triggers when single upload completed
     *
     * @param message
     */
    function uploadComplete() {
    }

    /**
     * Update image zoom options
     *
     * @param url
     */
    function updateImageZoomOptions(url) {
      vm.imageZoomOptions = {
        images: [
          {
            thumb: 'http://localhost:3000/' + url,
            medium: 'http://localhost:3000/' + url,
            large: 'http://localhost:3000/' + url
          }
        ]
      };
    }

    /**
     * Images as a featured
     *
     * @param url
     */
    function setFeatured(url) {
      vm.featuredImage = {
        images: [
          {
            thumb: url,
            medium: url,
            large: url
          }
        ]
      };
    }

  }
}());
