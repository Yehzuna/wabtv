app.controller('homeCtrl', function ($scope, $http, $location, api) {
    console.log('homeCtrl');

    var options = {
        channel: "jvtv"
        //video: "{VIDEO_ID}"
    };
    var player = new Twitch.Player("player", options);
    player.setVolume(0.5);

    $scope.$watch(function() {
        return angular.element('player').is(':visible')
    }, function(status) {
        console.debug(status);
        console.debug("player");
    });

    $scope.$watch(function() {
        return angular.element('#chat').is(':visible')
    }, function(status) {
        console.debug(status);
        console.debug("chat");
    });
});