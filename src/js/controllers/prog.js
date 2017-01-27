app.controller('progCtrl', function ($scope, $http, $location, api) {
    console.log('progCtrl');

    $scope.schedules = [];
    api.prog().then(function (response) {
        $scope.schedules = response.data;
        console.log($scope.schedules);
    });
    
    $scope.export = function () {
        var div = document.getElementById('schedule').cloneNode(true);
        div.classList.add('export');

        document.body.appendChild(div);

        domtoimage.toJpeg(div, { quality: 0.95 })
            .then(function (dataUrl) {
                console.log('test');
                var img = new Image();
                img.src = dataUrl;
                document.body.appendChild(img);
            });
    }

});