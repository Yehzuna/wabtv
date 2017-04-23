app.controller('scheduleCtrl', function ($rootScope, $scope, api) {
    $rootScope.night = false;

    var dt = new Date();
    $scope.currentDay = dt.getDate();


    $scope.schedules = [];
    api.schedule().then(function (response) {
        angular.forEach(response.data, function(data) {
            data.date = new Date(data.date);
            data.currentDay = data.date.getDate();


            $scope.schedules.push(data);
        });
    });
    console.log($scope.schedules);

    
    $scope.export = function () {
        ga('send', 'event', 'WabTV', 'Schedule', 'Export');

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