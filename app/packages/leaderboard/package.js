Package.describe({
    summary: "Meteor leaderboard example as a meteor package"
});

Package.on_use(function (api, where) {
    api.use(["standard-app-packages"]);
    api.add_files("leaderboard.css", "client");
    api.add_files("leaderboard.html", "client");
    api.add_files("leaderboard.js");
    api.export("Players");
});

Package.on_test(function(api) {
    api.use(["leaderboard", "tinytest"]);
    api.add_files("tests/leaderboard.test.js")
});
