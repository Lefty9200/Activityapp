
angular.module('joinedModule', [])
  // create the controller and inject Angular's $scope
  .controller('joinedController', function($scope, Database) {

    $scope.joinedActivities = [];
    $scope.get = Database.getGoingActivities(function(data) {
      var result = [];

      for (var activ in data) {
        // if activity has username or created is username 
        if (data[activ].going.includes('is') || data[activ].creator === 'is') {
          result.push(data[activ]);          
        }
      }
      $scope.joinedActivities = result;
      $scope.$digest();
    });
  });
