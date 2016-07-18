angular.module('dataServiceModule', [])
  .factory('Database', function(Storage) {

    var getGoingActivities = function(cb) {
      firebase.database().ref('activities').once('value').then(function(snapshot) {
        activities = snapshot.val();
        cb(activities);
      })
    };

    var getUnseenActivities = function(cb) {
      firebase.database().ref('activities').once('value').then(function(snapshot) {
        var activities = snapshot.val();
        cb.call(null ,activities);
      })
    };

    var createActivity = function(activity, cb) {
      firebase.database().ref('activities')
        .push(activity)
        .then(function(snapshot) {
          //cb.call(this, snapshot.val());
        });
    };

    var joinActivity = function(currentActivity) {
      firebase.database().ref('activities/' + currentActivity + '/going').once('value').then(function(snapshot) {
        if (snapshot.val().includes(Storage.currentUser) === - 1) {
          var newGoing = snapshot.val() + Storage.currentUser;
          firebase.database().ref('activities/' + currentActivity + '/going').set(newGoing);
        }
      });
      firebase.database().ref('activities/' + currentActivity + '/seen'.push(Storage.currentUser);
    }
    var declineActivity = function() {
      console.log("you're no fun");
      firebase.database().ref('activities/' + currentActivity + '/seen'.push(Storage.currentUser);
    }

    return {
      
      getGoingActivities: getGoingActivities,
      getUnseenActivities: getUnseenActivities,
      createActivity: createActivity,
      joinActivity: joinActivity,
      declineActivity: declineActivity
    };

  })


  .factory('Storage', function() {
    var currentUser = null;
    var login = function(username) {
      this.currentUser = username;

    };
    var logout = function() {
      currentUser = null;
    };
    var currentUserActivities = [];
    

    return {
      login : login,
      logout : logout,
      currentUser : currentUser,
      currentUserActivities : currentUserActivities
    }

  });
