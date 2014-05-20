Tinytest.waitFor = function (timeout, interval, test, onComplete, msg, waitForFunc) {
  var startTime, intervalHandler;
  startTime = new Date().getTime();

  if (waitForFunc() === true) {
    // Condition is true already, no need to wait
    onComplete();
    return;
  }

  intervalHandler = Meteor.setInterval((function () {
    try {
      var currentTime;
      if (waitForFunc() === true) {
        console.log("waitFor setInterval cb: condition is true");
        Meteor.clearTimeout(intervalHandler);
        onComplete();
      }

      currentTime = new Date().getTime();
      if (currentTime - startTime >= timeout) {
        console.log("waitFor setInterval cb: condition timeout");

        Meteor.clearTimeout(intervalHandler);
        test.fail({type: "timeout", message: msg});
        onComplete();
      }
    } catch (ex) {
      test.exception(ex);
      onComplete();
    }
  }), interval);


};


Tinytest.add("Leaderboard - data - test players collection exists", function (test) {
  test.instanceOf(Players, Meteor.Collection);
});

if(Meteor.isServer) {

  Tinytest.addAsync("Leaderboard - data - test players collection has fixture data", function (test, onComplete) {
    Meteor.defer(function () {
      test.isTrue(Players.find().fetch().length > 0);
      onComplete()
    });
  });

}