app.controller('scheduleCtrl', function ($rootScope, $scope, api) {
    $rootScope.night = false;

    var dt = new Date();
    $scope.currentDay = dt.getDate();

    $scope.schedules = [];
    api.schedule().then(function (response) {
        angular.forEach(response.data, function(data) {

            var t = data.date.split(/[-]/);
            var d = new Date(Date.UTC(t[0], t[1]-1, t[2]));
            data.date = d;
            data.currentDay = d.getDate();

            $scope.schedules.push(data);
        });
    });
    
    $scope.export = function () {
        var div = document.getElementById('schedule').cloneNode(true);
        div.classList.add('export');

        document.body.appendChild(div);

        domtoimage.toJpeg(div, { quality: 0.95 })
            .then(function (dataUrl) {
                window.open(dataUrl);
                div.remove();
            });
    }
});