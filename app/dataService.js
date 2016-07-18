angular.module('dataServiceModule', [])
  .factory('Database', function(Storage) {
    var login = function() {
      return true;
    };

    var logout;

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
      firebase.database().ref('activities/' + currentActivity).push(Storage.currentUser).then(function(snapshot){
        return true;
      });
    }
    var declineActivity = function() {
      console.log("you're no fun");
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
      currentUser = username;
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
