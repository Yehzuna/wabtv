app.controller('homeCtrl', function ($rootScope, $scope, $document, twitch, youtube, api) {
    $scope.loading = true;
    $scope.player = false;
    $scope.highlight = false;

    $scope.data = {
        viewers: false,
        title: "La vidéo du jour",
        id: false,
        playlist: []
    };

    api.config().then(function (response) {
        var config = {};
        angular.forEach(response.data.players, function (data) {
            if (data.active) {
                config = data;
            }
        });
        $scope.data.title = config.title;

        if (config.type === "youtube") {
            $scope.loadYoutubeLive(config.key);
        } else {
            $scope.initTwitch(config.key, config.id);
        }
    });

    $scope.initTwitch = function (key, id) {
        twitch.online(id).then(function (response) {
            $scope.loading = false;

            if (response.data.stream) {
                $scope.data.viewers = response.data.stream.viewers + " spectateur(s)";
                $scope.data.title = response.data.stream.channel.status;

                $scope.player = true;
                $scope.loadTwitch(key);
            } else {
                $scope.highlight = true;
                $scope.initHighlight();
            }
        }).catch(function () {
            $scope.loading = false;

            $scope.highlight = true;
            $scope.initHighlight();
        });
    };

    $scope.initHighlight = function () {
        youtube.highlight().then(function (response) {
            angular.forEach(response.data.items, function (data, index) {
                if (index === 0) {
                    $scope.loadYoutube(data.snippet.resourceId.videoId, false);
                }

                $scope.data.playlist.push({
                    id: data.snippet.resourceId.videoId,
                    title: data.snippet.title,
                    img: data.snippet.thumbnails.medium.url
                })
            });
        });
    };

    $scope.loadYoutubeLive = function (key) {
        document.getElementById('player_iframe').src = "https://www.youtube.com/embed/" + key + "?autoplay=1";
        document.getElementById('chat').src = "https://www.youtube.com/live_chat?v=" + key + "&embed_domain=" + window.location.hostname;

        $scope.player = true;
        $scope.loading = false;
    };

    $scope.loadTwitch = function (key) {
        document.getElementById('chat').src = "http://www.twitch.tv/" + key + "/chat";

        var player = new Twitch.Player("player", {
            channel: key
        });
        player.setVolume(0.5);
    };

    $scope.loadYoutube = function (key, scroll) {
        document.getElementById('player_iframe').src = "https://www.youtube.com/embed/" + key + "?autoplay=1";

        if(scroll) {
            var element = angular.element(document.getElementById('player'));
            $document.scrollToElement(element, 10, 1000);
        }
    };

    $scope.fullScreen = function () {
        if (!$rootScope.theater) {
            $rootScope.theater = true;
        } else {
            $rootScope.theater = false;
        }

        ga('send', 'event', 'WabTV', 'Player', 'Full Screen', $rootScope.theater);
    };

    $scope.nightMode = function () {
        if (!$rootScope.night) {
            $rootScope.night = true;
        } else {
            $rootScope.night = false;
        }

        ga('send', 'event', 'WabTV', 'Player', 'Night Mode', $rootScope.night);
    };
});