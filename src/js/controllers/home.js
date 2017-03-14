app.controller('homeCtrl', function ($rootScope, $scope, twitch, dailymotion, api) {

    $scope.loading = true;
    $scope.player = false;
    $scope.highlight = false;
    $scope.data = {};

    twitch.online().then(function (response) {
        $scope.loading = false;

        //console.debug(response.data.stream);
        if (response.data.stream) {
            $scope.player = true;
            $scope.data = {
                viewers: response.data.stream.viewers + ' spectateur(s)',
                title: response.data.stream.channel.status
            };

            $scope.loadTwitch();
        } else {
            $scope.highlight = true;

            $scope.initDailymotion();
        }
    }).catch(function () {
        $scope.loading = false;
        $scope.highlight = true;
    });

    $scope.loadTwitch = function () {
        document.getElementById('chat').src = "http://www.twitch.tv/weareb0b/chat";

        var player = new Twitch.Player("player", {
            channel: "weareb0b"
        });
        player.setVolume(0.5);
    };

    $scope.loadDailymotion = function (id, scroll) {
        $scope.data.id = id;

        DM.player(document.getElementById("player"), {
            video: id
        });

        if(scroll) {
            var element = angular.element(document.getElementById('replay'));
            $document.scrollToElement(element, 10, 1000);
        }
    };

    $scope.initDailymotion = function () {
        $scope.data = {
            viewers: false,
            title: "La vidéo du jour",
            id: false,
            playlist: []
        };

        api.highlight().then(function (response) {
            angular.forEach(response.data, function(id, index) {
                dailymotion.video(id).then(function (response) {
                    //console.log(response.data);

                    if (index == 0) {
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

    $scope.play = function () {
        if (!$rootScope.theater) {
            $rootScope.theater = true;
        } else {
            $rootScope.theater = false;
        }
    };

    $scope.fullScreen = function () {
        if (!$rootScope.theater) {
            $rootScope.theater = true;
        } else {
            $rootScope.theater = false;
        }
    };

    $scope.nightMode = function () {
        if (!$rootScope.night) {
            $rootScope.night = true;
        } else {
            $rootScope.night = false;
        }
    };
});