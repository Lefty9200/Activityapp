
let joined = [];

angular.module("pendingModule", [])
// Create the controller and inject Angular's $scope:
.controller("pendingController", function($scope, Database, Storage) {

  $scope.dummyData = [
      // time: new Date.getTime(),
      // attendees: "Josh's Mom",
      // rsvp: "Yes!"

    {
      date: new Date(),
      time: "10:30",
      location: '2540 Evergreen Dr. San Francisco' ,
      going: "Josh\'s Mom",
      creator: "Jigglypuff (a.k.a., Jiggling Josh)",
      comments: "Bears, Beets, Battlestar Galactica"
    }, {
      date: new Date("October 13, 2014 11:13:00"),
      time: "12:47",
      location: '2540 Evergreen Dr. San Francisco' ,
      going: "Ben\'s Mom",
      creator: "Belligerent Benjamin",
      comments: "It\'s all about the benjamins."
    }, {
      date: new Date("October 13, 2014 11:13:00"),
      time: "08:55",
      location: '2540 Evergreen Dr. San Francisco' ,
      going: "Rene\'s Mom",
      creator: "Rambunctious Rene",
      comments: "Relax... take it eeassssyyyy."
    }, {
      date: new Date("October 13, 2014 11:13:00"),
      time: "21:13",
      location: '2540 Evergreen Dr. San Francisco' ,
      going: "Nick\'s Mom",
      creator: "Nimble Nick",
      comments: "Troloolololllolloolool olooloo."
    }, {
      date: new Date("October 13, 2014 11:13:00"),
      time: "00:00",
      location: '2540 Evergreen Dr. San Francisco' ,
      going: "Not Oliver\'s Mom",
      creator: "Oscillating Oliver",
      comments: "Ballin\'s not a hobby, it\'s my occupation."
    }
  ];


  $scope.joinedEvents = [];
  $scope.get = Database.getUnseenActivities(function(data) {
    let result = [];
      console.log(data);

    for (let active in data) {
      let currChunk = data[active];
      let alreadySeenUsers = currChunk.seen;
      let flag = true;

      for (var key in alreadySeenUsers) {
        if (key.value === Storage.currentUser) {
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

    $scope.$watch("joinedEvents", function(newVal, oldVal, scope) {
      scope.$digest();
    });

    return $scope.evt = {
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
