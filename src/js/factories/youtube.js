app.factory('youtube', function ($http) {
    var data = {};
    var fields = "?fields=id,title,duration,updated_time,thumbnail_180_url,thumbnail_360_url";

    data.highlight = function () {
        return $http({
            method: "GET",
            url: "https://www.googleapis.com/youtube/v3/videos",
            params: {
                id: "AIzaSyAgcaNWhH7wccARqAMtF410IdvTYcD-6io",
                part: "snippet"
            }
        });
    };

    data.replay = function () {
        return $http({
            method: "GET",
            url: "https://www.googleapis.com/youtube/v3/videos" + fields + "&limit=5"
        });
    };

    return data;
});
