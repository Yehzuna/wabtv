app.controller('homeCtrl', function ($scope) {
    document.getElementById('chat').src = "http://www.twitch.tv/weareb0b/chat";

    var options = {
        channel: "weareb0b"
    };
    var player = new Twitch.Player("player", options);
    player.setVolume(0.5);

    //document.getElementById('player').addEventListener('Twitch.Player.PLAY', function (e) {
    player.addEventListener(Twitch.Player.PLAY, function (e) {
        console.debug(e);
        console.debug(player.getEnded());
        console.debug(player.getPlaybackStats());
        console.debug(player.getChannel());
    }).

    $scope.theater = false;
    $scope.fullscreen = function () {
        if (!$scope.theater) {
            $scope.theater = true;
        } else {
            $scope.theater = false;
        }
    };
});