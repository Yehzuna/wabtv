app.controller('homeCtrl', function ($rootScope, $scope, $sce, twitch, dailymotion, api) {

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

            loadTwitch();
        } else {
            $scope.highlight = true;

            initDailymotion();
        }
    }).catch(function () {
        $scope.loading = false;
        $scope.highlight = true;
    });

    function loadTwitch() {
        document.getElementById('chat').src = "http://www.twitch.tv/weareb0b/chat";

        var options = {
            channel: "weareb0b"
        };
        var player = new Twitch.Player("player", options);
        player.setVolume(0.5);
    }

    function initDailymotion() {
        $scope.data = {
            viewers: false,
            title: 'test',
            playlist: []
        };

        api.highlight().then(function (response) {
            angular.forEach(response.data, function(id, index) {
                console.log(id);
                console.log(index);

                dailymotion.video(id).then(function (response) {
                    console.log(response.data);

                    if (index == 0) {
                        $scope.data.title = response.data.title;
                        loadDailymotion(id);
                    }

                    $scope.data.playlist.push({
                        title: response.data.title,
                        img: response.data.thumbnail_120_url
                    })
                });
            })
        });
    }

    function loadDailymotion(id) {
        DM.player(document.getElementById("player"), {
            video: id
        });
    }

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