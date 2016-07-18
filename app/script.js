// script.js

// create the module and name it scotchApp
// also include ngRoute for all our routing needs
angular.module('mainModule', ['ngRoute', 'loginModule', 'pendingModule', 'joinedModule', 'createModule', 'dataServiceModule'])

  // configure our routes
  .config(function($routeProvider) {
    $routeProvider

    // route for the home page
    .when('/', {
      templateUrl : 'app/pages/login.html',
      controller  : 'loginController'
    })

    // route for home page
    .when('/login', {
      templateUrl : 'app/pages/login.html',
      controller  : 'loginController'
    })

    // route for the about page
    .when('/pending', {
      templateUrl : 'app/pages/pending.html',
      controller  : 'pendingController',
      resolve: {
                factory : checkLogin
            }
    })

    // route for the contact page
    .when('/joined', {
      templateUrl : 'app/pages/joined.html',
      controller  : 'joinedController',
      resolve: {
                factory: checkLogin
            }
    })

    // route for the contact page
    .when('/create', {
      templateUrl : 'app/pages/create.html',
      controller  : 'createController',
      resolve: {
                factory: checkLogin
            }
    });

  })

 var checkLogin = function($location, Storage) {
      if (Storage.currentUser !== null) {
        return true;
      }
      else {
        $location.path("/");
      }
  }
