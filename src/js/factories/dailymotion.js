app.factory('dailymotion', function ($http) {
    var data = {};
    var fields = "?fields=id,title,duration,updated_time,thumbnail_180_url,thumbnail_360_url";

    data.video = function (id) {
        return $http({
            method: "GET",
            url: "https://api.dailymotion.com/video/" + id + fields
        });
    };

    data.playlist = function (id) {
        return $http({
            method: "GET",
            url: "https://api.dailymotion.com/playlist/x4u9ct/videos" + fields
        });
    };

    data.replay = function (page) {
        return $http({
            method: "GET",
            url: "https://api.dailymotion.com/user/x1vvl9i/videos" + fields + "&page=" + page
        });
    };

    return data;
});
