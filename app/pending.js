
let joined = [];

angular.module("pendingModule", [])
// Create the controller and inject Angular's $scope:
.controller("pendingController", function($scope, Database, Storage) {

  $scope.joinedEvents = [];
  $scope.get = Database.getUnseenActivities(function(data) {
    let result = [];
      console.log(data);

    for (let active in data) {
      let currChunk = data[active];
      let alreadySeenUsers = currChunk.seen;
      let flag = true;

      for (var key in alreadySeenUsers) {
        if (alreadySeenUsers[key] === Storage.currentUser) {
          flag = false;
        }
      } 
      if (flag) {  
        currChunk["key"] = active;
        result.push(currChunk);
      }
    }

    $scope.joinedEvents = result;
    $scope.$digest();
      console.log($scope.joinedEvents);
  });


  $scope.nextEvent = function(data) {
      console.log(data);

    // $scope.$watch("joinedEvents", function(newVal, oldVal, scope) {
    //   scope.$digest();
    // });

    return $scope.evt = {
      name: data.name,
      date: data.date,
      time: data.time,
      location: data.location,
      going: data.going,
      creator: data.creator,
      comments: data.comments
    };
  };


  $scope.keepEvent = function(data) {
      console.log(data);
      console.log("Storage.currentUserActivities: ", Storage.currentUserActivities);
    // Storage.currentUserActivities.push(data);
    Database.joinActivity(data["key"]);
    joined.push($scope.nextEvent(data));
  };


  $scope.discardEvent = function(data) {
      console.log(data);
    $scope.nextEvent(data.shift());
    Database.declineActivity(data["key"]);
  };


});
