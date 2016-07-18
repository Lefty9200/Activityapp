
  angular.module('loginModule', [])
  // create the controller and inject Angular's $scope
  .controller('loginController', function($scope, $location, Storage) {
    $scope.onSubmit = function(username) {
      Storage.login(username);
      console.log(Storage.currentUser);
      if (Storage.currentUser) {
      	$location.path('/pending');
      }
    }
  })
