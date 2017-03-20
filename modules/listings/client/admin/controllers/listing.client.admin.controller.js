(function () {
  'use strict';

  angular
    .module('listings.admin.controllers')
    .config(['$mdIconProvider', function ($mdIconProvider) {
      $mdIconProvider.icon('md-close', 'modules/core/client/common/assets/angular-material-assets/img/icons/ic_close_24px.svg', 24);
    }])
    .controller('ListingsAdminController', ListingsAdminController);

  ListingsAdminController.$inject = ['$scope', '$state', '$document', 'listingResolve', 'categoryResolve', 'amenityResolve', 'Authentication'];

  function ListingsAdminController($scope, $state, $document, listing, categories, amenities, Authentication) {
    var vm = this;

    // Methods
    vm.listing = listing;
    vm.categories = categories;
    vm.amenities = amenities;
    vm.authentication = Authentication;

    vm.saveListing = saveListing;
    vm.gotoListings = gotoListings;
    vm.onCategoriesSelectorOpen = onCategoriesSelectorOpen;
    vm.onCategoriesSelectorClose = onCategoriesSelectorClose;
    vm.fileAdded = fileAdded;
    vm.upload = upload;
    vm.fileSuccess = fileSuccess;
    vm.isFormValid = isFormValid;
    vm.updateImageZoomOptions = updateImageZoomOptions;
    vm.toggle = toggle;
    vm.exists = exists;
    vm.setListingStatus = setListingStatus;
    vm.setListingFeatured = setListingFeatured;
    vm.setOpeningHours = setOpeningHours;
    vm.categoriesSelected = vm.listing.category || [];
    vm.amenitiesSelected = vm.listing.amenity || [];
    vm.listing.images = vm.listing.images || [];
    vm.listing.status = vm.listing.status || 'draft';
    vm.listing.price = {};
    vm.listing.price.details = {};
    vm.listing.price.method = vm.listing.price.method || 'hourly';
    vm.listing.exception = [];
    vm.dateException = new Date();
    var exceptionDates = [new Date(2017, 0, 25).toLocaleDateString(), new Date(2017, 1, 9).toLocaleDateString()];
    vm.addException = addException;

    // Data
    vm.taToolbar = [
      ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'quote', 'bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol', 'redo', 'undo', 'clear'],
      ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'indent', 'outdent', 'html', 'insertImage', 'insertLink', 'insertVideo', 'wordcount', 'charcount']
    ];
    vm.categoriesSelectFilter = '';
    vm.ngFlowOptions = {
      // You can configure the ngFlow from here
      /* target                   : 'api/media/image',
       chunkSize                : 15 * 1024 * 1024,
       maxChunkRetries          : 1,
       simultaneousUploads      : 1,
       testChunks               : false,
       progressCallbacksInterval: 1000*/
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
     * HOURS SET
     *
     */

    /**
     *
     * AVAILABILITY
     *
     */
    vm.weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    init();

    /**
     * Initialize
     */
    function init() {
      if (vm.listing._id) {
        if (vm.listing.galleryImage.length > 0) {
          vm.updateImageZoomOptions(vm.listing.galleryImage[0].url);
        }
      }

      setListingStatus(vm.listing.status);

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
     * Sets Listing Status
     * @param status
     */
    function setListingFeatured() {
      vm.listing.featured = !vm.listing.featured;
    }

    /**
     *
     * Specifications - Set Up Opening Hours
     *
     */
    function setOpeningHours() {
      resetOpeningHours();
      /*
      if (vm.listing.price.method === 'hourly') {
        vm.listing.price.details.hourly.perhour = vm.hourlyPrice;
        vm.listing.price.details.hourly.perhalfday = vm.hourlyPriceHalfDay;
        vm.listing.price.details.hourly.perday = vm.hourlyPriceDay;
        vm.listing.price.details.hourly.minimumTerm = vm.minimumTermHours;
      }

      if (vm.listing.price.method === 'daily') {
        vm.listing.price.details.daily.perday = vm.dailyPrice;
        vm.listing.price.details.daily.minimumTerm = vm.minimumTermDays;
      }

      if (vm.listing.price.method === 'monthly') {
        vm.listing.price.details.monthly = {};
        vm.listing.price.details.monthly.permonth = parseInt(vm.monthlyPrice);
        vm.listing.price.details.monthly.minimumTerm = vm.minimumTermMonths;
        if (vm.monthlyPriceTrimester !== 0 )
          vm.listing.price.details.monthly.trimester = vm.monthlyPriceTrimester;
        if (vm.monthlyPriceSemester !== 0)
          vm.listing.price.details.monthly.semester = vm.monthlyPriceSemester;
        if (vm.monthlyPriceYear !==0)
          vm.listing.price.details.monthly.year = vm.monthlyPriceYear;

      }
      */

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
     * On categories selector open
     */
    function onCategoriesSelectorOpen() {
      // The md-select directive eats keydown events for some quick select
      // logic. Since we have a search input here, we don't need that logic.
      $document.find('md-select-header input[type="search"]').on('keydown', function (e) {
        e.stopPropagation();
      });
    }

    /**
     * On categories selector close
     */
    function onCategoriesSelectorClose() {
      // Clear the filter
      vm.categoriesSelectFilter = '';

      // Unbind the input event
      $document.find('md-select-header input[type="search"]').unbind('keydown');
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
      // Iterate through the media list, find the one we
      // are added as a temp and replace its data
      // Normally you would parse the message and extract
      // the uploaded file data from it
      angular.forEach(vm.listing.images, function (media, index) {
        if (media.id === file.uniqueIdentifier) {
          // Normally you would update the media item
          // from database but we are cheating here!
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
     * Update image zoom options
     *
     * @param url
     */
    function updateImageZoomOptions(url) {
      vm.imageZoomOptions = {
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
