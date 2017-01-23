app.factory('api', function ($http) {
    var api = {};

    api.prog = function () {
        return $http.get("data/prog.json");
    };

    return api;
});
