app.factory('dailymotion', function ($http) {
    var data = {};
    var fields = "?fields=id,title,duration,updated_time,thumbnail_180_url,thumbnail_360_url";

    data.video = function (id) {
        return $http({
            method: "GET",
            url: "https://api.dailymotion.com/video/" + id + fields
        });
    };

    data.replay = function (page) {
        return $http({
            method: "GET",
            url: "https://api.dailymotion.com/user/x1vvl9i/videos" + fields + "&page=" + page + "&limit=12"
        });
    };

    data.highlight = function () {
        return $http({
            method: "GET",
            url: "https://api.dailymotion.com/user/x1vvl9i/videos" + fields + "&limit=5"
        });
    };

    return data;
});
