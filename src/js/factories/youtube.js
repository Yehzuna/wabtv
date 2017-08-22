app.factory('youtube', function ($http) {
    var data = {};
    var apiKey =  "AIzaSyAgcaNWhH7wccARqAMtF410IdvTYcD-6io";

    data.highlight = function () {
        return $http({
            method: "GET",
            url: "https://www.googleapis.com/youtube/v3/playlistItems",
            params: {
                key: apiKey,
                playlistId: "UUmNU-P7Aw671w9L6h1d1vxw",
                part: "snippet"
            }
        });
    };

    data.replay = function (token) {
        var params = {
            key: apiKey,
            playlistId: "UUmNU-P7Aw671w9L6h1d1vxw",
            part: "contentDetails",
            maxResults: 12
        };

        if (token) {
            params.pageToken = token;
        }

        return $http({
            method: "GET",
            url: "https://www.googleapis.com/youtube/v3/playlistItems",
            params: params
        });
    };

    data.video = function (ids) {
        return $http({
            method: "GET",
            url: "https://www.googleapis.com/youtube/v3/videos",
            params: {
                key: apiKey,
                id: ids.join(','),
                part: "snippet,contentDetails"
            }
        });
    };

    return data;
});
