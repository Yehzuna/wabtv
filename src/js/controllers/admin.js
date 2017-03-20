app.controller('adminCtrl', function ($rootScope, $scope, api) {
    $rootScope.night = false;

    var dt = new Date();
    $scope.currentDay = dt.getDate();

    $scope.shows = {
        'default': "Autre",
        'omega': "Omega",
        'brico': "Bob le Bricoleur"
    };

    $scope.hours = [];
    for(var h = 0; h< 24; h++) {
        if (h < 10) {
            h = "0"+h;
        }
        $scope.hours.push(h + ":00");
    }


    $scope.current = [];
    $scope.schedules = [];

    api.schedule().then(function (response) {
        angular.forEach(response.data, function(data) {

            var t = data.date.split(/[-]/);
            var d = new Date(Date.UTC(t[0], t[1]-1, t[2]));
            data.date = d;
            data.currentDay = d.getDate();

            if($scope.current.length == 0) {
                $scope.current = data;
            }

            $scope.schedules.push(data);
        })
    });

    $scope.submit = function () {
        console.log($scope.current);
        console.log($scope.schedules);
    }

});