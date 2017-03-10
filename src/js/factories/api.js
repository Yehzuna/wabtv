app.factory('api', function ($http) {
    var api = {};

    api.schedule = function () {
        return $http.get("data/schedule.json");
    };

    api.highlight = function () {
        return $http.get("data/highlight.json");
    };

    return api;
});
