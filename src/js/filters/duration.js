app.filter('duration', function () {
    return function (duration) {
        var regex = duration.match(/PT(\d+H)?(\d+M)?(\d+S)/);

        var hours = "00";
        if (regex[1] !== undefined) {
            hours = formatTime(regex[1]);
        }

        var minutes = "00";
        if (regex[2] !== undefined) {
            minutes = formatTime(regex[2]);
        }

        var seconds = "00";
        if (regex[3] !== undefined) {
            seconds = formatTime(regex[3]);
        }

        return hours + ":" + minutes + ":" + seconds;
    };
});

function formatTime(string) {
    var time = parseInt(string.slice(0, -1));

    if (time < 10) {
        time = "0" + time;
    }

    return time;
}
