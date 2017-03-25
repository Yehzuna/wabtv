app.controller('loginCtrl', function ($rootScope, $scope, $location, api) {
    $rootScope.night = false;
    $scope.message = false;

    $scope.submit = function () {
        var hash = CryptoJS.MD5(CryptoJS.MD5($scope.login) + ':WabTvHash:' + CryptoJS.MD5($scope.password));
        console.log(hash.toString());

        api.admin({
            hash: hash.toString()
        }).then(function () {
            sessionStorage.setItem('WabTvHash', hash);
            $location.path('admin');
        }).catch(function() {
            $scope.message = "Unauthorized";
        });
    };
});

app.controller('adminCtrl', function ($rootScope, $scope, $location, api) {
    $rootScope.night = false;

    var hash = sessionStorage.getItem('WabTvHash');
    if(!hash) {
        $location.path('login');
        return false;
    }

    $scope.message = false;

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
        if (!angular.equals($scope.schedules, $scope.confirmation)) {
            return true;
        }
    };

    $scope.$watch('schedules', function (newValue, oldValue, scope){
        if (!angular.equals(scope.schedules, scope.confirmation)) {
            scope.message = "Modification non sauvegardé.";
        } else {
            scope.message = false;
        }
    }, true);

    api.schedule().then(function (response) {
        angular.forEach(response.data, function(data) {

            data.date = new Date(data.date);

            if($scope.current.length == 0) {
                $scope.current = data;
            }

            $scope.schedules.push(data);
        });
        angular.copy($scope.schedules, $scope.confirmation);
    }).catch(function() {
        $scope.message = "Unauthorized";
    });

    $scope.logout = function () {
        sessionStorage.removeItem('WabTvHash');
        $location.path('login');
    };

    $scope.submit = function () {
        api.admin({
            hash: hash,
            schedule: $scope.schedules
        }).then(function() {
            $scope.message = false;
            angular.copy($scope.schedules, $scope.confirmation);
        }).catch(function() {
            $scope.message = "Unauthorized";
        });
    };

    $scope.slot = function () {
        $scope.current.slots = [];

        var nb = 1;
        if(!$scope.current.allDay) {
            nb = 4;
        }

        var hours = ["14:00", "20:00", "22:00", "00:00"]
        for (var i = 0; i < nb; i++) {
            $scope.current.slots.push({
                "streamer": "",
                "show": "default",
                "title": "",
                "hour": hours[i]
            });
        }
    };

});