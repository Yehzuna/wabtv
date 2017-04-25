app.controller('homeCtrl', function ($rootScope, $scope, $document, twitch, dailymotion, api) {
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
            $scope.loadYoutube(config.key);
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
        $scope.data.title = "La vidéo du jour";

        api.highlight().then(function (response) {
            angular.forEach(response.data, function (id, index) {
                dailymotion.video(id).then(function (response) {
                    if (index === 0) {
                        $scope.loadDailymotion(response.data.id, false);
                    }

                    $scope.data.playlist.push({
                        id: response.data.id,
                        title: response.data.title,
                        img: response.data.thumbnail_180_url
                    })
                });
            });
        });
    };

    $scope.loadYoutube = function (key) {
        document.getElementById('player_iframe').src = "https://www.youtube.com/embed/" + key + "?autoplay=1";
        document.getElementById('chat').src = "https://www.youtube.com/live_chat?v=" + key + "&embed_domain=wab.local";

        $scope.player = true;
        $scope.loading = false;
    };

    $scope.loadTwitch = function (key) {
        document.getElementById('chat').src = "http://www.twitch.tv/" + key + "/chat";

        var player = new Twitch.Player("player", {
            channel: id
        });
        player.setVolume(0.5);
    };

    $scope.loadDailymotion = function (id, scroll) {
        $scope.data.id = id;

        DM.player(document.getElementById("player"), {
            video: id
        });

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