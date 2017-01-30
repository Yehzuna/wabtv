app.factory('api', function ($http) {
    var api = {};

    api.schedule = function () {
        return $http.get("data/schedule.json");
    };

    return api;
});
