Tinytest.add("Leaderboard - test players collection exists", function(test){
    test.instanceOf(Players, Meteor.Collection);
});

if(Meteor.isServer){
    Tinytest.addAsync("Leaderboard - test players collection has fixture data", function(test, onComplete){
        Meteor.startup(function(){
            test.isTrue(Players.find().fetch().length > 0);
            onComplete();
        });
    });
}
