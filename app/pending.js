
let joined = [];

angular.module("pendingModule", [])
// Create the controller and inject Angular's $scope:
.controller("pendingController", function($scope) {

  $scope.dummyData = [
      // time: new Date.getTime(),
      // attendees: "Josh's Mom",
      // rsvp: "Yes!"

    {
      date: new Date(),
      time: "10:30",
      going: "Josh\'s Mom",
      creator: "Jigglypuff (a.k.a., Jiggling Josh)",
      comments: "Bears, Beets, Battlestar Galactica"
    }, {
      date: new Date("October 13, 2014 11:13:00"),
      time: "12:47",
      going: "Ben\'s Mom",
      creator: "Belligerent Benjamin",
      comments: "It\'s all about the benjamins."
    }, {
      date: new Date("October 13, 2014 11:13:00"),
      time: "08:55",
      going: "Rene\'s Mom",
      creator: "Rambunctious Rene",
      comments: "Relax... take it eeassssyyyy."
    }, {
      date: new Date("October 13, 2014 11:13:00"),
      time: "21:13",
      going: "Nick\'s Mom",
      creator: "Nimble Nick",
      comments: "Troloolololllolloolool olooloo."
    }, {
      date: new Date("October 13, 2014 11:13:00"),
      time: "00:00",
      going: "Not Oliver\'s Mom",
      creator: "Oscillating Oliver",
      comments: "Ballin\'s not a hobby, it\'s my occupation."
    }
  ];


  $scope.nextEvent = function(data) {
      console.log(data);

    return $scope.evt = {
      date: data.date,
      time: data.time,
      going: data.going,
      creator: data.creator,
      comments: data.comments
    };
  };


  $scope.keepEvent = function(data) {
      console.log(data);

    joined.push($scope.nextEvent(data));
    // $scope.nextEvent();
  };


  $scope.discardEvent = function(data) {
      console.log(data);

    $scope.nextEvent(data.shift());
  };

});
