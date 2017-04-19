app.factory('api', function ($http) {
    var api = {};
    var time = Date.now();

    api.schedule = function () {
        return $http.get("data/schedule.json?" + time);
    };

    api.highlight = function () {
        return $http.get("data/highlight.json?" + time);
    };

    api.gamer = function () {
        return $http.get("data/gamer.json?" + time);
    };

    api.admin = function (data) {
        return $http.post("api.php", data);
    };

    return api;
});