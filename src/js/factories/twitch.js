app.factory('twitch', function ($http) {
    var data = {};

    data.online = function () {
        return $http({
            method: "GET",
            //url: "https://api.twitch.tv/kraken/streams/84934385", //jvtv
            url: "https://api.twitch.tv/kraken/streams/89890241",
            headers: {
                'Accept': 'application/vnd.twitchtv.v5+json',
                'Client-ID': 'u2t1qbp3fv8ipbrs7nrq050bwhyc0u'
            }
        });
    };

    data.clip = function () {
        return $http({
            method: "GET",
            url: "https://api.twitch.tv/kraken/clips/top?channel=weareb0b&period=all&limit=12",
            headers: {
                'Accept': 'application/vnd.twitchtv.v4+json',
                'Client-ID': 'u2t1qbp3fv8ipbrs7nrq050bwhyc0u'
            }
        });
    };

    return data;
});
