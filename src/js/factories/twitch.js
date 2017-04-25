app.factory('twitch', function ($http) {
    var data = {};

    data.online = function (key) {
        return $http({
            method: "GET",
            url: "https://api.twitch.tv/kraken/streams/" + key,
            headers: {
                'Accept': 'application/vnd.twitchtv.v5+json',
                'Client-ID': '197bhr3oauxte1y5titkaq8ggq8ih9h'
            }
        });
    };

    data.clip = function (period) {
        return $http({
            method: "GET",
            url: "https://api.twitch.tv/kraken/clips/top?channel=weareb0b&limit=12&period=" + period,
            headers: {
                'Accept': 'application/vnd.twitchtv.v4+json',
                'Client-ID': '197bhr3oauxte1y5titkaq8ggq8ih9h'
            }
        });
    };

    return data;
});
