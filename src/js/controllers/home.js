app.controller('homeCtrl', function ($rootScope, $scope, twitch) {

    $scope.loading = true;
    $scope.player = false;
    $scope.highlight = false;
    $scope.data = {};

    twitch.online().then(function (response) {
        $scope.loading = false;
        console.debug(response.data);
        if (response.data.stream) {
            $scope.player = true;
            $scope.data = {
                viewers: response.data.stream.viewers,
                title: response.data.stream.channel.status
            };

            loadPlayer();
        } else {
            $scope.highlight = true;
        }
    }).catch(function () {
        $scope.loading = false;
        $scope.highlight = true;
    });


    function loadPlayer() {
        document.getElementById('chat').src = "http://www.twitch.tv/weareb0b/chat";

        var options = {
            channel: "weareb0b"
        };
        var player = new Twitch.Player("player", options);
        player.setVolume(0.5);
    }

    function loadHighlight() {

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