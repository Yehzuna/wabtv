app.factory('twitch', function ($http) {
    var data = {};

    data.online = function () {
        return $http({
            method: "GET",
            url: "https://api.twitch.tv/kraken/streams/84934385",
            headers: {
                'Accept': 'application/vnd.twitchtv.v5+json',
                'Client-ID': 'u2t1qbp3fv8ipbrs7nrq050bwhyc0u'
            }
        });
    };

    return data;
});
