
angular.module('joinedModule', [])
  // create the controller and inject Angular's $scope
  .controller('joinedController', function($scope, Database, Storage) {

    $scope.joinedActivities = [];
    $scope.get = Database.getGoingActivities(function(data) {
      var result = [];

      for (var activ in data) {
        // if activity has username or created is username 
        if (data[activ].going.includes(Storage.currentUser) || data[activ].creator === Storage.currentUser) {
          result.push(data[activ]);          
        }
      }
      

      function chunk(arr, size) {
        var newArr = [];
        for (var i=0; i<arr.length; i+=size) {
          newArr.push(arr.slice(i, i+size));
        }
        return newArr;
      }

      // $scope.chunkedData = chunk(myData, 3);

      $scope.joinedActivities = result;
      $scope.$digest();
    });





  });
