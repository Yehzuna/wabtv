app.controller('loginCtrl', function ($rootScope, $scope, $location, api) {
    $rootScope.night = false;

    $scope.submit = function () {
        var hash = CryptoJS.MD5(CryptoJS.MD5($scope.login) + ':WabTvHash:' + CryptoJS.MD5($scope.password));
        console.log(hash.toString());

        api.admin({
            hash: hash.toString()
        }).then(function () {
            sessionStorage.setItem('WabTvHash', hash);
            $location.path('admin');
        }).catch(function() {

        });
    };
});

app.controller('adminCtrl', function ($rootScope, $scope, api) {
    $rootScope.night = false;

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
    $scope.confirmation = [];

    window.onbeforeunload = function () {
        console.log($scope.schedules);
        console.log($scope.confirmation);
        if (!angular.equals($scope.schedules, $scope.confirmation)) {
            return true;
        }
    };

    api.schedule().then(function (response) {
        angular.forEach(response.data, function(data) {

            data.date = new Date(data.date);

            if($scope.current.length == 0) {
                $scope.current = data;
            }

            $scope.schedules.push(data);
        });

        angular.copy($scope.schedules, $scope.confirmation);
    });

    $scope.submit = function () {
        var hash = sessionStorage.getItem('WabTvHash');
        api.admin({
            hash: hash,
            schedule: $scope.schedules
        });
    };

    $scope.slot = function () {
        $scope.current.slots = [];

        var nb = 1;
        if(!$scope.current.allDay) {
            nb = 4;
        }

        for (var i = 1; i <= nb; i++) {
            $scope.current.slots.push({
                "streamer": "",
                "show": "default",
                "title": "",
                "hour": "00:00"
            });
        }
    };

});