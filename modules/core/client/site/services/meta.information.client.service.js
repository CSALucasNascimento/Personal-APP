'use strict';

angular.module('core.site.services').service('$meta', ['$rootScope', function ($rootScope) {
  var meta = this;

  // One off initialization
  if (!meta._elements) {
    // Filter down to elements that have either the name attribute or the property attribute
    meta._elements = angular.element('meta').filter(function (i, e) {
      e.metaName = e.name || e.getAttribute('property');
      return e.metaName;
    });
    // Save the original values so that we can reset the elements if we want
    meta._originalValues = meta._elements.map(function (i, e) {
      return { name: e.metaName, value: e.content };
    });

    // Also get the title element
    meta._title = angular.element('title')[0] || {};
    meta._originalTitle = meta._title.innerText;
  }

  // Get an element by the metaName we have given to it
  meta.get = function (name) {
    return meta._elements.filter(function (i, e) {
      return e.metaName === name;
    })[0] || {};
  };

  // Reset all elements to their original values
  meta.reset = function () {
    meta._originalValues.map(function (i, e) {
      meta.get(e.name).content = e.value;
    });
    meta._title.innerText = meta._originalTitle;
  };

  // When navigating to a different view, reset the meta elements so that they can be re-set by the controllers.
  // Also works well with the browser back button
  $rootScope.$on('$locationChangeSuccess', function (next, current) {
    meta.reset();
  });

  //
  // SEO useful methods start here
  //

  meta.setTitle = function (title) {
    meta._title.innerText = meta.get('og:title').content = meta.get('twitter:title').content = title;
  };

  meta.setDescription = function (description) {
    meta.get('description').content = meta.get('og:description').content = meta.get('twitter:description').content = description;
  };

  meta.setImage = function (url) {
    meta.get('image').content = meta.get('og:image').content = meta.get('twitter:image').content = url;
  };

  meta.setSiteName = function (siteName) {
    meta.get('site_name').content = meta.get('og:site_name').content = siteName;
  };

  meta.setKeywords = function (keywords) {
    meta.get('keywords').content = keywords;
  };

  meta.addKeywords = function (keywords) {
    meta.get('keywords').content += ',' + keywords;
  };

  return meta;
}]);
