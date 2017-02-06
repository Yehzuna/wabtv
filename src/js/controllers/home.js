app.controller('homeCtrl', function ($scope) {
    document.getElementById('chat').src = "http://www.twitch.tv/weareb0b/chat";

    var options = {
        channel: "weareb0b"
    };
    var player = new Twitch.Player("player", options);
    player.setVolume(0.5);
});