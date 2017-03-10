app.factory('dailymotion', function ($http) {
    var data = {};

    data.embed = function (id) {
        return $http({
            method: "JSONP",
            url: "https://www.dailymotion.com/services/oembed?url=http://www.dailymotion.com/embed/video/" + id + "&callback=JSON_CALLBACK"
        });
    };

    return data;
});
