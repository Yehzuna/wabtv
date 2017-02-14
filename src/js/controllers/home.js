app.controller('homeCtrl', function ($scope, twitch) {

    twitch.online().then(function (response) {
        console.log(response.data);

        //loadPlayer();
    }).catch(function() {
        console.log(response.data);
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

    $scope.theater = false;
    $scope.fullscreen = function () {
        if (!$scope.theater) {
            $scope.theater = true;
        } else {
            $scope.theater = false;
        }
    };
});