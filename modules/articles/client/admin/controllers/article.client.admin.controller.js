(function () {
  'use strict';

  angular
    .module('articles.admin.controllers')
    .config(['$mdIconProvider', function($mdIconProvider) {
      $mdIconProvider.icon('md-close', 'modules/core/client/common/assets/angular-material-assets/img/icons/ic_close_24px.svg', 24);
    }])
    .controller('ArticlesAdminController', ArticlesAdminController);

  ArticlesAdminController.$inject = ['$scope', '$state', '$window', 'articleResolve', 'tagResolve', 'Authentication'];

  function ArticlesAdminController($scope, $state, $window, article, tag, Authentication) {
    var vm = this;

    vm.article = article;
    vm.tags = tag;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    vm.selectedItem = null;
    vm.searchText = null;
    vm.querySearch = querySearch;
    vm.autocompleteDemoRequireMatch = true;
    vm.transformChip = transformChip;

    // Data
    vm.taToolbar = [
      ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'quote', 'bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol', 'redo', 'undo', 'clear'],
      ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'indent', 'outdent', 'html', 'insertImage', 'insertLink', 'insertVideo', 'wordcount', 'charcount']
    ];

    /**
     * Return the proper object when the append is called.
     */
    function transformChip(tag) {
      // If it is an object, it's already a known chip
      if (angular.isObject(tag)) {
        return tag;
      }

      // Otherwise, create a new one
      return { name: tag };
    }

    /**
     * Search for vegetables.
     */
    function querySearch (query) {
      var results = query ? vm.tags.filter(createFilterFor(query)) : [];
      return results;
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(tag) {
        return (tag.name.indexOf(lowercaseQuery) === 0);
      };

    }

    // Remove existing Article
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.article.$remove(function() {
          $state.go('admin.articles.list');
        });
      }
    }

    // Save Article
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', '$scope.basicArticleForm');
        return false;
      }

      // Create a new article, or update the current instance
      vm.article.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.articles.list'); // should we send the User to the list or the updated Article's view?
      }

      function errorCallback(res) {
        res.data.message;
      }
    }
  }
}());
