(function () {
  'use strict';

  // Home Website Controller
  angular
    .module('core.site.controllers')
    .controller('HomeSearchController', HomeSearchController);

  HomeSearchController.$inject = ['$scope', 'CategoriesService'];

  function HomeSearchController($scope, CategoriesService) {
    var hsc = this;
    hsc.setCategory = setCategory;
    hsc.setClicked = setClicked;
    hsc.categories = CategoriesService.query();
    hsc.qLocation = '';
    hsc.qCategory = '';
    hsc.clicked = false;

    function setCategory(category) {
      hsc.qCategory = category.name;
    }

    function setClicked() {
      hsc.clicked = !hsc.clicked;
    }

    $scope.hideDropdown = function () {
      if (hsc.clicked)
        hsc.clicked = !hsc.clicked;
    };
  }
}());
