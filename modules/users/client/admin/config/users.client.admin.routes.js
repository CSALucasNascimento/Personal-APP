(function () {
  'use strict';

  // Setting up route
  angular
    .module('users.admin.config.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      // .state('admin.users', {
      //   url: '/profile',
      //   views: {
      //     'content@admin': {
      //       templateUrl: ''
      //     }
      //   }
      // })
      .state('admin.users', {
        abstract: true,
        url: '/users'
      })
      .state('admin.users.list', {
        url: '/list',
        views: {
          'content@admin': {
            templateUrl: '/modules/users/client/admin/views/list-users.client.view.html',
            controller: 'UserListController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          userListResolve: getUserList
        },
        data: {
          pageTitle: 'Users List'
        }
      })
      .state('admin.user', {
        url: '/users/:userId',
        views: {
          'content@admin': {
            templateUrl: '/modules/users/client/admin/views/view-user.client.view.html',
            controller: 'UserController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          userResolve: getUser
        },
        data: {
          pageTitle: 'Edit {{ userResolve.displayName }}'
        }
      })
      .state('admin.user-edit', {
        url: '/users/:userId/edit',
        views: {
          'content@admin': {
            templateUrl: '/modules/users/client/admin/views/edit-user.client.view.html',
            controller: 'UserController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          userResolve: getUser
        },
        data: {
          pageTitle: 'Edit User {{ userResolve.displayName }}'
        }
      })
      .state('admin.userAdmin-edit', {
        url: '/usersAdmin/:userId/edit',
        views: {
          'content@admin': {
            templateUrl: '/modules/users/client/admin/views/edit-admin-user.client.view.html',
            controller: 'UserAdminController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          userResolve: getUser
        },
        data: {
          pageTitle: 'Edit User {{ userResolve.displayName }}'
        }
      });

    getUser.$inject = ['$stateParams', 'AdminService'];

    function getUser($stateParams, AdminService) {
      return AdminService.get({
        userId: $stateParams.userId
      }).$promise;
    }

    getUserList.$inject = ['AdminService'];

    function getUserList(AdminService) {
      return AdminService.query().$promise;
    }

  }
}());
